// Social proof shown on the home page (the ratings strip above pricing).
//
// An entry marked `sample: true` only renders in `npm run dev`, never in production.

export const SHOW_SAMPLES = Boolean(import.meta.env?.DEV);
export const visible = (items) => items.filter((item) => !item.sample || SHOW_SAMPLES);

// Current store ratings, confirmed by the Cruvo team on 2026-11-04. Update if either store changes.
export const STORE_RATINGS = [
  { store: 'App Store', rating: 5.0 },
  { store: 'Google Play', rating: 5.0 },
];
