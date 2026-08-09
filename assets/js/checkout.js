/* MBS Accessories — checkout page live shipping preview */
(function () {
  'use strict';

  var page = document.querySelector('[data-checkout-page]');
  if (!page) return;

  var shipping = window.MBS_SHIPPING || { rwp_isl: [], major: [], rwp_charge: 150, major_charge: 250, other_charge: 350 };

  function chargeFor(city) {
    var c = (city || '').toLowerCase().trim();
    if (!c) return 0;
    for (var i = 0; i < shipping.rwp_isl.length; i++) {
      if (c.indexOf(shipping.rwp_isl[i]) !== -1) return shipping.rwp_charge;
    }
    for (var j = 0; j < shipping.major.length; j++) {
      if (c.indexOf(shipping.major[j]) !== -1) return shipping.major_charge;
    }
    return shipping.other_charge;
  }

  function money(n) { return 'Rs. ' + Number(n).toLocaleString('en-PK'); }

  var subtotal = parseFloat(page.getAttribute('data-subtotal') || '0');

  var cityInput = page.querySelector('[data-city]');
  var shippingRow = page.querySelector('[data-shipping-value]');
  var grandRow = page.querySelector('[data-grand-value]');
  var shippingZone = page.querySelector('[data-shipping-zone]');

  function update() {
    var charge = chargeFor(cityInput ? cityInput.value : '');
    var grand = subtotal + charge;
    if (shippingRow) shippingRow.textContent = money(charge);
    if (grandRow) grandRow.textContent = money(grand);
    if (shippingZone) {
      if (charge === shipping.rwp_charge) shippingZone.textContent = 'Rawalpindi / Islamabad';
      else if (charge === shipping.major_charge) shippingZone.textContent = 'Major City';
      else shippingZone.textContent = 'Other City';
    }
  }

  if (cityInput) {
    cityInput.addEventListener('input', update);
    cityInput.addEventListener('change', update);
  }
  update();
})();
