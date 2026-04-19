'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown, Minus, Plus, ArrowRight, X, CalendarDays, Users } from 'lucide-react';

interface BookingBarProps {
  isOpen: boolean;
  onClose: () => void;
  isScrolled?: boolean;
}

export function BookingBar({ isOpen, onClose, isScrolled = false }: BookingBarProps) {
  const t = useTranslations('BookingBar');

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const dayNames = ['日', '一', '二', '三', '四', '五', '六'];

  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [guestOpen, setGuestOpen] = useState(false);

  useEffect(() => {
    if (!guestOpen) return;
    const handler = () => setGuestOpen(false);
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [guestOpen]);

  const fmtShort = (d: Date) =>
    `${d.getMonth() + 1}月${d.getDate()}日 周${dayNames[d.getDay()]}`;

  return (
    <div
      className={`fixed left-0 right-0 z-[48] transition-all duration-500 ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}
      style={{ top: isScrolled ? '60px' : '72px' }}
    >
      {/* Full-width frosted glass bar */}
      <div
        className="w-full overflow-hidden"
        style={{
          background: 'rgba(10,30,50,0.35)',
          backdropFilter: 'blur(24px) saturate(1.5)',
          WebkitBackdropFilter: 'blur(24px) saturate(1.5)',
          boxShadow: '0 4px 30px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.08)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-3.5 md:py-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-2.5">
            {/* Check-in */}
            <button className="group flex-1 flex items-center gap-2.5 rounded-lg px-3.5 py-2.5 hover:bg-white/[0.06] transition-all duration-300 cursor-pointer">
              <CalendarDays
                size={15}
                className="text-white/50 group-hover:text-white/80 transition-colors shrink-0"
              />
              <div className="flex flex-col items-start min-w-0">
                <span className="text-[0.55rem] uppercase tracking-[0.2em] text-white/50 leading-none mb-1">
                  {t('checkin')}
                </span>
                <span className="text-[0.82rem] font-sans text-white/95 tracking-wide leading-none">
                  {fmtShort(today)}
                </span>
              </div>
            </button>

            <div className="hidden md:flex items-center justify-center w-5 shrink-0">
              <ArrowRight size={12} className="text-white/30" />
            </div>

            {/* Check-out */}
            <button className="group flex-1 flex items-center gap-2.5 rounded-lg px-3.5 py-2.5 hover:bg-white/[0.06] transition-all duration-300 cursor-pointer">
              <CalendarDays
                size={15}
                className="text-white/50 group-hover:text-white/80 transition-colors shrink-0"
              />
              <div className="flex flex-col items-start min-w-0">
                <span className="text-[0.55rem] uppercase tracking-[0.2em] text-white/50 leading-none mb-1">
                  {t('checkout')}
                </span>
                <span className="text-[0.82rem] font-sans text-white/95 tracking-wide leading-none">
                  {fmtShort(tomorrow)}
                </span>
              </div>
            </button>

            {/* Separator */}
            <div className="hidden md:block w-px h-8 bg-white/[0.15] mx-1 shrink-0" />

            {/* Guests */}
            <div className="flex-1 relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setGuestOpen(!guestOpen);
                }}
                className="group w-full flex items-center gap-2.5 rounded-lg px-3.5 py-2.5 hover:bg-white/[0.06] transition-all duration-300 cursor-pointer"
              >
                <Users
                  size={15}
                  className="text-white/50 group-hover:text-white/80 transition-colors shrink-0"
                />
                <div className="flex flex-col items-start min-w-0 flex-1">
                  <span className="text-[0.55rem] uppercase tracking-[0.2em] text-white/50 leading-none mb-1">
                    {t('guests')}
                  </span>
                  <span className="text-[0.82rem] font-sans text-white/95 tracking-wide leading-none">
                    {rooms}房 · {adults}成人
                    {children > 0 ? ` · ${children}儿童` : ''}
                  </span>
                </div>
                <ChevronDown
                  size={12}
                  className={`text-white/35 transition-transform duration-300 shrink-0 ${guestOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Guest dropdown */}
              {guestOpen && (
                <div
                  className="absolute top-full left-0 right-0 mt-2 rounded-xl shadow-2xl z-10 p-4 space-y-3.5"
                  style={{
                    background: 'rgba(20,40,60,0.92)',
                    backdropFilter: 'blur(24px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {[
                    { label: t('rooms'), value: rooms, set: setRooms, min: 1 },
                    { label: t('adults'), value: adults, set: setAdults, min: 1 },
                    { label: '儿童', value: children, set: setChildren, min: 0 },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <span className="text-[0.7rem] text-white/55 font-sans tracking-wider">
                        {item.label}
                      </span>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => item.set(Math.max(item.min, item.value - 1))}
                          className="w-6 h-6 flex items-center justify-center rounded-full border border-white/15 text-white/40 hover:border-white/30 hover:text-white/70 transition-all"
                        >
                          <Minus size={9} />
                        </button>
                        <span className="text-sm font-sans text-white/90 w-4 text-center tabular-nums">
                          {item.value}
                        </span>
                        <button
                          onClick={() => item.set(item.value + 1)}
                          className="w-6 h-6 flex items-center justify-center rounded-full border border-white/15 text-white/40 hover:border-white/30 hover:text-white/70 transition-all"
                        >
                          <Plus size={9} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* CTA + Close */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                className="font-sans text-[0.7rem] font-semibold tracking-[0.12em] uppercase px-6 py-2.5 rounded-lg transition-all duration-300 whitespace-nowrap"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))',
                  color: '#1a3a5c',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,1)';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                }}
              >
                {t('submit')}
              </button>
              <button
                onClick={onClose}
                className="p-1.5 text-white/30 hover:text-white/70 transition-colors duration-300 rounded-full hover:bg-white/[0.08]"
                title={t('hide')}
              >
                <X size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
