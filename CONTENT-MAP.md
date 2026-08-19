# MBS Islamic Accessories — CMS Content Map

## ADMIN FIELD → DATABASE FIELD → FRONTEND ELEMENT

This document maps every editable admin field to its storage path and the frontend DOM element it controls.

---

## SITE SETTINGS

| Admin Field | Storage Path | Frontend Element |
|---|---|---|
| Site Name | `site.name` | Document title (SEO) |
| Site Tagline | `site.tagline` | `.footer__bottom span:last-child` |
| Logo | `site.logo` | `.header__logo img`, `.footer__brand img` |
| Announcement Text | `site.announcement.text` | `.announcement` innerHTML |
| Announcement Link Text | `site.announcement.linkText` | `.announcement a` text |
| Announcement Link URL | `site.announcement.linkUrl` | `.announcement a` href |
| Announcement Enabled | `site.announcement.enabled` | `.announcement` display |
| WhatsApp Number | `site.whatsappNumber` | All `a[href*="wa.me"]` href |
| Contact Phone | `site.contactPhone` | Contact page display |
| Email | `site.email` | Contact page display |
| Address | `site.address` | Contact page display |
| Business Hours | `site.businessHours` | Contact page display |

---

## SOCIAL LINKS

| Admin Field | Storage Path | Frontend Element |
|---|---|---|
| Instagram URL | `social.instagram` | `.footer__social a[aria-label="Instagram"]` href, social section links |
| Facebook URL | `social.facebook` | `.footer__social a[aria-label="Facebook"]` href, social section links |
| WhatsApp URL | `social.whatsapp` | `.footer__social a[aria-label="WhatsApp"]` href |
| YouTube URL | `social.youtube` | Social links display |
| TikTok URL | `social.tiktok` | Social links display |

---

## NAVIGATION

| Admin Field | Storage Path | Frontend Element |
|---|---|---|
| Nav Label | `navigation[].label` | `.header__nav a` text, `.mobile-nav__list li a` text |
| Nav URL | `navigation[].url` | `.header__nav a` href, `.mobile-nav__list li a` href |
| Nav Enabled | `navigation[].enabled` | Controls whether link appears in nav |
| Nav Order | `navigation[].order` | Position in `.header__nav` and `.mobile-nav__list` |

---

## HOMEPAGE — HERO SECTION

| Admin Field | Storage Path | Frontend Element |
|---|---|---|
| Eyebrow | `homepage.hero.eyebrow` | `.hero__eyebrow` textContent |
| Heading | `homepage.hero.heading` | `.hero__title` innerHTML |
| Description | `homepage.hero.description` | `.hero__text` textContent |
| Primary Button Text | `homepage.hero.primaryButtonText` | `.hero__buttons .btn--primary` textContent |
| Primary Button URL | `homepage.hero.primaryButtonUrl` | `.hero__buttons .btn--primary` href |
| Secondary Button Text | `homepage.hero.secondaryButtonText` | `.hero__buttons .btn--outline` textContent |
| Secondary Button URL | `homepage.hero.secondaryButtonUrl` | `.hero__buttons .btn--outline` href |
| Hero Image | `homepage.hero.image` | `.hero__image img` src |
| Mobile Hero Image | `homepage.hero.mobileImage` | `.hero__image img` src (mobile) |
| Overlay Opacity | `homepage.hero.overlay` | Hero overlay opacity |
| Enabled | `homepage.hero.enabled` | `.hero` section display |

---

## HOMEPAGE — CATEGORIES SECTION

| Admin Field | Storage Path | Frontend Element |
|---|---|---|
| Section Eyebrow | `homepage.categories.eyebrow` | `.section .eyebrow` text |
| Section Heading | `homepage.categories.heading` | `.section .heading-lg` text |
| Section Enabled | `homepage.categories.enabled` | Section display |
| Category Name | `homepage.categories.items[].name` | `.category-card__name` text |
| Category Description | `homepage.categories.items[].description` | `.category-card__desc` text |
| Category Image | `homepage.categories.items[].image` | `.category-card img` src |
| Category URL | `homepage.categories.items[].url` | `.category-card` href |
| Category Enabled | `homepage.categories.items[].enabled` | Card visibility |

---

## HOMEPAGE — FEATURED COLLECTION

