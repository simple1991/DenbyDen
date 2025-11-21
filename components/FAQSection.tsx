'use client'

import { useState } from 'react'
import Image from 'next/image'

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
          <h2 className="text-2xl md:text-3xl font-bold text-text mb-4 italic">
            Frequently Asked Question
          </h2>
          <p className="text-text-muted">
            Everything you need to know about shipping, delivery, and customer service.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-beige-light rounded-lg shadow-card">
              <button
                className="w-full flex items-center justify-between px-4 md:px-6 py-4 text-left"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                aria-expanded={openIndex === idx}
              >
                <span className="font-semibold text-text text-sm md:text-base pr-4">{faq.question}</span>
                <span className="w-5 h-5 rounded-full bg-[#A8D5BA] flex items-center justify-center flex-shrink-0">
                  {openIndex === idx ? (
                    <Image
                      src="/example_photo/SVG图标素材/close.svg"
                      alt="Close"
                      width={12}
                      height={12}
                      className="w-3 h-3"
                    />
                  ) : (
                    <Image
                      src="/example_photo/SVG图标素材/Add.svg"
                      alt="Add"
                      width={12}
                      height={12}
                      className="w-3 h-3"
                    />
                  )}
                </span>
              </button>
              {openIndex === idx && (
                <div className="px-4 md:px-6 pb-4 md:pb-6 text-text-muted text-sm md:text-base">
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

