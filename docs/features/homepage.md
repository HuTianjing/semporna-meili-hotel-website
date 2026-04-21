# 首页文档 (Homepage Documentation)

> 路由：`app/[locale]/page.tsx`  
> 最后更新：2026-04-21

---

## 一、页面结构总览

首页由以下区块按顺序组成：

| 序号 | 组件 | 文件 | 说明 |
|------|------|------|------|
| 1 | `<Hero />` | `components/home/Hero.tsx` | 全屏视频/图片首屏 |
| 2 | `<HotelIntro />` | `components/home/HotelIntro.tsx` | 酒店介绍 |
| 3 | `<VillasAndSuites />` | `components/home/VillasAndSuites.tsx` | 别墅与套房展示 |
| 4 | `<SpecialOffers />` | `components/home/SpecialOffers.tsx` | 优惠精选（**已隐藏**） |
| 5 | `<Storytelling />` | `components/home/Storytelling.tsx` | 故事叙述 / 博客预览 |

外层容器：`<main className="relative w-full grow">` ，背景色使用 CSS 变量 `--color-cream`。

---

## 二、区块详细说明

### 1. Hero — 全屏首屏 (`Hero.tsx`)

**客户端组件**（`'use client'`）

#### 媒体资源
| 资源 | URL |
|------|-----|
| 视频 | `https://mgx-backend-cdn.metadl.com/.../hero-resort-aerial.mp4` |
| 封面图 | `https://mgx-backend-cdn.metadl.com/.../hero-resort-aerial.png` |

#### 响应式策略
- **桌面端（`md+`）**：全屏视频背景 + 左对齐文案 + 视差动效。
  - 使用 Framer Motion `motion.section`：页面加载 3s 后，高度从 `100vh` 动画收缩至 `calc(100vh - 80px)`，在底部漏出酒店介绍区块的"向下滚动"提示。
  - 视频控制按钮（播放/暂停）固定在右下角。
  - 滚动指示器（垂直白线动画）在用户滚动超过 20px 后淡出。
- **移动端（`<md`）**：Next.js `<Image />` 静态图片 + 标题文字叠加 + 下方内容区卡片。

#### 依赖
- `next-intl`（`useTranslations('Index')`）
- `framer-motion`（`motion`, `useScroll`, `useTransform`）
- `lenis/react`（`useLenis`）
- `lucide-react`（`Play`, `Pause`）

#### 多语言 Key（`Index` 命名空间）
`title` / `subtitle` / `description` / `address` / `phone` / `scroll` / `heroCards`（数组）

---

### 2. HotelIntro — 酒店介绍 (`HotelIntro.tsx`)

**客户端组件**（`'use client'`）

#### 视觉动效
- 桌面端：监听 `scrollY`，当滚动超过 120px 后，内容区永久上移 80px（`y: -80`），使其向上覆盖 Hero 底部的滚动提示区。
- 使用 `useInView` 触发入场 `fadeUp` 动画（`once: true`）。
- 桌面端顶部额外渲染"向下滚动探索更多"提示条，滚后隐藏。

#### 内容结构
1. Section 标签行：`01` + 分割线 + 章节名
2. 引言（斜体 quote）
3. 双行 Serif 大标题（第二行蓝色 `#0086cd`）
4. 装饰线
5. 正文两段
6. 亮点数据格（2×2 网格 → 桌面 4 列）：位置 / 海滩 / 星级 / 潜水点
7. CTA 链接 → `/villas`

#### 亮点数据（图标来自 `lucide-react`）
| 图标 | 值 | 标签 |
|------|----|------|
| `MapPin` | `4°N` | 北纬四度 · 赤道海域 |
| `Waves` | `500m` | 纯净白沙滩 |
| `Star` | `5★` | 奢华度假体验 |
| `Compass` | `30+` | 世界级潜水点 |

#### 多语言 Key（`HotelIntro` 命名空间）
`sectionLabel` / `quote` / `headingLine1` / `headingLine2` / `body1` / `body2` / `scrollDown` / `cta` / `highlight{1-4}Value` / `highlight{1-4}Label`

---

### 3. VillasAndSuites — 别墅与套房 (`VillasAndSuites.tsx`)

**客户端组件**（`'use client'`）

#### 房型数据
通过 `t.raw('Villas.items')` 从多语言文件读取，每项格式：
```ts
{ id: string; title: string; desc: string }
```

