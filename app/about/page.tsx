import TopBar from '@/components/TopBar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <>
      <TopBar />
      <Header />
      <main className="min-h-screen">
        <div className="container-custom py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-text mb-8">
              About DenbyDen
            </h1>
            
            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-xl text-text-muted mb-4">Since 2022</p>
              <p className="text-base md:text-lg text-text leading-relaxed mb-6">
              DenbyDen has been bringing fun and style to everyday life since 2022. 
                We create adorable, quality home essentials that make every moment feel special.
              </p>
              <p className="text-base md:text-lg text-text leading-relaxed mb-6">
                We're based in Toronto, Canada, and we're passionate about creating products 
                that bring joy to your daily routine. From ceramic mugs to dinnerware sets, 
                each piece is thoughtfully designed to add a touch of whimsy and warmth to your home.
              </p>
              <p className="text-base md:text-lg text-text leading-relaxed">
                Thanks for making us part of your home!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="relative aspect-square bg-beige-light rounded-md overflow-hidden">
                <Image
                  src="/example_photo/产品主图/主图1.png"
                  alt="DenbyDen Products"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square bg-pink-light rounded-md overflow-hidden">
                <Image
                  src="/example_photo/产品主图/主图2.png"
                  alt="DenbyDen Products"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}


