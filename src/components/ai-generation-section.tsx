import { ArrowUpRight, Sparkles } from "lucide-react";
import { aiGenerationTools } from "@/lib/home-data";

const featuredTools = aiGenerationTools.slice(0, 3);
const toolAccentClasses = ["bg-emerald-400", "bg-amber-400", "bg-cyan-400"];

export function AiGenerationSection() {
  return (
    <div className="py-2">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">
          <span className="inline-flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-lg bg-white text-blue-700 shadow-sm ring-1 ring-blue-100">
              <Sparkles className="size-5" />
            </span>
            <span className="relative inline-block">
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 z-0 h-2 w-full rounded-full bg-amber-300 opacity-70"
              />
              <span className="relative z-10">AI生成</span>
            </span>
          </span>
        </h2>

        <button
          className="cursor-pointer text-sm font-medium text-slate-500 underline-offset-4 transition-colors duration-200 hover:text-blue-700 hover:underline"
          type="button"
        >
          更多
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {featuredTools.map((tool, index) => {
          const Icon = tool.icon;
          const accentClassName = toolAccentClasses[index % toolAccentClasses.length];

          return (
            <article
              className="flex min-h-56 flex-col rounded-xl border border-blue-100 bg-white p-5 shadow-sm transition-all duration-200 hover:border-blue-200 hover:shadow-md"
              key={tool.title}
            >
              <div className="flex items-center justify-between gap-4">
                <span className="flex size-11 items-center justify-center rounded-lg bg-blue-50 text-blue-700 ring-1 ring-blue-100">
                  <Icon className="size-5" />
                </span>
                <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">
                  {tool.category}
                </span>
              </div>

              <h3 className="mt-5 text-lg font-semibold tracking-tight text-slate-950">
                <span className="inline-flex items-center gap-2">
                  <span className={`h-4 w-1 rounded-full ${accentClassName}`} />
                  {tool.title}
                </span>
              </h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-slate-500">
                {tool.description}
              </p>
              <button className="mt-5 inline-flex cursor-pointer items-center justify-center gap-2 self-end rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-600 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 hover:shadow-sm active:scale-95">
                去使用
                <ArrowUpRight className="size-4" />
              </button>
            </article>
          );
        })}
      </div>
    </div>
  );
}
