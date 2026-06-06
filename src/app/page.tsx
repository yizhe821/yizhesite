import {
  ArrowUpRight,
  BookOpenText,
  ChevronRight,
  Clock3,
  Flame,
  LayoutGrid,
} from "lucide-react";
import { SearchPanel } from "@/components/search-panel";
import {
  coreEntries,
  hotAiTools,
  latestDocs,
  navItems,
  quickLinks,
  utilityTools,
} from "@/lib/home-data";

const toneClasses: Record<string, string> = {
  blue: "bg-blue-50 text-blue-700 ring-blue-100",
  emerald: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  violet: "bg-violet-50 text-violet-700 ring-violet-100",
  amber: "bg-amber-50 text-amber-700 ring-amber-100",
};

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-950">
      <AmbientBackground />

      <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/95 backdrop-blur">
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

      <section className="relative z-10 px-4 py-8 md:px-6 md:py-10 lg:px-8 lg:py-12">
        <div className="mx-auto max-w-4xl">
          <SearchPanel />
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {quickLinks.map((link) => (
              <a
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-slate-600 shadow-sm transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                href="#navigation"
                key={link}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-4 pb-12 md:px-6 md:pb-16 lg:px-8 lg:pb-20">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_1.3fr_1fr]">
          <section className="min-w-0" id="docs">
            <SectionHeading
              icon={<BookOpenText className="size-5" />}
              label="最新文档"
              title="内容沉淀"
            />
            <div className="mt-4 grid gap-3">
              {latestDocs.map((doc) => (
                <article
                  className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:border-blue-200 hover:shadow-md"
                  key={doc.title}
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                      {doc.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                      <Clock3 className="size-3.5" />
                      {doc.date}
                    </span>
                  </div>
                  <h2 className="text-base font-semibold tracking-tight text-slate-950">
                    {doc.title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{doc.summary}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="min-w-0" id="navigation">
            <SectionHeading
              icon={<LayoutGrid className="size-5" />}
              label="核心入口"
              title="板块导航"
            />
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {coreEntries.map((entry) => {
                const Icon = entry.icon;

                return (
                  <a
                    className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:border-blue-200 hover:shadow-md"
                    href={entry.href}
                    key={entry.title}
                  >
                    <span
                      className={`inline-flex size-11 items-center justify-center rounded-lg ring-1 ${toneClasses[entry.tone]}`}
                    >
                      <Icon className="size-5" />
                    </span>
                    <span className="mt-5 flex items-center justify-between gap-3">
                      <strong className="text-lg font-semibold tracking-tight text-slate-950">
                        {entry.title}
                      </strong>
                      <ChevronRight className="size-5 text-slate-300" />
                    </span>
                    <span className="mt-2 block text-sm leading-6 text-slate-500">
                      {entry.description}
                    </span>
                  </a>
                );
              })}
            </div>

            <div className="mt-6" id="tools">
              <SectionHeading
                icon={<Flame className="size-5" />}
                label="在线工具"
                title="第一批轻量工具"
              />
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {utilityTools.map((tool) => {
                  const Icon = tool.icon;

                  return (
                    <a
                      className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:border-blue-200 hover:shadow-md"
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

          <section className="min-w-0" id="ai-tools">
            <SectionHeading
              icon={<Flame className="size-5" />}
              label="热门 AI 工具"
              title="商业化入口"
            />
            <div className="mt-4 grid gap-3">
              {hotAiTools.map((tool) => {
                const Icon = tool.icon;

                return (
                  <article
                    className="rounded-xl border border-blue-100 bg-white p-5 shadow-sm transition-all duration-200 hover:border-blue-200 hover:shadow-md"
                    key={tool.title}
                  >
                    <div className="mb-4 flex items-center justify-between gap-4">
                      <span className="flex size-11 items-center justify-center rounded-lg bg-blue-50 text-blue-700 ring-1 ring-blue-100">
                        <Icon className="size-5" />
                      </span>
                      <span className="rounded-lg bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                        {tool.status}
                      </span>
                    </div>
                    <h2 className="text-base font-semibold tracking-tight text-slate-950">
                      {tool.title}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-500">{tool.description}</p>
                    <button className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 active:scale-95">
                      查看规划
                      <ArrowUpRight className="size-4" />
                    </button>
                  </article>
                );
              })}
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

function SectionHeading({
  icon,
  label,
  title,
}: {
  icon: React.ReactNode;
  label: string;
  title: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-2 text-sm font-medium text-blue-700">
          {icon}
          {label}
        </div>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">
          {title}
        </h2>
      </div>
    </div>
  );
}
