import { useEffect } from 'react';
import { useHashRoute } from './hooks/useHashRoute';

import { StarfieldCanvas } from './components/canvas/StarfieldCanvas';
import { CustomCursor } from './components/ui/CustomCursor';
import { BlogPost } from './components/blog/BlogPost';
import { JourneyPage } from './world/JourneyPage';

export default function App() {
  const route = useHashRoute();

  // Coming back from an article: scroll to the targeted waypoint once the
  // journey has mounted (the element doesn't exist yet at hashchange time).
  useEffect(() => {
    if (route.view !== 'home') return;
    const id = window.location.hash.slice(1);
    if (!id) return;
    const el = document.getElementById(id);
    if (el) requestAnimationFrame(() => el.scrollIntoView());
  }, [route]);

  if (route.view === 'post') {
    return (
      <>
        <StarfieldCanvas />
        <CustomCursor />
        <BlogPost slug={route.slug} />
      </>
    );
  }

  return (
    <>
      <CustomCursor />
      <JourneyPage />
    </>
  );
}
