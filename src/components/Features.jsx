import { useRef } from 'react';
import { gsap, useGSAP, reducedMotion } from '../lib/gsap';

// 24×24 line icons, drawn with a single stroke style
const ICONS = {
  reply: 'M4 5h16v11H9l-5 4V5zM13 7l-3 4h4l-3 4',
  spark: 'M12 3l1.8 4.7L18.5 9l-4.7 1.8L12 15.5l-1.8-4.7L5.5 9l4.7-1.3zM18 15l.8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8z',
  cart: 'M3 4h2.5l2.2 10.5h10.6L20.5 7H7M9 19.5a1 1 0 1 0 0-.01M17 19.5a1 1 0 1 0 0-.01',
  truck: 'M3 6h11v9H3zM14 9h4l3 3v3h-7zM7 18.5a1.5 1.5 0 1 0 0-.01M17 18.5a1.5 1.5 0 1 0 0-.01',
  globe: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18',
  box: 'M4 7.5 12 3l8 4.5v9L12 21l-8-4.5zM4 7.5 12 12l8-4.5M12 12v9',
  handoff: 'M8 11a3 3 0 1 0 0-.01M3 20c0-3 2.2-5 5-5s5 2 5 5M15 8h6m-2-2 2 2-2 2M21 15h-6m2-2-2 2 2 2',
  clock: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3.5 2',
};

const FEATURES = [
  ['reply', 'يرد في ثانية', 'أسئلة الشحن والمقاسات والاسترجاع، يجاوبها من معلومات متجرك.'],
  ['spark', 'يقترح اللي يناسب', 'منتجات مكمّلة بالوقت الصح، مثل البيّاع الشاطر.'],
  ['cart', 'يرجّع السلات المتروكة', 'تذكير لطيف على واتساب بالمنتج نفسه، ومعه كود خصم لو حبيت.'],
  ['truck', 'يتابع الطلب بدالك', 'يجاوب «وين طلبي؟» من شركة الشحن مباشرة.'],
  ['globe', 'يتكلم لغة عميلك', 'عامّي أو فصحى أو إنجليزي، على حسب العميل.'],
  ['box', 'يعرف منتجاتك', 'يقرأ الأسعار والمخزون والسياسات، ويتحدّث تلقائيًا.'],
  ['handoff', 'يحوّل لك لما يلزم', 'يسلّم المحادثة لفريقك مع ملخص كامل.'],
  ['clock', 'ما ياخذ إجازة', '24 ساعة، 7 أيام، حتى في العيد.'],
];

export default function Features() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      const q = gsap.utils.selector(root);
      gsap.from(q('.ft-head > *'), {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: { trigger: q('.ft-head')[0], start: 'top 80%' },
      });
      gsap.from(q('.ft-item'), {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: { each: 0.08, grid: 'auto' },
        ease: 'expo.out',
        scrollTrigger: { trigger: q('.ft-grid')[0], start: 'top 80%' },
      });
      gsap.from(q('.ft-item path'), {
        drawSVG: '0%',
        duration: 1.4,
        stagger: 0.08,
        ease: 'power2.inOut',
        scrollTrigger: { trigger: q('.ft-grid')[0], start: 'top 80%' },
      });
    },
    { scope: root },
  );

  return (
    <section className="features sec" id="features" ref={root}>
      <div className="wrap">
        <div className="ft-head sec-head is-center">
          <p className="kicker">المزايا</p>
          <h2 className="display h-lg">كل اللي يسويه البيّاع الشاطر</h2>
          <p className="lead">وبنفس الوقت، مع كل عملائك، على مدار الساعة.</p>
        </div>
        <ul className="ft-grid">
          {FEATURES.map(([icon, t, d]) => (
            <li className="ft-item" key={t}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d={ICONS[icon]} />
              </svg>
              <h3 className="display">{t}</h3>
              <p>{d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
