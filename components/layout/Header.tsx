'use client';

import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { BookingBar } from '../home/BookingBar';
import { useState, useRef, useEffect } from 'react';
import { useLenis } from 'lenis/react';
import { useRouter, usePathname, Link } from '@/i18n/routing';
import { Globe, ChevronDown, Calendar } from 'lucide-react';

const LOCALES = [
  { code: 'zh', label: '中文', full: '简体中文' },
  { code: 'en', label: 'EN', full: 'English' },
  { code: 'ms', label: 'MY', full: 'Bahasa Melayu' },
];

export function Header() {
  const t = useTranslations('Header');
  const tBooking = useTranslations('BookingBar');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const switchLocale = (next: string) => {
    router.replace(pathname, { locale: next });
    setLangOpen(false);
  };

  const currentLang = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

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
    { key: 'nav2', href: '/villas' },
    { key: 'nav3', href: '/activities' },
    { key: 'nav4', href: '/gallery' },
    { key: 'nav5', href: '/contact' },
  ] as const;

  return (
    <header className="pointer-events-none fixed top-0 right-0 left-0 z-50 flex w-full flex-col">
      <nav
        className={`pointer-events-auto relative z-50 w-full transition-all duration-700 ${
          isScrolled
            ? 'bg-primary py-3 shadow-sm backdrop-blur-sm text-white'
            : 'from-primary/95 bg-linear-to-b to-transparent py-4 md:py-5'
        }`}
      >
        <div className="mx-auto flex max-w-350 items-center justify-between px-6 md:px-12 lg:px-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-3 transition-opacity hover:opacity-80 md:gap-4"
          >
            <Image
              src={isScrolled ? '/images/logo-full.png' : '/images/logo-full.png'}
              alt="Logo"
              width={160}
              height={160}
              className="h-auto w-10 object-contain transition-all duration-700 md:w-12"
            />
            <div
              className={`flex flex-col items-start border-l pl-3 transition-colors duration-700 md:pl-4 ${isScrolled ? 'border-[--color-primary]/20' : 'border-white/25'}`}
            >
              <span
                className={`font-serif text-base leading-none tracking-[0.05em] transition-colors duration-700 md:text-lg ${isScrolled ? 'text-[--color-primary]' : 'text-white'}`}
              >
                MEILI
              </span>
              <span
                className={`mt-0.5 font-sans text-[0.55rem] tracking-[0.3em] uppercase transition-colors duration-700 md:text-[0.6rem] ${isScrolled ? 'text-[--color-slate-muted]' : 'text-white/70'}`}
              >
                RESORT HOTEL
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-7 md:flex lg:gap-9">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`font-sans text-[0.75rem] tracking-[0.15em] transition-colors duration-500 ${isScrolled ? 'font-normal text-[--color-primary]/80 hover:text-[--color-primary]' : 'font-light text-white/90 hover:text-white'}`}
              >
                {t(item.key)}
              </Link>
            ))}

            {/* Booking Toggle */}
            <button
              onClick={() => setIsBookingOpen((v) => !v)}
              className={`flex items-center gap-1.5 rounded-full border px-4 py-1.5 transition-all duration-500 ${isScrolled ? 'border-[--color-primary]/30 text-[--color-primary] hover:bg-[--color-primary] hover:text-white' : 'border-white/40 text-white/90 hover:border-white/60 hover:bg-white/15'}`}
            >
              <Calendar size={12} />
              <span className="font-sans text-[0.6875rem] tracking-[0.12em]">
                {isBookingOpen ? tBooking('hide') : tBooking('show')}
              </span>
            </button>

            {/* Language Switcher */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className={`flex items-center gap-1.5 font-sans text-[0.75rem] tracking-[0.1em] transition-colors duration-500 ${isScrolled ? 'font-normal text-[--color-primary]/70 hover:text-[--color-primary]' : 'font-light text-white/80 hover:text-white'}`}
              >
                <Globe size={14} />
                <span>{currentLang.label}</span>
                <ChevronDown
                  size={11}
                  className={`transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {langOpen && (
                <div className="absolute top-full right-0 mt-2 min-w-[140px] overflow-hidden rounded-sm border border-[--color-warm-gray] bg-white shadow-lg">
                  {LOCALES.map((loc) => (
                    <button
                      key={loc.code}
                      onClick={() => switchLocale(loc.code)}
                      className={`block w-full px-4 py-2.5 text-left font-sans text-xs tracking-wide transition-colors ${
                        locale === loc.code
                          ? 'bg-[--color-cream] font-medium text-[--color-primary]'
                          : 'text-[--color-slate-muted] hover:bg-[--color-cream] hover:text-[--color-primary]'
                      }`}
                    >
                      {loc.full}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setIsBookingOpen((v) => !v)}
              className={`rounded-full border p-1.5 transition-all duration-500 ${isScrolled ? 'border-[--color-primary]/30 text-[--color-primary] hover:bg-[--color-primary]/10' : 'border-white/40 text-white/90 hover:bg-white/15'}`}
            >
              <Calendar size={14} />
            </button>

            {/* Mobile Lang */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className={`transition-colors duration-500 ${isScrolled ? 'text-[--color-primary]' : 'text-white/85 hover:text-white'}`}
              >
                <Globe size={16} />
              </button>
              {langOpen && (
                <div className="absolute top-full right-0 mt-2 min-w-[130px] overflow-hidden rounded-sm border border-[--color-warm-gray] bg-white shadow-lg">
                  {LOCALES.map((loc) => (
                    <button
                      key={loc.code}
                      onClick={() => switchLocale(loc.code)}
                      className={`block w-full px-4 py-2.5 text-left font-sans text-xs ${
                        locale === loc.code
                          ? 'bg-[--color-cream] font-medium text-[--color-primary]'
                          : 'text-[--color-slate-muted] hover:bg-[--color-cream]'
                      }`}
                    >
                      {loc.full}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Hamburger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex flex-col gap-1.5 p-2"
              aria-label="Toggle menu"
            >
              <span
                className={`block h-px w-5 transition-all duration-500 ${isScrolled ? 'bg-[--color-primary]' : 'bg-white'} ${isMenuOpen ? 'translate-y-[3.5px] rotate-45' : ''}`}
              />
              <span
                className={`block h-px w-5 transition-all duration-500 ${isScrolled ? 'bg-[--color-primary]' : 'bg-white'} ${isMenuOpen ? 'opacity-0' : ''}`}
              />
              <span
                className={`block h-px w-5 transition-all duration-500 ${isScrolled ? 'bg-[--color-primary]' : 'bg-white'} ${isMenuOpen ? '-translate-y-[3.5px] -rotate-45' : ''}`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Full-screen Menu */}
        <div
          className={`fixed inset-0 z-[-1] transition-all duration-700 md:hidden ${
            isMenuOpen
              ? 'pointer-events-auto bg-white opacity-100'
              : 'pointer-events-none opacity-0'
          }`}
          style={{ top: isScrolled ? '60px' : '72px' }}
        >
          <div className="flex h-full flex-col items-center justify-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="font-serif text-2xl tracking-[0.1em] text-[--color-primary] transition-colors hover:text-[--color-primary]/70"
              >
                {t(item.key)}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Booking Bar — 作为 header 的一部分自然展开 */}
      <BookingBar
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        isScrolled={isScrolled}
      />
    </header>
  );
}
