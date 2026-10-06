// Tiny Lottie (bodymovin) JSON builders. The animations on the page are generated here
// so they can share the brand palette and stay a few hundred bytes each.

const hex = (h) => {
  const n = parseInt(h.replace('#', ''), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255, 1];
};
const EASE = { i: { x: 0.35, y: 1 }, o: { x: 0.6, y: 0 } };
const isAnim = (v) => v && typeof v === 'object' && v.a === 1;
const P = (v) => (isAnim(v) ? v : { a: 0, k: v });

// keyframes: [[frame, value], ...]
const K = (frames, ease = EASE) => ({
  a: 1,
  k: frames.map(([t, v], i) => {
    const s = Array.isArray(v) ? v : [v];
    return i < frames.length - 1 ? { t, s, i: ease.i, o: ease.o } : { t, s };
  }),
});
const K3 = (frames, z = 0, ease) => K(frames.map(([t, v]) => [t, [...v, z]]), ease);

const tr = (o = {}) => ({
  ty: 'tr',
  p: P(o.p || [0, 0]),
  a: P(o.a || [0, 0]),
  s: P(o.s || [100, 100]),
  r: P(o.r || 0),
  o: P(o.o ?? 100),
  sk: P(0),
  sa: P(0),
  nm: 'tr',
});
const gr = (items, t) => ({ ty: 'gr', it: [...items, tr(t)], nm: 'g', np: items.length, cix: 2, bm: 0 });
const el = (w, h, p = [0, 0]) => ({ ty: 'el', p: P(p), s: P([w, h]), d: 1, nm: 'el' });
const sh = (v, c = false) => ({
  ty: 'sh',
  ks: { a: 0, k: { i: v.map(() => [0, 0]), o: v.map(() => [0, 0]), v, c } },
  d: 1,
  nm: 'sh',
});
const fl = (c, o = 100) => ({ ty: 'fl', c: P(hex(c)), o: P(o), r: 1, bm: 0, nm: 'fl' });
const st = (c, w, o = 100) => ({ ty: 'st', c: P(hex(c)), o: P(o), w: P(w), lc: 2, lj: 2, ml: 4, bm: 0, nm: 'st' });
const tm = (s, e) => ({ ty: 'tm', s: P(s), e: P(e), o: P(0), m: 1, nm: 'tm' });

const layer = (ind, shapes, ks = {}, ip = 0, op = 600) => ({
  ddd: 0,
  ind,
  ty: 4,
  nm: 'l' + ind,
  sr: 1,
  ks: {
    o: P(ks.o ?? 100),
    r: P(ks.r ?? 0),
    p: isAnim(ks.p) ? ks.p : P([...(ks.p || [0, 0]), 0]),
    a: P([0, 0, 0]),
    s: isAnim(ks.s) ? ks.s : P([...(ks.s || [100, 100]), 100]),
  },
  ao: 0,
  shapes,
  ip,
  op,
  st: 0,
  bm: 0,
});

const comp = (w, h, op, layers, fr = 60) => ({
  v: '5.7.4',
  fr,
  ip: 0,
  op,
  w,
  h,
  nm: 'okto',
  ddd: 0,
  assets: [],
  layers: layers.map((l) => ({ ...l, op })),
});

// Three bouncing dots: "someone is typing"
export function typingDots(color = '#1b1330') {
  const layers = [0, 1, 2].map((i) => {
    const d = i * 9;
    const x = 16 + i * 20;
    const pos = [[0, [x, 18]], [d, [x, 18]], [d + 12, [x, 9]], [d + 24, [x, 18]], [72, [x, 18]]];
    const op = [[0, 35], [d, 35], [d + 12, 100], [d + 24, 35], [72, 35]];
    return layer(i + 1, [gr([el(11, 11), fl(color)])], { p: K3(pos), o: K(op) });
  });
  return comp(72, 28, 72, layers);
}

// Circle draws itself, then the tick, then a little pop
export function checkMark(ring = '#12a150', tick = '#ffffff') {
  const pop = K3([[0, [0, 0]], [14, [112, 112]], [24, [100, 100]]], 100);
  const disc = layer(2, [gr([el(84, 84), fl(ring)])], { p: [60, 60], s: pop });
  const ringL = layer(
    3,
    [gr([el(100, 100), st(ring, 5), tm(0, K([[0, 0], [26, 100]]))])],
    { p: [60, 60], o: K([[0, 100], [26, 100], [40, 0]]) },
  );
  const check = layer(
    1,
    [gr([sh([[-20, 2], [-6, 16], [22, -14]]), st(tick, 9), tm(0, K([[0, 0], [14, 0], [32, 100]]))])],
    { p: [60, 60] },
  );
  return comp(120, 120, 60, [check, disc, ringL]);
}
