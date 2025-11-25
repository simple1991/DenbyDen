/**
 * 埋点分析工具库
 * 用于收集用户行为数据并上报到 Supabase
 */

import { supabase } from './supabase'

// 事件类型定义
export type EventType =
  | 'product_exposure'
  | 'product_click'
  | 'add_to_cart'
  | 'email_submit'
  | 'page_dwell'
  | 'page_bounce'
  | 'page_view'
  | 'product_detail_view'
  | 'image_swipe'
  | 'section_expand'
  | 'gift_wrapping_toggle'
  | 'scroll_depth'
  | 'filter_select'
  | 'navigation_click'
  | 'button_click'
  | 'review_carousel_nav'
  | 'currency_selector_open'
  | 'currency_change'
  | 'search_icon_click'
  | 'mobile_menu_click'
  | 'collection_click'
  | 'collection_scroll'
  | 'cart_modal_open'
  | 'cart_modal_close'
  | 'cart_item_update'
  | 'cart_item_remove'
  | 'cart_modal_link_click'
  | 'contact_form_submit'
  | 'faq_expand'
  | 'modal_close'

export type EventCategory = 'exposure' | 'click' | 'conversion' | 'interaction' | 'lead'
export type PageType = 'home' | 'product_detail' | 'shop' | 'category' | 'about' | 'contact' | 'faq' | 'christmas'

// 用户标识和会话管理
const USER_ID_KEY = 'analytics_user_id'
const SESSION_ID_KEY = 'analytics_session_id'

/**
 * 获取或创建用户ID
 */
function getUserId(): string {
  if (typeof window === 'undefined') return ''
  
  let userId = localStorage.getItem(USER_ID_KEY)
  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    localStorage.setItem(USER_ID_KEY, userId)
  }
  return userId
}

/**
 * 获取或创建会话ID
 */
function getSessionId(): string {
  if (typeof window === 'undefined') return ''
  
  let sessionId = sessionStorage.getItem(SESSION_ID_KEY)
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    sessionStorage.setItem(SESSION_ID_KEY, sessionId)
  }
  return sessionId
}

/**
 * 获取当前页面URL
 */
function getPageUrl(): string {
  if (typeof window === 'undefined') return ''
  return window.location.pathname
}

/**
 * 基础事件接口
 */
interface BaseEvent {
  event_type: EventType
  event_category: EventCategory
  page_type: PageType
  page_url: string
  user_id?: string
  session_id?: string
  timestamp?: string
}

/**
 * 产品曝光事件
 */
export interface ProductExposureEvent extends BaseEvent {
  event_type: 'product_exposure'
  event_category: 'exposure'
  product_id: string
  product_slug: string
  position: number
  exposure_count?: number
  list_type: string
  viewport_position?: 'above_fold' | 'below_fold'
  category?: string
}

/**
 * 产品点击事件
 */
export interface ProductClickEvent extends BaseEvent {
  event_type: 'product_click'
  event_category: 'click'
  product_id: string
  product_slug: string
  position: number
  click_type: 'card_click' | 'add_to_cart_button' | 'buy_now_button'
  source_page: string
}

/**
 * 加入购物车事件
 */
export interface AddToCartEvent extends BaseEvent {
  event_type: 'add_to_cart'
  event_category: 'conversion' | 'click'
  product_id: string
  product_slug: string
  quantity: number
  action_type: 'add' | 'update' | 'remove'
  variant?: string | null
  gift_wrapping?: boolean
  total_price: number
  position?: number
}

/**
 * 邮箱提交事件
 */
export interface EmailSubmitEvent extends BaseEvent {
  event_type: 'email_submit'
  event_category: 'lead'
  email: string
  source_page: string
  is_new_user: boolean
}

/**
 * 页面停留事件
 */
export interface PageDwellEvent extends BaseEvent {
  event_type: 'page_dwell' | 'page_bounce'
  event_category: 'interaction'
  dwell_time_seconds: number
  is_bounce: boolean
  product_id?: string
}

/**
 * 产品详情页查看事件
 */
export interface ProductDetailViewEvent extends BaseEvent {
  event_type: 'product_detail_view'
  event_category: 'exposure'
  product_id: string
  product_slug: string
  source_page: string
}

/**
 * 图片滑动事件
 */
