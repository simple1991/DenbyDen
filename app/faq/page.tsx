'use client'

import { useState, type ReactNode } from 'react'
import Image from 'next/image'
import TopBar from '@/components/TopBar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useCurrency } from '@/components/CurrencyContext'

type FAQItem = {
  question: string
  answer: string | ((formatPrice: (value: number) => string) => ReactNode)
}

const faqs: FAQItem[] = [
  {
    question: 'What are the shipping costs?',
    answer: (formatPrice) =>
      `Flat shipping fee of ${formatPrice(7.95)} for Canada & the US. Free shipping on orders over ${formatPrice(
        49
      )}.`,
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
  const { formatPrice } = useCurrency()

  return (
    <>
      <TopBar />
      <Header />
      <main className="min-h-screen bg-pink-light">
        <div className="container-custom py-12 md:py-16">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-text mb-8 text-center italic">
              Frequently Asked Question
            </h1>

            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const answerContent =
                  typeof faq.answer === 'function' ? faq.answer(formatPrice) : faq.answer
                return (
                <div
                  key={index}
                  className="bg-beige-light rounded-lg shadow-card overflow-hidden"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full px-4 md:px-6 py-4 flex items-center justify-between text-left transition-colors"
                  >
                    <span className="font-semibold text-text text-sm md:text-base pr-4">{faq.question}</span>
                    <span className="w-5 h-5 rounded-full bg-[#A8D5BA] flex items-center justify-center flex-shrink-0">
                      {openIndex === index ? (
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
                  {openIndex === index && (
                    <div className="px-4 md:px-6 pb-4 md:pb-6 text-text-muted text-sm md:text-base leading-relaxed">
                      {answerContent}
                    </div>
                  )}
                </div>
                )
              })}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}


