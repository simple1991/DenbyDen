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
  | 'product_detail_view'
  | 'image_swipe'
  | 'section_expand'
  | 'gift_wrapping_toggle'
  | 'scroll_depth'
  | 'filter_select'

export type EventCategory = 'exposure' | 'click' | 'conversion' | 'interaction' | 'lead'
export type PageType = 'home' | 'product_detail' | 'shop' | 'category'

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
          case 'filter_select': {
            const e = event as
              | ImageSwipeEvent
              | SectionExpandEvent
              | GiftWrappingToggleEvent
              | ScrollDepthEvent
              | FilterSelectEvent
            await supabase.from('page_interactions').insert({
              event_id: eventId,
              interaction_type: e.interaction_type,
              product_id: 'product_id' in e ? e.product_id : null,
              interaction_data: e.interaction_data || {},
              scroll_depth: 'scroll_depth' in e ? e.scroll_depth : null,
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

