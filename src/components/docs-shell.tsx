import Link from "next/link";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  ArrowLeft,
  BookOpenText,
  CalendarDays,
  FolderOpen,
  Tags,
} from "lucide-react";
import type { DocArticle, DocGroupTree } from "@/lib/docs";

const markdownComponents: Components = {
  h1({ children }) {
    return <h1 className="mt-10 text-3xl font-semibold tracking-tight text-slate-950">{children}</h1>;
  },
  h2({ children }) {
    return <h2 className="mt-9 text-2xl font-semibold tracking-tight text-slate-950">{children}</h2>;
  },
  h3({ children }) {
    return <h3 className="mt-7 text-xl font-semibold tracking-tight text-slate-950">{children}</h3>;
  },
  p({ children }) {
    return <p className="mt-4 text-base leading-8 text-slate-600">{children}</p>;
  },
  ul({ children }) {
    return <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-8 text-slate-600">{children}</ul>;
  },
  ol({ children }) {
    return <ol className="mt-4 list-decimal space-y-2 pl-6 text-base leading-8 text-slate-600">{children}</ol>;
  },
  li({ children }) {
    return <li className="pl-1">{children}</li>;
  },
  a({ children, href }) {
    return (
      <a
        className="font-medium text-blue-700 underline underline-offset-4 transition-colors hover:text-blue-800"
        href={href}
        rel="noreferrer"
        target={href?.startsWith("http") ? "_blank" : undefined}
      >
        {children}
      </a>
    );
  },
  blockquote({ children }) {
    return (
      <blockquote className="mt-5 border-l-4 border-blue-200 bg-blue-50/70 px-4 py-3 text-slate-600">
        {children}
      </blockquote>
    );
  },
  code({ children, className }) {
    const isCodeBlock = className?.startsWith("language-");

    return (
      <code
        className={
          isCodeBlock
            ? `bg-transparent p-0 text-slate-100 ${className}`
            : `rounded-md bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800 ${className ?? ""}`
        }
      >
        {children}
      </code>
    );
  },
  pre({ children }) {
    return (
      <pre className="mt-5 overflow-x-auto rounded-lg border border-slate-200 bg-slate-950 p-4 text-sm leading-7 text-slate-100">
        {children}
      </pre>
    );
  },
  table({ children }) {
    return (
      <div className="mt-5 overflow-x-auto rounded-lg border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 text-sm">{children}</table>
      </div>
    );
  },
  th({ children }) {
    return (
      <th className="bg-slate-50 px-4 py-3 text-left font-semibold text-slate-800">
        {children}
      </th>
    );
  },
  td({ children }) {
    return <td className="border-t border-slate-100 px-4 py-3 text-slate-600">{children}</td>;
  },
};

export function DocsShell({
  activeDoc,
  groupTree,
}: {
  activeDoc: DocArticle;
  groupTree: DocGroupTree[];
}) {
  const totalDocs = groupTree.reduce((count, item) => count + item.docs.length, 0);

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-950">
      <AmbientBackground />

      <section className="relative z-10 px-4 py-6 md:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[288px_minmax(0,1fr)]">
          <aside className="min-w-0 lg:sticky lg:top-[88px] lg:max-h-[calc(100vh-112px)] lg:overflow-y-auto">
            <div className="rounded-xl border border-gray-200 bg-white/95 p-4 shadow-sm backdrop-blur">
              <Link
                className="mb-4 inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-blue-700"
                href="/"
              >
                <ArrowLeft className="size-4" />
                返回首页
              </Link>

              <div className="mb-5 flex items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-blue-50 text-blue-700 ring-1 ring-blue-100">
                    <BookOpenText className="size-5" />
                  </span>
                  <div>
                    <h1 className="text-base font-semibold tracking-tight text-slate-950">
                      文档目录
                    </h1>
                    <p className="text-xs text-slate-500">{totalDocs} 篇静态文档</p>
                  </div>
                </div>
              </div>

              <nav className="space-y-5" aria-label="文档目录">
                {groupTree.map((section) => (
                  <section key={section.group}>
                    <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase text-slate-400">
                      <FolderOpen className="size-3.5" />
                      {section.group}
                    </div>
                    <div className="space-y-1">
                      {section.docs.map((doc) => {
                        const isActive = doc.slug === activeDoc.slug;

                        return (
                          <Link
                            className={`block rounded-lg px-3 py-2.5 text-sm transition-all duration-200 ${
                              isActive
                                ? "bg-blue-50 font-semibold text-blue-700 ring-1 ring-blue-100"
                                : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                            }`}
                            href={`/docs/${doc.slug}`}
                            key={doc.slug}
                          >
                            <span className="line-clamp-2">{doc.title}</span>
                            <time className="mt-1 block text-xs font-normal text-slate-400" dateTime={doc.date}>
                              {formatDate(doc.date)}
                            </time>
                          </Link>
                        );
                      })}
                    </div>
                  </section>
                ))}
              </nav>
            </div>
          </aside>

          <article className="min-w-0 rounded-xl border border-gray-200 bg-white/95 p-5 shadow-sm backdrop-blur md:p-8 lg:p-10">
            <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-2.5 py-1 font-medium text-blue-700 ring-1 ring-blue-100">
                <FolderOpen className="size-4" />
                {activeDoc.group}
              </span>
              <time
                className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1 text-slate-500"
                dateTime={activeDoc.date}
              >
                <CalendarDays className="size-4" />
                {formatDate(activeDoc.date)}
              </time>
            </div>

            <header className="mt-5 border-b border-slate-100 pb-6">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
                {activeDoc.title}
              </h2>
              <p className="mt-3 max-w-3xl text-base leading-7 text-slate-500">
                {activeDoc.summary}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500">
                  <Tags className="size-4" />
                  标签
                </span>
                {activeDoc.tags.map((tag) => (
                  <span
                    className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-100"
                    key={tag}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </header>

            <div className="markdown-body">
              <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]}>
                {activeDoc.content}
              </ReactMarkdown>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}

function AmbientBackground() {
  return (
    <div aria-hidden="true" className="ambient-background">
      <span className="ambient-line ambient-line-1" />
      <span className="ambient-line ambient-line-2" />
      <span className="ambient-line ambient-line-3" />
      <span className="ambient-shape ambient-shape-1" />
      <span className="ambient-shape ambient-shape-2" />
      <span className="ambient-shape ambient-shape-3" />
    </div>
  );
}

function formatDate(date: string) {
  if (!date) {
    return "未设置日期";
  }

  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(`${date}T00:00:00`));
}
