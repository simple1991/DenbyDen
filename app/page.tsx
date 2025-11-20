'use client'

import { useState, useEffect } from 'react'
import TopBar from '@/components/TopBar'
import Header from '@/components/Header'
import HeroBanner from '@/components/HeroBanner'
import FeatureBanner from '@/components/FeatureBanner'
import ProductGrid from '@/components/ProductGrid'
import Footer from '@/components/Footer'
import EmailCaptureModal from '@/components/EmailCaptureModal'
import ReviewsCarousel from '@/components/ReviewsCarousel'
import FAQSection from '@/components/FAQSection'
import CartModal from '@/components/CartModal'
import { CartProvider, useCart } from '@/components/CartContext'
import Link from 'next/link'
import Image from 'next/image'
import productsData from '@/data/products.json'

const collections = [
  {
    name: 'Bowls',
    description: 'From cereal to soup, find the perfect bowl to brighten up every meal.',
    image: '/example_photo/产品主图/主图1.png',
    url: '/shop/bowls',
  },
  {
    name: 'Plates',
    description: 'Dine in style with our collection of charming plates.',
    image: '/example_photo/产品主图/主图2.png',
    url: '/shop/plates',
  },
  {
    name: 'Dinnerware Set',
    description: 'Make every meal a special occasion with beautifully designed sets.',
    image: '/example_photo/产品主图/主图3.png',
    url: '/shop/dinnerware',
  },
  {
    name: 'Glassware',
    description: 'Raise a glass with our stunning glassware collection.',
    image: '/example_photo/产品主图/主图4.png',
    url: '/shop/glassware',
  },
  {
    name: 'Ceramic Mugs',
    description: 'Sipping your favorite drink just got cuter!',
    image: '/example_photo/产品主图/主图1.png',
    url: '/shop/mugs',
  },
  {
    name: 'Home Storage',
    description: 'Get organized in style with chic and functional storage.',
    image: '/example_photo/产品主图/主图2.png',
    url: '/shop/storage',
  },
  {
    name: 'Home Accessories',
    description: 'Sprinkle personality into your space with charming decor.',
    image: '/example_photo/产品主图/主图3.png',
    url: '/shop/accessories',
  },
  {
    name: 'Bath Mat&Rugs',
    description: 'Cozy up your bathroom with soft and stylish mats.',
    image: '/example_photo/产品主图/主图4.png',
    url: '/shop/rugs',
  },
  {
    name: 'Welcome Doormats',
    description: 'Make a cute first impression with playful doormats.',
    image: '/example_photo/自媒体图片/f1c7b3674a516120ac12efa078dd73e.jpg',
    url: '/shop/doormats',
  },
]

function HomeContent() {
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [showCartModal, setShowCartModal] = useState(false)
  const { items, updateQuantity, removeItem } = useCart()
  const newArrivals = productsData.slice(0, 8)

  // 页面加载后延迟显示邮箱弹窗
  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSubscribed = localStorage.getItem('hasSubscribed')
      if (!hasSubscribed) {
        setShowEmailModal(true)
      }
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleAddToCart = () => {
    setShowCartModal(true)
  }

  return (
    <main className="min-h-screen">
      <TopBar />
      <Header onCartClick={() => setShowCartModal(true)} />
      <HeroBanner />
      <FeatureBanner />
      
      {/* New Arrivals Section */}
      <ProductGrid
        products={newArrivals}
        title="New Arrivals"
        subtitle="Hot new finds & best-loved picks"
        showViewMore={true}
        onAddToCart={handleAddToCart}
      />

      {/* Find the Perfect Christmas Gift */}
      <section className="relative py-12 md:py-16 bg-pink-light overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-30">
          <Image
            src="/example_photo/自媒体图片/f1c7b3674a516120ac12efa078dd73e.jpg"
            alt="Christmas Gift Background"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="container-custom relative z-10">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-text">
              Find the Perfect Christmas Gift
            </h2>
            <p className="text-lg md:text-xl text-text-muted">
              All wrapped up and ready to share the holiday joy.
            </p>
            <div className="pt-4">
              <Link
                href="/christmas"
                className="inline-block px-8 py-4 rounded-full bg-text text-white font-semibold text-base md:text-lg hover:bg-primary transition-colors duration-200 shadow-card hover:shadow-modal"
              >
                Shop Gifts
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Collections */}
      <section className="py-12 md:py-16 bg-beige-light">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-12 text-center">
            SHOP BY COLLECTIONS
          </h2>
          {(() => {
            const topCollections = collections.slice(0, 5)
            const bottomCollections = collections.slice(5)

            return (
              <div className="space-y-10">
                {/* Top row - alternating text position */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                  {topCollections.map((collection, idx) => {
                    const isTextFirst = idx % 2 === 1
                    return (
                      <Link
                        key={collection.name}
                        href={collection.url}
                        className="group flex flex-col gap-3 lg:gap-4"
                      >
                        <p
                          className={`text-center text-[#DDA6B1] font-semibold text-base lg:text-lg transition-colors ${
                            isTextFirst ? 'lg:order-1' : 'lg:order-2'
                          }`}
                        >
                          {collection.name}
                        </p>
                        <div
                          className={`relative w-full aspect-square rounded-2xl overflow-hidden shadow-card transition-transform duration-300 ${
                            isTextFirst ? 'lg:order-2' : 'lg:order-1'
                          }`}
                        >
                          <Image
                            src={collection.image}
                            alt={collection.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 18vw"
                          />
                        </div>
                      </Link>
                    )
                  })}
                </div>

                {/* Bottom row - larger squares */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {bottomCollections.map((collection) => (
                    <Link
                      key={collection.name}
                      href={collection.url}
                      className="group flex flex-col gap-3"
                    >
                      <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-card">
                        <Image
                          src={collection.image}
                          alt={collection.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 20vw"
                        />
                      </div>
                      <p className="text-center text-[#DDA6B1] font-semibold text-base lg:text-lg">
                        {collection.name}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })()}
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 md:py-16 bg-beige-light">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
                About DenbyDen
              </h2>
              <p className="text-lg text-text-muted mb-2">Since 2022</p>
              <p className="text-base md:text-lg text-text leading-relaxed mb-8">
                DenbyDen has been bringing fun and style to everyday life since 2022. 
                We create adorable, quality home essentials that make every moment feel special. 
                We're based in Toronto. Thanks for making us part of your home!
              </p>
              <Link href="/shop" className="btn-primary inline-block">
                Shop All
              </Link>
            </div>
            <div className="relative aspect-square bg-pink-light rounded-md overflow-hidden">
              <Image
                src="/example_photo/产品主图/主图1.png"
                alt="DenbyDen Products"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Popular Restocks Section */}
      <ProductGrid
        products={productsData.slice(4, 8)}
        title="Popular Restocks"
        subtitle="Your favorites are back - limited stock available"
        showViewMore={true}
        onAddToCart={handleAddToCart}
      />

      <ReviewsCarousel />
      <FAQSection />

      <Footer />
      
      {/* Email Capture Modal */}
      <EmailCaptureModal
        isOpen={showEmailModal}
        onClose={() => {
          setShowEmailModal(false)
          localStorage.setItem('hasSubscribed', 'true')
        }}
      />
      
      {/* Cart Modal */}
      <CartModal
        isOpen={showCartModal}
        onClose={() => setShowCartModal(false)}
        items={items}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
      />
    </main>
  )
}

export default function Home() {
  return <HomeContent />
}

