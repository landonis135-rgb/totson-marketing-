/* ==========================================================================
   Totson Marketing — interaction

   Nav, scroll reveals, stat count-ups, case-study tabs and the services folder.
   No dependencies. Runs from file:// with no server.
   ========================================================================== */

(function () {
  'use strict';

  const $  = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.prototype.slice.call((r || document).querySelectorAll(s));
  const GM = window.GM;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------- year */
  const yr = $('#yr');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ------------------------------------------------------- mobile drawer */
  const toggle = $('#navToggle');
  const drawer = $('#navDrawer');

  if (toggle && drawer) {
    toggle.addEventListener('click', function () {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      drawer.hidden = open;
      drawer.setAttribute('data-open', String(!open));
    });

    $$('a', drawer).forEach(a => a.addEventListener('click', function () {
      toggle.setAttribute('aria-expanded', 'false');
      drawer.hidden = true;
      drawer.setAttribute('data-open', 'false');
    }));
  }

  /* -------------------------------------------------------- scroll reveal */
  const revealables = $$('.rv');

  if (reduced || !('IntersectionObserver' in window)) {
    revealables.forEach(el => el.classList.add('in'));
  } else {
    const ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        ro.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

    revealables.forEach(el => ro.observe(el));
  }

  /* ------------------------------------------------------- stat count-ups */
  function countUp(el) {
    const target = parseFloat(el.dataset.count);
    const dec    = parseInt(el.dataset.dec || '0', 10);
    const pre    = el.dataset.prefix || '';
    const suf    = el.dataset.suffix || '';

    if (reduced || isNaN(target)) {
      el.textContent = pre + target.toFixed(dec) + suf;
      return;
    }

    const dur = 1300;
    const t0 = performance.now();

    (function tick(now) {
      const p = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = pre + (target * eased).toFixed(dec) + suf;
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
  }

  const nums = $$('.stat-num[data-count]');
  if ('IntersectionObserver' in window) {
    const no = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        countUp(e.target);
        no.unobserve(e.target);
      });
    }, { threshold: 0.6 });
    nums.forEach(el => no.observe(el));
  } else {
    nums.forEach(countUp);
  }

  /* ------------------------------------------------- nav active-section */
  const navLinks = $$('.nav-links a');
  const sections = navLinks
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    const so = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(s => so.observe(s));
  }

  /* ------------------------------------------------ FAQ: one open at a time */
  const faqs = $$('.faq details');
  faqs.forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (!d.open) return;
      faqs.forEach(o => { if (o !== d) o.open = false; });
    });
  });

  /* --------------------------------------------------- services folder */
  const folderHero = $('.folder-hero');
  const folderPin  = $('.folder-pin');

  if (folderHero && folderPin && !reduced) {
    let queued = false;

    function updateFolder() {
      queued = false;
      const rect = folderHero.getBoundingClientRect();
      const drive = rect.height - folderPin.offsetHeight;
      const raw = drive > 0 ? -rect.top / drive : (rect.top <= 0 ? 1 : 0);
      const p = Math.min(1, Math.max(0, raw));
      folderPin.style.setProperty('--p', p.toFixed(4));
    }

    function schedule() {
      if (queued) return;
      queued = true;
      requestAnimationFrame(updateFolder);
    }

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    updateFolder();
  }

  /* -------------------------------------------------------- account types */
  const tabs = $$('.case-tabs button');

  /* Text comes from js/cases.js, so it is set as textContent and never parsed
     as markup — a stray < in the copy can't break the page. */
  function fillList(ul, items) {
    ul.textContent = '';
    items.forEach(function (text) {
      const li = document.createElement('li');
      li.textContent = text;
      ul.appendChild(li);
    });
  }

  function showCase(key) {
    const c = GM && GM.CASES && GM.CASES[key];
    if (!c) return;

    $('#caseTitle').textContent = c.title;
    $('#caseMeta').textContent  = c.meta;
    $('#caseStory').textContent = c.story;

    fillList($('#caseInherit'), c.inherit);
    fillList($('#caseChange'),  c.change);

    tabs.forEach(t => t.setAttribute('aria-selected', String(t.dataset.case === key)));
    $('#case-panel').setAttribute('aria-labelledby', 'tab-' + key);
  }

  tabs.forEach(function (t) {
    t.addEventListener('click', function () { showCase(t.dataset.case); });

    // left/right arrows move between tabs, as a tablist should
    t.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      const i = tabs.indexOf(t);
      const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
      next.focus();
      showCase(next.dataset.case);
    });
  });

  if (tabs.length) showCase('skincare');

  /* -------------------------------- warn in console if booking link unset */
  const book = $('#bookLink');
  if (book && book.href.indexOf('REPLACE-ME') > -1) {
    console.warn(
      'Totson Marketing: the "Book a call" button still points at a placeholder. ' +
      'Set your real Calendly/Cal.com URL on #bookLink in index.html.'
    );
  }
})();
