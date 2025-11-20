# DenbyDen - 网站项目

这是一个基于 Next.js 14 + React + Tailwind CSS 构建的电商网站，复刻了 wulihome.ca 的设计和功能。

## 技术栈

- **框架**: Next.js 14 (App Router)
- **UI 库**: React 18
- **样式**: Tailwind CSS
- **语言**: TypeScript

## 项目结构

```
├── app/                    # Next.js App Router 页面
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 首页
│   ├── product/[slug]/    # 产品详情页
│   └── globals.css        # 全局样式
├── components/            # React 组件
│   ├── TopBar.tsx         # 顶部促销条
│   ├── Header.tsx         # 头部导航
│   ├── HeroBanner.tsx     # 首屏横幅
│   ├── FeatureBanner.tsx  # 特色横幅
│   ├── ProductCard.tsx    # 产品卡片
│   ├── ProductGrid.tsx    # 产品网格
│   ├── Footer.tsx         # 页脚
│   └── EmailCaptureModal.tsx # 邮箱弹窗
├── data/                  # 数据文件
│   ├── products.json      # 产品数据
│   └── tokens.json        # 设计令牌
└── example_photo/         # 示例图片资源
```

## 安装和运行

1. 安装依赖：
```bash
npm install
```

2. 设置图片资源（将 example_photo 复制到 public 目录）：
```bash
npm run setup
```

3. 运行开发服务器：
```bash
npm run dev
```

4. 打开浏览器访问：
```
http://localhost:3000
```

> **注意**: 如果 `npm run setup` 失败，请手动将 `example_photo` 文件夹复制到 `public` 目录。

## 功能特性

- ✅ 响应式设计（移动端、平板、桌面）
- ✅ 产品展示和详情页
- ✅ 邮箱订阅功能
- ✅ 购物车图标（UI 展示）
- ✅ 搜索功能（UI 展示）
- ✅ 平滑动画和过渡效果
- ✅ 符合设计规范的配色和排版

## 设计规范

- **主品牌色**: #2F6F6D (墨绿色)
- **辅助色**: 粉色/米色系
- **容器宽度**: 1200px
- **响应式断点**: 640px (移动), 1024px (桌面)

## 注意事项

- 图片路径需要指向 `example_photo` 文件夹中的实际图片
- 产品数据在 `data/products.json` 中，可以根据需要修改
- 邮箱订阅功能目前使用 localStorage 存储，可以后续接入真实 API

## 开发计划

- [ ] 添加购物车功能
- [ ] 添加产品筛选和搜索
- [ ] 添加用户账户系统
- [ ] 集成支付功能
- [ ] 添加更多页面（关于我们、联系我们等）

