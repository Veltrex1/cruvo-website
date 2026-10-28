// Homepage FAQ (audit D1.4, D1.6). Items with an empty answer are hidden on the page
// and left out of the FAQ structured data until the answer is filled in.
export const FAQ_ITEMS = [
  {
    q: 'Will Cruvo keep tracking if my phone screen is off mid-ride?',
    a: 'With Cruvo Pro, ride tracking keeps running in the background during an active ride, so your crew still sees you on the live map when your screen is off or you switch apps. Cruvo only uses your location while a ride is active.',
  },
  {
    q: 'Can I import or export a GPX file?',
    a: '', // TODO: answer once GPX import/export support is confirmed in the app.
  },
  {
    q: 'Can someone without the app join my group ride?',
    a: 'They need the free Cruvo app to join. Send them your ride invite link: it opens the ride in Cruvo, or takes them to the App Store or Google Play to download it first. The Basic plan is free, so joining costs nothing.',
  },
  {
    q: 'What does the free plan include?',
    a: 'Basic is free forever: create and join rides, live location sharing, standard navigation, a Garage for one car or bike, and community access. Pro adds scenic and curvy routes, unlimited vehicles in your Garage, ride analytics, and season rewards.',
  },
  {
    q: 'Do I need a credit card, and how do I cancel Pro?',
    a: 'Basic needs no credit card. Pro is billed through your Apple App Store or Google Play account, starts with a 30-day free trial, and you can cancel anytime from your app store subscriptions.',
  },
  {
    q: 'Does Cruvo work for car clubs and group drives?',
    a: 'Yes. Add your cars and bikes to your Garage, then plan a group drive the same way you plan a rideout: set the route and regroup points, invite your crew, and keep everyone together on the live map.',
  },
];

export const VISIBLE_FAQ_ITEMS = FAQ_ITEMS.filter(item => item.a);
