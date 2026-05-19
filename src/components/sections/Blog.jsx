import { useRef } from 'react';
import { useSectionReveal } from '../../hooks/useSectionReveal';
import { PlanetProjects } from '../planet/PlanetProjects';
import { BlogCard } from '../ui/BlogCard';
import { POSTS } from '../../data/posts';

export function Blog() {
  const sectionRef = useRef(null);
  const visible = useSectionReveal(sectionRef);

  return (
    <section id="blog" className={visible ? 'visible' : ''} ref={sectionRef}>
      <div className="section-inner">
        <div className="planet-wrap">
          <PlanetProjects />
        </div>
        <div className="content-wrap">
          <div className="section-label">04 · Blog</div>
          <h2 className="section-title">Field Notes</h2>
          <p
            style={{
              fontSize: '11px',
              color: 'var(--dim)',
              fontFamily: "'Space Mono', monospace",
              marginBottom: '20px',
              letterSpacing: '.06em',
            }}
          >
            DEEP-DIVE WRITE-UPS ON DEPLOYED MISSIONS
          </p>
          <div className="blog-list">
            {POSTS.map(p => (
              <BlogCard key={p.slug} {...p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
