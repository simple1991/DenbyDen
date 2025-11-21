'use client'

import Link from 'next/link'

import ProductCard from './ProductCard'
import type { Product } from '@/types/product'

interface ProductGridProps {
  products: Product[]
  title?: string
  subtitle?: string
  showViewMore?: boolean
  onAddToCart?: () => void
}

export default function ProductGrid({
  products,
  title,
  subtitle,
  showViewMore = false,
  onAddToCart,
}: ProductGridProps) {
  return (
    <section className="py-4 md:py-12">
      <div className="container-custom">
        {(title || subtitle) && (
          <div className="text-center mb-8 md:mb-12">
            {title && (
              <h2 className="text-2xl md:text-3xl font-bold text-text mb-2">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-text-muted text-base md:text-lg">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>

        {showViewMore && (
          <div className="text-center mt-4">
            <Link href="/shop" className="btn-secondary inline-block">
              View More
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

