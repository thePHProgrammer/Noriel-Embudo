import { useRef } from 'react';
import { useTypewriter } from '../../hooks/useTypewriter';
import { useHeroParallax } from '../../hooks/useHeroParallax';
import { META, TYPEWRITER_PHRASES } from '../../data/meta';

export function Hero() {
  const nameRef = useRef(null);
  const titleRef = useRef(null);
  const text = useTypewriter(TYPEWRITER_PHRASES);
  useHeroParallax(nameRef, titleRef);

  return (
    <section id="hero" className="visible">
      <div className="hero-eyebrow">Origin Point · The Big Bang</div>
      <h1 className="hero-name" ref={nameRef}>{META.name}</h1>
      <p className="hero-title" ref={titleRef}>{META.title}</p>
      <div className="hero-typewriter">{text}</div>
      <div className="hero-btns">
        <a href="#contact" className="btn-primary">Send a Signal →</a>
        <a href="#about" className="btn-outline">↓ Chart the Course</a>
      </div>
      <div className="scroll-hint">
        <span>Scroll to explore the universe</span>
        <div className="arrow" />
      </div>
    </section>
  );
}
