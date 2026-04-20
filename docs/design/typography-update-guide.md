# 字体替换流程与规范指南 (Typography Update Guide)

## 1. 背景与目标
原项目中出现英文字体“千篇一律”的原因在于：开发环境下（Turbopack）动态新增了字体依赖，但服务器并未重启，导致特定的优雅西文字体（Cinzel 和 Newsreader）载入失败（404）。进而触发了 CSS fallback 机制，使得全部西文退化成了中文字体（**思源宋体 Noto Serif SC**）。此时字母形态和间距呈现中式的等宽拉伸感，失去了原生英文字体的设计张力。

为了彻底解决此问题，并按照“**大标题采用碑铭气质 Cinzel SemiBold（600）、正文与引言采用优雅 Newsreader（36pt 光学尺寸）、中文皆以 Noto Serif SC（思源宋体）作为底层无缝兜底**”的高定奢华准则，我们对全站进行了彻底的字体体系重构。

## 2. 替换流程记录

### Step 1. 整理并精简依赖
我们移除了原用于 UI 的无衬线字体 `Inter`，精简了项目中过多的字体。
```bash
pnpm remove @fontsource-variable/inter
pnpm add @fontsource-variable/cinzel @fontsource-variable/newsreader @fontsource/noto-serif-sc
```

### Step 2. 全局样式引入与角色定义 (`app/globals.css`)
通过本地 NPM 包的形式引入字体，确保不会因为第三方 CDN（如 Google Fonts）在部分地区被墙而产生布局偏移（CLS）与闪烁。

```css
/* UI / 英文标题衬线：Cinzel SemiBold（碑铭体，全大写气质） */
@import '@fontsource-variable/cinzel';
/* 英文正文衬线 / 大段落：Newsreader（36pt 光学尺寸，优雅排版） */
@import '@fontsource-variable/newsreader/opsz.css';
@import '@fontsource-variable/newsreader/opsz-italic.css';
/* 中文衬线：思源宋体 Noto Serif SC（简中子集，按需按字重加载） */
@import '@fontsource/noto-serif-sc/chinese-simplified-400.css';
@import '@fontsource/noto-serif-sc/chinese-simplified-500.css';
@import '@fontsource/noto-serif-sc/chinese-simplified-600.css';
@import '@fontsource/noto-serif-sc/chinese-simplified-700.css';
```

**更新 CSS Token 映射关系：**
完全剔除了 `sans-serif`，实现了全站“纯衬线（Serif）体验”。
```css
@theme {
  /* 角色分工：
     sans  = Newsreader Variable     — 英文正文段落 / 大号排版引言 (全局接管基底)
                                       + Noto Serif SC 作为中文 fallback
     serif = Cinzel Variable         — 英文大标题（h1/h2，全大写碑铭气质）
                                       + Noto Serif SC 作为中文 fallback
     text  = Newsreader Variable     — 强声明 alias
  */
  --font-sans: 'Newsreader Variable', 'Newsreader', 'Noto Serif SC', '思源宋体', serif;
  --font-serif: 'Cinzel Variable', 'Cinzel', 'Noto Serif SC', '思源宋体', serif;
  --font-text: 'Newsreader Variable', 'Newsreader', 'Noto Serif SC', '思源宋体', serif;
}
```

### Step 3. 全局基底规则设定
强制干预全局字重与浏览器渲染抗锯齿，使整个页面更加高级。
```css
@layer base {
  body {
    /* 全站默认正文：Newsreader (利用 optical size 提升 36pt 时的优雅锐利度) */
    font-family: var(--font-sans);
    font-variation-settings: "opsz" 36;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* 使得所有引用 font-serif（大标题）默认成为 SemiBold (600)，发挥 Cinzel 的最佳磅数 */
  h1, h2, h3, h4, h5, h6, .font-serif {
    font-family: var(--font-serif);
    font-weight: 600;
  }
}
```

### Step 4. 组件层排查与修正
扫描系统内所有使用 `font-serif` 与 `font-sans` 的 Tailwind 类：
- 移除了由于过去 `Inter` 和旧版衬线字体搭配导致的强行声明次级字重（如 `font-normal`），确保 Cinzel 可以自由发挥。
- 例如：将 `font-serif font-normal` 修正为单纯的 `font-serif`。
- 将 `HotelIntro` 中的引文斜体字 `font-serif italic` 修正为 `font-text italic`，因为 Cinzel 没有斜体资源，需要转交由 Newsreader 渲染。

## 3. 开发者的重要日常提醒 (Troubleshooting)

**遇到新安装的静态资源（包含字体、图片等）不生效，或者呈现诡异的后备样式：**
这是由于 Next.js (`pnpm dev`) 开发服务器的热更新可能不监控深层的新装 NPM 非 JS 模块：
👉 **解法：** 请在终端强制 `Ctrl + C`，然后重新 `pnpm dev` 启动服务。

## 4. 最终全站排版呈现效果
- 页面**所有默认文本、正文介绍、导航栏、微小标签**（原 `font-sans`）：呈现出极为平滑的 Newsreader 衬线阅读体验，遇到中文则完美顺滑地转接为 Noto Serif SC。
- 页面**所有引言斜体**（由 `font-text italic` 触发）：表现出极其典雅的 Newsreader Italic 意大利斜体形态。
- 页面**所有核心大标题（Hero 标题、各 Section 头标）**（由 `font-serif` 触发）：展示出刚硬、史诗感的 Cinzel SemiBold（600字重）效果，极大提升奢华度假酒店的高级感与艺术性。
