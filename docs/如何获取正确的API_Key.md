# 🔑 如何获取正确的 Supabase API Key

## ⚠️ 重要提示

您提供的 key：`sb_secret_terZJb5evnYgpKtpfK1A0w_S7NL_7xR`

这个格式**不正确**！这不是标准的 Supabase anon key。

## ✅ 正确的 Supabase anon key 格式

正确的 Supabase anon/public key 应该是：

- **JWT token 格式**
- **以 `eyJ` 开头**（这是 JWT 的 base64 编码）
- **长度很长**（通常 200+ 字符）
- **示例**：`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2aWFlbGFjZGxmYXJrcGJneHBzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1NDY0NzcsImV4cCI6MjA3OTEyMjQ3N30.p199voR5rSx8vFGWXyNTVx835p6xbv7Eb_5I1sQ8Gv8`

## 📍 如何获取正确的 anon key

### 步骤 1：打开 Supabase Dashboard

1. 访问：https://app.supabase.com/
2. 登录您的账户
3. 选择项目：`yviaelacdlfarkpbgxps`

### 步骤 2：进入 API 设置

1. 在左侧菜单中找到 **Settings**（设置）
2. 点击 **API**

### 步骤 3：找到 Project API keys

在 "Project API keys" 部分，您会看到两个 key：

#### 🔵 anon/public key（这个是我们需要的！）

- **名称**：`anon` 或 `public`
- **格式**：JWT token，以 `eyJ` 开头
- **用途**：客户端使用（浏览器、移动应用）
- **权限**：受 RLS 策略限制

#### 🔴 service_role key（不要使用这个！）

- **名称**：`service_role`
- **格式**：可能不同
- **用途**：服务器端使用
- **权限**：绕过所有 RLS 策略（非常危险！）

### 步骤 4：复制 anon/public key

1. 找到 **anon/public** key
2. 点击 **"Reveal"** 或 **"Copy"** 按钮
3. 复制完整的 key（很长的字符串）

## 🔧 配置环境变量

### 方法 1：创建 .env.local 文件（推荐）

在项目根目录（`H:\Wuli_home\`）创建 `.env.local` 文件：

```env
NEXT_PUBLIC_SUPABASE_URL=https://yviaelacdlfarkpbgxps.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的anon_key_这里（完整的JWT token）
```

**注意**：
- 替换 `你的anon_key_这里` 为您从 Supabase Dashboard 复制的完整 key
- 不要加引号
- 确保 key 完整（很长的字符串）

### 方法 2：直接使用代码中的默认值

如果不想使用环境变量，代码中已经有默认的 anon key（在 `lib/supabase.ts` 中），但建议使用环境变量以便管理。

## ✅ 验证 key 是否正确

### 检查 key 格式：

1. **应该以 `eyJ` 开头** ✅
2. **长度很长**（200+ 字符）✅
3. **包含多个点号（`.`）** ✅（JWT token 有三部分，用点号分隔）
4. **不是 `sb_secret_` 开头** ❌
5. **不是 `sb_publishable_` 开头** ❌

### 测试 key 是否有效：

1. 配置好环境变量后
2. 重启开发服务器：
   ```bash
   npm run dev
   ```
3. 刷新浏览器页面
4. 检查控制台，应该不再有 401 错误

## 🚨 常见错误

### ❌ 错误 1：使用了 service_role key

**问题**：service_role key 有所有权限，不应该在客户端使用

**解决**：使用 anon/public key

### ❌ 错误 2：使用了错误的 key 格式

**问题**：`sb_secret_xxx` 或 `sb_publishable_xxx` 不是标准格式

**解决**：从 Supabase Dashboard Settings → API 获取正确的 anon key

### ❌ 错误 3：key 不完整

**问题**：复制时只复制了部分 key

**解决**：确保复制完整的 key（包括所有字符）

## 📝 快速检查清单

- [ ] 打开 Supabase Dashboard → Settings → API
- [ ] 找到 **anon/public** key
- [ ] 确认 key 以 `eyJ` 开头
- [ ] 复制完整的 key（很长的字符串）
- [ ] 在项目根目录创建 `.env.local` 文件
- [ ] 配置 `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] 重启开发服务器
- [ ] 刷新浏览器页面

## 🆘 仍然找不到正确的 key？

如果您在 Supabase Dashboard 中看到的是不同的格式，请：

1. 截图 Supabase Dashboard → Settings → API 页面
2. 或者告诉我您看到的 key 的前几个字符（不要分享完整 key！）
3. 我会帮您确认哪个是正确的 key