export interface ImageSwipeEvent extends BaseEvent {
  event_type: 'image_swipe'
  event_category: 'interaction'
  product_id: string
  interaction_type: 'image_swipe'
  interaction_data: {
    image_index: number
    total_images: number
  }
}

/**
 * 折叠区展开事件
 */
export interface SectionExpandEvent extends BaseEvent {
  event_type: 'section_expand'
  event_category: 'interaction'
  product_id: string
  interaction_type: 'section_expand'
  interaction_data: {
    section_name: string
    section_type: string
  }
}

/**
 * 礼品包装切换事件
 */
export interface GiftWrappingToggleEvent extends BaseEvent {
  event_type: 'gift_wrapping_toggle'
  event_category: 'interaction'
  product_id: string
  interaction_type: 'gift_wrapping_select'
  interaction_data: {
    gift_wrapping: boolean
  }
}

/**
 * 滚动深度事件
 */
export interface ScrollDepthEvent extends BaseEvent {
  event_type: 'scroll_depth'
  event_category: 'interaction'
  interaction_type: 'scroll_depth'
  scroll_depth: number
  interaction_data?: {
    products_exposed?: number
  }
}

/**
 * 筛选选择事件
 */
export interface FilterSelectEvent extends BaseEvent {
  event_type: 'filter_select'
  event_category: 'interaction'
  interaction_type: 'filter_select'
  interaction_data: {
    filter_type: string
    filter_value: string
    result_count: number
  }
}

/**
 * 页面查看事件
 */
export interface PageViewEvent extends BaseEvent {
  event_type: 'page_view'
  event_category: 'exposure'
  interaction_type: 'page_view'
}

/**
 * 导航点击事件
 */
export interface NavigationClickEvent extends BaseEvent {
  event_type: 'navigation_click'
  event_category: 'click'
  interaction_type: 'navigation_click'
  interaction_data: {
    link_text: string
    link_url: string
    link_type: 'nav_item' | 'dropdown_item' | 'mobile_menu_item'
    location: 'header' | 'mobile_menu'
  }
}

/**
 * 按钮点击事件
 */
export interface ButtonClickEvent extends BaseEvent {
  event_type: 'button_click'
  event_category: 'click'
  interaction_type: 'button_click'
  product_id?: string
  interaction_data: {
    button_text: string
    button_url: string
    button_type: 'primary_cta' | 'secondary_cta' | 'text_link'
    button_location: string
    section_name?: string
  }
}

/**
 * 评价轮播导航事件
 */
export interface ReviewCarouselNavEvent extends BaseEvent {
  event_type: 'review_carousel_nav'
  event_category: 'interaction'
  interaction_type: 'review_carousel_nav'
  interaction_data: {
    action: 'prev' | 'next' | 'indicator_click'
    current_review_index: number
    target_review_index: number
    review_count: number
    device_type: 'desktop' | 'mobile'
  }
}

/**
 * 货币选择器打开事件
 */
export interface CurrencySelectorOpenEvent extends BaseEvent {
  event_type: 'currency_selector_open'
  event_category: 'interaction'
  interaction_type: 'currency_selector_open'
  interaction_data: {
    current_currency: string
    location: 'header_desktop' | 'header_mobile' | 'mobile_menu'
  }
}

/**
 * 货币变更事件
 */
export interface CurrencyChangeEvent extends BaseEvent {
  event_type: 'currency_change'
  event_category: 'interaction'
  interaction_type: 'currency_change'
  interaction_data: {
    previous_currency: string
    new_currency: string
    currency_code: string
    currency_symbol: string
    location: 'header_desktop' | 'header_mobile' | 'mobile_menu'
  }
}

/**
 * 搜索图标点击事件
 */
export interface SearchIconClickEvent extends BaseEvent {
  event_type: 'search_icon_click'
  event_category: 'click'
  interaction_type: 'search_icon_click'
  interaction_data: {
    action: 'open_search'
    location: 'header'
    device_type: 'desktop' | 'mobile'
  }
}

/**
 * 移动端菜单点击事件
 */
export interface MobileMenuClickEvent extends BaseEvent {
  event_type: 'mobile_menu_click'
  event_category: 'click'
  interaction_type: 'mobile_menu_click'
  interaction_data: {
    action: 'open_mobile_menu'
    location: 'header_mobile'
    device_type: 'mobile'
  }
}

