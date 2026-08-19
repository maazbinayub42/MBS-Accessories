var MBSLoader = (function () {
  'use strict';

  var SVG_ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';

  var _content = null;

  function _get(path) {
    if (!_content) return undefined;
    var keys = path.split('.');
    var current = _content;
    for (var i = 0; i < keys.length; i++) {
      if (current === null || current === undefined) return undefined;
      current = current[keys[i]];
    }
    return current;
  }

  function _getOr(path, fallback) {
    var val = _get(path);
    return val !== undefined && val !== null ? val : fallback;
  }

  function _setHtml(el, html) {
    if (el) el.innerHTML = html;
  }

  function _setText(el, text) {
    if (el) el.textContent = text;
  }

  function _setAttr(el, attr, val) {
    if (el) el.setAttribute(attr, val);
  }

  function _toggle(el, enabled) {
    if (el) el.style.display = enabled ? '' : 'none';
  }

  function _query(sel) {
    return document.querySelector(sel);
  }

  function _queryAll(sel) {
    return document.querySelectorAll(sel);
  }

  function _isCurrentPage(url) {
    if (!url) return false;
    var loc = window.location;
    try {
      var urlObj = new URL(url, loc.origin);
      if (urlObj.hostname !== loc.hostname) return false;
      return urlObj.pathname === loc.pathname;
    } catch (e) {
      return loc.pathname.indexOf(url) !== -1 || url.indexOf(loc.pathname) !== -1;
    }
  }

  var TRUST_ICONS = {
    star: '<svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
    shield: '<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    truck: '<svg viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>',
    chat: '<svg viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>'
  };

  function _buildTrustIcon(iconName) {
    return TRUST_ICONS[iconName] || TRUST_ICONS.star;
  }

  /* ---------- SEO ---------- */
  function applySEO() {
    var page = _detectPage();
    var seo = _get('seo.' + page);
    if (!seo) return;

    if (seo.title) document.title = seo.title;

    if (seo.description) {
      var metaDesc = _query('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', seo.description);
    }

    if (seo.keywords) {
      var metaKw = _query('meta[name="keywords"]');
      if (metaKw) {
        metaKw.setAttribute('content', seo.keywords);
      } else {
        metaKw = document.createElement('meta');
        metaKw.setAttribute('name', 'keywords');
        metaKw.setAttribute('content', seo.keywords);
        var head = document.querySelector('head');
        if (head) head.appendChild(metaKw);
      }
    }
  }

  function _detectPage() {
    var path = window.location.pathname;
    var file = path.split('/').pop() || 'index.html';
    if (file === 'index.html' || file === '' || file === '/') return 'home';
    if (file.indexOf('shop') !== -1) return 'shop';
    if (file.indexOf('about') !== -1) return 'about';
    if (file.indexOf('contact') !== -1) return 'contact';
    return 'home';
  }

  /* ---------- Announcement Bar ---------- */
  function applyAnnouncement() {
    var el = _query('.announcement');
    if (!el) return;

    var ann = _get('site.announcement');
    if (!ann || !ann.enabled) {
      el.style.display = 'none';
      return;
    }

    el.innerHTML = ann.text + ' <a href="' + ann.linkUrl + '">' + ann.linkText + '</a>';
    el.style.display = '';
  }

  /* ---------- Logo ---------- */
  function applyLogo() {
    var logo = _get('site.logo');
    if (!logo) return;

    var els = _queryAll('.header__logo img, .footer__brand img');
    for (var i = 0; i < els.length; i++) {
      els[i].setAttribute('src', logo);
    }
  }

  /* ---------- Navigation ---------- */
  function applyNavigation() {
    var navItems = _get('navigation');
    if (!navItems || !navItems.length) return;

    var sorted = navItems.slice().sort(function (a, b) {
      return (a.order || 0) - (b.order || 0);
    });
    var enabled = sorted.filter(function (item) {
      return item.enabled;
    });

    _applyDesktopNav(enabled);
    _applyMobileNav(enabled);
  }

  function _applyDesktopNav(items) {
    var container = _query('.header__nav');
    if (!container) return;

    var html = items.map(function (item) {
      var active = _isCurrentPage(item.url);
      var cls = active ? ' class="active"' : '';
      return '<a href="' + item.url + '"' + cls + '>' + item.label + '</a>';
    }).join('');

    container.innerHTML = html;
  }

  function _applyMobileNav(items) {
    var container = _query('.mobile-nav__list');
    if (!container) return;

    var html = items.map(function (item) {
      return '<li><a href="' + item.url + '">' + item.label + '</a></li>';
    }).join('');

    container.innerHTML = html;
  }

  /* ---------- WhatsApp Links ---------- */
  function applyWhatsAppLinks() {
    var number = _get('site.whatsappNumber');
    if (!number) return;

    var clean = number.replace(/[^0-9+]/g, '');
    var digits = clean.replace(/^\+/, '');

    var links = _queryAll('a[href*="wa.me"]');
    for (var i = 0; i < links.length; i++) {
      var href = links[i].getAttribute('href') || '';
      var msgMatch = href.match(/(\?.*)$/);
      var suffix = msgMatch ? msgMatch[1] : '';
      links[i].setAttribute('href', 'https://wa.me/' + digits + suffix);
    }
  }

  /* ---------- Hero Section ---------- */
  function applyHero() {
    var hero = _get('homepage.hero');
    if (!hero) return;

    var section = _query('.hero');
    _toggle(section, !!hero.enabled);
    if (!hero.enabled) return;

    _setText(_query('.hero__eyebrow'), hero.eyebrow);
    _setHtml(_query('.hero__title'), hero.heading);
    _setText(_query('.hero__text'), hero.description);

    var primaryBtn = _query('.hero__buttons .btn--primary');
    if (primaryBtn) {
      primaryBtn.setAttribute('href', hero.primaryButtonUrl);
      primaryBtn.textContent = hero.primaryButtonText;
    }

    var secondaryBtn = _query('.hero__buttons .btn--outline');
    if (secondaryBtn) {
      secondaryBtn.setAttribute('href', hero.secondaryButtonUrl);
      secondaryBtn.textContent = hero.secondaryButtonText;
    }

    var heroImg = _query('.hero__image img');
    if (heroImg && hero.image) {
      heroImg.setAttribute('src', hero.image);
      var isMobile = window.innerWidth <= 768;
      if (isMobile && hero.mobileImage) {
        heroImg.setAttribute('src', hero.mobileImage);
      }
    }

    if (hero.overlay !== undefined) {
      var overlayEl = section.querySelector('.hero__overlay');
      if (!overlayEl) {
        overlayEl = document.createElement('div');
        overlayEl.className = 'hero__overlay';
        section.appendChild(overlayEl);
      }
      overlayEl.style.cssText = 'position:absolute;inset:0;background:#000;pointer-events:none;z-index:1;opacity:' + hero.overlay;
    }
  }

  /* ---------- Category Section ---------- */
  function applyCategories() {
    var sectionData = _get('homepage.categories');
    if (!sectionData) return;

    var section = _query('.section .categories__grid');
    var parentSection = section ? section.closest('.section') : null;

    _toggle(parentSection, !!sectionData.enabled);
    if (!sectionData.enabled) return;

    var eyebrowEl = parentSection ? parentSection.querySelector('.eyebrow') : null;
    if (eyebrowEl) eyebrowEl.textContent = sectionData.eyebrow;

    var headingEl = parentSection ? parentSection.querySelector('.heading-lg') : null;
    if (headingEl) headingEl.textContent = sectionData.heading;

    if (!section) return;

    var items = (sectionData.items || []).filter(function (item) {
      return item.enabled;
    });

    var html = items.map(function (item) {
      return '<a href="' + item.url + '" class="category-card">' +
        '<img src="' + item.image + '" alt="' + item.name + '" width="600" height="800" loading="lazy">' +
        '<div class="category-card__overlay">' +
          '<div class="category-card__name">' + item.name + '</div>' +
          '<div class="category-card__desc">' + item.description + '</div>' +
          '<div class="category-card__link">Explore ' + SVG_ARROW + '</div>' +
        '</div>' +
      '</a>';
    }).join('');

    section.innerHTML = html;
  }

  /* ---------- Featured Collection ---------- */
  function applyFeatured() {
    var data = _get('homepage.featured');
    if (!data) return;

    var section = _query('.section--cream');
    if (!section) return;

    _toggle(section, !!data.enabled);
    if (!data.enabled) return;

    var eyebrowEl = section.querySelector('.eyebrow');
    if (eyebrowEl) eyebrowEl.textContent = data.eyebrow;

    var headingEl = section.querySelector('.heading-lg');
    if (headingEl) headingEl.textContent = data.heading;

    var descEl = section.querySelector('.body-md');
    if (descEl) descEl.textContent = data.description;

    var btn = section.querySelector('.btn--outline');
    if (btn) {
      btn.setAttribute('href', data.buttonUrl);
      btn.textContent = data.buttonText;
    }
  }

  /* ---------- Editorial Banner ---------- */
  function applyEditorial() {
    var data = _get('homepage.editorial');
    if (!data) return;

    var section = _query('.editorial');
    _toggle(section, !!data.enabled);
    if (!data.enabled) return;

    var eyebrowEl = section.querySelector('.eyebrow');
    if (eyebrowEl) eyebrowEl.textContent = data.eyebrow;

    var headingEl = section.querySelector('h2');
    if (headingEl) headingEl.innerHTML = data.heading;

    var descEl = section.querySelector('.body-lg');
    if (descEl) descEl.textContent = data.description;

    var btn = section.querySelector('.btn--ghost');
    if (btn) {
      btn.setAttribute('href', data.buttonUrl);
      btn.textContent = data.buttonText;
    }

    var img = section.querySelector('.editorial__bg img');
    if (img && data.image) {
      img.setAttribute('src', data.image);
    }
  }

  /* ---------- Brand Story ---------- */
  function applyBrandStory() {
    var data = _get('homepage.brandStory');
    if (!data) return;

    var grid = _query('.story__grid');
    if (!grid) return;

    var section = grid.closest('.section');
    _toggle(section, !!data.enabled);
    if (!data.enabled) return;

    var eyebrowEl = grid.querySelector('.eyebrow');
    if (eyebrowEl) eyebrowEl.textContent = data.eyebrow;

    var headingEl = grid.querySelector('.heading-lg');
    if (headingEl) headingEl.innerHTML = data.heading;

    var paragraphs = grid.querySelectorAll('.story__content .body-lg');
    if (paragraphs.length >= 1) paragraphs[0].textContent = data.text;
    if (paragraphs.length >= 2) paragraphs[1].textContent = data.text2;

    var btn = grid.querySelector('.btn--outline');
    if (btn) {
      btn.setAttribute('href', data.buttonUrl);
      btn.textContent = data.buttonText;
    }

    var img = grid.querySelector('.story__image img');
    if (img && data.image) {
      img.setAttribute('src', data.image);
    }
  }

  /* ---------- Design Colors ---------- */
  function applyDesign() {
    var design = _get('design');
    if (!design) return;
    var root = document.documentElement;
    if (design.primaryColor) root.style.setProperty('--color-gold', design.primaryColor);
    if (design.secondaryColor) root.style.setProperty('--color-dark', design.secondaryColor);
    if (design.backgroundColor) root.style.setProperty('--color-bg', design.backgroundColor);
    if (design.textColor) root.style.setProperty('--color-text', design.textColor);
    if (design.accentColor) root.style.setProperty('--color-gold-light', design.accentColor);
  }

  /* ---------- Why MBS / Trust Blocks ---------- */
  function applyWhyMbs() {
    var data = _get('homepage.whyMbs');
    if (!data) return;

    var grid = _query('.trust__grid');
    if (!grid) return;

    var section = grid.closest('.section');
    _toggle(section, !!data.enabled);
    if (!data.enabled) return;

    var eyebrowEl = section ? section.querySelector('.eyebrow') : null;
    if (eyebrowEl) eyebrowEl.textContent = data.eyebrow;

    var headingEl = section ? section.querySelector('.heading-lg') : null;
    if (headingEl) headingEl.textContent = data.heading;

    var blocks = (data.blocks || []).filter(function (block) {
      return block.enabled;
    });

    var html = blocks.map(function (block) {
      return '<div class="trust-block">' +
        '<div class="trust-block__icon">' + _buildTrustIcon(block.icon) + '</div>' +
        '<div class="trust-block__title">' + block.title + '</div>' +
        '<p class="trust-block__text">' + block.text + '</p>' +
      '</div>';
    }).join('');

    grid.innerHTML = html;
  }

  /* ---------- Signature Collection ---------- */
  function applySignature() {
    var data = _get('homepage.signature');
    if (!data) return;

    var container = _query('#signature-products');
    if (!container) return;

    var section = container.closest('.section');
    _toggle(section, !!data.enabled);
    if (!data.enabled) return;

    var parent = section || container.closest('.container');
    if (parent) {
      var eyebrowEl = parent.querySelector('.eyebrow');
      if (eyebrowEl) eyebrowEl.textContent = data.eyebrow;

      var headingEl = parent.querySelector('.heading-lg');
      if (headingEl) headingEl.textContent = data.heading;

      var btn = parent.querySelector('.btn--outline');
      if (btn) {
        btn.setAttribute('href', data.buttonUrl);
        btn.textContent = data.buttonText;
      }
    }
  }

  /* ---------- Social Section ---------- */
  function applySocial() {
    var data = _get('homepage.social');
    if (!data) return;

    var grid = _query('.social__grid');
    if (!grid) return;

    var section = grid.closest('.section');
    _toggle(section, !!data.enabled);
    if (!data.enabled) return;

    var parent = section || grid.closest('.container');
    if (parent) {
      var eyebrowEl = parent.querySelector('.eyebrow');
      if (eyebrowEl) eyebrowEl.textContent = data.eyebrow;

      var headingEl = parent.querySelector('.heading-lg');
      if (headingEl) headingEl.textContent = data.heading;
    }

    var social = _get('social');
    if (!social) return;

    var tiles = grid.querySelectorAll('.social__tile');
    for (var i = 0; i < tiles.length; i++) {
      var url = (i % 2 === 0) ? social.instagram : social.facebook;
      if (url) tiles[i].setAttribute('href', url);
    }
  }

  /* ---------- WhatsApp CTA ---------- */
  function applyWhatsAppCta() {
    var data = _get('homepage.whatsappCta');
    if (!data) return;

    var section = _query('.whatsapp-cta');
    _toggle(section, !!data.enabled);
    if (!data.enabled) return;

    var eyebrowEl = section.querySelector('.eyebrow');
    if (eyebrowEl) eyebrowEl.textContent = data.eyebrow;

    var headingEl = section.querySelector('.heading-md');
    if (headingEl) headingEl.textContent = data.heading;

    var descEl = section.querySelector('.body-lg');
    if (descEl) descEl.textContent = data.description;

    var btn = section.querySelector('.btn--gold');
    if (btn) {
      var number = _get('site.whatsappNumber') || '';
      var digits = number.replace(/[^0-9]/g, '');
      btn.setAttribute('href', 'https://wa.me/' + digits + '?text=' + encodeURIComponent('Hi MBS Islamic Accessories! I\'d like to know more.'));
      btn.lastChild.textContent = ' ' + data.buttonText;
    }
  }

  /* ---------- Footer ---------- */
  function applyFooter() {
    var data = _get('footer');
    if (!data) return;

    var descEl = _query('.footer__brand p');
    if (descEl) descEl.textContent = data.description;

    var bottomSpans = _queryAll('.footer__bottom span');
    if (bottomSpans.length >= 1) bottomSpans[0].textContent = data.copyright;
    if (bottomSpans.length >= 2) bottomSpans[1].textContent = _getOr('site.tagline', 'MBS Fragrance & Faith Collection');

    _applyFooterLinks('.footer__grid > div:nth-child(2) .footer__links', data.shopLinks);
    _applyFooterLinks('.footer__grid > div:nth-child(3) .footer__links', data.companyLinks);
    _applyFooterLinks('.footer__grid > div:nth-child(4) .footer__links', data.supportLinks);

    _applyFooterSocialLinks();
  }

  function _applyFooterLinks(selector, links) {
    if (!links || !links.length) return;
    var container = _query(selector);
    if (!container) return;

    var html = links.map(function (link) {
      var extra = '';
      if (link.url.indexOf('wa.me') !== -1) {
        extra = ' target="_blank" rel="noopener"';
      }
      return '<a href="' + link.url + '"' + extra + '>' + link.label + '</a>';
    }).join('');

    container.innerHTML = html;
  }

  function _applyFooterSocialLinks() {
    var social = _get('social');
    if (!social) return;

    var socialContainer = _query('.footer__social');
    if (!socialContainer) return;

    var links = socialContainer.querySelectorAll('a');
    var socialKeys = ['instagram', 'facebook', 'whatsapp'];
    var number = _get('site.whatsappNumber') || '';
    var digits = number.replace(/[^0-9]/g, '');

    for (var i = 0; i < links.length; i++) {
      var key = socialKeys[i];
      if (!key) continue;
      var url;
      if (key === 'whatsapp') {
        url = 'https://wa.me/' + digits;
      } else {
        url = social[key];
      }
      if (url) links[i].setAttribute('href', url);
    }
  }

  /* ---------- WhatsApp Floating Button ---------- */
  function applyWhatsappFloat() {
    var btn = _query('.whatsapp-float');
    if (!btn) return;

    var number = _get('site.whatsappNumber') || '';
    var digits = number.replace(/[^0-9]/g, '');
    btn.setAttribute('href', 'https://wa.me/' + digits + '?text=' + encodeURIComponent('Hi MBS Islamic Accessories!'));
  }

  /* ---------- Products from CMS ---------- */
  function getProducts() {
    return MBSCMS.getProducts();
  }

  function getCategories() {
    return MBSCMS.getCategories();
  }

  /* ---------- Main Apply ---------- */
  function apply() {
    _content = MBSCMS.getAll();

    applySEO();
    applyAnnouncement();
    applyLogo();
    applyNavigation();
    applyWhatsAppLinks();
    applyDesign();
    applyHero();
    applyCategories();
    applyFeatured();
    applyEditorial();
    applyBrandStory();
    applyWhyMbs();
    applySignature();
    applySocial();
    applyWhatsAppCta();
    applyFooter();
    applyWhatsappFloat();

    _observeScrollAnimations();
  }

  function _observeScrollAnimations() {
    if (!('IntersectionObserver' in window)) return;
    var newElements = document.querySelectorAll('.fade-in:not(.visible), .fade-in-left:not(.visible), .fade-in-right:not(.visible), .stagger-children:not(.visible)');
    if (!newElements.length) return;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    newElements.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- Init on DOMContentLoaded ---------- */
  function _onReady() {
    if (typeof MBSCMS === 'undefined') return;
    MBSCMS.init();
    apply();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _onReady);
  } else {
    _onReady();
  }

  return {
    apply: apply,
    getProducts: getProducts,
    getCategories: getCategories
  };
})();
