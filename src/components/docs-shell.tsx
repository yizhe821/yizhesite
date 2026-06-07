import Link from "next/link";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  BookOpenText,
  CalendarDays,
  FileText,
  FolderOpen,
  Tags,
} from "lucide-react";
import { DocsHomeSearch } from "@/components/docs-home-search";
import { DocsSidebar } from "@/components/docs-sidebar";
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
  activeDoc?: DocArticle;
  groupTree: DocGroupTree[];
}) {
  const totalDocs = groupTree.reduce((count, item) => count + item.docs.length, 0);

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-950">
      <AmbientBackground />

      <section className="relative z-10 px-4 py-6 md:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[288px_minmax(0,1fr)]">
          <DocsSidebar
            activeGroup={activeDoc?.group}
            activeSlug={activeDoc?.slug}
            groupTree={groupTree}
            key={activeDoc?.slug ?? "docs-home"}
          />

          {activeDoc ? (
            <DocArticle activeDoc={activeDoc} />
          ) : (
            <DocsHome groupTree={groupTree} totalDocs={totalDocs} />
          )}
        </div>
      </section>
    </main>
  );
}

function DocsHome({
  groupTree,
  totalDocs,
}: {
  groupTree: DocGroupTree[];
  totalDocs: number;
}) {
  const docs = groupTree
    .flatMap((section) => section.docs)
    .sort((left, right) => right.date.localeCompare(left.date) || left.order - right.order);

  return (
    <article className="min-w-0 rounded-xl border border-gray-200 bg-white/95 p-5 shadow-sm backdrop-blur md:p-8 lg:p-10">
      <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-2.5 py-1 font-medium text-blue-700 ring-1 ring-blue-100">
          <BookOpenText className="size-4" />
          AI 文档
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1 text-slate-500">
          <FileText className="size-4" />
          {totalDocs} 篇
        </span>
      </div>

      <header className="mt-5 flex flex-col gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
          AI 文档
        </h1>
        <DocsHomeSearch docs={docs} />
      </header>

      <div className="mt-6 divide-y divide-slate-100">
        {docs.map((doc) => (
          <Link
            className="group flex min-h-12 items-center justify-between gap-4 py-3"
            href={`/docs/${doc.slug}`}
            key={doc.slug}
          >
            <span className="flex min-w-0 items-center gap-2">
              <span className="shrink-0 text-sm font-medium text-slate-400">
                [{doc.group}]
              </span>
              <span className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap pb-1">
                <span className="relative inline text-sm font-medium text-slate-500 transition-colors duration-200 after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-blue-600 after:transition-transform after:duration-200 group-hover:text-blue-700 group-hover:after:scale-x-100">
                  {doc.title}
                </span>
              </span>
            </span>
            <span className="ml-auto flex shrink-0 items-center gap-2">
              {doc.tags.slice(0, 3).map((tag) => (
                <span
                  className="rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 ring-1 ring-emerald-100"
                  key={tag}
                >
                  {tag}
                </span>
              ))}
              <time className="text-xs text-slate-400" dateTime={doc.date}>
                {formatDate(doc.date)}
              </time>
            </span>
          </Link>
        ))}
      </div>
    </article>
  );
}

function DocArticle({ activeDoc }: { activeDoc: DocArticle }) {
  return (
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
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
          {activeDoc.title}
        </h1>
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
