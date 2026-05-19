import { useState, useEffect } from 'react';

// Blog posts live at #/post/<slug>. Every other hash (#about, #blog, "")
// is the single-page portfolio and keeps native scroll-anchor behavior.
function parse() {
  const m = window.location.hash.match(/^#\/post\/([\w-]+)/);
  return m ? { view: 'post', slug: m[1] } : { view: 'home' };
}

export function useHashRoute() {
  const [route, setRoute] = useState(parse);

  useEffect(() => {
    function onChange() {
      setRoute(parse());
    }
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return route;
}

export function goHome() {
  window.location.hash = '#blog';
}
