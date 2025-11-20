import type { Metadata } from 'next'

import SubcategoryPage from '@/components/SubcategoryPage'
import type { CategoryConfig } from '@/data/categoryConfigs'
import productsData from '@/data/products.json'
import type { Product } from '@/types/product'

const CHRISTMAS_KEYWORDS = ['christmas', 'gift', 'holiday', 'xmas', 'santa', 'snow']

const christmasConfig: Omit<CategoryConfig, 'matchProduct'> = {
  slug: 'christmas-event',
  title: 'Christmas Gift Idea',
  description: 'Make this Christmas extra special with our curated gift collection.',
  heroSubtitle: 'Cozy mugs, festive tableware, and cheerful decor ready to wrap & gift.',
  heroImage: '/example_photo/自媒体图片/f1c7b3674a516120ac12efa078dd73e.jpg',
  gradientFrom: '#FFE5EC',
  gradientTo: '#FBD2DD',
  accentColor: '#E08FA6',
  highlight: 'Free express shipping over $49 during the holiday event',
  tips: ['Limited seasonal stock', 'Gift-ready packaging on every order'],
}

const isChristmasProduct = (product: Product) => {
  if (!product.inStock) return false
  const haystack = `${product.title} ${product.description ?? ''}`.toLowerCase()
  return CHRISTMAS_KEYWORDS.some((keyword) => haystack.includes(keyword))
}

const christmasProducts = (productsData as Product[]).filter(isChristmasProduct)

export const metadata: Metadata = {
  title: 'Christmas Gift Event | DenbyDen',
  description: christmasConfig.description,
}

export default function ChristmasPage() {
  return <SubcategoryPage config={christmasConfig} products={christmasProducts} />
}


