import { useRef } from 'react';
import { useSectionReveal } from '../../hooks/useSectionReveal';
import { PlanetEducation } from '../planet/PlanetEducation';
import { ExpCard } from '../ui/ExpCard';
import { CertList } from '../ui/CertList';
import { EDUCATION, CERTIFICATIONS } from '../../data/education';

export function Education() {
  const sectionRef = useRef(null);
  const visible = useSectionReveal(sectionRef);

  return (
    <section id="education" className={visible ? 'visible' : ''} ref={sectionRef}>
      <div className="section-inner">
        <div className="planet-wrap">
          <PlanetEducation />
        </div>
        <div className="content-wrap">
          <div className="section-label">06 · Education &amp; Certifications</div>
          <h2 className="section-title">Academic Orbit</h2>
          <ExpCard
            role={EDUCATION.degree}
            company={EDUCATION.company}
            companyStyle={{ color: 'oklch(72% 0.18 280)' }}
            dates={EDUCATION.dates}
            revealClass="reveal"
            extraContent={
              <p style={{ fontSize: '13px', color: 'var(--dim)', marginTop: '6px' }}>
                {EDUCATION.specialization}
              </p>
            }
          />
          <div className="section-label" style={{ marginBottom: '14px', marginTop: '28px' }}>Certifications</div>
          <CertList items={CERTIFICATIONS} />
        </div>
      </div>
    </section>
  );
}
