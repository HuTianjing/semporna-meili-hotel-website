# 美丽度假酒店官网 — UI 规范手册 v2

> **唯一真相来源**：`app/globals.css` → `@theme` 块。新模块开发请以此为参考。

---

## 三大核心原则

> 开发任何新模块前，先确认以下三条是否满足。

| 原则 | 要求 |
|---|---|
| **① 主题色优先** | 所有颜色必须通过 CSS 变量或 Tailwind Token 引用，**禁止在 TSX 中出现任何裸 hex/hsl 值** |
| **② 移动端优先** | 所有布局先写 mobile（375px），再用 `sm:` `md:` `lg:` 扩展，**禁止写死固定宽度** |
| **③ 奢华酒店美学** | 大留白、大图、衬线标题、克制用色。UI 是视觉情绪的传递，不是功能说明板 |

---

## 1. 色彩系统 (Color Tokens)

### 1.1 强制规则：零硬编码

```tsx
// ❌ 禁止 — 裸 hex / hsl 出现在任何 TSX 文件中
<span className="text-gold-warm">...</span>
<div style={{ color: '#8a7e6b' }}>...</div>

// ✅ 正确 — Tailwind Token（已在 @theme 定义）
<span className="text-gold">...</span>
<div className="bg-primary text-white">...</div>

// ✅ 正确 — CSS 变量引用（Tailwind v4 语法）
<span className="text-[--color-gold-warm]">...</span>

// ✅ 正确 — 带透明度
<div className="bg-[--color-gold-warm]/40">...</div>
<div className="text-white/70">...</div>
```

### 1.2 全量主题 Token（来源：`globals.css @theme`）

| CSS 变量 | 色值 | Tailwind 类 | 用途 |
|---|---|---|---|
| `--color-primary` | `#003865` 深海蓝 | `bg-primary` / `text-primary` | 导航背景、主按钮底色、品牌主色 |
| `--color-primary-light` | `#004d8a` | `bg-primary-light` | 主按钮 hover 态 |
| `--color-primary-dark` | `#001f3f` | `bg-primary-dark` / `text-primary-dark` | 深色标题、强调色 |
| `--color-accent` | `#0091da` 天空蓝 | `text-accent` / `bg-accent` | 链接、标题蓝色强调行、图标 hover |
| `--color-gold` | `#b18b74` 品牌金 | `text-gold` / `border-gold` | CTA 链接、高端按钮边框 |
| `--color-gold-warm` | `#c2996c` | `text-[--color-gold-warm]` | 章节序号、装饰金线（比 gold 稍亮）|
| `--color-warm-text` | `#8a7e6b` | `text-[--color-warm-text]` | 章节标签、辅助说明文字 |
| `--color-section-text` | `#1a2a3a` | `text-[--color-section-text]` | 亮色区块正文（暖深蓝）|
| `--color-background` | `#FFFFFF` | `bg-background` | 卡片、弹层纯白 |
| `--color-foreground` | `hsl(240,10%,4%)` | `text-foreground` | 全站默认正文 |
| `--color-cream` | `hsl(60,11%,98%)` | `bg-cream` | 全站默认区块底色 |
| `--color-about-bg` | `hsl(40,21%,96%)` | `bg-[--color-about-bg]` | 暖米色区块（酒店简介等）|
| `--color-villas-bg` | `hsl(210,29%,6%)` | `bg-[--color-villas-bg]` | 深夜蓝沉浸式区块（房型、优惠）|
| `--color-muted` | `hsl(210,20%,96%)` | `bg-muted` | 次级背景、表单底色 |
| `--color-muted-foreground` | `hsl(215,16%,47%)` | `text-muted-foreground` | 次要文字、占位符 |
| `--color-border` | `hsl(214,32%,91%)` | `border` | 分割线、输入框边框 |

### 1.3 需补充到 `globals.css` 的扩展 Token

> `--color-gold-warm`、`--color-warm-text`、`--color-section-text` 在现有组件中以裸 hex 出现，**必须先添加到 `@theme` 才能在新模块中引用**：

