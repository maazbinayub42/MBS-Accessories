const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...\n");

  // ─── Categories ────────────────────────────
  console.log("Creating categories...");
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: "kufis" },
      update: {},
      create: {
        id: "kufis",
        name: "Kufis",
        slug: "kufis",
        description: "Handcrafted traditional headwear",
        image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&q=80",
        heroImage: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&q=80",
        bannerImage: "",
        displayOrder: 1,
        featured: true,
        enabled: true,
      },
    }),
    prisma.category.upsert({
      where: { slug: "imamas" },
      update: {},
      create: {
        id: "imamas",
        name: "Imamas",
        slug: "imamas",
        description: "Elegant prayer caps",
        image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=600&q=80",
        heroImage: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=800&q=80",
        bannerImage: "",
        displayOrder: 2,
        featured: true,
        enabled: true,
      },
    }),
    prisma.category.upsert({
      where: { slug: "attars" },
      update: {},
      create: {
        id: "attars",
        name: "Attars",
        slug: "attars",
        description: "Traditional oil-based perfumes",
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&q=80",
        heroImage: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80",
        bannerImage: "",
        displayOrder: 3,
        featured: true,
        enabled: true,
      },
    }),
    prisma.category.upsert({
      where: { slug: "fragrances" },
      update: {},
      create: {
        id: "fragrances",
        name: "Fragrances",
        slug: "fragrances",
        description: "Refined scents for every occasion",
        image: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=600&q=80",
        heroImage: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=800&q=80",
        bannerImage: "",
        displayOrder: 4,
        featured: true,
        enabled: true,
      },
    }),
  ]);
  console.log(`  Created ${categories.length} categories`);

  // ─── Products ──────────────────────────────
  console.log("Creating products...");
  const productsData = [
    {
      id: "kufi-classic-01",
      name: "Classic Embroidered Kufi",
      slug: "classic-embroidered-kufi",
      categoryId: "kufis",
      description: "A timeless classic embroidered kufi, handcrafted with precision. Made from premium cotton with intricate thread work, perfect for daily wear and special occasions.",
      shortDescription: "Handcrafted premium cotton kufi with intricate thread work.",
      price: 1200,
      originalPrice: null,
      sku: "KUF-CE-01",
      stock: 50,
      status: "active",
      featured: true,
      bestSeller: true,
      badge: null,
      image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&q=80",
      displayOrder: 1,
      images: [
        "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&q=80",
        "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&q=80",
        "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&q=80",
      ],
      variants: [
        { name: "Size", value: "Small", price: 1200, stock: 10, status: "active", displayOrder: 1 },
        { name: "Size", value: "Medium", price: 1200, stock: 15, status: "active", displayOrder: 2 },
        { name: "Size", value: "Large", price: 1200, stock: 15, status: "active", displayOrder: 3 },
        { name: "Size", value: "XL", price: 1200, stock: 10, status: "active", displayOrder: 4 },
      ],
    },
    {
      id: "kufi-royal-02",
      name: "Royal Maroon Kufi",
      slug: "royal-maroon-kufi",
      categoryId: "kufis",
      description: "A regal maroon kufi with gold thread accents. Designed for those who appreciate the finer details in traditional headwear.",
      shortDescription: "Regal maroon kufi with gold thread accents.",
      price: 1500,
      originalPrice: 1800,
      sku: "KUF-RM-02",
      stock: 30,
      status: "active",
      featured: true,
      bestSeller: true,
      badge: "Sale",
      image: "https://images.unsplash.com/photo-1621768216002-5ac171876525?w=600&q=80",
      displayOrder: 2,
      images: [
        "https://images.unsplash.com/photo-1621768216002-5ac171876525?w=800&q=80",
        "https://images.unsplash.com/photo-1621768216002-5ac171876525?w=600&q=80",
      ],
      variants: [
        { name: "Size", value: "Medium", price: 1500, stock: 10, status: "active", displayOrder: 1 },
        { name: "Size", value: "Large", price: 1500, stock: 10, status: "active", displayOrder: 2 },
        { name: "Size", value: "XL", price: 1500, stock: 10, status: "active", displayOrder: 3 },
      ],
    },
    {
      id: "kufi-pakistani-03",
      name: "Pakistani Sindhi Kufi",
      slug: "pakistani-sindhi-kufi",
      categoryId: "kufis",
      description: "Authentic Pakistani Sindhi kufi featuring traditional mirror work and vibrant thread embroidery. Each piece is individually handcrafted.",
      shortDescription: "Authentic Sindhi kufi with mirror work and embroidery.",
      price: 1800,
      originalPrice: null,
      sku: "KUF-PS-03",
      stock: 20,
      status: "active",
      featured: false,
      bestSeller: false,
      badge: "New",
      image: "https://images.unsplash.com/photo-1609849814750-e4ab7b13dbf5?w=600&q=80",
      displayOrder: 3,
      images: [
        "https://images.unsplash.com/photo-1609849814750-e4ab7b13dbf5?w=800&q=80",
        "https://images.unsplash.com/photo-1609849814750-e4ab7b13dbf5?w=600&q=80",
      ],
      variants: [
        { name: "Size", value: "Medium", price: 1800, stock: 10, status: "active", displayOrder: 1 },
        { name: "Size", value: "Large", price: 1800, stock: 10, status: "active", displayOrder: 2 },
      ],
    },
    {
      id: "kufi-embroidered-04",
      name: "Black & Gold Kufi",
      slug: "black-gold-kufi",
      categoryId: "kufis",
      description: "An elegant black kufi with gold embroidered accents. A modern take on a classic design.",
      shortDescription: "Elegant black kufi with gold embroidered accents.",
      price: 1600,
      originalPrice: null,
      sku: "KUF-BG-04",
      stock: 25,
      status: "active",
      featured: false,
      bestSeller: false,
      badge: "New",
      image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&q=80",
      displayOrder: 4,
      images: [
        "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&q=80",
        "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&q=80",
      ],
      variants: [
        { name: "Size", value: "Medium", price: 1600, stock: 8, status: "active", displayOrder: 1 },
        { name: "Size", value: "Large", price: 1600, stock: 9, status: "active", displayOrder: 2 },
        { name: "Size", value: "XL", price: 1600, stock: 8, status: "active", displayOrder: 3 },
      ],
    },
    {
      id: "imama-premium-01",
      name: "Premium Turkish Imama",
      slug: "premium-turkish-imama",
      categoryId: "imamas",
      description: "A premium Turkish-style imama crafted from finest cotton. Features elegant geometric patterns and a structured fit for a distinguished appearance.",
      shortDescription: "Premium Turkish-style imama with geometric patterns.",
      price: 2200,
      originalPrice: null,
      sku: "IMA-PT-01",
      stock: 40,
      status: "active",
      featured: true,
      bestSeller: true,
      badge: "Bestseller",
      image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=600&q=80",
      displayOrder: 5,
      images: [
        "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=800&q=80",
        "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=600&q=80",
      ],
      variants: [
        { name: "Size", value: "Small", price: 2200, stock: 10, status: "active", displayOrder: 1 },
        { name: "Size", value: "Medium", price: 2200, stock: 10, status: "active", displayOrder: 2 },
        { name: "Size", value: "Large", price: 2200, stock: 10, status: "active", displayOrder: 3 },
        { name: "Size", value: "XL", price: 2200, stock: 10, status: "active", displayOrder: 4 },
      ],
    },
    {
      id: "imama-silk-02",
      name: "Silk Blend Imama",
      slug: "silk-blend-imama",
      categoryId: "imamas",
      description: "Luxurious silk blend imama with subtle sheen. Perfect for Jummah prayers and Eid celebrations.",
      shortDescription: "Luxurious silk blend imama with subtle sheen.",
      price: 2800,
      originalPrice: 3200,
      sku: "IMA-SB-02",
      stock: 25,
      status: "active",
      featured: false,
      bestSeller: false,
      badge: "Sale",
      image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=600&q=80",
      displayOrder: 6,
      images: [
        "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=800&q=80",
        "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=600&q=80",
      ],
      variants: [
        { name: "Size", value: "Medium", price: 2800, stock: 8, status: "active", displayOrder: 1 },
        { name: "Size", value: "Large", price: 2800, stock: 9, status: "active", displayOrder: 2 },
        { name: "Size", value: "XL", price: 2800, stock: 8, status: "active", displayOrder: 3 },
      ],
    },
    {
      id: "imama-embroidered-03",
      name: "Embroidered Prayer Imama",
      slug: "embroidered-prayer-imama",
      categoryId: "imamas",
      description: "Beautifully embroidered imama for everyday prayer. Soft cotton construction with detailed needlework.",
      shortDescription: "Beautifully embroidered imama for everyday prayer.",
      price: 1900,
      originalPrice: null,
      sku: "IMA-EP-03",
      stock: 30,
      status: "active",
      featured: false,
      bestSeller: false,
      badge: null,
      image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&q=80",
      displayOrder: 7,
      images: [
        "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&q=80",
        "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&q=80",
      ],
      variants: [
        { name: "Size", value: "Small", price: 1900, stock: 10, status: "active", displayOrder: 1 },
        { name: "Size", value: "Medium", price: 1900, stock: 10, status: "active", displayOrder: 2 },
        { name: "Size", value: "Large", price: 1900, stock: 10, status: "active", displayOrder: 3 },
      ],
    },
    {
      id: "attar-rose-01",
      name: "Rose Oud Attar",
      slug: "rose-oud-attar",
      categoryId: "attars",
      description: "An enchanting blend of Damask rose and premium oud oil. This traditional attar offers a long-lasting, warm and captivating fragrance.",
      shortDescription: "Enchanting blend of Damask rose and premium oud oil.",
      price: 950,
      originalPrice: null,
      sku: "ATT-RO-01",
      stock: 60,
      status: "active",
      featured: true,
      bestSeller: true,
      badge: null,
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&q=80",
      displayOrder: 8,
      images: [
        "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80",
        "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&q=80",
      ],
      variants: [
        { name: "Volume", value: "6ml", price: 950, stock: 30, status: "active", displayOrder: 1 },
        { name: "Volume", value: "12ml", price: 1800, stock: 30, status: "active", displayOrder: 2 },
      ],
    },
    {
      id: "attar-musk-02",
      name: "White Musk Attar",
      slug: "white-musk-attar",
      categoryId: "attars",
      description: "A pure white musk attar with clean, soft and comforting notes. Ideal for daily wear and prayer.",
      shortDescription: "Pure white musk attar with clean, soft notes.",
      price: 1100,
      originalPrice: null,
      sku: "ATT-WM-02",
      stock: 45,
      status: "active",
      featured: true,
      bestSeller: true,
      badge: "Popular",
      image: "https://images.unsplash.com/photo-1595536500871-f03f0beb2c50?w=600&q=80",
      displayOrder: 9,
      images: [
        "https://images.unsplash.com/photo-1595536500871-f03f0beb2c50?w=800&q=80",
        "https://images.unsplash.com/photo-1595536500871-f03f0beb2c50?w=600&q=80",
      ],
      variants: [
        { name: "Volume", value: "6ml", price: 1100, stock: 20, status: "active", displayOrder: 1 },
        { name: "Volume", value: "12ml", price: 2100, stock: 25, status: "active", displayOrder: 2 },
      ],
    },
    {
      id: "attar-amber-03",
      name: "Golden Amber Attar",
      slug: "golden-amber-attar",
      categoryId: "attars",
      description: "Rich golden amber attar with deep, warm undertones. A luxurious oil-based perfume that lasts all day.",
      shortDescription: "Rich golden amber attar with deep, warm undertones.",
      price: 1350,
      originalPrice: null,
      sku: "ATT-GA-03",
      stock: 40,
      status: "active",
      featured: true,
      bestSeller: true,
      badge: "New",
      image: "https://images.unsplash.com/photo-1547796505-30e452b6c835?w=600&q=80",
      displayOrder: 10,
      images: [
        "https://images.unsplash.com/photo-1547796505-30e452b6c835?w=800&q=80",
        "https://images.unsplash.com/photo-1547796505-30e452b6c835?w=600&q=80",
      ],
      variants: [
        { name: "Volume", value: "6ml", price: 1350, stock: 20, status: "active", displayOrder: 1 },
        { name: "Volume", value: "12ml", price: 2600, stock: 20, status: "active", displayOrder: 2 },
      ],
    },
    {
      id: "fragrance-oud-01",
      name: "Oud Royale Eau de Parfum",
      slug: "oud-royale-eau-de-parfum",
      categoryId: "fragrances",
      description: "A luxurious Eau de Parfum featuring rich oud, amber and sandalwood. A statement fragrance for the distinguished gentleman.",
      shortDescription: "Luxurious Eau de Parfum with rich oud, amber and sandalwood.",
      price: 3500,
      originalPrice: 4000,
      sku: "FRG-OR-01",
      stock: 30,
      status: "active",
      featured: true,
      bestSeller: true,
      badge: "Sale",
      image: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=600&q=80",
      displayOrder: 11,
      images: [
        "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=800&q=80",
        "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=600&q=80",
      ],
      variants: [
        { name: "Volume", value: "50ml", price: 3500, stock: 15, status: "active", displayOrder: 1 },
        { name: "Volume", value: "100ml", price: 6500, stock: 15, status: "active", displayOrder: 2 },
      ],
    },
    {
      id: "fragrance-sandalwood-02",
      name: "Sandalwood & Amber",
      slug: "sandalwood-amber",
      categoryId: "fragrances",
      description: "Warm sandalwood meets rich amber in this refined fragrance. Perfect for evening occasions and gatherings.",
      shortDescription: "Warm sandalwood meets rich amber in a refined fragrance.",
      price: 2800,
      originalPrice: null,
      sku: "FRG-SA-02",
      stock: 35,
      status: "active",
      featured: false,
      bestSeller: false,
      badge: null,
      image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&q=80",
      displayOrder: 12,
      images: [
        "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&q=80",
        "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&q=80",
      ],
      variants: [
        { name: "Volume", value: "50ml", price: 2800, stock: 18, status: "active", displayOrder: 1 },
        { name: "Volume", value: "100ml", price: 5200, stock: 17, status: "active", displayOrder: 2 },
      ],
    },
  ];

  for (const p of productsData) {
    const { images, variants, ...productData } = p;
    const product = await prisma.product.upsert({
      where: { slug: productData.slug },
      update: productData,
      create: productData,
    });

    // Images
    await prisma.productImage.deleteMany({ where: { productId: product.id } });
    for (let i = 0; i < images.length; i++) {
      await prisma.productImage.create({
        data: { url: images[i], displayOrder: i + 1, productId: product.id },
      });
    }

    // Variants
    await prisma.productVariant.deleteMany({ where: { productId: product.id } });
    for (const v of variants) {
      await prisma.productVariant.create({
        data: { ...v, productId: product.id },
      });
    }
  }
  console.log(`  Created ${productsData.length} products with images & variants`);

  // ─── Navigation ────────────────────────────
  console.log("Creating navigation items...");
  const navItems = [
    { id: "nav-1", label: "Home", url: "/", enabled: true, displayOrder: 1 },
    { id: "nav-2", label: "Shop", url: "/shop", enabled: true, displayOrder: 2 },
    { id: "nav-3", label: "Kufis", url: "/shop?category=kufis", enabled: true, displayOrder: 3 },
    { id: "nav-4", label: "Imamas", url: "/shop?category=imamas", enabled: true, displayOrder: 4 },
    { id: "nav-5", label: "Attars", url: "/shop?category=attars", enabled: true, displayOrder: 5 },
    { id: "nav-6", label: "Fragrances", url: "/shop?category=fragrances", enabled: true, displayOrder: 6 },
    { id: "nav-7", label: "Our Story", url: "/about", enabled: true, displayOrder: 7 },
    { id: "nav-8", label: "Contact", url: "/contact", enabled: true, displayOrder: 8 },
  ];
  for (const nav of navItems) {
    await prisma.navigationItem.upsert({
      where: { id: nav.id },
      update: nav,
      create: nav,
    });
  }
  console.log(`  Created ${navItems.length} navigation items`);

  // ─── Homepage Sections ─────────────────────
  console.log("Creating homepage sections...");
  const sections = [
    {
      id: "hero",
      sectionType: "hero",
      content: JSON.stringify({
        eyebrow: "THE ART OF TRADITION",
        heading: "Tradition,<br>refined.",
        description: "Discover a carefully curated collection of premium Kufis, Imamas, Attars and Fragrances \u2014 crafted for those who value heritage and elegance.",
        primaryButtonText: "Explore Collection",
        primaryButtonUrl: "/shop",
        secondaryButtonText: "Discover Attars",
        secondaryButtonUrl: "/shop?category=attars",
        image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&q=80",
        mobileImage: "",
        overlay: 0.4,
      }),
      displayOrder: 1,
      enabled: true,
    },
    {
      id: "categories",
      sectionType: "categories",
      content: JSON.stringify({
        eyebrow: "COLLECTIONS",
        heading: "Shop by Category",
        description: "",
        items: [
          { id: "cat-1", name: "Kufis", description: "Handcrafted traditional headwear", image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&q=80", url: "/shop?category=kufis", enabled: true },
          { id: "cat-2", name: "Imamas", description: "Elegant prayer caps", image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=600&q=80", url: "/shop?category=imamas", enabled: true },
          { id: "cat-3", name: "Attars", description: "Traditional oil-based perfumes", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&q=80", url: "/shop?category=attars", enabled: true },
          { id: "cat-4", name: "Fragrances", description: "Refined scents for every occasion", image: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=600&q=80", url: "/shop?category=fragrances", enabled: true },
        ],
      }),
      displayOrder: 2,
      enabled: true,
    },
    {
      id: "featured",
      sectionType: "featured",
      content: JSON.stringify({
        eyebrow: "CURATED FOR YOU",
        heading: "Selected for You",
        description: "A refined selection from the MBS Islamic Accessories collection.",
        buttonText: "View All",
        buttonUrl: "/shop",
      }),
      displayOrder: 3,
      enabled: true,
    },
    {
      id: "editorial",
      sectionType: "editorial",
      content: JSON.stringify({
        eyebrow: "THE ATTAR COLLECTION",
        heading: "Fragrance that<br>carries character.",
        description: "Discover our handpicked selection of traditional attars \u2014 each one a story of heritage and devotion.",
        buttonText: "Explore Attars",
        buttonUrl: "/shop?category=attars",
        image: "https://images.unsplash.com/photo-1595536500871-f03f0beb2c50?w=1400&q=80",
      }),
      displayOrder: 4,
      enabled: true,
    },
    {
      id: "brandStory",
      sectionType: "brandStory",
      content: JSON.stringify({
        eyebrow: "OUR STORY",
        heading: "Rooted in tradition.<br>Made for today.",
        text: "MBS Islamic Accessories was born from a love for traditional Islamic craftsmanship and a desire to make it accessible to the modern world. From premium Kufis and Imamas to exquisite Attars and Fragrances, every piece in our collection is selected with care and devotion.",
        text2: "We believe that faith and beauty go hand in hand. Our mission is to offer accessories that honour tradition while meeting the refined tastes of today.",
        buttonText: "Read More",
        buttonUrl: "/about",
        image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=700&q=80",
      }),
      displayOrder: 5,
      enabled: true,
    },
    {
      id: "whyMbs",
      sectionType: "whyMbs",
      content: JSON.stringify({
        eyebrow: "WHY MBS",
        heading: "A Brand You Can Trust",
        description: "",
        blocks: [
          { id: "trust-1", title: "Premium Quality", text: "Carefully selected products that meet our standards of quality and craftsmanship.", icon: "star", enabled: true },
          { id: "trust-2", title: "Authentic Collection", text: "A refined selection of genuine Islamic accessories and traditional fragrances.", icon: "shield", enabled: true },
          { id: "trust-3", title: "Nationwide Delivery", text: "Convenient delivery across Pakistan. We bring MBS Islamic to your doorstep.", icon: "truck", enabled: true },
          { id: "trust-4", title: "Easy Ordering", text: "Order easily through WhatsApp. Quick responses and personalised service.", icon: "chat", enabled: true },
        ],
      }),
      displayOrder: 6,
      enabled: true,
    },
    {
      id: "signature",
      sectionType: "signature",
      content: JSON.stringify({
        eyebrow: "SIGNATURE PIECES",
        heading: "Signature Collection",
        description: "",
        buttonText: "View All",
        buttonUrl: "/shop",
      }),
      displayOrder: 7,
      enabled: true,
    },
    {
      id: "social",
      sectionType: "social",
      content: JSON.stringify({
        eyebrow: "CONNECT WITH US",
        heading: "Follow the MBS Islamic Journey",
        description: "",
      }),
      displayOrder: 8,
      enabled: true,
    },
    {
      id: "whatsappCta",
      sectionType: "whatsappCta",
      content: JSON.stringify({
        eyebrow: "GET IN TOUCH",
        heading: "Need help choosing?",
        description: "Connect with MBS Islamic Accessories directly. We are happy to help you find the perfect piece.",
        buttonText: "Chat on WhatsApp",
      }),
      displayOrder: 9,
      enabled: true,
    },
  ];
  for (const s of sections) {
    await prisma.homepageSection.upsert({
      where: { id: s.id },
      update: s,
      create: s,
    });
  }
  console.log(`  Created ${sections.length} homepage sections`);

  // ─── Site Settings ─────────────────────────
  console.log("Creating site settings...");
  await prisma.siteSetting.upsert({
    where: { id: "site" },
    update: {},
    create: {
      id: "site",
      settings: JSON.stringify({
        name: "MBS Islamic Accessories",
        tagline: "Premium Islamic Accessories & Fragrances",
        logo: "assets/logo/logo.png",
        favicon: "",
        announcement: {
          text: "Premium Islamic Accessories \u00b7 Nationwide Delivery \u00b7 Shop Now",
          linkText: "Shop Now",
          linkUrl: "/shop",
          enabled: true,
        },
        whatsappNumber: "+923707107422",
        contactPhone: "+92 370 7107422",
        email: "",
        address: "",
        businessHours: "",
      }),
    },
  });
  await prisma.siteSetting.upsert({
    where: { id: "social" },
    update: {},
    create: {
      id: "social",
      settings: JSON.stringify({
        instagram: "https://www.instagram.com/mbs_fragrance_faith_coll/",
        facebook: "https://www.facebook.com/people/MBS-Fragrance-Faith-Collection/61593374121780/",
        youtube: "",
        tiktok: "",
      }),
    },
  });
  await prisma.siteSetting.upsert({
    where: { id: "design" },
    update: {},
    create: {
      id: "design",
      settings: JSON.stringify({
        colors: {
          primary: "#C6A15B",
          dark: "#17130F",
          cream: "#F8F5EF",
          black: "#000000",
          white: "#FFFFFF",
        },
        fonts: {
          heading: "Cormorant Garamond",
          body: "Jost",
        },
        footer: {
          description: "Premium Islamic accessories and fragrances, curated with care and devotion. MBS Fragrance & Faith Collection.",
          copyright: "\u00a9 2026 MBS Islamic Accessories. All rights reserved.",
        },
      }),
    },
  });
  console.log("  Created site settings (site, social, design)");

  // ─── Footer Links ──────────────────────────
  console.log("Creating footer links...");
  await prisma.footerLink.deleteMany();
  await prisma.footerLink.createMany({
    data: [
      { groupName: "shop", label: "All Products", url: "/shop", displayOrder: 1 },
      { groupName: "shop", label: "Kufis", url: "/shop?category=kufis", displayOrder: 2 },
      { groupName: "shop", label: "Imamas", url: "/shop?category=imamas", displayOrder: 3 },
      { groupName: "shop", label: "Attars", url: "/shop?category=attars", displayOrder: 4 },
      { groupName: "shop", label: "Fragrances", url: "/shop?category=fragrances", displayOrder: 5 },
      { groupName: "company", label: "Our Story", url: "/about", displayOrder: 1 },
      { groupName: "company", label: "Contact", url: "/contact", displayOrder: 2 },
      { groupName: "company", label: "WhatsApp Us", url: "https://wa.me/923707107422", displayOrder: 3 },
      { groupName: "support", label: "Get in Touch", url: "/contact", displayOrder: 1 },
      { groupName: "support", label: "Order via WhatsApp", url: "https://wa.me/923707107422", displayOrder: 2 },
      { groupName: "support", label: "View Cart", url: "/cart", displayOrder: 3 },
    ],
  });
  console.log("  Created 11 footer links");

  // ─── Pages ─────────────────────────────────
  console.log("Creating pages...");
  await prisma.page.upsert({
    where: { id: "about" },
    update: {},
    create: {
      id: "about",
      heading: "Our Story",
      subheading: "Rooted in tradition, made for today.",
      content: JSON.stringify({
        story: "MBS Islamic Accessories was born from a love for traditional Islamic craftsmanship and a desire to make it accessible to the modern world. From premium Kufis and Imamas to exquisite Attars and Fragrances, every piece in our collection is selected with care and devotion.",
        mission: "We believe that faith and beauty go hand in hand. Our mission is to offer accessories that honour tradition while meeting the refined tastes of today.",
        founder: "Founded with a passion for quality and authenticity.",
      }),
    },
  });
  await prisma.page.upsert({
    where: { id: "contact" },
    update: {},
    create: {
      id: "contact",
      heading: "Get in Touch",
      subheading: "We are here to help you find the perfect piece.",
      content: JSON.stringify({
        phone: "+92 370 7107422",
        whatsapp: "https://wa.me/923707107422",
        email: "",
        instagram: "https://www.instagram.com/mbs_fragrance_faith_coll/",
        facebook: "https://www.facebook.com/people/MBS-Fragrance-Faith-Collection/61593374121780/",
        faq: [
          { question: "How do I place an order?", answer: "Simply click the WhatsApp button on any product page and send us a message. We will guide you through the process." },
          { question: "Do you deliver nationwide?", answer: "Yes, we deliver across Pakistan. Contact us for delivery details." },
          { question: "What payment methods do you accept?", answer: "We accept bank transfers, JazzCash, and EasyPaisa. Details will be provided when you place your order." },
          { question: "Can I return a product?", answer: "Please contact us within 3 days of delivery for any issues. We will do our best to resolve them." },
        ],
      }),
    },
  });
  console.log("  Created 2 pages (about, contact)");

  // ─── SEO Settings ──────────────────────────
  console.log("Creating SEO settings...");
  const seoPages = ["home", "shop", "about", "contact"];
  const seoData = {
    home: { title: "MBS Islamic Accessories | Premium Islamic Accessories & Fragrances", description: "Discover premium Kufis, Imamas, Attars and Fragrances at MBS Islamic Accessories. Handcrafted quality, nationwide delivery across Pakistan.", keywords: "Islamic accessories, kufi, imama, attar, fragrances, Pakistan, premium, traditional" },
    shop: { title: "Shop All Products | MBS Islamic Accessories", description: "Browse our collection of premium Kufis, Imamas, Attars and Fragrances. Handcrafted with devotion.", keywords: "shop Islamic accessories, buy kufi, buy attar, fragrances online Pakistan" },
    about: { title: "Our Story | MBS Islamic Accessories", description: "Learn about MBS Islamic Accessories - our passion for traditional craftsmanship and premium quality.", keywords: "MBS Islamic Accessories, about us, Islamic craftsmanship" },
    contact: { title: "Contact Us | MBS Islamic Accessories", description: "Get in touch with MBS Islamic Accessories via WhatsApp, Instagram or Facebook.", keywords: "contact MBS, WhatsApp order, Islamic accessories contact" },
  };
  for (const page of seoPages) {
    const data = seoData[page];
    await prisma.seoSetting.upsert({
      where: { id: page },
      update: { ...data },
      create: { id: page, ...data },
    });
  }
  console.log(`  Created ${seoPages.length} SEO settings`);

  console.log("\nSeeding complete!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Seed error:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
