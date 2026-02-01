import { marked } from "marked";
import { getPage, getAllPages } from "@/lib/markdown";
import { getPrevNext, allPageSlugs } from "@/lib/content";
import Sidebar from "@/components/Sidebar";
import PageNav from "@/components/PageNav";
import MarkdownContent from "@/components/MarkdownContent";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return allPageSlugs
    .filter((s) => s !== "home")
    .map((slug) => ({ slug: [slug] }));
}

export function generateMetadata({ params }: { params: { slug: string[] } }) {
  const slug = params.slug.join("/");
  const page = getPage(slug);
  if (!page) return {};

  return {
    title: `${page.frontmatter.title} | The AI Shift`,
    description: page.frontmatter.description || page.frontmatter.subtitle || "",
  };
}

export default function ContentPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const slug = params.slug.join("/");
  const page = getPage(slug);

  if (!page) notFound();

  const html = marked.parse(page.content) as string;
  const { prev, next } = getPrevNext(slug);

  return (
    <div className="site-wrapper">
      <div className="page-layout">
        <Sidebar />
        <article className="content">
          <div className="page-meta">
            {page.frontmatter.part && (
              <div className="page-part-label">{page.frontmatter.part}</div>
            )}
            {page.frontmatter.rule_number && (
              <div className="rule-number">{page.frontmatter.rule_number}</div>
            )}
            <h1>{page.frontmatter.title}</h1>
            {page.frontmatter.subtitle && (
              <div className="page-subtitle">{page.frontmatter.subtitle}</div>
            )}
          </div>
          <MarkdownContent html={html} />
          <PageNav prev={prev} next={next} />
        </article>
      </div>
    </div>
  );
}
