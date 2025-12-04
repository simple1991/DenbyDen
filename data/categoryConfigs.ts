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
  'pet-care': {
    slug: 'pet-care',
    title: 'Pet Care',
    description: 'Pamper your furry best friends with fresh scents and gentle care.',
    heroSubtitle: 'Gentle, lick-safe formulas and calming scents for every cuddle session.',
    heroImage: '/example_photo/分类图片/group_01.webp',
    gradientFrom: '#FFF3E8',
    gradientTo: '#FFE4D0',
    accentColor: '#F2B58C',
    highlight: 'Pet-safe, plant-based care for everyday messes',
    tips: ['Perfect for multi-pet households', 'Designed for sensitive skin & noses'],
    matchProduct: matchByCategory(['Pet Cleaning & Grooming', 'Dog Grooming & Deodorizers']),
  },
  'scent-glow': {
    slug: 'scent-glow',
    title: 'Scent & Glow',
    description: 'Set the perfect mood with soothing aromas and a warm, gentle glow.',
    heroSubtitle: 'Create a cozy, spa-like corner with soft light and calming fragrance.',
    heroImage: '/example_photo/分类图片/group_02.webp',
    gradientFrom: '#FFF5F5',
    gradientTo: '#FFE8ED',
    accentColor: '#F3AFC2',
    highlight: 'Relaxing light + fragrance combos for night-in rituals',
    tips: ['Pair with your favorite candles or oils', 'Perfect for bedside and reading nooks'],
    matchProduct: matchByCategory(['Lights', 'Home Decor & Fragrance']),
  },
  'tidy-store': {
    slug: 'tidy-store',
    title: 'Tidy & Store',
    description: 'Turn clutter into calm with chic baskets and smart organizers.',
    heroSubtitle: 'Store more, see more, and keep every corner peacefully in order.',
    heroImage: '/example_photo/分类图片/group_03.webp',
    gradientFrom: '#F4FFF6',
    gradientTo: '#E0F6EB',
    accentColor: '#A7D8B5',
    highlight: 'Space-saving designs for every “dumping zone” at home',
    tips: ['Great for under-bed and closet organization', 'Mix and match sizes for flexible storage'],
    matchProduct: matchByCategory(['Home Organization & Storage', 'Home Decor & Storage']),
  },
  decal: {
    slug: 'decal',
    title: 'Wall Decal',
    description: 'These delicate wall decals bloom on the wall like warm sunlight, filling the space with tender, homey vibes.',
    heroSubtitle: 'Peel, stick, and transform a blank wall into a soft, lived-in story.',
    heroImage: '/example_photo/分类图片/group_09.webp',
    gradientFrom: '#FFFDF3',
    gradientTo: '#FFEED9',
    accentColor: '#F0C691',
    highlight: 'Rental-friendly, removable wall upgrades in minutes',
    tips: ['Perfect for bedrooms, nurseries, and hallways', 'Try clustering multiple decals for a mural effect'],
    matchProduct: matchByKeywords(['decal', 'wall decal', 'wall sticker', 'wall art']),
  },
  bowls: {
    slug: 'bowls',
    title: 'Bowls',
    description: 'From cereal to soup, find the perfect bowl to brighten up every meal.',
    heroSubtitle: 'Adorable and practical bowls that make every dish photo-worthy.',
    heroImage: '/example_photo/分类图片/group_04.webp',
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
    heroImage: '/example_photo/分类图片/group_06.webp',
    gradientFrom: '#FFF5EA',
    gradientTo: '#FFE1C6',
    accentColor: '#F3C7A6',
    highlight: 'Buy 3 plates, save 10%',
    tips: ['Pair with matching bowls for a complete set', 'Hand-polished rim for a premium feel'],
    matchProduct: matchByCategory(['Plates']),
  },
  mugs: {
    slug: 'mugs',
    title: 'Ceramic Mugs',
    description: 'Sipping your favorite drink just got cuter.',
    heroSubtitle: 'Hand-painted details, ergonomic handles, and seasonal specials.',
    heroImage: '/example_photo/分类图片/group_05.webp',
    gradientFrom: '#FFF0F3',
    gradientTo: '#FBD7E2',
    accentColor: '#F2B5C4',
    highlight: 'Gift box & spoon set included for select mugs',
    tips: ['Microwave & dishwasher safe', 'Available in multiple capacities'],
    matchProduct: matchByCategory(['Ceramic Mugs']),
  },
  rugs: {
    slug: 'rugs',
    title: 'Bath Mat & Rugs',
    description: 'Cozy up your bathroom with soft and stylish mats.',
    heroSubtitle: 'Non-slip, ultra-plush, and fast-drying fibers.',
    heroImage: '/example_photo/分类图片/group_07.webp',
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
    heroImage: '/example_photo/分类图片/group_08.webp',
    gradientFrom: '#FFF6E8',
    gradientTo: '#FFE0B8',
    accentColor: '#EBBF7E',
    highlight: 'Weather resistant coating',
    tips: ['Shake clean or vacuum', 'Fits standard 24” doorways'],
    matchProduct: matchByCategory(['Doormats']),
  },
}


