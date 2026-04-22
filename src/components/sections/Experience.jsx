import { useRef } from 'react';
import { useSectionReveal } from '../../hooks/useSectionReveal';
import { PlanetExperience } from '../planet/PlanetExperience';
import { ExpCard } from '../ui/ExpCard';
import { EXPERIENCE } from '../../data/experience';

export function Experience() {
  const sectionRef = useRef(null);
  const visible = useSectionReveal(sectionRef);

  return (
    <section id="experience" className={visible ? 'visible' : ''} ref={sectionRef}>
      <div className="section-inner flip">
        <div className="planet-wrap">
          <PlanetExperience />
        </div>
        <div className="content-wrap">
          <div className="section-label">02 · Experience</div>
          <h2 className="section-title">Mission Log</h2>
          <div className="exp-list">
            {EXPERIENCE.map((exp, i) => (
              <ExpCard key={i} {...exp} revealClass="reveal-left" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
