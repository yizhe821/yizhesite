"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ChevronDown,
  FolderOpen,
  LayoutList,
} from "lucide-react";
import type { DocGroup, DocGroupTree } from "@/lib/docs";

export function DocsSidebar({
  activeGroup,
  activeSlug,
  groupTree,
}: {
  activeGroup?: DocGroup;
  activeSlug?: string;
  groupTree: DocGroupTree[];
}) {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() =>
    activeGroup ? { [activeGroup]: true } : {},
  );

  function toggleGroup(group: DocGroup) {
    setOpenGroups((current) => ({
      ...current,
      [group]: !current[group],
    }));
  }

  return (
    <aside className="min-w-0 lg:sticky lg:top-[88px] lg:max-h-[calc(100vh-112px)] lg:overflow-y-auto">
      <div className="rounded-xl border border-gray-200 bg-white/95 p-4 shadow-sm backdrop-blur">
        <Link
          className="mb-4 inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-blue-700"
          href="/"
        >
          <ArrowLeft className="size-4" />
          返回首页
        </Link>

        <Link
          className={`mb-4 flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm transition-all duration-200 ${
            activeSlug
              ? "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
              : "bg-blue-50 font-semibold text-blue-700 ring-1 ring-blue-100"
          }`}
          href="/docs"
        >
          <LayoutList className="size-4" />
          文档首页
        </Link>

        <nav className="space-y-3" aria-label="文档目录">
          {groupTree.map((section) => {
            const isOpen = Boolean(openGroups[section.group]);

            return (
              <section key={section.group}>
                <button
                  aria-expanded={isOpen}
                  className="mb-1 flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-left text-xs font-semibold uppercase text-slate-400 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-600"
                  onClick={() => toggleGroup(section.group)}
                  type="button"
                >
                  <span className="flex items-center gap-2">
                    <FolderOpen className="size-3.5" />
                    {section.group}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    {section.docs.length}
                    <ChevronDown
                      className={`size-3.5 transition-transform duration-300 ease-out ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </span>
                </button>

                <div
                  aria-hidden={!isOpen}
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div className="space-y-1 pb-2">
                      {section.docs.map((doc) => {
                        const isActive = doc.slug === activeSlug;

                        return (
                          <Link
                            className={`block rounded-lg px-3 py-2.5 text-sm transition-all duration-200 ${
                              isActive
                                ? "bg-blue-50 font-semibold text-blue-700 ring-1 ring-blue-100"
                                : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                            }`}
                            href={`/docs/${doc.slug}`}
                            key={doc.slug}
                            tabIndex={isOpen ? undefined : -1}
                          >
                            <span className="line-clamp-2">{doc.title}</span>
                            <time
                              className="mt-1 block text-xs font-normal text-slate-400"
                              dateTime={doc.date}
                            >
                              {formatDate(doc.date)}
                            </time>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </nav>
      </div>
    </aside>
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
