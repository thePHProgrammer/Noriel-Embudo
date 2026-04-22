import { useRef } from 'react';
import { useReveal } from '../../hooks/useSectionReveal';

export function ExpCard({ role, company, dates, bullets, companyStyle, extraContent, revealClass = 'reveal-left' }) {
  const ref = useRef(null);
  const on = useReveal(ref);

  return (
    <div className={`exp-card ${revealClass}${on ? ' on' : ''}`} ref={ref}>
      <div className="exp-role">{role}</div>
      <div className="exp-company" style={companyStyle}>{company}</div>
      <div className="exp-date">{dates}</div>
      {bullets && (
        <ul className="exp-bullets">
          {bullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
      )}
      {extraContent}
    </div>
  );
}
