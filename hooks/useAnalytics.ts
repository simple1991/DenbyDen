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
  type PageViewEvent,
  type NavigationClickEvent,
  type ButtonClickEvent,
  type ReviewCarouselNavEvent,
  type CurrencySelectorOpenEvent,
  type CurrencyChangeEvent,
  type SearchIconClickEvent,
  type MobileMenuClickEvent,
  type CollectionClickEvent,
  type CollectionScrollEvent,
  type CartModalOpenEvent,
  type CartModalCloseEvent,
  type CartItemUpdateEvent,
  type CartItemRemoveEvent,
  type CartModalLinkClickEvent,
  type ContactFormSubmitEvent,
  type FAQExpandEvent,
  type ModalCloseEvent,
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
  pageType: 'home' | 'shop' | 'category' | 'christmas',
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
  pageType: 'home' | 'shop' | 'category' | 'christmas'
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
export function useEmailSubmit(pageType: 'home' | 'product_detail' | 'shop' | 'category' | 'about' | 'contact' | 'faq' | 'christmas') {
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
 * Hook: 追踪页面查看
 */
export function usePageView(pageType: 'home' | 'product_detail' | 'shop' | 'category' | 'about' | 'contact' | 'faq' | 'christmas') {
  useEffect(() => {
    const event: PageViewEvent = {
      event_type: 'page_view',
      event_category: 'exposure',
      page_type: pageType,
      page_url: window.location.pathname,
      interaction_type: 'page_view',
    }
    trackEvent(event)
  }, [pageType])
}

/**
 * Hook: 追踪页面停留时长
 */
export function usePageDwell(
  pageType: 'home' | 'product_detail' | 'shop' | 'category' | 'about' | 'contact' | 'faq' | 'christmas',
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

/**
 * Hook: 追踪导航点击
 */
export function useNavigationClick() {
  const handleClick = useCallback((
    linkText: string,
    linkUrl: string,
    linkType: 'nav_item' | 'dropdown_item' | 'mobile_menu_item',
    location: 'header' | 'mobile_menu',
    pageType: 'home' | 'product_detail' | 'shop' | 'category' | 'about' | 'contact' | 'faq' | 'christmas'
  ) => {
    const event: NavigationClickEvent = {
      event_type: 'navigation_click',
      event_category: 'click',
      page_type: pageType,
      page_url: window.location.pathname,
      interaction_type: 'navigation_click',
      interaction_data: {
        link_text: linkText,
        link_url: linkUrl,
        link_type: linkType,
        location,
      },
    }
    trackEvent(event)
  }, [])

  return handleClick
}

/**
 * Hook: 追踪按钮点击
 */
export function useButtonClick() {
  const handleClick = useCallback((
    buttonText: string,
    buttonUrl: string,
    buttonType: 'primary_cta' | 'secondary_cta' | 'text_link',
    buttonLocation: string,
    pageType: 'home' | 'product_detail' | 'shop' | 'category' | 'about' | 'contact' | 'faq' | 'christmas',
    productId?: string,
    sectionName?: string
  ) => {
    const event: ButtonClickEvent = {
      event_type: 'button_click',
      event_category: 'click',
      page_type: pageType,
      page_url: window.location.pathname,
      product_id: productId,
      interaction_type: 'button_click',
      interaction_data: {
        button_text: buttonText,
        button_url: buttonUrl,
        button_type: buttonType,
        button_location: buttonLocation,
        section_name: sectionName,
      },
    }
    trackEvent(event)
  }, [])

  return handleClick
}

/**
 * Hook: 追踪评价轮播导航
 */
export function useReviewCarouselNav() {
  const handleNav = useCallback((
    action: 'prev' | 'next' | 'indicator_click',
    currentIndex: number,
    targetIndex: number,
    reviewCount: number,
    deviceType: 'desktop' | 'mobile',
    pageType: 'home' | 'product_detail' | 'shop' | 'category' | 'about' | 'contact' | 'faq' | 'christmas'
  ) => {
    const event: ReviewCarouselNavEvent = {
      event_type: 'review_carousel_nav',
      event_category: 'interaction',
      page_type: pageType,
      page_url: window.location.pathname,
      interaction_type: 'review_carousel_nav',
      interaction_data: {
        action,
        current_review_index: currentIndex,
        target_review_index: targetIndex,
        review_count: reviewCount,
        device_type: deviceType,
      },
    }
    trackEvent(event)
  }, [])

  return handleNav
}

/**
 * Hook: 追踪货币选择器打开
 */
export function useCurrencySelectorOpen() {
  const handleOpen = useCallback((
    currentCurrency: string,
    location: 'header_desktop' | 'header_mobile' | 'mobile_menu',
    pageType: 'home' | 'product_detail' | 'shop' | 'category' | 'about' | 'contact' | 'faq' | 'christmas'
  ) => {
    const event: CurrencySelectorOpenEvent = {
      event_type: 'currency_selector_open',
      event_category: 'interaction',
      page_type: pageType,
      page_url: window.location.pathname,
      interaction_type: 'currency_selector_open',
      interaction_data: {
        current_currency: currentCurrency,
        location,
      },
    }
    trackEvent(event)
  }, [])

  return handleOpen
}

/**
 * Hook: 追踪货币变更
 */
export function useCurrencyChange() {
  const handleChange = useCallback((
    previousCurrency: string,
    newCurrency: string,
    currencyCode: string,
    currencySymbol: string,
    location: 'header_desktop' | 'header_mobile' | 'mobile_menu',
    pageType: 'home' | 'product_detail' | 'shop' | 'category' | 'about' | 'contact' | 'faq' | 'christmas'
  ) => {
    const event: CurrencyChangeEvent = {
      event_type: 'currency_change',
      event_category: 'interaction',
      page_type: pageType,
      page_url: window.location.pathname,
      interaction_type: 'currency_change',
      interaction_data: {
        previous_currency: previousCurrency,
        new_currency: newCurrency,
        currency_code: currencyCode,
        currency_symbol: currencySymbol,
        location,
      },
    }
    trackEvent(event)
  }, [])

  return handleChange
}

/**
 * Hook: 追踪搜索图标点击
 */
export function useSearchIconClick() {
  const handleClick = useCallback((
    pageType: 'home' | 'product_detail' | 'shop' | 'category' | 'about' | 'contact' | 'faq' | 'christmas',
    deviceType: 'desktop' | 'mobile' = 'desktop'
  ) => {
    const event: SearchIconClickEvent = {
      event_type: 'search_icon_click',
      event_category: 'click',
      page_type: pageType,
      page_url: window.location.pathname,
      interaction_type: 'search_icon_click',
      interaction_data: {
        action: 'open_search',
        location: 'header',
        device_type: deviceType,
      },
    }
    trackEvent(event)
  }, [])

  return handleClick
}

/**
 * Hook: 追踪移动端菜单点击
 */
export function useMobileMenuClick() {
  const handleClick = useCallback((
    pageType: 'home' | 'product_detail' | 'shop' | 'category' | 'about' | 'contact' | 'faq' | 'christmas'
  ) => {
    const event: MobileMenuClickEvent = {
      event_type: 'mobile_menu_click',
      event_category: 'click',
      page_type: pageType,
      page_url: window.location.pathname,
      interaction_type: 'mobile_menu_click',
      interaction_data: {
        action: 'open_mobile_menu',
        location: 'header_mobile',
        device_type: 'mobile',
      },
    }
    trackEvent(event)
  }, [])

  return handleClick
}

/**
 * Hook: 追踪Collection点击
 */
export function useCollectionClick() {
  const handleClick = useCallback((
    collectionName: string,
    collectionUrl: string,
    position: number,
    deviceType: 'desktop' | 'mobile',
    pageType: 'home' | 'product_detail' | 'shop' | 'category' | 'about' | 'contact' | 'faq' | 'christmas'
  ) => {
    const event: CollectionClickEvent = {
      event_type: 'collection_click',
      event_category: 'click',
      page_type: pageType,
      page_url: window.location.pathname,
      interaction_type: 'collection_click',
      interaction_data: {
        collection_name: collectionName,
        collection_url: collectionUrl,
        position,
        device_type: deviceType,
      },
    }
    trackEvent(event)
  }, [])

  return handleClick
}

/**
 * Hook: 追踪Collection滚动
 */
export function useCollectionScroll() {
  const handleScroll = useCallback((
    scrollDirection: 'left' | 'right',
    currentIndex: number,
    totalCollections: number,
    pageType: 'home' | 'product_detail' | 'shop' | 'category' | 'about' | 'contact' | 'faq' | 'christmas'
  ) => {
    const event: CollectionScrollEvent = {
      event_type: 'collection_scroll',
      event_category: 'interaction',
      page_type: pageType,
      page_url: window.location.pathname,
      interaction_type: 'collection_scroll',
      interaction_data: {
        scroll_direction: scrollDirection,
        current_index: currentIndex,
        total_collections: totalCollections,
        device_type: 'mobile',
      },
    }
    trackEvent(event)
  }, [])

  return handleScroll
}

/**
 * Hook: 追踪购物车弹窗打开
 */
export function useCartModalOpen() {
  const handleOpen = useCallback((
    cartItemCount: number,
    cartTotal: number,
    triggerSource: 'header_cart_icon' | 'add_to_cart_button',
    pageType: 'home' | 'product_detail' | 'shop' | 'category' | 'about' | 'contact' | 'faq' | 'christmas'
  ) => {
    const event: CartModalOpenEvent = {
      event_type: 'cart_modal_open',
      event_category: 'interaction',
      page_type: pageType,
      page_url: window.location.pathname,
      interaction_type: 'cart_modal_open',
      interaction_data: {
        cart_item_count: cartItemCount,
        cart_total: cartTotal,
        trigger_source: triggerSource,
      },
    }
    trackEvent(event)
  }, [])

  return handleOpen
}

/**
 * Hook: 追踪购物车弹窗关闭
 */
export function useCartModalClose() {
  const handleClose = useCallback((
    cartItemCount: number,
    modalDisplayTimeSeconds: number,
    closeMethod: 'close_button' | 'background_click' | 'escape_key' | 'link_click',
    pageType: 'home' | 'product_detail' | 'shop' | 'category' | 'about' | 'contact' | 'faq' | 'christmas'
  ) => {
    const event: CartModalCloseEvent = {
      event_type: 'cart_modal_close',
      event_category: 'interaction',
      page_type: pageType,
      page_url: window.location.pathname,
      interaction_type: 'cart_modal_close',
      interaction_data: {
        cart_item_count: cartItemCount,
        modal_display_time_seconds: modalDisplayTimeSeconds,
        close_method: closeMethod,
      },
    }
    trackEvent(event)
  }, [])

  return handleClose
}

/**
 * Hook: 追踪购物车商品更新
 */
export function useCartItemUpdate() {
  const handleUpdate = useCallback((
    productId: string,
    productSlug: string,
    quantity: number,
    changeType: 'increase' | 'decrease',
    previousQuantity: number,
    pageType: 'home' | 'product_detail' | 'shop' | 'category' | 'about' | 'contact' | 'faq' | 'christmas'
  ) => {
    const event: CartItemUpdateEvent = {
      event_type: 'cart_item_update',
      event_category: 'conversion',
      page_type: pageType,
      page_url: window.location.pathname,
      product_id: productId,
      product_slug: productSlug,
      quantity,
      action_type: 'update',
      interaction_data: {
        change_type: changeType,
        previous_quantity: previousQuantity,
        new_quantity: quantity,
      },
    }
    trackEvent(event)
  }, [])

  return handleUpdate
}

/**
 * Hook: 追踪购物车商品删除
 */
export function useCartItemRemove() {
  const handleRemove = useCallback((
    productId: string,
    productSlug: string,
    removedQuantity: number,
    pageType: 'home' | 'product_detail' | 'shop' | 'category' | 'about' | 'contact' | 'faq' | 'christmas'
  ) => {
    const event: CartItemRemoveEvent = {
      event_type: 'cart_item_remove',
      event_category: 'conversion',
      page_type: pageType,
      page_url: window.location.pathname,
      product_id: productId,
      product_slug: productSlug,
      action_type: 'remove',
      interaction_data: {
        removed_quantity: removedQuantity,
      },
    }
    trackEvent(event)
  }, [])

  return handleRemove
}

/**
 * Hook: 追踪购物车弹窗链接点击
 */
export function useCartModalLinkClick() {
  const handleClick = useCallback((
    linkType: 'view_cart' | 'checkout' | 'continue_shopping',
    linkUrl: string,
    linkText: string,
    pageType: 'home' | 'product_detail' | 'shop' | 'category' | 'about' | 'contact' | 'faq' | 'christmas'
  ) => {
    const event: CartModalLinkClickEvent = {
      event_type: 'cart_modal_link_click',
      event_category: 'click',
      page_type: pageType,
      page_url: window.location.pathname,
      interaction_type: 'cart_modal_link_click',
      interaction_data: {
        link_type: linkType,
        link_url: linkUrl,
        link_text: linkText,
      },
    }
    trackEvent(event)
  }, [])

  return handleClick
}

/**
 * Hook: 追踪联系表单提交
 */
export function useContactFormSubmit() {
  const handleSubmit = useCallback((
    hasName: boolean,
    hasEmail: boolean,
    hasPhone: boolean,
    hasMessage: boolean,
    formCompletionTimeSeconds: number,
    pageType: 'home' | 'product_detail' | 'shop' | 'category' | 'about' | 'contact' | 'faq' | 'christmas'
  ) => {
    const event: ContactFormSubmitEvent = {
      event_type: 'contact_form_submit',
      event_category: 'lead',
      page_type: pageType,
      page_url: window.location.pathname,
      interaction_type: 'contact_form_submit',
      interaction_data: {
        form_type: 'contact_form',
        has_name: hasName,
        has_email: hasEmail,
        has_phone: hasPhone,
        has_message: hasMessage,
        form_completion_time_seconds: formCompletionTimeSeconds,
      },
    }
    trackEvent(event)
  }, [])

  return handleSubmit
}

/**
 * Hook: 追踪FAQ展开
 */
export function useFAQExpand() {
  const handleExpand = useCallback((
    action: 'expand' | 'collapse',
    faqIndex: number,
    faqQuestion: string,
    clickTarget: 'add_icon' | 'close_icon',
    location: 'home_faq_section' | 'faq_page',
    pageType: 'home' | 'product_detail' | 'shop' | 'category' | 'about' | 'contact' | 'faq' | 'christmas'
  ) => {
    const event: FAQExpandEvent = {
      event_type: 'faq_expand',
      event_category: 'interaction',
      page_type: pageType,
      page_url: window.location.pathname,
      interaction_type: 'faq_expand',
      interaction_data: {
        action,
        faq_index: faqIndex,
        faq_question: faqQuestion,
        click_target: clickTarget,
        location,
      },
    }
    trackEvent(event)
  }, [])

  return handleExpand
}

/**
 * Hook: 追踪模态框关闭
 */
export function useModalClose() {
  const handleClose = useCallback((
    modalType: 'email_capture' | 'cart_modal' | 'other',
    closeMethod: 'close_button' | 'background_click' | 'escape_key',
    modalDisplayTimeSeconds: number,
    wasSubmitted: boolean = false,
    pageType: 'home' | 'product_detail' | 'shop' | 'category' | 'about' | 'contact' | 'faq' | 'christmas'
  ) => {
    const event: ModalCloseEvent = {
      event_type: 'modal_close',
      event_category: 'interaction',
      page_type: pageType,
      page_url: window.location.pathname,
      interaction_type: 'modal_close',
      interaction_data: {
        modal_type: modalType,
        close_method: closeMethod,
        modal_display_time_seconds: modalDisplayTimeSeconds,
        was_submitted: wasSubmitted,
      },
    }
    trackEvent(event)
  }, [])

  return handleClose
}

