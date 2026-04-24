'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

export default function OffersContactForm() {
  const t = useTranslations('OffersContactForm');
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: '0px 0px -20% 0px',
    amount: 0.2,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Create a mailto link with the form data as fallback
    const formData = new FormData(e.currentTarget);
    const type = formData.get('type') as string;
    const typeLabel = t(`types.${type}`);
    const name = formData.get('name') as string;
    const pax = formData.get('pax') as string;
    const dates = formData.get('dates') as string;
    const email = formData.get('email') as string;
    const social = formData.get('social') as string;
    const notes = formData.get('notes') as string;

    const subject = encodeURIComponent(`[Website Inquiry] ${typeLabel} - ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\n` +
      `Inquiry Type: ${typeLabel}\n` +
      `No. of Pax: ${pax}\n` +
      `Dates: ${dates || 'Not specified'}\n` +
      `Email: ${email}\n` +
      `Social: ${social}\n\n` +
      `Notes: \n${notes}`
    );

    // Simulate an API call, then fallback to mailto if it's just static
    setTimeout(() => {
      window.location.href = `mailto:amy@meilihotel.com?subject=${subject}&body=${body}`;
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1000);
  };

  return (
    <section id="contact-form" className="bg-background text-primary py-16 sm:py-20 md:py-28 lg:py-36 xl:py-44 px-page relative" ref={sectionRef}>
      <div className="max-w-7xl mx-auto relative z-10">
        
        <motion.div 
          custom={0} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <h2 className="font-serif leading-[1.15] mb-6" style={{ fontSize: 'clamp(1.8rem, 4vw, 4rem)' }}>
            {t('title')}
          </h2>
          <div className="w-12 h-px bg-gold-warm mx-auto" />
        </motion.div>

        {isSuccess ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-cream border border-gold-warm/20 p-12 text-center"
          >
            <p className="font-serif text-gold-warm mb-6" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}>
              {t('successMsg')}
            </p>
            <p className="font-sans text-primary/80 mb-8">
              {t('whatsappAlt')}
            </p>
            <a 
              href="https://wa.me/60112780399" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center min-h-11 border border-primary bg-transparent text-primary px-8 py-3 text-sm font-bold tracking-widest uppercase transition-colors hover:border-primary-light hover:text-primary-light"
            >
              WhatsApp Us
            </a>
          </motion.div>
        ) : (
          <motion.form 
            custom={0.2} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 sm:gap-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="font-sans text-xs tracking-widest uppercase text-primary/60">
                  {t('nameLabel')} *
                </label>
                <input 
                  type="text" id="name" name="name" required
                  className="bg-transparent border-b border-primary/20 py-3 text-primary focus:outline-none focus:border-gold transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2 relative">
                <label htmlFor="type" className="font-sans text-xs tracking-widest uppercase text-primary/60">
                  {t('typeLabel')} *
                </label>
                <select 
                  id="type" name="type" required defaultValue=""
                  className="bg-transparent border-b border-primary/20 py-3 text-primary appearance-none focus:outline-none focus:border-gold transition-colors cursor-pointer"
                >
                  <option value="" disabled className="text-black">-- Select --</option>
                  <option value="group" className="text-black">{t('types.group')}</option>
                  <option value="member" className="text-black">{t('types.member')}</option>
                  <option value="promotional" className="text-black">{t('types.promotional')}</option>
                </select>
                <ChevronDown className="absolute right-0 bottom-4 w-4 h-4 text-primary/50 pointer-events-none" />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="pax" className="font-sans text-xs tracking-widest uppercase text-primary/60">
                  {t('paxLabel')} *
                </label>
                <input 
                  type="number" id="pax" name="pax" required min="1"
                  className="bg-transparent border-b border-primary/20 py-3 text-primary focus:outline-none focus:border-gold transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="dates" className="font-sans text-xs tracking-widest uppercase text-primary/60">
                  {t('dateLabel')}
                </label>
                <input 
                  type="date" id="dates" name="dates" 
                  className="bg-transparent border-b border-primary/20 py-2.5 text-primary focus:outline-none focus:border-gold transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-sans text-xs tracking-widest uppercase text-primary/60">
                  {t('emailLabel')}
                </label>
                <input 
                  type="email" id="email" name="email" 
                  className="bg-transparent border-b border-primary/20 py-3 text-primary focus:outline-none focus:border-gold transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="social" className="font-sans text-xs tracking-widest uppercase text-primary/60">
                  {t('socialLabel')}
                </label>
                <input 
                  type="text" id="social" name="social" 
                  className="bg-transparent border-b border-primary/20 py-3 text-primary focus:outline-none focus:border-gold transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="notes" className="font-sans text-xs tracking-widest uppercase text-primary/60">
                {t('noteLabel')}
              </label>
              <textarea 
                id="notes" name="notes" rows={3}
                className="bg-transparent border-b border-primary/20 py-3 text-primary focus:outline-none focus:border-gold transition-colors resize-none"
              />
            </div>

            <div className="mt-8 text-center flex flex-col items-center">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="inline-flex items-center justify-center min-h-11 border border-primary bg-transparent text-primary px-12 py-4 text-sm font-bold tracking-widest uppercase transition-colors hover:border-primary-light hover:text-primary-light disabled:opacity-70"
              >
                {isSubmitting ? '...' : t('submitBtn')}
              </button>
            </div>
            
            <p className="text-center text-primary/40 text-xs mt-4">
              {t('whatsappAlt')} <a href="https://wa.me/60112780399" className="text-gold-warm hover:underline" target="_blank" rel="noreferrer">WhatsApp</a>
            </p>
          </motion.form>
        )}
      </div>
    </section>
  );
}
