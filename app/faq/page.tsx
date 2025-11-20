'use client'

import { useState } from 'react'
import TopBar from '@/components/TopBar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const faqs = [
  {
    question: 'What are the shipping costs?',
    answer: 'Flat shipping fee of $7.95 for Canada & the US. Free shipping on orders over $49.',
  },
  {
    question: 'What are the estimated delivery times for orders?',
    answer: 'Delivery times vary based on the location of the recipient. Orders shipped from our warehouse in Toronto typically arrive within 2-3 business days for Ontario/Quebec, 5-7 business days for the rest of Canada, and 2-7 business days for shipments to the United States.',
  },
  {
    question: 'How can I contact customer service?',
    answer:
      'You can contact our customer service through the following channels: Email: support@denbyden.com, Instagram: denbyden_official, WeChat: denbyden01. Feel free to reach out to us anytime, and we\'ll be happy to assist you!',
  },
  {
    question: 'How do I redeem my welcome promotion?',
    answer:
      'Join DenbyDen and receive an exclusive 10% discount on your first purchase! Simply subscribe to our email list and get your unique promo code. It\'s our way of saying thank you for choosing us.',
  },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <>
      <TopBar />
      <Header />
      <main className="min-h-screen">
        <div className="container-custom py-12 md:py-16">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-text mb-8">
              Frequently Asked Questions
            </h1>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="card border border-border overflow-hidden"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-beige-light transition-colors"
                  >
                    <span className="font-semibold text-text">{faq.question}</span>
                    <svg
                      className={`w-5 h-5 text-text-muted transition-transform ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {openIndex === index && (
                    <div className="px-6 pb-4 text-text-muted leading-relaxed animate-fade-in">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}


