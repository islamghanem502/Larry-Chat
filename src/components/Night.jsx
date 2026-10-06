import { useRef } from 'react';
import { gsap, useGSAP, reducedMotion } from '../lib/gsap';

// What the assistant handled overnight; `h` is the hour on a 23 → 31 (7am) scale
const LOG = [
  { h: 23.7, time: '11:42 م', text: 'جاوب 4 عملاء عن المقاسات والألوان' },
  { h: 24.5, time: '12:30 ص', text: 'اقترح عطر مكمّل، والعميل أضافه للسلة' },
  { h: 25.25, time: '1:15 ص', text: 'ذكّر نورة بسلتها على واتساب' },
  { h: 27.1, time: '3:07 ص', text: 'طلب جديد #1048 بقيمة 420 ر.س' },
  { h: 29.3, time: '5:20 ص', text: 'جاوب «وين طلبي؟» من شركة الشحن مباشرة' },
  { h: 31, time: '7:00 ص', text: 'ملخص الليلة جاهز في لوحتك' },
];

const STARS = [
  [34, 30, 1.6], [62, 18, 1.1], [150, 26, 1.4], [176, 52, 1], [22, 70, 1.2], [182, 120, 1.3], [16, 150, 1], [120, 14, 1],
];

export default function Night() {
  const root = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const items = q('.nt-item');
      if (reducedMotion()) {
        gsap.set(items, { opacity: 1 });
        return;
      }
      const mm = gsap.matchMedia();
      mm.add({ desktop: '(min-width: 901px) and (min-height: 640px)', mobile: '(max-width: 900px), (max-height: 639px)' }, (ctx) => {
        const { desktop } = ctx.conditions;
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: desktop
            ? { trigger: q('.nt-stage')[0], start: 'top top', end: () => '+=' + window.innerHeight * 2.4, pin: true, scrub: 0.8, anticipatePin: 1 }
            : { trigger: q('.nt-sky')[0], start: 'top 70%', end: 'bottom 20%', scrub: 0.8 },
        });
        // 8 hours pass: 11pm → 7am
        tl.fromTo(q('.nt-hour'), { rotation: 330, svgOrigin: '100 100' }, { rotation: 570, svgOrigin: '100 100', duration: 8 }, 0)
          .fromTo(q('.nt-min'), { rotation: 0, svgOrigin: '100 100' }, { rotation: 2880, svgOrigin: '100 100', duration: 8 }, 0)
          .fromTo(q('.nt-star'), { opacity: 1 }, { opacity: 0, duration: 1.4, stagger: 0.1 }, 5.8)
          .fromTo(q('.nt-moon'), { y: 0, opacity: 1 }, { y: 60, opacity: 0, duration: 2 }, 5.6)
          .to(q('.nt-sky-a'), { attr: { 'stop-color': '#ffb27a' }, duration: 2 }, 6)
          .to(q('.nt-sky-b'), { attr: { 'stop-color': '#ffe2a3' }, duration: 2 }, 6)
          .fromTo(q('.nt-sun'), { y: 80 }, { y: 0, duration: 2 }, 6)
          .to(q('.nt-tally'), { color: '#1b1330', duration: 1.2 }, 6.6);
        LOG.forEach((e, i) => {
          tl.fromTo(items[i], { opacity: 0.18, x: -16 }, { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }, e.h - 23 - 0.4);
        });
        const counts = [
          [q('.nt-chats')[0], 37],
          [q('.nt-orders')[0], 6],
        ];
        counts.forEach(([el, n]) => {
          const o = { v: 0 };
          tl.to(o, { v: n, duration: 7.6, onUpdate: () => (el.textContent = Math.round(o.v)) }, 0.2);
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section className="night" id="night" ref={root}>
      <div className="nt-stage">
        <div className="wrap nt-grid">
          <div className="nt-copy">
            <p className="kicker nt-kicker">بينما أنت نايم</p>
            <h2 className="nt-title display">
              <span>نام.</span> وخلّ حيّاك يرد ويهتم بمتجرك
            </h2>
            <ol className="nt-log">
              {LOG.map((e) => (
                <li className="nt-item" key={e.time}>
                  <time>{e.time}</time>
                  <span>{e.text}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="nt-sky frame" aria-hidden="true">
            <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
              <defs>
                <linearGradient id="ntSky" x1="0" y1="0" x2="0" y2="1">
                  <stop className="nt-sky-a" offset="0" stopColor="#0b1440" />
                  <stop className="nt-sky-b" offset="1" stopColor="#24357c" />
                </linearGradient>
                <mask id="ntCrescent">
                  <circle cx="160" cy="40" r="15" fill="#fff" />
                  <circle cx="167" cy="35" r="13" fill="#000" />
                </mask>
              </defs>
              <rect width="200" height="200" fill="url(#ntSky)" />
              {STARS.map(([x, y, r]) => (
                <circle key={x + '-' + y} className="nt-star" cx={x} cy={y} r={r} fill="#fff" />
              ))}
              <g className="nt-moon">
                <rect width="200" height="200" fill="#ffe9a8" mask="url(#ntCrescent)" />
              </g>
              <circle className="nt-sun" cx="100" cy="206" r="34" fill="#ffd23f" />
            </svg>

            <svg className="nt-clock" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="88" fill="#f6efe3" />
              {Array.from({ length: 12 }, (_, i) => (
                <line
                  key={i}
                  x1="100"
                  y1="22"
                  x2="100"
                  y2={i % 3 ? 30 : 36}
                  stroke="#1b1330"
                  strokeWidth={i % 3 ? 2.5 : 4.5}
                  strokeLinecap="round"
                  transform={`rotate(${i * 30} 100 100)`}
                />
              ))}
              <line className="nt-hour" x1="100" y1="100" x2="100" y2="56" stroke="#1b1330" strokeWidth="7" strokeLinecap="round" />
              <line className="nt-min" x1="100" y1="100" x2="100" y2="34" stroke="#1b1330" strokeWidth="4.5" strokeLinecap="round" />
              <circle cx="100" cy="100" r="6" fill="#ff4b2b" />
            </svg>

            <div className="nt-tally">
              <span>
                <b className="nt-chats">0</b> محادثة
              </span>
              <span>
                <b className="nt-orders">0</b> طلبات
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
