import TopBar from '@/components/TopBar'
import Header from '@/components/Header'
import ProductGrid from '@/components/ProductGrid'
import Footer from '@/components/Footer'
import productsData from '@/data/products.json'

export default function ShopPage() {
  return (
    <>
      <TopBar />
      <Header />
      <main className="min-h-screen">
        <div className="container-custom py-4 md:py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-text mb-4">
            Shop All
          </h1>
          <p className="text-text-muted mb-2">
            Discover our complete collection of home essentials
          </p>
        </div>
        <ProductGrid products={productsData} />
      </main>
      <Footer />
    </>
  )
}


