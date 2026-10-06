import { useRef } from 'react';
import { gsap, useGSAP, reducedMotion } from '../lib/gsap';

const STEPS = [
  ['ثبّته من متجر التطبيقات', 'من سلة أو زد أو شوبيفاي، بضغطة زر. بدون كود ولا مبرمج.'],
  ['يتعلّم متجرك لحاله', 'يقرأ منتجاتك وأسعارك وسياسة الشحن والاسترجاع خلال دقايق.'],
  ['خصّصه وافتح الدوام', 'اختر شكله ونبرته، ومن هاللحظة متجرك فيه أحد يرد.'],
];

export default function HowItWorks() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      const q = gsap.utils.selector(root);
      gsap.from(q('.how-head > *, .how-step, .how-cta'), {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: { trigger: root.current, start: 'top 70%' },
      });
    },
    { scope: root },
  );

  return (
    <section className="how sec" id="start" ref={root}>
      <div className="wrap">
        <div className="how-head sec-head is-center">
          <p className="kicker">ثلاث خطوات</p>
          <h2 className="display h-lg">وتفتح الدوام اليوم</h2>
        </div>
        <ol className="how-steps">
          {STEPS.map(([t, d], i) => (
            <li className="how-step" key={t}>
              <span className="how-n display">{i + 1}</span>
              <h3 className="display">{t}</h3>
              <p>{d}</p>
            </li>
          ))}
        </ol>
        <div className="how-cta">
          <a className="btn" href="#start">
            ثبّت حيّاك الحين
          </a>
        </div>
      </div>
    </section>
  );
}
