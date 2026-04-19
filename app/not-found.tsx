import type { Metadata } from 'next';
import Link from 'next/link';

import './globals.css';

export const metadata: Metadata = {
  title: 'Page Not Found | Meili Resort Semporna',
};

export default function NotFound() {
  return (
    <html lang="en">
      <body
        className="bg-background text-foreground flex min-h-screen flex-col antialiased"
      >
        <div className="flex flex-col items-center justify-center flex-grow pt-48 pb-32 px-4 text-center min-h-[70vh] mt-20">
          <h1 className="text-8xl md:text-9xl font-serif text-primary mb-4 tracking-widest">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-serif text-primary/80 mb-6">
            Page Not Found
          </h2>
          <p className="max-w-md text-muted-foreground font-sans mb-10 leading-relaxed">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Link
            href="/"
            className="px-8 py-3 bg-primary text-primary-foreground text-sm tracking-widest uppercase transition-colors hover:bg-primary/90 font-sans"
          >
            RETURN HOME
          </Link>
        </div>
      </body>
    </html>
  );
}
