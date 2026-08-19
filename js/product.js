/* ============================================
   MBS ACCESSORIES — Product Detail Logic
   ============================================ */

(function () {
  'use strict';

  var params = new URLSearchParams(window.location.search);
  var productId = params.get('id');
  var product = MBS_PRODUCTS.find(function (p) { return p.id === productId; });
  var container = document.getElementById('product-detail');
  var breadcrumbCat = document.getElementById('breadcrumb-category');

  if (!product) {
    if (container) container.innerHTML = '<div style="text-align:center;padding:80px 0;"><h2 class="heading-md">Product not found</h2><p class="body-md" style="margin-top:12px;"><a href="shop.html" style="color:var(--gold);text-decoration:underline;">Back to Shop</a></p></div>';
    return;
  }

  document.title = product.name + ' — MBS Islamic Accessories';

  if (breadcrumbCat) {
    breadcrumbCat.innerHTML = '<a href="shop.html?category=' + product.category + '" style="color:var(--text-muted);">' + product.category.charAt(0).toUpperCase() + product.category.slice(1) + '</a> <span style="margin:0 8px;">/</span> ' + product.name;
  }

  var mainImages = product.images && product.images.length ? product.images : [product.image];
  var selectedVariant = product.variants ? product.variants[0] : '';

  function render() {
    var thumbsHtml = mainImages.map(function (img, i) {
      return '<div class="product-detail__thumb' + (i === 0 ? ' active' : '') + '" data-index="' + i + '"><img src="' + img + '" alt="' + product.name + ' thumbnail ' + (i + 1) + '" width="80" height="80" loading="lazy"></div>';
    }).join('');

    var variantsHtml = product.variants ? product.variants.map(function (v) {
      return '<button class="product-detail__variant' + (v === selectedVariant ? ' active' : '') + '" data-variant="' + v + '">' + v + '</button>';
    }).join('') : '';

    var salePriceHtml = product.originalPrice
      ? '<span class="product-detail__price-original">Rs. ' + product.originalPrice.toLocaleString() + '</span>'
      : '';

    var categoryLabel = product.category.charAt(0).toUpperCase() + product.category.slice(1);

    container.innerHTML =
      '<div class="product-detail__thumbs">' + thumbsHtml + '</div>' +
      '<div class="product-detail__main-image" id="main-image-wrap"><img src="' + mainImages[0] + '" alt="' + product.name + '" width="800" height="1060" id="main-image"></div>' +
      '<div class="product-detail__info">' +
        '<div class="product-detail__category">' + categoryLabel + '</div>' +
        '<h1 class="product-detail__name">' + product.name + '</h1>' +
        '<div class="product-detail__price"><span class="product-detail__price-current">Rs. ' + product.price.toLocaleString() + '</span>' + salePriceHtml + '</div>' +
        '<div class="product-detail__desc body-lg"><p>' + product.description + '</p></div>' +
        (product.variants ? '<div class="product-detail__options"><div class="product-detail__label">Select Variant</div><div class="product-detail__variants" id="variant-select">' + variantsHtml + '</div></div>' : '') +
        '<div class="product-detail__options"><div class="product-detail__label">Quantity</div><div class="product-detail__qty"><button id="qty-minus">-</button><span id="qty-value">1</span><button id="qty-plus">+</button></div></div>' +
        '<div class="product-detail__buttons"><button class="btn btn--primary btn--full" id="add-to-bag">Add to Bag</button>' +
        '<a href="https://wa.me/923707107422?text=Hi!%20I%27m%20interested%20in%20' + encodeURIComponent(product.name) + '." target="_blank" rel="noopener" class="btn btn--gold btn--full">Order via WhatsApp</a></div>' +
        '<div class="product-detail__delivery"><strong>Delivery Information</strong>Standard delivery across Pakistan. Orders are dispatched within 1-2 business days.</div>' +
      '</div>';

    bindEvents();
    loadRelated();
  }

  function bindEvents() {
    var qtyValue = 1;
    var qtyEl = document.getElementById('qty-value');
    var minusBtn = document.getElementById('qty-minus');
    var plusBtn = document.getElementById('qty-plus');

    if (minusBtn) minusBtn.addEventListener('click', function () {
      if (qtyValue > 1) { qtyValue--; qtyEl.textContent = qtyValue; }
    });
    if (plusBtn) plusBtn.addEventListener('click', function () {
      if (qtyValue < 10) { qtyValue++; qtyEl.textContent = qtyValue; }
    });

    var thumbs = document.querySelectorAll('.product-detail__thumb');
    var mainImg = document.getElementById('main-image');

    thumbs.forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        var idx = parseInt(this.getAttribute('data-index'));
        thumbs.forEach(function (t) { t.classList.remove('active'); });
        this.classList.add('active');
        if (mainImg) mainImg.src = mainImages[idx];
      });
    });

    var variantBtns = document.querySelectorAll('.product-detail__variant');
    variantBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        variantBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        selectedVariant = btn.getAttribute('data-variant');
      });
    });

    var addBtn = document.getElementById('add-to-bag');
    if (addBtn) {
      addBtn.addEventListener('click', function () {
        window.mbsAddToBag({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category,
          variant: selectedVariant,
          qty: qtyValue
        });
        var toast = document.getElementById('cart-toast');
        if (toast) {
          toast.style.opacity = '1';
          toast.style.transform = 'translateY(0)';
          toast.style.pointerEvents = 'auto';
          setTimeout(function () {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(20px)';
            toast.style.pointerEvents = 'none';
          }, 2500);
        }
      });
    }

    var mainImageWrap = document.getElementById('main-image-wrap');
    if (mainImageWrap && mainImg) {
      mainImageWrap.addEventListener('mousemove', function (e) {
        var rect = mainImageWrap.getBoundingClientRect();
        var x = ((e.clientX - rect.left) / rect.width) * 100;
        var y = ((e.clientY - rect.top) / rect.height) * 100;
        mainImg.style.transformOrigin = x + '% ' + y + '%';
        mainImg.style.transform = 'scale(1.4)';
      });
      mainImageWrap.addEventListener('mouseleave', function () {
        mainImg.style.transform = 'scale(1)';
      });
    }
  }

  function loadRelated() {
    var related = MBS_PRODUCTS.filter(function (p) {
      return p.category === product.category && p.id !== product.id;
    }).slice(0, 4);

    if (related.length < 4) {
      var extras = MBS_PRODUCTS.filter(function (p) {
        return p.category !== product.category;
      }).slice(0, 4 - related.length);
      related = related.concat(extras);
    }

    var grid = document.getElementById('related-products');
    if (!grid) return;

    grid.innerHTML = related.map(function (p) {
      return '<div class="product-card">' +
        '<div class="product-card__image">' +
          '<a href="product.html?id=' + p.id + '"><img src="' + p.image + '" alt="' + p.name + '" width="400" height="530" loading="lazy"></a>' +
          (p.badge ? '<div class="product-card__badge">' + p.badge + '</div>' : '') +
          '<button class="product-card__wishlist" aria-label="Add to wishlist"><svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg></button>' +
          '<div class="product-card__actions"><button class="product-card__action-btn" onclick="mbsAddToBag({id:\'' + p.id + '\',name:\'' + p.name.replace(/'/g, "\\'") + '\',price:' + p.price + ',image:\'' + p.image + '\',category:\'' + p.category + '\'})">Add to Bag</button></div>' +
        '</div>' +
        '<div class="product-card__info">' +
          '<div class="product-card__category">' + p.category + '</div>' +
          '<a href="product.html?id=' + p.id + '" class="product-card__name">' + p.name + '</a>' +
          '<div class="product-card__price"><span class="product-card__price-current">Rs. ' + p.price.toLocaleString() + '</span>' +
          (p.originalPrice ? '<span class="product-card__price-original">Rs. ' + p.originalPrice.toLocaleString() + '</span>' : '') + '</div>' +
        '</div></div>';
    }).join('');

    grid.classList.add('visible');
  }

  render();
})();
