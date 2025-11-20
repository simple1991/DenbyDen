'use client'

import { useState, useEffect } from 'react'

interface EmailCaptureModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
}

export default function EmailCaptureModal({
  isOpen,
  onClose,
  title = "Get 10% Off on Your First Purchase",
  description = "Don't miss exclusive deals & all the fun!",
}: EmailCaptureModalProps) {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    if (isOpen) {
      window.addEventListener('keydown', handleEscape)
    }
    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address')
      return
    }

    setIsSubmitting(true)

    // 模拟 API 调用
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      // 保存到 localStorage
      const subscriptions = JSON.parse(localStorage.getItem('subscriptions') || '[]')
      subscriptions.push({ email, date: new Date().toISOString() })
      localStorage.setItem('subscriptions', JSON.stringify(subscriptions))

      setIsSuccess(true)
      setEmail('')
      
      // 3秒后关闭
      setTimeout(() => {
        setIsSuccess(false)
        onClose()
      }, 3000)
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-md shadow-modal max-w-md w-full p-6 md:p-8 animate-scale-in relative"
        onClick={(e) => e.stopPropagation()}
      >
        {isSuccess ? (
          <div className="text-center">
            <div className="text-4xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-text mb-2">
              You're officially on our list—welcome to the DenbyDen fam!
            </h3>
            <p className="text-text-muted">
              Use code <span className="font-semibold text-primary">WELCOME10</span> for 10% off your first purchase!
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-text mb-2">{title}</h2>
            <p className="text-text-muted mb-6">{description}</p>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setError('')
                  }}
                  placeholder="Add Your E-Mail Here *"
                  className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                  autoFocus
                />
                {error && (
                  <p className="text-red-500 text-sm mt-2">{error}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          </>
        )}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 md:top-4 md:right-4 text-text-muted hover:text-text transition-colors z-10 p-2 bg-white/80 rounded-full"
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
  )
}

