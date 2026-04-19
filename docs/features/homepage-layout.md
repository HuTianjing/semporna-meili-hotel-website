# 03. 首页核心模块布局与 v0 提示词 (Homepage Layout & v0 Prompts)

本页面的设计参照了顶流度假村（如四季酒店）的视觉呈现与用户链路，结合 **“美丽度假酒店 MEILI RESORT HOTEL”** 的品牌基调与需求进行精细化规划。

---

## 1. 顶部第一屏细节规划 (Hero Section Detailed Planning)

客户要求第一屏高度还原高奢度假村官网体验，核心细节如下：

1. **顶部导航栏 (Header) 与粘性交互**：导航栏使用粘性吸顶布局 (`fixed` 或 `sticky` + `top-0 z-50`)。初始在顶部时背景拟态化（`bg-[#003865]/60 backdrop-blur-md`）；当用户任意向下滚动后，必须增加一层优雅的底部阴影（Box-shadow），从视觉上与下面滚动的图层形成分离感。
2. **预订搜索栏 (Booking Bar)**：拟态化毛玻璃效果。背景带有垂直线性渐变及模糊处理。包含日期选区、宾客选区、促销代码及“查看房价”按钮。
3. **背景层 (Background)**：全尺寸自适应全屏。目前暂无视频，先让 v0 自动生成高清海岛图片作为背景。
4. **左下角文案区 (Typography)**：包含酒店次级标题、巨大视觉冲击力的沉浸式大标题（Serif 字体）及白色的联系方式（带文本阴影以防看不清）。
5. **右下角互动卡片区 (Widgets & Interactions)**：右下方横排三个等宽的深色半透明矩形（包含细线图标和文字）。**核心视差动效**：当页面向下滚动时，这三个卡片需根据滚动进度向右侧平移并逐渐透明直至消失。
6. **底部滚动提示区（延迟抬升与指示器）**：
   - 页面加载进入后，延迟几秒钟，首屏主视觉区（背景图/视频）会自动“往上抬一抬”（缩小高度或向上平移），在底部漏出一段白色/米白色（Off-white）的区域。
   - 该区域中心显示“向下滚动探索更多”字样。
   - 附带一条垂直指示线，底色为淡淡的米白/暗白，每隔几秒会有一小段纯白色的高亮竖线从上到下丝滑滑落。
7. **全尺寸自适应 (Responsive)**：严格要求在移动端、平板和桌面端完美适配。

---

## 2. v0 代码生成提示词 (v0 Prompt)

_(建议使用以下纯英文提示词，以便 v0 更好地理解技术栈与 UI 的细节映射。您可以直接全选复制。)_

