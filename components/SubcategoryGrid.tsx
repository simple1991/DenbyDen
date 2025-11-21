'use client'

import { useMemo, useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import FilterModal from './FilterModal'
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
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)

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
          {/* Mobile Layout */}
          <div className="md:hidden space-y-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setIsFilterModalOpen(true)}
                className="flex items-center gap-2"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-[#DDA6B1]"
                >
                  <path
                    d="M17.8258 5H6.17422C5.31987 5 4.85896 6.00212 5.41496 6.65079L9.75926 11.7191C9.91461 11.9004 10 12.1312 10 12.3699V17.382C10 17.7607 10.214 18.107 10.5528 18.2764L12.5528 19.2764C13.2177 19.6088 14 19.1253 14 18.382V12.3699C14 12.1312 14.0854 11.9004 14.2407 11.7191L18.585 6.65079C19.141 6.00212 18.6801 5 17.8258 5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-[#DDA6B1] font-medium">Filter</span>
              </button>
              <span className="text-sm text-text-muted">{filteredProducts.length} items</span>
            </div>
            <h2 className="text-2xl font-semibold text-text">Find your {categoryName}</h2>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:block">
            <p className="text-sm uppercase tracking-[0.2em] text-text-muted">Filter</p>
            <h2 className="text-2xl font-semibold text-text">Find your {categoryName}</h2>
          </div>

          <div className="hidden md:flex flex-wrap gap-3">
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

        <div className="grid grid-cols-2 gap-4 sm:gap-6">
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

        {/* Filter Modal for Mobile */}
        <FilterModal
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          priceFilter={priceFilter}
          onPriceFilterChange={setPriceFilter}
          stockFilter={stockFilter}
          onStockFilterChange={setStockFilter}
          onApply={() => setIsFilterModalOpen(false)}
          onRemoveAll={() => setIsFilterModalOpen(false)}
          itemCount={filteredProducts.length}
        />
      </div>
    </section>
  )
}


