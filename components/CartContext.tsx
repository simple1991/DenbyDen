'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface CartItem {
  id: string
  slug: string
  title: string
  vendor: string
  price: number
  currency: string
  image: string
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addToCart: (product: Omit<CartItem, 'quantity'>, quantity?: number) => void
  updateQuantity: (id: string, quantity: number) => void
  removeItem: (id: string) => void
  getTotal: () => number
  getItemCount: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('cart')
    if (saved) {
      try {
        setItems(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to load cart', e)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

  const addToCart = (product: Omit<CartItem, 'quantity'>, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        )
      }
      return [...prev, { ...product, quantity }]
    })
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const getTotal = () => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }

  const getItemCount = () => {
    return items.reduce((sum, item) => sum + item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{ items, addToCart, updateQuantity, removeItem, getTotal, getItemCount }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}


