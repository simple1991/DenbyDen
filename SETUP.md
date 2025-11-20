# 项目设置指南

## 快速开始

1. **安装依赖**
```bash
npm install
```

2. **设置图片资源**

由于 Next.js 的静态资源需要放在 `public` 文件夹中，你有两个选择：

### 选项 A：复制图片（推荐）
将 `example_photo` 文件夹复制到 `public` 目录：
```bash
# Windows
xcopy /E /I example_photo public\example_photo

# Mac/Linux
cp -r example_photo public/
```

### 选项 B：创建符号链接
```bash
# Windows (以管理员身份运行 PowerShell)
New-Item -ItemType SymbolicLink -Path "public\example_photo" -Target "example_photo"

# Mac/Linux
ln -s ../example_photo public/example_photo
```

3. **启动开发服务器**
```bash
npm run dev
```

4. **访问网站**
打开浏览器访问：http://localhost:3000

## 项目结构说明

- `app/` - Next.js 页面和路由
- `components/` - React 组件
- `data/` - JSON 数据文件
- `public/` - 静态资源（图片、字体等）
- `example_photo/` - 原始示例图片（需要复制到 public）

## 自定义配置

### 修改产品数据
编辑 `data/products.json` 文件，添加或修改产品信息。

### 修改设计令牌
编辑 `data/tokens.json` 和 `tailwind.config.js` 来调整颜色、间距等设计元素。

### 修改文案
所有文案都在组件文件中，可以直接编辑对应的 `.tsx` 文件。

## 常见问题

**Q: 图片不显示？**
A: 确保已将 `example_photo` 文件夹复制到 `public` 目录。

**Q: 如何添加新页面？**
A: 在 `app` 目录下创建新的文件夹和 `page.tsx` 文件。

**Q: 如何修改颜色？**
A: 编辑 `tailwind.config.js` 中的 `theme.extend.colors` 部分。

## 下一步

- [ ] 连接真实的购物车 API
- [ ] 添加用户认证
- [ ] 集成支付系统
- [ ] 添加产品搜索和筛选功能
- [ ] 优化图片加载性能


