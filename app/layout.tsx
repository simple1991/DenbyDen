import type { Metadata, Viewport } from 'next'
import './globals.css'
import { CartProvider } from '@/components/CartContext'
import { CurrencyProvider } from '@/components/CurrencyContext'

export const metadata: Metadata = {
  title: 'DenbyDen - Creating cozy moments in every corner',
  description: 'DenbyDen has been bringing fun and style to everyday life since 2022. We create adorable, quality home essentials that make every moment feel special.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>
        <CurrencyProvider>
          <CartProvider>{children}</CartProvider>
        </CurrencyProvider>
      </body>
    </html>
  )
}

