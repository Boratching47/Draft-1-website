/* ── home.js ── */
(function () {
  'use strict';

  function countUp(el) {
    const target = +el.dataset.count;
    const dur = 1800;
    const start = performance.now();
    const run = now => {
      const p = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(ease * target);
      if (p < 1) requestAnimationFrame(run);
      else el.textContent = target;
    };
    requestAnimationFrame(run);
  }

  const co = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { countUp(e.target); co.unobserve(e.target); } });
  }, { threshold: 0.6 });

  document.querySelectorAll('[data-count]').forEach(el => co.observe(el));
})();
