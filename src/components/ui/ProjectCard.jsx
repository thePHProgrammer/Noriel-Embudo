import { useRef } from 'react';
import { useReveal } from '../../hooks/useSectionReveal';

export function ProjectCard({ name, desc, backDetail, award, tags }) {
  const ref = useRef(null);
  const on = useReveal(ref);

  return (
    <div className={`flip-card reveal${on ? ' on' : ''}`} ref={ref}>
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <div>
            <div className="project-name">{name}</div>
            <div className="project-desc">{desc}</div>
            {award && <div className="project-award">{award}</div>}
          </div>
          <div className="project-tags">
            {tags.map(t => <span key={t} className="project-tag">{t}</span>)}
          </div>
        </div>
        <div className="flip-card-back">
          <div>
            <div className="project-name" style={{ color: 'var(--gold)' }}>{name}</div>
            <div className="back-detail">{backDetail}</div>
          </div>
          <div className="flip-hint">↩ hover out to flip back</div>
        </div>
      </div>
    </div>
  );
}
