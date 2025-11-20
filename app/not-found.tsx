import Link from 'next/link'
import Header from '@/components/Header'
import TopBar from '@/components/TopBar'
import Footer from '@/components/Footer'

export default function NotFound() {
  return (
    <>
      <TopBar />
      <Header />
      <main className="container-custom py-16 text-center">
        <h1 className="text-4xl font-bold text-text mb-4">404</h1>
        <p className="text-text-muted mb-8">Page not found</p>
        <Link href="/" className="btn-primary">
          Go back home
        </Link>
      </main>
      <Footer />
    </>
  )
}


