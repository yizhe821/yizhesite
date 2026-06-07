import {
  ArrowUpRight,
  BookOpenText,
  Compass,
  Flame,
} from "lucide-react";
import { AiGenerationSection } from "@/components/ai-generation-section";
import { SearchPanel } from "@/components/search-panel";
import {
  latestDocs,
  navItems,
  quickLinks,
  siteNavigationLinks,
  utilityTools,
} from "@/lib/home-data";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-950">
      <AmbientBackground />

      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 md:px-6 lg:px-8">
          <a className="flex items-center gap-3" href="#">
            <span className="flex size-10 items-center justify-center rounded-lg bg-blue-600 text-base font-semibold text-white shadow-sm">
              一
            </span>
            <span>
              <span className="block text-base font-semibold tracking-tight text-slate-950">
                一者
              </span>
              <span className="block text-xs text-slate-500">AI 工具与知识入口</span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 md:flex" aria-label="主导航">
            {navItems.map((item) => (
              <a
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-100 hover:text-slate-950"
                href={item.href}
                key={item.label}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <section className="relative z-40 px-4 py-8 md:px-6 md:py-10 lg:px-8 lg:py-12">
        <div className="mx-auto max-w-4xl">
          <SearchPanel />
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {quickLinks.map((link) => (
              <a
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-slate-600 shadow-sm transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                href={link.href}
                key={link.label}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-4 pb-12 md:px-6 md:pb-16 lg:px-8 lg:pb-20">
        <div className="mx-auto grid max-w-7xl gap-8">
          <section id="ai-generation">
            <AiGenerationSection />
          </section>

          <div className="grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)]">
            <section className="min-w-0" id="docs">
              <SectionTitle
                accentClassName="bg-emerald-400"
                icon={<BookOpenText className="size-5" />}
                title="最新文档"
              />
              <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 bg-white/90 shadow-sm backdrop-blur">
                {latestDocs.map((doc) => (
                  <a
                    className="group block cursor-pointer border-b border-gray-100 px-4 py-3.5 transition-colors duration-200 last:border-b-0 hover:bg-blue-50/60"
                    href="#"
                    key={doc.title}
                  >
                    <span className="mb-1.5 inline-flex rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 ring-1 ring-emerald-100">
                      {doc.category}
                    </span>
                    <h3 className="text-sm font-semibold leading-6 text-slate-500 transition-colors duration-200 group-hover:text-blue-700">
                      <span className="relative inline after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-blue-600 after:transition-transform after:duration-200 group-hover:after:scale-x-100">
                        {doc.title}
                      </span>
                    </h3>
                  </a>
                ))}
              </div>
            </section>

            <section className="min-w-0" id="navigation">
              <SectionTitle
                accentClassName="bg-amber-400"
                icon={<Compass className="size-5" />}
                title="一站式导航"
              />
              <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {siteNavigationLinks.map((item) => (
                  <a
                    className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white/90 p-4 shadow-sm backdrop-blur transition-all duration-200 hover:border-blue-200 hover:bg-blue-50/80 hover:shadow-md"
                    href={item.href}
                    key={item.title}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-semibold text-slate-600 transition-all duration-200 group-hover:bg-blue-600 group-hover:text-white">
                      {item.label}
                    </span>
                    <span className="min-w-0">
                      <strong className="block truncate text-sm font-semibold text-slate-950">
                        {item.title}
                      </strong>
                      <span className="mt-0.5 block truncate text-xs text-slate-500">
                        {item.description}
                      </span>
                    </span>
                  </a>
                ))}
              </div>
            </section>
          </div>

          <section id="tools">
            <SectionTitle
              accentClassName="bg-cyan-400"
              icon={<Flame className="size-5" />}
              title="在线工具"
            />
            <div className="mt-4">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {utilityTools.map((tool) => {
                  const Icon = tool.icon;

                  return (
                    <a
                      className="flex min-h-28 items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50/70 hover:shadow-sm"
                      href="#"
                      key={tool.name}
                    >
                      <span className="flex items-center gap-3">
                        <span className="flex size-10 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                          <Icon className="size-5" />
                        </span>
                        <span>
                          <strong className="block text-sm font-semibold text-slate-950">
                            {tool.name}
                          </strong>
                          <span className="text-xs text-slate-500">{tool.tag}</span>
                        </span>
                      </span>
                      <ArrowUpRight className="size-4 text-slate-300" />
                    </a>
                  );
                })}
              </div>
            </div>
          </section>
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

function SectionTitle({
  accentClassName,
  icon,
  title,
}: {
  accentClassName: string;
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2 text-lg font-semibold tracking-tight text-slate-950 md:text-xl">
        <span className="flex size-8 items-center justify-center rounded-lg bg-white text-blue-700 shadow-sm ring-1 ring-gray-200">
          {icon}
        </span>
        <h2 className="relative inline-block">
          <span
            aria-hidden="true"
            className={`absolute bottom-0 left-0 z-0 h-1.5 w-full rounded-full opacity-70 ${accentClassName}`}
          />
          <span className="relative z-10">{title}</span>
        </h2>
      </div>
    </div>
  );
}