```css
/* globals.css — @theme 块末尾追加 */
--color-gold-warm:    #c2996c;   /* 章节序号、装饰金线 */
--color-warm-text:    #8a7e6b;   /* 章节标签、辅助说明 */
--color-section-text: #1a2a3a;   /* 亮色区块正文（暖深蓝）*/
```

### 1.4 区块背景交替规律

```
cream（亮白）→ about-bg（暖米）→ villas-bg（深夜蓝）→ cream …
```

- 禁止连续两个区块使用相同底色
- 深色区块（villas-bg）内用白色文字：`text-white` / `text-white/70`
- 亮色区块内用 `text-[--color-section-text]`

---

## 2. 响应式规范 (Mobile-First Responsive)

### 2.1 断点系统

| 前缀 | 触发宽度 | 典型设备 |
|---|---|---|
| 无前缀 | 0 ~ 639px | 手机竖屏（**375px 为基准**）|
| `sm:` | ≥ 640px | 手机横屏、小平板 |
| `md:` | ≥ 768px | iPad 竖屏 |
| `lg:` | ≥ 1024px | iPad 横屏、小笔记本 |
| `xl:` | ≥ 1280px | 桌面显示器 |

### 2.2 布局自适应规则

**① 排版方向**：移动端纵向堆叠，桌面端水平展开。

```tsx
// ✅ 先竖后横
<div className="flex flex-col md:flex-row gap-8 md:gap-12">
  <div className="w-full md:w-1/2">图片</div>
  <div className="w-full md:w-1/2">文字</div>
</div>

// ❌ 禁止写死宽度
<div className="w-150">...</div>
```

**② 卡片列数**：

```tsx
// Grid 卡片
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"

// Embla 横向滑动卡（移动端 85%，桌面渐窄）
className="flex-[0_0_85%] sm:flex-[0_0_60%] md:flex-[0_0_42%] lg:flex-[0_0_34%]"
```

### 2.3 字号自适应（必须用 `clamp()`）

**禁止用固定 Tailwind 字号做标题**，必须用 `clamp()` 实现流式缩放：

```tsx
// ❌ 禁止
<h2 className="text-5xl">标题</h2>

// ✅ 正确
<h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 4rem)' }}>Hero 主标题</h1>
<h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 3rem)' }}>区块标题</h2>
<h3 style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)' }}>卡片标题</h3>

// ✅ 例外 — 深色区块 h2 可用阶梯式响应类（字号跨度明确）
<h2 className="font-serif text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
```

### 2.4 水平内边距

使用 `px-page` utility（`globals.css` 已定义），**不要重复写响应式 px**：

```
mobile:  padding-inline: 1.5rem (24px)
md:      padding-inline: 2.5rem (40px)
xl:      padding-inline: 4rem   (64px)
```

> Edge-to-edge 例外：横向滑动卡片列表用 `pl-6 lg:pl-20`（右侧露出下一张提示滑动）。

### 2.5 区块垂直间距

```tsx
// 标准区块（桌面大留白）
className="py-16 sm:py-20 md:py-28 lg:py-36 xl:py-44"

// 紧凑区块
className="py-12 sm:py-16 md:py-20"

// 内部段落间距（逐级递增）
className="mb-4 sm:mb-6 md:mb-8 lg:mb-10"
```

### 2.6 触摸目标尺寸

移动端所有按钮、链接最小触摸区域 **44×44px**：

```tsx
<button className="min-h-11 px-6 py-3 ...">
<a className="p-3 inline-flex items-center ...">
```

---

## 3. 字体系统 (Typography)

### 3.1 字体角色分工

| `className` | 字体栈 | 字重 | 典型用途 |
|---|---|---|---|
| `font-serif` | Cinzel Variable → Noto Serif SC | **600** SemiBold | `h1`~`h3`，品牌大标题，英文全大写碑铭气质 |
| `font-sans` | Newsreader Variable (opsz 36) → Noto Serif SC | 400 Regular | 正文段落、副标题、UI 标签 |
| `font-text` | Newsreader Variable italic → Noto Serif SC | 400 Italic | 引言 quote、情绪性斜体段落 |

> `h1~h6` 全局默认 `font-serif` + `font-weight: 600`，无需重复声明。

