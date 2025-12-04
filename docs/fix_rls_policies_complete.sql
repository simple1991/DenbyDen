-- 完整的 RLS 策略修复脚本
-- 此脚本会彻底修复所有 RLS 策略问题
-- 请在 Supabase Dashboard 的 SQL Editor 中执行此脚本

-- ========================================
-- 第一步：删除所有可能存在的旧策略
-- ========================================

-- 删除 events 表的所有策略
DROP POLICY IF EXISTS "Allow anonymous insert" ON events;
DROP POLICY IF EXISTS "Allow service role read" ON events;
DROP POLICY IF EXISTS "events_allow_anonymous_insert" ON events;
DROP POLICY IF EXISTS "events_allow_service_role_read" ON events;

-- 删除 product_exposures 表的所有策略
DROP POLICY IF EXISTS "Allow anonymous insert" ON product_exposures;
DROP POLICY IF EXISTS "Allow service role read" ON product_exposures;
DROP POLICY IF EXISTS "product_exposures_allow_anonymous_insert" ON product_exposures;
DROP POLICY IF EXISTS "product_exposures_allow_service_role_read" ON product_exposures;

-- 删除 product_clicks 表的所有策略
DROP POLICY IF EXISTS "Allow anonymous insert" ON product_clicks;
DROP POLICY IF EXISTS "Allow service role read" ON product_clicks;
DROP POLICY IF EXISTS "product_clicks_allow_anonymous_insert" ON product_clicks;
DROP POLICY IF EXISTS "product_clicks_allow_service_role_read" ON product_clicks;

-- 删除 cart_actions 表的所有策略
DROP POLICY IF EXISTS "Allow anonymous insert" ON cart_actions;
DROP POLICY IF EXISTS "Allow service role read" ON cart_actions;
DROP POLICY IF EXISTS "cart_actions_allow_anonymous_insert" ON cart_actions;
DROP POLICY IF EXISTS "cart_actions_allow_service_role_read" ON cart_actions;

-- 删除 email_captures 表的所有策略
DROP POLICY IF EXISTS "Allow anonymous insert" ON email_captures;
DROP POLICY IF EXISTS "Allow service role read" ON email_captures;
DROP POLICY IF EXISTS "email_captures_allow_anonymous_insert" ON email_captures;
DROP POLICY IF EXISTS "email_captures_allow_service_role_read" ON email_captures;

-- 删除 page_interactions 表的所有策略
DROP POLICY IF EXISTS "Allow anonymous insert" ON page_interactions;
DROP POLICY IF EXISTS "Allow service role read" ON page_interactions;
DROP POLICY IF EXISTS "page_interactions_allow_anonymous_insert" ON page_interactions;
DROP POLICY IF EXISTS "page_interactions_allow_service_role_read" ON page_interactions;

-- 删除 page_dwell_time 表的所有策略
DROP POLICY IF EXISTS "Allow anonymous insert" ON page_dwell_time;
DROP POLICY IF EXISTS "Allow service role read" ON page_dwell_time;
DROP POLICY IF EXISTS "page_dwell_time_allow_anonymous_insert" ON page_dwell_time;
DROP POLICY IF EXISTS "page_dwell_time_allow_service_role_read" ON page_dwell_time;

-- ========================================
-- 第二步：确保 RLS 已启用
-- ========================================

ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_exposures ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_captures ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_dwell_time ENABLE ROW LEVEL SECURITY;

-- ========================================
-- 第三步：创建新的唯一名称策略（匿名用户插入）
-- ========================================

-- events 表
CREATE POLICY "events_anon_insert" ON events
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- product_exposures 表
CREATE POLICY "product_exposures_anon_insert" ON product_exposures
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- product_clicks 表
CREATE POLICY "product_clicks_anon_insert" ON product_clicks
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- cart_actions 表
CREATE POLICY "cart_actions_anon_insert" ON cart_actions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- email_captures 表
CREATE POLICY "email_captures_anon_insert" ON email_captures
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- page_interactions 表
CREATE POLICY "page_interactions_anon_insert" ON page_interactions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- page_dwell_time 表
CREATE POLICY "page_dwell_time_anon_insert" ON page_dwell_time
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- ========================================
-- 第四步：创建服务角色读取策略（用于数据分析）
-- ========================================

-- events 表
CREATE POLICY "events_service_read" ON events
  FOR SELECT
  TO service_role
  USING (true);

-- product_exposures 表
CREATE POLICY "product_exposures_service_read" ON product_exposures
  FOR SELECT
  TO service_role
  USING (true);

-- product_clicks 表
CREATE POLICY "product_clicks_service_read" ON product_clicks
  FOR SELECT
  TO service_role
  USING (true);

-- cart_actions 表
CREATE POLICY "cart_actions_service_read" ON cart_actions
  FOR SELECT
  TO service_role
  USING (true);

-- email_captures 表
CREATE POLICY "email_captures_service_read" ON email_captures
  FOR SELECT
  TO service_role
  USING (true);

-- page_interactions 表
CREATE POLICY "page_interactions_service_read" ON page_interactions
  FOR SELECT
  TO service_role
  USING (true);

-- page_dwell_time 表
CREATE POLICY "page_dwell_time_service_read" ON page_dwell_time
  FOR SELECT
  TO service_role
  USING (true);

-- ========================================
-- 完成提示
-- ========================================
-- 所有策略已创建完成！
-- 请刷新应用页面，错误应该消失。

