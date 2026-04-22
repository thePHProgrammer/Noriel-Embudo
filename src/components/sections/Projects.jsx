import { useRef } from 'react';
import { useSectionReveal } from '../../hooks/useSectionReveal';
import { PlanetProjects } from '../planet/PlanetProjects';
import { ProjectCard } from '../ui/ProjectCard';
import { PROJECTS } from '../../data/projects';

export function Projects() {
  const sectionRef = useRef(null);
  const visible = useSectionReveal(sectionRef);

  return (
    <section id="projects" className={visible ? 'visible' : ''} ref={sectionRef}>
      <div className="section-inner">
        <div className="planet-wrap">
          <PlanetProjects />
        </div>
        <div className="content-wrap">
          <div className="section-label">03 · Projects</div>
          <h2 className="section-title">Deployed Missions</h2>
          <p style={{ fontSize: '11px', color: 'var(--dim)', fontFamily: "'Space Mono', monospace", marginBottom: '14px', letterSpacing: '.06em' }}>
            HOVER CARD TO REVEAL DETAILS
          </p>
          <div className="projects-grid">
            {PROJECTS.map((p, i) => (
              <ProjectCard key={i} {...p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
