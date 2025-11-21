'use client'

import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'

const reviews = [
  {
    name: 'Luna',
    product: 'Creamy Emo Bear Handled Baking Dish',
    quote: 'Absolutely love the little bear design. So cute!',
    image: '/example_photo/产品主图/主图1.png',
  },
  {
    name: 'Sophie',
    product: 'Chocolate Strawberry Bunny Ceramic Bowls',
    quote: 'Got the plate and bowl — both are amazing!',
    image: '/example_photo/产品主图/主图2.png',
  },
  {
    name: 'Emma',
    product: 'Chocolate Strawberry Bunny Ceramic Bowls',
    quote: 'This bunny set is seriously the cutest thing ever!',
    image: '/example_photo/产品主图/主图3.png',
  },
  {
    name: 'Mia',
    product: 'Chocolate Strawberry Bunny Ceramic Bowls',
    quote: 'Perfect for breakfast time, especially the bunny plate!',
    image: '/example_photo/产品主图/主图4.png',
  },
  {
    name: 'Ella',
    product: 'Cute Footed Ceramic Bowl',
    quote: 'My favorite bowl now. It is just so fun to use!',
    image: '/example_photo/自媒体图片/f1c7b3674a516120ac12efa078dd73e.jpg',
  },
]

export default function ReviewsCarousel() {
  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // 检测屏幕尺寸
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // 桌面端使用虚拟索引实现无限循环
  const [virtualIndex, setVirtualIndex] = useState(reviews.length)

  useEffect(() => {
    if (isPaused || isMobile) return // 移动端不自动播放
    const timer = setInterval(() => {
      setVirtualIndex((prev) => {
        const nextIdx = prev + 1
        if (nextIdx >= reviews.length * 2) {
          return reviews.length
        }
        return nextIdx
      })
      setIndex((prev) => (prev + 1) % reviews.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [isPaused, isMobile])

  const next = () => {
    if (isMobile) {
      // 移动端：直接切换索引，无限循环
      setIndex((prev) => (prev + 1) % reviews.length)
    } else {
      // 桌面端：使用虚拟索引
      setVirtualIndex((prev) => {
        const nextIdx = prev + 1
        if (nextIdx >= reviews.length * 2) {
          setTimeout(() => {
            setVirtualIndex(reviews.length)
          }, 500)
          return nextIdx
        }
        return nextIdx
      })
      setIndex((prev) => (prev + 1) % reviews.length)
    }
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 10000)
  }

  const prev = () => {
    if (isMobile) {
      // 移动端：直接切换索引，无限循环
      setIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
    } else {
      // 桌面端：使用虚拟索引
      setVirtualIndex((prev) => {
        const prevIdx = prev - 1
        if (prevIdx < 0) {
          setTimeout(() => {
            setVirtualIndex(reviews.length + reviews.length - 1)
          }, 500)
          return prevIdx
        }
        return prevIdx
      })
      setIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
    }
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 10000)
  }

  // 桌面端：每次移动50%（显示2个中的1个）
  const translateX = virtualIndex * (100 / 2)

  return (
    <section className="py-12 md:py-16 bg-beige-light">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-text-muted">
              Verified Reviews
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-text">
              Reviews from Our DenbyDen Family
            </h2>
            <p className="text-text-muted">
              We hope to bring joy to your table <span className="text-green-600">✔︎</span>
            </p>
          </div>
          <div className="flex items-center gap-1 text-green-600">
            <span className="text-2xl">4.8</span>
            <span>★★★★★</span>
            <span className="text-text-muted">Based on 382 reviews</span>
          </div>
        </div>

        <div className="relative">
          {/* 移动端：固定容器，一次只显示一个卡片 */}
          {/* 桌面端：滑动轮播，显示多个卡片 */}
          <div className="md:hidden">
            {/* 固定高度容器，确保所有卡片大小一致 */}
            <div 
              ref={containerRef}
              className="relative h-32 overflow-hidden mb-4"
            >
              {reviews.map((review, idx) => (
                <div
                  key={`${review.name}-${idx}`}
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    idx === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="bg-white rounded-md shadow-card p-3 h-full flex gap-3">
                    <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={review.image}
                        alt={review.product}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <p className="text-xs text-primary mb-1 leading-tight">{review.product}</p>
                      <p className="text-xs font-semibold text-text mb-1.5 leading-snug">
                        "{review.quote}"
                      </p>
                      <p className="text-xs text-text-muted">— {review.name}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* 滑轨指示器 */}
            <div className="flex justify-center gap-1.5">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === index
                      ? 'w-8 bg-[#DDA6B1]'
                      : 'w-1.5 bg-[#DDA6B1]/30'
                  }`}
                  aria-label={`Go to review ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* 桌面端：滑动轮播 */}
          <div className="hidden md:block">
            <div ref={containerRef} className="overflow-hidden px-16">
              <div className="relative">
                <div
                  className="flex gap-6 transition-transform duration-500 ease-in-out"
                  style={{ 
                    transform: `translateX(-${translateX}%)`,
                  }}
                >
                  {/* 重复数组3次以实现真正的无限循环 */}
                  {[...reviews, ...reviews, ...reviews].map((review, idx) => (
                    <div
                      key={`${review.name}-${idx}`}
                      className="flex-shrink-0 w-1/2 px-2"
                    >
                      <div className="bg-white rounded-md shadow-card p-6 flex gap-5 h-full">
                        <div className="relative w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src={review.image}
                            alt={review.product}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                          <p className="text-base text-primary mb-1 line-clamp-1">{review.product}</p>
                          <p className="text-lg font-semibold text-text mb-2 line-clamp-3">
                            "{review.quote}"
                          </p>
                          <p className="text-base text-text-muted">— {review.name}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation Buttons - 只在桌面端显示 */}
          <button
            onClick={prev}
            className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-pink-light hover:bg-pink text-text p-3 rounded-full shadow-card transition-colors"
            aria-label="Previous reviews"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-pink-light hover:bg-pink text-text p-3 rounded-full shadow-card transition-colors"
            aria-label="Next reviews"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* 移动端导航按钮 */}
          <button
            onClick={prev}
            className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-pink-light hover:bg-pink text-text p-2 rounded-full shadow-card transition-colors"
            aria-label="Previous reviews"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-pink-light hover:bg-pink text-text p-2 rounded-full shadow-card transition-colors"
            aria-label="Next reviews"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

