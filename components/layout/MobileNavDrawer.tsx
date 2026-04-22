'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname, Link } from '@/i18n/routing';
import { useState, useRef, useEffect } from 'react';

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  locales: { code: string; label: string; short: string }[];
}

export function MobileNavDrawer({ isOpen, onClose, locales }: MobileNavDrawerProps) {
  const t = useTranslations('Header');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const switchLocale = (next: string) => {
    router.replace(pathname, { locale: next });
    onClose();
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 z-100 bg-black/40 transition-opacity duration-500 lg:hidden ${
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-101 flex h-full w-[88vw] max-w-100 flex-col bg-white text-black transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Top Utility Bar */}
        <div className="flex items-center justify-between px-6 pt-8 pb-6">
          {/* Left: Login */}
          <button className="flex items-center gap-2 text-xs font-semibold tracking-widest transition-opacity hover:opacity-70">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span className="uppercase">{t('login')}</span>
          </button>

          {/* Right: Lang, Currency, Close */}
          <div className="flex items-center justify-end gap-4">
            <div ref={langRef} className="relative flex items-center pr-2">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex cursor-pointer items-center gap-1.5 text-[11px] font-semibold tracking-wider text-black/80 uppercase transition-opacity hover:opacity-70"
                aria-label="Select language"
              >
                <span>{locales.find((l) => l.code === locale)?.label ?? locale.toUpperCase()}</span>
                {/* Chevron */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={`transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`}
                >
                  <path
                    d="m6 9 6 6 6-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Language Dropdown */}
              <div
                className={`absolute top-full right-0 z-50 mt-3 min-w-35 origin-top-right overflow-hidden rounded-sm border border-black/10 bg-white shadow-xl transition-all duration-200 ${
                  langOpen
                    ? 'pointer-events-auto scale-100 opacity-100'
                    : 'pointer-events-none scale-95 opacity-0'
                }`}
              >
                <div className="py-1">
                  {locales.map((loc) => (
                    <button
                      key={loc.code}
                      onClick={() => {
                        switchLocale(loc.code);
                        setLangOpen(false);
                      }}
                      className={`flex w-full items-center justify-between px-4 py-3 text-left tracking-widest transition-colors duration-150 ${
                        locale === loc.code
                          ? 'bg-black/5 font-semibold text-black'
                          : 'text-black/60 hover:bg-black/5 hover:text-black'
                      }`}
                    >
                      <span className="text-[12px] uppercase">{loc.label}</span>
                      {locale === loc.code && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="shrink-0"
                        >
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="ml-1 cursor-pointer p-1 text-black transition-opacity hover:opacity-70"
              aria-label="Close Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="34"
                height="34"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Cart Area (Hidden for now) */}
        <div className="mb-4 hidden flex-col px-6">
          <div className="group flex w-10 cursor-pointer flex-col items-center justify-center gap-1.5 transition-opacity hover:opacity-70">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="black"
            >
              <path d="M16 6V4a4 4 0 0 0-8 0v2H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-3zM10 4a2 2 0 0 1 4 0v2h-4V4zm8 16H6V8h2v2a1 1 0 0 0 2 0V8h4v2a1 1 0 0 0 2 0V8h2v12z" />
            </svg>
            <span className="text-[11px] font-medium tracking-wide">Cart</span>
          </div>
        </div>

        {/* Divider (Hidden for now alongside Cart) */}
        <div className="hidden px-6">
          <div className="h-px w-full bg-gray-200" />
        </div>

        {/* Main Content Area: Scrollable */}
        <div className="flex flex-1 flex-col items-start overflow-y-auto bg-white px-6 py-8">
          {/* Nav links */}
          <div className="flex w-full flex-col gap-7 pb-8 text-[13px] font-normal tracking-widest text-black">
            <Link
              href="/"
              onClick={onClose}
              className="relative flex cursor-pointer items-center hover:opacity-70"
            >
              {pathname === '/' && (
              <svg className="absolute -left-6.25 h-3.5 w-3" viewBox="0 0 10 14" fill="black">
                <path d="M0 0l10 7-10 7z" />
              </svg>
              )}
              {t('nav1')}
            </Link>
            <Link
              href="/booking"
              onClick={onClose}
              className="relative flex cursor-pointer items-center hover:opacity-70"
            >
              {pathname === '/booking' && (
              <svg className="absolute -left-6.25 h-3.5 w-3" viewBox="0 0 10 14" fill="black">
                <path d="M0 0l10 7-10 7z" />
              </svg>
              )}
              {t('nav2')}
            </Link>
            <Link
              href="/gallery"
              onClick={onClose}
              className="relative flex cursor-pointer items-center hover:opacity-70"
            >
              {pathname === '/gallery' && (
              <svg className="absolute -left-6.25 h-3.5 w-3" viewBox="0 0 10 14" fill="black">
                <path d="M0 0l10 7-10 7z" />
              </svg>
              )}
              {t('nav3')}
            </Link>
            <Link
              href="/location"
              onClick={onClose}
              className="relative flex cursor-pointer items-center hover:opacity-70"
            >
              {pathname === '/location' && (
              <svg className="absolute -left-6.25 h-3.5 w-3" viewBox="0 0 10 14" fill="black">
                <path d="M0 0l10 7-10 7z" />
              </svg>
              )}
              {t('nav4')}
            </Link>
          </div>


        </div>
      </div>
    </>
  );
}
