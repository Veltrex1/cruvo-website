import googlePlayBadge from '../assets/GetItOnGooglePlay_Badge.svg';

const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.veltrex1.cruvo';

export default function GooglePlayBadgeLink({ className = '', imageClassName = '' }) {
  return (
    <a
      className={className}
      href={GOOGLE_PLAY_URL}
      aria-label="Get Cruvo on Google Play"
    >
      <img
        className={imageClassName}
        src={googlePlayBadge}
        alt="Get it on Google Play"
      />
    </a>
  );
}
