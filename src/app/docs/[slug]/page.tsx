import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsShell } from "@/components/docs-shell";
import { SiteHeader } from "@/components/site-header";
import { getAllDocMetas, getDocBySlug, getDocGroupTree } from "@/lib/docs";

type DocPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllDocMetas().map((doc) => ({
    slug: doc.slug,
  }));
}

export async function generateMetadata({ params }: DocPageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDocBySlug(slug);

  if (!doc) {
    return {
      title: "文档不存在 | 一者",
    };
  }

  return {
    title: `${doc.title} | 一者 AI 文档`,
    description: doc.summary,
  };
}

export default async function DocArticlePage({ params }: DocPageProps) {
  const { slug } = await params;
  const activeDoc = getDocBySlug(slug);

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
