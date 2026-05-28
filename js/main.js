/* ============================================================
   Adv. Samit Siddhanta — interactions
   Lightweight, dependency-free scroll choreography & UI logic
   ============================================================ */
(function () {
  'use strict';

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Preloader ---------- */
  window.addEventListener('load', () => {
    const pre = $('#preloader');
    if (pre) setTimeout(() => pre.classList.add('is-done'), 600);
  });

  /* ---------- Year ---------- */
  const yr = $('#year');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- Header shrink ---------- */
  const header = $('#header');
  const toTop  = $('#toTop');
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('is-shrunk', y > 30);
    toTop.classList.toggle('is-show', y > 700);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav ---------- */
  const burger = $('#burger');
  const nav    = $('#nav');
  const toggleNav = (open) => {
    nav.classList.toggle('is-open', open);
    burger.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };
  burger.addEventListener('click', () => toggleNav(!nav.classList.contains('is-open')));
  $$('.nav__link').forEach(a => a.addEventListener('click', () => toggleNav(false)));

  /* ---------- Back to top ---------- */
  toTop.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));

  /* ---------- Scroll reveal (StringTune-style) ---------- */
  const revealEls = $$('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-in'));
  }

  /* ---------- Active nav on scroll (scroll-spy) ---------- */
  const sections = $$('section[id]');
  const links    = $$('.nav__link');
  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const id = e.target.id;
          links.forEach(l => l.classList.toggle('is-active', l.getAttribute('href') === '#' + id));
        }
      });
    }, { threshold: 0.4, rootMargin: '-20% 0px -40% 0px' });
    sections.forEach(s => spy.observe(s));
  }

  /* ---------- Parallax ---------- */
  const parallaxEls = $$('[data-parallax]');
  if (!reduceMotion && parallaxEls.length) {
    let ticking = false;
    const move = () => {
      const y = window.scrollY;
      parallaxEls.forEach(el => {
        const speed = parseFloat(el.dataset.parallax) || 0.15;
        el.style.transform = `translate3d(0, ${y * speed}px, 0)`;
      });
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(move); ticking = true; }
    }, { passive: true });
  }

  /* ---------- Animated counters ---------- */
  const counters = $$('.stat__num');
  if (counters.length) {
    const animate = (el) => {
      const target = +el.dataset.count;
      const dur = 1600;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(eased * target).toLocaleString('en-IN');
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target.toLocaleString('en-IN');
      };
      requestAnimationFrame(step);
    };
    if ('IntersectionObserver' in window && !reduceMotion) {
      const co = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { animate(e.target); co.unobserve(e.target); } });
      }, { threshold: 0.6 });
      counters.forEach(c => co.observe(c));
    } else {
      counters.forEach(c => c.textContent = (+c.dataset.count).toLocaleString('en-IN'));
    }
  }

  /* ---------- Hero showcase carousel ---------- */
  (function showcase() {
    const panels = $$('.showcase__panel');
    const tabs   = $$('.showcase__tabs li');
    if (!panels.length) return;
    let i = 0, timer;
    const go = (n) => {
      i = (n + panels.length) % panels.length;
      panels.forEach((p, k) => p.classList.toggle('is-active', k === i));
      tabs.forEach((t, k) => t.classList.toggle('is-active', k === i));
    };
    const start = () => { if (!reduceMotion) timer = setInterval(() => go(i + 1), 4200); };
    const stop  = () => clearInterval(timer);
    tabs.forEach(t => t.addEventListener('click', () => { stop(); go(+t.dataset.tab); start(); }));
    start();
    const sc = $('.showcase');
    sc.addEventListener('mouseenter', stop);
    sc.addEventListener('mouseleave', start);
  })();

  /* ---------- Testimonials carousel ---------- */
  (function quotes() {
    const items = $$('.quote');
    const dots  = $$('[data-qdot]');
    if (!items.length) return;
    let i = 0, timer;
    const go = (n) => {
      i = (n + items.length) % items.length;
      items.forEach((q, k) => q.classList.toggle('is-active', k === i));
      dots.forEach((d, k) => d.classList.toggle('is-active', k === i));
    };
    const start = () => { if (!reduceMotion) timer = setInterval(() => go(i + 1), 5200); };
    dots.forEach(d => d.addEventListener('click', () => { clearInterval(timer); go(+d.dataset.qdot); start(); }));
    start();
  })();

  /* ---------- Contact form ---------- */
  const form = $('#contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = $('#formStatus');
      if (!form.checkValidity()) {
        status.textContent = 'Please complete the required fields.';
        status.classList.add('is-error');
        form.reportValidity();
        return;
      }
      const name = $('#name').value.trim().split(' ')[0] || 'there';
      status.classList.remove('is-error');
      status.textContent = `Thank you, ${name}. Your enquiry has been received — the chambers will respond shortly.`;
      form.reset();
      setTimeout(() => { status.textContent = ''; }, 7000);
    });
  }
})();
