import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Meili Resort — 网站策划文档',
  robots: 'noindex, nofollow',
};

export default function PlanningLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="bg-slate-50 text-slate-800 antialiased">
        {children}
      </body>
    </html>
  );
}
