"use client";

import { useState, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ScrollAnimations from "@/components/ScrollAnimations";
import { MBS_PRODUCTS } from "@/lib/products-data";
import { addToCart, formatPrice } from "@/lib/cart";
import type { Product } from "@/types";

const WHATSAPP_NUMBER = "923707107422";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const product = MBS_PRODUCTS.find((p) => p.slug === slug);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<string>(
    product?.variants?.[0]?.value || ""
  );
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);

  const mainImageRef = useRef<HTMLImageElement>(null);
  const mainImageWrapRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const wrap = mainImageWrapRef.current;
      const img = mainImageRef.current;
      if (!wrap || !img) return;
      const rect = wrap.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      img.style.transformOrigin = `${x}% ${y}%`;
      img.style.transform = "scale(1.4)";
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    const img = mainImageRef.current;
    if (img) {
      img.style.transform = "scale(1)";
    }
  }, []);

  function handleAddToBag() {
    if (!product) return;
    addToCart(product, selectedVariant, quantity);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  }

  if (!product) {
    return (
      <>
        <Header />
        <section className="product-detail">
          <div className="container">
            <div style={{ padding: "16px 0 24px", fontSize: 13, color: "var(--text-light)" }}>
              <Link href="/" style={{ color: "var(--text-muted)" }}>Home</Link>
              <span style={{ margin: "0 8px" }}>/</span>
              <Link href="/shop" style={{ color: "var(--text-muted)" }}>Shop</Link>
              <span style={{ margin: "0 8px" }}>/</span>
              <span>Product</span>
            </div>
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <h2 className="heading-md">Product not found</h2>
              <p
                className="body-md"
                style={{ marginTop: 12 }}
              >
                <Link href="/shop" style={{ color: "var(--gold)", textDecoration: "underline" }}>
                  Back to Shop
                </Link>
              </p>
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  const images =
    product.images && product.images.length ? product.images : [product.image];
  const categoryLabel =
    product.category.charAt(0).toUpperCase() + product.category.slice(1);

  const relatedSameCategory = MBS_PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const relatedOthers = MBS_PRODUCTS.filter(
    (p) => p.category !== product.category
  ).slice(0, 4 - relatedSameCategory.length);

  const relatedProducts = [...relatedSameCategory, ...relatedOthers];

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi!%20I%27m%20interested%20in%20${encodeURIComponent(product.name)}.`;

  return (
    <>
      <Header />

      <ScrollAnimations />

      {/* Product Detail */}
      <section className="product-detail">
        <div className="container">
          <div
            style={{
              padding: "16px 0 24px",
              fontSize: 13,
              color: "var(--text-light)",
            }}
          >
            <Link href="/" style={{ color: "var(--text-muted)" }}>
              Home
            </Link>
            <span style={{ margin: "0 8px" }}>/</span>
            <Link href="/shop" style={{ color: "var(--text-muted)" }}>
              Shop
            </Link>
            <span style={{ margin: "0 8px" }}>/</span>
            <span>
              <Link
                href={`/shop?category=${product.category}`}
                style={{ color: "var(--text-muted)" }}
              >
                {categoryLabel}
              </Link>{" "}
              <span style={{ margin: "0 8px" }}>/</span> {product.name}
            </span>
          </div>

          <div className="product-detail__grid">
            {/* Thumbnails Column */}
            <div className="product-detail__thumbs">
              {images.map((img, i) => (
                <div
                  key={i}
                  className={`product-detail__thumb${i === selectedImageIndex ? " active" : ""}`}
                  onClick={() => setSelectedImageIndex(i)}
                >
                  <img
                    src={img}
                    alt={`${product.name} thumbnail ${i + 1}`}
                    width={80}
                    height={80}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            {/* Main Image Column */}
            <div
              className="product-detail__main-image"
              ref={mainImageWrapRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img
                ref={mainImageRef}
                src={images[selectedImageIndex]}
                alt={product.name}
                width={800}
                height={1060}
                id="main-image"
              />
            </div>

            {/* Info Panel */}
            <div className="product-detail__info">
              <div className="product-detail__category">{categoryLabel}</div>
              <h1 className="product-detail__name">{product.name}</h1>
              <div className="product-detail__price">
                <span className="product-detail__price-current">
                  Rs. {product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="product-detail__price-original">
                    Rs. {product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              <div className="product-detail__desc body-lg">
                <p>{product.description}</p>
              </div>

              {product.variants && product.variants.length > 0 && (
                <div className="product-detail__options">
                  <div className="product-detail__label">Select Variant</div>
                  <div className="product-detail__variants">
                    {product.variants.map((v) => (
                      <button
                        key={v.value}
                        className={`product-detail__variant${selectedVariant === v.value ? " active" : ""}`}
                        onClick={() => setSelectedVariant(v.value)}
                      >
                        {v.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="product-detail__options">
                <div className="product-detail__label">Quantity</div>
                <div className="product-detail__qty">
                  <button
                    onClick={() =>
                      setQuantity((q) => (q > 1 ? q - 1 : q))
                    }
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button
                    onClick={() =>
                      setQuantity((q) => (q < 10 ? q + 1 : q))
                    }
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="product-detail__buttons">
                <button
                  className="btn btn--primary btn--full"
                  onClick={handleAddToBag}
                >
                  Add to Bag
                </button>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener"
                  className="btn btn--gold btn--full"
                >
                  Order via WhatsApp
                </a>
              </div>

              <div className="product-detail__delivery">
                <strong>Delivery Information</strong>
                Standard delivery across Pakistan. Orders are dispatched within
                1-2 business days.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="products__header fade-in">
              <div>
                <div className="eyebrow">YOU MAY ALSO LIKE</div>
                <h2 className="heading-lg">Related Products</h2>
              </div>
              <Link href="/shop" className="btn btn--outline btn--sm">
                View All
              </Link>
            </div>
            <div className="product-grid stagger-children">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />

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
