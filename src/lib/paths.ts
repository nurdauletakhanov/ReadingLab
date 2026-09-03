/** Prefix a site-relative path with the configured base ('/ReadingLab' on github.io, '/' on a custom domain). */
export const withBase = (p: string): string =>
  `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${p.replace(/^\//, '')}`;
