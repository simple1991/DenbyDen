'use client'

import { useState, useEffect, useRef } from 'react'
import TopBar from '@/components/TopBar'
import Header from '@/components/Header'
import HeroBanner from '@/components/HeroBanner'
import FeatureBanner from '@/components/FeatureBanner'
import ProductGrid from '@/components/ProductGrid'
import Footer from '@/components/Footer'
// import EmailCaptureModal from '@/components/EmailCaptureModal'
import ReviewsCarousel from '@/components/ReviewsCarousel'
import FAQSection from '@/components/FAQSection'
import CartModal from '@/components/CartModal'
import { CartProvider, useCart } from '@/components/CartContext'
import Link from 'next/link'
import Image from 'next/image'
import productsData from '@/data/products.json'
import {
  usePageView,
  usePageDwell,
  useButtonClick,
  useCollectionClick,
  useCollectionScroll,
  useCartModalOpen,
  useCartModalClose,
} from '@/hooks/useAnalytics'

interface Collection {
  name: string
  description: string
  image: string
  url: string
}

function ScrollableCollections({ collections }: { collections: Collection[] }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const lastScrollIndex = useRef(0)
  const handleCollectionScroll = useCollectionScroll()
  const handleCollectionClick = useCollectionClick()

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const container = scrollContainerRef.current
      if (!container) return
      
      const scrollLeft = container.scrollLeft
      // 每个item宽度：w-56 (224px) + gap-4 (16px) = 240px
      const itemWidthWithGap = 240
      // 考虑snap特性，计算当前激活的item索引
      const index = Math.round(scrollLeft / itemWidthWithGap)
      const newIndex = Math.min(Math.max(0, index), collections.length - 1)
      setActiveIndex(newIndex)
      
      // 埋点：Collection滚动
      if (newIndex !== lastScrollIndex.current) {
        const scrollDirection = newIndex > lastScrollIndex.current ? 'right' : 'left'
        handleCollectionScroll(scrollDirection, newIndex, collections.length, 'home')
        lastScrollIndex.current = newIndex
      }
    }

    container.addEventListener('scroll', handleScroll)
    handleScroll() // 初始计算

    return () => {
      container.removeEventListener('scroll', handleScroll)
    }
  }, [collections.length, handleCollectionScroll])

  return (
    <>
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto px-4 pb-3 scroll-smooth snap-x snap-mandatory scrollbar-hide"
      >
        {collections.map((collection, index) => (
          <Link
            key={collection.name}
            href={collection.url}
            className="flex-none w-56 snap-start group"
            onClick={() => {
              if (handleCollectionClick) {
                handleCollectionClick(collection.name, collection.url, index + 1, 'mobile', 'home')
              }
            }}
          >
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-card">
              <Image
                src={collection.image}
                alt={collection.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 70vw"
              />
            </div>
            <p className="mt-3 text-center text-[#DDA6B1] font-semibold text-base">
              {collection.name}
            </p>
          </Link>
        ))}
      </div>
      {/* Scroll indicator - 在下方 */}
      <div className="flex justify-center gap-1.5 px-4 pt-2">
        {collections.map((_, idx) => (
          <div
            key={idx}
            className={`h-1 rounded-full transition-all duration-300 ${
              idx === activeIndex
                ? 'w-8 bg-[#DDA6B1]'
                : 'w-1.5 bg-[#DDA6B1]/30'
            }`}
          />
        ))}
      </div>
    </>
  )
}

const collections = [
  {
    name: 'Pet Care',
    description: 'Pamper your furry best friends with fresh scents and gentle care.',
    image: '/example_photo/分类图片/group_01.webp',
    url: '/shop/pet-care',
  },
  {
    name: 'Scent & Glow',
    description: 'Set the perfect mood with soothing aromas and a warm, gentle glow.',
    image: '/example_photo/分类图片/group_02.webp',
    url: '/shop/scent-glow',
  },
  {
    name: 'Tidy & Store',
    description: 'Turn clutter into calm with chic baskets and smart organizers.',
    image: '/example_photo/分类图片/group_03.webp',
    url: '/shop/tidy-store',
  },
  {
    name: 'Bowls',
    description: 'From cereal to soup, find the perfect bowl to brighten up every meal.',
    image: '/example_photo/分类图片/group_04.webp',
    url: '/shop/bowls',
  },
  {
    name: 'Ceramic Mugs',
    description: 'Sipping your favorite drink just got cuter!',
    image: '/example_photo/分类图片/group_05.webp',
    url: '/shop/mugs',
  },
  {
    name: 'Plates',
    description: 'Dine in style with our collection of charming plates.',
    image: '/example_photo/分类图片/group_06.webp',
    url: '/shop/plates',
  },
  {
    name: 'Bath Mat&Rugs',
    description: 'Cozy up your bathroom with soft and stylish mats.',
    image: '/example_photo/分类图片/group_07.webp',
    url: '/shop/rugs',
  },
  {
    name: 'Welcome Doormats',
    description: 'Make a cute first impression with playful doormats.',
    image: '/example_photo/分类图片/group_08.webp',
    url: '/shop/doormats',
  },
  {
    name: 'Wall decal',
    description: 'These delicate wall decals bloom on the wall like warm sunlight, filling the space with tender, homey vibes.',
    image: '/example_photo/分类图片/group_09.webp',
    url: '/shop/decal',
  },
]

