import { useRef } from 'react';
import { Coffee, Mountain, Plus, Waves, MapPin } from 'lucide-react';
import RegroupChooser from './RegroupChooser';
import { RIDERS, RIDER_COUNT, getRegroup, statusFor } from './rideDemo';

const REGROUP_ICONS = { cafe: Coffee, overlook: Mountain, lakeside: Waves };

export default function CrewPanel({ selected, onSelect, regroupId, chooserOpen, onOpenChooser, onChoose, onCloseChooser }) {
  const buttonRef = useRef(null);
  const regroup = getRegroup(regroupId);
  const RegroupIcon = REGROUP_ICONS[regroup.id] ?? MapPin;

  const close = ({ restoreFocus }) => {
    onCloseChooser();
    if (restoreFocus) buttonRef.current?.focus();
  };

  const choose = (id) => {
    onChoose(id);
    buttonRef.current?.focus();
  };

  return (
    <aside className={`lr-crew${chooserOpen ? ' is-choosing' : ''}`} aria-labelledby="lr-crew-title">
      <div className="lr-crew-head">
        <h3 id="lr-crew-title">Your crew</h3>
        <span className="lr-live"><span className="lr-live-dot" aria-hidden="true" />Demo live</span>
      </div>
      <p className="lr-crew-sub">Saturday scenic ride</p>

      <ul className="lr-crew-list">
        {[...RIDERS].sort((a, b) => b.start - a.start).map((rider) => (
          <li key={rider.id}>
            <button
              type="button"
              className={`lr-row${selected === rider.id ? ' is-selected' : ''}`}
              aria-pressed={selected === rider.id}
              onClick={() => onSelect(rider.id)}
            >
              <span className={`lr-avatar${rider.isYou ? ' is-you' : ''}`} aria-hidden="true">{rider.initial}</span>
              <span className="lr-row-text">
                <span className="lr-row-name">{rider.name}</span>
                <span className="lr-row-status">{statusFor(rider.id)}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div className="lr-regroup-summary">
        <span className="lr-regroup-icon" aria-hidden="true"><RegroupIcon size={20} strokeWidth={2.2} /></span>
        <div>
          <div className="lr-regroup-title">Meet at {regroup.name}</div>
          <div className="lr-regroup-meta">Demo regroup point</div>
          <div className="lr-regroup-meta">Shared with all {RIDER_COUNT} riders</div>
        </div>
      </div>

      <div className="lr-chooser-wrap">
        {chooserOpen && <RegroupChooser activeId={regroupId} onChoose={choose} onClose={close} anchorRef={buttonRef} />}
        <button
          ref={buttonRef}
          type="button"
          className="lr-cta"
          aria-haspopup="menu"
          aria-expanded={chooserOpen}
          aria-controls={chooserOpen ? 'lr-regroup-menu' : undefined}
          onClick={() => (chooserOpen ? close({ restoreFocus: false }) : onOpenChooser())}
        >
          <Plus size={20} strokeWidth={2.6} aria-hidden="true" />
          Set a regroup point
        </button>
      </div>
    </aside>
  );
}
