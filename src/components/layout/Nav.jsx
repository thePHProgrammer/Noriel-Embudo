const LINKS = ['about', 'experience', 'projects', 'skills', 'education', 'terminal', 'contact'];

export function Nav({ visible }) {
  return (
    <nav id="main-nav" className={visible ? 'visible' : ''}>
      <div className="nav-logo">NJE // 2026</div>
      <ul className="nav-links">
        {LINKS.map(link => (
          <li key={link}>
            <a href={`#${link}`}>{link.charAt(0).toUpperCase() + link.slice(1)}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
