import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, useGSAP, reducedMotion } from '../lib/gsap';
import { typingDots, checkMark } from '../lib/lottie';
import LottieIcon from './LottieIcon';
import BrandMark from './BrandMark';

const STEPS = [
  {
    t: 'يستقبلك من الباب',
    d: 'أول ما يدخل الزائر، يرحّب فيه حيّاك ويسأله وش يدوّر. مثل البيّاع اللي يقابلك عند الباب، بس بدون إحراج.',
    real: '«حيّاك، تفضّل»',
  },
  {
    t: 'يفهم وش تبي',
    d: 'يسأل الأسئلة الصح: لمين؟ وش الذوق؟ كم الميزانية؟ ويفهم العامّية والإنجليزي والكلام المكسّر.',
    real: '«لمين الهدية؟»',
  },
  {
    t: 'يقترح عليك صح',
    d: 'يطلع لك المنتجات المناسبة من متجرك نفسه، بالصور والأسعار والمقاسات المتوفرة فعلًا.',
    real: '«جرّب هذا، يناسبك»',
  },
  {
    t: 'يمشي معك لين الكاشير',
    d: 'يضيف للسلة، يقترح إضافة ترفع قيمة الطلب، ويجاوب عن الشحن والدفع لين يكتمل الطلب.',
    real: '«أغلّفه لك هدية؟»',
  },
  {
    t: 'ولو طلعت… يذكّرك',
    d: 'نسي العميل سلته؟ يوصله تذكير لطيف على واتساب بالمنتج نفسه، ومعه كود خصم لو حبيت.',
    real: '«تراه محجوز لك»',
  },
];

const PRODUCTS = [
  { n: 'دهن عود كمبودي', p: 320, c: 'b-oud' },
  { n: 'عنبر ملكي', p: 240, c: 'b-amber' },
  { n: 'مسك الطهارة', p: 85, c: 'b-musk' },
  { n: 'بخور معطّر', p: 120, c: 'b-bakhoor' },
];

const CHAT = [
  { s: 0, who: 'bot', text: 'هلا والله في ريحان! أول زيارة لك؟' },
  { s: 0, who: 'bot', text: 'تدوّر شي معيّن، ولا أعرض لك الأكثر طلبًا؟', chips: ['أبي هدية', 'الأكثر مبيعًا', 'عطور رجالية'] },
  { s: 1, who: 'me', text: 'أبي عطر هدية لأبوي، يحب الروايح الثقيلة' },
  { s: 1, who: 'bot', text: 'ذوقه فخم! الثقيلة غالبًا عود أو عنبر. يبيه يثبت طول اليوم؟' },
  { s: 1, who: 'me', text: 'إيه، ثبات قوي' },
  { s: 2, who: 'bot', text: 'أنسب اثنين له من عندنا:', products: [0, 1] },
  { s: 3, who: 'me', text: 'خلاص، دهن العود' },
  { s: 3, who: 'bot', text: 'أضفته لسلتك', check: true },
  { s: 3, who: 'bot', text: 'أغلّفه لك هدية مع بطاقة باسمك؟ مجانًا', chips: ['أكيد!', 'لا شكرًا'] },
];

function Bottle({ c }) {
  return <span className={'bottle ' + c} aria-hidden="true" />;
}

