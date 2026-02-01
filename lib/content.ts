import client from "@/tina/__generated__/client";

export interface PageData {
  title: string;
  subtitle?: string;
  description?: string;
  weight?: number;
  part?: string;
  rule_number?: number;
  short_title?: string;
  body: any;
  _sys: { filename: string };
}

// Hardcoded sidebar navigation structure (matches the Hugo toc.html)
export const sidebarSections = [
  {
    label: "",
    pages: [
      { title: "Introduction", slug: "home" },
      { title: "How to Use This Booklet", slug: "how-to-use" },
    ],
  },
  {
    label: "Part 1: Why — Feel",
    pages: [
      { title: "Rule 1: Find the Emotion", slug: "rule-1-find-the-emotion" },
      { title: "Rule 2: Make It Default", slug: "rule-2-make-it-default" },
      { title: "Rule 3: Kill the Pilot", slug: "rule-3-kill-the-pilot" },
    ],
  },
  {
    label: "Part 2: Who — People",
    pages: [
      { title: "Rule 4: Crown the Beginners", slug: "rule-4-crown-the-beginners" },
      { title: "Rule 5: Lead from the Inference Log", slug: "rule-5-lead-from-inference-log" },
      { title: "Rule 6: Map the Losses", slug: "rule-6-map-the-losses" },
    ],
  },
  {
    label: "Part 3: How — System",
    pages: [
      { title: "Rule 7: Green Light List", slug: "rule-7-green-light-list" },
      { title: "Rule 8: Never Refreeze", slug: "rule-8-never-refreeze" },
    ],
  },
  {
    label: "Executive",
    pages: [{ title: "Measure the Shadow", slug: "executive" }],
  },
  {
    label: "Appendices",
    pages: [
      { title: "A: Adoption Scorecard", slug: "scorecard" },
      { title: "B: 90-Day Sprint", slug: "sprint" },
      { title: "C: Framework Reference", slug: "frameworks" },
      { title: "D: Case Studies", slug: "case-studies" },
    ],
  },
];

// Flat ordered list of all page slugs for prev/next navigation
export const allPageSlugs = sidebarSections.flatMap((s) =>
  s.pages.map((p) => p.slug)
);

export function getPrevNext(currentSlug: string) {
  const idx = allPageSlugs.indexOf(currentSlug);
  if (idx === -1) return { prev: null, next: null };

  const allPages = sidebarSections.flatMap((s) => s.pages);
  return {
    prev: idx > 0 ? allPages[idx - 1] : null,
    next: idx < allPages.length - 1 ? allPages[idx + 1] : null,
  };
}

export async function getPageByFilename(filename: string) {
  try {
    const res = await client.queries.page({
      relativePath: `${filename}.md`,
    });
    return res;
  } catch {
    return null;
  }
}

export async function getAllPages() {
  const res = await client.queries.pageConnection();
  return res;
}
