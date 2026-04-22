import fs from 'fs';
import path from 'path';
import Link from 'next/link';

interface PlanningDoc {
  slug: string;
  title: string;
  filename: string;
}

function getDocTitle(content: string, filename: string): string {
  const match = content.match(/^#\s+(.+)$/m);
  if (match) return match[1].trim();
  return filename.replace(/\.mdx?$/, '');
}

function readDocs(dir: string): PlanningDoc[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => (f.endsWith('.mdx') || f.endsWith('.md')) && !fs.statSync(path.join(dir, f)).isDirectory())
    .sort()
    .map((filename) => {
      const content = fs.readFileSync(path.join(dir, filename), 'utf-8');
      const slug = filename.replace(/\.mdx?$/, '');
      return { slug, title: getDocTitle(content, filename), filename };
    });
}

const PAGE_COLORS = ['#0ea5e9', '#f59e0b', '#10b981', '#ec4899', '#8b5cf6', '#f97316'];

export default function PlanningIndexPage() {
  const metaDocs = readDocs(path.join(process.cwd(), 'planning', 'meta'));
  const pageDocs = readDocs(path.join(process.cwd(), 'planning', 'pages'));
  const sourceDocs = readDocs(path.join(process.cwd(), 'planning', 'source-materials'));

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-12">
        <span className="inline-block bg-primary text-white text-xs font-bold tracking-widest px-3 py-1 rounded mb-4 uppercase">
          Internal · 内部文档
        </span>
        <h1 className="text-4xl font-bold text-slate-900 mb-2">
          美丽度假酒店 · 官网策划文档
        </h1>
        <p className="text-slate-500 text-base">
          Meili Resort Hotel — Website Planning Documents
        </p>
      </div>

      {/* 核心文档 */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-5">
          <h2 className="text-lg font-bold text-slate-800">核心文档</h2>
          <span className="text-xs bg-indigo-100 text-indigo-700 font-semibold px-2 py-0.5 rounded">
            站点中心思想
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {metaDocs.map((doc) => (
            <Link
              key={doc.slug}
              href={`/planning/meta/${encodeURIComponent(doc.slug)}`}
              className="group block bg-indigo-50 border border-indigo-200 rounded-lg p-5 hover:shadow-lg transition-shadow no-underline"
              style={{ borderTop: '4px solid #6366f1' }}
            >
              <div className="text-xs font-bold tracking-widest uppercase mb-2 text-indigo-600">
                CORE
              </div>
              <div className="text-sm font-semibold text-slate-800 leading-snug">
                {doc.title}
              </div>
              <div className="mt-3 text-xs text-slate-400 font-mono">{doc.filename}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* 页面策划 */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-5">
          <h2 className="text-lg font-bold text-slate-800">页面策划</h2>
          <span className="text-xs bg-sky-100 text-sky-700 font-semibold px-2 py-0.5 rounded">
            Page Planning
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pageDocs.map((doc, index) => {
            const accent = PAGE_COLORS[index % PAGE_COLORS.length];
            return (
              <Link
                key={doc.slug}
                href={`/planning/pages/${encodeURIComponent(doc.slug)}`}
                className="group block bg-white border border-slate-200 rounded-lg p-5 hover:shadow-lg transition-shadow no-underline"
                style={{ borderTop: `4px solid ${accent}` }}
              >
                <div
                  className="text-xs font-bold tracking-widest uppercase mb-2"
                  style={{ color: accent }}
                >
                  PAGE
                </div>
                <div className="text-sm font-semibold text-slate-800 leading-snug">
                  {doc.title}
                </div>
                <div className="mt-3 text-xs text-slate-400 font-mono">{doc.filename}</div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 原始素材 */}
      <section>
        <div className="flex items-center gap-3 mb-5">
          <h2 className="text-lg font-bold text-slate-800">原始素材</h2>
          <span className="text-xs bg-amber-100 text-amber-700 font-semibold px-2 py-0.5 rounded">
            Source Materials
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sourceDocs.map((doc) => (
            <Link
              key={doc.slug}
              href={`/planning/source-materials/${encodeURIComponent(doc.slug)}`}
              className="group block bg-amber-50 border border-amber-200 rounded-lg p-5 hover:shadow-lg transition-shadow no-underline"
              style={{ borderTop: '4px solid #d97706' }}
            >
              <div className="text-xs font-bold tracking-widest uppercase mb-2 text-amber-600">
                SOURCE
              </div>
              <div className="text-sm font-semibold text-slate-800 leading-snug">
                {doc.title}
              </div>
              <div className="mt-3 text-xs text-slate-400 font-mono">{doc.filename}</div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="mt-16 pt-6 border-t border-slate-200 text-xs text-slate-400">
        本文档为内部策划资料，仅供团队协作使用。
      </footer>
    </main>
  );
}

