"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ScrollAnimations from "@/components/ScrollAnimations";
import { MBS_PRODUCTS, MBS_CATEGORIES } from "@/lib/products-data";

const FILTER_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Kufis", value: "kufis" },
  { label: "Imamas", value: "imamas" },
  { label: "Attars", value: "attars" },
  { label: "Fragrances", value: "fragrances" },
] as const;

const SORT_OPTIONS = [
  { label: "Sort by: Featured", value: "default" },
  { label: "Price: Low to High", value: "price-low" },
  { label: "Price: High to Low", value: "price-high" },
  { label: "Name: A to Z", value: "name" },
] as const;

function sortProducts(
  products: typeof MBS_PRODUCTS,
  sortBy: string
): typeof MBS_PRODUCTS {
  const sorted = [...products];
  switch (sortBy) {
    case "price-low":
      sorted.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      sorted.sort((a, b) => b.price - a.price);
      break;
    case "name":
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }
  return sorted;
}

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialCategory = searchParams.get("category") || "all";
  const [currentFilter, setCurrentFilter] = useState(initialCategory);
  const [currentSort, setCurrentSort] = useState("default");

  const categoryInfo = useMemo(() => {
    if (currentFilter === "all") return null;
    return MBS_CATEGORIES.find((c) => c.id === currentFilter) || null;
  }, [currentFilter]);

  const pageTitle = categoryInfo ? categoryInfo.name : "Shop All";
  const pageDesc = categoryInfo
    ? categoryInfo.description
    : "Discover our curated range of premium Islamic accessories and fragrances.";

  const filteredProducts = useMemo(() => {
    const filtered = MBS_PRODUCTS.filter(
      (p) => currentFilter === "all" || p.category === currentFilter
    );
    return sortProducts(filtered, currentSort);
  }, [currentFilter, currentSort]);

  function handleFilterChange(value: string) {
    setCurrentFilter(value);
    if (value === "all") {
      router.push("/shop", { scroll: false });
    } else {
      router.push(`/shop?category=${value}`, { scroll: false });
    }
  }

  function handleSortChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setCurrentSort(e.target.value);
  }

  return (
    <>
      <Header />

      <ScrollAnimations />

      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <div className="eyebrow">MBS COLLECTION</div>
          <h1 className="heading-lg">{pageTitle}</h1>
          <p
            className="body-md"
            style={{ marginTop: 8 }}
          >
            {pageDesc}
          </p>
        </div>
      </section>

      {/* Shop Content */}
      <section className="section">
        <div className="container">
          <div className="shop__toolbar">
            <div className="shop__count">
              {filteredProducts.length} product
              {filteredProducts.length !== 1 ? "s" : ""}
            </div>
            <div className="shop__filters">
              {FILTER_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  className={`shop__filter-btn${currentFilter === opt.value ? " active" : ""}`}
                  onClick={() => handleFilterChange(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <div className="shop__sort">
              <select value={currentSort} onChange={handleSortChange}>
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="product-grid stagger-children">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="container" style={{ padding: "40px 0" }}>Loading shop...</div>}>
      <ShopContent />
    </Suspense>
  );
}
