# AI Agent Instructions

- AI MUST NOT execute `dev` or `build` scripts (e.g. `pnpm dev`, `npm run build`). These commands must be initiated by the user manually.
- CSS/Tailwind: 必须遵循 Tailwind CSS v4 规范，使用标准类名 Canonical Classes。例如 `flex-shrink-0` 代替 `shrink-0`，`flex-grow` 代替 `grow`。
- 文本替换与编码：如果在 Powershell 使用 `Set-Content`、`Replace` 替换 tsx 文件内容，必须注意 UTF-16/GBK 乱码问题，建议直接使用工具进行文件编辑。tsx 中的 HTML entities 必须正确编码。每次完成重构后，通过 `pnpm lint` 或编译来验证是否产生语法错误。
- **Next.js 16 中间件重命名（框架级变更）：** `middleware.ts` 在 Next.js 16.0.0 中已正式废弃，框架将其重命名为 `proxy.ts`（见官方 changelog：v16.0.0 — "Middleware is deprecated and renamed to Proxy"）。这是框架本身的文件约定变更，与本项目无关。**严禁创建 `middleware.ts`**，否则会被 Next.js 忽略或报警告。本项目中间件逻辑（next-intl i18n routing）位于根目录 `proxy.ts`，所有 `matcher` 修改必须在此文件中进行。若需要让某个路径段（如 `/planning`）跳过 i18n 处理，在 `proxy.ts` 的 `matcher` 正则中排除：`matcher: ['/((?!api|_next|_vercel|planning|.*\\..*).*)']`。

---

# CLAUDE.md

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.

---

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