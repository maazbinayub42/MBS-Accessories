/* ============================================
   MBS ACCESSORIES — Main JavaScript
   ============================================ */

(function () {
  'use strict';

  /* ---------- Header Scroll ---------- */
  const header = document.querySelector('.header');
  if (header) {
    let lastScroll = 0;
    window.addEventListener('scroll', function () {
      const current = window.pageYOffset;
      header.classList.toggle('scrolled', current > 10);
      lastScroll = current;
    }, { passive: true });
  }

  /* ---------- Mobile Menu ---------- */
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      const isOpen = mobileNav.classList.contains('open');
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- Scroll Animations ---------- */
  const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .stagger-children');

  if (animatedElements.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    animatedElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---------- Cart Badge Update ---------- */
  function updateCartBadge() {
    const badge = document.querySelector('.header__cart-count');
    if (!badge) return;
    const cart = JSON.parse(localStorage.getItem('mbs_cart') || '[]');
    const count = cart.reduce(function (sum, item) { return sum + item.qty; }, 0);
    badge.textContent = count;
    badge.classList.toggle('visible', count > 0);
  }

  updateCartBadge();
  window.mbsUpdateCartBadge = updateCartBadge;

  /* ---------- Add to Bag (global) ---------- */
  window.mbsAddToBag = function (product) {
    var cart = JSON.parse(localStorage.getItem('mbs_cart') || '[]');
    var existing = cart.find(function (item) {
      return item.id === product.id && item.variant === product.variant;
    });

    if (existing) {
      existing.qty += product.qty || 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        variant: product.variant || '',
        qty: product.qty || 1
      });
    }

    localStorage.setItem('mbs_cart', JSON.stringify(cart));
    updateCartBadge();

    var toast = document.getElementById('cart-toast');
    if (toast) {
      toast.classList.add('show');
      setTimeout(function () {
        toast.classList.remove('show');
      }, 2500);
    }
  };

  /* ---------- Smooth Scroll for Anchors ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
