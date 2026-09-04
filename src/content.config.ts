import { defineCollection, z } from 'astro:content';
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
    slides: z.string().optional(),
    slidesSource: z.string().optional(),
    linkRewrites: z.record(z.string()).optional(),
    // Filled by the loader, not by the sidecar:
    css: z.string(),
    script: z.string().optional(),
    fontsHref: z.string().url().optional(),
    hasMath: z.boolean(),
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

export const collections = { tutorials, papers, labs };
