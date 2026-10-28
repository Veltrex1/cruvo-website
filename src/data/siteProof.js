// Real-world proof shown on the homepage.
// Sections stay hidden until they have real content, so nothing here is ever faked.

// Testimonials (audit D3.2). Collect one-line quotes from real riders and drivers:
// first name, photo, role or club, and a specific outcome. Add up to three.
// Example shape (do not ship invented quotes):
// {
//   name: 'First name',
//   role: 'Club ride captain, Hoosier Riders MC',
//   photo: '/testimonials/first-name.jpg',
//   quote: 'No one got dropped all season.',
// }
export const TESTIMONIALS = [];

// Store ratings (audit D3.5). Update the numbers and "asOf" date when they change.
// Set a store to null to hide it.
export const STORE_RATINGS = {
  appStore: { rating: '5.0', count: 3, asOf: 'Oct 2026' },
  googlePlay: null, // TODO: add once Google Play shows a public rating
};

// Press, community, or review-site mentions (audit D3.5). Each: { source, quote, date, url }.
export const MENTIONS = [];

// Founder block (audit D3.3). Leave name empty to hide the section.
export const FOUNDER = {
  name: '', // e.g. the founder's full name
  title: '', // e.g. 'Founder, Cruvo'
  photo: '', // e.g. '/team/founder.jpg' (add the file to /public/team/)
  story: '', // one first-person paragraph: why you built Cruvo
  links: [
    { label: 'Cruvo on X', href: 'https://x.com/Cruvo18963' },
    // { label: 'LinkedIn', href: 'https://www.linkedin.com/in/...' },
  ],
};
