/* ==========================================================================
   Totson Marketing — custom cursor

   A small dot glued exactly to the pointer, plus a ring that trails behind it
   with spring easing and grows over anything clickable. Progressive
   enhancement only: if this script never runs, the native cursor is what
   visitors see, so nothing breaks.

   Deliberately disabled on touch/coarse-pointer devices (there is no cursor
   to replace) and when the visitor has requested reduced motion.
   ========================================================================== */
(function () {
  'use strict';

  if (!window.matchMedia) return;
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!finePointer || reduced) return;

  document.documentElement.classList.add('custom-cursor');

  const dot = document.createElement('div');
  dot.className = 'cur-dot';
  const ring = document.createElement('div');
  ring.className = 'cur-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mx = 0, my = 0;      // the real pointer position — the dot snaps here
  let rx = 0, ry = 0;      // the ring's eased position — always chasing (mx, my)
  let active = false;

  const INTERACTIVE = 'a, button, input, textarea, select, summary, ' +
    'label, .btn, .link-arrow, [role="tab"], .nav-toggle';

  window.addEventListener('mousemove', function (e) {
    mx = e.clientX;
    my = e.clientY;
    if (!active) {
      active = true;
      rx = mx; ry = my;
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    }
    dot.style.transform = 'translate(' + mx + 'px,' + my + 'px) translate(-50%,-50%)';
  }, { passive: true });

  document.addEventListener('mouseover', function (e) {
    ring.classList.toggle('cur-hover', !!(e.target && e.target.closest && e.target.closest(INTERACTIVE)));
  }, { passive: true });

  document.addEventListener('mousedown', function () { ring.classList.add('cur-down'); }, { passive: true });
  document.addEventListener('mouseup', function () { ring.classList.remove('cur-down'); }, { passive: true });

  document.addEventListener('mouseleave', function () {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', function () {
    if (!active) return;
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  });

  /* the ring's spring: it closes 18% of the remaining gap every frame,
     which reads as fluid trailing rather than a fixed-delay lag */
  function tick() {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px) translate(-50%,-50%)';
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();
