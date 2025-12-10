import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
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

        {/* Microsoft Clarity */}
        <Script id="ms-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "uje7qsgn8k");
          `}
        </Script>

        {/* MailerLite Universal Script */}
        <Script 
          id="mailerlite-universal" 
          strategy="afterInteractive"
        >
          {`
            (function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[])
            .push(arguments);},l=d.createElement(e),l.async=1,l.src=u,
            n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);})
            (window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');
            ml('account', '1964678');
          `}
        </Script>
      </body>
    </html>
  )
}

