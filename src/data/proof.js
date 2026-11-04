// Social proof shown on the home page: rider quotes, store ratings, press mentions and the founder block.
//
// Anything marked `sample: true` is layout copy only. It renders in `npm run dev` (with a "Sample" tag)
// and is left out of production builds, so nothing invented ships as if it were real.
// To publish: replace the text with the real quote / rating / person, then set `sample: false`.

export const SHOW_SAMPLES = Boolean(import.meta.env?.DEV);
export const visible = (items) => items.filter((item) => !item.sample || SHOW_SAMPLES);

// Ask early riders for: first name, a photo (square, at least 160px), their role or club, and one specific outcome.
export const TESTIMONIALS = [
  {
    sample: true,
    name: 'Marcus',
    role: 'Club ride captain, Hoosier Twins MC',
    photo: '',
    quote: 'We run a 14-bike Sunday loop. With the live map and regroup points, no one got dropped all season.',
  },
  {
    sample: true,
    name: 'Elena',
    role: 'Organizer, Indy Cars & Coffee drives',
    photo: '',
    quote: 'I used to juggle a group text and three nav apps. Now everyone opens one route and we meet at the same overlook.',
  },
  {
    sample: true,
    name: 'Dev',
    role: 'Weekend rider, commutes on a Tracer 9',
    photo: '',
    quote: 'The scenic routing found back roads twenty minutes from my house that I had never ridden.',
  },
];

// Copy the current numbers from App Store Connect and the Play Console, with the date you checked.
export const STORE_RATINGS = [
  { sample: true, store: 'App Store', rating: 4.8, count: 120, checked: '2026-11-01' },
  { sample: true, store: 'Google Play', rating: 4.7, count: 85, checked: '2026-11-01' },
];

// Dated press, podcast or community mentions, newest first.
export const MENTIONS = [
  { sample: true, source: 'Local riding club newsletter', date: '2026-10', quote: 'The group-ride app our captains actually kept using.', url: '' },
];

// The person behind Cruvo. Photo goes in public/team/.
export const FOUNDER = {
  sample: true,
  name: 'Alex Morgan',
  title: 'Founder, Cruvo',
  photo: '',
  story: [
    'I built Cruvo after one too many group rides where half the crew ended up at the wrong gas station. We had three nav apps, a group text nobody could read at speed, and someone always waiting on a shoulder wondering where everyone went.',
    'Cruvo is the app I wanted on those rides: one route, everyone on the same live map, and a clear place to regroup. Now we are bringing the same thing to car clubs and weekend drives, because drivers lose each other too.',
  ],
  links: [
    { label: 'Cruvo on X', href: 'https://x.com/cruvoracing' },
    { label: 'Cruvo on Instagram', href: 'https://www.instagram.com/appcruvo/' },
  ],
};
