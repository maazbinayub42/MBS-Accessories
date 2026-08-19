// ============================================
// MBS Islamic Accessories — TypeScript Types
// ============================================

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice: number | null;
  sku: string;
  stock: number;
  status: "active" | "inactive";
  featured: boolean;
  bestSeller: boolean;
  badge: "Sale" | "New" | "Bestseller" | "Popular" | null;
  image: string;
  images: string[];
  variants: ProductVariant[];
}

export interface ProductVariant {
  name: string;
  value: string;
  price: number;
  stock: number;
  status: "active" | "inactive";
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  heroImage: string;
  bannerImage: string;
  displayOrder: number;
  featured: boolean;
  enabled: boolean;
}

export interface NavigationItem {
  id: string;
  label: string;
  url: string;
  enabled: boolean;
  order: number;
}

export interface HeroSection {
  eyebrow: string;
  heading: string;
  description: string;
  primaryButtonText: string;
  primaryButtonUrl: string;
  secondaryButtonText: string;
  secondaryButtonUrl: string;
  image: string;
  mobileImage: string;
  overlay: number;
  enabled: boolean;
}

export interface CategorySection {
  eyebrow: string;
  heading: string;
  description: string;
  items: CategorySectionItem[];
  enabled: boolean;
  order: number;
}

export interface CategorySectionItem {
  id: string;
  name: string;
  description: string;
  image: string;
  url: string;
  enabled: boolean;
}

export interface EditorialSection {
  eyebrow: string;
  heading: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  image: string;
  enabled: boolean;
  order: number;
}

export interface BrandStorySection {
  eyebrow: string;
  heading: string;
  text: string;
  text2: string;
  buttonText: string;
  buttonUrl: string;
  image: string;
  enabled: boolean;
  order: number;
}

export interface TrustBlock {
  id: string;
  title: string;
  text: string;
  icon: string;
  enabled: boolean;
}

export interface WhyMbsSection {
  eyebrow: string;
  heading: string;
  description: string;
  blocks: TrustBlock[];
  enabled: boolean;
  order: number;
}

export interface SocialSection {
  eyebrow: string;
  heading: string;
  description: string;
  enabled: boolean;
  order: number;
}

export interface WhatsAppCtaSection {
  eyebrow: string;
  heading: string;
  description: string;
  buttonText: string;
  enabled: boolean;
  order: number;
}

export interface FeaturedSection {
  eyebrow: string;
  heading: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  enabled: boolean;
  order: number;
}

export interface SignatureSection {
  eyebrow: string;
  heading: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  enabled: boolean;
  order: number;
}

export interface Homepage {
  hero: HeroSection;
  categories: CategorySection;
  featured: FeaturedSection;
  editorial: EditorialSection;
  brandStory: BrandStorySection;
  whyMbs: WhyMbsSection;
  signature: SignatureSection;
  social: SocialSection;
  whatsappCta: WhatsAppCtaSection;
}

export interface FooterLink {
  label: string;
  url: string;
}

export interface FooterLinks {
  shopLinks: FooterLink[];
  companyLinks: FooterLink[];
  supportLinks: FooterLink[];
}

export interface Footer {
  description: string;
  copyright: string;
  shopLinks: FooterLink[];
  companyLinks: FooterLink[];
  supportLinks: FooterLink[];
}

export interface Announcement {
  text: string;
  linkText: string;
  linkUrl: string;
  enabled: boolean;
}

export interface Site {
  name: string;
  tagline: string;
  logo: string;
  favicon: string;
  announcement: Announcement;
  whatsappNumber: string;
  contactPhone: string;
  email: string;
  address: string;
  businessHours: string;
}

export interface Social {
  instagram: string;
  facebook: string;
  youtube: string;
  tiktok: string;
}

export interface SeoData {
  title: string;
  description: string;
  keywords: string;
}

export interface DesignSettings {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
}

export interface MediaItem {
  id: string;
  url: string;
  name: string;
  type: string;
  createdAt: string;
}

export interface PageContent {
  heading: string;
  subheading: string;
  content: string;
}

export interface Pages {
  about: PageContent;
  contact: PageContent;
}

export interface CMSContent {
  site: Site;
  social: Social;
  navigation: NavigationItem[];
  homepage: Homepage;
  footer: Footer;
  categories: Category[];
  products: Product[];
  pages: Pages;
  design: DesignSettings;
  seo: Record<string, SeoData>;
  media: MediaItem[];
  orders: unknown[];
  customers: unknown[];
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  variant: string;
  qty: number;
}
