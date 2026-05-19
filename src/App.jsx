import { useState, useEffect } from 'react';
import { useScrollProgress } from './hooks/useScrollProgress';
import { useHashRoute } from './hooks/useHashRoute';

import { StarfieldCanvas } from './components/canvas/StarfieldCanvas';
import { BigBangCanvas } from './components/canvas/BigBangCanvas';
import { CustomCursor } from './components/ui/CustomCursor';
import { ScrollPathLine } from './components/layout/ScrollPathLine';
import { Nav } from './components/layout/Nav';
import { Footer } from './components/layout/Footer';
import { Toast } from './components/ui/Toast';
import { ZodiacDivider } from './components/ui/ZodiacDivider';

import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Experience } from './components/sections/Experience';
import { Crew } from './components/sections/Crew';
import { Blog } from './components/sections/Blog';
import { Skills } from './components/sections/Skills';
import { Education } from './components/sections/Education';
import { Terminal } from './components/sections/Terminal';
import { Contact } from './components/sections/Contact';
import { BlogPost } from './components/blog/BlogPost';

export default function App() {
  const route = useHashRoute();
  // Skip the intro if the visitor deep-linked straight into an article.
  const [introPlayed, setIntroPlayed] = useState(
    () => /^#\/post\//.test(window.location.hash)
  );
  const [toastVisible, setToastVisible] = useState(false);
  const { pct, scrollY } = useScrollProgress();

  // Coming back from an article: scroll to the targeted section once the
  // portfolio has mounted (the element doesn't exist yet at hashchange time).
  useEffect(() => {
    if (route.view !== 'home') return;
    const id = window.location.hash.slice(1);
    if (!id) return;
    const el = document.getElementById(id);
    if (el) requestAnimationFrame(() => el.scrollIntoView());
  }, [route]);

  function showToast() {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3500);
  }

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
      <StarfieldCanvas />
      {!introPlayed && <BigBangCanvas onComplete={() => setIntroPlayed(true)} />}
      <CustomCursor />
      <ScrollPathLine pct={pct} scrollY={scrollY} />
      <Nav visible={introPlayed} />
      <main>
        <Hero />
        <ZodiacDivider />
        <About />
        <Experience />
        <Crew />
        <Blog />
        <Skills />
        <Education />
        <Terminal />
        <Contact onSuccess={showToast} />
      </main>
      <Footer />
      <Toast visible={toastVisible} message="✓ Message transmitted successfully!" />
    </>
  );
}
