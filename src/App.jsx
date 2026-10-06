import { useEffect } from 'react';
import { ScrollTrigger } from './lib/gsap';
import { startSmoothScroll, scrollToHash } from './lib/scroll';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Statement from './components/Statement';
import Journey from './components/Journey';
import Night from './components/Night';
import Features from './components/Features';
import Studio from './components/Studio';
import HowItWorks from './components/HowItWorks';
import Faq from './components/Faq';
import FinalCta from './components/FinalCta';
import Footer from './components/Footer';
import DemoWidget from './components/DemoWidget';

export default function App() {
  useEffect(() => {
    const stop = startSmoothScroll();
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a || a.getAttribute('href').length < 2) return;
      e.preventDefault();
      scrollToHash(a.getAttribute('href'));
    };
    document.addEventListener('click', onClick);
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => {
      stop();
      document.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Statement />
        <Journey />
        <Night />
        <Features />
        <Studio />
        <HowItWorks />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <DemoWidget />
      <div className="grain" aria-hidden="true" />
    </>
  );
}
