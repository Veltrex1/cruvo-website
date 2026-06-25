import appStoreBadge from '../assets/Download_on_the_App_Store_Badge.svg';

const APP_STORE_URL = 'https://apps.apple.com/us/app/cruvo/id6774693070';
const APP_STORE_IOS_URL = 'itms-apps://itunes.apple.com/app/id6774693070';

function isAppleMobileDevice() {
  if (typeof navigator === 'undefined') return false;

  return /iPad|iPhone|iPod/.test(navigator.userAgent)
    || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

export default function AppStoreBadgeLink({ className = '', imageClassName = '' }) {
  const handleClick = (event) => {
    if (!isAppleMobileDevice()) return;

    event.preventDefault();
    window.location.href = APP_STORE_IOS_URL;

    window.setTimeout(() => {
      if (!document.hidden) {
        window.location.href = APP_STORE_URL;
      }
    }, 900);
  };

  return (
    <a
      className={className}
      href={APP_STORE_URL}
      onClick={handleClick}
      aria-label="Download Cruvo on the App Store"
    >
      <img
        className={imageClassName}
        src={appStoreBadge}
        alt="Download on the App Store"
      />
    </a>
  );
}
