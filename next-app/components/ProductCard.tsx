"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { addToCart } from "@/lib/cart";
import type { Product } from "@/types";

export default function ProductCard({ product }: { product: Product }) {
  const [showToast, setShowToast] = useState(false);

  function handleAddToBag(e: React.MouseEvent) {
    e.preventDefault();
    const defaultVariant = product.variants?.[0]?.value || "";
    addToCart(product, defaultVariant, 1);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  }

  return (
    <>
      <div className="product-card" data-id={product.id}>
        <div className="product-card__image">
          <Link href={`/product/${product.slug}`}>
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={530}
              loading="lazy"
              style={{ width: "100%", height: "auto" }}
            />
          </Link>
          {product.badge && (
            <div className="product-card__badge">{product.badge}</div>
          )}
          <button
            className="product-card__wishlist"
            aria-label="Add to wishlist"
          >
            <svg viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
          </button>
          <div className="product-card__actions">
            <button
              className="product-card__action-btn"
              onClick={handleAddToBag}
            >
              Add to Bag
            </button>
          </div>
        </div>
        <div className="product-card__info">
          <div className="product-card__category">{product.category}</div>
          <Link
            href={`/product/${product.slug}`}
            className="product-card__name"
          >
            {product.name}
          </Link>
          <div className="product-card__price">
            <span className="product-card__price-current">
              Rs. {product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="product-card__price-original">
                Rs. {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>

      {showToast && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            background: "#17130F",
            color: "#fff",
            padding: "14px 24px",
            fontSize: "13px",
            letterSpacing: "0.08em",
            zIndex: 1001,
            opacity: 1,
            transform: "translateY(0)",
            transition: "all 0.35s ease",
          }}
        >
          Added to bag
        </div>
      )}
    </>
  );
}
