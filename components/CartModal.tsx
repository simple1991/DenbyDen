'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface CartItem {
  id: string
  slug: string
  title: string
  vendor: string
  price: number
  currency: string
  image: string
  quantity: number
  note?: string
}

interface CartModalProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemoveItem: (id: string) => void
}

export default function CartModal({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
}: CartModalProps) {
  const [orderNote, setOrderNote] = useState('')
  const [showNote, setShowNote] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    if (isOpen) {
      window.addEventListener('keydown', handleEscape)
    }
    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const hasFreeShipping = subtotal >= 49
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-end bg-black/50 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md h-full bg-beige-light overflow-y-auto animate-slide-in-right"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-border px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-text">Your Cart</h2>
            <span className="bg-pink-light text-text px-2 py-1 rounded-full text-sm font-semibold">
              {itemCount}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-beige-light rounded-full transition-colors"
            aria-label="Close cart"
          >
            <svg className="w-5 h-5 text-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Free Shipping Banner */}
        {!hasFreeShipping && (
          <div className="bg-green-50 border-b border-green-200 px-6 py-3">
            <p className="text-sm text-green-700">
              Free Shipping On Orders Above $49
            </p>
          </div>
        )}

        {/* Cart Items */}
        <div className="px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-text-muted mb-4">Your cart is empty</p>
              <Link href="/shop" className="btn-primary inline-block" onClick={onClose}>
                Continue Shopping
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="bg-white rounded-md shadow-card p-4">
                <div className="flex gap-4">
                  {/* Product Image */}
                  <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0 bg-beige-light">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-text-muted mb-1">{item.vendor}</p>
                    <Link
                      href={`/product/${item.slug}`}
                      className="text-sm font-semibold text-text hover:text-primary line-clamp-2 mb-2"
                      onClick={onClose}
                    >
                      {item.title}
                    </Link>
                    <p className="text-base font-semibold text-text mb-3">
                      {item.currency} ${(item.price * item.quantity).toFixed(2)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 border border-border rounded-md">
                        <button
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="px-3 py-1 hover:bg-beige-light transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        <span className="px-2 text-sm font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 hover:bg-beige-light transition-colors"
                          aria-label="Increase quantity"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-sm text-text-muted hover:text-primary transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Order Note */}
        {items.length > 0 && (
          <div className="px-6 py-4 border-t border-border">
            <button
              onClick={() => setShowNote(!showNote)}
              className="w-full flex items-center justify-between text-sm text-text-muted hover:text-text transition-colors"
            >
              <span>Add Order Note</span>
              <svg
                className={`w-4 h-4 transition-transform ${showNote ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showNote && (
              <textarea
                value={orderNote}
                onChange={(e) => setOrderNote(e.target.value)}
                placeholder="Special instructions for your order..."
                className="mt-2 w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                rows={3}
              />
            )}
          </div>
        )}

        {/* Footer */}
        {items.length > 0 && (
          <div className="sticky bottom-0 bg-white border-t border-border px-6 py-4 space-y-3">
            <div className="flex justify-between text-lg font-semibold text-text">
              <span>Subtotal</span>
              <span>{items[0]?.currency || 'CAD'} ${subtotal.toFixed(2)}</span>
            </div>
            <p className="text-xs text-text-muted">
              Tax included. <span className="underline">Shipping</span> calculated at checkout.
            </p>
            <div className="flex gap-3">
              <Link
                href="/cart"
                className="flex-1 btn-secondary text-center"
                onClick={onClose}
              >
                View Cart ({itemCount})
              </Link>
              <Link
                href="/checkout"
                className="flex-1 btn-primary text-center"
                onClick={onClose}
              >
                Check Out - {items[0]?.currency || 'CAD'} ${subtotal.toFixed(2)}
              </Link>
            </div>
            <Link
              href="/shop"
              className="block text-center text-sm text-text-muted hover:text-primary transition-colors"
              onClick={onClose}
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}



