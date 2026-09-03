# Labs (reserved)

Drop ContestLab problems here, one folder each, in the format described in
ContestLab's `docs/01-problem-structure.md`:

```
src/content/labs/<problem-id>/
├── problem.yaml      # id, title, limits, scoring  (+ optional: difficulty, tags, level, contestlabUrl)
├── statement.md      # shown on the site
└── solution.ipynb    # starter notebook offered for download
```

Then set `flags.labs: true` in `src/site.config.ts`. Datasets and graders stay on ContestLab.
