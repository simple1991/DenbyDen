'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // 这里可以添加实际的订阅逻辑
      setIsSubscribed(true)
      setEmail('')
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  const footerLinks = {
    home: [
      { label: 'All Collections', url: '/collections' },
      { label: 'FAQ', url: '/faq' },
      { label: 'Privacy Policy', url: '/privacy' },
    ],
    shop: [
      { label: 'Bestsellers', url: '/shop?filter=bestsellers' },
      { label: 'New Arrivals', url: '/shop?filter=new' },
      { label: 'Popular Restock', url: '/shop?filter=restock' },
    ],
    about: [
      { label: 'Our Story', url: '/about' },
      { label: 'Terms of Service', url: '/terms' },
      { label: 'Privacy Policy', url: '/privacy' },
    ],
    contact: [
      { label: 'Customer Service', url: '/contact' },
      { label: 'Refund Policy', url: '/refund' },
      { label: 'Shipping Policy', url: '/shipping' },
    ],
  }

  return (
    <footer className="bg-beige-light border-t border-border mt-8">
      <div className="container-custom py-12 md:py-16">
        {/* Newsletter Section */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-text mb-2">
            Join the DenbyDen Fam！
          </h3>
          <p className="text-text-muted mb-6">
            Sign up for fun news, exclusive deals, and everything you'll love!
          </p>
          <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Add Your E-Mail Here"
              className="flex-1 px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <button type="submit" className="btn-primary whitespace-nowrap">
              Subscribe
            </button>
          </form>
          {isSubscribed && (
            <p className="text-green-600 mt-4">Thank you for subscribing!</p>
          )}
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="font-semibold text-text mb-4">HOME</h4>
            <ul className="space-y-2">
              {footerLinks.home.map((link) => (
                <li key={link.url}>
                  <Link
                    href={link.url}
                    className="text-text-muted hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-text mb-4">SHOP</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.url}>
                  <Link
                    href={link.url}
                    className="text-text-muted hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-text mb-4">ABOUT US</h4>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.url}>
                  <Link
                    href={link.url}
                    className="text-text-muted hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-text mb-4">CONTACT US</h4>
            <ul className="space-y-2">
              {footerLinks.contact.map((link) => (
                <li key={link.url}>
                  <Link
                    href={link.url}
                    className="text-text-muted hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-primary transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
            <p className="text-text-muted text-sm">
              © {new Date().getFullYear()} DenbyDen. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

