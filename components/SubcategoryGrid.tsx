'use client'

import { useMemo, useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import type { Product } from '@/types/product'

const PRICE_FILTERS = [
  { label: 'All prices', value: 'all' },
  { label: 'Under $10', value: 'under-10' },
  { label: '$10 - $15', value: '10-15' },
  { label: 'Over $15', value: 'over-15' },
]

const ITEMS_PER_PAGE = 12

interface SubcategoryGridProps {
  products: Product[]
  categoryName: string
}

export default function SubcategoryGrid({ products, categoryName }: SubcategoryGridProps) {
  const [sortBy, setSortBy] = useState('featured')
  const [priceFilter, setPriceFilter] = useState('all')
  const [stockFilter, setStockFilter] = useState<'all' | 'in'>('all')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setCurrentPage(1)
  }, [sortBy, priceFilter, stockFilter])

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (stockFilter === 'in' && !product.inStock) {
        return false
      }

      if (priceFilter === 'under-10' && product.price >= 10) return false
      if (priceFilter === '10-15' && (product.price < 10 || product.price > 15)) return false
      if (priceFilter === 'over-15' && product.price <= 15) return false

      return true
    })
  }, [products, stockFilter, priceFilter])

  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts]
    if (sortBy === 'price-low') {
      return list.sort((a, b) => a.price - b.price)
    }
    if (sortBy === 'price-high') {
      return list.sort((a, b) => b.price - a.price)
    }
    return list
  }, [filteredProducts, sortBy])

  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / ITEMS_PER_PAGE))
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  return (
    <section className="py-10 md:py-16 bg-white">
      <div className="container-custom space-y-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-text-muted">Filter</p>
            <h2 className="text-2xl font-semibold text-text">Find your {categoryName}</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <select
              className="filter-select"
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
            >
              {PRICE_FILTERS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select
              className="filter-select"
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value as 'all' | 'in')}
            >
              <option value="all">All stock</option>
              <option value="in">In stock only</option>
            </select>
            <select
              className="filter-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {paginatedProducts.length > 0 ? (
            paginatedProducts.map((product) => <ProductCard key={product.id} product={product} />)
          ) : (
            <div className="col-span-full text-center py-16">
              <p className="text-lg text-text-muted">No products match the selected filters.</p>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, idx) => {
              const page = idx + 1
              const isActive = currentPage === page
              return (
                <button
                  key={`page-${page}`}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`h-10 w-10 rounded-full border transition-colors ${
                    isActive
                      ? 'bg-text text-white border-text'
                      : 'border-border text-text hover:bg-beige-light'
                  }`}
                >
                  {page}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}


