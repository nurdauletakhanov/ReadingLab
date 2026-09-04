# ReadingLab

The website of a paper-reading club: written tutorials, animated walkthrough videos, and the
reading list behind them. Static, built with [Astro](https://astro.build), deployed to GitHub Pages
on every push to `main`.

Live: https://nurdauletakhanov.github.io/ReadingLab/

## Develop

```bash
pnpm install
pnpm dev          # http://localhost:4321/ReadingLab/
pnpm verify       # astro check + build + size report
```

Node 22 and pnpm 10 (`corepack enable` gives you pnpm). `ffmpeg` is needed only to import videos.

## Update the weekly lecture news

Edit `nextLecture` in `src/site.config.ts`. Set its `topic`, `date`, `time`, and `place`, then
push to `main`. The announcement at the top of the home page updates automatically.

## Add a session

1. **Tutorial.** Save the self-contained HTML page (the artifact's HTML) as
   `src/content/tutorials/<slug>.html` and describe it in `src/content/tutorials/<slug>.yaml`:

   ```yaml
   session: 2
   order: 1
   level: 1
   summary: "One sentence for the index cards."
   paper: { authors: "…", title: "…", year: 1996, venue: "…", url: "https://doi.org/…" }
   video: <video-slug>            # optional
   linkRewrites:                  # optional: external URLs → site paths
     "https://claude.ai/code/artifact/…": /tutorials/other-slug/
   ```

   The page keeps its own CSS and MathJax markup; the build scopes its styles under `.tut`
   and drops it into the site layout. Nothing in the HTML needs editing.

   An optional PowerPoint lecture deck can live in `public/slides/`. Add
   `slides: slides/<filename>.pptx` to the tutorial yaml to show its download link.

2. **Video.** Re-encode and register the render in one step:

   ```bash
   pnpm import:video "<path>/Walkthrough.mp4" "<path>/Walkthrough.srt" <video-slug>
   ```

   That writes `public/videos/<slug>/<slug>.mp4` (h264, ≤720p, mono audio, usually well under
   15 MB), a poster frame, copies the SRT, and creates `src/content/videos/<slug>.yaml` if missing.
   Fill in the yaml: title, paper, `tutorial: <slug>`, `chapters` (each `at:` is either seconds or
   the first words of a narration cue; an unknown prefix fails the build on purpose) and
   `keyResults` (TeX, rendered by MathJax).

3. **Reading list.** Copy the updated `Reading_list.md` over `src/content/papers/reading-list.md`
   keeping the two-line frontmatter at the top. Titles are linked automatically (known DOIs in
   `src/lib/rehype-paper-links.mjs`, otherwise a Scholar search). No PDFs are hosted.

4. `git push`. The GitHub Action in `.github/workflows/deploy.yml` builds and deploys to Pages.

## Labs (later)

`src/content/labs/` is reserved for ContestLab problems (`problem.yaml` + `statement.md` +
`solution.ipynb` per folder). Flip `flags.labs` in `src/site.config.ts` to show the section.
Grading itself runs on ContestLab, which needs its own server.

## Custom domain

Set `CUSTOM_DOMAIN` in `astro.config.mjs` and add `public/CNAME` with the same value.
