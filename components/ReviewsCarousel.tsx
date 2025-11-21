'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

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

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % (reviews.length - 2))
    }, 4000)
    return () => clearInterval(timer)
  }, [isPaused])

  const next = () => {
    setIndex((prev) => (prev + 1) % (reviews.length - 2))
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 10000)
  }

  const prev = () => {
    setIndex((prev) => (prev - 1 + (reviews.length - 2)) % (reviews.length - 2))
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 10000)
  }

  const visibleReviews = Array.from({ length: 3 }).map(
    (_, i) => reviews[(index + i) % reviews.length]
  )

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
          {/* Navigation Buttons */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 bg-pink-light hover:bg-pink text-text p-3 rounded-full shadow-card transition-colors"
            aria-label="Previous reviews"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 bg-pink-light hover:bg-pink text-text p-3 rounded-full shadow-card transition-colors"
            aria-label="Next reviews"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Carousel */}
          <div className="overflow-hidden px-8 md:px-16">
            <div className="relative">
              <div
                className="flex transition-transform duration-500 ease-in-out gap-6"
                style={{ transform: `translateX(-${index * (100 / 3)}%)` }}
              >
                {reviews.map((review, idx) => (
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
        </div>
      </div>
    </section>
  )
}

