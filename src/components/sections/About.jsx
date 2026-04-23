import { useRef } from 'react';
import { useSectionReveal, useReveal } from '../../hooks/useSectionReveal';
import { PlanetAbout } from '../planet/PlanetAbout';
import { StatChip } from '../ui/StatChip';

function AboutBody() {
  const ref = useRef(null);
  const on = useReveal(ref);
  return (
    <p className={`section-body reveal${on ? ' on' : ''}`} ref={ref}>
      Automation Software Engineer with 2+ years designing enterprise-grade workflow automation,
      agentic AI systems, and cloud-native integrations — deploying solutions that scale across
      Southeast Asia.
    </p>
  );
}

export function About() {
  const sectionRef = useRef(null);
  const visible = useSectionReveal(sectionRef);

  return (
    <section id="about" className={visible ? 'visible' : ''} ref={sectionRef}>
      <div className="section-inner">
        <div className="planet-wrap">
          <PlanetAbout />
        </div>
        <div className="content-wrap">
          <div className="section-label">01 · About</div>
          <h2 className="section-title">Building the future,<br/>one automation at a time.</h2>
          <AboutBody />
          <div className="stat-row">
            <StatChip target={100} suffix="K+" label="hours saved / yr" />
            <StatChip target={70} suffix="+" label="automations built" />
            <StatChip target={5} suffix="" label="countries reached" />
          </div>
        </div>
      </div>
    </section>
  );
}
