import fs from "fs";
import path from "path";
import yaml from "js-yaml";

const contentDir = path.join(process.cwd(), "content");

export interface Frontmatter {
  title: string;
  subtitle?: string;
  description?: string;
  weight?: number;
  part?: string;
  rule_number?: number;
  short_title?: string;
}

export interface ContentPage {
  slug: string;
  frontmatter: Frontmatter;
  content: string;
}

function parseFrontmatter(raw: string): {
  frontmatter: Frontmatter;
  content: string;
} {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    return { frontmatter: { title: "" }, content: raw };
  }

  const frontmatter = (yaml.load(match[1]) as Frontmatter) || { title: "" };
  const content = match[2];

  return { frontmatter, content };
}

export function getPage(slug: string): ContentPage | null {
  const filePath = path.join(contentDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { frontmatter, content } = parseFrontmatter(raw);

  return { slug, frontmatter, content };
}

export function getAllPages(): ContentPage[] {
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".md"));
  return files
    .map((f) => {
      const slug = f.replace(/\.md$/, "");
      return getPage(slug);
    })
    .filter(Boolean) as ContentPage[];
}

export function getRulePages(): ContentPage[] {
  return getAllPages()
    .filter((p) => p.frontmatter.rule_number)
    .sort(
      (a, b) =>
        (a.frontmatter.rule_number || 0) - (b.frontmatter.rule_number || 0)
    );
}

export function getAppendixPages(): ContentPage[] {
  const slugs = ["scorecard", "sprint", "frameworks", "case-studies"];
  return slugs
    .map((s) => getPage(s))
    .filter(Boolean) as ContentPage[];
}
