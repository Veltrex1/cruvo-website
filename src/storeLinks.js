export const APP_STORE_URL = 'https://apps.apple.com/us/app/cruvo/id6774693070';
export const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.veltrex1.cruvo';

// Send Android visitors to Google Play, everyone else to the App Store.
export function getStoreUrl() {
  if (typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent)) {
    return GOOGLE_PLAY_URL;
  }
  return APP_STORE_URL;
}
