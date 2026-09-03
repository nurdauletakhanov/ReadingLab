import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { legacyHtmlLoader } from './loaders/legacy-html';

const paper = z.object({
  authors: z.string(),
  title: z.string(),
  year: z.number().int(),
  venue: z.string().optional(),
  url: z.string().url().optional(), // publisher / arXiv / DOI link only; PDFs are never hosted here
});

const tutorials = defineCollection({
  loader: legacyHtmlLoader({ dir: 'src/content/tutorials' }),
  schema: z.object({
    title: z.string(),
    session: z.number().int(),
    order: z.number().int().default(0),
    summary: z.string().default(''),
    level: z.number().int().min(1).max(15).optional(),
    paper: paper.optional(),
    video: reference('videos').optional(),
    linkRewrites: z.record(z.string()).optional(),
    // Filled by the loader, not by the sidecar:
    css: z.string(),
    script: z.string().optional(),
    fontsHref: z.string().url().optional(),
    hasMath: z.boolean(),
  }),
});

const chapter = z.object({
  title: z.string(),
  at: z.union([z.number().nonnegative(), z.string().min(3)]), // seconds, or the opening words of a narration cue
});

const videos = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/videos' }),
  schema: z.object({
    title: z.string(),
    eyebrow: z.string().optional(),
    session: z.number().int(),
    summary: z.string().default(''),
    level: z.number().int().min(1).max(15).optional(),
    paper,
    mp4: z.string(),     // under public/, e.g. videos/ridge/ridge.mp4
    srt: z.string(),     // file next to this yaml, e.g. ridge.srt
    poster: z.string().optional(),
    durationSec: z.number().optional(),
    chapters: z.array(chapter).min(1),
    keyResults: z.array(z.object({ label: z.string(), tex: z.string() })).default([]),
    tutorial: reference('tutorials').optional(),
  }),
});

const papers = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/papers' }),
  schema: z.object({ title: z.string(), updated: z.coerce.date().optional() }),
});

// Stub for ContestLab problems: one folder per problem holding problem.yaml + statement.md + solution.ipynb.
const labs = defineCollection({
  loader: glob({ pattern: '**/problem.yaml', base: './src/content/labs' }),
  schema: z.object({
    id: z.string().optional(),
    title: z.string(),
    difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
    tags: z.array(z.string()).default([]),
    level: z.number().int().optional(),
    contestlabUrl: z.string().url().optional(),
  }),
});

export const collections = { tutorials, videos, papers, labs };
