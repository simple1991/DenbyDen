import type { Metadata } from 'next'

import SubcategoryPage from '@/components/SubcategoryPage'
import type { CategoryConfig } from '@/data/categoryConfigs'
import productsData from '@/data/products.json'
import type { Product } from '@/types/product'

const christmasConfig: Omit<CategoryConfig, 'matchProduct'> = {
  slug: 'friends-gift-event',
  title: 'Friend Gift Ideas',
  description: 'Cute, cozy gifts picked for besties, roommates, and work friends—no holiday needed.',
  heroSubtitle: 'Lights, scents, and everyday little treasures that make them smile after a long day.',
  heroImage: '/example_photo/自媒体图片/f1c7b3674a516120ac12efa078dd73e.webp',
  gradientFrom: '#FFE5EC',
  gradientTo: '#FBD2DD',
  accentColor: '#E08FA6',
  highlight: 'Free express shipping over $49 on friend-gift orders',
  tips: ['Easy “add-to-cart and send” gifts for any occasion', 'Gift-ready packaging on every order'],
}

const GIFT_PRODUCT_IDS = [
  'mws-001-cordless',
  'zenden-001-ceramic-burner',
  'cwl-005-amber',
  'dd-cloud-tray-001',
]

const christmasProducts = (productsData as Product[]).filter(
  (product) => product.inStock && GIFT_PRODUCT_IDS.includes(product.id)
)

export const metadata: Metadata = {
  title: 'Friend Gift Ideas | DenbyDen',
  description: christmasConfig.description,
}

export default function ChristmasPage() {
  return <SubcategoryPage config={christmasConfig} products={christmasProducts} />
}


