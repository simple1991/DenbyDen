/**
 * React Hooks for Analytics
 * 简化埋点使用的自定义 Hooks
 */

import { useEffect, useRef, useCallback } from 'react'
import type { RefObject } from 'react'
import {
  trackEvent,
  type AnalyticsEvent,
  type ProductExposureEvent,
  type ProductClickEvent,
  type AddToCartEvent,
  type EmailSubmitEvent,
  type PageDwellEvent,
  type ProductDetailViewEvent,
  type ImageSwipeEvent,
  type SectionExpandEvent,
  type GiftWrappingToggleEvent,
  type ScrollDepthEvent,
  getSourcePage,
  isNewUser,
} from '@/lib/analytics'

/**
 * Hook: 追踪产品曝光
 */
export function useProductExposure(
  productId: string,
  productSlug: string,
  position: number,
  listType: string,
  pageType: 'home' | 'shop' | 'category',
  enabled: boolean = true
) {
  const hasTracked = useRef(false)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const elementRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!enabled || hasTracked.current) return

    const element = elementRef.current
    if (!element) return

    // 使用 Intersection Observer 检测元素是否进入视口
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTracked.current) {
            const viewportPosition =
              entry.boundingClientRect.top < window.innerHeight * 0.5
                ? 'above_fold'
                : 'below_fold'

            const event: ProductExposureEvent = {
              event_type: 'product_exposure',
              event_category: 'exposure',
              page_type: pageType,
              page_url: window.location.pathname,
              product_id: productId,
              product_slug: productSlug,
              position,
              exposure_count: 1,
              list_type: listType,
              viewport_position: viewportPosition,
            }

            trackEvent(event)
            hasTracked.current = true

            // 断开观察
            if (observerRef.current) {
              observerRef.current.disconnect()
            }
          }
        })
      },
      {
        threshold: 0.5, // 50% 可见时触发
        rootMargin: '0px',
      }
    )

    observerRef.current.observe(element)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [productId, productSlug, position, listType, pageType, enabled])

  return elementRef as RefObject<HTMLDivElement>
}

/**
 * Hook: 追踪产品点击
 */
export function useProductClick(
  productId: string,
  productSlug: string,
  position: number,
  clickType: 'card_click' | 'add_to_cart_button' | 'buy_now_button',
  pageType: 'home' | 'shop' | 'category'
) {
  const handleClick = useCallback(() => {
    const event: ProductClickEvent = {
      event_type: 'product_click',
      event_category: 'click',
      page_type: pageType,
      page_url: window.location.pathname,
      product_id: productId,
      product_slug: productSlug,
      position,
      click_type: clickType,
      source_page: getSourcePage(),
    }

    trackEvent(event)
  }, [productId, productSlug, position, clickType, pageType])

  return handleClick
}

/**
 * Hook: 追踪加入购物车
 */
export function useAddToCart(
  productId: string,
  productSlug: string,
  quantity: number,
  price: number,
  variant?: string | null,
  giftWrapping?: boolean,
  position?: number
) {
  const handleAddToCart = useCallback(() => {
    const event: AddToCartEvent = {
      event_type: 'add_to_cart',
      event_category: 'conversion',
      page_type: 'home', // 会根据实际页面调整
      page_url: window.location.pathname,
      product_id: productId,
      product_slug: productSlug,
      quantity,
      action_type: 'add',
      variant: variant || null,
      gift_wrapping: giftWrapping || false,
      total_price: price * quantity,
      position,
    }

    trackEvent(event)
  }, [productId, productSlug, quantity, price, variant, giftWrapping, position])

  return handleAddToCart
}

/**
 * Hook: 追踪邮箱提交
 */
export function useEmailSubmit(pageType: 'home' | 'product_detail' | 'shop' | 'category') {
  const handleSubmit = useCallback((email: string) => {
    const event: EmailSubmitEvent = {
      event_type: 'email_submit',
      event_category: 'lead',
      page_type: pageType,
      page_url: window.location.pathname,
      email,
      source_page: pageType,
      is_new_user: isNewUser(),
    }

    trackEvent(event)
  }, [pageType])

  return handleSubmit
}

/**
 * Hook: 追踪页面停留时长
 */
