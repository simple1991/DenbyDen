'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function CheckoutPage() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isSuccess) {
        window.history.back()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isSuccess])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address')
      return
    }

    setIsSubmitting(true)

    try {
      // 模拟 API 调用
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      // 保存到 localStorage
      const subscriptions = JSON.parse(localStorage.getItem('subscriptions') || '[]')
      subscriptions.push({ 
        email, 
        date: new Date().toISOString(),
        source: 'checkout',
        discount: '30%'
      })
      localStorage.setItem('subscriptions', JSON.stringify(subscriptions))

      setIsSuccess(true)
      setEmail('')
      
      // 5秒后可以关闭
      setTimeout(() => {
        // 可以自动关闭或让用户手动关闭
      }, 5000)
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 bg-black/50 animate-fade-in overflow-y-auto">
      <div
        className="bg-white rounded-lg shadow-modal max-w-4xl w-full max-h-[95vh] overflow-y-auto animate-scale-in relative my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {isSuccess ? (
          <div className="p-6 md:p-8 lg:p-12 text-center">
            <div className="text-4xl md:text-5xl mb-4 md:mb-6">🎉</div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-text mb-3 md:mb-4">
              Thank You for Supporting My Dream!
            </h2>
            <p className="text-base md:text-lg text-text-muted mb-4 md:mb-6">
              I'll notify you the second the first production run is ready, and you'll receive your <span className="font-semibold text-primary">30% OFF</span> discount code!
            </p>
            <Link
              href="/"
              className="btn-primary inline-block text-sm md:text-base"
            >
              Back to Home
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* 左侧/上方：照片 */}
            <div className="relative w-full h-48 sm:h-64 lg:h-auto bg-beige-light overflow-hidden">
              {/* 
                请将您的工作照片放在 public/example_photo/ 目录下，命名为 "student-working.jpg"
                或者修改下面的 src 路径指向您的图片
                建议图片：年轻人背影对着电脑屏幕，或者杂乱的书桌场景
              */}
              <Image
                src="/example_photo/student-working.jpg"
                alt="Student working on the project from dorm room"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                onError={(e) => {
                  // 如果图片不存在，显示占位符
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                  const placeholder = target.parentElement?.querySelector('.image-placeholder') as HTMLElement
                  if (placeholder) placeholder.style.display = 'flex'
                }}
              />
              {/* 占位符 - 当图片不存在时显示 */}
              <div className="image-placeholder absolute inset-0 flex items-center justify-center bg-gradient-to-br from-beige-light to-beige-dark" style={{ display: 'none' }}>
                <div className="text-center p-8 text-text-muted">
                  <svg
                    className="w-24 h-24 mx-auto mb-4 opacity-50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-sm">
                    请添加工作照片到
                    <br />
                    <code className="text-xs bg-white/50 px-2 py-1 rounded">public/example_photo/student-working.jpg</code>
                  </p>
                </div>
              </div>
            </div>

            {/* 右侧/下方：文字和表单 */}
            <div className="p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-center">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-text mb-3 md:mb-4">
                Wait! Can I be 100% honest with you?
              </h1>
              
              <div className="text-sm sm:text-base md:text-lg text-text-muted leading-relaxed mb-4 md:mb-6 space-y-3 md:space-y-4">
                <p>
                  I'm not a big corporation. I'm actually a college student working from my dorm room with a dream to build this brand.
                </p>
                <p>
                  Because I have limited savings, I couldn't afford to mass-produce this product just yet. I built this site to see if anyone has the same taste as I do. Your click on the 'Checkout' button just proved that I'm on the right track! Thank you!
                </p>
                <p>
                  I am preparing for the first production run right now. If you leave your email below, I will notify you the second it's ready, and I'll send you a <span className="font-semibold text-primary">30% OFF</span> code as a 'Thank You' for supporting a student's dream.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setError('')
                    }}
                    placeholder="Enter your email to join my journey"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors text-sm sm:text-base"
                    required
                    autoFocus
                  />
                  {error && (
                    <p className="text-red-500 text-xs sm:text-sm mt-2">{error}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full py-2.5 sm:py-3 text-sm sm:text-base md:text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send me the 30% discount'}
                </button>
              </form>

              {/* 关闭按钮 */}
              <button
                onClick={() => window.history.back()}
                className="absolute top-4 right-4 text-text-muted hover:text-text transition-colors z-10 p-2 bg-white/80 rounded-full hover:bg-white"
                aria-label="Close"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

