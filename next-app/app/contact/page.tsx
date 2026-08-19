import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollAnimations from "@/components/ScrollAnimations";

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  );
}

const faqItems = [
  {
    question: "How do I place an order?",
    answer:
      "The easiest way to order is through WhatsApp. Simply message us with the product name and quantity, and we will guide you through the process.",
  },
  {
    question: "Do you deliver across Pakistan?",
    answer:
      "Yes, we deliver nationwide. Delivery charges and timelines will be shared when you place your order.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept bank transfers, JazzCash, EasyPaisa and cash on delivery. Details will be provided when you place your order.",
  },
  {
    question: "Can I return a product?",
    answer:
      "If you receive a damaged or incorrect product, please contact us within 24 hours and we will arrange a replacement.",
  },
  {
    question: "Do you offer wholesale?",
    answer:
      "Please contact us via WhatsApp to discuss wholesale or bulk order opportunities.",
  },
];

export default function ContactPage() {
  return (
    <>
      <Header />
      <ScrollAnimations />

      <section className="page-hero">
        <div className="container">
          <div className="eyebrow">GET IN TOUCH</div>
          <h1 className="heading-lg">Contact Us</h1>
          <p className="body-md" style={{ marginTop: 8 }}>
            We are here to help. Reach out to us through any of these channels.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="story__grid" style={{ gap: 60 }}>
            <div className="fade-in-left">
              <div className="eyebrow">WHATSAPP</div>
              <h2
                className="heading-md"
                style={{ marginTop: 12, marginBottom: 16 }}
              >
                Chat With Us
              </h2>
              <p className="body-lg" style={{ marginBottom: 24 }}>
                The fastest way to reach us is through WhatsApp. Whether you have
                a question about a product, need help with an order, or just want
                to say hello — we are happy to help.
              </p>
              <a
                href="https://wa.me/923707107422?text=Hi%20MBS%20Accessories!"
                target="_blank"
                rel="noopener"
                className="btn btn--gold"
                style={{ marginBottom: 16 }}
              >
                <WhatsAppIcon />
                Chat on WhatsApp
              </a>
              <p className="body-sm">+92 370 7107422</p>
            </div>

            <div className="fade-in-right">
              <div className="eyebrow">FOLLOW US</div>
              <h2
                className="heading-md"
                style={{ marginTop: 12, marginBottom: 16 }}
              >
                Social Media
              </h2>
              <p className="body-lg" style={{ marginBottom: 24 }}>
                Follow us on Instagram and Facebook for the latest collections,
                new arrivals and behind-the-scenes content. Join the MBS
                community.
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                <a
                  href="https://www.instagram.com/mbs_fragrance_faith_coll/"
                  target="_blank"
                  rel="noopener"
                  className="btn btn--outline"
                  style={{ justifyContent: "flex-start", gap: 12 }}
                >
                  <InstagramIcon />
                  Instagram — @mbs_fragrance_faith_coll
                </a>
                <a
                  href="https://www.facebook.com/people/MBS-Fragrance-Faith-Collection/61593374121780/"
                  target="_blank"
                  rel="noopener"
                  className="btn btn--outline"
                  style={{ justifyContent: "flex-start", gap: 12 }}
                >
                  <FacebookIcon />
                  Facebook — MBS Fragrance &amp; Faith Collection
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container container--narrow">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="eyebrow fade-in">FAQ</div>
            <h2
              className="heading-lg fade-in"
              style={{ marginTop: 8 }}
            >
              Common Questions
            </h2>
          </div>
          <div className="fade-in">
            {faqItems.map((item, i) => (
              <div
                key={i}
                style={{
                  padding: "24px 0",
                  borderBottom:
                    i < faqItems.length - 1
                      ? "1px solid var(--border)"
                      : "none",
                }}
              >
                <h3 className="heading-xs">{item.question}</h3>
                <p className="body-md" style={{ marginTop: 8 }}>
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
