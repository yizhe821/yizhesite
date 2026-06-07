import Link from "next/link";
import { navItems } from "@/lib/home-data";

export function SiteHeader({ activeHref = "" }: { activeHref?: string }) {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 md:px-6 lg:px-8">
        <Link className="flex items-center gap-3" href="/">
          <span className="flex size-10 items-center justify-center rounded-lg bg-blue-600 text-base font-semibold text-white shadow-sm">
            一
          </span>
          <span>
            <span className="block text-base font-semibold tracking-tight text-slate-950">
              一者
            </span>
            <span className="block text-xs text-slate-500">AI 工具与知识入口</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="主导航">
          {navItems.map((item) => {
            const isActive = item.href === activeHref;

            return (
              <Link
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-slate-100 hover:text-slate-950 ${
                  isActive ? "bg-blue-50 text-blue-700" : "text-slate-600"
                }`}
                href={item.href}
                key={item.label}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
