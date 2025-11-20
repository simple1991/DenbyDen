import type { Product } from '@/types/product'

export interface CategoryConfig {
  slug: string
  title: string
  description: string
  heroSubtitle: string
  heroImage: string
  gradientFrom: string
  gradientTo: string
  accentColor: string
  highlight: string
  tips?: string[]
  matchProduct: (product: Product) => boolean
}

const matchByCategory = (targetCategories: string[]) => {
  const normalized = targetCategories.map((item) => item.toLowerCase())
  return (product: Product) => normalized.includes((product.category || '').toLowerCase())
}

const matchByKeywords = (keywords: string[]) => {
  const normalized = keywords.map((item) => item.toLowerCase())
  return (product: Product) => {
    const haystack = `${product.title} ${product.description ?? ''}`.toLowerCase()
    return normalized.some((keyword) => haystack.includes(keyword))
  }
}

export const categoryConfigs: Record<string, CategoryConfig> = {
  bowls: {
    slug: 'bowls',
    title: 'Bowls',
    description: 'From cereal to soup, find the perfect bowl to brighten up every meal.',
    heroSubtitle: 'Adorable and practical bowls that make every dish photo-worthy.',
    heroImage: '/example_photo/产品主图/主图1.png',
    gradientFrom: '#F9ECE5',
    gradientTo: '#FBD8CC',
    accentColor: '#E4B8C3',
    highlight: 'Free shipping on orders over $49',
    tips: ['Mix & match different colors for a cozy tablescape', 'Dishwasher safe & gift-ready packaging'],
    matchProduct: matchByKeywords(['bowl']),
  },
  plates: {
    slug: 'plates',
    title: 'Plates',
    description: 'Dine in style with our collection of charming plates.',
    heroSubtitle: 'Layered textures, playful patterns, and ready for your next dinner party.',
    heroImage: '/example_photo/产品主图/主图2.png',
    gradientFrom: '#FFF5EA',
    gradientTo: '#FFE1C6',
    accentColor: '#F3C7A6',
    highlight: 'Buy 3 plates, save 10%',
    tips: ['Pair with matching bowls for a complete set', 'Hand-polished rim for a premium feel'],
    matchProduct: matchByCategory(['Plates']),
  },
  dinnerware: {
    slug: 'dinnerware',
    title: 'Dinnerware Set',
    description: 'Make every meal a special occasion with beautifully designed sets.',
    heroSubtitle: 'Curated bundles with everything you need for weekday dinners & weekend brunch.',
    heroImage: '/example_photo/产品主图/主图3.png',
    gradientFrom: '#F8F2FF',
    gradientTo: '#E8D8FF',
    accentColor: '#C9B6E4',
    highlight: 'Limited-time bundle pricing',
    tips: ['Comes with matching plates, bowls, and mugs', 'Perfect for housewarming gifts'],
    matchProduct: matchByCategory(['Kitchen Essentials']),
  },
  glassware: {
    slug: 'glassware',
    title: 'Glassware',
    description: 'Raise a glass with our stunning glassware collection.',
    heroSubtitle: 'Crystal-clear finishes and cute motifs for every sip.',
    heroImage: '/example_photo/产品主图/主图4.png',
    gradientFrom: '#E8F6FF',
    gradientTo: '#CDE8F9',
    accentColor: '#A7D8F4',
    highlight: 'Buy 2 get the 3rd 40% off',
    tips: ['Heat-resistant borosilicate glass', 'Perfect for iced lattes & fruit teas'],
    matchProduct: matchByCategory(['Drinkware']),
  },
  mugs: {
    slug: 'mugs',
    title: 'Ceramic Mugs',
    description: 'Sipping your favorite drink just got cuter.',
    heroSubtitle: 'Hand-painted details, ergonomic handles, and seasonal specials.',
    heroImage: '/example_photo/产品主图/主图1.png',
    gradientFrom: '#FFF0F3',
    gradientTo: '#FBD7E2',
    accentColor: '#F2B5C4',
    highlight: 'Gift box & spoon set included for select mugs',
    tips: ['Microwave & dishwasher safe', 'Available in multiple capacities'],
    matchProduct: matchByCategory(['Ceramic Mugs']),
  },
  storage: {
    slug: 'storage',
    title: 'Home Storage',
    description: 'Get organized in style with chic and functional storage.',
    heroSubtitle: 'Cute bins & jars that make tidying feel effortless.',
    heroImage: '/example_photo/产品主图/主图2.png',
    gradientFrom: '#F5FFF0',
    gradientTo: '#DBF5D1',
    accentColor: '#C4E1B2',
    highlight: 'Stackable & label-ready designs',
    tips: ['Food-safe materials', 'Transparent lids for easy viewing'],
    matchProduct: matchByCategory(['Kitchen Essentials']),
  },
  accessories: {
    slug: 'accessories',
    title: 'Home Accessories',
    description: 'Sprinkle personality into your space with charming decor.',
    heroSubtitle: 'Art prints, trinket trays, and everything in between.',
    heroImage: '/example_photo/产品主图/主图3.png',
    gradientFrom: '#FFF8EE',
    gradientTo: '#FFE3C8',
    accentColor: '#F6C998',
    highlight: 'New drops every Friday',
    matchProduct: matchByCategory(['Home Accessories']),
  },
  rugs: {
    slug: 'rugs',
    title: 'Bath Mat & Rugs',
    description: 'Cozy up your bathroom with soft and stylish mats.',
    heroSubtitle: 'Non-slip, ultra-plush, and fast-drying fibers.',
    heroImage: '/example_photo/产品主图/主图4.png',
    gradientFrom: '#F0F5FF',
    gradientTo: '#D6E0FB',
    accentColor: '#B6C9FF',
    highlight: 'Machine washable',
    tips: ['Perfect for bathroom & bedside', 'Soft-touch microfiber pile'],
    matchProduct: matchByCategory(['Bath Mats']),
  },
  doormats: {
    slug: 'doormats',
    title: 'Welcome Doormats',
    description: 'Make a cute first impression with playful doormats.',
    heroSubtitle: 'Outdoor-safe coir fibers with vibrant prints.',
    heroImage: '/example_photo/自媒体图片/f1c7b3674a516120ac12efa078dd73e.jpg',
    gradientFrom: '#FFF6E8',
    gradientTo: '#FFE0B8',
    accentColor: '#EBBF7E',
    highlight: 'Weather resistant coating',
    tips: ['Shake clean or vacuum', 'Fits standard 24” doorways'],
    matchProduct: matchByCategory(['Doormats']),
  },
}


