import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export type ChartType = "line" | "bar" | "area" | "pie" | "scatter" | "radar";

export type MarkdownDataPoint = {
  label?: string;
  value?: number;
  x?: number;
  y?: number;
};

export type MarkdownMeta = {
  title: string;
  date: string; // ISO string
  summary?: string;
  tags?: string[];
  chartType?: ChartType;
  dataset?: MarkdownDataPoint[];
};

export type MarkdownItem = {
  slug: string;
  meta: MarkdownMeta;
  contentHtml: string;
};

const root = process.cwd();

function getDir(type: "blog" | "projects") {
  return path.join(root, "content", type);
}

function getAllSlugs(type: "blog" | "projects") {
  const dir = getDir(type);
  if (!fs.existsSync(dir)) return [] as string[];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getAllBlogSlugs() {
  return getAllSlugs("blog");
}

export function getAllProjectSlugs() {
  return getAllSlugs("projects");
}

async function parseMarkdownFile(filePath: string): Promise<{ meta: MarkdownMeta; contentHtml: string }> {
  const file = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(file);
  const processed = await remark().use(html).process(content);
  const contentHtml = processed.toString();
  const meta: MarkdownMeta = {
    title: String(data.title || "Untitled"),
    date: String(data.date || new Date().toISOString()),
    summary: data.summary ? String(data.summary) : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
  };
  if (typeof data.chartType === "string") {
    const ct = data.chartType.toLowerCase();
    if (["line", "bar", "area", "pie", "scatter", "radar"].includes(ct)) {
      meta.chartType = ct as typeof meta.chartType;
    }
  }
  if (Array.isArray(data.dataset)) {
    const ds = (data.dataset as unknown[])
      .map((d) => {
        const obj = d as Record<string, unknown>;
        const point: MarkdownDataPoint = {};
        if (obj.label !== undefined) point.label = String(obj.label);
        const v = Number(obj.value ?? NaN);
        if (Number.isFinite(v)) point.value = v;
        const x = Number(obj.x ?? NaN);
        if (Number.isFinite(x)) point.x = x;
        const y = Number(obj.y ?? NaN);
        if (Number.isFinite(y)) point.y = y;
        return point;
      })
      .filter((d) => (typeof d.value === "number" && Number.isFinite(d.value)) || (typeof d.x === "number" && typeof d.y === "number" && Number.isFinite(d.x) && Number.isFinite(d.y)));
    if (ds.length > 0) meta.dataset = ds;
  }
  return { meta, contentHtml };
}

async function getItemBySlug(type: "blog" | "projects", slug: string): Promise<MarkdownItem | null> {
  const filePath = path.join(getDir(type), `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const { meta, contentHtml } = await parseMarkdownFile(filePath);
  return { slug, meta, contentHtml };
}

export async function getBlogPostBySlug(slug: string) {
  return getItemBySlug("blog", slug);
}

export async function getProjectBySlug(slug: string) {
  return getItemBySlug("projects", slug);
}

export async function getAllBlogPosts(): Promise<Omit<MarkdownItem, "contentHtml">[]> {
  const slugs = getAllBlogSlugs();
  const items = await Promise.all(slugs.map((s) => getBlogPostBySlug(s)));
  return (items.filter(Boolean) as MarkdownItem[])
    .sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1))
    .map(({ slug, meta }) => ({ slug, meta }));
}

export async function getAllProjects(): Promise<Omit<MarkdownItem, "contentHtml">[]> {
  const slugs = getAllProjectSlugs();
  const items = await Promise.all(slugs.map((s) => getProjectBySlug(s)));
  return (items.filter(Boolean) as MarkdownItem[])
    .sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1))
    .map(({ slug, meta }) => ({ slug, meta }));
}