function HomeContent() {
  // const [showEmailModal, setShowEmailModal] = useState(false)
  const [showCartModal, setShowCartModal] = useState(false)
  const [cartModalOpenTime, setCartModalOpenTime] = useState<number | null>(null)
  const { items, updateQuantity, removeItem, getTotal } = useCart()
  const newArrivals = productsData.slice(0, 8)

  // 页面埋点
  usePageView('home')
  usePageDwell('home')

  // 按钮点击埋点
  const handleButtonClick = useButtonClick()
  
  // Collection点击埋点（在ScrollableCollections和桌面端使用）
  const handleCollectionClick = useCollectionClick()
  
  // 购物车弹窗埋点
  const handleCartModalOpen = useCartModalOpen()
  const handleCartModalClose = useCartModalClose()

  // 页面加载后延迟显示邮箱弹窗
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     const hasSubscribed = localStorage.getItem('hasSubscribed')
  //     if (!hasSubscribed) {
  //       setShowEmailModal(true)
  //     }
  //   }, 2000)
  //   return () => clearTimeout(timer)
  // }, [])

  // 购物车弹窗打开
  useEffect(() => {
    if (showCartModal) {
      setCartModalOpenTime(Date.now())
      handleCartModalOpen(
        items.reduce((sum, item) => sum + item.quantity, 0),
        getTotal(),
        'add_to_cart_button',
        'home'
      )
    }
  }, [showCartModal])

  const handleAddToCart = () => {
    setShowCartModal(true)
  }

  const handleCloseCartModal = (closeMethod: 'close_button' | 'background_click' | 'escape_key' | 'link_click' = 'close_button') => {
    if (cartModalOpenTime) {
      const displayTime = Math.floor((Date.now() - cartModalOpenTime) / 1000)
      handleCartModalClose(
        items.reduce((sum, item) => sum + item.quantity, 0),
        displayTime,
        closeMethod,
        'home'
      )
      setCartModalOpenTime(null)
    }
    setShowCartModal(false)
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
            src="/example_photo/自媒体图片/f1c7b3674a516120ac12efa078dd73e.webp"
            alt="Christmas Gift Background"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="container-custom relative z-10">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-text">
              Find a Little Gift for Your Favorite People
            </h2>
            <p className="text-lg md:text-xl text-text-muted">
              Thoughtful everyday pieces that quietly say “I saw this and thought of you.”
            </p>
            <div className="pt-4">
              <Link
                href="/christmas"
                className="inline-block px-8 py-4 rounded-full bg-text text-white font-semibold text-base md:text-lg hover:bg-primary transition-colors duration-200 shadow-card hover:shadow-modal"
                onClick={() => handleButtonClick('Shop Gifts', '/christmas', 'primary_cta', 'christmas_section', 'home')}
              >
                Browse Friend Gifts
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Collections */}
      <section className="py-12 md:py-16 bg-beige-light">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold text-text mb-10 text-center">
            SHOP BY COLLECTIONS
          </h2>
          <div className="md:hidden -mx-4">
            <ScrollableCollections collections={collections} />
          </div>

          {(() => {
            const topCollections = collections.slice(0, 5)
            const bottomCollections = collections.slice(5)

            return (
              <div className="hidden md:block space-y-10">
                {/* Top row - alternating text position */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                  {topCollections.map((collection, idx) => {
                    const isTextFirst = idx % 2 === 1
                    return (
                      <Link
                        key={collection.name}
                        href={collection.url}
                        className="group flex flex-col gap-3 lg:gap-4"
                        onClick={() => handleCollectionClick(collection.name, collection.url, idx + 1, 'desktop', 'home')}
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
                  {bottomCollections.map((collection, idx) => (
                    <Link
                      key={collection.name}
                      href={collection.url}
                      className="group flex flex-col gap-3"
                      onClick={() => handleCollectionClick(collection.name, collection.url, idx + 6, 'desktop', 'home')}
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

      {/* Popular Restocks Section */}
      <ProductGrid
        products={productsData.slice(4, 8)}
        title="Popular Restocks"
        subtitle="Your favorites are back - limited stock available"
        showViewMore={true}
        onAddToCart={handleAddToCart}
      />

      {/* About Section */}
      <section className="py-12 md:py-16 bg-beige-light">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Mobile: 图片在标题和"Since 2022"之间 */}
            {/* Desktop: 文字在左，图片在右 */}
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl md:text-3xl font-bold text-text mb-4">
                About DenbyDen
              </h2>
              {/* 移动端图片 */}
              <div className="relative aspect-square bg-pink-light rounded-md overflow-hidden mb-4 lg:hidden">
                <Image
                  src="/example_photo/产品主图/主图1.png"
                  alt="DenbyDen Products"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-lg text-text-muted mb-2">Since 2022</p>
              <p className="text-base md:text-lg text-text leading-relaxed mb-8">
                DenbyDen has been bringing fun and style to everyday life since 2022. 
                We create adorable, quality home essentials that make every moment feel special. 
                We're based in Toronto. Thanks for making us part of your home!
              </p>
              <Link 
                href="/shop" 
                className="btn-primary inline-block"
                onClick={() => handleButtonClick('Shop All', '/shop', 'primary_cta', 'about_section', 'home')}
              >
                Shop All
              </Link>
            </div>
            {/* Desktop: 图片在右侧 */}
            <div className="relative aspect-square bg-pink-light rounded-md overflow-hidden order-1 lg:order-2 hidden lg:block">
              <Image
                src="/example_photo/about-me/Gemini_Generated_Image_x2oazix2oazix2oa.webp"
                alt="DenbyDen Products"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <ReviewsCarousel />
      <FAQSection />

      <Footer />
      
      {/* Email Capture Modal */}
      {/* <EmailCaptureModal
        isOpen={showEmailModal}
        onClose={() => {
          setShowEmailModal(false)
          localStorage.setItem('hasSubscribed', 'true')
        }}
      /> */}
      
      {/* Cart Modal */}
      <CartModal
        isOpen={showCartModal}
        onClose={handleCloseCartModal}
        items={items}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        pageType="home"
      />
    </main>
  )
}

export default function Home() {
  return <HomeContent />
}