### 3.2 字号层级

| 层级 | 写法 | 场景 |
|---|---|---|
| Hero 超大标题 | `clamp(1.8rem, 4vw, 4rem)` | 首屏 h1 |
| 区块主标题 | `clamp(1.6rem, 4vw, 3rem)` | 各 Section h2 |
| 卡片标题 | `clamp(1.2rem, 2.5vw, 1.8rem)` | 卡片 h3 |
| 正文 | `text-sm` / `text-base` | 段落 |
| 微标签 | `text-[0.6rem]` / `text-[0.65rem]` | 章节序号、ALL CAPS 标签 |

### 3.3 字间距与行高

| 用途 | 字间距 | 行高 |
|---|---|---|
| 大标题 | `tracking-[0.04em]` ~ `tracking-[0.08em]` | `leading-[1.05]` ~ `leading-[1.15]` |
| 章节微标签 | `tracking-[0.25em]` ~ `tracking-[0.4em]` | — |
| CTA 文字 | `tracking-widest uppercase` | — |
| 正文 | 默认 | `leading-relaxed` |
| 卡片标题 | — | `leading-tight` |

---

## 4. 奢华酒店视觉语言 (Luxury Aesthetic)

> 这是品牌的灵魂，技术实现服务于此。

### 4.1 大留白 — 视觉呼吸感

```tsx
// ✅ 慷慨的上下留白
<section className="py-16 sm:py-24 md:py-36 lg:py-44">
  <h2 className="... mb-10 sm:mb-14 md:mb-20">标题</h2>
  <p className="... mb-6 sm:mb-8">段落</p>
</section>

// ❌ 过于紧凑（像 B 端 SaaS）
<section className="py-8">
  <h2 className="mb-2">标题</h2>
```

### 4.2 沉浸式全屏区块 — Edge-to-Edge

关键展示区块使用全宽图片，文字叠在渐变遮罩上：

```tsx
<section className="relative w-full overflow-hidden">
  <Image src={...} fill className="object-cover" />
  {/* 方向性渐变遮罩，不用纯黑 */}
  <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/15 to-black/60" />
  {/* 文字叠在遮罩上 */}
  <div className="relative z-10 px-page py-20">...</div>
</section>
```

### 4.3 文字对比 — 戏剧性排版

大字号 `font-serif` 标题 vs 纤细 `font-sans` 正文，传递奢华感：

```tsx
// ✅ 大小对比明显
<h2 className="font-serif text-[--color-section-text]"
    style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '0.04em' }}>
  Part Hidden Sanctuary
</h2>
<p className="font-sans text-[--color-warm-text] text-sm sm:text-base leading-relaxed mt-6 max-w-prose">
  马来西亚仙本那 · 北纬 4°
</p>
```

### 4.4 克制的金色 — 点睛而非铺陈

```
✅ 金色的正确使用场景：
  - CTA 链接文字（"立即预订"底线）
  - 章节序号与装饰横线
  - Header 预订按钮边框
  - 价格数字强调

❌ 金色的错误使用：
  - 大面积背景填充
  - 同一视口内超过 3 处金色元素
  - 替代主色（primary）用于普通按钮
```

### 4.5 无粗边框 — 靠留白和背景色分区

```tsx
// ❌ SaaS 感的硬边框卡片
<div className="border border-border rounded-lg shadow-md p-6">

// ✅ 靠背景色交替隐式分区
<section className="bg-[--color-about-bg] py-24">内容</section>
<section className="bg-cream py-24">内容</section>
```

---

## 5. 动效规范 (Motion)

项目统一使用 **Framer Motion** + **Lenis 平滑滚动**，不混用 CSS animation 与 motion（Hero 除外）。

### 5.1 标准 fadeUp Variant（所有区块共用，直接复制）

```tsx
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};
```

### 5.2 标准 useInView 配置

```tsx
const sectionRef = useRef<HTMLDivElement>(null);
const isInView = useInView(sectionRef, {
  once: true,
  margin: '0px 0px -20px 0px',
  amount: 0.02,
});
```

### 5.3 入场时序（delay 递增 0.05~0.1s）

