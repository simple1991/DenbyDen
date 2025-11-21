'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from './CartContext'
import type { Product } from '@/types/product'

interface ProductCardProps {
  product: Product
  onAddToCart?: () => void
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { addToCart } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (product.inStock) {
      addToCart({
        id: product.id,
        slug: product.slug,
        title: product.title,
        vendor: product.vendor,
        price: product.price,
        currency: product.currency,
        image: product.image,
      })
      if (onAddToCart) {
        onAddToCart()
      }
    }
  }

  return (
    <div className="card card-hover overflow-hidden group">
      {/* Image Container */}
      <div className="relative w-full aspect-[5/4] overflow-hidden bg-beige-light">
        <Link href={`/product/${product.slug}`} className="absolute inset-0 block">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </Link>

        {!product.inStock && (
          <div className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded">
            Sold out
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 flex justify-center pb-4 pointer-events-none opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button
            type="button"
            onClick={handleAddToCart}
            className="pointer-events-auto px-5 py-2 rounded-full text-sm font-semibold text-white bg-primary hover:bg-primary-hover disabled:bg-gray-400 disabled:cursor-not-allowed shadow-card"
            disabled={!product.inStock}
          >
            {product.inStock ? 'Add to Cart' : 'Sold Out'}
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <Link href={`/product/${product.slug}`} className="block">
          <h3 className="text-sm font-semibold text-text mb-2 line-clamp-4 min-h-[4.5rem]">
            {product.title}
          </h3>
        </Link>
        <p className="text-sm text-text-muted mb-2">{product.vendor}</p>
        <p className="text-base sm:text-lg font-semibold text-text">
          {product.currency} ${product.price.toFixed(2)}
        </p>
      </div>
    </div>
  )
}

