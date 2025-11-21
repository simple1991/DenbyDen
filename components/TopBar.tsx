'use client'

import { useState } from 'react'
import { useCurrency } from './CurrencyContext'

export default function TopBar() {
  const [isVisible, setIsVisible] = useState(true)
  const { formatPrice } = useCurrency()

  if (!isVisible) return null

  return (
    <div className="bg-topbar text-text text-sm py-2 text-center animate-fade-in">
      <div className="container-custom">
        <p>
          Free shipping on orders over {formatPrice(49)} for Canada & USA •{' '}
          <span className="font-semibold">U.S. Shipping is Back🎉</span> All prices include taxes & duties with no extra fees.
        </p>
      </div>
    </div>
  )
}

