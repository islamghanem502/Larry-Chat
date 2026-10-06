import { useEffect, useRef, useState } from 'react';
import { gsap, reducedMotion } from '../lib/gsap';
import { typingDots } from '../lib/lottie';
import LottieIcon from './LottieIcon';
import BrandMark from './BrandMark';

const ANSWERS = [
  {
    chip: 'وش تقدر تسوي؟',
    match: /تسوي|تقدر|مزايا|ميزات|وش انت|مين انت/,
    a: 'أرد على عملائك، أقترح عليهم منتجات تناسبهم، أتابع طلباتهم، وأذكّرهم بسلتهم على واتساب. ٢٤ ساعة، بدون إجازات.',
  },
  {
    chip: 'كيف أركّبك على متجري؟',
    match: /سلة|زد|شوبيفاي|shopify|اركب|أركب|تثبيت|ثبت/i,
    a: 'من متجر تطبيقات منصتك (سلة أو زد أو شوبيفاي): تدوّر «حيّاك» وتضغط تثبيت. دقيقة وأكون على رأس الشغل.',
  },
  {
    chip: 'كم السعر؟',
    match: /سعر|كم|باقة|باقات|اشتراك|price/i,
    a: 'فيه باقات تناسب حجم متجرك وعدد محادثاته. اضغط «ركّبه على متجرك» فوق ونرسل لك التفاصيل.',
  },
  {
    chip: 'تكلّم عامّي؟',
    match: /عامي|عامّي|لهجة|لهجات|انجليزي|إنجليزي|english/i,
    a: 'أبشر! أتكلم عامّي وفصحى وإنجليزي، وأرد على العميل بنفس الأسلوب اللي يكلمني فيه.',
  },
];
const FALLBACK = 'سؤال حلو! هذي نسخة تجريبية، أما النسخة الحقيقية فتجاوب من بيانات متجرك نفسه: منتجاتك وأسعارك وسياساتك.';

export default function DemoWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([{ who: 'bot', text: 'حيّاك! هذي نسخة تجريبية من المساعد. اسألني أي شي أو اختر من تحت.' }]);
  const [typing, setTyping] = useState(false);
  const [text, setText] = useState('');
  const panel = useRef(null);
  const list = useRef(null);
  const launcher = useRef(null);

  // the launcher pops in once the visitor has had a look around
  useEffect(() => {
    if (reducedMotion()) return;
    const btn = launcher.current;
    const tw = gsap.fromTo(btn, { scale: 0 }, { scale: 1, duration: 0.6, delay: 3, ease: 'back.out(2)' });
    return () => {
      tw.kill();
      gsap.set(btn, { clearProps: 'all' });
    };
  }, []);

  useEffect(() => {
    if (!panel.current) return;
    if (open) gsap.fromTo(panel.current, { autoAlpha: 0, y: 30, scale: 0.92 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.45, ease: 'back.out(1.6)' });
    else gsap.to(panel.current, { autoAlpha: 0, y: 20, scale: 0.95, duration: 0.25, ease: 'power2.in' });
  }, [open]);

  useEffect(() => {
    const l = list.current;
    if (l) gsap.to(l, { scrollTop: l.scrollHeight, duration: 0.4, ease: 'power2.out' });
  }, [msgs, typing]);

  const ask = (q) => {
    const question = q.trim();
    if (!question || typing) return;
    setMsgs((m) => [...m, { who: 'me', text: question }]);
    setText('');
    setTyping(true);
    const hit = ANSWERS.find((x) => x.chip === question || x.match.test(question));
    setTimeout(
      () => {
        setTyping(false);
        setMsgs((m) => [...m, { who: 'bot', text: hit ? hit.a : FALLBACK }]);
      },
      reducedMotion() ? 0 : 900,
    );
  };

  return (
    <div className={'demo' + (open ? ' is-open' : '')}>
      <div className="demo-panel" ref={panel} role="dialog" aria-label="محادثة تجريبية مع حيّاك" aria-hidden={!open}>
        <div className="demo-head">
          <span className="demo-ava">
            <BrandMark />
          </span>
          <div>
            <b>حيّاك</b>
            <small>
              <i className="dot-live" /> متصل الآن · نسخة تجريبية
            </small>
          </div>
          <button type="button" className="demo-x" aria-label="إغلاق" onClick={() => setOpen(false)}>
            ×
          </button>
        </div>
        <div className="demo-list" ref={list} aria-live="polite" data-lenis-prevent>
          {msgs.map((m, i) => (
            <p key={i} className={'demo-msg is-' + m.who}>
              {m.text}
            </p>
          ))}
          {typing && (
            <span className="demo-msg is-bot demo-typing">
              <LottieIcon make={typingDots} />
            </span>
          )}
        </div>
        <div className="demo-chips">
          {ANSWERS.map((x) => (
            <button key={x.chip} type="button" onClick={() => ask(x.chip)} tabIndex={open ? 0 : -1}>
              {x.chip}
            </button>
          ))}
        </div>
        <form
          className="demo-input"
          onSubmit={(e) => {
            e.preventDefault();
            ask(text);
          }}
        >
          <input value={text} onChange={(e) => setText(e.target.value)} placeholder="اكتب سؤالك…" aria-label="اكتب سؤالك" tabIndex={open ? 0 : -1} />
          <button type="submit" aria-label="إرسال" tabIndex={open ? 0 : -1}>
            <svg viewBox="0 0 24 24">
              <path d="M20 4 4 11l6 2.5L12.5 20z" fill="currentColor" />
            </svg>
          </button>
        </form>
      </div>

      <button type="button" className="demo-launch" ref={launcher} aria-label={open ? 'إغلاق المحادثة' : 'افتح محادثة تجريبية مع حيّاك'} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        <BrandMark />
      </button>
    </div>
  );
}
