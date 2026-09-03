/**
 * Content Layer loader for self-contained tutorial pages (the artifact HTML).
 *
 * For each src/content/tutorials/<slug>.html (+ optional <slug>.yaml sidecar) it:
 *   - pulls out <title>, the Google Fonts <link>, the <style> block, inline scripts and the body;
 *   - drops the per-page MathJax config/loader (the layout provides one) and records hasMath;
 *   - scopes every CSS rule under `.tut`, so the page's global selectors cannot restyle the site chrome
 *     while its :root / [data-theme] dark-mode rules keep working;
 *   - rewrites links listed in the sidecar's `linkRewrites` to base-path-aware internal URLs.
 * The body becomes the entry's rendered HTML, so pages can use render(entry).
 */
import type { Loader } from 'astro/loaders';
import { readdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { parse as parseYaml } from 'yaml';
import postcss from 'postcss';
import prefixer from 'postcss-prefix-selector';

const MATHJAX_CONFIG = /window\.MathJax\s*=/;

export function legacyHtmlLoader(opts: { dir: string; scope?: string }): Loader {
  const scope = opts.scope ?? '.tut';
  return {
    name: 'legacy-html',
    async load({ store, parseData, generateDigest, config, watcher, logger }) {
      const root = new URL(opts.dir.replace(/\/?$/, '/'), config.root);
      const files = (await readdir(root)).filter((f) => f.endsWith('.html')).sort();
      const seen = new Set<string>();

      for (const file of files) {
        const id = file.replace(/\.html$/, '');
        seen.add(id);
        const html = await readFile(new URL(file, root), 'utf8');
        const metaText = await readFile(new URL(`${id}.yaml`, root), 'utf8').catch(() => '');
        const meta = (parseYaml(metaText) ?? {}) as Record<string, unknown>;
        const digest = generateDigest(html + '\n' + metaText);
        if (store.get(id)?.digest === digest) continue;

        const parts = extractParts(html, file);
        const css = await scopeCss(parts.css, scope);
        const body = rewriteLinks(parts.body, meta.linkRewrites as Record<string, string> | undefined, config.base);

        const data = await parseData({
          id,
          data: {
            title: parts.title,
            ...meta,
            css,
            script: parts.scripts.length ? parts.scripts.join('\n;\n') : undefined,
            fontsHref: parts.fontsHref,
            hasMath: parts.hasMath,
          },
        });
        store.set({ id, data, digest, filePath: `${opts.dir.replace(/\/$/, '')}/${file}`, rendered: { html: body } });
        logger.info(`${id}: ${(body.length / 1024).toFixed(0)} KB body, ${parts.scripts.length} script(s), math=${parts.hasMath}`);
      }
      for (const key of store.keys()) if (!seen.has(key)) store.delete(key);
      watcher?.add(fileURLToPath(root));
    },
  };
}

function extractParts(html: string, file: string) {
  const title = /<title>([\s\S]*?)<\/title>/i.exec(html)?.[1]?.trim() ?? '';
  const fontsHref = /<link[^>]+href="(https:\/\/fonts\.googleapis\.com[^"]+)"/i.exec(html)?.[1];
  const css = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map((m) => m[1]).join('\n');

  let rest = html
    .replace(/<!DOCTYPE[^>]*>/i, '')
    .replace(/<\/?(html|head|body)[^>]*>/gi, '')
    .replace(/<title>[\s\S]*?<\/title>/i, '')
    .replace(/<meta[^>]*>/gi, '')
    .replace(/<link[^>]*>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');

  const scripts: string[] = [];
  let hasMath = false;
  rest = rest.replace(/<script([^>]*)>([\s\S]*?)<\/script>/gi, (_m, attrs: string, code: string) => {
    if (/mathjax/i.test(attrs) || MATHJAX_CONFIG.test(code)) { hasMath = true; return ''; }
    if (/\bsrc=/i.test(attrs)) { throw new Error(`legacy-html ${file}: external script not allowed: ${attrs.trim()}`); }
    scripts.push(code);
    return '';
  });

  if (!title) throw new Error(`legacy-html ${file}: missing <title>`);
  if (!css) throw new Error(`legacy-html ${file}: missing <style>`);
  return { title, fontsHref, css, body: rest.trim(), scripts, hasMath };
}

async function scopeCss(css: string, scope: string): Promise<string> {
  const result = await postcss([
    prefixer({
      prefix: scope,
      transform(prefix: string, selector: string, prefixed: string) {
        const s = selector.trim();
        if (s === 'body' || s === 'html') return prefix;
        if (s.startsWith(':root')) {
          const tail = s.slice(':root'.length);
          return tail ? `:root${tail} ${prefix}` : prefix;
        }
        if (s.startsWith('body ') || s.startsWith('html ')) return `${prefix} ${s.slice(5)}`;
        return prefixed;
      },
    }),
  ]).process(css, { from: undefined });
  return result.css;
}

function rewriteLinks(body: string, map: Record<string, string> | undefined, base: string): string {
  if (!map) return body;
  const b = base.replace(/\/$/, '');
  for (const [from, to] of Object.entries(map)) {
    const target = /^https?:\/\//.test(to) ? to : `${b}/${to.replace(/^\//, '')}`;
    body = body.split(`href="${from}"`).join(`href="${target}"`);
  }
  return body;
}
