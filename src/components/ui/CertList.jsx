import { useRef } from 'react';
import { useReveal } from '../../hooks/useSectionReveal';

export function CertList({ items }) {
  const ref = useRef(null);
  const on = useReveal(ref);

  return (
    <div className={`cert-list reveal${on ? ' on' : ''}`} ref={ref}>
      {items.map((item, i) => (
        <div key={i} className="cert-item">{item}</div>
      ))}
    </div>
  );
}
