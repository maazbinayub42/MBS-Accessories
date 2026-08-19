"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCart, updateQty, removeItem, formatPrice } from "@/lib/cart";
import type { CartItem } from "@/types";

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setCart(getCart());
    setMounted(true);
  }, []);

  function refresh() {
    setCart(getCart());
  }

  function handleMinus(index: number) {
    updateQty(index, -1);
    refresh();
  }

  function handlePlus(index: number) {
    if (cart[index] && cart[index].qty < 10) {
      updateQty(index, 1);
      refresh();
    }
  }

  function handleRemove(index: number) {
    removeItem(index);
    refresh();
  }

  if (!mounted) return null;

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const waMessage = encodeURIComponent(
    "Hi MBS Islamic Accessories! I would like to order:\n" +
      cart
        .map(
          (item) =>
            `- ${item.name}${item.variant ? ` (${item.variant})` : ""} x${item.qty} — ${formatPrice(item.price * item.qty)}`
        )
        .join("\n") +
      `\n\nTotal: ${formatPrice(total)}`
  );

  return (
    <>
      <Header />

      <section className="cart">
        <div className="container">
          <h1 className="heading-lg" style={{ marginBottom: 32 }}>
            Shopping Bag
          </h1>

          {cart.length === 0 ? (
            <div className="cart__empty">
              <h2 className="heading-md">Your bag is empty</h2>
              <p className="body-lg">
                Discover our collection and find something you love.
              </p>
              <Link href="/shop" className="btn btn--primary">
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="cart__grid">
              <div className="cart__items">
                {cart.map((item, index) => (
                  <div className="cart__item" key={`${item.id}-${item.variant}`}>
                    <div className="cart__item-image">
                      <img
                        src={item.image}
                        alt={item.name}
                        width={100}
                        height={120}
                        loading="lazy"
                      />
                    </div>
                    <div className="cart__item-info">
                      <h3>{item.name}</h3>
                      <div className="body-sm">
                        {item.category.charAt(0).toUpperCase() +
                          item.category.slice(1)}
                        {item.variant ? ` — ${item.variant}` : ""}
                      </div>
                      <div className="cart__item-qty">
                        <button
                          className="qty-minus"
                          onClick={() => handleMinus(index)}
                        >
                          &#8722;
                        </button>
                        <span>{item.qty}</span>
                        <button
                          className="qty-plus"
                          onClick={() => handlePlus(index)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="cart__item-remove"
                        onClick={() => handleRemove(index)}
                      >
                        Remove
                      </button>
                    </div>
                    <div className="cart__item-price">
                      {formatPrice(item.price * item.qty)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart__summary">
                <h3>Order Summary</h3>
                <div className="cart__summary-row">
                  <span>Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="cart__summary-row">
                  <span>Delivery</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="cart__summary-row total">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <a
                  href={`https://wa.me/923707107422?text=${waMessage}`}
                  target="_blank"
                  rel="noopener"
                  className="btn btn--gold btn--full"
                >
                  Order via WhatsApp
                </a>
                <Link
                  href="/shop"
                  className="btn btn--outline btn--full"
                  style={{ marginTop: 12 }}
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
