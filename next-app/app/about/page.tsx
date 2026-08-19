import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollAnimations from "@/components/ScrollAnimations";

export default function AboutPage() {
  return (
    <>
      <Header />
      <ScrollAnimations />

      <section className="page-hero">
        <div className="container">
          <div className="eyebrow">OUR STORY</div>
          <h1 className="heading-lg">Rooted in Tradition</h1>
          <p className="body-md" style={{ marginTop: 8 }}>
            The story of MBS Fragrance &amp; Faith Collection.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="story__grid">
            <div className="story__image fade-in-left">
              <img
                src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=700&q=80"
                alt="MBS craftsmanship"
                width={700}
                height={875}
                loading="lazy"
              />
            </div>
            <div className="story__content fade-in-right">
              <h2 className="heading-lg">How It All Began</h2>
              <div className="gold-divider"></div>
              <p className="body-lg">
                MBS Islamic Accessories was born from a deep appreciation for
                traditional Islamic craftsmanship. What started as a passion for
                collecting premium Kufis, Imamas and Attars grew into a mission
                — to make these beautiful pieces accessible to everyone who
                values heritage and elegance.
              </p>
              <p className="body-lg">
                Our name, MBS Fragrance &amp; Faith Collection, reflects our
                dual commitment: to the art of fine fragrances and to the
                faithful traditions that inspire our work. Every product we offer
                is carefully selected, ensuring it meets our standards of
                quality, authenticity and beauty.
              </p>
              <p className="body-lg">
                We believe that the accessories we choose reflect who we are.
                From the kufi you wear to the attar you apply, each choice is a
                statement of identity and devotion. MBS is here to help you make
                that statement with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--cream">
        <div
          className="container container--narrow"
          style={{ textAlign: "center" }}
        >
          <div className="eyebrow fade-in">OUR MISSION</div>
          <h2
            className="heading-lg fade-in"
            style={{ marginTop: 12 }}
          >
            Faith, Craft &amp; Community
          </h2>
          <div className="gold-divider gold-divider--center fade-in"></div>
          <p
            className="body-lg fade-in"
            style={{ maxWidth: 700, margin: "0 auto" }}
          >
            Our mission is simple: to offer a curated collection of premium
            Islamic accessories and fragrances that honour tradition while
            meeting the refined tastes of today. We want every customer to feel
            the care and quality behind each piece.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="trust__grid stagger-children">
            <div className="trust-block">
              <div className="trust-block__icon">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <div className="trust-block__title">Quality First</div>
              <p className="trust-block__text">
                Every product is handpicked and quality-checked before it reaches
                you.
              </p>
            </div>
            <div className="trust-block">
              <div className="trust-block__icon">
                <svg viewBox="0 0 24 24">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div className="trust-block__title">Authenticity</div>
              <p className="trust-block__text">
                We source genuine products that stay true to their cultural and
                spiritual roots.
              </p>
            </div>
            <div className="trust-block">
              <div className="trust-block__icon">
                <svg viewBox="0 0 24 24">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 00-3-3.87" />
                  <path d="M16 3.13a4 4 0 010 7.75" />
                </svg>
              </div>
              <div className="trust-block__title">Community</div>
              <p className="trust-block__text">
                Building connections through shared values of faith, craft and
                elegance.
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
              <div className="trust-block__title">Pakistan-Wide</div>
              <p className="trust-block__text">
                Delivering across Pakistan with care and convenience.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="whatsapp-cta fade-in">
        <div className="container">
          <div className="eyebrow">GET IN TOUCH</div>
          <h2 className="heading-md" style={{ marginTop: 12 }}>
            Want to know more?
          </h2>
          <p className="body-lg">
            We would love to hear from you. Reach out via WhatsApp or visit our
            social pages.
          </p>
          <div
            style={{
              display: "flex",
              gap: 16,
              justifyContent: "center",
              flexWrap: "wrap",
              marginTop: 8,
            }}
          >
            <a
              href="https://wa.me/923707107422?text=Hi%20MBS%20Accessories!"
              target="_blank"
              rel="noopener"
              className="btn btn--gold"
            >
              Chat on WhatsApp
            </a>
            <Link href="/contact" className="btn btn--outline">
              Contact Page
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
