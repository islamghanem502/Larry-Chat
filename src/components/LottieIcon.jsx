import { useEffect, useRef } from 'react';
import lottie from 'lottie-web/build/player/lottie_light';

// Lottie that only plays while on screen. `once` plays a single time each time it appears.
export default function LottieIcon({ make, args = [], className = '', loop = true, once = false, style, label, as: Tag = 'span' }) {
  const wrap = useRef(null);

  useEffect(() => {
    const node = wrap.current;
    const anim = lottie.loadAnimation({
      container: node,
      renderer: 'svg',
      loop: once ? false : loop,
      autoplay: false,
      animationData: make(...args),
    });
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        if (once) anim.goToAndPlay(0, true);
        else anim.play();
      } else if (!once) anim.pause();
    });
    io.observe(node);
    return () => {
      io.disconnect();
      anim.destroy();
    };
    // generators are pure; the first arguments are all we need
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Tag
      ref={wrap}
      className={'lottie ' + className}
      style={style}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    />
  );
}
