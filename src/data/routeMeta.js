// Per-route titles and descriptions (audit D5.1). Used at runtime (document.title) and at
// build time by the vite plugin that writes a static HTML file per route, so crawlers see
// distinct metadata without running JavaScript.
export const SITE_URL = 'https://www.cruvo.co';

export const ROUTE_META = {
  '/': {
    title: 'Cruvo - Group Ride & Motorcycle App for Riders and Car Clubs',
    description: 'Cruvo is the car and motorcycle app for group rides and drives: plan a rideout, turn-by-turn navigation, live crew map, and regroup points. Free on iPhone and Android.',
    section: null,
  },
  '/features': {
    title: 'Cruvo Features - Group Rides, Live Map & Turn-by-Turn Navigation',
    description: 'Plan group rides and drives, share live location with your crew, regroup at checkpoints, and find curvy roads with turn-by-turn navigation for cars and motorcycles.',
    section: '#features',
  },
  '/pricing': {
    title: 'Cruvo Pricing - Free Group Ride App, Pro $9.99/month',
    description: 'Cruvo Basic is free forever for group rides, live location, and navigation. Cruvo Pro is $9.99/month with a 30-day free trial for scenic routes, ride stats, and unlimited cars and bikes.',
    section: '#pricing',
  },
  '/about': {
    title: 'About Cruvo - The Group Ride and Drive App',
    description: 'Who builds Cruvo, the group ride and drive app for motorcycle riders, car clubs, and the crews that ride together.',
    section: '#about',
    fallbackSection: '#community',
  },
  '/customers': {
    title: 'Cruvo Riders - Stories from Group Rides and Car Club Drives',
    description: 'Riders, ride captains, and car clubs on how they keep the group together with Cruvo on every rideout and drive.',
    section: '#stories',
    fallbackSection: '#community',
  },
  '/faq': {
    title: 'Cruvo FAQ - Group Rides, Free Plan, Pro Trial and Car Clubs',
    description: 'Answers about Cruvo: background ride tracking, joining a ride without the app, what the free plan includes, the Pro trial, and group drives for car clubs.',
    section: '#faq',
  },
};
