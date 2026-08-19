var MBSCMS = (function () {
  'use strict';

  var STORAGE_KEY = 'mbs_cms_content';

  var DEFAULT_CONTENT = {
    site: {
      name: 'MBS Islamic Accessories',
      tagline: 'Premium Islamic Accessories & Fragrances',
      logo: 'assets/logo/logo.png',
      favicon: '',
      announcement: {
        text: 'Premium Islamic Accessories &bull; Nationwide Delivery &bull; Shop Now',
        linkText: 'Shop Now',
        linkUrl: 'shop.html',
        enabled: true
      },
      whatsappNumber: '+923707107422',
      contactPhone: '+92 370 7107422',
      email: '',
      address: '',
      businessHours: ''
    },
    social: {
      instagram: 'https://www.instagram.com/mbs_fragrance_faith_coll/',
      facebook: 'https://www.facebook.com/people/MBS-Fragrance-Faith-Collection/61593374121780/',
      youtube: '',
      tiktok: ''
    },
    navigation: [
      { id: 'nav-1', label: 'Home', url: 'index.html', enabled: true, order: 1 },
      { id: 'nav-2', label: 'Shop', url: 'shop.html', enabled: true, order: 2 },
      { id: 'nav-3', label: 'Kufis', url: 'shop.html?category=kufis', enabled: true, order: 3 },
      { id: 'nav-4', label: 'Imamas', url: 'shop.html?category=imamas', enabled: true, order: 4 },
      { id: 'nav-5', label: 'Attars', url: 'shop.html?category=attars', enabled: true, order: 5 },
      { id: 'nav-6', label: 'Fragrances', url: 'shop.html?category=fragrances', enabled: true, order: 6 },
      { id: 'nav-7', label: 'Our Story', url: 'about.html', enabled: true, order: 7 },
      { id: 'nav-8', label: 'Contact', url: 'contact.html', enabled: true, order: 8 }
    ],
    homepage: {
      hero: {
        eyebrow: 'THE ART OF TRADITION',
        heading: 'Tradition,<br>refined.',
        description: 'Discover a carefully curated collection of premium Kufis, Imamas, Attars and Fragrances \u2014 crafted for those who value heritage and elegance.',
        primaryButtonText: 'Explore Collection',
        primaryButtonUrl: 'shop.html',
        secondaryButtonText: 'Discover Attars',
        secondaryButtonUrl: 'shop.html?category=attars',
        image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&q=80',
        mobileImage: '',
        overlay: 0.4,
        enabled: true
      },
      categories: {
        eyebrow: 'COLLECTIONS',
        heading: 'Shop by Category',
        description: '',
        enabled: true,
        order: 2,
        items: [
          {
            id: 'cat-1',
            name: 'Kufis',
            description: 'Handcrafted traditional headwear',
            image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&q=80',
            url: 'shop.html?category=kufis',
            enabled: true
          },
          {
            id: 'cat-2',
            name: 'Imamas',
            description: 'Elegant prayer caps',
            image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=600&q=80',
            url: 'shop.html?category=imamas',
            enabled: true
          },
          {
            id: 'cat-3',
            name: 'Attars',
            description: 'Traditional oil-based perfumes',
            image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&q=80',
            url: 'shop.html?category=attars',
            enabled: true
          },
          {
            id: 'cat-4',
            name: 'Fragrances',
            description: 'Refined scents for every occasion',
            image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=600&q=80',
            url: 'shop.html?category=fragrances',
            enabled: true
          }
        ]
      },
      featured: {
        eyebrow: 'CURATED FOR YOU',
        heading: 'Selected for You',
        description: 'A refined selection from the MBS Islamic Accessories collection.',
        buttonText: 'View All',
        buttonUrl: 'shop.html',
        enabled: true,
        order: 3
      },
      editorial: {
        eyebrow: 'THE ATTAR COLLECTION',
        heading: 'Fragrance that<br>carries character.',
        description: 'Discover our handpicked selection of traditional attars \u2014 each one a story of heritage and devotion.',
        buttonText: 'Explore Attars',
        buttonUrl: 'shop.html?category=attars',
        image: 'https://images.unsplash.com/photo-1595536500871-f03f0beb2c50?w=1400&q=80',
        enabled: true,
        order: 4
      },
      brandStory: {
        eyebrow: 'OUR STORY',
        heading: 'Rooted in tradition.<br>Made for today.',
        text: 'MBS Islamic Accessories was born from a love for traditional Islamic craftsmanship and a desire to make it accessible to the modern world. From premium Kufis and Imamas to exquisite Attars and Fragrances, every piece in our collection is selected with care and devotion.',
        text2: 'We believe that faith and beauty go hand in hand. Our mission is to offer accessories that honour tradition while meeting the refined tastes of today.',
        buttonText: 'Read More',
        buttonUrl: 'about.html',
        image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=700&q=80',
        enabled: true,
        order: 5
      },
      whyMbs: {
        eyebrow: 'WHY MBS',
        heading: 'A Brand You Can Trust',
        description: '',
        enabled: true,
        order: 6,
        blocks: [
          {
            id: 'trust-1',
            title: 'Premium Quality',
            text: 'Carefully selected products that meet our standards of quality and craftsmanship.',
            icon: 'star',
            enabled: true
          },
          {
            id: 'trust-2',
            title: 'Authentic Collection',
            text: 'A refined selection of genuine Islamic accessories and traditional fragrances.',
            icon: 'shield',
            enabled: true
          },
          {
            id: 'trust-3',
            title: 'Nationwide Delivery',
            text: 'Convenient delivery across Pakistan. We bring MBS Islamic to your doorstep.',
            icon: 'truck',
            enabled: true
          },
          {
            id: 'trust-4',
            title: 'Easy Ordering',
            text: 'Order easily through WhatsApp. Quick responses and personalised service.',
            icon: 'chat',
            enabled: true
          }
        ]
      },
      signature: {
        eyebrow: 'SIGNATURE PIECES',
        heading: 'Signature Collection',
        description: '',
        buttonText: 'View All',
        buttonUrl: 'shop.html',
        enabled: true,
        order: 7
      },
      social: {
        eyebrow: 'CONNECT WITH US',
        heading: 'Follow the MBS Islamic Journey',
        description: '',
        enabled: true,
        order: 8
      },
      whatsappCta: {
        eyebrow: 'GET IN TOUCH',
        heading: 'Need help choosing?',
        description: 'Connect with MBS Islamic Accessories directly. We are happy to help you find the perfect piece.',
        buttonText: 'Chat on WhatsApp',
        enabled: true,
        order: 9
      }
    },
    footer: {
      description: 'Premium Islamic accessories and fragrances, curated with care and devotion. MBS Fragrance & Faith Collection.',
      copyright: '\u00a9 2026 MBS Islamic Accessories. All rights reserved.',
      shopLinks: [
        { label: 'All Products', url: 'shop.html' },
        { label: 'Kufis', url: 'shop.html?category=kufis' },
        { label: 'Imamas', url: 'shop.html?category=imamas' },
        { label: 'Attars', url: 'shop.html?category=attars' },
        { label: 'Fragrances', url: 'shop.html?category=fragrances' }
      ],
      companyLinks: [
        { label: 'Our Story', url: 'about.html' },
        { label: 'Contact', url: 'contact.html' },
        { label: 'WhatsApp Us', url: 'https://wa.me/923707107422' }
      ],
      supportLinks: [
        { label: 'Get in Touch', url: 'contact.html' },
        { label: 'Order via WhatsApp', url: 'https://wa.me/923707107422' },
        { label: 'View Cart', url: 'cart.html' }
      ]
    },
    categories: [
      {
        id: 'kufis',
        name: 'Kufis',
        slug: 'kufis',
        description: 'Handcrafted traditional headwear',
        image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&q=80',
        heroImage: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&q=80',
        displayOrder: 1,
        featured: true,
        enabled: true
      },
      {
        id: 'imamas',
        name: 'Imamas',
        slug: 'imamas',
        description: 'Elegant prayer caps',
        image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=600&q=80',
        heroImage: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=800&q=80',
        displayOrder: 2,
        featured: true,
        enabled: true
      },
      {
        id: 'attars',
        name: 'Attars',
        slug: 'attars',
        description: 'Traditional oil-based perfumes',
        image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&q=80',
        heroImage: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80',
        displayOrder: 3,
        featured: true,
        enabled: true
      },
      {
        id: 'fragrances',
        name: 'Fragrances',
        slug: 'fragrances',
        description: 'Refined scents for every occasion',
        image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=600&q=80',
        heroImage: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=800&q=80',
        displayOrder: 4,
        featured: true,
        enabled: true
      }
    ],
    products: [
      {
        id: 'kufi-classic-01',
        name: 'Classic Embroidered Kufi',
        slug: 'classic-embroidered-kufi',
        category: 'kufis',
        description: 'A timeless classic embroidered kufi, handcrafted with precision. Made from premium cotton with intricate thread work, perfect for daily wear and special occasions.',
        shortDescription: 'Handcrafted premium cotton kufi with intricate thread work.',
        price: 1200,
        originalPrice: null,
        sku: 'KUF-CE-01',
        stock: 50,
        status: 'active',
        featured: true,
        badge: null,
        image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&q=80',
        images: [
          'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&q=80',
          'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&q=80',
          'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&q=80'
        ],
        variants: [
          { name: 'Small', value: 'Small', price: 1200, stock: 10, status: 'active' },
          { name: 'Medium', value: 'Medium', price: 1200, stock: 15, status: 'active' },
          { name: 'Large', value: 'Large', price: 1200, stock: 15, status: 'active' },
          { name: 'XL', value: 'XL', price: 1200, stock: 10, status: 'active' }
        ],
        bestSeller: true
      },
      {
        id: 'kufi-royal-02',
        name: 'Royal Maroon Kufi',
        slug: 'royal-maroon-kufi',
        category: 'kufis',
        description: 'A regal maroon kufi with gold thread accents. Designed for those who appreciate the finer details in traditional headwear.',
        shortDescription: 'Regal maroon kufi with gold thread accents.',
        price: 1500,
        originalPrice: 1800,
        sku: 'KUF-RM-02',
        stock: 30,
        status: 'active',
        featured: true,
        badge: 'Sale',
        image: 'https://images.unsplash.com/photo-1621768216002-5ac171876525?w=600&q=80',
        images: [
          'https://images.unsplash.com/photo-1621768216002-5ac171876525?w=800&q=80',
          'https://images.unsplash.com/photo-1621768216002-5ac171876525?w=600&q=80'
        ],
        variants: [
          { name: 'Medium', value: 'Medium', price: 1500, stock: 10, status: 'active' },
          { name: 'Large', value: 'Large', price: 1500, stock: 10, status: 'active' },
          { name: 'XL', value: 'XL', price: 1500, stock: 10, status: 'active' }
        ],
        bestSeller: true
      },
      {
        id: 'kufi-pakistani-03',
        name: 'Pakistani Sindhi Kufi',
        slug: 'pakistani-sindhi-kufi',
        category: 'kufis',
        description: 'Authentic Pakistani Sindhi kufi featuring traditional mirror work and vibrant thread embroidery. Each piece is individually handcrafted.',
        shortDescription: 'Authentic Sindhi kufi with mirror work and embroidery.',
        price: 1800,
        originalPrice: null,
        sku: 'KUF-PS-03',
        stock: 20,
        status: 'active',
        featured: false,
        badge: 'New',
        image: 'https://images.unsplash.com/photo-1609849814750-e4ab7b13dbf5?w=600&q=80',
        images: [
          'https://images.unsplash.com/photo-1609849814750-e4ab7b13dbf5?w=800&q=80',
          'https://images.unsplash.com/photo-1609849814750-e4ab7b13dbf5?w=600&q=80'
        ],
        variants: [
          { name: 'Medium', value: 'Medium', price: 1800, stock: 10, status: 'active' },
          { name: 'Large', value: 'Large', price: 1800, stock: 10, status: 'active' }
        ],
        bestSeller: false
      },
      {
        id: 'imama-premium-01',
        name: 'Premium Turkish Imama',
        slug: 'premium-turkish-imama',
        category: 'imamas',
        description: 'A premium Turkish-style imama crafted from finest cotton. Features elegant geometric patterns and a structured fit for a distinguished appearance.',
        shortDescription: 'Premium Turkish-style imama with geometric patterns.',
        price: 2200,
        originalPrice: null,
        sku: 'IMA-PT-01',
        stock: 40,
        status: 'active',
        featured: true,
        badge: 'Bestseller',
        image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=600&q=80',
        images: [
          'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=800&q=80',
          'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=600&q=80'
        ],
        variants: [
          { name: 'Small', value: 'Small', price: 2200, stock: 10, status: 'active' },
          { name: 'Medium', value: 'Medium', price: 2200, stock: 10, status: 'active' },
          { name: 'Large', value: 'Large', price: 2200, stock: 10, status: 'active' },
          { name: 'XL', value: 'XL', price: 2200, stock: 10, status: 'active' }
        ],
        bestSeller: true
      },
      {
        id: 'imama-silk-02',
        name: 'Silk Blend Imama',
        slug: 'silk-blend-imama',
        category: 'imamas',
        description: 'Luxurious silk blend imama with subtle sheen. Perfect for Jummah prayers and Eid celebrations.',
        shortDescription: 'Luxurious silk blend imama with subtle sheen.',
        price: 2800,
        originalPrice: 3200,
        sku: 'IMA-SB-02',
        stock: 25,
        status: 'active',
        featured: false,
        badge: 'Sale',
        image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=600&q=80',
        images: [
          'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=800&q=80',
          'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=600&q=80'
        ],
        variants: [
          { name: 'Medium', value: 'Medium', price: 2800, stock: 8, status: 'active' },
          { name: 'Large', value: 'Large', price: 2800, stock: 9, status: 'active' },
          { name: 'XL', value: 'XL', price: 2800, stock: 8, status: 'active' }
        ],
        bestSeller: false
      },
      {
        id: 'attar-rose-01',
        name: 'Rose Oud Attar',
        slug: 'rose-oud-attar',
        category: 'attars',
        description: 'An enchanting blend of Damask rose and premium oud oil. This traditional attar offers a long-lasting, warm and captivating fragrance.',
        shortDescription: 'Enchanting blend of Damask rose and premium oud oil.',
        price: 950,
        originalPrice: null,
        sku: 'ATT-RO-01',
        stock: 60,
        status: 'active',
        featured: true,
        badge: null,
        image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&q=80',
        images: [
          'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80',
          'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&q=80'
        ],
        variants: [
          { name: '6ml', value: '6ml', price: 950, stock: 30, status: 'active' },
          { name: '12ml', value: '12ml', price: 1800, stock: 30, status: 'active' }
        ],
        bestSeller: true
      },
      {
        id: 'attar-musk-02',
        name: 'White Musk Attar',
        slug: 'white-musk-attar',
        category: 'attars',
        description: 'A pure white musk attar with clean, soft and comforting notes. Ideal for daily wear and prayer.',
        shortDescription: 'Pure white musk attar with clean, soft notes.',
        price: 1100,
        originalPrice: null,
        sku: 'ATT-WM-02',
        stock: 45,
        status: 'active',
        featured: true,
        badge: 'Popular',
        image: 'https://images.unsplash.com/photo-1595536500871-f03f0beb2c50?w=600&q=80',
        images: [
          'https://images.unsplash.com/photo-1595536500871-f03f0beb2c50?w=800&q=80',
          'https://images.unsplash.com/photo-1595536500871-f03f0beb2c50?w=600&q=80'
        ],
        variants: [
          { name: '6ml', value: '6ml', price: 1100, stock: 20, status: 'active' },
          { name: '12ml', value: '12ml', price: 2100, stock: 25, status: 'active' }
        ],
        bestSeller: true
      },
      {
        id: 'fragrance-oud-01',
        name: 'Oud Royale Eau de Parfum',
        slug: 'oud-royale-eau-de-parfum',
        category: 'fragrances',
        description: 'A luxurious Eau de Parfum featuring rich oud, amber and sandalwood. A statement fragrance for the distinguished gentleman.',
        shortDescription: 'Luxurious Eau de Parfum with rich oud, amber and sandalwood.',
        price: 3500,
        originalPrice: 4000,
        sku: 'FRG-OR-01',
        stock: 30,
        status: 'active',
        featured: true,
        badge: 'Sale',
        image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=600&q=80',
        images: [
          'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=800&q=80',
          'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=600&q=80'
        ],
        variants: [
          { name: '50ml', value: '50ml', price: 3500, stock: 15, status: 'active' },
          { name: '100ml', value: '100ml', price: 6500, stock: 15, status: 'active' }
        ],
        bestSeller: true
      },
      {
        id: 'fragrance-sandalwood-02',
        name: 'Sandalwood & Amber',
        slug: 'sandalwood-amber',
        category: 'fragrances',
        description: 'Warm sandalwood meets rich amber in this refined fragrance. Perfect for evening occasions and gatherings.',
        shortDescription: 'Warm sandalwood meets rich amber in a refined fragrance.',
        price: 2800,
        originalPrice: null,
        sku: 'FRG-SA-02',
        stock: 35,
        status: 'active',
        featured: false,
        badge: null,
        image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&q=80',
        images: [
          'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&q=80',
          'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&q=80'
        ],
        variants: [
          { name: '50ml', value: '50ml', price: 2800, stock: 18, status: 'active' },
          { name: '100ml', value: '100ml', price: 5200, stock: 17, status: 'active' }
        ],
        bestSeller: false
      },
      {
        id: 'kufi-embroidered-04',
        name: 'Black & Gold Kufi',
        slug: 'black-gold-kufi',
        category: 'kufis',
        description: 'An elegant black kufi with gold embroidered accents. A modern take on a classic design.',
        shortDescription: 'Elegant black kufi with gold embroidered accents.',
        price: 1600,
        originalPrice: null,
        sku: 'KUF-BG-04',
        stock: 25,
        status: 'active',
        featured: false,
        badge: 'New',
        image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&q=80',
        images: [
          'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&q=80',
          'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&q=80'
        ],
        variants: [
          { name: 'Medium', value: 'Medium', price: 1600, stock: 8, status: 'active' },
          { name: 'Large', value: 'Large', price: 1600, stock: 9, status: 'active' },
          { name: 'XL', value: 'XL', price: 1600, stock: 8, status: 'active' }
        ],
        bestSeller: false
      },
      {
        id: 'imama-embroidered-03',
        name: 'Embroidered Prayer Imama',
        slug: 'embroidered-prayer-imama',
        category: 'imamas',
        description: 'Beautifully embroidered imama for everyday prayer. Soft cotton construction with detailed needlework.',
        shortDescription: 'Beautifully embroidered imama for everyday prayer.',
        price: 1900,
        originalPrice: null,
        sku: 'IMA-EP-03',
        stock: 30,
        status: 'active',
        featured: false,
        badge: null,
        image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&q=80',
        images: [
          'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&q=80',
          'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&q=80'
        ],
        variants: [
          { name: 'Small', value: 'Small', price: 1900, stock: 10, status: 'active' },
          { name: 'Medium', value: 'Medium', price: 1900, stock: 10, status: 'active' },
          { name: 'Large', value: 'Large', price: 1900, stock: 10, status: 'active' }
        ],
        bestSeller: false
      },
      {
        id: 'attar-amber-03',
        name: 'Golden Amber Attar',
        slug: 'golden-amber-attar',
        category: 'attars',
        description: 'Rich golden amber attar with deep, warm undertones. A luxurious oil-based perfume that lasts all day.',
        shortDescription: 'Rich golden amber attar with deep, warm undertones.',
        price: 1350,
        originalPrice: null,
        sku: 'ATT-GA-03',
        stock: 40,
        status: 'active',
        featured: true,
        badge: 'New',
        image: 'https://images.unsplash.com/photo-1547796505-30e452b6c835?w=600&q=80',
        images: [
          'https://images.unsplash.com/photo-1547796505-30e452b6c835?w=800&q=80',
          'https://images.unsplash.com/photo-1547796505-30e452b6c835?w=600&q=80'
        ],
        variants: [
          { name: '6ml', value: '6ml', price: 1350, stock: 20, status: 'active' },
          { name: '12ml', value: '12ml', price: 2600, stock: 20, status: 'active' }
        ],
        bestSeller: true
      }
    ],
    pages: {
      about: {
        heading: 'Rooted in Tradition',
        subheading: 'The story of MBS Fragrance & Faith Collection.',
        content: 'MBS Islamic Accessories was born from a deep appreciation for traditional Islamic craftsmanship. What started as a passion for collecting premium Kufis, Imamas and Attars grew into a mission \u2014 to make these beautiful pieces accessible to everyone who values heritage and elegance.'
      },
      contact: {
        heading: 'Contact Us',
        subheading: 'We are here to help. Reach out to us through any of these channels.',
        content: 'The fastest way to reach us is through WhatsApp. Whether you have a question about a product, need help with an order, or just want to say hello \u2014 we are happy to help.'
      }
    },
    design: {
      primaryColor: '#C6A15B',
      secondaryColor: '#17130F',
      backgroundColor: '#F8F5F0',
      textColor: '#17130F',
      accentColor: '#D4B76E'
    },
    seo: {
      home: {
        title: 'MBS Islamic Accessories \u2014 Premium Islamic Accessories & Fragrances',
        description: 'MBS Fragrance & Faith Collection \u2014 Premium Kufis, Imamas, Attars, Fragrances and Islamic accessories. Nationwide delivery across Pakistan.',
        keywords: 'MBS Islamic Accessories, Islamic accessories, Kufis, Imamas, Attars, Fragrances, Pakistan'
      },
      shop: {
        title: 'Shop \u2014 MBS Islamic Accessories',
        description: 'Browse our collection of premium Kufis, Imamas, Attars and Fragrances. MBS Islamic Accessories \u2014 Pakistan\'s finest Islamic accessories.',
        keywords: 'shop Islamic accessories, buy Kufis, buy Imamas, buy Attars, buy Fragrances, Pakistan'
      },
      about: {
        title: 'Our Story \u2014 MBS Islamic Accessories',
        description: 'Learn about MBS Islamic Accessories Fragrance & Faith Collection \u2014 Premium Islamic accessories and fragrances rooted in tradition.',
        keywords: 'MBS Islamic Accessories story, about MBS Fragrance Faith Collection, Islamic craftsmanship'
      },
      contact: {
        title: 'Contact \u2014 MBS Islamic Accessories',
        description: 'Get in touch with MBS Islamic Accessories. Contact us via WhatsApp, Instagram or Facebook.',
        keywords: 'contact MBS Islamic Accessories, MBS WhatsApp, Islamic accessories contact Pakistan'
      }
    },
    media: [],
    orders: [],
    customers: []
  };

  var _content = null;

  function _deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function _getNestedValue(obj, path) {
    var keys = path.split('.');
    var current = obj;
    for (var i = 0; i < keys.length; i++) {
      if (current === null || current === undefined) {
        return undefined;
      }
      current = current[keys[i]];
    }
    return current;
  }

  function _setNestedValue(obj, path, value) {
    var keys = path.split('.');
    var current = obj;
    for (var i = 0; i < keys.length - 1; i++) {
      if (current[keys[i]] === undefined || current[keys[i]] === null) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
  }

  function _generateId(prefix) {
    prefix = prefix || 'id';
    var timestamp = Date.now().toString(36);
    var random = Math.random().toString(36).substring(2, 8);
    return prefix + '-' + timestamp + '-' + random;
  }

  function init() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        _content = JSON.parse(stored);
        var defaults = _deepClone(DEFAULT_CONTENT);
        _content = _mergeDeep(defaults, _content);
      } else {
        _content = _deepClone(DEFAULT_CONTENT);
      }
    } catch (e) {
      _content = _deepClone(DEFAULT_CONTENT);
    }
    return _content;
  }

  function _mergeDeep(target, source) {
    var output = _deepClone(target);
    for (var key in source) {
      if (source.hasOwnProperty(key)) {
        if (
          source[key] &&
          typeof source[key] === 'object' &&
          !Array.isArray(source[key]) &&
          target[key] &&
          typeof target[key] === 'object' &&
          !Array.isArray(target[key])
        ) {
          output[key] = _mergeDeep(target[key], source[key]);
        } else if (source[key] !== undefined) {
          output[key] = _deepClone(source[key]);
        }
      }
    }
    return output;
  }

  function get(path) {
    if (!_content) {
      init();
    }
    if (!path) {
      return _deepClone(_content);
    }
    var value = _getNestedValue(_content, path);
    if (typeof value === 'object' && value !== null) {
      return _deepClone(value);
    }
    return value;
  }

  function set(path, value) {
    if (!_content) {
      init();
    }
    _setNestedValue(_content, path, value);
    save();
    return true;
  }

  function getAll() {
    if (!_content) {
      init();
    }
    return _deepClone(_content);
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(_content));
      return true;
    } catch (e) {
      return false;
    }
  }

  function reset() {
    _content = _deepClone(DEFAULT_CONTENT);
    save();
    return _content;
  }

  function getProducts() {
    if (!_content) {
      init();
    }
    return _deepClone(_content.products);
  }

  function getProduct(id) {
    if (!_content) {
      init();
    }
    for (var i = 0; i < _content.products.length; i++) {
      if (_content.products[i].id === id) {
        return _deepClone(_content.products[i]);
      }
    }
    return null;
  }

  function addProduct(product) {
    if (!_content) {
      init();
    }
    var newProduct = _deepClone(product);
    if (!newProduct.id) {
      newProduct.id = _generateId('prod');
    }
    if (!newProduct.slug) {
      newProduct.slug = newProduct.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
    }
    _content.products.push(newProduct);
    save();
    return _deepClone(newProduct);
  }

  function updateProduct(id, data) {
    if (!_content) {
      init();
    }
    for (var i = 0; i < _content.products.length; i++) {
      if (_content.products[i].id === id) {
        _content.products[i] = _mergeDeep(_content.products[i], data);
        _content.products[i].id = id;
        save();
        return _deepClone(_content.products[i]);
      }
    }
    return null;
  }

  function deleteProduct(id) {
    if (!_content) {
      init();
    }
    for (var i = 0; i < _content.products.length; i++) {
      if (_content.products[i].id === id) {
        _content.products.splice(i, 1);
        save();
        return true;
      }
    }
    return false;
  }

  function getCategories() {
    if (!_content) {
      init();
    }
    return _deepClone(_content.categories);
  }

  function addCategory(cat) {
    if (!_content) {
      init();
    }
    var newCat = _deepClone(cat);
    if (!newCat.id) {
      newCat.id = _generateId('cat');
    }
    if (!newCat.slug) {
      newCat.slug = newCat.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
    }
    _content.categories.push(newCat);
    save();
    return _deepClone(newCat);
  }

  function updateCategory(id, data) {
    if (!_content) {
      init();
    }
    for (var i = 0; i < _content.categories.length; i++) {
      if (_content.categories[i].id === id) {
        _content.categories[i] = _mergeDeep(_content.categories[i], data);
        _content.categories[i].id = id;
        save();
        return _deepClone(_content.categories[i]);
      }
    }
    return null;
  }

  function deleteCategory(id) {
    if (!_content) {
      init();
    }
    for (var i = 0; i < _content.categories.length; i++) {
      if (_content.categories[i].id === id) {
        _content.categories.splice(i, 1);
        save();
        return true;
      }
    }
    return false;
  }

  function getNavigation() {
    if (!_content) {
      init();
    }
    var nav = _deepClone(_content.navigation);
    nav.sort(function (a, b) {
      return (a.order || 0) - (b.order || 0);
    });
    return nav;
  }

  function addNavItem(item) {
    if (!_content) {
      init();
    }
    var newItem = _deepClone(item);
    if (!newItem.id) {
      newItem.id = _generateId('nav');
    }
    if (newItem.order === undefined) {
      var maxOrder = 0;
      for (var i = 0; i < _content.navigation.length; i++) {
        if ((_content.navigation[i].order || 0) > maxOrder) {
          maxOrder = _content.navigation[i].order;
        }
      }
      newItem.order = maxOrder + 1;
    }
    _content.navigation.push(newItem);
    save();
    return _deepClone(newItem);
  }

  function updateNavItem(id, data) {
    if (!_content) {
      init();
    }
    for (var i = 0; i < _content.navigation.length; i++) {
      if (_content.navigation[i].id === id) {
        _content.navigation[i] = _mergeDeep(_content.navigation[i], data);
        _content.navigation[i].id = id;
        save();
        return _deepClone(_content.navigation[i]);
      }
    }
    return null;
  }

  function deleteNavItem(id) {
    if (!_content) {
      init();
    }
    for (var i = 0; i < _content.navigation.length; i++) {
      if (_content.navigation[i].id === id) {
        _content.navigation.splice(i, 1);
        save();
        return true;
      }
    }
    return false;
  }

  function getMedia() {
    if (!_content) {
      init();
    }
    return _deepClone(_content.media);
  }

  function addMedia(item) {
    if (!_content) {
      init();
    }
    var newItem = _deepClone(item);
    if (!newItem.id) {
      newItem.id = _generateId('media');
    }
    if (!newItem.createdAt) {
      newItem.createdAt = new Date().toISOString();
    }
    _content.media.push(newItem);
    save();
    return _deepClone(newItem);
  }

  function deleteMedia(id) {
    if (!_content) {
      init();
    }
    for (var i = 0; i < _content.media.length; i++) {
      if (_content.media[i].id === id) {
        _content.media.splice(i, 1);
        save();
        return true;
      }
    }
    return false;
  }

  function generateId(prefix) {
    return _generateId(prefix);
  }

  return {
    init: init,
    get: get,
    set: set,
    getAll: getAll,
    save: save,
    reset: reset,
    getProducts: getProducts,
    getProduct: getProduct,
    addProduct: addProduct,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct,
    getCategories: getCategories,
    addCategory: addCategory,
    updateCategory: updateCategory,
    deleteCategory: deleteCategory,
    getNavigation: getNavigation,
    addNavItem: addNavItem,
    updateNavItem: updateNavItem,
    deleteNavItem: deleteNavItem,
    getMedia: getMedia,
    addMedia: addMedia,
    deleteMedia: deleteMedia,
    generateId: generateId
  };
})();
