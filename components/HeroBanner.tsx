'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function HeroBanner() {
  return (
    <section className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/example_photo/hero横幅图/6711ec8e0c1c6c61a79cf95d5a3e343.jpg"
          alt="DenbyDen - Creating cozy moments"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container-custom">
          <div className="max-w-2xl animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              Creating cozy moments in every corner.
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Welcome to DenbyDen
            </p>
            <Link href="/shop" className="btn-primary inline-block">
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

