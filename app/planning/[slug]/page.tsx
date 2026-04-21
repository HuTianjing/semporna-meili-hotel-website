import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

function getDocContent(slug: string): string | null {
  const planningDir = path.join(process.cwd(), 'planning');
  const decoded = decodeURIComponent(slug);
  const candidates = [`${decoded}.mdx`, `${decoded}.md`];
  for (const filename of candidates) {
    const filepath = path.join(planningDir, filename);
    if (fs.existsSync(filepath)) {
      return fs.readFileSync(filepath, 'utf-8');
    }
  }
  return null;
}

function getDocTitle(content: string, slug: string): string {
  const match = content.match(/^#\s+(.+)$/m);
  if (match) return match[1].trim();
  return slug;
}

function getAllSlugs(): string[] {
  const planningDir = path.join(process.cwd(), 'planning');
  return fs
    .readdirSync(planningDir)
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
    .map((f) => f.replace(/\.mdx?$/, ''));
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const content = getDocContent(decodedSlug);
  if (!content) return { title: 'Not Found' };
  return {
    title: `${getDocTitle(content, decodedSlug)} — 美丽度假酒店策划`,
    robots: 'noindex, nofollow',
  };
}

export default async function PlanningDocPage({ params }: Props) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const content = getDocContent(decodedSlug);
  if (!content) notFound();

  const title = getDocTitle(content, decodedSlug);
  const allSlugs = getAllSlugs().sort();
  const currentIndex = allSlugs.indexOf(decodedSlug);
  const prevSlug = currentIndex > 0 ? allSlugs[currentIndex - 1] : null;
  const nextSlug = currentIndex < allSlugs.length - 1 ? allSlugs[currentIndex + 1] : null;

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 pb-20">
      {/* Top Nav */}
      <nav className="flex items-center gap-2 mb-8 text-sm text-slate-500">
        <Link href="/planning" className="text-primary font-semibold no-underline hover:underline">
          ← 策划文档
        </Link>
        <span>/</span>
        <span className="text-slate-800 truncate">{title}</span>
      </nav>

      {/* MDX Content */}
      <article className="bg-white rounded-lg border border-slate-200 px-8 py-10 sm:px-12">
        <div className="prose prose-slate prose-base max-w-none
          prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-slate-900
          prose-h1:text-2xl prose-h1:font-bold prose-h1:pb-3 prose-h1:border-b prose-h1:border-slate-200
          prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4
          prose-h3:text-base prose-h3:mt-6
          prose-p:text-slate-700 prose-p:leading-relaxed
          prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-slate-900
          prose-code:text-rose-600 prose-code:bg-rose-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:rounded-lg prose-pre:text-sm [&_pre_code]:text-slate-100 [&_pre_code]:bg-transparent [&_pre_code]:p-0
          prose-blockquote:border-l-4 prose-blockquote:border-blue-400 prose-blockquote:bg-blue-50 prose-blockquote:py-1 prose-blockquote:not-italic prose-blockquote:text-slate-700
          prose-table:text-sm prose-table:w-full
          prose-thead:bg-slate-100 prose-th:text-slate-700 prose-th:font-semibold prose-th:py-2 prose-th:px-3
          prose-td:py-2 prose-td:px-3 prose-td:border prose-td:border-slate-200
          prose-tr:even:bg-slate-50
          prose-li:text-slate-700 prose-li:marker:text-slate-400
          prose-hr:border-slate-200">
          <MDXRemote source={content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
        </div>
      </article>

      {/* Prev / Next */}
      <div className="flex justify-between mt-6 gap-4">
        {prevSlug ? (
          <Link
            href={`/planning/${encodeURIComponent(prevSlug)}`}
            className="inline-block px-4 py-2.5 bg-white border border-slate-200 rounded-md text-sm text-primary font-medium no-underline hover:shadow-sm transition-shadow"
          >
            ← {prevSlug}
          </Link>
        ) : (
          <span />
        )}
        {nextSlug ? (
          <Link
            href={`/planning/${encodeURIComponent(nextSlug)}`}
            className="inline-block px-4 py-2.5 bg-primary rounded-md text-sm text-white font-medium no-underline hover:bg-primary-light transition-colors"
          >
            {nextSlug} →
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