function Phone({ step }) {
  const listRef = useRef(null);
  const viewRef = useRef(null);
  const typingRef = useRef(null);
  const shown = useRef(-1);

  useLayoutEffect(() => {
    const screen = listRef.current.closest('.ph-screen');
    gsap.set(screen.querySelector('.ph-chat'), { yPercent: 105 });
    gsap.set(screen.querySelector('.ph-wa'), { xPercent: -105 });
  }, []);

  useEffect(() => {
    const list = listRef.current;
    const screen = list.closest('.ph-screen');
    const msgs = [...list.querySelectorAll('.cm[data-s]')];
    const typing = typingRef.current;
    const instant = reducedMotion();
    // keep the newest message in view
    const scrollEnd = (d = 0.5) => {
      const max = Math.min(0, viewRef.current.clientHeight - list.scrollHeight - 8);
      gsap.to(list, { y: max, duration: instant ? 0 : d, ease: 'power3.out', overwrite: true });
    };
    const tl = gsap.timeline();
    const chatStep = Math.min(step, 3);

    if (chatStep > shown.current) {
      const fast = chatStep - shown.current > 1 || instant;
      msgs.forEach((m) => {
        const s = +m.dataset.s;
        if (s <= shown.current || s > chatStep) return;
        if (m.dataset.who === 'bot' && !fast) {
          tl.set(typing, { display: 'flex' })
            .call(() => scrollEnd(0.3))
            .to({}, { duration: 0.6 })
            .set(typing, { display: 'none' });
        }
        tl.set(m, { display: 'flex' })
          .call(() => scrollEnd())
          .fromTo(m, { opacity: 0, y: 14, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: fast ? 0.2 : 0.4, ease: 'back.out(1.8)' });
      });
    } else if (chatStep < shown.current) {
      msgs.forEach((m) => {
        if (+m.dataset.s > chatStep) gsap.set(m, { display: 'none' });
      });
      gsap.set(typing, { display: 'none' });
      scrollEnd(0.3);
    }
    shown.current = chatStep;

    gsap.to(screen.querySelector('.ph-wa'), { xPercent: step >= 4 ? 0 : -105, duration: instant ? 0 : 0.7, ease: 'expo.inOut' });
    gsap.to(screen.querySelector('.ph-chat'), { yPercent: step >= 0 ? 0 : 105, duration: instant ? 0 : 0.6, ease: 'expo.out' });
    return () => tl.progress(1).kill();
  }, [step]);

  return (
    <div className="phone" aria-hidden="true">
      <div className="ph-screen">
        <div className="ph-status">
          <span>9:41</span>
          <span className="ph-notch" />
          <span>100%</span>
        </div>
        <div className="ph-store">
          <div className="ph-top">
            <span className="ph-menu">
              <i />
              <i />
            </span>
            <b className="ph-brand">ريحان</b>
            <span className="ph-cart">
              <svg viewBox="0 0 24 24">
                <path d="M3 4h2.5l2.2 10.5h10.6L20.5 7H7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="9" cy="19" r="1.6" fill="currentColor" />
                <circle cx="17" cy="19" r="1.6" fill="currentColor" />
              </svg>
              <em className={step >= 3 ? 'is-on' : ''}>1</em>
            </span>
          </div>
          <div className="ph-banner">
            <div>
              <small>مجموعة الشتاء</small>
              <b>عطور تثبت معك</b>
            </div>
            <Bottle c="b-oud big" />
          </div>
          <div className="ph-grid">
            {PRODUCTS.map((p) => (
              <div className="ph-prod" key={p.n}>
                <div className="ph-img">
                  <Bottle c={p.c} />
                </div>
                <span>{p.n}</span>
                <b>{p.p} ر.س</b>
              </div>
            ))}
          </div>
        </div>

        <div className="ph-chat">
          <div className="ph-chat-head">
            <span className="ph-ava">
              <BrandMark />
            </span>
            <div>
              <b>حيّاك</b>
              <small>
                <i className="dot-live" /> مساعد ريحان · متصل الآن
              </small>
            </div>
            <span className="ph-x">×</span>
          </div>
          <div className="ph-msgs" ref={viewRef}>
            <div className="ph-list" ref={listRef}>
              {CHAT.map((m, i) => (
                <div key={i} className={'cm cm-' + m.who} data-s={m.s} data-who={m.who}>
                  <p>
                    {m.check && <LottieIcon make={checkMark} className="cm-check" once />}
                    {m.text}
                  </p>
                  {m.chips && (
                    <div className="cm-chips">
                      {m.chips.map((c) => (
                        <span key={c}>{c}</span>
                      ))}
                    </div>
                  )}
                  {m.products && (
                    <div className="cm-prods">
                      {m.products.map((k) => (
                        <div className="cm-prod" key={k}>
                          <Bottle c={PRODUCTS[k].c} />
                          <span>{PRODUCTS[k].n}</span>
                          <b>{PRODUCTS[k].p} ر.س</b>
                          <em>أضف للسلة</em>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="cm cm-bot cm-typing" ref={typingRef}>
                <p>
                  <LottieIcon make={typingDots} className="cm-dots" />
                </p>
              </div>
            </div>
          </div>
          <div className="ph-input">
            <span>اكتب رسالتك…</span>
            <i>
              <svg viewBox="0 0 24 24">
                <path d="M20 4 4 11l6 2.5L12.5 20z" fill="currentColor" />
              </svg>
            </i>
          </div>
        </div>

        <div className="ph-wa">
          <div className="wa-head">
            <span className="wa-back">‹</span>
            <span className="wa-ava">ر</span>
            <div>
              <b>ريحان للعطور</b>
              <small>حساب تجاري</small>
            </div>
          </div>
          <div className="wa-body">
            <span className="wa-day">اليوم</span>
            <div className="wa-msg">
              <p>هلا عبدالله، دهن العود الكمبودي لسا في سلتك، والتغليف جاهز باسمك.</p>
              <p>
                كود خصم 10% لك: <b>REHAN10</b> صالح لين بكرة.
              </p>
              <div className="wa-card">
                <Bottle c="b-oud" />
                <div>
                  <b>دهن عود كمبودي</b>
                  <span>320 ر.س</span>
                </div>
              </div>
              <time>9:41 م</time>
            </div>
            <div className="wa-btn">أكمل الطلب</div>
            <div className="wa-btn">كلّم المساعد</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Journey() {
  const root = useRef(null);
  const [step, setStep] = useState(-1);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          desktop: '(min-width: 901px) and (min-height: 620px)',
          mobile: '(max-width: 900px), (max-height: 619px)',
        },
        (ctx) => {
          const { desktop } = ctx.conditions;
          // the chat opens just before the stage pins
          ScrollTrigger.create({
            trigger: '.jr-stage',
            start: 'top 65%',
            onEnter: () => setStep((v) => Math.max(v, 0)),
            onLeaveBack: () => setStep(-1),
          });
          ScrollTrigger.create({
            trigger: '.jr-stage',
            start: 'top top',
            end: () => '+=' + window.innerHeight * (desktop ? 3.6 : 3.2),
            pin: true,
            anticipatePin: 1,
            onUpdate: (self) => setStep(Math.min(STEPS.length - 1, Math.floor(self.progress * STEPS.length * 0.999))),
          });
          gsap.from('.jr-head > *', {
            y: 30,
            opacity: 0,
            stagger: 0.1,
            duration: 0.9,
            ease: 'expo.out',
            scrollTrigger: { trigger: '.jr-head', start: 'top 80%' },
          });
        },
      );
    },
    { scope: root },
  );

  const active = Math.max(step, 0);

  return (
    <section className="journey" id="journey" ref={root}>
      <div className="wrap jr-head sec-head">
        <p className="kicker">تجربة شراء حقيقية</p>
        <h2 className="display h-lg">
          من أول «هلا» لين «وصل طلبك»
        </h2>
        <p className="lead">هذا اللي يصير لما يدخل عميل متجرك وحيّاك على رأس شغله.</p>
      </div>

      <div className="jr-stage">
        <div className="wrap jr-grid">
          <ol className="jr-steps">
            {STEPS.map((s, i) => (
              <li key={s.t} className={'jr-step' + (i === active ? ' is-active' : '') + (i < active ? ' is-done' : '')}>
                <span className="jr-num">{String(i + 1).padStart(2, '0')}</span>
                <div className="jr-txt">
                  <h3 className="display">{s.t}</h3>
                  <div className="jr-body">
                    <div>
                      <p>{s.d}</p>
                      <span className="jr-real">في المحل: {s.real}</span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
          <div className="jr-phone">
            <Phone step={step} />
            <div className="jr-progress" aria-hidden="true">
              {STEPS.map((s, i) => (
                <i key={s.t} className={i <= active ? 'is-on' : ''} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
