import { useRef } from 'react';
import { gsap, useGSAP, splitWords, reducedMotion } from '../lib/gsap';
import { typingDots } from '../lib/lottie';
import LottieIcon from './LottieIcon';
import BrandMark from './BrandMark';

const CHAT = [
  { who: 'bot', text: 'حيّاك الله! تدوّر شي معيّن؟' },
  { who: 'me', text: 'أبي عطر هدية لأبوي' },
  { who: 'bot', text: 'أبشر، هذي أكثر اثنين ينطلبون:', products: true },
  { who: 'me', text: 'أضف الأول للسلة' },
  { who: 'bot', text: 'تم ✓ وأغلّفه لك هدية مجانًا' },
];

export default function Hero() {
  const root = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const msgs = q('.hv-msg');
      const typing = q('.hv-typing')[0];
      if (reducedMotion()) {
        gsap.set(msgs, { display: 'flex' });
        return;
      }

      const words = splitWords(q('.hero-title .line')).words;
      gsap
        .timeline({ delay: 0.15, defaults: { ease: 'expo.out' } })
        .from(q('.hero-kicker'), { y: 16, opacity: 0, duration: 0.8 }, 0.1)
        .from(words, { y: 60, opacity: 0, duration: 1.1, stagger: 0.07 }, 0.15)
        .from(q('.hero-title .tag-bg'), { scaleX: 0, duration: 0.8, ease: 'power4.inOut' }, 0.6)
        .from(q('.hero-lead, .hero-ctas'), { y: 20, opacity: 0, duration: 0.9, stagger: 0.1 }, 0.7)
        .from(q('.hero-visual'), { y: 80, opacity: 0, duration: 1.4 }, 0.3)
        .from(q('.hv-widget'), { y: 40, scale: 0.94, opacity: 0, duration: 1, ease: 'back.out(1.4)' }, 0.8);

      // the conversation plays on a loop
      const chat = gsap.timeline({ repeat: -1, delay: 1.8, repeatDelay: 0.4 });
      chat.set(msgs, { display: 'none', opacity: 0 });
      msgs.forEach((m) => {
        if (m.dataset.who === 'bot') {
          chat.set(typing, { display: 'inline-grid' }, '+=0.5').set(typing, { display: 'none' }, '+=0.9');
        } else {
          chat.to({}, { duration: 0.8 });
        }
        chat.set(m, { display: 'flex' }).fromTo(m, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' });
      });
      chat.to(msgs, { opacity: 0, duration: 0.4 }, '+=2.6');

      gsap.to(q('.hero-visual'), {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      });
    },
    { scope: root },
  );

  return (
    <section className="hero" id="top" ref={root}>
      <div className="hero-grid wrap">
        <div className="hero-copy">
          <p className="hero-kicker kicker">بيّاع ذكي لمتجرك الأونلاين</p>
          <h1 className="hero-title display h-xl">
            <span className="line">حوّل متجرك</span>
            <span className="line">الأونلاين إلى</span>
            <span className="line">
              <span className="tag-box">
                <span className="tag-bg" />
                متجر حقيقي
              </span>
            </span>
          </h1>
          <p className="hero-lead lead">
            حيّاك يستقبل زوارك، يفهم وش يبون، يقترح عليهم، ويذكّرهم بسلتهم على واتساب. يركب على سلة وزد وشوبيفاي في دقيقة.
          </p>
          <div className="hero-ctas">
            <a className="btn" href="#start">
              ركّب حيّاك على متجرك
            </a>
            <a className="link-arrow" href="#journey">
              شوف كيف يشتغل
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 4v15m0 0-6-6m6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>

        <div className="hero-visual frame" aria-hidden="true">
          <div className="hv-store">
            <div className="hv-nav">
              <b>ريحان</b>
              <i />
            </div>
            <div className="hv-grid">
              {['b-oud', 'b-amber', 'b-musk', 'b-bakhoor'].map((c) => (
                <div className="hv-prod" key={c}>
                  <span className={'bottle ' + c} />
                  <i />
                  <i />
                </div>
              ))}
            </div>
          </div>

          <div className="hv-widget">
            <div className="hv-head">
              <span className="hv-ava">
                <BrandMark />
              </span>
              <div>
                <b>حيّاك</b>
                <small>
                  <i className="dot-live" /> متصل الآن
                </small>
              </div>
            </div>
            <div className="hv-body">
              {CHAT.map((m, i) => (
                <div key={i} className={'hv-msg is-' + m.who} data-who={m.who}>
                  <p>{m.text}</p>
                  {m.products && (
                    <div className="hv-prods">
                      <span>
                        <span className="bottle b-oud" />
                        <b>دهن عود</b>
                        <em>320 ر.س</em>
                      </span>
                      <span>
                        <span className="bottle b-amber" />
                        <b>عنبر ملكي</b>
                        <em>240 ر.س</em>
                      </span>
                    </div>
                  )}
                </div>
              ))}
              <span className="hv-typing">
                <LottieIcon make={typingDots} />
              </span>
            </div>
            <div className="hv-input">
              <span>اكتب رسالتك…</span>
              <i />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
