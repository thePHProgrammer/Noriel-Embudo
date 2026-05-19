import { useRef } from 'react';
import { useReveal } from '../../hooks/useSectionReveal';

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function BlogCard({ slug, title, excerpt, date, readTime, tags, award }) {
  const ref = useRef(null);
  const on = useReveal(ref);

  return (
    <a
      href={`#/post/${slug}`}
      className={`blog-card reveal${on ? ' on' : ''}`}
      ref={ref}
    >
      <div className="blog-card-meta">
        <span>{formatDate(date)}</span>
        <span className="blog-card-dot">·</span>
        <span>{readTime}</span>
      </div>
      <h3 className="blog-card-title">{title}</h3>
      {award && <div className="blog-card-award">{award}</div>}
      <p className="blog-card-excerpt">{excerpt}</p>
      <div className="blog-card-tags">
        {tags.map(t => (
          <span key={t} className="project-tag">
            {t}
          </span>
        ))}
      </div>
      <span className="blog-card-cta">Read post →</span>
    </a>
  );
}
