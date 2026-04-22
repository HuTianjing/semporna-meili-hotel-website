# AI Agent Instructions

## Mandatory Rules

- **Never execute `dev` or `build` scripts** (e.g. `pnpm dev`, `npm run build`). These must be started by the user manually.
- **CSS/Tailwind:** Always follow Tailwind CSS v4 canonical class names. Use `flex-shrink-0` instead of `shrink-0`, `flex-grow` instead of `grow`, etc.
- **File Editing & Encoding:** Never use PowerShell `Set-Content` or `Replace` to edit `.tsx` files -- this causes UTF-16/GBK corruption. Use editor tools directly. HTML entities in TSX must be properly encoded. After any refactor, verify with `pnpm lint` or a compile check.
- **Next.js 16 Middleware Rename (framework-level change):** `middleware.ts` is officially deprecated in Next.js 16.0.0 and renamed to `proxy.ts` (see official changelog: v16.0.0 -- "Middleware is deprecated and renamed to Proxy"). **Never create `middleware.ts`** -- Next.js will silently ignore it or emit warnings. All i18n routing logic (next-intl) lives in the root `proxy.ts`. To exclude a path segment (e.g. `/planning`) from i18n processing, update the `matcher` regex in `proxy.ts`:
  ```
  matcher: ['/((?!api|_next|_vercel|planning|.*\\..*).*)']
  ```

---

# Behavioral Guidelines

These guidelines reduce common LLM coding mistakes. They bias toward caution over speed -- use judgment for trivial tasks.

## 1. Think Before Coding

**Don't assume. Surface tradeoffs. Ask when uncertain.**

- State your assumptions explicitly before implementing.
- If multiple interpretations exist, present them -- don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop and ask rather than guessing.

## 2. Simplicity First

**Write the minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No unrequested "flexibility" or "configurability".
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask: "Would a senior engineer call this overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it -- don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that **your** changes made unused.
- Don't remove pre-existing dead code unless explicitly asked.

The test: every changed line must trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform vague tasks into verifiable goals:
- "Add validation" -> "Write tests for invalid inputs, then make them pass"
- "Fix the bug" -> "Write a test that reproduces it, then make it pass"
- "Refactor X" -> "Ensure tests pass before and after"

For multi-step tasks, state a brief plan upfront:
```
1. [Step] -> verify: [check]
2. [Step] -> verify: [check]
3. [Step] -> verify: [check]
```

Strong success criteria allow independent iteration. Weak criteria ("make it work") require constant clarification.

---

**These guidelines are working if:** diffs have fewer unnecessary changes, there are fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.

---

# Frontend Coding Standards

All pull requests must strictly follow these standards to ensure code quality, maintainability, and consistency.

## 1. TypeScript Strict Typing

TypeScript is the last line of defense -- no type escape hatches are allowed.

- No **Never use `any`**: Any occurrence of `any` will result in a rejected code review. If the type is genuinely unknown, use `unknown` with type narrowing, or define a generic.
- Yes **Prefer `interface` over `type`**: Use `interface` for object shapes, component props, and API response types. Only use `type` for union or intersection types.
- Yes **Explicit function return types**: Complex components and utility functions must declare their return type explicitly to avoid cascading type inference errors.

## 2. Tailwind CSS Design Tokens

Arbitrary values are forbidden. All visual values must go through pre-defined design tokens.

- No **Never use arbitrary values:**
  - Bad: `text-[#1a1a1a]`, `bg-[#0f0f0f]`
  - Bad: `w-[32px]`, `h-[48px]`, `gap-[10px]`
  - Bad: `text-[14px]`, `leading-[24px]`
- Good **Use semantic design tokens** defined in `tailwind.config.ts`:
  - **Colors:** `text-primary`, `bg-background`, `border-muted`
  - **Spacing:** `gap-4`, `px-8`, `mb-12` (4px grid system)
  - **Typography:** `text-sm`, `text-h1`, `leading-relaxed`
- Note **Adding new tokens:** If a design spec introduces a new color or spacing value, do not hardcode it. Submit a PR to add it to `theme.extend` in `tailwind.config.ts`.

## 3. Dynamic Class Names

- No **Never concatenate Tailwind class names with strings**: e.g. `className={"text-" + color}` -- the Tailwind compiler cannot statically scan these.
- Yes **Use `cn()` for all dynamic className merging:**

  ```tsx
  import { cn } from '@/lib/utils'; // wraps clsx + tailwind-merge

  // Correct
  <div className={cn('bg-background text-primary', isActive && 'bg-muted text-black')} />;
  ```

## 4. Next.js Architecture

- **Default to Server Components (RSC):** All new components are Server Components by default (no `'use client'`). Only add `'use client'` when the component explicitly requires `useEffect`, `useState`, or browser event handlers.
- No **Never misuse `useEffect` or `useState`:**
  - Bad: Don't use `useEffect` to fetch initial data -- use Server Components or SWR/React Query instead.
  - Bad: Don't use `useEffect` to derive state -- if a value can be computed from existing state, define it as a constant in render.
  - Bad: Don't write imperative DOM manipulation code unless integrating a third-party library (e.g. a media player). Always clean up event listeners and subscriptions on unmount.
- **Data Fetching:**
  - Display data: fetch in Server Components and pass down as props.
  - User interactions and forms: use Server Actions or well-encapsulated Route Handlers. Never expose API tokens to the client.

## 5. Tailwind CSS v4 Color Compatibility

Tailwind CSS v4 enables modern CSS color syntax (`oklch()`, `color-mix()`) by default. These can fail silently on older devices (e.g. iOS Safari < 15, older Android WebViews), rendering as black or transparent.

- Yes **Use safe color variable formats:** Define all Design Token CSS variables using `HSL` or `RGB` -- do not rely on native v4 `oklch` values.
- Yes **Configure a downlevel compile target:** If modern color functions are used in config, configure LightningCSS (v4's default bundler) or PostCSS to target older browsers (e.g. iOS 14) and emit `rgba`/`hex` fallbacks in the output CSS.
- No **Avoid opacity-based color utilities on critical UI:** Older WebViews have poor support for CSS variable + opacity combinations (e.g. `bg-primary/50`). Use solid colors for key buttons and text.

## 6. Component Splitting & Responsive Design

- Yes **Split components by responsibility:** Never put hundreds of lines in a single file. Break large sections into focused components (e.g. `Header.tsx`, `BookingBar.tsx`, `Hero.tsx`). Each component should have a single, clear responsibility.
- Yes **Mobile-first, strictly responsive:** All pages and components must be designed for mobile vertical stacking first, then adapted to desktop layouts using `md:`, `lg:`, `xl:` breakpoints. Fixed widths that cause content overflow or horizontal scrollbars on mobile are never acceptable. When using relatively positioned overlapping layers (e.g. a Hero image behind a Header), handle height collapse correctly at every breakpoint.