'use client'

import { useState } from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import TopBar from '@/components/TopBar'
import Footer from '@/components/Footer'
import CartModal from '@/components/CartModal'
import { useCart } from '@/components/CartContext'
import productsData from '@/data/products.json'

interface ProductPageProps {
  params: {
    slug: string
  }
}

interface CollapsibleSectionProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

function CollapsibleSection({ title, children, defaultOpen = false }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="bg-white rounded-2xl shadow-card p-5 md:p-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left gap-4"
      >
        <h3 className="text-lg md:text-xl font-bold text-text flex items-center gap-2">
          <span className="text-[#F07E9A] text-2xl">❤</span>
          {title}
        </h3>
        <span className="text-text-muted text-2xl">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      {isOpen && (
        <div className="mt-4 text-text-muted leading-relaxed">
          {children}
        </div>
      )}
    </div>
  )
}

export default function ProductPage({ params }: ProductPageProps) {
  const { slug } = params
  const product = productsData.find((p) => p.slug === slug)
  const { addToCart, items, updateQuantity, removeItem } = useCart()
  const [showCartModal, setShowCartModal] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState<string | null>(
    product?.variants && product.variants.length > 0 ? product.variants[0].value : null
  )
  const [quantity, setQuantity] = useState(1)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [giftWrapping, setGiftWrapping] = useState(false)

  if (!product) {
    notFound()
  }

  const images = product.images || [product.image]
  const availableVariant = product.variants?.find(v => v.value === selectedVariant)
  const isVariantAvailable = !selectedVariant || availableVariant?.available !== false
  const isProductAvailable = product.inStock && isVariantAvailable

  const handleAddToCart = () => {
    if (isProductAvailable) {
      addToCart({
        id: product.id,
        slug: product.slug,
        title: product.title,
        vendor: product.vendor,
        price: product.price,
        currency: product.currency,
        image: product.image,
      }, quantity)
      setShowCartModal(true)
    }
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const youMayAlsoLike = productsData.filter((p) => p.id !== product.id).slice(0, 6)

  return (
    <>
      <TopBar />
      <Header onCartClick={() => setShowCartModal(true)} />
      <main className="bg-beige-light">
        <div className="container-custom py-4 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-16">
            {/* Image Gallery */}
            <div>
              <div className="flex gap-4">
                {images.length > 1 && (
                  <div className="hidden lg:flex flex-col gap-3 w-20">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImageIndex(idx)}
                        className={`relative w-full aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                          selectedImageIndex === idx
                            ? 'border-primary'
                            : 'border-transparent hover:border-primary/40'
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`${product.title} thumbnail ${idx + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
                <div className="relative flex-1 aspect-square bg-beige-light rounded-md overflow-hidden">
                  <Image
                    src={images[selectedImageIndex]}
                    alt={product.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
              {images.length > 1 && (
                <div className="mt-4 grid grid-cols-4 gap-2 lg:hidden">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative aspect-square rounded-md overflow-hidden border-2 transition-colors ${
                        selectedImageIndex === idx
                          ? 'border-primary'
                          : 'border-transparent hover:border-primary/40'
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.title} mobile thumbnail ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              {/* Product Title */}
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-text mb-4">
                {product.title}
              </h1>

              {/* Price */}
              <div className="mb-6">
                {product.regularPrice && product.regularPrice > product.price ? (
                  <div className="flex items-center gap-3">
                    <span className="text-2xl md:text-3xl font-bold text-text">
                      {product.currency} ${product.price.toFixed(2)}
                    </span>
                    <span className="text-lg text-text-muted line-through">
                      {product.currency} ${product.regularPrice.toFixed(2)}
                    </span>
                    <span className="text-sm font-semibold text-red-600">
                      Off
                    </span>
                  </div>
                ) : (
                  <span className="text-2xl md:text-3xl font-bold text-text">
                    {product.currency} ${product.price.toFixed(2)}
                  </span>
                )}
                <p className="text-sm text-text-muted mt-1">
                  Tax included. Shipping calculated at checkout.
                </p>
              </div>

              {/* Stock Status */}
              {product.stockStatus && (
                <div className={`mb-4 flex items-center gap-2 ${
                  product.stockStatus === 'Almost gone!' ? 'text-red-600' : 
                  product.stockStatus === 'Sold out' ? 'text-red-600' : 
                  'text-green-600'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${
                    product.stockStatus === 'Almost gone!' ? 'bg-red-600' : 
                    product.stockStatus === 'Sold out' ? 'bg-red-600' : 
                    'bg-green-600'
                  }`}></span>
                  <span className="text-sm font-medium">{product.stockStatus}</span>
                </div>
              )}

              {/* Variant Selection */}
              {product.variants && product.variants.length > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-text mb-2">
                    Style
                  </label>
                  <div className="flex gap-3">
                    {product.variants.map((variant) => (
                      <button
                        key={variant.value}
                        onClick={() => setSelectedVariant(variant.value)}
                        disabled={!variant.available}
                        className={`px-4 py-2 rounded-md border-2 font-medium transition-colors ${
                          selectedVariant === variant.value
                            ? 'border-primary bg-primary text-white'
                            : variant.available
                            ? 'border-border text-text hover:border-primary'
                            : 'border-border text-text-muted opacity-50 cursor-not-allowed'
                        }`}
                      >
                        {variant.name}
                        {!variant.available && ' (Sold out)'}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-text mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    className="w-10 h-10 rounded-md border border-border flex items-center justify-center hover:bg-beige-light disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    −
                  </button>
                  <span className="text-lg font-semibold text-text w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={increaseQuantity}
                    className="w-10 h-10 rounded-md border border-border flex items-center justify-center hover:bg-beige-light"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="mb-6">
                <button
                  onClick={handleAddToCart}
                  disabled={!isProductAvailable}
                  className={`w-full py-3 px-6 rounded-md font-semibold text-base transition-colors ${
                    isProductAvailable
                      ? 'bg-primary text-white hover:bg-primary-hover'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isProductAvailable ? 'Add to Cart' : 'Sold Out'}
                </button>
              </div>

              {/* Gift Wrapping */}
              {product.giftWrapping && (
                <div className="mb-6 border border-border rounded-xl p-4 flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setGiftWrapping(!giftWrapping)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      giftWrapping ? 'bg-primary' : 'bg-gray-300'
                    }`}
                    role="switch"
                    aria-checked={giftWrapping}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
                        giftWrapping ? 'translate-x-5' : 'translate-x-1'
                      }`}
                    />
                  </button>
                  <div>
                    <p className="text-sm font-semibold text-text">Christmas Gift Wrapping</p>
                    <p className="text-xs text-text-muted mt-1">
                      Gift wrapping may take an additional 1–2 business days for processing.
                    </p>
                  </div>
                </div>
              )}

              {/* Expected Delivery */}
              {product.expectedDelivery && (
                <div className="mb-6 flex items-center gap-2 text-sm text-text">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  <span>
                    Expected delivery date: <strong>{product.expectedDelivery}</strong>
                  </span>
                </div>
              )}

              {/* Guarantees */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2 text-sm text-text">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <span>Refund for damaged items</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-text">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  <span>Top-quality products guaranteed</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-text">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  <span>Free shipping on orders over ${product.shipping?.freeShippingThreshold || 49}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Sections */}
          <section className="w-full bg-beige-light/70 py-10 mb-16">
            <div className="container-custom space-y-5">
              {/* FEATURES - Default Open */}
              <CollapsibleSection title="FEATURES" defaultOpen={true}>
                <div className="space-y-4">
                  {product.features &&
                    product.features.map((feature, index) => {
                      const [label, ...rest] = feature.split(':')
                      return (
                        <p key={index} className="text-base text-text leading-relaxed">
                          <strong>{label?.trim()}:</strong> {rest.join(':').trim()}
                        </p>
                      )
                    })}
                </div>
              </CollapsibleSection>

              {/* DETAILS */}
              <CollapsibleSection title="DETAILS">
                <div className="space-y-2">
                  {product.details &&
                    Object.entries(product.details).map(([key, value]) => (
                      <p key={key} className="text-base text-text">
                        <strong className="capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}:
                        </strong>{' '}
                        {value}
                      </p>
                    ))}
                </div>
              </CollapsibleSection>

              {/* MATERIALS */}
              <CollapsibleSection title="MATERIALS">
                <div className="space-y-2">
                  {product.materials &&
                    Object.entries(product.materials).map(([key, value]) => (
                      <p key={key} className="text-base text-text">
                        <strong className="capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}:
                        </strong>{' '}
                        {value}
                      </p>
                    ))}
                </div>
              </CollapsibleSection>

              {/* CARE INSTRUCTION */}
              <CollapsibleSection title="CARE INSTRUCTION">
                <p className="text-base text-text">{product.careInstructions}</p>
              </CollapsibleSection>

              {/* SHIPPING & RETURN */}
              <CollapsibleSection title="SHIPPING & RETURN">
                <div className="space-y-2 text-base text-text">
                  {product.shipping && (
                    <>
                      <p>
                        Orders are shipped from our warehouse in {product.shipping.location}. Free
                        shipping on orders over ${product.shipping.freeShippingThreshold}.
                      </p>
                      <p>{product.shipping.returnPolicy}</p>
                    </>
                  )}
                </div>
              </CollapsibleSection>
            </div>
          </section>

          {/* Customer Reviews Section */}
          <section className="mb-16">
            <div className="container-custom">
              <div className="bg-white rounded-2xl shadow-card px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex text-[#F19DB2]">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-text-muted">Be the first to write a review</p>
                </div>
                <button className="px-6 py-2 rounded-full bg-pink text-text font-semibold hover:bg-pink-dark transition-colors">
                  Write a review
                </button>
              </div>
            </div>
          </section>

          {/* You May Also Like */}
          {youMayAlsoLike.some((item) => item.inStock) && (
            <section className="py-12 md:py-16 bg-beige-light mb-16">
              <div className="container-custom">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <p className="text-sm uppercase tracking-wide text-text-muted">You May Also Like</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-text">More Kawaii Finds</h2>
                  </div>
                  <Link href="/shop" className="text-sm font-semibold text-primary hover:underline">
                    Shop All Products
                  </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {youMayAlsoLike
                    .filter((item) => item.inStock)
                    .map((item) => (
                    <Link
                      key={item.id}
                      href={`/product/${item.slug}`}
                      className="bg-white rounded-2xl shadow-card p-4 group flex flex-col"
                    >
                      <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-4">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <p className="text-sm text-text-muted mb-1">{item.vendor}</p>
                      <h3 className="text-base font-semibold text-text mb-3 line-clamp-2 flex-1">
                        {item.title}
                      </h3>
                      <p className="text-lg font-bold text-text">
                        {item.currency} ${item.price.toFixed(2)}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* About DenbyDen Section */}
          <section className="bg-pink-light py-10 md:py-14 mb-15">
            <div className="container-custom">
              <h2 className="text-3xl md:text-4xl font-bold text-text mb-8 text-center">
                About DenbyDen
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-md">
                  <h3 className="text-xl font-semibold text-blue-500 mb-3">Brand Story</h3>
                  <p className="text-text-muted">
                    We're all about adding fun and style to your home. Since 2022, we've been creating cute and quality home essentials that make every day special.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-md">
                  <h3 className="text-xl font-semibold text-green-500 mb-3">Customer First</h3>
                  <p className="text-text-muted">
                    Your satisfaction is our priority. We're committed to delivering top-notch customer service and quality products.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-md">
                  <h3 className="text-xl font-semibold text-pink mb-3">Thoughtful Design</h3>
                  <p className="text-text-muted">
                    Thoughtfully designed for every home. Our products blend charm, quality, and functionality for everyday moments.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-md">
                  <h3 className="text-xl font-semibold text-purple-500 mb-3">Sustainability</h3>
                  <p className="text-text-muted">
                    We care about the planet. Our products are crafted with sustainability in mind, making your home both stylish and eco-friendly.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
      <CartModal
        isOpen={showCartModal}
        onClose={() => setShowCartModal(false)}
        items={items}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
      />
    </>
  )
}
