"use client";

import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import Link from "next/link";
import Sidebar from "./Sidebar";

interface RuleCard {
  slug: string;
  part: string;
  rule_number: number;
  short_title: string;
  title: string;
  subtitle: string;
}

interface HomeContentProps {
  query: string;
  variables: any;
  data: any;
  rules: RuleCard[];
  executive: { slug: string; title: string; subtitle: string } | null;
  appendices: { slug: string; title: string; subtitle: string }[];
}

export default function HomeContent({
  query,
  variables,
  data: initialData,
  rules,
  executive,
  appendices,
}: HomeContentProps) {
  const { data } = useTina({ query, variables, data: initialData });
  const page = data.page;

  return (
    <div className="site-wrapper">
      <div className="home-hero">
        <h1>{page.title}</h1>
        <div className="subtitle">
          {page.subtitle || "8 Rules for Leading the Change That's Already Here"}
        </div>
      </div>
      <div className="page-layout">
        <Sidebar />
        <div className="content home-content">
          <TinaMarkdown content={page.body} />

          <h2>The 8 Rules</h2>
          <div className="section-grid">
            {rules.map((rule) => (
              <Link
                key={rule.slug}
                href={`/${rule.slug}`}
                className="section-card"
              >
                <div className="card-part">{rule.part}</div>
                <h3>
                  Rule {rule.rule_number}:{" "}
                  {rule.short_title || rule.title}
                </h3>
                <p>{rule.subtitle}</p>
              </Link>
            ))}
          </div>

          {executive && (
            <>
              <h2>For the Executive Team</h2>
              <div className="section-grid">
                <Link href={`/${executive.slug}`} className="section-card">
                  <div className="card-part">EXECUTIVE</div>
                  <h3>{executive.title}</h3>
                  <p>{executive.subtitle}</p>
                </Link>
              </div>
            </>
          )}

          <h2>Appendices</h2>
          <div className="section-grid">
            {appendices.map((a) => (
              <Link key={a.slug} href={`/${a.slug}`} className="section-card">
                <div className="card-part">APPENDIX</div>
                <h3>{a.title}</h3>
                <p>{a.subtitle}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
