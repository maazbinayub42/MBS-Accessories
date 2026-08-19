import Link from "next/link";

const DEFAULT_SHOP_LINKS = [
  { label: "All Products", url: "/shop" },
  { label: "Kufis", url: "/shop?category=kufis" },
  { label: "Imamas", url: "/shop?category=imamas" },
  { label: "Attars", url: "/shop?category=attars" },
  { label: "Fragrances", url: "/shop?category=fragrances" },
];

const DEFAULT_COMPANY_LINKS = [
  { label: "Our Story", url: "/about" },
  { label: "Contact", url: "/contact" },
  { label: "WhatsApp Us", url: "https://wa.me/923707107422", external: true },
];

const DEFAULT_SUPPORT_LINKS = [
  { label: "Get in Touch", url: "/contact" },
  { label: "Order via WhatsApp", url: "https://wa.me/923707107422", external: true },
  { label: "View Cart", url: "/cart" },
];

export default function Footer({
  logo = "/logo/logo.png",
  description = "Premium Islamic accessories and fragrances, curated with care and devotion. MBS Fragrance & Faith Collection.",
  copyright = "\u00A9 2026 MBS Islamic Accessories. All rights reserved.",
  tagline = "MBS Fragrance & Faith Collection",
  shopLinks = DEFAULT_SHOP_LINKS,
  companyLinks = DEFAULT_COMPANY_LINKS,
  supportLinks = DEFAULT_SUPPORT_LINKS,
}: {
  logo?: string;
  description?: string;
  copyright?: string;
  tagline?: string;
  shopLinks?: { label: string; url: string; external?: boolean }[];
  companyLinks?: { label: string; url: string; external?: boolean }[];
  supportLinks?: { label: string; url: string; external?: boolean }[];
}) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <img
              src={logo}
              alt="MBS Islamic Accessories"
              width={160}
              height={40}
            />
            <p>{description}</p>
            <div className="footer__social">
              <a
                href="https://www.instagram.com/mbs_fragrance_faith_coll/"
                target="_blank"
                rel="noopener"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/people/MBS-Fragrance-Faith-Collection/61593374121780/"
                target="_blank"
                rel="noopener"
                aria-label="Facebook"
              >
                <svg viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a
                href="https://wa.me/923707107422"
                target="_blank"
                rel="noopener"
                aria-label="WhatsApp"
              >
                <svg viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="footer__heading">Shop</h4>
            <div className="footer__links">
              {shopLinks.map((link) => (
                <Link key={link.url} href={link.url}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="footer__heading">Company</h4>
            <div className="footer__links">
              {companyLinks.map((link) =>
                link.external ? (
                  <a key={link.url} href={link.url} target="_blank" rel="noopener">
                    {link.label}
                  </a>
                ) : (
                  <Link key={link.url} href={link.url}>
                    {link.label}
                  </Link>
                )
              )}
            </div>
          </div>

          <div>
            <h4 className="footer__heading">Support</h4>
            <div className="footer__links">
              {supportLinks.map((link) =>
                link.external ? (
                  <a key={link.url} href={link.url} target="_blank" rel="noopener">
                    {link.label}
                  </a>
                ) : (
                  <Link key={link.url} href={link.url}>
                    {link.label}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span>{copyright}</span>
          <span>{tagline}</span>
        </div>
      </div>
    </footer>
  );
}
