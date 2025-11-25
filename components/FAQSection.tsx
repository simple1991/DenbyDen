'use client'

import { useState, type ReactNode } from 'react'
import Image from 'next/image'
import { useCurrency } from './CurrencyContext'
import { useFAQExpand } from '@/hooks/useAnalytics'
import { usePathname } from 'next/navigation'

type FAQItem = {
  question: string
  answer: string | ((formatPrice: (value: number) => string) => ReactNode)
}

const faqs: FAQItem[] = [
  {
    question: 'What are the shipping costs?',
    answer: (formatPrice) => (
      <>
        Flat shipping fee of {formatPrice(7.95)} for Canada & the US. Free shipping on orders over{' '}
        {formatPrice(49)}.
      </>
    ),
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
  const { formatPrice } = useCurrency()
  const pathname = usePathname()
  
  // 获取当前页面类型
  const getPageType = (): 'home' | 'product_detail' | 'shop' | 'category' | 'about' | 'contact' | 'faq' | 'christmas' => {
    if (pathname === '/') return 'home'
    if (pathname.startsWith('/product/')) return 'product_detail'
    if (pathname === '/shop') return 'shop'
    if (pathname.startsWith('/shop/')) return 'category'
    if (pathname === '/about') return 'about'
    if (pathname === '/contact') return 'contact'
    if (pathname === '/faq') return 'faq'
    if (pathname === '/christmas') return 'christmas'
    return 'home'
  }
  
  const pageType = getPageType()
  const location = pageType === 'home' ? 'home_faq_section' : 'faq_page'
  
  // FAQ展开埋点
  const handleFAQExpand = useFAQExpand()
  
  const handleToggle = (idx: number) => {
    const isExpanding = openIndex !== idx
    const action = isExpanding ? 'expand' : 'collapse'
    const clickTarget = isExpanding ? 'add_icon' : 'close_icon'
    
    // FAQ展开埋点
    handleFAQExpand(
      action,
      idx,
      faqs[idx].question,
      clickTarget,
      location,
      pageType
    )
    
    setOpenIndex(openIndex === idx ? null : idx)
  }

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
          {faqs.map((faq, idx) => {
            const answerContent =
              typeof faq.answer === 'function' ? faq.answer(formatPrice) : faq.answer
            return (
            <div key={idx} className="bg-beige-light rounded-lg shadow-card">
              <button
                className="w-full flex items-center justify-between px-4 md:px-6 py-4 text-left"
                onClick={() => handleToggle(idx)}
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
                    {answerContent}
                </div>
              )}
            </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

