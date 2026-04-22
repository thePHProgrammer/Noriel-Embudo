import { useState } from 'react';
import { useScrollProgress } from './hooks/useScrollProgress';

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
import { Projects } from './components/sections/Projects';
import { Skills } from './components/sections/Skills';
import { Education } from './components/sections/Education';
import { Terminal } from './components/sections/Terminal';
import { Contact } from './components/sections/Contact';

export default function App() {
  const [navVisible, setNavVisible] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const { pct, scrollY } = useScrollProgress();

  function showToast() {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3500);
  }

  return (
    <>
      <StarfieldCanvas />
      <BigBangCanvas onComplete={() => setNavVisible(true)} />
      <CustomCursor />
      <ScrollPathLine pct={pct} scrollY={scrollY} />
      <Nav visible={navVisible} />
      <main>
        <Hero />
        <ZodiacDivider />
        <About />
        <Experience />
        <Projects />
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