| Admin Field | Storage Path | Frontend Element |
|---|---|---|
| Eyebrow | `homepage.featured.eyebrow` | `.section--cream .eyebrow` text |
| Heading | `homepage.featured.heading` | `.section--cream .heading-lg` text |
| Description | `homepage.featured.description` | `.section--cream .body-md` text |
| Button Text | `homepage.featured.buttonText` | `.section--cream .btn--outline` text |
| Button URL | `homepage.featured.buttonUrl` | `.section--cream .btn--outline` href |
| Enabled | `homepage.featured.enabled` | Section display |

---

## HOMEPAGE — EDITORIAL BANNER

| Admin Field | Storage Path | Frontend Element |
|---|---|---|
| Eyebrow | `homepage.editorial.eyebrow` | `.editorial .eyebrow` text |
| Heading | `homepage.editorial.heading` | `.editorial h2` innerHTML |
| Description | `homepage.editorial.description` | `.editorial .body-lg` text |
| Button Text | `homepage.editorial.buttonText` | `.editorial .btn--ghost` text |
| Button URL | `homepage.editorial.buttonUrl` | `.editorial .btn--ghost` href |
| Background Image | `homepage.editorial.image` | `.editorial__bg img` src |
| Enabled | `homepage.editorial.enabled` | Section display |

---

## HOMEPAGE — BRAND STORY

| Admin Field | Storage Path | Frontend Element |
|---|---|---|
| Eyebrow | `homepage.brandStory.eyebrow` | `.story__content .eyebrow` text |
| Heading | `homepage.brandStory.heading` | `.story__content .heading-lg` innerHTML |
| Text Paragraph 1 | `homepage.brandStory.text` | `.story__content .body-lg` (1st) text |
| Text Paragraph 2 | `homepage.brandStory.text2` | `.story__content .body-lg` (2nd) text |
| Button Text | `homepage.brandStory.buttonText` | `.story__content .btn--outline` text |
| Button URL | `homepage.brandStory.buttonUrl` | `.story__content .btn--outline` href |
| Image | `homepage.brandStory.image` | `.story__image img` src |
| Enabled | `homepage.brandStory.enabled` | Section display |

---

## HOMEPAGE — WHY MBS (TRUST BLOCKS)

| Admin Field | Storage Path | Frontend Element |
|---|---|---|
| Section Eyebrow | `homepage.whyMbs.eyebrow` | `.trust__grid` parent `.eyebrow` text |
| Section Heading | `homepage.whyMbs.heading` | `.trust__grid` parent `.heading-lg` text |
| Block Title | `homepage.whyMbs.blocks[].title` | `.trust-block__title` text |
| Block Text | `homepage.whyMbs.blocks[].text` | `.trust-block__text` text |
| Block Icon | `homepage.whyMbs.blocks[].icon` | `.trust-block__icon` SVG |
| Block Enabled | `homepage.whyMbs.blocks[].enabled` | Block visibility |
| Section Enabled | `homepage.whyMbs.enabled` | Section display |

---

## HOMEPAGE — SIGNATURE COLLECTION

| Admin Field | Storage Path | Frontend Element |
|---|---|---|
| Eyebrow | `homepage.signature.eyebrow` | Section `.eyebrow` text |
| Heading | `homepage.signature.heading` | Section `.heading-lg` text |
| Button Text | `homepage.signature.buttonText` | Section `.btn--outline` text |
| Button URL | `homepage.signature.buttonUrl` | Section `.btn--outline` href |
| Enabled | `homepage.signature.enabled` | Section display |

---

## HOMEPAGE — SOCIAL SECTION

| Admin Field | Storage Path | Frontend Element |
|---|---|---|
| Eyebrow | `homepage.social.eyebrow` | `.social__grid` parent `.eyebrow` text |
| Heading | `homepage.social.heading` | `.social__grid` parent `.heading-lg` text |
| Enabled | `homepage.social.enabled` | Section display |

---

## HOMEPAGE — WHATSAPP CTA

| Admin Field | Storage Path | Frontend Element |
|---|---|---|
| Eyebrow | `homepage.whatsappCta.eyebrow` | `.whatsapp-cta .eyebrow` text |
| Heading | `homepage.whatsappCta.heading` | `.whatsapp-cta .heading-md` text |
| Description | `homepage.whatsappCta.description` | `.whatsapp-cta .body-lg` text |
| Button Text | `homepage.whatsappCta.buttonText` | `.whatsapp-cta .btn--gold` text |
| Enabled | `homepage.whatsappCta.enabled` | Section display |

---

## FOOTER

