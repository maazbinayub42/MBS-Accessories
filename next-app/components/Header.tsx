"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getCartCount } from "@/lib/cart";

const DEFAULT_NAV = [
  { label: "Home", url: "/" },
  { label: "Shop", url: "/shop" },
  { label: "Kufis", url: "/shop?category=kufis" },
  { label: "Imamas", url: "/shop?category=imamas" },
  { label: "Attars", url: "/shop?category=attars" },
  { label: "Fragrances", url: "/shop?category=fragrances" },
  { label: "Our Story", url: "/about" },
  { label: "Contact", url: "/contact" },
];

const MOBILE_NAV = [
  { label: "Home", url: "/" },
  { label: "Shop All", url: "/shop" },
  { label: "Kufis", url: "/shop?category=kufis" },
  { label: "Imamas", url: "/shop?category=imamas" },
  { label: "Attars", url: "/shop?category=attars" },
  { label: "Fragrances", url: "/shop?category=fragrances" },
  { label: "Our Story", url: "/about" },
  { label: "Contact", url: "/contact" },
];

export default function Header({
  logo = "/logo/logo.png",
  announcement = {
    enabled: true,
    text: "Premium Islamic Accessories \u2022 Nationwide Delivery \u2022",
    linkText: "Shop Now",
    linkUrl: "/shop",
  },
  whatsappNumber = "923707107422",
}: {
  logo?: string;
  announcement?: {
    enabled: boolean;
    text: string;
    linkText: string;
    linkUrl: string;
  };
  whatsappNumber?: string;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(getCartCount());

    const interval = setInterval(() => {
      setCartCount(getCartCount());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  function closeMobileNav() {
    setMobileOpen(false);
  }

  function isActive(url: string) {
    if (url === "/") return pathname === "/";
    const basePath = url.split("?")[0];
    return pathname === basePath || pathname.startsWith(basePath + "/");
  }

  return (
    <>
      {announcement.enabled && (
        <div className="announcement">
          {announcement.text}{" "}
          <Link href={announcement.linkUrl}>{announcement.linkText}</Link>
        </div>
      )}

      <header className="header">
        <div className="container header__inner">
          <Link href="/" className="header__logo">
            <img
              src={logo}
              alt="MBS Islamic Accessories"
              width={160}
              height={40}
            />
          </Link>

          <nav className="header__nav">
            {DEFAULT_NAV.map((item) => (
              <Link
                key={item.url}
                href={item.url}
                className={isActive(item.url) ? "active" : ""}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="header__actions">
            <Link href="/shop" className="header__action" aria-label="Search">
              <svg viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </Link>
            <Link href="/cart" className="header__action" aria-label="Cart">
              <svg viewBox="0 0 24 24">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              <span
                className={`header__cart-count${cartCount > 0 ? " visible" : ""}`}
              >
                {cartCount}
              </span>
            </Link>
            <button
              className={`hamburger${mobileOpen ? " active" : ""}`}
              aria-label="Menu"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-nav${mobileOpen ? " open" : ""}`}>
        <ul className="mobile-nav__list">
          {MOBILE_NAV.map((item) => (
            <li key={item.url}>
              <Link href={item.url} onClick={closeMobileNav}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mobile-nav__footer">
          <Link href="/cart" onClick={closeMobileNav}>
            View Cart
          </Link>
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener"
          >
            WhatsApp Us
          </a>
        </div>
      </div>

      <a
        href={`https://wa.me/${whatsappNumber}?text=Hi%20MBS%20Accessories!`}
        target="_blank"
        rel="noopener"
        className="whatsapp-float"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </>
  );
}
