// Home — page behavior (ported 1:1 from the approved build's logic class)
(function () {
class Component {
  componentDidMount() {
    this.wireTriad();
    this.layoutTriad();
    this.wireSmoothScroll();
    this._onResize = () => {
      if (this._raf) cancelAnimationFrame(this._raf);
      this._raf = requestAnimationFrame(() => this.layoutTriad());
    };
    window.addEventListener('resize', this._onResize);
    const soft = Array.from(document.querySelectorAll('.rv-s'));
    const reveal = () => {
      let n = 0;
      soft.forEach((el) => {
        if (el.classList.contains('in')) return;
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.78 && r.bottom > 0) {
          setTimeout(() => el.classList.add('in'), 200 + n * 260);
          n++;
        }
      });
    };
    this._reveal = () => {
      if (this._rvRaf) return;
      this._rvRaf = requestAnimationFrame(() => { this._rvRaf = null; reveal(); });
    };
    window.addEventListener('scroll', this._reveal, { passive: true });
    window.addEventListener('resize', this._reveal);
    reveal();
  }

  // eased in-page navigation — slower and softer than the browser default
  wireSmoothScroll() {
    if (this._scrollWired) return;
    const links = Array.from(document.querySelectorAll('a[href^="#"]'));
    if (!links.length) return;
    this._scrollWired = true;

    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // ease-out: moves immediately on click, decelerates into place
    const ease = t => 1 - Math.pow(1 - t, 3);

    const glide = (targetY, duration) => {
      const startY = window.pageYOffset;
      const delta = targetY - startY;
      if (Math.abs(delta) < 2) return;
      const t0 = performance.now();
      const step = (now) => {
        const p = Math.min(1, (now - t0) / duration);
        window.scrollTo(0, startY + delta * ease(p));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    links.forEach(a => {
      a.addEventListener('click', (ev) => {
        const id = a.getAttribute('href');
        if (!id || id === '#') return;
        const target = document.querySelector(id);
        if (!target) return;
        ev.preventDefault();
        const y = id === '#top' ? 0 : target.getBoundingClientRect().top + window.pageYOffset - 24;
        if (reduce) { window.scrollTo(0, y); return; }
        const dist = Math.abs(y - window.pageYOffset);
        glide(y, Math.max(700, Math.min(1500, 500 + dist * 0.45)));
      });
    });
  }

  // Ring radius grows with viewport width; the three nodes always sit ON the ring.
  layoutTriad() {
    const ring = document.getElementById('ring6');
    if (!ring) return;

    // smooth canvas scale — fits the 700x500 canvas to its column, no breakpoint jumps
    const fit = document.querySelector('.triad-fit');
    const scaler = document.querySelector('.triad-scale');
    if (fit && scaler) {
      const avail = fit.getBoundingClientRect().width;
      let s = avail > 0 ? avail / 700 : 0.78;
      s = Math.max(0.44, Math.min(0.82, s));
      scaler.style.transform = 'scale(' + s.toFixed(3) + ')';
      fit.style.height = Math.round(500 * s) + 'px';
    }

    const CX = 350, CY = 240, CORE = 91, NODE = 39, GAP = 13, CANVAS_W = 700;
    const w = window.innerWidth || 1440;
    // 1200px -> r186 ; 1440px -> r216 ; interpolated, then clamped
    let R = 186 + (w - 1200) * 0.125;
    R = Math.max(170, Math.min(216, R));
    R = Math.round(R * 10) / 10;

    ring.setAttribute('d',
      'M' + CX + ' ' + (CY - R) +
      ' A' + R + ' ' + R + ' 0 1 1 ' + CX + ' ' + (CY + R) +
      ' A' + R + ' ' + R + ' 0 1 1 ' + CX + ' ' + (CY - R) + ' Z');

    const inner = document.getElementById('ring6inner');
    if (inner) inner.setAttribute('r', (R * 0.586).toFixed(1));

    // angles measured from top, clockwise
    const stations = {
      human:  { a: 330, spoke: 'm1' },
      system: { a: 90,  spoke: 'm2' },
      action: { a: 225, spoke: 'm3' }
    };
    const rad = d => d * Math.PI / 180;

    Object.keys(stations).forEach(k => {
      const st = stations[k];
      const ux = Math.sin(rad(st.a)), uy = -Math.cos(rad(st.a));
      const nx = CX + R * ux, ny = CY + R * uy;

      const node = document.querySelector('[data-node6="' + k + '"]');
      if (node) { node.style.left = nx.toFixed(1) + 'px'; node.style.top = ny.toFixed(1) + 'px'; }

      const spoke = document.getElementById(st.spoke);
      if (spoke) {
        const sx = CX + CORE * ux, sy = CY + CORE * uy;
        const ex = CX + (R - NODE) * ux, ey = CY + (R - NODE) * uy;
        spoke.setAttribute('d', 'M' + sx.toFixed(1) + ' ' + sy.toFixed(1) + ' L' + ex.toFixed(1) + ' ' + ey.toFixed(1));
        if (k === 'system') {
          const g = document.getElementById('n2');
          if (g) { g.setAttribute('x1', sx.toFixed(1)); g.setAttribute('x2', ex.toFixed(1)); }
        }
      }

      const label = document.querySelector('[data-lbl6="' + k + '"]');
      if (label) {
        label.style.top = ny.toFixed(1) + 'px';
        if (k === 'system') {
          label.style.right = '';
          label.style.left = (nx + NODE + GAP).toFixed(1) + 'px';
        } else {
          label.style.left = '';
          label.style.right = (CANVAS_W - (nx - NODE - GAP)).toFixed(1) + 'px';
        }
      }
    });
  }

  wireTriad() {
    if (this._wired) return;
    const nodes = Array.from(document.querySelectorAll('[data-node6]'));
    if (!nodes.length) return;
    this._wired = true;

    const keys = ['human', 'system', 'action'];
    const spokeFor = { human: 'm1', system: 'm2', action: 'm3' };
    const glow = {
      human: ['rgba(167,139,250,.95)', '0 0 46px rgba(167,139,250,.5)'],
      system: ['rgba(100,137,248,.95)', '0 0 46px rgba(100,137,248,.5)'],
      action: ['rgba(34,211,238,.95)', '0 0 46px rgba(34,211,238,.45)']
    };
    const rest = {
      human: ['rgba(167,139,250,.5)', '0 0 34px rgba(167,139,250,.24)'],
      system: ['rgba(100,137,248,.5)', '0 0 34px rgba(100,137,248,.24)'],
      action: ['rgba(34,211,238,.5)', '0 0 34px rgba(34,211,238,.22)']
    };

    const el = {};
    keys.forEach(k => {
      el[k] = {
        node: document.querySelector('[data-node6="' + k + '"]'),
        label: document.querySelector('[data-lbl6="' + k + '"]'),
        terms: Array.from(document.querySelectorAll('[data-terms6="' + k + '"] [data-t6]')),
        spoke: document.getElementById(spokeFor[k]),
        dot: document.querySelector('[data-dot6="' + k + '"]'),
        icon: null
      };
      if (el[k].node) el[k].icon = el[k].node.querySelector('svg');
    });
    const core = document.querySelector('[data-core6]');

    const apply = (active) => {
      keys.forEach(k => {
        const e = el[k];
        if (!e.node) return;
        const dim = active && active !== k;
        const on = active === k;
        e.node.style.opacity = dim ? '0.35' : '1';
        e.node.style.borderColor = on ? glow[k][0] : rest[k][0];
        e.node.style.boxShadow = on ? glow[k][1] : rest[k][1];
        e.node.style.transform = 'translate(-50%,-50%) scale(' + (on ? 1.09 : dim ? 0.97 : 1) + ')';
        if (e.icon) {
          e.icon.style.stroke = on ? '#FFFFFF' : '#F2F3F5';
          e.icon.style.transform = 'scale(' + (on ? 1.06 : 1) + ')';
        }
        if (e.label) e.label.style.opacity = dim ? '0.35' : '1';
        if (e.spoke) e.spoke.style.strokeOpacity = dim ? '0.15' : (on ? '0.9' : '0.5');
        if (e.dot) e.dot.style.opacity = dim ? '0.15' : (on ? '1' : '0.9');
        e.terms.forEach((t, i) => {
          t.style.transitionDelay = on ? (i * 60) + 'ms' : '0ms';
          t.style.opacity = on ? '1' : '0.4';
        });
      });
      if (core) core.style.opacity = active ? '0.6' : '1';
    };

    keys.forEach(k => {
      const e = el[k];
      if (!e.node) return;
      [e.node, e.label].filter(Boolean).forEach(t => {
        t.addEventListener('mouseenter', () => apply(k));
        t.addEventListener('mouseleave', () => apply(null));
      });
      if (e.label) e.label.style.transition = 'opacity .4s cubic-bezier(.22,1,.36,1)';
      if (e.icon) e.icon.style.transition = 'stroke .35s ease, transform .45s cubic-bezier(.34,1.4,.5,1)';
      if (e.spoke) e.spoke.style.transition = 'stroke-opacity .4s ease';
    });
    if (core) core.style.transition = 'opacity .4s ease';

    apply(null);
  }
}

  // Motion & Interaction reel — plays only near the viewport; placeholder until a src is set.
  function initMotionReel() {
    var v = document.getElementById('motion-video');
    var empty = document.getElementById('motion-empty');
    if (!v) return;
    if (!v.getAttribute('src')) return; // keep placeholder
    if (empty) empty.style.display = 'none';
    v.style.display = 'block';
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (en) {
          if (en.isIntersecting) v.play().catch(function () {});
          else v.pause();
        });
      }, { threshold: 0.15, rootMargin: '200px 0px' }).observe(v);
    } else {
      v.play().catch(function () {});
    }
  }

  const init = () => { new Component().componentDidMount(); initMotionReel(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
