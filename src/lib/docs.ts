import fs from "node:fs";
import path from "node:path";

export const docGroups = ["AI教程", "提示词", "Skills", "Codex"] as const;

export type DocGroup = (typeof docGroups)[number];

export type DocMeta = {
  title: string;
  slug: string;
  group: DocGroup;
  tags: string[];
  date: string;
  summary: string;
  order: number;
};

export type DocArticle = DocMeta & {
  content: string;
};

export type DocGroupTree = {
  group: DocGroup;
  docs: DocMeta[];
};

const docsDirectory = path.join(process.cwd(), "src", "content", "docs");

function stripQuote(value: string) {
  return value.replace(/^["']|["']$/g, "").trim();
}

function parseArrayValue(value: string) {
  if (!value.startsWith("[") || !value.endsWith("]")) {
    return null;
  }

  return value
    .slice(1, -1)
    .split(",")
    .map((item) => stripQuote(item))
    .filter(Boolean);
}

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);

  if (!match) {
    return { fields: new Map<string, string | string[]>(), content: raw };
  }

  const fields = new Map<string, string | string[]>();
  let activeListKey: string | null = null;

  for (const line of match[1].split(/\r?\n/)) {
    const listItem = line.trim().match(/^-\s+(.+)$/);

    if (listItem && activeListKey) {
      const currentValue = fields.get(activeListKey);
      const currentItems = Array.isArray(currentValue) ? currentValue : [];
      fields.set(activeListKey, [...currentItems, stripQuote(listItem[1])]);
      continue;
    }

    const field = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);

    if (!field) {
      activeListKey = null;
      continue;
    }

    const [, key, rawValue] = field;
    const value = rawValue.trim();
    const arrayValue = parseArrayValue(value);

    if (!value) {
      fields.set(key, []);
      activeListKey = key;
      continue;
    }

    fields.set(key, arrayValue ?? stripQuote(value));
    activeListKey = null;
  }

  return { fields, content: match[2].trim() };
}

function readString(fields: Map<string, string | string[]>, key: string, fallback = "") {
  const value = fields.get(key);
  return typeof value === "string" ? value : fallback;
}

function readStringArray(fields: Map<string, string | string[]>, key: string) {
  const value = fields.get(key);

  if (Array.isArray(value)) {
    return value;
  }

  return typeof value === "string" && value ? [value] : [];
}

function isDocGroup(value: string): value is DocGroup {
  return docGroups.includes(value as DocGroup);
}

function toDocMeta(fields: Map<string, string | string[]>, fallbackSlug: string): DocMeta {
  const group = readString(fields, "group");

  return {
    title: readString(fields, "title", fallbackSlug),
    slug: readString(fields, "slug", fallbackSlug),
    group: isDocGroup(group) ? group : "AI教程",
    tags: readStringArray(fields, "tags"),
    date: readString(fields, "date"),
    summary: readString(fields, "summary"),
    order: Number.parseInt(readString(fields, "order", "999"), 10),
  };
}

function stripLeadingTitle(content: string, title: string) {
  const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const titlePattern = new RegExp(`^#\\s+${escapedTitle}\\s*(?:\\r?\\n)+`);

  return content.replace(titlePattern, "").trim();
}

export function getAllDocs(): DocArticle[] {
  return fs
    .readdirSync(docsDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const filePath = path.join(docsDirectory, fileName);
      const raw = fs.readFileSync(filePath, "utf8");
      const { fields, content } = parseFrontmatter(raw);
      const fallbackSlug = fileName.replace(/\.md$/, "");
      const meta = toDocMeta(fields, fallbackSlug);

      return {
        ...meta,
        content: stripLeadingTitle(content, meta.title),
      };
    })
    .sort((left, right) => {
      const groupDiff = docGroups.indexOf(left.group) - docGroups.indexOf(right.group);

      if (groupDiff !== 0) {
        return groupDiff;
      }

      return left.order - right.order || right.date.localeCompare(left.date);
    });
}

export function getAllDocMetas(): DocMeta[] {
  return getAllDocs().map((doc) => ({
    title: doc.title,
    slug: doc.slug,
    group: doc.group,
    tags: doc.tags,
    date: doc.date,
    summary: doc.summary,
    order: doc.order,
  }));
}

export function getDocBySlug(slug: string) {
  return getAllDocs().find((doc) => doc.slug === slug);
}

export function getFirstDoc() {
  return getAllDocs()[0];
}

export function getDocGroupTree(): DocGroupTree[] {
  const docs = getAllDocMetas();

  return docGroups.map((group) => ({
    group,
    docs: docs.filter((doc) => doc.group === group),
  }));
}
