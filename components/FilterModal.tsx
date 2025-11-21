'use client'

import { useState, useEffect } from 'react'

interface FilterModalProps {
  isOpen: boolean
  onClose: () => void
  sortBy: string
  onSortByChange: (value: string) => void
  priceFilter: string
  onPriceFilterChange: (value: string) => void
  stockFilter: 'all' | 'in'
  onStockFilterChange: (value: 'all' | 'in') => void
  onApply: () => void
  onRemoveAll: () => void
  itemCount: number
}

const SORT_OPTIONS = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-low' },
  { label: 'Price: High to Low', value: 'price-high' },
]

const PRICE_FILTERS = [
  { label: 'All prices', value: 'all' },
  { label: 'Under $10', value: 'under-10' },
  { label: '$10 - $15', value: '10-15' },
  { label: 'Over $15', value: 'over-15' },
]

const AVAILABILITY_OPTIONS = [
  { label: 'All', value: 'all' },
  { label: 'In stock only', value: 'in' },
]

export default function FilterModal({
  isOpen,
  onClose,
  sortBy,
  onSortByChange,
  priceFilter,
  onPriceFilterChange,
  stockFilter,
  onStockFilterChange,
  onApply,
  onRemoveAll,
  itemCount,
}: FilterModalProps) {
  const [localSortBy, setLocalSortBy] = useState(sortBy)
  const [localPriceFilter, setLocalPriceFilter] = useState(priceFilter)
  const [localStockFilter, setLocalStockFilter] = useState(stockFilter)
  const [showAvailability, setShowAvailability] = useState(false)
  const [showPrice, setShowPrice] = useState(false)

  // Sync local state when modal opens
  useEffect(() => {
    if (isOpen) {
      setLocalSortBy(sortBy)
      setLocalPriceFilter(priceFilter)
      setLocalStockFilter(stockFilter)
      setShowAvailability(false)
      setShowPrice(false)
    }
  }, [isOpen, sortBy, priceFilter, stockFilter])

  if (!isOpen) return null

  const handleApply = () => {
    onSortByChange(localSortBy)
    onPriceFilterChange(localPriceFilter)
    onStockFilterChange(localStockFilter)
    onApply()
  }

  const handleRemoveAll = () => {
    setLocalSortBy('featured')
    setLocalPriceFilter('all')
    setLocalStockFilter('all')
    onSortByChange('featured')
    onPriceFilterChange('all')
    onStockFilterChange('all')
    onRemoveAll()
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 md:hidden"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 md:hidden flex flex-col bg-beige-light">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-white">
          <div className="flex items-center gap-2">
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
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-text-muted">{itemCount} items</span>
            <button
              onClick={onClose}
              className="p-2 hover:bg-beige-light rounded-full transition-colors"
              aria-label="Close filter"
            >
              <svg
                className="w-5 h-5 text-text"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Sort By */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-text">Sort By:</label>
            <div className="flex items-center gap-2">
              <select
                value={localSortBy}
                onChange={(e) => setLocalSortBy(e.target.value)}
                className="px-3 py-1.5 rounded-full border border-border bg-white text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/30 appearance-none pr-8"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <svg
                className="w-4 h-4 text-text-muted pointer-events-none -ml-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* Availability */}
          <div>
            <button
              onClick={() => setShowAvailability(!showAvailability)}
              className="w-full flex items-center justify-between p-3 bg-white rounded-lg border border-border hover:bg-beige-light transition-colors"
            >
              <span className="text-sm font-semibold text-text">Availability</span>
              <div className="flex items-center gap-2">
                <svg
                  className={`w-4 h-4 text-text-muted transition-transform ${showAvailability ? 'rotate-90' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </button>
            {showAvailability && (
              <div className="mt-2 bg-white rounded-lg border border-border overflow-hidden">
                {AVAILABILITY_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setLocalStockFilter(option.value as 'all' | 'in')
                      setShowAvailability(false)
                    }}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                      localStockFilter === option.value
                        ? 'bg-[#DDA6B1]/10 text-[#DDA6B1] font-semibold'
                        : 'text-text hover:bg-beige-light'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Price */}
          <div>
            <button
              onClick={() => setShowPrice(!showPrice)}
              className="w-full flex items-center justify-between p-3 bg-white rounded-lg border border-border hover:bg-beige-light transition-colors"
            >
              <span className="text-sm font-semibold text-text">Price</span>
              <div className="flex items-center gap-2">
                <svg
                  className={`w-4 h-4 text-text-muted transition-transform ${showPrice ? 'rotate-90' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </button>
            {showPrice && (
              <div className="mt-2 bg-white rounded-lg border border-border overflow-hidden">
                {PRICE_FILTERS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setLocalPriceFilter(option.value)
                      setShowPrice(false)
                    }}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                      localPriceFilter === option.value
                        ? 'bg-[#DDA6B1]/10 text-[#DDA6B1] font-semibold'
                        : 'text-text hover:bg-beige-light'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border bg-white p-4 flex items-center justify-between gap-4">
          <button
            onClick={handleRemoveAll}
            className="text-sm text-text underline hover:text-primary transition-colors"
          >
            Remove All
          </button>
          <button
            onClick={handleApply}
            className="flex-1 bg-[#DDA6B1] text-white rounded-full px-6 py-3 font-semibold hover:bg-[#c895a0] transition-colors"
          >
            Apply
          </button>
        </div>
      </div>
    </>
  )
}

