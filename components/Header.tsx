'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

import { categoryConfigs } from '@/data/categoryConfigs'

import { useCart } from './CartContext'

interface HeaderProps {
  onCartClick?: () => void
}

export default function Header({ onCartClick }: HeaderProps = {}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { getItemCount } = useCart()
  const cartCount = getItemCount()

  const homeLink = { label: 'Home', url: '/' }
  const navItems = [
    { label: 'About us', url: '/about' },
    { label: 'Contact Us', url: '/contact' },
    { label: 'FAQ', url: '/faq' },
  ]

  const shopLink = { label: 'Shop All', url: '/shop' }
  const subPageLinks = Object.values(categoryConfigs).map((config) => ({
    label: config.title,
    url: `/shop/${config.slug}`,
  }))
  const dropdownSections = [
    { title: 'All Products', links: [shopLink] },
    { title: 'Sub Collections', links: subPageLinks },
  ]

  const dropdownLinksFlat = dropdownSections.flatMap((section) => section.links)

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile Menu Button + Logo */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="md:hidden p-2 -ml-2 text-text hover:text-primary transition-colors"
              aria-label="Open menu"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <Link href="/" className="flex items-center">
              <Image
                src="/example_photo/logo/logo.png"
                alt="DenbyDen"
                width={180}
                height={60}
                className="h-10 md:h-14 w-auto transition-transform duration-200 hover:scale-105"
                priority
              />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href={homeLink.url}
              className="text-text hover:text-primary transition-colors duration-200 text-sm font-medium"
            >
              {homeLink.label}
            </Link>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="text-text hover:text-primary hover:underline underline-offset-4 transition-colors duration-200 text-sm font-medium inline-flex items-center gap-2"
                aria-haspopup="true"
                aria-expanded={isDropdownOpen}
              >
                {shopLink.label}
                <svg
                  className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute left-1/2 z-50 mt-4 w-[520px] -translate-x-1/2 rounded-lg border border-border bg-white p-6 shadow-lg">
                  <div className="grid grid-cols-2 gap-6">
                    {dropdownSections.map((section) => (
                      <div key={section.title}>
                        <p className="text-sm font-semibold text-text mb-3">{section.title}</p>
                        <div className="flex flex-col gap-2">
                          {section.links.map((link) => (
                            <Link
                              key={link.url}
                              href={link.url}
                              className="text-sm text-text-muted hover:text-primary transition-colors"
                              onClick={() => setIsDropdownOpen(false)}
                            >
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {navItems.map((item) => (
              <Link
                key={item.url}
                href={item.url}
                className="text-text hover:text-primary transition-colors duration-200 text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 hover:text-primary transition-colors"
              aria-label="Search"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {/* User Account */}
            <Link
              href="/account"
              className="p-2 hover:text-primary transition-colors"
              aria-label="Account"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </Link>

            {/* Cart */}
            <button
              onClick={onCartClick}
              className="p-2 hover:text-primary transition-colors relative"
              aria-label="Shopping Cart"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Currency Selector */}
            <div className="hidden md:flex items-center gap-2 text-sm">
              <span className="text-text-muted">CAD $</span>
            </div>
          </div>
        </div>

        {/* Search Bar (when open) */}
        {isSearchOpen && (
          <div className="border-t border-border py-4">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              autoFocus
            />
          </div>
        )}
      </div>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[60]">
          <div className="absolute inset-0 bg-black/40" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="absolute top-0 left-0 h-full w-72 max-w-[80%] bg-white shadow-2xl p-6 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <span className="text-lg font-semibold text-text">导航</span>
              <button
                type="button"
                aria-label="Close menu"
                className="p-2 text-text hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col gap-4 overflow-y-auto">
              <Link
                href={homeLink.url}
                className="text-base font-medium text-text hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {homeLink.label}
              </Link>
              <div>
                <p className="text-sm font-semibold text-text mb-3">{shopLink.label}</p>
                <div className="flex flex-col gap-2">
                  {dropdownSections.map((section) => (
                    <div key={section.title}>
                      {section.title !== 'All Products' && (
                        <p className="text-xs uppercase tracking-wide text-text-muted mb-2">{section.title}</p>
                      )}
                      <div className="flex flex-col gap-2 mb-3">
                        {section.links.map((link) => (
                          <Link
                            key={link.url}
                            href={link.url}
                            className="text-sm text-text-muted hover:text-primary transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t border-border pt-4 flex flex-col gap-3">
                {navItems.map((item) => (
                  <Link
                    key={item.url}
                    href={item.url}
                    className="text-base font-medium text-text hover:text-primary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

