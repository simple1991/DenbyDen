-- Supabase 数据库表结构
-- 请在 Supabase Dashboard 的 SQL Editor 中执行此脚本

-- 1. 事件表 (events) - 存储所有埋点事件的核心表
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  event_category TEXT NOT NULL,
  page_type TEXT NOT NULL,
  page_url TEXT NOT NULL,
  user_id TEXT,
  session_id TEXT,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. 产品曝光表 (product_exposures)
CREATE TABLE IF NOT EXISTS product_exposures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL,
  product_slug TEXT NOT NULL,
  position INTEGER NOT NULL,
  exposure_count INTEGER DEFAULT 1,
  list_type TEXT,
  viewport_position TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. 产品点击表 (product_clicks)
CREATE TABLE IF NOT EXISTS product_clicks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL,
  product_slug TEXT NOT NULL,
  position INTEGER NOT NULL,
  click_type TEXT NOT NULL,
  source_page TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. 购物车操作表 (cart_actions)
CREATE TABLE IF NOT EXISTS cart_actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL,
  product_slug TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  action_type TEXT NOT NULL,
  variant TEXT,
  gift_wrapping BOOLEAN DEFAULT FALSE,
  total_price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. 邮箱留资表 (email_captures)
CREATE TABLE IF NOT EXISTS email_captures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  source_page TEXT NOT NULL,
  is_new_user BOOLEAN DEFAULT TRUE,
  user_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. 页面交互表 (page_interactions)
CREATE TABLE IF NOT EXISTS page_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  interaction_type TEXT NOT NULL,
  product_id TEXT,
  interaction_data JSONB,
  scroll_depth INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. 页面停留表 (page_dwell_time)
CREATE TABLE IF NOT EXISTS page_dwell_time (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  page_type TEXT NOT NULL,
  page_url TEXT NOT NULL,
  product_id TEXT,
  dwell_time_seconds INTEGER NOT NULL,
  is_bounce BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_events_event_type ON events(event_type);
CREATE INDEX IF NOT EXISTS idx_events_page_type ON events(page_type);
CREATE INDEX IF NOT EXISTS idx_events_user_id ON events(user_id);
CREATE INDEX IF NOT EXISTS idx_events_session_id ON events(session_id);
CREATE INDEX IF NOT EXISTS idx_events_timestamp ON events(timestamp);

CREATE INDEX IF NOT EXISTS idx_product_exposures_product_id ON product_exposures(product_id);
CREATE INDEX IF NOT EXISTS idx_product_exposures_event_id ON product_exposures(event_id);

CREATE INDEX IF NOT EXISTS idx_product_clicks_product_id ON product_clicks(product_id);
CREATE INDEX IF NOT EXISTS idx_product_clicks_event_id ON product_clicks(event_id);

CREATE INDEX IF NOT EXISTS idx_cart_actions_product_id ON cart_actions(product_id);
CREATE INDEX IF NOT EXISTS idx_cart_actions_event_id ON cart_actions(event_id);

CREATE INDEX IF NOT EXISTS idx_email_captures_email ON email_captures(email);
CREATE INDEX IF NOT EXISTS idx_email_captures_event_id ON email_captures(event_id);

CREATE INDEX IF NOT EXISTS idx_page_interactions_event_id ON page_interactions(event_id);
CREATE INDEX IF NOT EXISTS idx_page_interactions_product_id ON page_interactions(product_id);

CREATE INDEX IF NOT EXISTS idx_page_dwell_time_page_type ON page_dwell_time(page_type);
CREATE INDEX IF NOT EXISTS idx_page_dwell_time_event_id ON page_dwell_time(event_id);

-- 启用 Row Level Security (RLS)
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_exposures ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_captures ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_dwell_time ENABLE ROW LEVEL SECURITY;

-- 创建策略：允许匿名用户插入数据
CREATE POLICY "Allow anonymous insert" ON events
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anonymous insert" ON product_exposures
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anonymous insert" ON product_clicks
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anonymous insert" ON cart_actions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anonymous insert" ON email_captures
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anonymous insert" ON page_interactions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anonymous insert" ON page_dwell_time
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- 创建策略：允许服务角色读取所有数据（用于数据分析）
CREATE POLICY "Allow service role read" ON events
  FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Allow service role read" ON product_exposures
  FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Allow service role read" ON product_clicks
  FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Allow service role read" ON cart_actions
  FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Allow service role read" ON email_captures
  FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Allow service role read" ON page_interactions
  FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Allow service role read" ON page_dwell_time
  FOR SELECT
  TO service_role
  USING (true);

