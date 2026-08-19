/* ============================================
   MBS ACCESSORIES — Shop Page Logic
   ============================================ */

(function () {
  'use strict';

  var currentFilter = 'all';
  var currentSort = 'default';
  var grid = document.getElementById('shop-grid');
  var countEl = document.getElementById('product-count');
  var titleEl = document.getElementById('shop-title');
  var descEl = document.getElementById('shop-desc');

  function getParams() {
    var params = new URLSearchParams(window.location.search);
    return {
      category: params.get('category') || 'all'
    };
  }

  function init() {
    var params = getParams();
    if (params.category && params.category !== 'all') {
      currentFilter = params.category;
      var cat = MBS_CATEGORIES.find(function (c) { return c.id === params.category; });
      if (cat && titleEl) {
        titleEl.textContent = cat.name;
        descEl.textContent = cat.desc;
      }
    }

    document.querySelectorAll('.shop__filter-btn').forEach(function (btn) {
      if (btn.getAttribute('data-filter') === currentFilter) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    renderProducts();

    document.querySelectorAll('.shop__filter-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.shop__filter-btn').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        currentFilter = btn.getAttribute('data-filter');

        if (currentFilter === 'all') {
          if (titleEl) titleEl.textContent = 'Shop All';
          if (descEl) descEl.textContent = 'Discover our curated range of premium Islamic accessories and fragrances.';
        } else {
          var cat = MBS_CATEGORIES.find(function (c) { return c.id === currentFilter; });
          if (cat && titleEl) {
            titleEl.textContent = cat.name;
            if (descEl) descEl.textContent = cat.desc;
          }
        }

        renderProducts();
      });
    });

    var sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', function () {
        currentSort = sortSelect.value;
        renderProducts();
      });
    }
  }

  function renderProducts() {
    var filtered = MBS_PRODUCTS.filter(function (p) {
      return currentFilter === 'all' || p.category === currentFilter;
    });

    filtered = sortProducts(filtered);

    if (countEl) {
      countEl.textContent = filtered.length + ' product' + (filtered.length !== 1 ? 's' : '');
    }

    if (!grid) return;

    grid.innerHTML = filtered.map(function (p) {
      return '<div class="product-card">' +
        '<div class="product-card__image">' +
          '<a href="product.html?id=' + p.id + '">' +
            '<img src="' + p.image + '" alt="' + p.name + '" width="400" height="530" loading="lazy">' +
          '</a>' +
          (p.badge ? '<div class="product-card__badge">' + p.badge + '</div>' : '') +
          '<button class="product-card__wishlist" aria-label="Add to wishlist"><svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg></button>' +
          '<div class="product-card__actions">' +
            '<button class="product-card__action-btn" onclick="mbsAddToBag({id:\'' + p.id + '\',name:\'' + p.name.replace(/'/g, "\\'") + '\',price:' + p.price + ',image:\'' + p.image + '\',category:\'' + p.category + '\'})">Add to Bag</button>' +
          '</div>' +
        '</div>' +
        '<div class="product-card__info">' +
          '<div class="product-card__category">' + p.category + '</div>' +
          '<a href="product.html?id=' + p.id + '" class="product-card__name">' + p.name + '</a>' +
          '<div class="product-card__price">' +
            '<span class="product-card__price-current">Rs. ' + p.price.toLocaleString() + '</span>' +
            (p.originalPrice ? '<span class="product-card__price-original">Rs. ' + p.originalPrice.toLocaleString() + '</span>' : '') +
          '</div>' +
        '</div>' +
      '</div>';
    }).join('');

    grid.classList.remove('visible');
    setTimeout(function () { grid.classList.add('visible'); }, 50);
  }

  function sortProducts(products) {
    var sorted = products.slice();
    switch (currentSort) {
      case 'price-low':
        sorted.sort(function (a, b) { return a.price - b.price; });
        break;
      case 'price-high':
        sorted.sort(function (a, b) { return b.price - a.price; });
        break;
      case 'name':
        sorted.sort(function (a, b) { return a.name.localeCompare(b.name); });
        break;
      default:
        sorted.sort(function (a, b) { return (b.featured ? 1 : 0) - (a.featured ? 1 : 0); });
    }
    return sorted;
  }

  init();
})();
