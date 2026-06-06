"use client";

import { FormEvent, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { Search } from "lucide-react";
import { searchDocuments } from "@/lib/home-data";

type SearchEngine = "bing" | "site" | "google";

const engines: Array<{ id: SearchEngine; label: string }> = [
  { id: "site", label: "站内" },
  { id: "bing", label: "bing" },
  { id: "google", label: "Google" },
];

export function SearchPanel() {
  const [engine, setEngine] = useState<SearchEngine>("bing");
  const [query, setQuery] = useState("");
  const [siteQuery, setSiteQuery] = useState("");
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);
  const hasPositionedArrowRef = useRef(false);
  const engineRefs = useRef<Record<SearchEngine, HTMLButtonElement | null>>({
    bing: null,
    site: null,
    google: null,
  });

  const siteResults = useMemo(() => {
    const keyword = siteQuery.trim().toLowerCase();

    if (!keyword) {
      return searchDocuments.slice(0, 4);
    }

    return searchDocuments
      .filter((item) => {
        const haystack = `${item.title} ${item.description} ${item.type}`.toLowerCase();
        return haystack.includes(keyword);
      })
      .slice(0, 5);
  }, [siteQuery]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const keyword = query.trim();

    if (!keyword) {
      return;
    }

    if (engine === "site") {
      setSiteQuery(keyword);
      return;
    }

    const target =
      engine === "bing"
        ? `https://www.bing.com/search?q=${encodeURIComponent(keyword)}`
      : `https://www.google.com/search?q=${encodeURIComponent(keyword)}`;

    window.open(target, "_blank", "noopener,noreferrer");
  }

  useLayoutEffect(() => {
    function moveArrow(animate = true) {
      const searchBox = searchBoxRef.current;
      const arrow = arrowRef.current;
      const activeEngine = engineRefs.current[engine];

      if (!searchBox || !arrow || !activeEngine) {
        return;
      }

      const searchBoxRect = searchBox.getBoundingClientRect();
      const engineRect = activeEngine.getBoundingClientRect();
      const arrowX =
        engineRect.left + engineRect.width / 2 - searchBoxRect.left - arrow.offsetWidth / 2;

      if (!hasPositionedArrowRef.current || !animate) {
        gsap.set(arrow, { autoAlpha: 1, x: arrowX });
        hasPositionedArrowRef.current = true;
        return;
      }

      gsap.to(arrow, {
        x: arrowX,
        duration: 0.34,
        ease: "power3.out",
      });
    }

    moveArrow();
    const handleResize = () => moveArrow(false);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [engine]);

  return (
    <section>
      <div className="mb-3 flex items-center justify-center gap-8 md:gap-10">
        {engines.map((item) => {
          const isActive = item.id === engine;

          return (
            <button
              aria-pressed={isActive}
              className={`rounded-lg px-2 py-1 text-sm font-medium transition-all duration-200 hover:text-blue-700 active:scale-95 md:text-base ${
                isActive ? "text-blue-700" : "text-slate-500"
              }`}
              key={item.id}
              onClick={() => setEngine(item.id)}
              ref={(node) => {
                engineRefs.current[item.id] = node;
              }}
              type="button"
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="relative" ref={searchBoxRef}>
        <span
          aria-hidden="true"
          className="pointer-events-none invisible absolute -top-[10px] left-0 z-10 h-0 w-0 border-x-[10px] border-b-[10px] border-x-transparent border-b-blue-600"
          ref={arrowRef}
        />

        <form className="relative" onSubmit={handleSubmit}>
          <label>
            <span className="sr-only">搜索关键词</span>
            <input
              className="w-full rounded-xl border border-gray-300 bg-white py-4 pl-5 pr-16 text-base text-slate-900 shadow-sm outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="搜索 AI 教程、提示词、工具，或使用外部搜索"
              type="search"
              value={query}
            />
          </label>
          <button
            aria-label="搜索"
            className="absolute right-2 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md active:scale-95"
            type="submit"
          >
            <Search className="size-5" />
          </button>
        </form>
      </div>

      {engine === "site" && (
        <div className="mt-5 rounded-lg border border-blue-100 bg-blue-50 p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-blue-950">
              {siteQuery ? `站内结果：${siteQuery}` : "站内推荐"}
            </p>
            <span className="text-xs text-blue-700">静态数据</span>
          </div>
          <div className="grid gap-3">
            {siteResults.length > 0 ? (
              siteResults.map((item) => (
                <a
                  className="rounded-lg border border-blue-100 bg-white p-3 transition-all duration-200 hover:border-blue-200 hover:shadow-sm"
                  href="#"
                  key={`${item.type}-${item.title}`}
                >
                  <span className="text-xs font-medium text-blue-700">{item.type}</span>
                  <strong className="mt-1 block text-sm font-semibold text-slate-950">
                    {item.title}
                  </strong>
                  <span className="mt-1 block text-sm text-slate-500">{item.description}</span>
                </a>
              ))
            ) : (
              <p className="text-sm text-slate-600">暂时没有匹配结果。</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
