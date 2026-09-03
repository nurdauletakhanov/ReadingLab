export const site = {
  title: 'ReadingLab',
  tagline: 'A paper-reading club: written tutorials, animated walkthroughs, and the reading list behind them.',
  author: 'Nurdaulet Akhanov',
  github: 'https://github.com/nurdauletakhanov/ReadingLab',
  nextLecture: {
    topic: 'Topic to be announced',
    date: 'Friday',
    place: 'Lecture Hall 1',
    time: '3 pm',
  },
  nav: [
    { href: '/tutorials/', label: 'Tutorials' },
    { href: '/videos/', label: 'Videos' },
    { href: '/papers/', label: 'Papers' },
    { href: '/labs/', label: 'Labs', flag: 'labs' as const },
  ],
  flags: {
    // Flip to true once ContestLab problems are dropped into src/content/labs/.
    labs: false,
  },
  // The fonts every tutorial uses. A tutorial that needs a different set declares it in its own <link>.
  fontsHref:
    'https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;1,6..72,400&family=Public+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap',
};
