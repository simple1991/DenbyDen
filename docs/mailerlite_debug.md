# MailerLite 弹窗调试指南

## 当前状态
✅ 脚本已正确加载（`window.ml` 函数存在）
✅ MailerLite 正在尝试渲染弹窗（从网络请求可以看出）

## 调试步骤

### 1. 检查 MailerLite 弹窗状态
在浏览器控制台运行：
```javascript
// 检查 MailerLite 是否已初始化
console.log('MailerLite account:', window.ml);
console.log('MailerLite queue:', window.ml.q);

// 手动触发弹窗检查
if (window.ml) {
  window.ml('account', '1964678');
  console.log('MailerLite account set');
}
```

### 2. 检查 localStorage 和 cookies
```javascript
// 清除所有可能阻止弹窗的数据
localStorage.removeItem('hasSubscribed');
localStorage.removeItem('subscriptions');
localStorage.removeItem('ml_');
localStorage.removeItem('ml_1964678');

// 检查 MailerLite 相关的 cookies
document.cookie.split(';').forEach(c => {
  if (c.includes('mailerlite') || c.includes('ml_')) {
    console.log('MailerLite cookie:', c);
  }
});
```

### 3. 检查 DOM 中是否有弹窗元素
```javascript
// 查找 MailerLite 弹窗元素
const mlElements = document.querySelectorAll('[id*="mailerlite"], [class*="mailerlite"], [id*="ml-"], [class*="ml-"]');
console.log('MailerLite DOM elements:', mlElements);

// 检查是否有隐藏的弹窗
mlElements.forEach(el => {
  const style = window.getComputedStyle(el);
  console.log('Element:', el, 'Display:', style.display, 'Visibility:', style.visibility, 'Z-index:', style.zIndex);
});
```

### 4. 检查 MailerLite 后台配置
- 登录 MailerLite 后台
- 进入 Forms/Popups 设置
- 确认弹窗已**发布**（Published）
- 检查弹窗的触发条件：
  - 页面停留时间
  - 滚动百分比
  - 退出意图
  - 显示频率限制
- 确认弹窗的目标页面设置（是否包含你的网站域名）

### 5. 强制清除并重新加载
```javascript
// 完全清除 MailerLite 相关数据
Object.keys(localStorage).forEach(key => {
  if (key.includes('ml_') || key.includes('mailerlite')) {
    localStorage.removeItem(key);
  }
});

// 清除 cookies
document.cookie.split(';').forEach(c => {
  const name = c.split('=')[0].trim();
  if (name.includes('mailerlite') || name.includes('ml_')) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }
});

// 刷新页面
location.reload();
```

### 6. 检查是否有 CSS 冲突
在控制台运行：
```javascript
// 检查是否有全局样式阻止弹窗显示
const bodyStyle = window.getComputedStyle(document.body);
console.log('Body overflow:', bodyStyle.overflow);
console.log('Body position:', bodyStyle.position);
```

## 常见问题

### 问题 1: 弹窗在 MailerLite 后台未发布
**解决方案**: 在 MailerLite 后台确保弹窗状态为 "Published"

### 问题 2: 显示频率限制
**解决方案**: 检查弹窗设置中的 "Show frequency" 选项，确保不是 "Once per visitor" 且你已经看过

### 问题 3: 触发条件未满足
**解决方案**: 检查弹窗的触发条件（如需要滚动 50% 才显示），确保满足条件

### 问题 4: 账户 ID 错误
**解决方案**: 确认 MailerLite 账户 ID 是否为 `1964678`

## 测试建议

1. **使用无痕模式测试**：打开新的无痕窗口，访问网站
2. **禁用浏览器扩展**：特别是广告拦截器
3. **等待足够时间**：如果设置了延迟显示，等待相应时间
4. **尝试不同浏览器**：Chrome、Firefox、Safari 等


