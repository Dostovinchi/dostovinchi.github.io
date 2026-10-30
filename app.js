const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const header = document.querySelector('[data-header]');
function syncHeader() {
  header?.classList.toggle('is-scrolled', window.scrollY > 8);
}
syncHeader();
window.addEventListener('scroll', syncHeader, { passive: true });

const revealTargets = [...document.querySelectorAll('[data-reveal]')];
if (!('IntersectionObserver' in window) || reduceMotion) {
  revealTargets.forEach((el) => el.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
  );
  revealTargets.forEach((el) => observer.observe(el));
  window.setTimeout(() => document.documentElement.classList.add('reveal-all'), 3000);
}

const dialog = document.querySelector('[data-steps-dialog]');
if (dialog) {
  document.querySelectorAll('[data-open-steps]').forEach((button) => {
    button.addEventListener('click', () => dialog.showModal());
  });
  dialog.querySelectorAll('[data-close-dialog]').forEach((button) => {
    button.addEventListener('click', () => dialog.close());
  });
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
}

const canvas = document.querySelector('[data-embers]');
if (canvas && !reduceMotion) {
  const ctx = canvas.getContext('2d');
  let width = 0;
  let height = 0;
  let particles = [];
  let frame = 0;
  let running = true;
  let last = performance.now();

  const random = (min, max) => min + Math.random() * (max - min);

  function spawn(initial) {
    return {
      x: Math.random() * width,
      y: initial ? Math.random() * height : height + 8,
      r: random(0.5, 1.7),
      vy: random(0.07, 0.26),
      sway: Math.random() * Math.PI * 2,
      speed: random(0.0015, 0.005),
      alpha: random(0.16, 0.55),
      twinkle: Math.random() * Math.PI * 2,
      warm: Math.random() < 0.72,
    };
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.round(Math.min(46, (width * height) / 38000));
    particles = Array.from({ length: count }, () => spawn(true));
  }

  function tick(now) {
    if (!running) return;
    const step = Math.min(3, (now - last) / 16.67);
    last = now;
    ctx.clearRect(0, 0, width, height);

    for (let index = 0; index < particles.length; index += 1) {
      const p = particles[index];
      p.y -= p.vy * step;
      p.sway += p.speed * step;
      p.x += Math.sin(p.sway) * 0.16 * step;
      p.twinkle += 0.016 * step;

      if (p.y < -12) {
        particles[index] = spawn(false);
        continue;
      }

      const glow = p.alpha * (0.58 + 0.42 * Math.sin(p.twinkle));
      const tone = p.warm ? '224, 234, 255' : '160, 190, 255';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${tone}, ${glow})`;
      ctx.shadowColor = `rgba(${tone}, ${glow * 0.9})`;
      ctx.shadowBlur = 7;
      ctx.fill();
    }
    ctx.shadowBlur = 0;

    frame = requestAnimationFrame(tick);
  }

  const onVisibility = () => {
    running = !document.hidden;
    if (running) {
      last = performance.now();
      frame = requestAnimationFrame(tick);
    } else {
      cancelAnimationFrame(frame);
    }
  };

  window.addEventListener('resize', resize, { passive: true });
  document.addEventListener('visibilitychange', onVisibility);
  resize();
  frame = requestAnimationFrame(tick);
}
