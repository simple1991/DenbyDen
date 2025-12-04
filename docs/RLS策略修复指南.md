# RLS 策略修复指南

## 问题描述

如果遇到以下错误：

```
Failed to insert events: 
{code: '42501', message: 'new row violates row-level security policy for table "events"'}
```

或者

```
POST https://...supabase.co/rest/v1/events... 401 (Unauthorized)
```

这表示 **Row Level Security (RLS) 策略配置有问题**。

## 问题原因

之前的 SQL 脚本中，所有表使用了相同的策略名称（如 "Allow anonymous insert"），但在 PostgreSQL 中，策略名称在整个数据库中必须是唯一的。这导致策略创建失败或冲突。

## 快速修复

### 方法 1：运行完整修复脚本（强烈推荐）

这个脚本会彻底删除所有旧策略并创建新策略：

1. 打开 Supabase Dashboard
   - 访问 https://app.supabase.com/
   - 登录并选择您的项目

2. 进入 **SQL Editor**
   - 左侧菜单选择 **SQL Editor**
   - 点击 **New Query** 创建新查询

3. 运行完整修复脚本
   - 打开项目中的 `docs/fix_rls_policies_complete.sql` 文件
   - 复制**整个文件**内容到 SQL Editor
   - 点击 **Run** 或按 `Ctrl+Enter` (Windows) / `Cmd+Enter` (Mac) 执行脚本

4. 验证策略是否创建成功（可选）
   - 运行 `docs/check_rls_policies.sql` 脚本
   - 查看输出，应该能看到每个表都有对应的策略

5. 刷新应用
   - 刷新浏览器页面
   - 错误应该消失

### 方法 2：运行简单修复脚本

如果完整脚本有问题，可以尝试简单版本：

1. 打开 Supabase Dashboard 的 SQL Editor
2. 运行 `docs/fix_rls_policies.sql` 脚本
3. 刷新应用页面

### 方法 2：手动修复

如果您想手动修复，可以按照以下步骤：

1. 在 Supabase Dashboard 中，进入 **SQL Editor**
2. 执行以下 SQL 来删除旧的冲突策略：

```sql
DROP POLICY IF EXISTS "Allow anonymous insert" ON events;
DROP POLICY IF EXISTS "Allow anonymous insert" ON product_exposures;
DROP POLICY IF EXISTS "Allow anonymous insert" ON product_clicks;
DROP POLICY IF EXISTS "Allow anonymous insert" ON cart_actions;
DROP POLICY IF EXISTS "Allow anonymous insert" ON email_captures;
DROP POLICY IF EXISTS "Allow anonymous insert" ON page_interactions;
DROP POLICY IF EXISTS "Allow anonymous insert" ON page_dwell_time;
```

3. 然后为每个表创建唯一名称的策略：

```sql
CREATE POLICY "events_allow_anonymous_insert" ON events
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "product_exposures_allow_anonymous_insert" ON product_exposures
  FOR INSERT TO anon WITH CHECK (true);

-- ... 其他表的策略
```

**提示**：完整的修复脚本已经包含在 `docs/fix_rls_policies.sql` 中，建议直接使用该脚本。

## 验证修复

执行修复脚本后：

1. 刷新应用页面
2. 打开浏览器控制台（F12）
3. 错误应该消失
4. 如果仍有错误，检查控制台是否有其他提示

## 预防措施

- ✅ 新版本的 `supabase_schema.sql` 已经修复了这个问题
- ✅ 所有策略现在使用唯一的名称（基于表名）
- ✅ 脚本会先删除旧策略，避免冲突

## 相关文件

- 修复脚本：`docs/fix_rls_policies.sql`
- 更新后的完整脚本：`docs/supabase_schema.sql`
- 错误处理代码：`lib/analytics.ts`

