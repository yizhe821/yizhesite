"use client";

import Link from "next/link";
import {
  ChangeEvent,
  CompositionEvent,
  FocusEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Search } from "lucide-react";
import type { DocMeta } from "@/lib/docs";

export function DocsHomeSearch({ docs }: { docs: DocMeta[] }) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const keyword = debouncedQuery.trim().toLowerCase();
  const suggestions = useMemo(() => {
    if (!keyword) {
      return [];
    }

    return docs
      .filter((doc) => {
        const haystack = `${doc.group} ${doc.title} ${doc.tags.join(" ")} ${doc.date} ${doc.summary}`.toLowerCase();
        return haystack.includes(keyword);
      })
      .slice(0, 8);
  }, [docs, keyword]);

  const shouldShowSuggestions = isFocused && query.trim().length > 0 && !isComposing;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }

  function handleCompositionEnd(event: CompositionEvent<HTMLInputElement>) {
    setIsComposing(false);
    setQuery(event.currentTarget.value);
  }

  function handleBlur(event: FocusEvent<HTMLDivElement>) {
    const nextTarget = event.relatedTarget;

    if (nextTarget instanceof Node && event.currentTarget.contains(nextTarget)) {
      return;
    }

    setIsFocused(false);
  }

  useEffect(() => {
    if (isComposing) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setDebouncedQuery(query);
    }, 220);

    return () => window.clearTimeout(timeout);
  }, [isComposing, query]);

  return (
    <div className="relative w-full sm:w-[320px]" onBlur={handleBlur}>
      <label>
        <span className="sr-only">搜索文档</span>
        <span className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-slate-400">
          <Search className="size-4" />
        </span>
        <input
          className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-700 shadow-sm outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
          onCompositionEnd={handleCompositionEnd}
          onCompositionStart={() => setIsComposing(true)}
          onFocus={() => setIsFocused(true)}
          placeholder="搜索文档"
          type="search"
          value={query}
        />
      </label>

      {shouldShowSuggestions && (
        <div className="absolute left-0 right-0 top-full z-40 mt-2 overflow-hidden rounded-lg border border-slate-200 bg-white/95 shadow-lg backdrop-blur">
          {suggestions.length > 0 ? (
            <div className="max-h-[360px] divide-y divide-slate-100 overflow-y-auto p-2">
              {suggestions.map((doc) => (
                <Link
                  className="group flex min-h-12 items-center justify-between gap-4 rounded-lg px-2 py-2.5 transition-colors duration-200 hover:bg-blue-50/60"
                  href={`/docs/${doc.slug}`}
                  key={doc.slug}
                >
                  <span className="flex min-w-0 flex-1 items-center gap-2">
                    <span className="shrink-0 text-sm font-medium text-slate-400">
                      [{doc.group}]
                    </span>
                    <span className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap pb-1">
                      <span className="relative inline text-sm font-medium text-slate-500 transition-colors duration-200 after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-blue-600 after:transition-transform after:duration-200 group-hover:text-blue-700 group-hover:after:scale-x-100">
                        {doc.title}
                      </span>
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <p className="px-4 py-3 text-sm text-slate-500">没有匹配的文档。</p>
          )}
        </div>
      )}
    </div>
  );
}
