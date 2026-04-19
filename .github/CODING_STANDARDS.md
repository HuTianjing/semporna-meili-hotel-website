# Semporna Blue Bay 前端代码规范与最佳实践 (Coding Standards)

为了保证仙本那蓝湾 (Semporna Blue Bay) 度假酒店官网的高质量、可维护性以及大厂级别的协同规范，所有前端代码提交（Pull Request）必须严格遵守以下原则。

## 1. TypeScript 强类型规范 (Strict Typing)

我们将 TypeScript 视为项目的最后一道安全防线，禁止任何形式的类型逃避。

- 🚫 **绝对禁止使用 `any`**：代码中出现任何 `any` 都会导致 Code Review 被拒。如果类型暂时无法确定，请使用 `unknown` 并结合类型收窄（Type Narrowing），或者定义模糊泛型（Generics）。
- ✅ **优先使用 `interface`**：在定义对象结构、组件 Props、API 返回数据时，优先使用 `interface`。仅在需要联合类型或交叉类型时使用 `type`。
- ✅ **明确函数返回类型**：特别是复杂组件和工具函数，必须显式声明返回类型，避免隐式推导导致的大规模类型重算。

## 2. Tailwind CSS 样式与设计令牌规范 (Design Tokens)

为了保证全站高度一致的奢华视觉体验（黑白基调、精致排版），我们严格限制 CSS 的随意编排。

- 🚫 **绝对禁止使用“任意值 (Arbitrary Values)”**：
  - ❌ 禁止 `text-[#1a1a1a]` 或 `bg-[#0f0f0f]`
  - ❌ 禁止 `w-[32px]`、`h-[48px]` 或 `gap-[10px]`
  - ❌ 禁止 `text-[14px]`、`leading-[24px]`
- ✅ **强制使用预定义的 Design Tokens**：所有颜色、间距、字号都必须事先在 `tailwind.config.ts` 中定义为 Semantic Tokens（语义化令牌），并通过标准类名调用：
  - **颜色**：使用 `text-primary`、`bg-background`、`border-muted`。
  - **间距**：使用 `gap-4`、`px-8`、`mb-12`（基于 4px 乘数系统）。
  - **字体**：使用 `text-sm`、`text-h1`、`leading-relaxed`。
- 🔧 **如何新增设计变量**：如果设计稿出现新的标准色或规范间距，不允许在代码中写死，必须统一提 PR 修改 `tailwind.config.ts` 中的 `theme.extend`。

## 3. 动态样式控制

- 🚫 **禁止字符串拼接生成 Tailwind 类名**：例如 `className={"text-" + color}`（Tailwind 编译器无法静态扫描到该类名）。
- ✅ **使用安全合并工具**：所有组件内部的动态 className 必须通过库来合并处理：

  ```tsx
  import { cn } from '@/lib/utils'; // 基于 clsx 和 tailwind-merge 的封装

  // Good
  <div className={cn('bg-background text-primary', isActive && 'bg-muted text-black')} />;
  ```

## 4. Next.js 架构规范

- **默认服务端组件 (RSC)**：所有新创建的组件默认为 Server Components（不写 `'use client'`）。只有当组件确切需要生命周期（`useEffect`）、状态（`useState`）或绑定浏览器事件（`onClick`）时，才转换为 Client Components。
- 🚫 **绝对禁止滥用 `useEffect` 与 `useState`**：
  - ❌ 禁止用 `useEffect` 获取初始化数据（请使用 Server Components 或 SWR/React Query）。
  - ❌ 禁止用 `useEffect` 派生状态（如果一个值可以通过已有 state 计算得出，直接在 render 中定义常量，不要用 `setState` 去同步）。
  - ❌ 禁止为了控制 DOM 操作写命令式代码（除非是对接第三方库如 `Plyr` 播放器，且必须注意组件卸载时的内存泄露与事件解绑）。
- **数据获取 (Data Fetching)**：
  - 展示型数据：在 Server Component 层抓取并向下级传递。
  - 用户表单与交互：使用 Server Actions 或封装良好的 Route Handlers，隐藏所有 HMS 系统的 API Token。

## 5. Tailwind CSS v4 颜色格式与兼容性降级方案

Tailwind CSS v4 默认启用了包括 `oklch()` 甚至 `color-mix()` 等最前沿的 CSS color level 4/5 语法。虽然颜色更明艳，但在某些老旧设备（尤其是低版本 iOS Safari、老版本 Android 微信内置浏览器）下会直接导致颜色失效并渲染为黑色/透明。仙本那蓝湾官网的客户群体设备不可控，必须采取**绝对安全**的颜色兼容易读方案：

- ✅ **安全变量申明**：在定义主题 Design Tokens 时，一律回退使用经典的 `HSL` 或 `RGB` 变量格式进行注入，抛弃原生 v4 的 `oklch`。
- ✅ **配置向下编译目标**：如果在配置中使用了现代 CSS 颜色混合函数，必须配置 LightningCSS（v4 默认打包引擎）或 PostCSS 增加对早期浏览器版本（如 iOS 14）的 Target 编译降级，确保打包出的 CSS 文件含有安全的 `rgba` 或 `hex` Fallback。
- 🚫 **杜绝透明颜色带来的解析异常**：由于老的 WebView 对 `css variables` 配合 `opacity`（例如 `<div class="bg-primary/50">`）支持度不够，关键按钮和文字尽可能使用实色。

## 7. 组件拆分与自适应规范 (Component Split & Responsive)

- ✅ **合理拆分组件 (SMART Split)**：禁止将几百行代码揉在一个文件中。必须按功能模块和职责严格拆分（如将头部大区块拆分为 `Header.tsx`, `BookingBar.tsx`, `Hero.tsx`）。每个组件应保持单一职责原则，提高代码的可读性与复用性。
- ✅ **移动端优先与极度自适应 (Mobile First & Highly Responsive)**：**绝对强调！**所有页面和组件的核心结构必须首先考虑移动端的垂直堆叠体验，然后再通过 `md:`, `lg:`, `xl:` 等响应式断点适配桌面端的复杂网格或横向排列。绝对不允许出现因为固定宽度 (fixed widths) 导致移动端内容溢出、破版或出现横向滚动条的情况。在使用相对定位的重叠层（如 Hero 图片与 Header）时，必须处理好各断点高度坍塌的问题。