```tsx
<motion.div custom={0}    variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>章节标签</motion.div>
<motion.div custom={0.1}  variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>quote 引言</motion.div>
<motion.div custom={0.15} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>主标题</motion.div>
<motion.div custom={0.2}  variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>装饰线</motion.div>
<motion.div custom={0.25} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>正文段落</motion.div>
```

### 5.4 Hero 入场（CSS animation，来自 globals.css）

```tsx
{/* 仅 Hero 使用 */}
<h1 className="animate-fade-in-up font-serif text-white"
    style={{ animationDelay: '0.6s', animationFillMode: 'both' }} />
<p  className="animate-fade-in font-sans text-white/80"
    style={{ animationDelay: '1s', animationFillMode: 'both' }} />
```

### 5.5 图片 Hover（仅桌面端有效）

```tsx
<div className="group overflow-hidden">
  <Image className="object-cover transition-transform duration-1000 group-hover:scale-105" />
  <div className="absolute inset-0 bg-black/40 transition-colors duration-500 group-hover:bg-black/55" />
</div>
```

---

## 6. 组件模式库 (Component Patterns)

### 6.1 章节标签

**亮色区块**：

```tsx
<motion.div
  custom={0} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
  className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 justify-center"
>
  <span className="font-sans text-[0.6rem] uppercase tracking-[0.35em] text-[--color-gold-warm]">01</span>
  <div className="w-8 sm:w-12 h-px bg-[--color-gold-warm]" />
  <span className="font-sans text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.3em] text-[--color-warm-text]">
    ABOUT MEILI
  </span>
</motion.div>
```

**深色区块（villas-bg 背景）**：

```tsx
<div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 justify-center">
  <span className="font-sans text-[0.6rem] uppercase tracking-[0.35em] text-gold">02</span>
  <div className="w-8 sm:w-12 h-px bg-gold/40" />
  <span className="font-sans text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.3em] text-white/50">OUR VILLAS</span>
</div>
```

### 6.2 标题模式

**亮色区块 h2（单行）**：

```tsx
<h2 className="font-serif text-[--color-section-text] leading-[1.15] text-center"
    style={{ fontSize: 'clamp(1.6rem, 4vw, 3rem)' }}>
  {title}
</h2>
```

**亮色区块 h2（双行 + 蓝色强调）**：

```tsx
<h2 className="font-serif text-[--color-section-text] leading-[1.15] text-center"
    style={{ fontSize: 'clamp(1.6rem, 4vw, 3rem)' }}>
  <span className="block">{line1}</span>
  <span className="block mt-1 sm:mt-2 text-accent">{line2}</span>
</h2>
```

**深色区块 h2**：

```tsx
<h2 className="font-serif text-white leading-[1.1] text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
  {title}
</h2>
```

**引言 Quote**：

```tsx
<p className="font-text italic text-[--color-section-text]/60 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto text-center">
  &ldquo;{quote}&rdquo;
</p>
```

**标题下方装饰金线**：

```tsx
<div className="flex justify-center mb-8 sm:mb-10 md:mb-12">
  <div className="w-12 sm:w-16 h-px bg-[--color-gold-warm]" />
</div>
```

### 6.3 按钮模式

**主 CTA（深海蓝）**：

```tsx
<button className="bg-primary text-primary-foreground px-8 py-3 text-sm tracking-widest uppercase transition-colors duration-300 hover:bg-primary-light min-h-11">
  立即预订
</button>
```

**金色文字箭头链接（区块 CTA）**：

```tsx
<button className="group flex items-center gap-2 text-sm font-semibold tracking-widest text-gold uppercase transition-colors hover:text-white min-h-11">
  查看全部
  <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
</button>
```

**金色底线文字链接（卡片内）**：

```tsx
<span className="inline-block border-b border-gold pb-1 font-sans text-sm tracking-widest text-gold uppercase transition-colors hover:border-white hover:text-white">
  查看详情
</span>
```

**Header 预订按钮（描边金色）**：

```tsx
<button className="border border-gold px-4 py-2 text-xs tracking-widest text-gold uppercase transition-all hover:bg-gold hover:text-white min-h-11">
  立即预订
</button>
```

