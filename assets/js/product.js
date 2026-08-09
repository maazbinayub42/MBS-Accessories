/* MBS Accessories — product detail page */
(function () {
  'use strict';

  var page = document.querySelector('[data-product-page]');
  if (!page) return;

  var cfg = {
    variants: JSON.parse(page.getAttribute('data-variants') || '[]'),
    basePrice: parseFloat(page.getAttribute('data-base-price') || '0'),
    waNumber: page.getAttribute('data-wa-number') || '',
    name: page.getAttribute('data-name') || '',
    slug: page.getAttribute('data-slug') || ''
  };

  var state = { size: null, color: null, qty: 1 };

  /* ---------- Data helpers ---------- */
  function sizeVariants() { return cfg.variants.filter(function (v) { return v.type === 'size'; }); }
  function colorVariants() { return cfg.variants.filter(function (v) { return v.type === 'color'; }); }
  function findVariant(type, label) {
    return cfg.variants.find(function (v) { return v.type === type && v.label === label; }) || null;
  }

  function currentPrice() {
    var size = findVariant('size', state.size);
    if (size && size.price !== null && size.price !== undefined && size.price !== '') {
      return parseFloat(size.price);
    }
    return cfg.basePrice;
  }

  function variantSummary() {
    var parts = [];
    if (state.size) parts.push(state.size);
    if (state.color) parts.push(state.color);
    return parts.join(' / ');
  }

  /* ---------- Rendering ---------- */
  function renderPills(container, type) {
    var list = type === 'size' ? sizeVariants() : colorVariants();
    if (!list.length) return;
    var wrapper = page.querySelector('[data-variant-' + type + ']');
    if (!wrapper) return;
    wrapper.classList.remove('hidden');
    var box = wrapper.querySelector('[data-variant-box]');
    box.innerHTML = '';
    list.forEach(function (v) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'variant-pill';
      btn.textContent = v.label;
      if (v.default) { btn.classList.add('selected'); state[type] = v.label; }
      btn.addEventListener('click', function () {
        box.querySelectorAll('.variant-pill').forEach(function (b) { b.classList.remove('selected'); });
        btn.classList.add('selected');
        state[type] = v.label;
        updatePrice();
      });
      box.appendChild(btn);
    });
  }

  function updatePrice() {
    var price = currentPrice();
    var el = page.querySelector('[data-price-value]');
    if (el) el.textContent = 'Rs. ' + price.toLocaleString('en-PK');
  }

  function updateQty() {
    var el = page.querySelector('[data-qty-value]');
    if (el) el.textContent = state.qty;
  }

  function selectedVariantLabel() {
    return variantSummary() || 'Standard';
  }

  /* ---------- Quantity stepper ---------- */
  var qtyWrap = page.querySelector('[data-qty]');
  if (qtyWrap) {
    qtyWrap.querySelectorAll('[data-qty-btn]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var delta = parseInt(btn.getAttribute('data-qty-btn'), 10) || 0;
        state.qty = Math.max(1, Math.min(99, state.qty + delta));
        updateQty();
      });
    });
  }

  /* ---------- Add to bag (syncs hidden fields) ---------- */
  var form = page.querySelector('[data-add-form]');
  if (form) {
    form.addEventListener('submit', function (e) {
      form.querySelector('[name="variant"]').value = selectedVariantLabel();
      form.querySelector('[name="qty"]').value = state.qty;
      form.querySelector('[name="unit_price"]').value = currentPrice();
    });
  }

  /* ---------- WhatsApp order ---------- */
  var waBtn = page.querySelector('[data-wa-order]');
  if (waBtn && cfg.waNumber) {
    waBtn.addEventListener('click', function (e) {
      e.preventDefault();
      var price = currentPrice();
      var qty = state.qty;
      var total = price * qty;
      var msg =
        'Assalam o Alaikum MBS Accessories! 💫\n\n' +
        'I would like to place an order:\n' +
        '━━━━━━━━━━━━━━━━\n' +
        '🛍 *Product:* ' + cfg.name + '\n' +
        '🔹 *Variant:* ' + selectedVariantLabel() + '\n' +
        '🔢 *Quantity:* ' + qty + '\n' +
        '💰 *Price:* Rs. ' + price.toLocaleString('en-PK') + '\n' +
        '🧾 *Product Total:* Rs. ' + total.toLocaleString('en-PK') + '\n' +
        '━━━━━━━━━━━━━━━━\n' +
        'Shipping charges will be confirmed (Leopard Courier).';
      window.open('https://wa.me/' + cfg.waNumber + '?text=' + encodeURIComponent(msg), '_blank');
    });
  }

  /* ---------- Gallery thumbnails ---------- */
  var thumbs = page.querySelectorAll('[data-thumb]');
  var mainImg = page.querySelector('[data-main-img]');
  thumbs.forEach(function (t) {
    t.addEventListener('click', function () {
      thumbs.forEach(function (x) { x.classList.remove('active'); });
      t.classList.add('active');
      if (mainImg) mainImg.src = t.getAttribute('data-thumb');
    });
  });

  /* ---------- Image zoom (cursor-follow magnify) ---------- */
  var zoomFrame = page.querySelector('[data-zoom-frame]');
  if (zoomFrame) {
    zoomFrame.addEventListener('mousemove', function (e) {
      var r = zoomFrame.getBoundingClientRect();
      var x = ((e.clientX - r.left) / r.width) * 100;
      var y = ((e.clientY - r.top) / r.height) * 100;
      var img = zoomFrame.querySelector('img');
      img.style.setProperty('--mx', x + '%');
      img.style.setProperty('--my', y + '%');
    });
    zoomFrame.addEventListener('mouseenter', function () { zoomFrame.classList.add('zoomed'); });
    zoomFrame.addEventListener('mouseleave', function () { zoomFrame.classList.remove('zoomed'); });
  }

  /* ---------- Init ---------- */
  renderPills(null, 'size');
  renderPills(null, 'color');
  if (state.size === null && sizeVariants().length) state.size = sizeVariants()[0].label;
  if (state.color === null && colorVariants().length) state.color = colorVariants()[0].label;
  updatePrice();
  updateQty();
})();
