import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";
import ScrollAnimations from "@/components/ScrollAnimations";
import { MBS_PRODUCTS, MBS_CATEGORIES } from "@/lib/products-data";

const featuredProducts = MBS_PRODUCTS.filter((p) => p.featured).slice(0, 4);
const signatureProducts = [...featuredProducts].reverse();

export default function HomePage() {
  return (
    <>
      <Header />

      <ScrollAnimations />

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero__grid">
            <div className="hero__content fade-in-left">
              <div className="eyebrow hero__eyebrow">THE ART OF TRADITION</div>
              <h1 className="heading-xl hero__title">
                Tradition,<br />
                refined.
              </h1>
              <p className="body-lg hero__text">
                Discover a carefully curated collection of premium Kufis,
                Imamas, Attars and Fragrances — crafted for those who value
                heritage and elegance.
              </p>
              <div className="hero__buttons">
                <a href="/shop" className="btn btn--primary">
                  Explore Collection
                </a>
                <a href="/shop?category=attars" className="btn btn--outline">
                  Discover Attars
                </a>
              </div>
            </div>
            <div className="hero__image fade-in-right">
              <img
                src="https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&q=80"
                alt="Premium MBS Islamic Accessories collection"
                width={800}
                height={600}
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="section">
        <div className="container">
          <div className="products__header fade-in">
            <div>
              <div className="eyebrow">COLLECTIONS</div>
              <h2 className="heading-lg">Shop by Category</h2>
            </div>
          </div>
          <div className="categories__grid stagger-children">
            {MBS_CATEGORIES.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="section section--cream">
        <div className="container">
          <div className="products__header fade-in">
            <div>
              <div className="eyebrow">CURATED FOR YOU</div>
              <h2 className="heading-lg">Selected for You</h2>
              <p
                className="body-md"
                style={{ marginTop: 8 }}
              >
                A refined selection from the MBS Islamic Accessories collection.
              </p>
            </div>
            <a href="/shop" className="btn btn--outline btn--sm">
              View All
            </a>
          </div>
          <div className="product-grid stagger-children">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Banner — Attars */}
      <section className="editorial fade-in">
        <div className="editorial__bg">
          <img
            src="https://images.unsplash.com/photo-1595536500871-f03f0beb2c50?w=1400&q=80"
            alt="Attar collection"
            width={1400}
            height={500}
            loading="lazy"
          />
        </div>
        <div className="editorial__content">
          <div className="eyebrow">THE ATTAR COLLECTION</div>
          <h2>
            Fragrance that<br />
            carries character.
          </h2>
          <p className="body-lg">
            Discover our handpicked selection of traditional attars — each one a
            story of heritage and devotion.
          </p>
          <a href="/shop?category=attars" className="btn btn--ghost">
            Explore Attars
          </a>
        </div>
      </section>

      {/* Brand Story */}
      <section className="section">
        <div className="container">
          <div className="story__grid">
            <div className="story__image fade-in-left">
              <img
                src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=700&q=80"
                alt="MBS Islamic Accessories craftsmanship"
                width={700}
                height={875}
                loading="lazy"
              />
            </div>
            <div className="story__content fade-in-right">
              <div className="eyebrow">OUR STORY</div>
              <h2
                className="heading-lg"
                style={{ marginTop: 12 }}
              >
                Rooted in tradition.<br />
                Made for today.
              </h2>
              <div className="gold-divider"></div>
              <p className="body-lg">
                MBS Islamic Accessories was born from a love for traditional
                Islamic craftsmanship and a desire to make it accessible to the
                modern world. From premium Kufis and Imamas to exquisite Attars
                and Fragrances, every piece in our collection is selected with
                care and devotion.
              </p>
              <p className="body-lg">
                We believe that faith and beauty go hand in hand. Our mission is
                to offer accessories that honour tradition while meeting the
                refined tastes of today.
              </p>
              <a
                href="/about"
                className="btn btn--outline"
                style={{ marginTop: 20 }}
              >
                Read More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why MBS */}
      <section className="section section--cream">
        <div className="container">
          <div
            className="products__header fade-in"
            style={{
              justifyContent: "center",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className="eyebrow">WHY MBS</div>
            <h2
              className="heading-lg"
              style={{ marginTop: 8 }}
            >
              A Brand You Can Trust
            </h2>
          </div>
          <div className="trust__grid stagger-children">
            <div className="trust-block">
              <div className="trust-block__icon">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <div className="trust-block__title">Premium Quality</div>
              <p className="trust-block__text">
                Carefully selected products that meet our standards of quality
                and craftsmanship.
              </p>
            </div>
            <div className="trust-block">
              <div className="trust-block__icon">
                <svg viewBox="0 0 24 24">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div className="trust-block__title">Authentic Collection</div>
              <p className="trust-block__text">
                A refined selection of genuine Islamic accessories and
                traditional fragrances.
              </p>
            </div>
            <div className="trust-block">
              <div className="trust-block__icon">
                <svg viewBox="0 0 24 24">
                  <rect x="1" y="3" width="15" height="13" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              </div>
              <div className="trust-block__title">Nationwide Delivery</div>
              <p className="trust-block__text">
                Convenient delivery across Pakistan. We bring MBS to your
                doorstep.
              </p>
            </div>
            <div className="trust-block">
              <div className="trust-block__icon">
                <svg viewBox="0 0 24 24">
                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                </svg>
              </div>
              <div className="trust-block__title">Easy Ordering</div>
              <p className="trust-block__text">
                Order easily through WhatsApp. Quick responses and personalised
                service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Collection */}
      <section className="section">
        <div className="container">
          <div className="products__header fade-in">
            <div>
              <div className="eyebrow">SIGNATURE PIECES</div>
              <h2 className="heading-lg">Signature Collection</h2>
            </div>
            <a href="/shop" className="btn btn--outline btn--sm">
              View All
            </a>
          </div>
          <div className="product-grid stagger-children">
            {signatureProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="section section--cream">
        <div className="container">
          <div
            className="products__header fade-in"
            style={{
              justifyContent: "center",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className="eyebrow">CONNECT WITH US</div>
            <h2
              className="heading-lg"
              style={{ marginTop: 8 }}
            >
              Follow the MBS Journey
            </h2>
          </div>
          <div className="social__grid fade-in">
            <a
              href="https://www.instagram.com/mbs_fragrance_faith_coll/"
              target="_blank"
              rel="noopener"
              className="social__tile"
            >
              <img
                src="https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&q=80"
                alt="MBS on Instagram"
                width={400}
                height={400}
                loading="lazy"
              />
              <div className="social__tile__overlay">
                <svg viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </div>
            </a>
            <a
              href="https://www.facebook.com/people/MBS-Fragrance-Faith-Collection/61593374121780/"
              target="_blank"
              rel="noopener"
              className="social__tile"
            >
              <img
                src="https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&q=80"
                alt="MBS on Facebook"
                width={400}
                height={400}
                loading="lazy"
              />
              <div className="social__tile__overlay">
                <svg viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </div>
            </a>
            <a
              href="https://www.instagram.com/mbs_fragrance_faith_coll/"
              target="_blank"
              rel="noopener"
              className="social__tile"
            >
              <img
                src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&q=80"
                alt="MBS craftsmanship"
                width={400}
                height={400}
                loading="lazy"
              />
              <div className="social__tile__overlay">
                <svg viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </div>
            </a>
            <a
              href="https://www.facebook.com/people/MBS-Fragrance-Faith-Collection/61593374121780/"
              target="_blank"
              rel="noopener"
              className="social__tile"
            >
              <img
                src="https://images.unsplash.com/photo-1595536500871-f03f0beb2c50?w=400&q=80"
                alt="MBS fragrances"
                width={400}
                height={400}
                loading="lazy"
              />
              <div className="social__tile__overlay">
                <svg viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="whatsapp-cta fade-in">
        <div className="container">
          <div className="eyebrow">GET IN TOUCH</div>
          <h2
            className="heading-md"
            style={{ marginTop: 12 }}
          >
            Need help choosing?
          </h2>
          <p className="body-lg">
            Connect with MBS Islamic Accessories directly. We are happy to help
            you find the perfect piece.
          </p>
          <a
            href="https://wa.me/923707107422?text=Hi%20MBS%20Accessories!%20I%27d%20like%20to%20know%20more."
            target="_blank"
            rel="noopener"
            className="btn btn--gold"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chat on WhatsApp
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
