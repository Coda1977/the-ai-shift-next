"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarSections } from "@/lib/content";

export default function Sidebar() {
  const pathname = usePathname();

  function getHref(slug: string) {
    return slug === "home" ? "/" : `/${slug}`;
  }

  function isActive(slug: string) {
    const href = getHref(slug);
    return pathname === href;
  }

  return (
    <aside className="sidebar">
      <div className="toc-title">Contents</div>
      <ul className="toc-nav">
        {sidebarSections.map((section, si) => (
          <li key={si}>
            {section.label && (
              <div className="toc-part-label">{section.label}</div>
            )}
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {section.pages.map((page) => (
                <li key={page.slug}>
                  <Link
                    href={getHref(page.slug)}
                    className={isActive(page.slug) ? "active" : ""}
                  >
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </aside>
  );
}
