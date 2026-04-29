/* ── global.js ── */
(function () {
  'use strict';

  /* ── THEME (persisted) ── */
  const html = document.documentElement;
  const saved = localStorage.getItem('lumis-theme') || 'dark';
  html.setAttribute('data-theme', saved);

  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('lumis-theme', next);
    });
  });

  /* ── ACTIVE NAV ── */
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  /* ── HAMBURGER ── */
  window.toggleMenu = () => document.getElementById('mobileMenu')?.classList.toggle('open');
  window.closeMenu  = () => document.getElementById('mobileMenu')?.classList.remove('open');

  /* ── SCROLL REVEAL ── */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  /* ── PAGE ENTER ── */
  document.querySelector('.page')?.classList.add('page-enter');

  /* ── FORM ── */
  window.handleSubmit = () => {
    let ok = true;
    document.querySelectorAll('[data-required]').forEach(f => {
      if (!f.value.trim()) { ok = false; f.style.borderColor = 'var(--gold)'; setTimeout(() => f.style.borderColor = '', 2000); }
    });
    if (!ok) return;
    document.querySelectorAll('.contact-right input, .contact-right textarea, .contact-right select').forEach(f => f.value = '');
    const msg = document.getElementById('formSuccess');
    if (msg) { msg.style.display = 'block'; setTimeout(() => msg.style.display = 'none', 6000); }
  };

  /* ── MARQUEE DUPLICATE ── */
  document.querySelectorAll('.marquee-track').forEach(t => t.innerHTML += t.innerHTML);

})();
