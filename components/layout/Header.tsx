'use client';

import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { BookingBar } from '../home/BookingBar';
import { useState, useRef, useEffect } from 'react';
import { useLenis } from 'lenis/react';
import { useRouter, usePathname, Link } from '@/i18n/routing';
import { MobileNavDrawer } from './MobileNavDrawer';

const LOCALES = [
  { code: 'zh', label: '简体中文', short: '中文' },
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'ms', label: 'Bahasa Melayu', short: 'BM' },
];

export function Header() {
  const t = useTranslations('Header');
  const tBooking = useTranslations('BookingBar');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const lastScrollY = useRef(0);
  const langRef = useRef<HTMLDivElement>(null);

  // 延迟 3.5 秒后自动展开预定表单，等首屏动画渲染完成
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBookingOpen(true);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const switchLocale = (next: string) => {
    router.replace(pathname, { locale: next });
    setLangOpen(false);
  };

  const currentShort = LOCALES.find((l) => l.code === locale)?.short ?? locale.toUpperCase();

  // useLenis 替代 window.addEventListener('scroll') — 与 lenis 平滑滚动完全同步
  useLenis(
    ({ scroll }) => {
      setIsScrolled(scroll > 150);
      lastScrollY.current = scroll;
    },
    [isScrolled],
  );

  const navItems = [
    { key: 'nav1', href: '/' },
    { key: 'nav2', href: '/booking' },
    { key: 'nav3', href: '/gallery' },
    { key: 'nav4', href: '/location' },
    { key: 'nav5', href: '/offers' },
    { key: 'nav6', href: '/contact' },
  ] as const;

  return (
    <>
      <header className="pointer-events-none fixed top-0 right-0 left-0 z-50 flex w-full flex-col">
        {/* ======================= */}
        {/*     Desktop Header      */}
        {/* ======================= */}
        <nav
          className={`pointer-events-auto relative z-50 hidden w-full transition-all duration-700 lg:block ${
            isScrolled
              ? 'bg-primary py-3 shadow-sm backdrop-blur-sm text-white'
              : 'from-primary/95 bg-linear-to-b to-transparent py-5'
          }`}
        >
          <div className="mx-auto flex max-w-350 items-center justify-between px-6 lg:px-20">
            {/* Logo */}
            <Link
              href="/"
              className="shrink-0 transition-opacity hover:opacity-80"
            >
              <Image
                src="/images/logo-h-new.png"
                alt="Meili Resort Hotel"
                width={240}
                height={81}
                className="h-14 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop Nav Links */}
            <div className="flex items-center gap-7 lg:gap-9">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={`relative pb-1 font-sans text-[0.75rem] tracking-[0.15em] transition-colors duration-500 after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:transition-transform after:duration-300 after:content-[''] ${
                      isActive
                        ? isScrolled
                          ? 'font-normal text-white after:scale-x-100 after:bg-white'
                          : 'font-light text-white after:scale-x-100 after:bg-white'
                        : isScrolled
                          ? 'font-normal text-white/80 hover:text-white after:scale-x-0 after:bg-white hover:after:scale-x-100'
                          : 'font-light text-white/90 hover:text-white after:scale-x-0 after:bg-white hover:after:scale-x-100'
                    }`}
                  >
                    {t(item.key)}
                  </Link>
                );
              })}

              {/* Booking Toggle */}
              <button
                onClick={() => setIsBookingOpen((v) => !v)}
                className={`flex items-center gap-1.5 rounded-full border px-4 py-1.5 transition-all duration-500 ${isScrolled ? 'border-white/40 text-white/90 hover:border-white/60 hover:bg-white/15' : 'border-white/40 text-white/90 hover:border-white/60 hover:bg-white/15'}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span className="font-sans text-[0.6875rem] tracking-[0.12em]">
                  {isBookingOpen ? tBooking('hide') : tBooking('show')}
                </span>
              </button>

              {/* Language Switcher */}
              <div className="relative" ref={langRef}>
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className={`flex items-center gap-1.5 font-sans text-[0.75rem] tracking-widest transition-colors duration-500 ${isScrolled ? 'font-light text-white/80 hover:text-white' : 'font-light text-white/80 hover:text-white'}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                    <path d="M2 12h20" />
                  </svg>
                  <span>{currentShort}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`}
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                {langOpen && (
                  <div className="absolute top-full right-0 mt-2 min-w-35 overflow-hidden rounded-sm border border-[--color-warm-gray] bg-white shadow-lg">
                    {LOCALES.map((loc) => (
                      <button
                        key={loc.code}
                        onClick={() => switchLocale(loc.code)}
                        className={`block w-full px-4 py-2.5 text-left font-sans text-xs tracking-wide transition-colors ${
                          locale === loc.code
                            ? 'bg-[--color-cream] font-medium text-primary'
                            : 'text-zinc-700 hover:bg-[--color-cream] hover:text-primary'
                        }`}
                      >
                        {loc.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* ======================= */}
        {/*     Mobile Header       */}
        {/* ======================= */}
        <div className="pointer-events-auto flex h-17 w-full items-center justify-between bg-white px-4 shadow-xs transition-all duration-300 sm:h-20 sm:px-6 lg:hidden">
          <Link href="/" className="shrink-0">
            <Image
              src="/images/logo-color.png"
              alt="Logo"
              width={140}
              height={40}
              className="h-8 w-auto object-contain sm:h-10"
            />
          </Link>
          <div className="flex shrink-0 items-center justify-end gap-3 sm:gap-4">
            <button
              onClick={() => setMobileNavOpen(true)}
              className="-mr-1 cursor-pointer p-1 text-black transition-opacity hover:opacity-70 sm:-mr-2 sm:p-2"
              aria-label="Open Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* ======================= */}
        {/*      Booking Bar        */}
        {/* ======================= */}
        <div className="hidden lg:block">
          <BookingBar
            isOpen={isBookingOpen}
            onClose={() => setIsBookingOpen(false)}
            isScrolled={isScrolled}
          />
        </div>
      </header>

      {/* ======================= */}
      {/*   Mobile Nav Drawer     */}
      {/* ======================= */}
      <MobileNavDrawer
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        locales={LOCALES}
      />
    </>
  );
}
