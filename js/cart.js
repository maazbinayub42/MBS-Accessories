/* ============================================
   MBS ACCESSORIES — Cart Logic
   ============================================ */

(function () {
  'use strict';

  var cartContent = document.getElementById('cart-content');

  function getCart() {
    return JSON.parse(localStorage.getItem('mbs_cart') || '[]');
  }

  function saveCart(cart) {
    localStorage.setItem('mbs_cart', JSON.stringify(cart));
    if (window.mbsUpdateCartBadge) window.mbsUpdateCartBadge();
  }

  function calculateTotal(cart) {
    return cart.reduce(function (sum, item) { return sum + (item.price * item.qty); }, 0);
  }

  function render() {
    var cart = getCart();

    if (cart.length === 0) {
      cartContent.innerHTML =
        '<div class="cart__empty">' +
          '<h2 class="heading-md">Your bag is empty</h2>' +
          '<p class="body-lg">Discover our collection and find something you love.</p>' +
          '<a href="shop.html" class="btn btn--primary">Start Shopping</a>' +
        '</div>';
      return;
    }

    var total = calculateTotal(cart);

    var itemsHtml = cart.map(function (item, index) {
      return '<div class="cart__item" data-index="' + index + '">' +
        '<div class="cart__item-image"><img src="' + item.image + '" alt="' + item.name + '" width="100" height="120" loading="lazy"></div>' +
        '<div class="cart__item-info">' +
          '<h3>' + item.name + '</h3>' +
          '<div class="body-sm">' + item.category.charAt(0).toUpperCase() + item.category.slice(1) + (item.variant ? ' — ' + item.variant : '') + '</div>' +
          '<div class="cart__item-qty">' +
            '<button class="qty-minus" data-index="' + index + '">&#8722;</button>' +
            '<span>' + item.qty + '</span>' +
            '<button class="qty-plus" data-index="' + index + '">+</button>' +
          '</div>' +
          '<button class="cart__item-remove" data-index="' + index + '">Remove</button>' +
        '</div>' +
        '<div class="cart__item-price">Rs. ' + (item.price * item.qty).toLocaleString() + '</div>' +
      '</div>';
    }).join('');

    var waMessage = encodeURIComponent('Hi MBS Islamic Accessories! I would like to order:\n' +
      cart.map(function (item) { return '- ' + item.name + (item.variant ? ' (' + item.variant + ')' : '') + ' x' + item.qty + ' — Rs. ' + (item.price * item.qty).toLocaleString(); }).join('\n') +
      '\n\nTotal: Rs. ' + total.toLocaleString());

    cartContent.innerHTML =
      '<div class="cart__grid">' +
        '<div class="cart__items">' + itemsHtml + '</div>' +
        '<div class="cart__summary">' +
          '<h3>Order Summary</h3>' +
          '<div class="cart__summary-row"><span>Subtotal</span><span>Rs. ' + total.toLocaleString() + '</span></div>' +
          '<div class="cart__summary-row"><span>Delivery</span><span>Calculated at checkout</span></div>' +
          '<div class="cart__summary-row total"><span>Total</span><span>Rs. ' + total.toLocaleString() + '</span></div>' +
          '<a href="https://wa.me/923707107422?text=' + waMessage + '" target="_blank" rel="noopener" class="btn btn--gold btn--full">Order via WhatsApp</a>' +
          '<a href="shop.html" class="btn btn--outline btn--full" style="margin-top:12px;">Continue Shopping</a>' +
        '</div>' +
      '</div>';

    bindEvents();
  }

  function bindEvents() {
    document.querySelectorAll('.qty-minus').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var idx = parseInt(this.getAttribute('data-index'));
        var cart = getCart();
        if (cart[idx].qty > 1) {
          cart[idx].qty--;
        } else {
          cart.splice(idx, 1);
        }
        saveCart(cart);
        render();
      });
    });

    document.querySelectorAll('.qty-plus').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var idx = parseInt(this.getAttribute('data-index'));
        var cart = getCart();
        if (cart[idx].qty < 10) {
          cart[idx].qty++;
          saveCart(cart);
          render();
        }
      });
    });

    document.querySelectorAll('.cart__item-remove').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var idx = parseInt(this.getAttribute('data-index'));
        var cart = getCart();
        cart.splice(idx, 1);
        saveCart(cart);
        render();
      });
    });
  }

  render();
})();
