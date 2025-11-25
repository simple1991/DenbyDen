'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { useCurrency } from './CurrencyContext'
import { useCurrencySelectorOpen, useCurrencyChange } from '@/hooks/useAnalytics'
import { usePathname } from 'next/navigation'

interface CurrencySelectorProps {
  className?: string
  fullWidth?: boolean
}

export default function CurrencySelector({ className = '', fullWidth = false }: CurrencySelectorProps) {
  const { selectedCurrency, setSelectedCurrency, currencyOptions } = useCurrency()
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const current = currencyOptions.find((option) => option.code === selectedCurrency)!
  const pathname = usePathname()
  
  // 获取当前页面类型
  const getPageType = (): 'home' | 'product_detail' | 'shop' | 'category' | 'about' | 'contact' | 'faq' | 'christmas' => {
    if (pathname === '/') return 'home'
    if (pathname.startsWith('/product/')) return 'product_detail'
    if (pathname === '/shop') return 'shop'
    if (pathname.startsWith('/shop/')) return 'category'
    if (pathname === '/about') return 'about'
    if (pathname === '/contact') return 'contact'
    if (pathname === '/faq') return 'faq'
    if (pathname === '/christmas') return 'christmas'
    return 'home'
  }
  
  const pageType = getPageType()
  
  // 获取位置
  const getLocation = (): 'header_desktop' | 'header_mobile' | 'mobile_menu' => {
    if (fullWidth) return 'mobile_menu'
    if (typeof window !== 'undefined' && window.innerWidth < 768) return 'header_mobile'
    return 'header_desktop'
  }
  
  // 埋点hooks
  const handleCurrencySelectorOpen = useCurrencySelectorOpen()
  const handleCurrencyChange = useCurrencyChange()
  
  // 记录打开状态
  const hasTrackedOpen = useRef(false)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (code: typeof selectedCurrency) => {
    const previousCurrency = selectedCurrency
    const newOption = currencyOptions.find((option) => option.code === code)!
    
    // 货币变更埋点
    handleCurrencyChange(
      previousCurrency,
      code,
      newOption.code,
      newOption.symbol,
      getLocation(),
      pageType
    )
    
    setSelectedCurrency(code)
    setIsOpen(false)
  }
  
  const handleOpen = () => {
    setIsOpen((prev) => {
      const newState = !prev
      if (newState && !hasTrackedOpen.current) {
        // 货币选择器打开埋点
        handleCurrencySelectorOpen(selectedCurrency, getLocation(), pageType)
        hasTrackedOpen.current = true
      }
      if (!newState) {
        hasTrackedOpen.current = false
      }
      return newState
    })
  }

  return (
    <div className={`relative inline-flex ${className}`} ref={containerRef}>
      <button
        type="button"
        className={`inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm font-medium text-text hover:border-primary transition-colors whitespace-nowrap ${
          fullWidth ? 'w-full justify-between' : 'justify-center min-w-[130px]'
        }`}
        onClick={handleOpen}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="relative inline-flex h-4 w-6 overflow-hidden rounded-sm border border-border bg-white">
          <Image src={current.flagSrc} alt={current.flag} fill sizes="24px" className="object-cover" />
        </span>
        <span className="flex items-center gap-1">
          {current.code}
          <span className="text-text-muted">{current.symbol}</span>
        </span>
        <svg
          className={`w-4 h-4 text-text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 rounded-xl border border-border bg-white shadow-lg z-50">
          {currencyOptions.map((option) => (
            <button
              key={option.code}
              type="button"
              onClick={() => handleSelect(option.code)}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-beige-light ${
                option.code === selectedCurrency ? 'text-primary font-semibold' : 'text-text'
              }`}
              role="option"
              aria-selected={option.code === selectedCurrency}
            >
              <span className="relative inline-flex h-4 w-6 overflow-hidden rounded-sm border border-border bg-white">
                <Image src={option.flagSrc} alt={option.flag} fill sizes="24px" className="object-cover" />
              </span>
              <div className="flex flex-col items-start leading-tight">
                <span>
                  {option.code} <span className="text-text-muted">{option.symbol}</span>
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}


