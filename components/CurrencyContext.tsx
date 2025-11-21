'use client'

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
  type ReactNode,
} from 'react'

export type CurrencyCode = 'USD' | 'EUR' | 'JPY' | 'GBP' | 'CNY'

interface CurrencyConfig {
  label: string
  symbol: string
  flag: string
  flagSrc: string
  rate: number // relative to CNY
  decimals?: number
  locale: string
}

const currencyConfigs: Record<CurrencyCode, CurrencyConfig> = {
  USD: {
    label: 'USD',
    symbol: '$',
    flag: 'USA',
    flagSrc: '/flags/us.svg',
    rate: 0.14,
    locale: 'en-US',
    decimals: 2,
  },
  EUR: {
    label: 'EUR',
    symbol: '€',
    flag: 'EU',
    flagSrc: '/flags/eu.svg',
    rate: 0.13,
    locale: 'de-DE',
    decimals: 2,
  },
  JPY: {
    label: 'JPY',
    symbol: '¥',
    flag: 'Japan',
    flagSrc: '/flags/jp.svg',
    rate: 20,
    locale: 'ja-JP',
    decimals: 0,
  },
  GBP: {
    label: 'GBP',
    symbol: '£',
    flag: 'United Kingdom',
    flagSrc: '/flags/gb.svg',
    rate: 0.11,
    locale: 'en-GB',
    decimals: 2,
  },
  CNY: {
    label: 'CNY',
    symbol: '¥',
    flag: 'China',
    flagSrc: '/flags/cn.svg',
    rate: 1,
    locale: 'zh-CN',
    decimals: 2,
  },
}

interface CurrencyContextValue {
  selectedCurrency: CurrencyCode
  setSelectedCurrency: (currency: CurrencyCode) => void
  formatPrice: (valueInCny: number, currency?: CurrencyCode) => string
  convertPrice: (valueInCny: number, currency?: CurrencyCode) => number
  currencyOptions: Array<{ code: CurrencyCode; label: string; symbol: string; flag: string }>
  baseCurrency: 'CNY'
}

const CurrencyContext = createContext<CurrencyContextValue | undefined>(undefined)

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>('USD')

  useEffect(() => {
    const saved = localStorage.getItem('selectedCurrency')
    if (saved && saved in currencyConfigs) {
      setSelectedCurrency(saved as CurrencyCode)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('selectedCurrency', selectedCurrency)
  }, [selectedCurrency])

  const convertPrice = useCallback(
    (valueInCny: number, currency: CurrencyCode = selectedCurrency) => {
      const config = currencyConfigs[currency]
      return valueInCny * config.rate
    },
    [selectedCurrency]
  )

  const formatPrice = useCallback(
    (valueInCny: number, currency: CurrencyCode = selectedCurrency) => {
      const config = currencyConfigs[currency]
      const decimals = config.decimals ?? 2
      const formatter = new Intl.NumberFormat(config.locale, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })
      return `${currency} ${config.symbol}${formatter.format(convertPrice(valueInCny, currency))}`
    },
    [convertPrice, selectedCurrency]
  )

  const currencyOptions = useMemo(
    () =>
      (Object.keys(currencyConfigs) as CurrencyCode[]).map((code) => ({
        code,
        label: currencyConfigs[code].label,
        symbol: currencyConfigs[code].symbol,
        flag: currencyConfigs[code].flag,
        flagSrc: currencyConfigs[code].flagSrc,
      })),
    []
  )

  const value = useMemo(
    () => ({
      selectedCurrency,
      setSelectedCurrency,
      formatPrice,
      convertPrice,
      currencyOptions,
      baseCurrency: 'CNY' as const,
    }),
    [selectedCurrency, formatPrice, convertPrice, currencyOptions]
  )

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider')
  }
  return context
}


