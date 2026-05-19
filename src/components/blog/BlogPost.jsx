import { useEffect } from 'react';
import { goHome } from '../../hooks/useHashRoute';
import { getPost } from '../../data/posts';
import { Footer } from '../layout/Footer';

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function Block({ block }) {
  switch (block.type) {
    case 'h2':
      return <h2 className="post-h2">{block.text}</h2>;
    case 'list':
      return (
        <ul className="post-list">
          {block.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      );
    case 'quote':
      return <blockquote className="post-quote">{block.text}</blockquote>;
    case 'code':
      return (
        <pre className="post-code">
          <code>{block.text}</code>
        </pre>
      );
    case 'img':
      return (
        <figure className="post-figure">
          <img src={block.src} alt={block.alt || ''} loading="lazy" />
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      );
    case 'p':
    default:
      return <p className="post-p">{block.text}</p>;
  }
}

export function BlogPost({ slug }) {
  const post = getPost(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="post-page">
        <div className="post-article">
          <button className="post-back" onClick={goHome}>
            ← Back to all posts
          </button>
          <h1 className="post-title">Post not found</h1>
          <p className="post-p">
            That mission log doesn’t exist. It may have been moved or renamed.
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="post-page">
      <article className="post-article">
        <button className="post-back" onClick={goHome}>
          ← Back to all posts
        </button>
        <div className="post-meta">
          <span>{formatDate(post.date)}</span>
          <span className="blog-card-dot">·</span>
          <span>{post.readTime}</span>
        </div>
        <h1 className="post-title">{post.title}</h1>
        {post.award && <div className="post-award">{post.award}</div>}
        <div className="post-tags">
          {post.tags.map(t => (
            <span key={t} className="project-tag">
              {t}
            </span>
          ))}
        </div>
        <div className="post-divider" />
        <div className="post-body">
          {post.content.map((b, i) => (
            <Block key={i} block={b} />
          ))}
        </div>
        <div className="post-divider" />
        <button className="post-back post-back-bottom" onClick={goHome}>
          ← Back to all posts
        </button>
      </article>
      <Footer />
    </div>
  );
}
