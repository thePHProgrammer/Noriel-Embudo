import { useRef } from 'react';
import { useSectionReveal } from '../../hooks/useSectionReveal';
import { PlanetSkills } from '../planet/PlanetSkills';
import { SkillGroup } from '../ui/SkillGroup';
import { SKILLS } from '../../data/skills';

export function Skills() {
  const sectionRef = useRef(null);
  const visible = useSectionReveal(sectionRef);

  return (
    <section id="skills" className={visible ? 'visible' : ''} ref={sectionRef}>
      <div className="section-inner flip">
        <div className="planet-wrap">
          <PlanetSkills />
        </div>
        <div className="content-wrap">
          <div className="section-label">05 · Skills</div>
          <h2 className="section-title">Tech Stack</h2>
          {SKILLS.map((group, i) => (
            <SkillGroup key={i} label={group.label} items={group.items} />
          ))}
        </div>
      </div>
    </section>
  );
}
