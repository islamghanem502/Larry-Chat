import { useRef, useState } from 'react';
import { ScrollTrigger, useGSAP } from '../lib/gsap';
import BrandMark from './BrandMark';

const LINKS = [
  ['#journey', 'كيف يشتغل'],
  ['#features', 'المزايا'],
  ['#studio', 'التخصيص'],
  ['#faq', 'الأسئلة'],
];

export function Logo() {
  return (
    <a href="#top" className="logo" aria-label="حيّاك — الصفحة الرئيسية">
      <BrandMark className="logo-mark" />
      <span className="logo-word">
        حيّاك
        <svg viewBox="0 0 120 14" aria-hidden="true">
          <path d="M2,9 C30,4 70,12 118,5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </span>
      <span className="logo-bot">AI</span>
    </a>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useGSAP(() => {
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const y = self.scroll();
        ref.current.classList.toggle('is-solid', y > 40);
        ref.current.classList.toggle('is-hidden', self.direction === 1 && y > 500);
      },
    });
  });

  return (
    <header className={'nav' + (open ? ' is-open' : '')} ref={ref}>
      <div className="nav-in wrap">
        <Logo />
        <nav className="nav-links" aria-label="الأقسام">
          {LINKS.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
        <a className="nav-cta" href="#start">
          ركّبه على متجرك
        </a>
        <button className="nav-burger" aria-label="القائمة" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
