-- 检查 RLS 策略状态脚本
-- 运行此脚本来查看当前所有表的 RLS 策略配置

-- 查看 events 表的策略
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename IN (
    'events',
    'product_exposures',
    'product_clicks',
    'cart_actions',
    'email_captures',
    'page_interactions',
    'page_dwell_time'
)
ORDER BY tablename, policyname;

-- 检查 RLS 是否启用
SELECT 
    schemaname,
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables 
WHERE tablename IN (
    'events',
    'product_exposures',
    'product_clicks',
    'cart_actions',
    'email_captures',
    'page_interactions',
    'page_dwell_time'
)
ORDER BY tablename;