图片映射表（`VILLA_IMAGES`，每个 id 对应 2 张图）：
| id | 图片 |
|----|------|
| `ocean-view` | 海景别墅 × 2 |
| `overwater` | 水上别墅 × 2 |
| `premium` | 豪华套房 × 2 |

#### 交互逻辑
- **自动轮播图片**：每个房型内部每 5s 切换图片。
- **自动切换房型**：每 6s 循环切换到下一个房型，切换时有 400ms 淡出过渡（`isTransitioning`）。
- **手动 Tab 切换**：点击底部 Tab 切换房型，防抖通过 `isTransitioning` 锁定。

#### 布局结构
1. Section 标题区（`02` 标签 + 标题 + 描述）
2. 沉浸式图片展示区（`aspect-21/10` 宽图）：
   - 全部图片以绝对定位叠放，通过 opacity 交叉淡入淡出
   - 图片底部左侧浮层：当前房型名称 + 描述 + CTA 按钮
3. 房型 Tab 导航（底部横向标签）
4. "查看所有房型" CTA

#### 多语言 Key（`Villas` 命名空间）
`title` / `subtitle` / `desc` / `checkRates` / `details` / `viewAll` / `items`（数组）

---

### 4. SpecialOffers — 优惠精选 (`SpecialOffers.tsx`)

> **⚠️ 当前在首页被注释隐藏，暂不渲染。**

**客户端组件**（`'use client'`）

#### 功能
- 使用 `embla-carousel-react` 实现横向触屏轮播。
- 图片来自 villa 同款 CDN 图片（3 张）。
- 每个卡片 `aspect-4/5`，悬停时文案从下方滑入。

#### 多语言 Key（`Offers` 命名空间）
`title` / `allOffers` / `viewOffer` / `items`（数组：`{ title, desc }`）

---

### 5. Storytelling — 故事叙述 / 博客 (`Storytelling.tsx`)

**客户端组件**（`'use client'`）

#### 滚动动效（核心）
使用 `useScroll` + `useTransform`：
- 监听 `listRef` 的滚动进度（`start 0.9` → `start 0.1`）
- 列表宽度：`82%` → `100%`（从窄盒扩展至全宽）
- 边框圆角：`12px` → `0px`

#### 博客列表结构
从 `t.raw('Story.posts')` 读取，每项格式：
```ts
{ tag: string; title: string; date: string }
```

图片来源：`picsum.photos`（占位图，5 张，seed 固定）

每篇文章为左右交替布局（`isEven` 判断偶数项）：
- 左/右：图片（`md:w-[55%]`，悬停缩放）
- 右/左：文字面板（tag / date / 标题 / CTA 箭头）

#### 多语言 Key（`Story` 命名空间）
`subtitle` / `title` / `btn` / `posts`（数组：`{ tag, title, date }`）

---

## 三、全局依赖

| 依赖 | 用途 |
|------|------|
| `next-intl` | 多语言（`useTranslations`） |
| `framer-motion` | 入场动画、滚动视差 |
| `lenis/react` | 平滑滚动（`useLenis`） |
| `lucide-react` | 图标 |
| `next/image` | 图片优化 |
| `embla-carousel-react` | SpecialOffers 轮播（已隐藏） |

---

## 四、多语言文件对应关系

| 命名空间 | 使用区块 |
|---------|---------|
| `Index` | Hero |
| `HotelIntro` | HotelIntro |
| `Villas` | VillasAndSuites |
| `Offers` | SpecialOffers |
| `Story` | Storytelling |
| `BookingBar` | BookingBar（Header 内调用） |

多语言文件路径：`messages/zh.json` / `messages/en.json` / `messages/ms.json`

---

## 五、响应式断点说明

项目采用 **Mobile First** 策略，断点如下：

| 断点 | 含义 |
|------|------|
| 默认 | 移动端 |
| `sm:` | ≥640px 小屏平板 |
| `md:` | ≥768px 平板 / 桌面切换点 |
| `lg:` | ≥1024px 桌面 |
| `xl:` | ≥1280px 宽屏 |

**Hero 区块**在 `md` 断点处完全切换渲染方案（桌面视频版 vs 移动图片版）。

---

## 六、已知状态 / 待办

- `SpecialOffers` 区块已实现但暂时注释隐藏，待内容确认后可取消注释。
- `Storytelling` 博客图片目前使用 `picsum.photos` 占位，需替换为实际 CDN 图片。
- `BookingBar` 组件（`components/home/BookingBar.tsx`）由 Header 控制开关，不直接挂载在首页 `page.tsx` 中。
