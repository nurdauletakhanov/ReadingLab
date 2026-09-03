/**
 * Reading-list tables have columns Read | Coded | Year | Authors | Title | Concept.
 * This plugin turns the Title cell into an outbound link: a known DOI/arXiv URL when
 * we have one, otherwise a Google Scholar search. No PDFs are hosted here.
 */
const KNOWN = [
  { match: /^Ridge Regression$/i, url: 'https://doi.org/10.1080/00401706.1970.10488634' },
  { match: /Lasso$/i, url: 'https://doi.org/10.1111/j.2517-6161.1996.tb02080.x' },
  { match: /^Least Angle Regression/i, url: 'https://doi.org/10.1214/009053604000000067' },
  { match: /Elastic Net/i, url: 'https://doi.org/10.1111/j.1467-9868.2005.00503.x' },
  { match: /^The Perceptron/i, url: 'https://doi.org/10.1037/h0042519' },
];

const text = (node) =>
  node.type === 'text' ? node.value : (node.children ?? []).map(text).join('');

const clean = (s) => s.replace(/[⭐🔨🎵]/g, '').trim();

export function rehypePaperLinks() {
  return (tree) => {
    const walk = (node) => {
      if (node.type === 'element' && node.tagName === 'tr') {
        const cells = node.children.filter((c) => c.type === 'element' && c.tagName === 'td');
        if (cells.length === 6) {
          // GFM only renders task-list checkboxes inside lists, so mark the Read / Coded cells by hand.
          for (const cell of cells.slice(0, 2)) {
            const v = text(cell).trim();
            if (v === '[x]' || v === '[ ]') {
              cell.children = [{
                type: 'element',
                tagName: 'span',
                properties: { className: [v === '[x]' ? 'done' : 'todo'], title: v === '[x]' ? 'done' : 'not yet' },
                children: [{ type: 'text', value: v === '[x]' ? '✓' : '·' }],
              }];
            }
          }
          const title = clean(text(cells[4]));
          const authors = clean(text(cells[3]));
          if (title) {
            const known = KNOWN.find((k) => k.match.test(title));
            const url = known
              ? known.url
              : `https://scholar.google.com/scholar?q=${encodeURIComponent(`${title} ${authors}`)}`;
            cells[4].children = [
              {
                type: 'element',
                tagName: 'a',
                properties: { href: url, target: '_blank', rel: 'noopener' },
                children: cells[4].children,
              },
            ];
          }
        }
        return;
      }
      for (const child of node.children ?? []) walk(child);
    };
    walk(tree);
  };
}
