import type { Metadata } from 'next';

import '../globals.css';

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import SmoothScrolling from '@/components/SmoothScrolling';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }
  
  const messages = await getMessages();

  const m = messages as Record<string, Record<string, string>>;
  return {
    title: m.LocaleLayout?.title ?? 'Meili Resort Semporna',
    description: m.LocaleLayout?.description ?? 'Meili Resort Semporna',
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }
  
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        {/* 霞鹜文楷 SC 中文字体 - SIL OFL 免费商用，jsDelivr CDN 按需切片 */}
        <link
          rel="preconnect"
          href="https://cdn.jsdelivr.net"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/lxgw-wenkai-webfont@1.7.0/lxgwwenkaisc.css"
        />
      </head>
      {/* 
        将所有 CSS Variable 预注入 html root 身上 
        默认使用白色主题
      */}
      <body
        className="bg-background text-foreground flex min-h-screen flex-col antialiased"
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SmoothScrolling>
            <Header />
            {children}
            <Footer />
          </SmoothScrolling>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
