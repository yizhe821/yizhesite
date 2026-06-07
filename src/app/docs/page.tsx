import type { Metadata } from "next";
import { DocsShell } from "@/components/docs-shell";
import { SiteHeader } from "@/components/site-header";
import { getDocGroupTree } from "@/lib/docs";

export const metadata: Metadata = {
  title: "AI 文档 | 一者",
  description: "一者 AI 文档中心，包含 AI教程、提示词、Skills 与 Codex 文档。",
};

export default function DocsPage() {
  return (
    <>
      <SiteHeader activeHref="/docs" />
      <DocsShell groupTree={getDocGroupTree()} />
    </>
  );
}
