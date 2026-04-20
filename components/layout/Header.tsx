'use client';

import { useTranslations, useLocale } from 'next-intl';
import { BookingBar } from '../home/BookingBar';
import { useState, useRef } from 'react';
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
  const [isBookingOpen, setIsBookingOpen] = useState(true);
  const lastScrollY = useRef(0);
  const langRef = useRef<HTMLDivElement>(null);

  const switchLocale = (next: string) => {
    router.replace(pathname, { locale: next });
    setLangOpen(false);
  };

  const currentLang = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  // useLenis 替代 window.addEventListener('scroll') — 与 lenis 平滑滚动完全同步
  useLenis(
    ({ scroll }) => {
      setIsScrolled(scroll > 80);
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
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled ? 'bg-white/95 backdrop-blur-sm py-3 shadow-sm' : 'py-4 md:py-5'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col items-start">
            <span
              className={`font-serif text-lg tracking-[0.05em] leading-none transition-colors duration-700 ${
                isScrolled ? 'text-[--color-primary]' : 'text-white'
              }`}
            >
              Semporna
            </span>
            <span
              className={`font-sans text-[0.6rem] uppercase tracking-[0.3em] mt-0.5 transition-colors duration-700 ${
                isScrolled ? 'text-[--color-slate-muted]' : 'text-white/80'
              }`}
            >
              Meili Resort
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-7 lg:gap-9">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`font-sans text-[0.75rem] tracking-[0.15em] transition-colors duration-500 ${
                  isScrolled
                    ? 'text-[--color-primary]/80 hover:text-[--color-primary] font-normal'
                    : 'text-white/90 hover:text-white font-light'
                }`}
              >
                {t(item.key)}
              </Link>
            ))}

            {/* Booking Toggle */}
            <button
              onClick={() => setIsBookingOpen((v) => !v)}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full border transition-all duration-500 ${
                isScrolled
                  ? 'border-[--color-primary]/30 text-[--color-primary] hover:bg-[--color-primary] hover:text-white'
                  : 'border-white/40 text-white/90 hover:bg-white/10 hover:border-white/60'
              }`}
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
                className={`flex items-center gap-1.5 font-sans text-[0.75rem] tracking-[0.1em] transition-colors duration-500 ${
                  isScrolled
                    ? 'text-[--color-primary]/70 hover:text-[--color-primary] font-normal'
                    : 'text-white/80 hover:text-white font-light'
                }`}
              >
                <Globe size={14} />
                <span>{currentLang.label}</span>
                <ChevronDown size={11} className={`transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-2 bg-white rounded-sm shadow-lg overflow-hidden min-w-[140px] border border-[--color-warm-gray]">
                  {LOCALES.map((loc) => (
                    <button
                      key={loc.code}
                      onClick={() => switchLocale(loc.code)}
                      className={`block w-full text-left px-4 py-2.5 text-xs tracking-wide font-sans transition-colors ${
                        locale === loc.code
                          ? 'bg-[--color-cream] text-[--color-primary] font-medium'
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
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setIsBookingOpen((v) => !v)}
              className={`p-1.5 rounded-full border transition-all duration-500 ${
                isScrolled
                  ? 'border-[--color-primary]/30 text-[--color-primary] hover:bg-[--color-primary] hover:text-white'
                  : 'border-white/40 text-white/90 hover:bg-white/10'
              }`}
            >
              <Calendar size={14} />
            </button>

            {/* Mobile Lang */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className={`transition-colors duration-500 ${isScrolled ? 'text-[--color-primary]' : 'text-white'}`}
              >
                <Globe size={16} />
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-2 bg-white rounded-sm shadow-lg overflow-hidden min-w-[130px] border border-[--color-warm-gray]">
                  {LOCALES.map((loc) => (
                    <button
                      key={loc.code}
                      onClick={() => switchLocale(loc.code)}
                      className={`block w-full text-left px-4 py-2.5 text-xs font-sans ${
                        locale === loc.code
                          ? 'bg-[--color-cream] text-[--color-primary] font-medium'
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
                className={`block w-5 h-px transition-all duration-500 ${
                  isScrolled ? 'bg-[--color-primary]' : 'bg-white'
                } ${isMenuOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`}
              />
              <span
                className={`block w-5 h-px transition-all duration-500 ${
                  isScrolled ? 'bg-[--color-primary]' : 'bg-white'
                } ${isMenuOpen ? 'opacity-0' : ''}`}
              />
              <span
                className={`block w-5 h-px transition-all duration-500 ${
                  isScrolled ? 'bg-[--color-primary]' : 'bg-white'
                } ${isMenuOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Full-screen Menu */}
        <div
          className={`md:hidden fixed inset-0 transition-all duration-700 z-[-1] ${
            isMenuOpen
              ? 'bg-white pointer-events-auto opacity-100'
              : 'pointer-events-none opacity-0'
          }`}
          style={{ top: isScrolled ? '60px' : '72px' }}
        >
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="font-serif text-2xl text-[--color-primary] tracking-[0.1em] hover:text-[--color-primary]/70 transition-colors"
              >
                {t(item.key)}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Booking Bar — 紧贴 nav 下方固定 */}
      <BookingBar
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        isScrolled={isScrolled}
      />
    </>
  );
}
