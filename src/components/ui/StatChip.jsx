import { useRef } from 'react';
import { useAnimatedCounter } from '../../hooks/useAnimatedCounter';

export function StatChip({ target, suffix, label }) {
  const numRef = useRef(null);
  useAnimatedCounter(numRef, target, suffix);

  return (
    <div className="stat">
      <div className="stat-num" ref={numRef}>0</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}