/**
 * Collection点击事件
 */
export interface CollectionClickEvent extends BaseEvent {
  event_type: 'collection_click'
  event_category: 'click'
  interaction_type: 'collection_click'
  interaction_data: {
    collection_name: string
    collection_url: string
    position: number
    device_type: 'desktop' | 'mobile'
  }
}

/**
 * Collection滚动事件
 */
export interface CollectionScrollEvent extends BaseEvent {
  event_type: 'collection_scroll'
  event_category: 'interaction'
  interaction_type: 'collection_scroll'
  interaction_data: {
    scroll_direction: 'left' | 'right'
    current_index: number
    total_collections: number
    device_type: 'mobile'
  }
}

/**
 * 购物车弹窗打开事件
 */
export interface CartModalOpenEvent extends BaseEvent {
  event_type: 'cart_modal_open'
  event_category: 'interaction'
  interaction_type: 'cart_modal_open'
  interaction_data: {
    cart_item_count: number
    cart_total: number
    trigger_source: 'header_cart_icon' | 'add_to_cart_button'
  }
}

/**
 * 购物车弹窗关闭事件
 */
export interface CartModalCloseEvent extends BaseEvent {
  event_type: 'cart_modal_close'
  event_category: 'interaction'
  interaction_type: 'cart_modal_close'
  interaction_data: {
    cart_item_count: number
    modal_display_time_seconds: number
    close_method: 'close_button' | 'background_click' | 'escape_key' | 'link_click'
  }
}

/**
 * 购物车商品更新事件
 */
export interface CartItemUpdateEvent extends BaseEvent {
  event_type: 'cart_item_update'
  event_category: 'conversion'
  product_id: string
  product_slug: string
  quantity: number
  action_type: 'update'
  interaction_data: {
    change_type: 'increase' | 'decrease'
    previous_quantity: number
    new_quantity: number
  }
}

/**
 * 购物车商品删除事件
 */
export interface CartItemRemoveEvent extends BaseEvent {
  event_type: 'cart_item_remove'
  event_category: 'conversion'
  product_id: string
  product_slug: string
  action_type: 'remove'
  interaction_data: {
    removed_quantity: number
  }
}

/**
 * 购物车弹窗链接点击事件
 */
export interface CartModalLinkClickEvent extends BaseEvent {
  event_type: 'cart_modal_link_click'
  event_category: 'click'
  interaction_type: 'cart_modal_link_click'
  interaction_data: {
    link_type: 'view_cart' | 'checkout' | 'continue_shopping'
    link_url: string
    link_text: string
  }
}

/**
 * 联系表单提交事件
 */
export interface ContactFormSubmitEvent extends BaseEvent {
  event_type: 'contact_form_submit'
  event_category: 'lead'
  interaction_type: 'contact_form_submit'
  interaction_data: {
    form_type: 'contact_form'
    has_name: boolean
    has_email: boolean
    has_phone: boolean
    has_message: boolean
    form_completion_time_seconds: number
  }
}

/**
 * FAQ展开事件
 */
export interface FAQExpandEvent extends BaseEvent {
  event_type: 'faq_expand'
  event_category: 'interaction'
  interaction_type: 'faq_expand'
  interaction_data: {
    action: 'expand' | 'collapse'
    faq_index: number
    faq_question: string
    click_target: 'add_icon' | 'close_icon'
    location?: 'home_faq_section' | 'faq_page'
  }
}

/**
 * 模态框关闭事件
 */
export interface ModalCloseEvent extends BaseEvent {
  event_type: 'modal_close'
  event_category: 'interaction'
  interaction_type: 'modal_close'
  interaction_data: {
    modal_type: 'email_capture' | 'cart_modal' | 'other'
    close_method: 'close_button' | 'background_click' | 'escape_key'
    modal_display_time_seconds: number
    was_submitted?: boolean
  }
}

