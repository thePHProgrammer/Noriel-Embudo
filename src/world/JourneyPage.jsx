import { useEffect, useRef, useState } from 'react';
import { WorldCanvas } from './WorldCanvas';
import { StarfieldCanvas } from '../components/canvas/StarfieldCanvas';
import { ContactForm } from '../components/ui/ContactForm';
import { Toast } from '../components/ui/Toast';
import { META } from '../data/meta';
import { SKILLS } from '../data/skills';
import { EXPERIENCE } from '../data/experience';
import { POSTS } from '../data/posts';
import './journey.css';

const WAYPOINTS = [
  { id: 'arrival', label: 'Arrival' },
  { id: 'signal', label: 'The Signal' },
  { id: 'forge', label: 'The Forge' },
  { id: 'voyages', label: 'The Voyages' },
  { id: 'blog', label: 'Field Notes' },
  { id: 'contact', label: 'Transmit' },
];

function Chapter({ id, children, tall }) {
  return (
    <section id={id} className={`jch${tall ? ' jch--tall' : ''}`}>
      <div className="jch-sticky">
        <div className="jch-inner" data-reveal>{children}</div>
      </div>
    </section>
  );
}

function JourneyNav() {
  return (
    <nav className="jnav">
      <a className="jnav-logo" href="#arrival">NJE // 2026</a>
      <ul className="jnav-links">
        {WAYPOINTS.slice(1).map(w => (
          <li key={w.id}><a href={`#${w.id}`}>{w.label}</a></li>
        ))}
      </ul>
    </nav>
  );
}

function WaypointRail({ active }) {
  return (
    <div className="jrail" aria-hidden="true">
      {WAYPOINTS.map(w => (
        <a key={w.id} href={`#${w.id}`} className={`jrail-dot${active === w.id ? ' on' : ''}`}>
          <span>{w.label}</span>
        </a>
      ))}
    </div>
  );
}

export function JourneyPage() {
  const [webglFailed, setWebglFailed] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [active, setActive] = useState('arrival');
  const rootRef = useRef(null);

  // Story beats fade in as their stretch of the flight path arrives, and the
  // waypoint rail tracks which chapter currently owns the viewport.
  useEffect(() => {
    const root = rootRef.current;
    const reveal = new IntersectionObserver(
      entries => entries.forEach(e => e.target.classList.toggle('in-view', e.isIntersecting)),
      { threshold: 0.2 }
    );
    root.querySelectorAll('[data-reveal]').forEach(el => reveal.observe(el));

    const spot = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: '-45% 0px -45% 0px' }
    );
    root.querySelectorAll('.jch').forEach(el => spot.observe(el));

    return () => { reveal.disconnect(); spot.disconnect(); };
  }, []);

  function showToast() {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3500);
  }

  return (
    <div className="journey" ref={rootRef}>
      {webglFailed ? <StarfieldCanvas /> : <WorldCanvas onFail={() => setWebglFailed(true)} />}
      <JourneyNav />
      <WaypointRail active={active} />

      <main className="journey-main">
        <Chapter id="arrival">
          <p className="jch-kicker" data-rise>Incoming transmission · 2026</p>
          <h1 className="jch-title jch-title--hero" data-rise>
            Noriel Joy<br /><em>Embudo</em>
          </h1>
          <p className="jch-copy" data-rise>
            {META.title}. You've drifted into the machine dream — the world my
            systems inhabit while you sleep.
          </p>
          <div className="jch-cue" data-rise>
            <span className="jch-cue-line" />
            scroll to begin the descent
          </div>
        </Chapter>

        <Chapter id="signal">
          <p className="jch-kicker" data-rise>Chapter I — The Signal</p>
          <h2 className="jch-word" aria-hidden="true">Signal</h2>
          <p className="jch-copy jch-copy--wide" data-rise>
            Somewhere between the ticket queue and the timesheet, whole years of
            human time were quietly vanishing. I went looking for them — and
            started building systems that give them back.
          </p>
          <div className="jch-stats" data-rise>
            <div className="jstat"><strong>100,000+</strong><span>hours / year returned</span></div>
            <div className="jstat"><strong>5</strong><span>countries deployed</span></div>
            <div className="jstat"><strong>70+</strong><span>systems in production</span></div>
          </div>
        </Chapter>

        <Chapter id="forge" tall>
          <p className="jch-kicker" data-rise>Chapter II — The Forge</p>
          <h2 className="jch-word" aria-hidden="true">Forge</h2>
          <p className="jch-copy jch-copy--wide" data-rise>
            Where raw workflows are smelted into agents. Every crystal drifting
            through this field is a tool shaped in production.
          </p>
          <div className="jfloat-field" data-rise>
            {SKILLS.map((g, i) => (
              <div className="jfloat" style={{ '--d': `${i * 0.9}s` }} key={g.label}>
                <h3>{g.label}</h3>
                <p>{g.items.join(' · ')}</p>
              </div>
            ))}
          </div>
        </Chapter>

        <Chapter id="voyages" tall>
          <p className="jch-kicker" data-rise>Chapter III — The Voyages</p>
          <h2 className="jch-word" aria-hidden="true">Voyages</h2>
          <p className="jch-copy jch-copy--wide" data-rise>
            Three expeditions so far. Each gate remembers a crew, a fleet of
            machines, and the hours we brought home.
          </p>
          <div className="jgates" data-rise>
            {EXPERIENCE.map(e => (
              <div className="jgate" key={e.company}>
                <span className="jgate-dates">{e.dates}</span>
                <h3>{e.role}</h3>
                <p className="jgate-co">{e.company}</p>
                <p className="jgate-note">{e.bullets[0]}</p>
              </div>
            ))}
          </div>
        </Chapter>

        <Chapter id="blog" tall>
          <p className="jch-kicker" data-rise>Chapter IV — Field Notes</p>
          <h2 className="jch-word" aria-hidden="true">Notes</h2>
          <p className="jch-copy jch-copy--wide" data-rise>
            Logs recovered from the frontier — how these systems really get
            built, written from inside the engine room.
          </p>
          <div className="jnotes" data-rise>
            {POSTS.map(p => (
              <a className="jnote" href={`#/post/${p.slug}`} key={p.slug}>
                <span className="jnote-arrow">⟶</span>
                {p.title}
              </a>
            ))}
          </div>
        </Chapter>

        <Chapter id="contact" tall>
          <p className="jch-kicker" data-rise>Final chapter — The Beacon</p>
          <h2 className="jch-word" aria-hidden="true">Transmit</h2>
          <p className="jch-copy jch-copy--wide" data-rise>
            The beacon is live. Send a signal — roles, collaborations, wild
            ideas — and it will reach me.
          </p>
          <div className="jcontact" data-rise>
            <ContactForm onSuccess={showToast} />
            <a className="jresume" href={META.resumePath} target="_blank" rel="noreferrer">
              ⟓ Retrieve the ship's manifest (résumé)
            </a>
          </div>
          <footer className="jfooter" data-rise>
            {META.name} · {META.title} · end of transmission
          </footer>
        </Chapter>
      </main>

      <Toast visible={toastVisible} message="✓ Message transmitted successfully!" />
    </div>
  );
}
