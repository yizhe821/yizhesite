import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "一者 AI 工具与知识入口",
  description: "聚合 AI 文档、提示词、实用工具、导航资源与结果导向的 AI 工具。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
