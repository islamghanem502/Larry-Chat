import Lenis from 'lenis';
import { gsap, ScrollTrigger, reducedMotion } from './gsap';

let lenis = null;

export function startSmoothScroll() {
  if (reducedMotion()) return () => {};
  lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 0.95 });
  lenis.on('scroll', ScrollTrigger.update);
  const raf = (time) => lenis.raf(time * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);
  return () => {
    gsap.ticker.remove(raf);
    lenis.destroy();
    lenis = null;
  };
}

export function scrollToHash(hash) {
  const target = document.querySelector(hash);
  if (!target) return;
  if (lenis) lenis.scrollTo(target, { offset: -20, duration: 1.4 });
  else target.scrollIntoView({ behavior: 'smooth' });
}