| Admin Field | Storage Path | Frontend Element |
|---|---|---|
| Description | `footer.description` | `.footer__brand p` text |
| Copyright | `footer.copyright` | `.footer__bottom span:first-child` text |
| Shop Links | `footer.shopLinks[]` | `.footer__grid > div:nth-child(2) .footer__links` |
| Company Links | `footer.companyLinks[]` | `.footer__grid > div:nth-child(3) .footer__links` |
| Support Links | `footer.supportLinks[]` | `.footer__grid > div:nth-child(4) .footer__links` |

---

## PRODUCTS

| Admin Field | Storage Path | Frontend Element |
|---|---|---|
| Product Name | `products[].name` | `.product-card__name` text |
| Product Slug | `products[].slug` | URL parameter `?id=` |
| Category | `products[].category` | `.product-card__category` text, filter |
| Description | `products[].description` | Product detail page |
| Price | `products[].price` | `.product-card__price-current` text |
| Sale Price | `products[].salePrice` | Strikethrough price |
| Badge | `products[].badge` | `.product-card__badge` text |
| Image | `products[].image` | `.product-card__image img` src |
| Gallery | `products[].images[]` | Product detail gallery |
| Featured | `products[].featured` | Appears in featured/signature sections |
| Best Seller | `products[].bestSeller` | Best seller badge |
| Status | `products[].status` | Active/Draft visibility |
| Variants | `products[].variants[]` | Product detail variant selector |
| SKU | `products[].sku` | Admin only |
| Stock | `products[].stock` | Admin only |

---

## CATEGORIES

| Admin Field | Storage Path | Frontend Element |
|---|---|---|
| Name | `categories[].name` | Category card title, filter button |
| Slug | `categories[].slug` | URL parameter `?category=` |
| Description | `categories[].description` | Category card description |
| Image | `categories[].image` | Category card image |
| Hero Image | `categories[].heroImage` | Category hero banner |
| Display Order | `categories[].displayOrder` | Grid position |
| Featured | `categories[].featured` | Featured badge |
| Enabled | `categories[].enabled` | Category visibility |

---

## DESIGN SETTINGS

| Admin Field | Storage Path | Frontend Element |
|---|---|---|
| Primary Color | `design.primaryColor` | CSS variable `--color-gold` |
| Secondary Color | `design.secondaryColor` | CSS variable `--color-dark` |
| Background Color | `design.backgroundColor` | CSS variable `--color-bg` |
| Text Color | `design.textColor` | CSS variable `--color-text` |
| Accent Color | `design.accentColor` | CSS variable `--color-gold-light` |

---

## SEO (PER PAGE)

| Admin Field | Storage Path | Frontend Element |
|---|---|---|
| Page Title | `seo.{page}.title` | `<title>` tag |
| Meta Description | `seo.{page}.description` | `<meta name="description">` |
| Meta Keywords | `seo.{page}.keywords` | `<meta name="keywords">` |
| OG Image | `seo.{page}.ogImage` | `<meta property="og:image">` |

Pages: `home`, `shop`, `about`, `contact`

---

## MEDIA LIBRARY

| Admin Field | Storage Path | Frontend Element |
|---|---|---|
| Media Item | `media[]` | Used by admin for image selection |
| File URL | `media[].url` | Referenced by products, categories, etc. |
| File Name | `media[].name` | Display in media grid |
| Category | `media[].category` | Filter (Products, Banners, etc.) |
| Created At | `media[].createdAt` | Sort by date |

---

## ORDERS (Future)

| Admin Field | Storage Path | Frontend Element |
|---|---|---|
| Order ID | `orders[].id` | Admin order list |
| Customer | `orders[].customer` | Admin order detail |
| Items | `orders[].items[]` | Admin order detail |
| Total | `orders[].total` | Admin order list |
| Status | `orders[].status` | Admin order status |

---

## DATA FLOW

```
Admin Dashboard (admin/index.html)
        ↓
    MBSCMS.set(path, value)
        ↓
    localStorage (mbs_cms_content)
        ↓
    MBSCMS.getAll() / MBSCMS.get(path)
        ↓
Frontend (index.html, shop.html, etc.)
        ↓
    MBSLoader.apply()
        ↓
    DOM updates (text, images, links, visibility)
```

---

## STORAGE

- **Current**: localStorage (browser-only, per-device)
- **Future**: Database (PostgreSQL/MongoDB via API routes in Next.js)
- **Migration**: Replace `MBSCMS.save()` with API calls to database

---

## NEXT.JS MIGRATION PATH

1. Content store becomes API routes (`/api/content`)
2. localStorage calls become `fetch()` calls
3. Frontend loader becomes React hooks/context
4. Admin becomes Next.js admin pages with server actions
5. Products/categories become database tables
6. Images move to cloud storage (Cloudinary/S3)
