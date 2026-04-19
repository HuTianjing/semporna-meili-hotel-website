import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['zh', 'en', 'ms'],
  defaultLocale: 'zh',
  // as-needed: 默认语言(zh)无前缀 → /，其余语言带前缀 → /en、/ms
  localePrefix: 'as-needed',
});

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
