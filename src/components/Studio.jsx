import { useEffect, useRef, useState } from 'react';
import { gsap, useGSAP, reducedMotion } from '../lib/gsap';
import BrandMark from './BrandMark';

const COLORS = [
  ['blue', 'أزرق', '#1d5bd6'],
  ['maroon', 'عنابي', '#6b1d2a'],
  ['green', 'أخضر', '#0f8a52'],
  ['orange', 'برتقالي', '#e8541f'],
  ['purple', 'بنفسجي', '#7b3aa8'],
  ['ink', 'فحمي', '#2b2340'],
];

const TONES = {
  formal: {
    label: 'رسمي',
    hello: 'مرحبًا بك في متجرنا. كيف يمكنني مساعدتك اليوم؟',
    chips: ['تتبع طلب', 'سياسة الاسترجاع', 'التحدث مع موظف'],
  },
  friendly: {
    label: 'ودود',
    hello: 'أهلًا وسهلًا! وش اللي تدوّر عليه اليوم؟',
    chips: ['أبي أتتبع طلبي', 'عندكم عروض؟', 'ساعدني أختار'],
  },
  saudi: {
    label: 'عامّي',
    hello: 'هلا والله وغلا! آمرني، وش بخاطرك؟',
    chips: ['وين طلبي؟', 'فيه خصم؟', 'دلّني على شي حلو'],
  },
};

const AVATARS = [
  ['mark', 'أيقونة'],
  ['initial', 'حرف'],
  ['logo', 'شعارك'],
];

function Segmented({ name, value, options, onChange }) {
  return (
    <div className="seg" role="radiogroup" aria-label={name}>
      {options.map(([v, label]) => (
        <button key={v} type="button" role="radio" aria-checked={value === v} className={value === v ? 'is-on' : ''} onClick={() => onChange(v)}>
          {label}
        </button>
      ))}
    </div>
  );
}

function Avatar({ kind, name }) {
  if (kind === 'initial') return <span className="av-initial">{(name || 'ح').trim().charAt(0)}</span>;
  if (kind === 'logo')
    return (
      <svg className="av-logo" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 8h12l-1 12H7zM9 8a3 3 0 0 1 6 0" />
      </svg>
    );
  return <BrandMark />;
}

// Grows the greeting one letter at a time, like it's being typed
function useTyped(text) {
  const [st, setSt] = useState({ text, n: text.length });
  if (st.text !== text) setSt({ text, n: reducedMotion() ? text.length : 0 });
  useEffect(() => {
    if (st.n >= st.text.length) return;
    const id = setTimeout(() => setSt((v) => ({ ...v, n: v.n + 1 })), 26);
    return () => clearTimeout(id);
  }, [st]);
  return st.text.slice(0, st.n);
}

export default function Studio() {
  const root = useRef(null);
  const [name, setName] = useState('حيّاك');
  const [color, setColor] = useState(COLORS[0]);
  const [tone, setTone] = useState('saudi');
  const [avatar, setAvatar] = useState('mark');
  const [side, setSide] = useState('left');
  const typed = useTyped(TONES[tone].hello);
  const first = useRef(true);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      const q = gsap.utils.selector(root);
      gsap.from(q('.studio-head > *'), {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: { trigger: q('.studio-head')[0], start: 'top 80%' },
      });
      gsap.from(q('.studio-panel, .studio-preview'), {
        y: 70,
        opacity: 0,
        duration: 1.1,
        stagger: 0.12,
        ease: 'expo.out',
        scrollTrigger: { trigger: q('.studio-grid')[0], start: 'top 80%' },
      });
    },
    { scope: root },
  );

  // a small settle whenever something changes
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (reducedMotion()) return;
    const q = gsap.utils.selector(root);
    gsap.fromTo(q('.sp-widget'), { scale: 0.97 }, { scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
    gsap.fromTo(q('.sp-teaser'), { y: 8, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out' });
  }, [color, avatar, tone, side]);

  const label = name || 'حيّاك';

  return (
    <section className="studio sec" id="studio" ref={root}>
      <div className="wrap">
        <div className="studio-head sec-head">
          <p className="kicker">استوديو التخصيص</p>
          <h2 className="display h-lg">صمّمه على كيفك… حرفيًا</h2>
          <p className="lead">الاسم، اللون، الصورة، وطريقة الكلام. يطلع بهوية متجرك أنت. جرّب بنفسك:</p>
        </div>

        <div className="studio-grid">
          <form className="studio-panel" onSubmit={(e) => e.preventDefault()}>
            <label className="sp-field">
              <span className="sp-label">اسم المساعد</span>
              <input value={name} maxLength={14} onChange={(e) => setName(e.target.value)} placeholder="حيّاك" />
            </label>

            <div className="sp-field">
              <span className="sp-label">لون الهوية</span>
              <div className="swatches" role="radiogroup" aria-label="لون الهوية">
                {COLORS.map((c) => (
                  <button
                    key={c[0]}
                    type="button"
                    role="radio"
                    aria-checked={color[0] === c[0]}
                    aria-label={c[1]}
                    title={c[1]}
                    className={'sw' + (color[0] === c[0] ? ' is-on' : '')}
                    style={{ '--c': c[2] }}
                    onClick={() => setColor(c)}
                  />
                ))}
              </div>
            </div>

            <div className="sp-field">
              <span className="sp-label">صورة المساعد</span>
              <Segmented name="صورة المساعد" value={avatar} options={AVATARS} onChange={setAvatar} />
            </div>

            <div className="sp-field">
              <span className="sp-label">طريقة الكلام</span>
              <Segmented name="طريقة الكلام" value={tone} options={Object.entries(TONES).map(([k, v]) => [k, v.label])} onChange={setTone} />
            </div>

            <div className="sp-field">
              <span className="sp-label">مكان الزر</span>
              <Segmented
                name="مكان الزر"
                value={side}
                options={[
                  ['right', 'يمين'],
                  ['left', 'يسار'],
                ]}
                onChange={setSide}
              />
            </div>
          </form>

          <div className={'studio-preview side-' + side} style={{ '--ui': color[2] }}>
            <div className="sp-browser">
              <div className="sp-bar">
                <i />
                <i />
                <i />
                <span>yourstore.com</span>
              </div>
              <div className="sp-page" aria-hidden="true">
                <div className="sp-fake-nav" />
                <div className="sp-fake-hero" />
                <div className="sp-fake-row">
                  <i />
                  <i />
                  <i />
                </div>
              </div>

              <div className="sp-widget" role="img" aria-label={`معاينة نافذة المحادثة باسم ${label}`}>
                <div className="spw-head">
                  <span className="spw-ava">
                    <Avatar kind={avatar} name={label} />
                  </span>
                  <div>
                    <b>{label}</b>
                    <small>
                      <i className="dot-live" /> متصل الآن
                    </small>
                  </div>
                </div>
                <div className="spw-body">
                  <p className="spw-msg">{typed || ' '}</p>
                  <div className="spw-chips">
                    {TONES[tone].chips.map((c) => (
                      <span key={c}>{c}</span>
                    ))}
                  </div>
                </div>
                <div className="spw-input">
                  <span>اكتب رسالتك…</span>
                  <i />
                </div>
              </div>

              <span className="sp-teaser">{TONES[tone].hello.split(/[.!؟?]/)[0]}</span>
              <span className="sp-launcher">
                <Avatar kind={avatar} name={label} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
