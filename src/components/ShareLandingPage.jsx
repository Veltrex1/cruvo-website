import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import AppStoreBadgeLink from './AppStoreBadgeLink';
import GooglePlayBadgeLink from './GooglePlayBadgeLink';
import '../share-landing.css';

const APP_STORE_URL = 'https://apps.apple.com/us/app/cruvo/id6774693070';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.veltrex1.cruvo';

function getPlatform() {
  const userAgent = navigator.userAgent || '';
  if (/iPad|iPhone|iPod/.test(userAgent)) return 'ios';
  if (/Android/.test(userAgent)) return 'android';
  return 'desktop';
}

export default function ShareLandingPage({ route }) {
  const [launching, setLaunching] = useState(false);
  const fallbackTimerRef = useRef(null);
  const appUrl = useMemo(
    () => `cruvo://${window.location.pathname.replace(/^\/+/, '')}${window.location.search}`,
    [],
  );

  const clearFallback = useCallback(() => {
    if (fallbackTimerRef.current) {
      window.clearTimeout(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }
  }, []);

  const openCruvo = useCallback(() => {
    const platform = getPlatform();
    setLaunching(true);
    clearFallback();
    window.location.href = appUrl;

    if (platform === 'ios' || platform === 'android') {
      fallbackTimerRef.current = window.setTimeout(() => {
        if (!document.hidden) {
          window.location.href = platform === 'ios' ? APP_STORE_URL : PLAY_STORE_URL;
        }
      }, 1500);
    } else {
      window.setTimeout(() => setLaunching(false), 900);
    }
  }, [appUrl, clearFallback]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) clearFallback();
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const platform = getPlatform();
    const launchTimer = platform === 'desktop'
      ? null
      : window.setTimeout(openCruvo, 250);

    return () => {
      if (launchTimer) window.clearTimeout(launchTimer);
      clearFallback();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [clearFallback, openCruvo]);

  const Icon = route.icon;

  return (
    <main className="share-page">
      <div className="share-page__backdrop" />
      <div className="share-page__scrim" />
      <header className="share-page__header">
        <a className="share-page__brand" href="/" aria-label="Cruvo home">
          <img
            alt=""
            className="share-page__brand-logo"
            src="/logos/Fullstack - Snow Drift.svg"
          />
        </a>
      </header>

      <section className="share-page__content">
        <div className="share-page__icon" aria-hidden="true">
          <Icon size={28} strokeWidth={2.2} />
        </div>
        <p className="share-page__eyebrow">{route.kind === 'ride' ? 'RIDE INVITE' : route.kind === 'post' ? 'CREW POST' : 'RIDER PROFILE'}</p>
        <h1>{route.title}</h1>
        <p className="share-page__description">{route.description}</p>

        <button className="share-page__open" disabled={launching} onClick={openCruvo} type="button">
          <span>{launching ? 'Opening Cruvo...' : 'Open in Cruvo'}</span>
          <ArrowRight size={20} />
        </button>

        <div className="share-page__divider"><span>or download the app</span></div>
        <div className="share-page__stores">
          <AppStoreBadgeLink imageClassName="share-page__store-badge" />
          <GooglePlayBadgeLink imageClassName="share-page__store-badge share-page__store-badge--play" />
        </div>

        <a className="share-page__website-link" href="/">
          Visit cruvo.co <ExternalLink size={15} />
        </a>
      </section>
    </main>
  );
}
