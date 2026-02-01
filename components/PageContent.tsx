"use client";

import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import Sidebar from "./Sidebar";
import PageNav from "./PageNav";
import Worksheet from "./blocks/Worksheet";
import PullQuote from "./blocks/PullQuote";
import StatHighlight from "./blocks/StatHighlight";

const components = {
  Worksheet,
  PullQuote,
  StatHighlight,
};

interface PageContentProps {
  query: string;
  variables: any;
  data: any;
  prev: { title: string; slug: string } | null;
  next: { title: string; slug: string } | null;
}

export default function PageContent({
  query,
  variables,
  data: initialData,
  prev,
  next,
}: PageContentProps) {
  const { data } = useTina({ query, variables, data: initialData });
  const page = data.page;

  return (
    <div className="site-wrapper">
      <div className="page-layout">
        <Sidebar />
        <article className="content">
          <div className="page-meta">
            {page.part && <div className="page-part-label">{page.part}</div>}
            {page.rule_number && (
              <div className="rule-number">{page.rule_number}</div>
            )}
            <h1>{page.title}</h1>
            {page.subtitle && (
              <div className="page-subtitle">{page.subtitle}</div>
            )}
          </div>
          <TinaMarkdown content={page.body} components={components} />
          <PageNav prev={prev} next={next} />
        </article>
      </div>
    </div>
  );
}
