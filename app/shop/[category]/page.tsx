import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import SubcategoryPage from '@/components/SubcategoryPage'
import { categoryConfigs } from '@/data/categoryConfigs'
import productsData from '@/data/products.json'
import type { CategoryConfig } from '@/data/categoryConfigs'
import type { Product } from '@/types/product'

interface CategoryPageProps {
  params: {
    category: string
  }
}

const getConfig = (slug: string): CategoryConfig | undefined => categoryConfigs[slug]

const filterProducts = (config: CategoryConfig): Product[] => {
  return (productsData as Product[]).filter((product) => config.matchProduct(product))
}

export function generateStaticParams() {
  return Object.keys(categoryConfigs).map((slug) => ({ category: slug }))
}

export function generateMetadata({ params }: CategoryPageProps): Metadata {
  const config = getConfig(params.category)
  if (!config) {
    return {
      title: 'Collection - DenbyDen',
    }
  }
  return {
    title: `${config.title} | DenbyDen`,
    description: config.description,
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const config = getConfig(params.category)
  if (!config) {
    return notFound()
  }

  const products = filterProducts(config)
  const { matchProduct: _match, ...displayConfig } = config

  return <SubcategoryPage config={displayConfig} products={products} />
}


