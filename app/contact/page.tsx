'use client'

import { useState } from 'react'
import TopBar from '@/components/TopBar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // 模拟提交
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // 保存到 localStorage
    const contacts = JSON.parse(localStorage.getItem('contacts') || '[]')
    contacts.push({ ...formData, date: new Date().toISOString() })
    localStorage.setItem('contacts', JSON.stringify(contacts))

    setIsSubmitting(false)
    setIsSuccess(true)
    setFormData({ name: '', email: '', phone: '', message: '' })

    setTimeout(() => setIsSuccess(false), 5000)
  }

  return (
    <>
      <TopBar />
      <Header />
      <main className="min-h-screen">
        <div className="container-custom py-12 md:py-16">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-text mb-4">
              Contact Us
            </h1>
            <p className="text-text-muted mb-8">
              Got questions? Fill out the form below. We'll reply in 12 hours—thanks for reaching out!
            </p>

            {isSuccess && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md mb-6">
                Thank you for your message! We'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-text mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-text mb-2">
                  Leave a Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full"
              >
                {isSubmitting ? 'Sending...' : 'Send'}
              </button>
            </form>

            <div className="mt-12 pt-8 border-t border-border">
              <h2 className="text-2xl font-bold text-text mb-4">Other Ways to Reach Us</h2>
              <div className="space-y-3 text-text-muted">
                <p>
                  <strong className="text-text">Email:</strong> support@denbyden.com
                </p>
                <p>
                  <strong className="text-text">Instagram:</strong> @denbyden_official
                </p>
                <p>
                  <strong className="text-text">WeChat:</strong> denbyden01
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}


