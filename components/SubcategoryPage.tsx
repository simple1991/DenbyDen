'use client'

import Image from 'next/image'
import TopBar from './TopBar'
import Header from './Header'
import Footer from './Footer'
import SubcategoryGrid from './SubcategoryGrid'
import type { CategoryConfig } from '@/data/categoryConfigs'
import type { Product } from '@/types/product'

interface SubcategoryPageProps {
  config: Omit<CategoryConfig, 'matchProduct'>
  products: Product[]
}

export default function SubcategoryPage({ config, products }: SubcategoryPageProps) {
  const heroGradient = {
    background: `linear-gradient(180deg, ${config.gradientTo} 0%, ${config.gradientFrom} 100%)`,
  }

  return (
    <>
      <TopBar />
      <Header />
      <main className="min-h-screen bg-background">
        <section className="py-12 md:py-16" style={heroGradient}>
          <div className="container-custom grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="space-y-5">
              <p className="text-sm uppercase tracking-[0.3em] text-text-muted">Collection</p>
              <h1 className="text-4xl md:text-5xl font-bold text-text">{config.title}</h1>
              <p className="text-lg text-text-muted">{config.description}</p>
              <div className="rounded-2xl bg-white/80 border border-white/60 shadow-card p-5 space-y-3">
                <p className="text-sm font-semibold text-text">Why you’ll love it</p>
                <p className="text-base text-text">{config.heroSubtitle}</p>
                <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white text-sm text-text">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: config.accentColor }} />
                  {config.highlight}
                </div>
              </div>
            </div>
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-card">
              <Image
                src={config.heroImage}
                alt={config.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </section>

        <SubcategoryGrid products={products} categoryName={config.title} />
      </main>
      <Footer />
    </>
  )
}


