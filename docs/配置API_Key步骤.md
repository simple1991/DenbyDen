# 🎯 配置 API Key 的完整步骤

## 当前问题

您提供的 key：`sb_secret_terZJb5evnYgpKtpfK1A0w_S7NL_7xR`

这个格式**不对**，需要获取正确的 Supabase anon key。

## ✅ 正确步骤

### 步骤 1：获取正确的 anon key

1. **打开 Supabase Dashboard**
   - 访问：https://app.supabase.com/
   - 登录并选择项目

2. **进入 API 设置**
   - 左侧菜单 → **Settings**
   - 点击 **API**

3. **找到 anon/public key**
   - 在 "Project API keys" 部分
   - 找到 **anon** 或 **public** key
   - 应该是一个**很长的 JWT token**，以 `eyJ` 开头
   - 点击 "Reveal" 或 "Copy" 复制完整 key

### 步骤 2：配置环境变量

在项目根目录（`H:\Wuli_home\`）创建或编辑 `.env.local` 文件：

```env
NEXT_PUBLIC_SUPABASE_URL=https://yviaelacdlfarkpbgxps.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=粘贴您从Supabase复制的完整anon_key
```

**重要提示**：
- 替换为从 Supabase Dashboard 复制的完整 key
- key 应该很长（200+ 字符），以 `eyJ` 开头
- 不要加引号

### 步骤 3：重启开发服务器

```bash
# 停止当前服务器（Ctrl+C）
# 然后重新启动
npm run dev
```

### 步骤 4：测试

1. 刷新浏览器页面
2. 打开开发者工具（F12）
3. 查看 Console 和 Network 标签
4. 应该不再有 401 错误

## 🔍 如何确认 key 是否正确？

正确的 anon key 应该：
- ✅ 以 `eyJ` 开头
- ✅ 很长（200+ 字符）
- ✅ 包含多个点号（`.`）
- ✅ 是 JWT token 格式

错误的 key 格式：
- ❌ `sb_secret_xxx`
- ❌ `sb_publishable_xxx`
- ❌ 很短的字串

## 📞 需要帮助？

如果您不确定哪个是正确的 key，请：

1. 在 Supabase Dashboard → Settings → API 页面
2. 告诉我您看到的 key 的**前几个字符**（不要分享完整 key！）
3. 或者截图该页面（可以模糊掉完整 key）

我会帮您确认哪个是正确的 key。