```text
Please build a highly premium, luxury island resort homepage Hero Section.
Tech Stack: Next.js (App Router), Tailwind CSS, Framer Motion, Lucide React (for icons).
Requirements must be strictly followed, ensuring pixel-perfect responsive design (Mobile, Tablet, Desktop) and a luxurious typography vibe (Serif for headings, Sans-serif for body).

**1. Background Layer:**
- `h-screen w-full` wrapper.
- Autogenerate a stunning tropical island/ocean high-resolution placeholder image as the background (simulate a video poster).
- Add a subtle dark color overlay (`bg-black/20`) to ensure text readability.

**2. Top Header (Navigation):**
- Pinned at the top. Left: Resort Name "MEILI RESORT". Right/Center: Nav links (Overview, Villas & Suites, Photos, Location, Offers).
- **Background Material (Crucial):** Do NOT use solid black. Use a deep ocean blue with glassmorphism: `bg-[#003865]/60 backdrop-blur-md`. White elegant text.

**3. Booking Bar (Below Header):**
- A horizontal floating bar right beneath the header.
- **Glassmorphism effect (Crucial):** Implement a white frosted glass effect replicating this CSS: `backdrop-filter: blur(13px); background: linear-gradient(180deg, hsla(0, 0%, 100%, .55), hsla(0, 0%, 100%, .75) 30%);`
- **Inputs:** Minimalist borderless inputs for "Check-in - Check-out (Dates)", "Guests (Rooms & Adults)", "Promo Code", and a solid dark contrasting "CHECK RATES" button on the right.

**4. Bottom-Left Typography:**
- Subheading (e.g., "MEILI RESORT SEMPORNA").
- Massive, high-impact display heading in Serif font (e.g., "SEMPORNA").
- Contact info and address below. Ensure text has a subtle drop shadow for clear visibility.

**5. Bottom-Right (3 Entry Cards & Scroll Animation - Crucial Framer Motion Effect):**
- Three horizontal, equal-width dark semi-transparent rectangular cards (e.g., "Location", "Villas & Suites", "Gallery").
- Center-aligned thin icon and text inside each. Hover effect: slight brighten/scale.
- **Scroll Interaction:** Use Framer Motion (`useScroll`, `useTransform`). When the user scrolls down away from the hero section, these three cards MUST gracefully slide to the right (translateX) and simultaneously fade out to 0 opacity.

**6. Bottom Scroll Indicator & Push-up Entry Animation (Crucial Detail):**
- On initial page load, wait ~2-3 seconds, then naturally animate (push up / shrink height slightly) the main hero image to reveal a solid off-white/beige bottom block.
- In this bottom block, display the text "向下滚动探索更多" (SCROLL TO EXPLORE MORE).
- Above or crossing this text, create a vertical line (faint beige). Animate a pure white line dropping down along this vertical path infinitely every few seconds.

**7. Next Section Parallax Overlap:**
- Below the hero, add the beginning of the "Hotel Intro" section (white background, very elegant centered text).
- Make sure that when the user scrolls down, this "Hotel Intro" section slides UP over the hero section with a parallax effect, cleanly covering the "Scroll to explore" bottom block first.

Make it look extremely expensive, polished, and breathtaking. Do not write backend logic, focus entirely on UI, interactions, and aesthetic spacing.
```

---

## 3. 酒店介绍 (Hotel Intro / Overview)

- **布局**：大面积留白，搭配极简文字排版。
- **视差遮盖动效**：当用户向下滚动时，此介绍区块会以微弱的视差效果缓慢向上滑动，直接覆盖上方首屏底部的“向下滚动探索更多”区域，实现页面间的平滑过渡。
- **内容主旨**：一段有温度的文字或创始人寄语，描述“静逸桃源”、“水上别墅与套房”的主旨，强调酒店的超优越地缘位置和宁静感。

## 4. 别墅与套房 (Villas & Suites Showcase)

紧接在“酒店介绍”区块下方，展示酒店核心住宿体验资源。

- **展现形式与布局**：采用横向流的画廊/轮播 (Cover-flow Carousel) 模式，并严格遵守多端尺寸自适应（在 Mobile/Tablet 同样优雅呈现）。
- **活动卡片详略区分交互 (Active vs Inactive States)**：
  - **当前选中状态 (Active Card)**：居中呈现。需在一张大封面图下方，拼接一个白色底部的说明区块，包含：巨大的套房名称、分隔短线、多行详细配文介绍，以及操作按钮（如 `[查看房价]`、`[详情]`）。视觉上被全面放大和突出。
  - **未选中状态 (Inactive Cards)**：位于两侧。呈现被高度压缩或“收起”的视觉感。**只显示图片和底部的简单标题**，完全隐藏描述段落和按钮。
  - **切换交互效果**：点击两侧的 Inactive 卡片时，发生平滑补间动画进入中间变成 Active：原有居中的卡片详情“顺滑折叠收缩”，被点击的新卡片横向居中并“平滑向上/向下撑开”弹出详细文案及 CTA。

## 5. 优惠精选摘要 (Selected Offers Carousel)

- 将站点的 `/offers` 区的多个核心活动进行快照展示，每个卡片对应一个活动概念（如：“尊享更多 — 消费额度”、“康体之旅”、“悠享天堂之居”、“提前预订特惠”）。
- **CTA**：提供 `[查看优惠]` 链接与 `[全部优惠]` 按钮。

## 6. 播客与文化专栏 (Highlights & Storytelling)

本区域承载酒店深度体验、当地文化及特色服务（如：当地特色文化讲座、高级定制主厨介绍等），以图文并茂的画报（Editorial）风格呈现。

- **整体结构标题**：顶部居中显示大标题，如“精彩美丽，美丽呈献”，以极简留白的风格作为该区域的开篇。
- **入场扩展动效 (Scroll Expansion)**：
  - **初始状态**：向下滚动刚进入该专栏的第一张焦点图片时，该图片块保持在左右留白约束的“特定宽度（如 Container 宽度）”。
  - **滚动状态**：随着页面继续往下拖拽，这张主焦点图应像被“拉开”一样，平滑地横向扩展直到占满屏幕全宽（Edge-to-Edge）。
- **右侧侧边栏文字浮现 (Sticky Text Fade-in)**：
  - 当布局扩展至全屏或进入分栏模式后（左大图，右侧留白），右侧对应的文字说明块（包括标题如“我们的美丽”，介绍段落，及“详情”按钮）开始从 `opacity: 0` 透明状态，随着向下卷轴进行丝滑淡入。
  - **布局建议 (Sticky Scroll Layout)**：对于深度的多图文栏目区，推荐采用左侧（或右侧）为滚动的大幅画报/照片，另一半屏幕为“粘性固定 (Sticky/Pin)”的文字区域。随着多张图片的顺滑上移滚动，固定区域的文字相应产生渐变淡入淡出并更新，这种经典的叙事感（Storytelling）页面布局极具顶奢杂志质感。

---

## 7. v0 代码生成提示词: 播客与专栏精华区块

_如果您需要分块让 v0 生成这里的高级复杂特效，可直接复制下方这段专属 prompt：_

```text
Please build a "Highlights & Storytelling" editorial section for a luxury hotel homepage.
Tech Stack: Next.js (App Router), Tailwind CSS, Framer Motion.

**Section Requirements:**
1. **Top Title:** A clean, centered elegant Serif title (e.g., "Highlights, Presented by Meili").
2. **Scroll-triggered Expansion Animation (Crucial):**
   - The first main featured image wrapper should initially sit inside a constrained container max-width (e.g., `max-w-screen-xl`).
   - Using Framer Motion (`useScroll`, `useTransform`), tie the `width` or horizontal margin of this image wrapper to the scroll progress so that as the user scrolls down, the image expands smoothly to become `100vw` (edge-to-edge full width).
3. **Sticky Storytelling Layout & Fade-in:**
   - Immediately following the expansion, the layout becomes a 2-column grid (50/50).
   - One side (e.g., left) contains a stack of large, beautiful images scrolling normally.
   - The other side (e.g., right) acts as a sticky text container. As each new image scrolls into view on the left, the corresponding text on the right elegantly fades in from transparent to 100% opacity without moving up and down.
   - The typography must be very clean, with generous padding, using Serif for the subtitle (e.g., "Our Semporna") and a minimal CTA link with an underline.

Ensure all transitions are buttery smooth (Apple-like feel) and responsive (stacking the columns gracefully on mobile).
```

---

## 8. UGC 与社群流 (#MEILIRESORTHOTEL)

- 接入住客照片 (Instagram 接入或内容精选图集) 平铺展现，建立口碑背书。
- 行动短语：“访问 @meiliresort 和 #meiliresort，探索四海宾朋在美丽度假酒店收获的难忘体验。”

## 9. 底部导航栏与超级页脚 (Footer Navigation)

完全参考顶级奢侈酒店的经典“Mega Footer”重型结构，提供极富功能性与延展服务深度的页底锚点。

- **色彩基调建议**：不要使用死板的纯黑（`#000000`）。强烈建议使用**极深邃的海洋蓝**（比品牌主色调更暗，如 `#001A33` 或 Tailwind 的 `bg-slate-950`）。这样既能达到纯黑那种压得住阵脚的厚重沉稳感，又能在潜意识里呼应“仙本那蓝色海湾”的品牌基因，视觉上会高贵很多。
- **顶部 Logo 呈现**：居中放置精美的酒店 Logo（可带细致线条）与品牌标准文字。
- **中部分类链接 (4列多行布局)**：
  - **简介 (About)**：关于美丽酒店、职场资讯等。
  - **预订 (Reservations)**：查找预订、请求发票、联系我们、会议与活动。
  - **新闻 (Press)**：新闻发布、博客。
  - **更多体验 (Discover More)**：私人游艇、直升机接送、非凡体验、礼品卡等。
- **底部分离区 (Legal & Localization)**：
  - 一条极细的、透明度很低的水平亮色分割线 (`border-t border-white/10`)。
  - **左侧**：横向紧凑排列的法律细则（法律公告、隐私政策、Cookie 偏好、网站备案号），字号极小。
  - **右侧**：深色极简下拉样式的多语言/区域切换器（如“简体中文”）。

---

## 10. v0 代码生成提示词: 超级页脚区块

_全选复制下方这段专属 prompt，让 v0 构建极具奢华感且自适应的底部页脚：_

```text
Please build a classic, luxury "Mega Footer" component for a high-end resort website.
Tech Stack: Next.js, Tailwind CSS, Lucide React (for small icons like chevron).

**Design & Layout Requirements:**
1. **Background Color:** Do NOT use pure flat black (`#000000`). Use an exceptionally dark, sophisticated navy blue (e.g., `#001A33` or `bg-slate-950`) to create a heavy but branded anchor. Text should be white or light gray (`text-white/60`).
2. **Top Section:** A elegantly centered Resort Logo (use a placeholder luxury SVG icon) and the brand name "MEILI RESORT" below it, utilizing a premium Serif font. Add massive padding top and bottom (`py-24`).
3. **Middle Section (4-Column Grid):**
   - Create a clean 4-column layout for navigation link groups.
   - Column Headers (Serif or bold minimal Sans, 100% white, slightly larger text): "About", "Reservations", "Press", "Discover More".
   - Link items (Sans-serif, small text, `text-white/50`, smooth hover effect to `text-white`). Space them out generously (e.g., `gap-y-4`).
4. **Bottom Legal & Language Section:**
   - Separated by a very thin, subtle top border (`border-t border-white/10`), adding a top margin to detach it from the links.
   - Left side: A horizontal list of tiny legal links (Legal Notice, Privacy Policy, Cookie Preferences, ICP License) separated by small dots (`·`).
   - Right side: A minimalist language selector dropdown (e.g., "Simplified Chinese") with a small chevron down.

Make it incredibly spacious, refined, and perfectly responsive. On desktop it should be a 1-row 4-column grid. On tablets, collapse to a 2x2 grid. On mobile, collapse into a single vertical column stack.
```
