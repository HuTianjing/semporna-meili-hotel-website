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

function getAllDocs(): PlanningDoc[] {
  const planningDir = path.join(process.cwd(), 'planning');
  const files = fs
    .readdirSync(planningDir)
    .filter(
      (f) =>
        (f.endsWith('.mdx') || f.endsWith('.md')) &&
        !fs.statSync(path.join(planningDir, f)).isDirectory(),
    );
  return files.sort().map((filename) => {
    const content = fs.readFileSync(path.join(planningDir, filename), 'utf-8');
    const slug = filename.replace(/\.mdx?$/, '');
    return { slug, title: getDocTitle(content, filename), filename };
  });
}

function getSourceMaterialDocs(): PlanningDoc[] {
  const dir = path.join(process.cwd(), 'planning', 'source-materials');
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));
  return files.sort().map((filename) => {
    const content = fs.readFileSync(path.join(dir, filename), 'utf-8');
    const slug = filename.replace(/\.mdx?$/, '');
    return { slug, title: getDocTitle(content, filename), filename };
  });
}

const borderAccents: Record<string, string> = {
  '00': '#6366f1',
  '01': '#0ea5e9',
  '02': '#f59e0b',
  '03': '#10b981',
  '04': '#ec4899',
  '05': '#8b5cf6',
  '06': '#f97316',
  '07': '#64748b',
};

export default function PlanningIndexPage() {
  const docs = getAllDocs();
  const sourceDocs = getSourceMaterialDocs();

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

      {/* Doc Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {docs.map((doc) => {
          const prefix = doc.slug.slice(0, 2);
          const accent = borderAccents[prefix] ?? '#003865';
          return (
            <Link
              key={doc.slug}
              href={`/planning/${encodeURIComponent(doc.slug)}`}
              className="group block bg-white border border-slate-200 rounded-lg p-5 hover:shadow-lg transition-shadow no-underline"
              style={{ borderTop: `4px solid ${accent}` }}
            >
              <div
                className="text-xs font-bold tracking-widest uppercase mb-2"
                style={{ color: accent }}
              >
                {prefix === '00' ? 'OVERVIEW' : `PAGE ${prefix}`}
              </div>
              <div className="text-sm font-semibold text-slate-800 leading-snug">
                {doc.title}
              </div>
              <div className="mt-3 text-xs text-slate-400 font-mono">{doc.filename}</div>
            </Link>
          );
        })}
      </div>

      {/* Source Materials */}
      <section className="mt-14">
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

