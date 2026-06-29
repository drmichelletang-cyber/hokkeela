/* 醫學堂 MediLearn — interactions */
(function () {
  // Render Lucide icons
  function renderIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }
  document.addEventListener('DOMContentLoaded', renderIcons);

  // Mobile nav toggle
  document.addEventListener('click', function (e) {
    const toggle = e.target.closest('[data-nav-toggle]');
    if (toggle) {
      const menu = document.getElementById('mobile-menu');
      if (menu) {
        const open = menu.classList.toggle('hidden') === false;
        toggle.setAttribute('aria-expanded', String(open));
      }
    }
    const link = e.target.closest('#mobile-menu a');
    if (link) {
      const menu = document.getElementById('mobile-menu');
      if (menu) menu.classList.add('hidden');
    }
  });

  // Scroll reveal
  document.addEventListener('DOMContentLoaded', function () {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
  });

  // Course / article filtering (used on courses page)
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('[data-filter]');
    if (!btn) return;
    const cat = btn.getAttribute('data-filter');
    document.querySelectorAll('[data-filter]').forEach((b) => {
      const active = b === btn;
      b.classList.toggle('btn-primary', active);
      b.classList.toggle('btn-ghost', !active);
    });
    document.querySelectorAll('[data-cat]').forEach((card) => {
      const show = cat === 'all' || card.getAttribute('data-cat') === cat;
      card.style.display = show ? '' : 'none';
    });
    const empty = document.getElementById('filter-empty');
    if (empty) {
      const visible = [...document.querySelectorAll('[data-cat]')].some((c) => c.style.display !== 'none');
      empty.classList.toggle('hidden', visible);
    }
  });

  // Live search on courses page
  document.addEventListener('input', function (e) {
    const input = e.target.closest('#course-search');
    if (!input) return;
    const q = input.value.trim().toLowerCase();
    document.querySelectorAll('[data-cat]').forEach((card) => {
      const text = (card.getAttribute('data-title') || '').toLowerCase();
      card.style.display = text.includes(q) ? '' : 'none';
    });
    const empty = document.getElementById('filter-empty');
    if (empty) {
      const visible = [...document.querySelectorAll('[data-cat]')].some((c) => c.style.display !== 'none');
      empty.classList.toggle('hidden', visible);
    }
  });
})();
