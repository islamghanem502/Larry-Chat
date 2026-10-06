import { useRef } from 'react';
import { gsap, useGSAP, splitWords, reducedMotion } from '../lib/gsap';

// Deterministic scribble for the tumbleweed
const weed = (() => {
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  return Array.from({ length: 16 }, (_, i) => ({
    cx: 60 + (rnd() - 0.5) * 14,
    cy: 60 + (rnd() - 0.5) * 14,
    rx: 26 + rnd() * 26,
    ry: 12 + rnd() * 30,
    r: rnd() * 180,
    c: i % 3 ? '#a8823f' : '#7a5a26',
  }));
})();

export default function Statement() {
  const root = useRef(null);

  useGSAP(
    () => {
      const blocks = gsap.utils.toArray('.st-reveal');
      if (reducedMotion()) return;
      blocks.forEach((b) => {
        const s = splitWords(b);
        gsap.fromTo(
          s.words,
          { opacity: 0.12 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: 'none',
            scrollTrigger: { trigger: b, start: 'top 82%', end: 'bottom 45%', scrub: true },
          },
        );
      });

      const silence = root.current.querySelector('.st-silence');
      const tl = gsap.timeline({
        scrollTrigger: { trigger: silence, start: 'top 85%', end: 'bottom 15%', scrub: 0.6 },
      });
      tl.fromTo('.st-weed', { x: () => -window.innerWidth * 0.25 }, { x: () => window.innerWidth * 1.1, ease: 'none', duration: 1 }, 0)
        .fromTo('.st-weed svg', { rotation: 0 }, { rotation: 900, ease: 'none', duration: 1 }, 0)
        .to('.st-weed svg', { y: -46, duration: 0.12, yoyo: true, repeat: 7, ease: 'sine.out' }, 0)
        .from('.st-big', { scale: 0.86, opacity: 0, duration: 0.25, ease: 'power2.out' }, 0.05);
    },
    { scope: root },
  );

  return (
    <section className="statement sec" ref={root}>
      <div className="wrap st-wrap">
        <p className="kicker st-kicker">الفكرة ببساطة</p>
        <p className="st-reveal display st-line">
          في المتجر الحقيقي، أول ما تدخل يقول لك أحد: «حيّاك! تدوّر شي معيّن؟»
        </p>

        <div className="st-silence">
          <p className="st-q display">وفي متجرك الأونلاين؟</p>
          <p className="st-big display">صمت.</p>
          <div className="st-weed" aria-hidden="true">
            <svg viewBox="0 0 120 120">
              {weed.map((e, i) => (
                <ellipse key={i} cx={e.cx} cy={e.cy} rx={e.rx} ry={e.ry} transform={`rotate(${e.r} 60 60)`} fill="none" stroke={e.c} strokeWidth="3" strokeLinecap="round" />
              ))}
            </svg>
            <i />
          </div>
        </div>

        <p className="st-reveal display st-line st-line-end">
          حيّاك يرجّع لمتجرك <span className="tag-box is-yellow">
            <span className="tag-bg" />
            روح البيّاع
          </span>: يرحّب، يسأل، يقترح، ويمشي مع عميلك لين يوصله طلبه.
        </p>
      </div>
    </section>
  );
}
