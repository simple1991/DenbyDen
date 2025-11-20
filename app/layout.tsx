import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/components/CartContext'

export const metadata: Metadata = {
  title: 'DenbyDen - Creating cozy moments in every corner',
  description: 'DenbyDen has been bringing fun and style to everyday life since 2022. We create adorable, quality home essentials that make every moment feel special.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}

