# 美丽度假酒店 (MEILI RESORT HOTEL) 官网前端架构与初始化指南

## 1. 核心技术栈确认

本项目致力于打造极致展示、SEO友好且能安全对接 HMS (酒店管理系统) 的奢华度假酒店官网。参考站点：[波拉波拉群岛四季度假酒店](https://www.fourseasons.com/zh/borabora/)。

- **核心框架**: Next.js 16 (App Router)
- **基础语言**: TypeScript + React
- **样式方案**: Tailwind CSS + shadcn/ui
- **动画与滚动**: Framer Motion + Lenis
- **表单与校验**: React Hook Form + Zod
- **多语言机制**: next-intl (基于子路径的路由响应)
- **视频播放**: HTML5 原生 `<video>` (全屏背景) + Plyr (内容区精细控制)

## 2. 视觉与主题规范

### 2.1 主题色调 (Theme)

- **主色调**: `#003865` (美丽度假酒店专属深蓝色) - 契合高端奢华感与品牌的海洋属性。
- **文字与强调色**: 白色 (主视觉)、浅灰色及其辅助点缀色。

### 2.2 字体排印 (Typography)

项目核心将采用以下字体集混合排版（需在全局或 Tailwind 配置中定义 CSS 变量）：

```css
:root {
  /* 已替换为 Google Fonts 高级开源字体 */
  --font-sans-modern: 'Inter', sans-serif; /* 替代 Helvetica, 现代无衬线 */
  --font-serif-display: 'Playfair Display', serif; /* 替代 Saol Display, 极佳的高端标题感 */
  --font-serif-text: 'Cormorant Garamond', serif; /* 替代 Garamond, 优雅英文字体 */
  --font-cairo: 'Cairo', sans-serif;
  --font-open-sans: 'Open Sans', sans-serif;
  --font-zh-serif: 'Noto Serif SC', serif; /* 中文高定衬线体 (思源宋体) */
  --font-fs-iconfont: 'fs-iconfont'; /* 图标库预留 */
}
```

## 3. 核心布局策略 (自适应)

- **媒体查询机制**: 遵循移动端优先 (Mobile-First)，通过 Tailwind 响应式前缀适配更大屏幕。
- **内容模块**: 移动端横向全屏轮播 (Snap Scroll)，PC 端使用 CSS Grid 网格。
- **预订栏 (Booking Bar)**: 移动端吸底按钮 + 抽屉式弹窗 (Drawer)，PC 端水平悬浮栏。
- **首屏媒介**: 使用 `<picture>` 配合 `<source>` 实现基于设备特征的分发兜底。

## 4. 已确认的需求说明 (Decisions)

1. **字体使用**: 全面采用高质量开源免费字体（以 Google Fonts 为主），如 `Playfair Display`（高定大标题）与 `Cormorant Garamond`（优雅衬线正文），并引入 `Noto Serif SC`（思源宋体）保障中文字体的高级感。
2. **多语言支持**: 首期支持 **中文 (zh)** 和 **英文 (en)**，基于 next-intl 实现 `/zh` 和 `/en` 路由及词条管理。
3. **HMS 接入方式**: 通过标准 **API** 接入。前端表单数据提交至 Next.js 服务端层（Server Actions/Route Handlers），服务端中转携带 Token 调用实际后台 API，保证通信安全。