### 6.4 卡片（图片遮罩叠字）

```tsx
<div className="group relative aspect-4/5 w-full cursor-pointer overflow-hidden bg-muted">
  <Image src={src} alt={alt} fill
    className="object-cover transition-transform duration-1000 group-hover:scale-105" />
  <div className="absolute inset-0 bg-black/40 transition-colors duration-500 group-hover:bg-black/55" />
  <div className="absolute inset-x-0 bottom-0 flex translate-y-4 flex-col p-6 sm:p-8 transition-transform duration-500 group-hover:translate-y-0">
    <h3 className="mb-2 font-serif leading-tight text-white"
        style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)' }}>{title}</h3>
    <p className="mb-5 line-clamp-2 font-sans text-sm text-white/80 opacity-0 transition-opacity delay-100 duration-500 group-hover:opacity-100">
      {desc}
    </p>
    <span className="inline-block border-b border-gold pb-1 font-sans text-xs tracking-widest text-gold uppercase">
      查看详情
    </span>
  </div>
</div>
```

### 6.5 数据亮点（四格统计）

```tsx
<div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
  {highlights.map(({ icon: Icon, value, label }) => (
    <div key={label} className="flex flex-col items-center text-center gap-2">
      <Icon className="text-[--color-gold-warm]" size={20} strokeWidth={1.5} />
      <span className="font-serif text-[--color-section-text] leading-none"
            style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)' }}>
        {value}
      </span>
      <span className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-[--color-warm-text]">
        {label}
      </span>
    </div>
  ))}
</div>
```

---

## 7. 图片规范

- 始终使用 `<Image />` (next/image)，**禁止 `<img>`**
- 全宽背景：`fill` + 父容器 `relative overflow-hidden`
- 卡片固定比例：`aspect-4/5`（竖版）/ `aspect-video`（横版）
- Hero 封面：加 `priority` 属性
- alt 属性：必须有意义，不能为空或 `"image"`

---

## 8. 多语言 (i18n)

- 所有展示文字走 `useTranslations('命名空间')`，**禁止硬编码中/英文字符串**
- 命名空间与组件名对应：`<HotelIntro />` → `useTranslations('HotelIntro')`
- 数组型数据：`t.raw('key') as Array<{ title: string; desc: string }>`
- 消息文件：`messages/zh.json` / `en.json` / `ms.json` 三套同步更新

---

## 9. 快速开发 Checklist

新建区块时，逐条确认：

### 颜色（主题色优先）
- [ ] 无裸 hex/hsl 字面量？所有颜色通过 CSS 变量或 Tailwind Token？
- [ ] 区块背景是否按交替规律（cream → about-bg → villas-bg）选取？
- [ ] `--color-gold-warm` / `--color-warm-text` / `--color-section-text` 是否已添加到 `globals.css @theme`？

### 响应式（移动端优先）
- [ ] 布局是否先写移动端纵向，再用 `md:`/`lg:` 扩展横向？
- [ ] 标题是否用 `clamp()` 实现流式字号？
- [ ] 水平 padding 是否用 `px-page`？
- [ ] 触摸目标是否 ≥ 44px？
- [ ] 在 375px 宽度下测试是否无横向溢出？

### 奢华感
- [ ] 区块垂直 padding 是否足够大（`py-16` 起步，桌面 `lg:py-36`+）？
- [ ] 有无多余边框或卡片阴影（应靠背景色交替分区，不靠线条）？
- [ ] 金色（`--color-gold`）在当前视口内 ≤ 3 处？
- [ ] 大图是否 edge-to-edge，无多余 padding 围住图片？
- [ ] 标题 `font-serif`，正文 `font-sans`，引言 `font-text italic`？

### 动效
- [ ] 是否使用标准 `fadeUp` variant + `useInView`？
- [ ] 入场时序 delay 是否逐元素递增？

### 工程
- [ ] 是否需要 `'use client'`（仅有 state/effect/事件时才加）？
- [ ] 文字是否全部走 `useTranslations`？
- [ ] 图片是否 `<Image />` + 有意义 alt？
