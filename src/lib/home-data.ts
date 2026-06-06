import {
  BookOpenText,
  Bot,
  Boxes,
  Compass,
  FileText,
  Image,
  Lightbulb,
  ListChecks,
  PenLine,
  Search,
  Wrench,
} from "lucide-react";

export const navItems = [
  { label: "文档", href: "#docs" },
  { label: "在线工具", href: "#tools" },
  { label: "导航", href: "#navigation" },
  { label: "AI 工具", href: "#ai-tools" },
];

export const quickLinks = [
  "AI 教程",
  "AI 提示词",
  "AI Skills",
  "效率工具",
  "AI 工具导航",
  "电商素材",
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

export const coreEntries = [
  {
    title: "知识文档",
    description: "沉淀 AI 教程、提示词、AI Skills 和项目实践。",
    href: "#docs",
    icon: BookOpenText,
    tone: "blue",
  },
  {
    title: "在线实用工具",
    description: "聚合格式化、转换、检测、计算等高频小工具。",
    href: "#tools",
    icon: Wrench,
    tone: "emerald",
  },
  {
    title: "一站式导航",
    description: "整理 AI 工具、资源网站、创作平台和工作流入口。",
    href: "#navigation",
    icon: Compass,
    tone: "violet",
  },
  {
    title: "AI 工具",
    description: "通过参数化表单生成文案、脚本、图片方案等结果。",
    href: "#ai-tools",
    icon: Bot,
    tone: "amber",
  },
];

export const hotAiTools = [
  {
    title: "爆款文案生成",
    description: "输入产品、平台、受众和语气，生成多版可测试文案。",
    status: "规划中",
    icon: PenLine,
  },
  {
    title: "视频脚本生成",
    description: "按主题、时长、镜头节奏输出短视频脚本草案。",
    status: "规划中",
    icon: FileText,
  },
  {
    title: "电商主图方案",
    description: "围绕商品、尺寸、卖点和风格生成主图创意方案。",
    status: "规划中",
    icon: Image,
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
  ...coreEntries.map((item) => ({
    title: item.title,
    description: item.description,
    type: "核心入口",
  })),
  ...hotAiTools.map((item) => ({
    title: item.title,
    description: item.description,
    type: "AI 工具",
  })),
  ...utilityTools.map((item) => ({
    title: item.name,
    description: item.tag,
    type: "在线工具",
  })),
];
