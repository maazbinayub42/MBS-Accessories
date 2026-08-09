/* MBS Accessories — main frontend behaviours */
(function () {
  'use strict';

  /* ---------- Mobile menu ---------- */
  var menuToggle = document.querySelector('[data-menu-toggle]');
  var menuPanel = document.querySelector('[data-menu-panel]');
  var menuClose = document.querySelector('[data-menu-close]');
  if (menuToggle && menuPanel) {
    menuToggle.addEventListener('click', function () {
      menuPanel.classList.toggle('open');
      document.body.style.overflow = menuPanel.classList.contains('open') ? 'hidden' : '';
    });
    if (menuClose) menuClose.addEventListener('click', function () {
      menuPanel.classList.remove('open');
      document.body.style.overflow = '';
    });
    menuPanel.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menuPanel.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Hero slider ---------- */
  var slides = document.querySelectorAll('[data-hero-slide]');
  var dots = document.querySelectorAll('[data-hero-dot]');
  if (slides.length > 1) {
    var current = 0;
    var timer = null;
    var AUTO_MS = 6000;

    function show(index) {
      slides.forEach(function (s, i) {
        s.classList.toggle('active', i === index);
      });
      dots.forEach(function (d, i) {
        d.classList.toggle('active', i === index);
      });
      current = index;
    }
    function next() { show((current + 1) % slides.length); }
    function restart() {
      if (timer) clearInterval(timer);
      timer = setInterval(next, AUTO_MS);
    }
    dots.forEach(function (d, i) {
      d.addEventListener('click', function () {
        show(i);
        restart();
      });
    });
    show(0);
    timer = setInterval(next, AUTO_MS);
  }

  /* ---------- Toast helper ---------- */
  window.mbsToast = function (message) {
    var toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    requestAnimationFrame(function () { toast.classList.add('show'); });
    setTimeout(function () {
      toast.classList.remove('show');
      setTimeout(function () { toast.remove(); }, 500);
    }, 2600);
  };
})();
