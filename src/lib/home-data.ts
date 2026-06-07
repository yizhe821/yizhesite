import {
  Bot,
  Boxes,
  FileText,
  Image,
  Lightbulb,
  ListChecks,
  PenLine,
  Search,
} from "lucide-react";

export const navItems = [
  { label: "AI生成", href: "#ai-generation" },
  { label: "AI文档", href: "#docs" },
  { label: "在线工具", href: "#tools" },
  { label: "一站式导航", href: "#navigation" },
];

export const quickLinks = [
  { label: "AI生成", href: "#ai-generation" },
  { label: "AI文档", href: "#docs" },
  { label: "在线工具", href: "#tools" },
  { label: "一站式导航", href: "#navigation" },
];

export const latestDocs = [
  {
    title: "AI Skills 是什么，如何用于日常工作流",
    category: "AI Skills",
    summary: "用任务、输入、输出和验收标准组织 AI 能力，减少重复提示词。",
    date: "今天",
  },
  {
    title: "新手如何搭建自己的提示词素材库",
    category: "AI 提示词",
    summary: "从场景、角色、约束、示例四个层级整理可复用提示词。",
    date: "昨天",
  },
  {
    title: "内容创作者常用的 AI 写作检查清单",
    category: "AI 教程",
    summary: "把选题、标题、结构、语气和事实核查拆成稳定流程。",
    date: "本周",
  },
  {
    title: "在线工具板块第一批工具规划",
    category: "工具规划",
    summary: "优先做浏览器本地运行的小工具，避免过早增加服务器压力。",
    date: "本周",
  },
];

export const aiGenerationTools = [
  {
    title: "爆款文案生成",
    description: "输入产品、平台、受众和语气，生成多版可测试文案。",
    category: "内容营销",
    icon: PenLine,
  },
  {
    title: "视频脚本生成",
    description: "按主题、时长、镜头节奏输出短视频脚本草案。",
    category: "短视频",
    icon: FileText,
  },
  {
    title: "电商主图方案",
    description: "围绕商品、尺寸、卖点和风格生成主图创意方案。",
    category: "电商设计",
    icon: Image,
  },
  {
    title: "卖点提炼助手",
    description: "从商品参数和用户痛点中提炼可落地的销售卖点。",
    category: "销售转化",
    icon: Bot,
  },
  {
    title: "标题变体生成",
    description: "根据平台和受众生成多组可 A/B 测试的标题方向。",
    category: "增长测试",
    icon: PenLine,
  },
];

export const siteNavigationLinks = [
  {
    title: "OpenAI",
    description: "AI 模型、API 与产品文档",
    href: "https://openai.com/",
    label: "AI",
  },
  {
    title: "GitHub",
    description: "代码托管与开源项目",
    href: "https://github.com/",
    label: "代码",
  },
  {
    title: "Hugging Face",
    description: "模型、数据集与 AI 应用",
    href: "https://huggingface.co/",
    label: "模型",
  },
  {
    title: "MDN",
    description: "Web 标准和前端文档",
    href: "https://developer.mozilla.org/",
    label: "文档",
  },
  {
    title: "Vercel",
    description: "前端部署与 Next.js 生态",
    href: "https://vercel.com/",
    label: "部署",
  },
  {
    title: "Next.js",
    description: "React 全栈框架文档",
    href: "https://nextjs.org/",
    label: "框架",
  },
  {
    title: "Tailwind CSS",
    description: "实用优先 CSS 框架",
    href: "https://tailwindcss.com/",
    label: "样式",
  },
  {
    title: "Product Hunt",
    description: "新产品与工具发现",
    href: "https://www.producthunt.com/",
    label: "灵感",
  },
];

export const utilityTools = [
  { name: "JSON 格式化", tag: "浏览器本地", icon: ListChecks },
  { name: "时间戳转换", tag: "高频工具", icon: Search },
  { name: "提示词检查", tag: "AI 工作流", icon: Lightbulb },
  { name: "资源清单整理", tag: "导航辅助", icon: Boxes },
];

export const searchDocuments = [
  ...latestDocs.map((item) => ({
    title: item.title,
    description: item.summary,
    type: item.category,
  })),
  ...quickLinks.map((item) => ({
    title: item.label,
    description: "首页核心入口",
    type: "核心入口",
  })),
  ...aiGenerationTools.map((item) => ({
    title: item.title,
    description: item.description,
    type: "AI生成",
  })),
  ...utilityTools.map((item) => ({
    title: item.name,
    description: item.tag,
    type: "在线工具",
  })),
  ...siteNavigationLinks.map((item) => ({
    title: item.title,
    description: item.description,
    type: "一站式导航",
  })),
];
