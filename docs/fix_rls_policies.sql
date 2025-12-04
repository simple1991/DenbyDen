-- 修复 RLS 策略脚本
-- 这个脚本用于修复策略名称冲突问题
-- 请在 Supabase Dashboard 的 SQL Editor 中执行此脚本

-- 第一步：删除所有可能冲突的旧策略
DROP POLICY IF EXISTS "Allow anonymous insert" ON events;
DROP POLICY IF EXISTS "Allow anonymous insert" ON product_exposures;
DROP POLICY IF EXISTS "Allow anonymous insert" ON product_clicks;
DROP POLICY IF EXISTS "Allow anonymous insert" ON cart_actions;
DROP POLICY IF EXISTS "Allow anonymous insert" ON email_captures;
DROP POLICY IF EXISTS "Allow anonymous insert" ON page_interactions;
DROP POLICY IF EXISTS "Allow anonymous insert" ON page_dwell_time;
DROP POLICY IF EXISTS "Allow service role read" ON events;
DROP POLICY IF EXISTS "Allow service role read" ON product_exposures;
DROP POLICY IF EXISTS "Allow service role read" ON product_clicks;
DROP POLICY IF EXISTS "Allow service role read" ON cart_actions;
DROP POLICY IF EXISTS "Allow service role read" ON email_captures;
DROP POLICY IF EXISTS "Allow service role read" ON page_interactions;
DROP POLICY IF EXISTS "Allow service role read" ON page_dwell_time;

-- 第二步：删除可能存在的旧版本策略（以防万一）
DROP POLICY IF EXISTS "events_allow_anonymous_insert" ON events;
DROP POLICY IF EXISTS "product_exposures_allow_anonymous_insert" ON product_exposures;
DROP POLICY IF EXISTS "product_clicks_allow_anonymous_insert" ON product_clicks;
DROP POLICY IF EXISTS "cart_actions_allow_anonymous_insert" ON cart_actions;
DROP POLICY IF EXISTS "email_captures_allow_anonymous_insert" ON email_captures;
DROP POLICY IF EXISTS "page_interactions_allow_anonymous_insert" ON page_interactions;
DROP POLICY IF EXISTS "page_dwell_time_allow_anonymous_insert" ON page_dwell_time;

-- 第三步：创建新的唯一名称策略（允许匿名用户插入数据）
CREATE POLICY "events_allow_anonymous_insert" ON events
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "product_exposures_allow_anonymous_insert" ON product_exposures
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "product_clicks_allow_anonymous_insert" ON product_clicks
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "cart_actions_allow_anonymous_insert" ON cart_actions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "email_captures_allow_anonymous_insert" ON email_captures
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "page_interactions_allow_anonymous_insert" ON page_interactions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "page_dwell_time_allow_anonymous_insert" ON page_dwell_time
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- 第四步：创建服务角色读取策略（用于数据分析）
CREATE POLICY "events_allow_service_role_read" ON events
  FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "product_exposures_allow_service_role_read" ON product_exposures
  FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "product_clicks_allow_service_role_read" ON product_clicks
  FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "cart_actions_allow_service_role_read" ON cart_actions
  FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "email_captures_allow_service_role_read" ON email_captures
  FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "page_interactions_allow_service_role_read" ON page_interactions
  FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "page_dwell_time_allow_service_role_read" ON page_dwell_time
  FOR SELECT
  TO service_role
  USING (true);

