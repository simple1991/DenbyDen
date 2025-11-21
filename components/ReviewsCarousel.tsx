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
  const [isTransitioning, setIsTransitioning] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  // 检测屏幕尺寸
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // 使用虚拟索引实现无限循环（从中间部分开始，初始显示第0个评论）
  const [virtualIndex, setVirtualIndex] = useState(reviews.length)

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setVirtualIndex((prev) => {
        const nextIdx = prev + 1
        // 如果超过原始数组的2倍，重置到中间部分
        if (nextIdx >= reviews.length * 2) {
          return reviews.length
        }
        return nextIdx
      })
      setIndex((prev) => (prev + 1) % reviews.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [isPaused])

  const next = () => {
    setVirtualIndex((prev) => {
      const nextIdx = prev + 1
      if (nextIdx >= reviews.length * 2) {
        // 无缝重置到中间部分
        setTimeout(() => {
          setIsTransitioning(false)
          setVirtualIndex(reviews.length)
          setTimeout(() => setIsTransitioning(true), 50)
        }, 500)
        return nextIdx
      }
      return nextIdx
    })
    setIndex((prev) => (prev + 1) % reviews.length)
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 10000)
  }

  const prev = () => {
    setVirtualIndex((prev) => {
      const prevIdx = prev - 1
      if (prevIdx < 0) {
        // 无缝重置到中间部分
        setTimeout(() => {
          setIsTransitioning(false)
          setVirtualIndex(reviews.length + reviews.length - 1)
          setTimeout(() => setIsTransitioning(true), 50)
        }, 500)
        return prevIdx
      }
      return prevIdx
    })
    setIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 10000)
  }

  // 移动端：每次移动100%（显示1个），桌面端：每次移动33.33%（显示3个中的1个）
  const translateX = isMobile 
    ? virtualIndex * 100  // 移动端：每个评论100%宽度
    : virtualIndex * (100 / 3)  // 桌面端：每个评论33.33%宽度

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
          {/* Carousel */}
          <div ref={containerRef} className="overflow-hidden px-12 md:px-16">
            <div className="relative">
              <div
                ref={carouselRef}
                className={`flex gap-6 ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
                style={{ 
                  transform: `translateX(-${translateX}%)`,
                }}
              >
                {/* 重复数组3次以实现真正的无限循环 */}
                {[...reviews, ...reviews, ...reviews].map((review, idx) => (
                  <div
                    key={`${review.name}-${idx}`}
                    className="flex-shrink-0 w-full md:w-1/3 px-2"
                  >
                    <div className="bg-white rounded-md shadow-card p-4 flex gap-4 h-full">
                      <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={review.image}
                          alt={review.product}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-primary mb-1 line-clamp-1">{review.product}</p>
                        <p className="text-base font-semibold text-text mb-2 line-clamp-2">
                          "{review.quote}"
                        </p>
                        <p className="text-sm text-text-muted">— {review.name}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Navigation Buttons - 放在内容区域外面，不覆盖评论 */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-pink-light hover:bg-pink text-text p-2 md:p-3 rounded-full shadow-card transition-colors"
            aria-label="Previous reviews"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-pink-light hover:bg-pink text-text p-2 md:p-3 rounded-full shadow-card transition-colors"
            aria-label="Next reviews"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

