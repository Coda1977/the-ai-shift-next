import { marked } from "marked";
import Link from "next/link";
import { getPage, getRulePages, getAppendixPages } from "@/lib/markdown";
import Sidebar from "@/components/Sidebar";
import MarkdownContent from "@/components/MarkdownContent";

export default function HomePage() {
  const page = getPage("home");
  if (!page) return <div>Page not found</div>;

  const html = marked.parse(page.content) as string;
  const rules = getRulePages();
  const executive = getPage("executive");
  const appendices = getAppendixPages();

  return (
    <div className="site-wrapper">
      <div className="home-hero">
        <h1>{page.frontmatter.title}</h1>
        <div className="subtitle">
          {page.frontmatter.subtitle ||
            "8 Rules for Leading the Change That's Already Here"}
        </div>
      </div>
      <div className="page-layout">
        <Sidebar />
        <div className="content home-content">
          <MarkdownContent html={html} />

          <h2>The 8 Rules</h2>
          <div className="section-grid">
            {rules.map((rule) => (
              <Link
                key={rule.slug}
                href={`/${rule.slug}`}
                className="section-card"
              >
                <div className="card-part">
                  {rule.frontmatter.part}
                </div>
                <h3>
                  Rule {rule.frontmatter.rule_number}:{" "}
                  {rule.frontmatter.short_title || rule.frontmatter.title}
                </h3>
                <p>{rule.frontmatter.subtitle}</p>
              </Link>
            ))}
          </div>

          {executive && (
            <>
              <h2>For the Executive Team</h2>
              <div className="section-grid">
                <Link href="/executive" className="section-card">
                  <div className="card-part">EXECUTIVE</div>
                  <h3>{executive.frontmatter.title}</h3>
                  <p>{executive.frontmatter.subtitle}</p>
                </Link>
              </div>
            </>
          )}

          <h2>Appendices</h2>
          <div className="section-grid">
            {appendices.map((a) => (
              <Link
                key={a.slug}
                href={`/${a.slug}`}
                className="section-card"
              >
                <div className="card-part">APPENDIX</div>
                <h3>{a.frontmatter.title}</h3>
                <p>{a.frontmatter.subtitle}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
