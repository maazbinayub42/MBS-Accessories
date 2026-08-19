/* ============================================
   MBS ACCESSORIES — Product Data
   ============================================ */

var MBS_PRODUCTS = [
  {
    id: 'kufi-classic-01',
    name: 'Classic Embroidered Kufi',
    category: 'kufis',
    price: 1200,
    originalPrice: null,
    badge: null,
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&q=80',
      'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&q=80',
      'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&q=80'
    ],
    description: 'A timeless classic embroidered kufi, handcrafted with precision. Made from premium cotton with intricate thread work, perfect for daily wear and special occasions.',
    variants: ['Small', 'Medium', 'Large', 'XL'],
    featured: true
  },
  {
    id: 'kufi-royal-02',
    name: 'Royal Maroon Kufi',
    category: 'kufis',
    price: 1500,
    originalPrice: 1800,
    badge: 'Sale',
    image: 'https://images.unsplash.com/photo-1621768216002-5ac171876525?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1621768216002-5ac171876525?w=800&q=80',
      'https://images.unsplash.com/photo-1621768216002-5ac171876525?w=600&q=80'
    ],
    description: 'A regal maroon kufi with gold thread accents. Designed for those who appreciate the finer details in traditional headwear.',
    variants: ['Medium', 'Large', 'XL'],
    featured: true
  },
  {
    id: 'kufi-pakistani-03',
    name: 'Pakistani Sindhi Kufi',
    category: 'kufis',
    price: 1800,
    originalPrice: null,
    badge: 'New',
    image: 'https://images.unsplash.com/photo-1609849814750-e4ab7b13dbf5?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1609849814750-e4ab7b13dbf5?w=800&q=80',
      'https://images.unsplash.com/photo-1609849814750-e4ab7b13dbf5?w=600&q=80'
    ],
    description: 'Authentic Pakistani Sindhi kufi featuring traditional mirror work and vibrant thread embroidery. Each piece is individually handcrafted.',
    variants: ['Medium', 'Large'],
    featured: false
  },
  {
    id: 'imama-premium-01',
    name: 'Premium Turkish Imama',
    category: 'imamas',
    price: 2200,
    originalPrice: null,
    badge: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=800&q=80',
      'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=600&q=80'
    ],
    description: 'A premium Turkish-style imama crafted from finest cotton. Features elegant geometric patterns and a structured fit for a distinguished appearance.',
    variants: ['Small', 'Medium', 'Large', 'XL'],
    featured: true
  },
  {
    id: 'imama-silk-02',
    name: 'Silk Blend Imama',
    category: 'imamas',
    price: 2800,
    originalPrice: 3200,
    badge: 'Sale',
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=800&q=80',
      'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=600&q=80'
    ],
    description: 'Luxurious silk blend imama with subtle sheen. Perfect for Jummah prayers and Eid celebrations.',
    variants: ['Medium', 'Large', 'XL'],
    featured: false
  },
  {
    id: 'attar-rose-01',
    name: 'Rose Oud Attar',
    category: 'attars',
    price: 950,
    originalPrice: null,
    badge: null,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80',
      'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&q=80'
    ],
    description: 'An enchanting blend of Damask rose and premium oud oil. This traditional attar offers a long-lasting, warm and captivating fragrance.',
    variants: ['6ml', '12ml'],
    featured: true
  },
  {
    id: 'attar-musk-02',
    name: 'White Musk Attar',
    category: 'attars',
    price: 1100,
    originalPrice: null,
    badge: 'Popular',
    image: 'https://images.unsplash.com/photo-1595536500871-f03f0beb2c50?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1595536500871-f03f0beb2c50?w=800&q=80',
      'https://images.unsplash.com/photo-1595536500871-f03f0beb2c50?w=600&q=80'
    ],
    description: 'A pure white musk attar with clean, soft and comforting notes. Ideal for daily wear and prayer.',
    variants: ['6ml', '12ml'],
    featured: true
  },
  {
    id: 'fragrance-oud-01',
    name: 'Oud Royale Eau de Parfum',
    category: 'fragrances',
    price: 3500,
    originalPrice: 4000,
    badge: 'Sale',
    image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=800&q=80',
      'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=600&q=80'
    ],
    description: 'A luxurious Eau de Parfum featuring rich oud, amber and sandalwood. A statement fragrance for the distinguished gentleman.',
    variants: ['50ml', '100ml'],
    featured: true
  },
  {
    id: 'fragrance-sandalwood-02',
    name: 'Sandalwood & Amber',
    category: 'fragrances',
    price: 2800,
    originalPrice: null,
    badge: null,
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&q=80',
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&q=80'
    ],
    description: 'Warm sandalwood meets rich amber in this refined fragrance. Perfect for evening occasions and gatherings.',
    variants: ['50ml', '100ml'],
    featured: false
  },
  {
    id: 'kufi-embroidered-04',
    name: 'Black & Gold Kufi',
    category: 'kufis',
    price: 1600,
    originalPrice: null,
    badge: 'New',
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&q=80',
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&q=80'
    ],
    description: 'An elegant black kufi with gold embroidered accents. A modern take on a classic design.',
    variants: ['Medium', 'Large', 'XL'],
    featured: false
  },
  {
    id: 'imama-embroidered-03',
    name: 'Embroidered Prayer Imama',
    category: 'imamas',
    price: 1900,
    originalPrice: null,
    badge: null,
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&q=80',
      'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&q=80'
    ],
    description: 'Beautifully embroidered imama for everyday prayer. Soft cotton construction with detailed needlework.',
    variants: ['Small', 'Medium', 'Large'],
    featured: false
  },
  {
    id: 'attar-amber-03',
    name: 'Golden Amber Attar',
    category: 'attars',
    price: 1350,
    originalPrice: null,
    badge: 'New',
    image: 'https://images.unsplash.com/photo-1547796505-30e452b6c835?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1547796505-30e452b6c835?w=800&q=80',
      'https://images.unsplash.com/photo-1547796505-30e452b6c835?w=600&q=80'
    ],
    description: 'Rich golden amber attar with deep, warm undertones. A luxurious oil-based perfume that lasts all day.',
    variants: ['6ml', '12ml'],
    featured: true
  }
];

var MBS_CATEGORIES = [
  { id: 'kufis', name: 'Kufis', desc: 'Handcrafted traditional headwear' },
  { id: 'imamas', name: 'Imamas', desc: 'Elegant prayer caps' },
  { id: 'attars', name: 'Attars', desc: 'Traditional oil-based perfumes' },
  { id: 'fragrances', name: 'Fragrances', desc: 'Refined scents for every occasion' }
];
