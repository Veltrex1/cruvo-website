// Content for the /cruvo-vs-* pages. Competitor descriptions are kept to what each product is built around,
// not prices or missing features, because those change. Re-check both apps' store listings before each update
// and bump `reviewed`.
const CRUVO_PRICE = 'Free Rider plan; Captain (Cruvo Pro) $9.99/month after a 30-day free trial';

export const COMPARISONS = {
  '/cruvo-vs-scenic': {
    rival: 'Scenic',
    reviewed: '2026-11-04',
    heading: 'Cruvo vs Scenic: group rides or solo route planning?',
    intro: 'Scenic is a well-known motorcycle navigation app built around planning and riding great routes. Cruvo is built around the group: keeping a crew of riders or drivers on one route, on one live map, with a clear place to regroup. Here is how they compare for the things people ask about most.',
    rows: [
      ['Built around', 'Group rides and drives: one shared route, the whole crew on a live map, regroup points.', 'Route planning and turn-by-turn navigation for motorcyclists, with a strong focus on curvy roads.'],
      ['Group coordination', 'Live crew map, rider roster, and regroup points the whole group sees.', 'Check Scenic’s current listing for its group and sharing features.'],
      ['Navigation', 'Turn-by-turn navigation; Captain adds scenic and curvy routing.', 'Turn-by-turn navigation with detailed route planning and curvy-road options.'],
      ['Cars and motorcycles', 'Both. Plan rides and drives, and keep bikes and cars in one garage.', 'Built for motorcycles.'],
      ['Pricing', CRUVO_PRICE, 'Free to download with a paid tier; see Scenic’s store listing for current pricing.'],
    ],
    pickCruvo: 'You organize rides for a club or a group of friends, you want everyone on one live map without a group text, or your crew mixes cars and bikes.',
    pickRival: 'You mostly ride solo and want the deepest possible route-planning tools.',
    faq: [
      { q: 'Is Cruvo a Scenic alternative?', a: 'Yes, if your rides are usually group rides. Cruvo puts the whole crew on one live map with shared regroup points, and it works for cars as well as motorcycles. For solo riders focused on route planning, Scenic is also a strong choice.' },
      { q: 'Does Cruvo have curvy-road routing like Scenic?', a: 'Yes. Cruvo’s Captain plan (Cruvo Pro) adds scenic and curvy routing on top of the free turn-by-turn navigation.' },
      { q: 'Is Cruvo free?', a: 'The Rider plan is free forever with no credit card. Captain (Cruvo Pro) is $9.99 a month after a 30-day free trial, billed through the App Store or Google Play.' },
    ],
  },
  '/cruvo-vs-rever': {
    rival: 'Rever',
    reviewed: '2026-11-04',
    heading: 'Cruvo vs Rever: which app keeps your crew together?',
    intro: 'Rever is a long-running motorcycle app for tracking rides, finding routes, and sharing them with a large rider community. Cruvo focuses on the ride itself when you are out with a group: one route, everyone on a live map, and a clear place to regroup. Here is how they compare.',
    rows: [
      ['Built around', 'Group rides and drives: one shared route, the whole crew on a live map, regroup points.', 'Ride tracking, route discovery, and a large motorcycle community.'],
      ['Group coordination', 'Live crew map, rider roster, and regroup points the whole group sees.', 'Check Rever’s current listing for its group ride and live tracking features.'],
      ['Navigation', 'Turn-by-turn navigation; Captain adds scenic and curvy routing.', 'Navigation and route planning, with more features on its paid tier.'],
      ['Cars and motorcycles', 'Both. Plan rides and drives, and keep bikes and cars in one garage.', 'Built for motorcycles.'],
      ['Pricing', CRUVO_PRICE, 'Free to download with a paid tier; see Rever’s store listing for current pricing.'],
    ],
    pickCruvo: 'Your rides are group rides, you lead a club, or your crew includes drivers as well as riders.',
    pickRival: 'You want to log solo rides and browse a big library of community routes.',
    faq: [
      { q: 'Is Cruvo a Rever alternative?', a: 'Yes, especially for group rides. Cruvo is built around keeping a crew together on one live map with shared regroup points, and it supports cars as well as motorcycles.' },
      { q: 'Can I use Cruvo for a club ride?', a: 'Yes. Ride captains plan the route, invite the crew, and everyone sees each other and the regroup point live. See the Cruvo for Clubs page for more.' },
      { q: 'Is Cruvo free?', a: 'The Rider plan is free forever with no credit card. Captain (Cruvo Pro) is $9.99 a month after a 30-day free trial, billed through the App Store or Google Play.' },
    ],
  },
};
