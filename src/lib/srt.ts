import { readFile } from 'node:fs/promises';
import path from 'node:path';

export type Cue = { start: number; end: number; text: string };
export type ChapterSpec = { title: string; at: number | string };
export type Chapter = { title: string; t: number };

const toSeconds = (t: string): number => {
  const [h, m, s] = t.replace(',', '.').split(':');
  return Number(h) * 3600 + Number(m) * 60 + Number(s);
};

export function parseSrt(srt: string): Cue[] {
  const cues: Cue[] = [];
  for (const block of srt.replace(/^﻿/, '').trim().split(/\n\s*\n/)) {
    const lines = block.trim().split('\n');
    if (lines.length < 3) continue;
    const m = /(\S+) --> (\S+)/.exec(lines[1]);
    if (!m) continue;
    cues.push({ start: toSeconds(m[1]), end: toSeconds(m[2]), text: lines.slice(2).join(' ').trim() });
  }
  return cues;
}

export function srtToVtt(srt: string): string {
  return 'WEBVTT\n\n' + srt.replace(/^﻿/, '').replace(/(\d{2}:\d{2}:\d{2}),(\d{3})/g, '$1.$2').trim() + '\n';
}

/** Resolve chapter starts. `at` is either seconds or the opening words of a narration cue. Unmatched prefixes fail the build. */
export function resolveChapters(cues: Cue[], specs: ChapterSpec[], label: string): Chapter[] {
  const out = specs.map((c) => {
    const t = typeof c.at === 'number' ? c.at : cues.find((q) => q.text.startsWith(c.at as string))?.start;
    if (t === undefined) {
      throw new Error(`[${label}] chapter "${c.title}": narration prefix not found in SRT: "${c.at}"`);
    }
    return { title: c.title, t: Math.round(t * 10) / 10 };
  });
  if (out.length) out[0].t = 0;
  return out;
}

export const fmtTime = (s: number): string =>
  `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

export async function readSrt(file: string): Promise<string> {
  return readFile(path.resolve(process.cwd(), 'src/content/videos', file), 'utf8');
}