export function usePageDwell(
  pageType: 'home' | 'product_detail' | 'shop' | 'category',
  productId?: string
) {
  const startTimeRef = useRef<number>(Date.now())
  const hasTrackedRef = useRef(false)

  useEffect(() => {
    startTimeRef.current = Date.now()
    hasTrackedRef.current = false

    const handleBeforeUnload = () => {
      if (hasTrackedRef.current) return

      const dwellTime = Math.floor((Date.now() - startTimeRef.current) / 1000)
      const isBounce = dwellTime < 3

      const event: PageDwellEvent = {
        event_type: isBounce ? 'page_bounce' : 'page_dwell',
        event_category: 'interaction',
        page_type: pageType,
        page_url: window.location.pathname,
        dwell_time_seconds: dwellTime,
        is_bounce: isBounce,
        product_id: productId,
      }

      trackEvent(event)
      hasTrackedRef.current = true
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && !hasTrackedRef.current) {
        handleBeforeUnload()
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      document.removeEventListener('visibilitychange', handleVisibilityChange)

      // 组件卸载时也上报
      if (!hasTrackedRef.current) {
        handleBeforeUnload()
      }
    }
  }, [pageType, productId])
}

/**
 * Hook: 追踪产品详情页查看
 */
export function useProductDetailView(productId: string, productSlug: string) {
  useEffect(() => {
    const event: ProductDetailViewEvent = {
      event_type: 'product_detail_view',
      event_category: 'exposure',
      page_type: 'product_detail',
      page_url: window.location.pathname,
      product_id: productId,
      product_slug: productSlug,
      source_page: getSourcePage(),
    }

    trackEvent(event)
  }, [productId, productSlug])
}

/**
 * Hook: 追踪图片滑动
 */
export function useImageSwipe(productId: string, totalImages: number) {
  const handleSwipe = useCallback((imageIndex: number) => {
    const event: ImageSwipeEvent = {
      event_type: 'image_swipe',
      event_category: 'interaction',
      page_type: 'product_detail',
      page_url: window.location.pathname,
      product_id: productId,
      interaction_type: 'image_swipe',
      interaction_data: {
        image_index: imageIndex,
        total_images: totalImages,
      },
    }

    trackEvent(event)
  }, [productId, totalImages])

  return handleSwipe
}

/**
 * Hook: 追踪折叠区展开
 */
export function useSectionExpand(productId: string) {
  const handleExpand = useCallback((sectionName: string) => {
    const event: SectionExpandEvent = {
      event_type: 'section_expand',
      event_category: 'interaction',
      page_type: 'product_detail',
      page_url: window.location.pathname,
      product_id: productId,
      interaction_type: 'section_expand',
      interaction_data: {
        section_name: sectionName,
        section_type: 'collapsible',
      },
    }

    trackEvent(event)
  }, [productId])

  return handleExpand
}

/**
 * Hook: 追踪礼品包装切换
 */
export function useGiftWrappingToggle(productId: string) {
  const handleToggle = useCallback((giftWrapping: boolean) => {
    const event: GiftWrappingToggleEvent = {
      event_type: 'gift_wrapping_toggle',
      event_category: 'interaction',
      page_type: 'product_detail',
      page_url: window.location.pathname,
      product_id: productId,
      interaction_type: 'gift_wrapping_select',
      interaction_data: {
        gift_wrapping: giftWrapping,
      },
    }

    trackEvent(event)
  }, [productId])

  return handleToggle
}

/**
 * Hook: 追踪滚动深度
 */
export function useScrollDepth(
  pageType: 'home' | 'shop' | 'category',
  onDepthReached?: (depth: number) => void
) {
  const trackedDepths = useRef<Set<number>>(new Set())

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight
      const scrollTop = document.documentElement.scrollTop
      const clientHeight = document.documentElement.clientHeight

      const scrollPercentage = Math.floor(
        ((scrollTop + clientHeight) / scrollHeight) * 100
      )

      // 追踪 25%, 50%, 75%, 100% 的滚动深度
      const depths = [25, 50, 75, 100]
      depths.forEach((depth) => {
        if (scrollPercentage >= depth && !trackedDepths.current.has(depth)) {
          trackedDepths.current.add(depth)

          const event: ScrollDepthEvent = {
            event_type: 'scroll_depth',
            event_category: 'interaction',
            page_type: pageType,
            page_url: window.location.pathname,
            interaction_type: 'scroll_depth',
            scroll_depth: depth,
          }

          trackEvent(event)

          if (onDepthReached) {
            onDepthReached(depth)
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [pageType, onDepthReached])
}

