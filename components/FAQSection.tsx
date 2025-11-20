'use client'

import { useState } from 'react'

const faqs = [
  {
    question: 'What are the shipping costs?',
    answer:
      'Flat shipping fee of $7.95 for Canada & the US. Free shipping on orders over $49.',
  },
  {
    question: 'What are the estimated delivery times for orders?',
    answer:
      'Orders ship from Toronto. Expect 2-3 business days for Ontario/Quebec, 5-7 days for the rest of Canada, and 2-7 days for shipments to the United States.',
  },
  {
    question: 'How can I contact customer service?',
    answer:
      'Email support@denbyden.com, DM us on Instagram @denbyden_official, or connect via WeChat: denbyden01.',
  },
  {
    question: 'How do I redeem my welcome promotion?',
    answer:
      'Subscribe to our newsletter and receive a unique 10% off code for your first purchase.',
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-12 md:py-16 bg-pink-light">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
            Frequently Asked Question
          </h2>
          <p className="text-text-muted">
            Everything you need to know about shipping, delivery, and customer service.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-full md:rounded-[999px] shadow-card">
              <button
                className="w-full flex items-center justify-between px-6 py-4 text-left"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                aria-expanded={openIndex === idx}
              >
                <span className="font-semibold text-text">{faq.question}</span>
                <span
                  className={`w-8 h-8 rounded-full border border-border flex items-center justify-center text-primary transition-transform ${
                    openIndex === idx ? 'rotate-45' : ''
                  }`}
                >
                  +
                </span>
              </button>
              {openIndex === idx && (
                <div className="px-6 pb-6 text-text-muted text-sm md:text-base">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

