import { useState, useEffect } from 'react';

const LINKS = ['about', 'experience', 'crew', 'projects', 'skills', 'education', 'terminal', 'contact'];

export function Nav({ visible }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onResize() {
      if (window.innerWidth > 768) setMenuOpen(false);
    }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  function closeMenu() { setMenuOpen(false); }

  return (
    <nav id="main-nav" className={`${visible ? 'visible' : ''}${menuOpen ? ' menu-open' : ''}`}>
      <div className="nav-logo">NJE // 2026</div>
      <button
        className={`nav-hamburger${menuOpen ? ' open' : ''}`}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(o => !o)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
        {LINKS.map(link => (
          <li key={link}>
            <a href={`#${link}`} onClick={closeMenu}>
              {link.charAt(0).toUpperCase() + link.slice(1)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
