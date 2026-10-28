import { useRef } from 'react';
import CrewPanel from './CrewPanel';
import RideDemoMap from './RideDemoMap';
import { useLayout, useRideDemo } from './useRideDemo';
import './live-ride.css';

export default function LiveRideSection() {
  const sectionRef = useRef(null);
  const layout = useLayout();
  const { state, dispatch, s: runPosition, nav, sRef, subscribe, fading } = useRideDemo(sectionRef);

  const togglePlay = () => dispatch({ type: state.playback === 'playing' ? 'pause' : 'play' });

  return (
    <section ref={sectionRef} id="map-demo" className="lr-section" aria-labelledby="lr-heading">
      <div className="lr-inner">
        <header className="lr-header">
          <div className="lr-header-main">
            <p className="lr-eyebrow"><span className="lr-eyebrow-dot" aria-hidden="true" />Live on the move</p>
            <h2 id="lr-heading" className="lr-heading">
              <span className="lr-heading-line">The map that</span>
              <span className="lr-heading-line lr-heading-accent">rides with you.</span>
            </h2>
          </div>
          <div className="lr-header-side">
            <p className="lr-lead">Know where your crew is. Pick a place to regroup. Enjoy the ride together.</p>
            <span className="lr-demo-pill">Interactive demo</span>
          </div>
        </header>

        <div className="lr-stage">
          <RideDemoMap
            layout={layout}
            selected={state.selected}
            onSelect={(id) => dispatch({ type: 'select', id })}
            regroupId={state.regroupId}
            nav={nav}
            playback={state.playback}
            onTogglePlay={togglePlay}
            s={runPosition}
            sRef={sRef}
            subscribe={subscribe}
            fading={fading}
          />
          <CrewPanel
            s={runPosition}
            selected={state.selected}
            onSelect={(id) => dispatch({ type: 'select', id })}
            regroupId={state.regroupId}
            chooserOpen={state.chooserOpen}
            onOpenChooser={() => dispatch({ type: 'openChooser' })}
            onChoose={(id) => dispatch({ type: 'chooseRegroup', id })}
            onCloseChooser={() => dispatch({ type: 'closeChooser' })}
          />
        </div>

        <p className="lr-caption">A shared route. A clear meeting point. Everyone in the loop.</p>
        <p className="lr-sr-only" role="status" aria-live="polite">{state.announcement}</p>
      </div>
    </section>
  );
}
