import { useRef } from 'react';
import { useReveal } from '../../hooks/useSectionReveal';

export function SkillGroup({ label, items }) {
  const ref = useRef(null);
  const on = useReveal(ref);

  return (
    <div className={`skill-group reveal${on ? ' on' : ''}`} ref={ref}>
      <div className="skill-group-label">{label}</div>
      <div className="skills-flex">
        {items.map(item => <span key={item} className="skill-tag">{item}</span>)}
      </div>
    </div>
  );
}
