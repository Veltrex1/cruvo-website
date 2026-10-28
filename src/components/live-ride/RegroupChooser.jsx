import { useEffect, useRef } from 'react';
import { Check } from 'lucide-react';
import { REGROUP_SPOTS } from './rideDemo';

/** Small menu anchored above the "Set a regroup point" button. */
export default function RegroupChooser({ activeId, onChoose, onClose, anchorRef }) {
  const menuRef = useRef(null);
  const itemRefs = useRef([]);

  // Move focus into the menu when it opens, starting on the current spot.
  useEffect(() => {
    const index = Math.max(0, REGROUP_SPOTS.findIndex((s) => s.id === activeId));
    itemRefs.current[index]?.focus();
  }, [activeId]);

  // Close on outside click.
  useEffect(() => {
    const onPointerDown = (event) => {
      if (menuRef.current?.contains(event.target) || anchorRef.current?.contains(event.target)) return;
      onClose({ restoreFocus: false });
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [onClose, anchorRef]);

  const move = (from, step) => {
    const next = (from + step + REGROUP_SPOTS.length) % REGROUP_SPOTS.length;
    itemRefs.current[next]?.focus();
  };

  const onKeyDown = (event, index) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      onClose({ restoreFocus: true });
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      move(index, 1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      move(index, -1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      itemRefs.current[0]?.focus();
    } else if (event.key === 'End') {
      event.preventDefault();
      itemRefs.current[REGROUP_SPOTS.length - 1]?.focus();
    } else if (event.key === 'Tab') {
      onClose({ restoreFocus: false });
    }
  };

  return (
    <div ref={menuRef} id="lr-regroup-menu" className="lr-chooser" role="menu" aria-label="Choose a demo regroup point">
      {REGROUP_SPOTS.map((spot, index) => (
        <button
          key={spot.id}
          ref={(el) => { itemRefs.current[index] = el; }}
          type="button"
          role="menuitemradio"
          aria-checked={spot.id === activeId}
          className="lr-chooser-item"
          onKeyDown={(e) => onKeyDown(e, index)}
          onClick={() => onChoose(spot.id)}
        >
          <span>
            <span className="lr-chooser-name">{spot.name}</span>
            <span className="lr-chooser-context">{spot.context}</span>
          </span>
          {spot.id === activeId && <Check size={18} strokeWidth={2.6} aria-hidden="true" />}
        </button>
      ))}
    </div>
  );
}
