import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsShell } from "@/components/docs-shell";
import { SiteHeader } from "@/components/site-header";
import { getDocGroupTree, getFirstDoc } from "@/lib/docs";

export const metadata: Metadata = {
  title: "AI 文档 | 一者",
  description: "一者 AI 文档中心，包含 AI教程、提示词、Skills 与 Codex 文档。",
};

export default function DocsPage() {
  const activeDoc = getFirstDoc();

  if (!activeDoc) {
    notFound();
  }

  return (
    <>
      <SiteHeader activeHref="/docs" />
      <DocsShell activeDoc={activeDoc} groupTree={getDocGroupTree()} />
    </>
  );
}
