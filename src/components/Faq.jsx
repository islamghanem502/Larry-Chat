import { useRef, useState } from 'react';
import { gsap, useGSAP } from '../lib/gsap';

const FAQ = [
  ['هل أحتاج خبرة تقنية؟', 'أبدًا. تثبّته من متجر تطبيقات منصتك، وتخصصه من لوحة تحكم بسيطة بالعربي.'],
  ['على أي منصات يشتغل؟', 'سلة وزد وشوبيفاي، ويركب على أي متجر ثاني بسطر كود واحد.'],
  ['كيف يعرف معلومات منتجاتي؟', 'يقرأ منتجاتك وأسعارك ومخزونك وسياساتك من متجرك مباشرة، ويتحدّث تلقائيًا مع كل تعديل تسويه.'],
  ['وش يصير لو ما عرف يجاوب؟', 'يحوّل المحادثة لك أو لفريقك مع ملخص كامل، عشان العميل ما يعيد كلامه من البداية.'],
  ['رسائل واتساب، ما تزعج العميل؟', 'أنت تتحكم بعدد التذكيرات وتوقيتها ونبرتها. الهدف تذكير لطيف بالوقت المناسب، مو إزعاج.'],
  ['يتكلم إنجليزي؟', 'يتكلم العربي بلهجاته والإنجليزي، ويرد بلغة العميل تلقائيًا.'],
];

export default function Faq() {
  const root = useRef(null);
  const [open, setOpen] = useState(0);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      gsap.from(q('.faq-item'), {
        y: 40,
        opacity: 0,
        stagger: 0.07,
        duration: 0.9,
        ease: 'expo.out',
        scrollTrigger: { trigger: q('.faq-list')[0], start: 'top 80%' },
      });
    },
    { scope: root },
  );

  return (
    <section className="faq sec" id="faq" ref={root}>
      <div className="wrap faq-grid">
        <div className="faq-head sec-head">
          <p className="kicker">أسئلة تتكرر</p>
          <h2 className="display h-lg">قبل لا تسأله، اسألنا</h2>
          <p className="lead">وإذا عندك سؤال ثاني، المساعد اللي تحت يسار الشاشة جاهز.</p>
        </div>
        <div className="faq-list">
          {FAQ.map(([qq, a], i) => (
            <div className={'faq-item' + (open === i ? ' is-open' : '')} key={qq}>
              <h3>
                <button type="button" aria-expanded={open === i} aria-controls={'faq-' + i} onClick={() => setOpen(open === i ? -1 : i)}>
                  <span>{qq}</span>
                  <i aria-hidden="true" />
                </button>
              </h3>
              <div className="faq-a" id={'faq-' + i} role="region">
                <div>
                  <p>{a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
