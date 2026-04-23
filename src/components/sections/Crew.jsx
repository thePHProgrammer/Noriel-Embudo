import { useRef } from 'react';
import { useSectionReveal } from '../../hooks/useSectionReveal';
import { GALLERY } from '../../data/gallery';

export function Crew() {
  const sectionRef = useRef(null);
  const visible = useSectionReveal(sectionRef);

  function renderGroup(suffix) {
    return (
      <div className="crew-group" aria-hidden={suffix === 'b' ? 'true' : undefined}>
        {GALLERY.map(p => (
          <figure className="crew-card" key={`${suffix}-${p.src}`}>
            <img src={p.src} alt={p.caption} loading="lazy" />
            <figcaption>{p.caption}</figcaption>
          </figure>
        ))}
      </div>
    );
  }

  return (
    <section id="crew" className={visible ? 'visible' : ''} ref={sectionRef}>
      <div className="crew-header">
        <div className="section-label">03 · Crew</div>
        <h2 className="section-title">Mission Crew</h2>
        <p className="section-body">Field notes from the orbit — teams, trips, and the people behind the missions.</p>
      </div>
      <div className="crew-marquee">
        <div className="crew-track">
          {renderGroup('a')}
          {renderGroup('b')}
        </div>
      </div>
    </section>
  );
}
