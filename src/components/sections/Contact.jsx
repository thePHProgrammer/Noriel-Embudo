import { useRef } from 'react';
import { useSectionReveal } from '../../hooks/useSectionReveal';
import { PlanetContact } from '../planet/PlanetContact';
import { ContactForm } from '../ui/ContactForm';

export function Contact({ onSuccess }) {
  const sectionRef = useRef(null);
  const visible = useSectionReveal(sectionRef);

  return (
    <section id="contact" className={visible ? 'visible' : ''} ref={sectionRef}>
      <div className="section-inner flip">
        <div className="planet-wrap">
          <PlanetContact />
        </div>
        <div className="content-wrap">
          <div className="section-label">07 · Contact</div>
          <h2 className="section-title">Send a Signal</h2>
          <p className="section-body">Open to new missions, collaborations, and interesting problems to automate.</p>
          <ContactForm onSuccess={onSuccess} />
        </div>
      </div>
    </section>
  );
}