export type AnalyticsEvent =
  | ProductExposureEvent
  | ProductClickEvent
  | AddToCartEvent
  | EmailSubmitEvent
  | PageDwellEvent
  | ProductDetailViewEvent
  | ImageSwipeEvent
  | SectionExpandEvent
  | GiftWrappingToggleEvent
  | ScrollDepthEvent
  | FilterSelectEvent
  | PageViewEvent
  | NavigationClickEvent
  | ButtonClickEvent
  | ReviewCarouselNavEvent
  | CurrencySelectorOpenEvent
  | CurrencyChangeEvent
  | SearchIconClickEvent
  | MobileMenuClickEvent
  | CollectionClickEvent
  | CollectionScrollEvent
  | CartModalOpenEvent
  | CartModalCloseEvent
  | CartItemUpdateEvent
  | CartItemRemoveEvent
  | CartModalLinkClickEvent
  | ContactFormSubmitEvent
  | FAQExpandEvent
  | ModalCloseEvent

// 批量上报队列
const eventQueue: AnalyticsEvent[] = []
const BATCH_SIZE = 10
const BATCH_INTERVAL = 5000 // 5秒

let batchTimer: NodeJS.Timeout | null = null

/**
 * 批量上报事件
 */
async function flushEventQueue() {
  if (eventQueue.length === 0) return

  const eventsToSend = [...eventQueue]
  eventQueue.length = 0

  try {
    // 插入主事件表
    const { data: events, error: eventsError } = await supabase
      .from('events')
      .insert(
        eventsToSend.map((event) => ({
          event_type: event.event_type,
          event_category: event.event_category,
          page_type: event.page_type,
          page_url: event.page_url,
          user_id: event.user_id || getUserId(),
          session_id: event.session_id || getSessionId(),
          timestamp: event.timestamp || new Date().toISOString(),
        }))
      )
      .select()

    if (eventsError) {
      console.error('Failed to insert events:', eventsError)
      // 失败的事件重新加入队列
      eventQueue.push(...eventsToSend)
      return
    }

    // 根据事件类型插入到对应的详细表
    for (let i = 0; i < eventsToSend.length; i++) {
      const event = eventsToSend[i]
      const eventId = events?.[i]?.id

      if (!eventId) continue

      try {
        switch (event.event_type) {
          case 'product_exposure':
          case 'product_detail_view': {
            const e = event as ProductExposureEvent | ProductDetailViewEvent
            await supabase.from('product_exposures').insert({
              event_id: eventId,
              product_id: e.product_id,
              product_slug: e.product_slug,
              position: 'position' in e ? e.position : 0,
              exposure_count: 'exposure_count' in e ? e.exposure_count : 1,
              list_type: 'list_type' in e ? e.list_type : 'detail',
              viewport_position: 'viewport_position' in e ? e.viewport_position : null,
            })
            break
          }

          case 'product_click': {
            const e = event as ProductClickEvent
            await supabase.from('product_clicks').insert({
              event_id: eventId,
              product_id: e.product_id,
              product_slug: e.product_slug,
              position: e.position,
              click_type: e.click_type,
              source_page: e.source_page,
            })
            break
          }

          case 'add_to_cart': {
            const e = event as AddToCartEvent
            await supabase.from('cart_actions').insert({
              event_id: eventId,
              product_id: e.product_id,
              product_slug: e.product_slug,
              quantity: e.quantity,
              action_type: e.action_type,
              variant: e.variant || null,
              gift_wrapping: e.gift_wrapping || false,
              total_price: e.total_price,
            })
            break
          }

          case 'email_submit': {
            const e = event as EmailSubmitEvent
            await supabase.from('email_captures').insert({
              event_id: eventId,
              email: e.email,
              source_page: e.source_page,
              is_new_user: e.is_new_user,
              user_id: getUserId(),
            })
            break
          }

          case 'page_dwell':
          case 'page_bounce': {
            const e = event as PageDwellEvent
            await supabase.from('page_dwell_time').insert({
              event_id: eventId,
              page_type: e.page_type,
              page_url: e.page_url,
              product_id: e.product_id || null,
              dwell_time_seconds: e.dwell_time_seconds,
              is_bounce: e.is_bounce,
            })
            break
          }

          case 'image_swipe':
          case 'section_expand':
          case 'gift_wrapping_toggle':
          case 'scroll_depth':
          case 'filter_select':
          case 'page_view':
          case 'navigation_click':
          case 'button_click':
          case 'review_carousel_nav':
          case 'currency_selector_open':
          case 'currency_change':
          case 'search_icon_click':
          case 'mobile_menu_click':
          case 'collection_click':
          case 'collection_scroll':
          case 'cart_modal_open':
          case 'cart_modal_close':
          case 'cart_modal_link_click':
          case 'contact_form_submit':
          case 'faq_expand':
          case 'modal_close': {
            const e = event as
              | ImageSwipeEvent
              | SectionExpandEvent
              | GiftWrappingToggleEvent
              | ScrollDepthEvent
              | FilterSelectEvent
              | PageViewEvent
              | NavigationClickEvent
              | ButtonClickEvent
              | ReviewCarouselNavEvent
              | CurrencySelectorOpenEvent
              | CurrencyChangeEvent
              | SearchIconClickEvent
              | MobileMenuClickEvent
              | CollectionClickEvent
              | CollectionScrollEvent
              | CartModalOpenEvent
              | CartModalCloseEvent
              | CartModalLinkClickEvent
              | ContactFormSubmitEvent
              | FAQExpandEvent
              | ModalCloseEvent
            await supabase.from('page_interactions').insert({
              event_id: eventId,
              interaction_type: e.interaction_type,
              product_id: 'product_id' in e ? e.product_id : null,
              interaction_data: e.interaction_data || {},
              scroll_depth: 'scroll_depth' in e ? e.scroll_depth : null,
            })
            break
          }

          case 'cart_item_update':
          case 'cart_item_remove': {
            const e = event as CartItemUpdateEvent | CartItemRemoveEvent
            await supabase.from('cart_actions').insert({
              event_id: eventId,
              product_id: e.product_id,
              product_slug: e.product_slug,
              quantity: 'quantity' in e ? e.quantity : 0,
              action_type: e.action_type,
              variant: null,
              gift_wrapping: false,
              total_price: 0, // 购物车内更新/删除不记录价格
            })
            break
          }
        }
      } catch (error) {
        console.error(`Failed to insert detail for ${event.event_type}:`, error)
      }
    }
  } catch (error) {
    console.error('Failed to flush event queue:', error)
    // 失败的事件重新加入队列
    eventQueue.push(...eventsToSend)
  }
}

