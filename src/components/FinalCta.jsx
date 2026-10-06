import { useRef } from 'react';
import { gsap, useGSAP, splitWords, reducedMotion } from '../lib/gsap';
import BrandMark from './BrandMark';

// lanes converging on the greeting, drawn very quietly
const RAYS = Array.from({ length: 9 }, (_, i) => `M${-200 + i * 175},620 L500,300`);
const GREETING = 'حيّاك الله! كيف أقدر أخدمك اليوم؟';

export default function FinalCta() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      const q = gsap.utils.selector(root);
      const title = splitWords(q('.fc-title')).words;
      const text = q('.fc-typed')[0];
      const typed = { n: 0 };
      text.textContent = '';
      gsap
        .timeline({ scrollTrigger: { trigger: root.current, start: 'top 65%' } })
        .from(q('.fc-panel'), { y: 60, opacity: 0, duration: 1.1, ease: 'expo.out' })
        .fromTo(q('.fc-ray'), { drawSVG: '0%' }, { drawSVG: '100%', duration: 1.4, stagger: 0.04, ease: 'power2.inOut' }, 0.2)
        .from(q('.fc-bubble'), { scale: 0.6, opacity: 0, duration: 0.8, ease: 'back.out(1.8)' }, 0.5)
        .to(typed, {
          n: GREETING.length,
          duration: 1.6,
          ease: 'none',
          onUpdate: () => (text.textContent = GREETING.slice(0, Math.round(typed.n))),
        }, 1)
        .from(title, { y: 50, opacity: 0, duration: 1, stagger: 0.07, ease: 'expo.out' }, 0.6)
        .from(q('.fc-sub, .fc-ctas'), { y: 24, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'expo.out' }, 1);
    },
    { scope: root },
  );

  return (
    <section className="final sec" ref={root}>
      <div className="wrap fc-in">
        <div className="fc-panel frame" aria-hidden="true">
          <svg className="fc-rays" viewBox="0 0 1000 620" preserveAspectRatio="xMidYMax slice">
            {RAYS.map((d) => (
              <path key={d} className="fc-ray" d={d} />
            ))}
          </svg>
          <div className="fc-bubble">
            <span className="fc-ava">
              <BrandMark />
            </span>
            <p className="fc-typed">{GREETING}</p>
          </div>
        </div>
        <h2 className="fc-title display">خلّ متجرك يقول «حيّاك» لكل زائر</h2>
        <p className="fc-sub">ركّبه اليوم، وشوف الفرق من أول محادثة.</p>
        <div className="fc-ctas">
          <a className="btn" href="#start">
            ركّب حيّاك على متجرك
          </a>
        </div>
      </div>
    </section>
  );
}