/**
 * 启动批量上报定时器
 */
function startBatchTimer() {
  if (batchTimer) return

  batchTimer = setInterval(() => {
    if (eventQueue.length >= BATCH_SIZE) {
      flushEventQueue()
    }
  }, BATCH_INTERVAL)
}

/**
 * 上报事件（主函数）
 */
export async function trackEvent(event: AnalyticsEvent) {
  // 添加用户和会话信息
  const enrichedEvent: AnalyticsEvent = {
    ...event,
    user_id: event.user_id || getUserId(),
    session_id: event.session_id || getSessionId(),
    page_url: event.page_url || getPageUrl(),
    timestamp: event.timestamp || new Date().toISOString(),
  }

  // 判断是否需要立即上报
  const immediateEvents: EventType[] = [
    'add_to_cart',
    'email_submit',
    'product_click',
    'product_detail_view',
    'cart_item_update',
    'cart_item_remove',
    'cart_modal_link_click',
    'contact_form_submit',
    'currency_change',
  ]

  if (immediateEvents.includes(event.event_type)) {
    // 立即上报
    eventQueue.push(enrichedEvent)
    await flushEventQueue()
  } else {
    // 加入队列，批量上报
    eventQueue.push(enrichedEvent)
    startBatchTimer()
  }
}

/**
 * 页面卸载时上报所有待上报事件
 */
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    if (eventQueue.length > 0) {
      // 使用 sendBeacon 确保数据能够发送
      navigator.sendBeacon(
        '/api/analytics',
        JSON.stringify({ events: eventQueue })
      )
      flushEventQueue()
    }
  })

  // 页面可见性变化时也上报
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden' && eventQueue.length > 0) {
      flushEventQueue()
    }
  })
}

/**
 * 工具函数：获取来源页面
 */
export function getSourcePage(): string {
  if (typeof window === 'undefined') return 'direct'
  
  const referrer = document.referrer
  if (!referrer) return 'direct'
  
  try {
    const url = new URL(referrer)
    return url.pathname
  } catch {
    return 'direct'
  }
}

/**
 * 工具函数：判断是否为新用户
 */
export function isNewUser(): boolean {
  if (typeof window === 'undefined') return true
  return !localStorage.getItem('hasSubscribed')
}

