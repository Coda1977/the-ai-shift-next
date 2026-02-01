import client from "@/tina/__generated__/client";
import HomeContent from "@/components/HomeContent";

export default async function HomePage() {
  const homeRes = await client.queries.page({
    relativePath: "home.md",
  });

  // Fetch all pages to build card data
  const allRes = await client.queries.pageConnection();
  const edges = allRes.data.pageConnection.edges || [];

  const rules = edges
    .map((e: any) => e?.node)
    .filter((n: any) => n?.rule_number)
    .sort((a: any, b: any) => (a.rule_number || 0) - (b.rule_number || 0))
    .map((n: any) => ({
      slug: n._sys.filename,
      part: n.part || "",
      rule_number: n.rule_number,
      short_title: n.short_title || "",
      title: n.title,
      subtitle: n.subtitle || "",
    }));

  const execNode = edges
    .map((e: any) => e?.node)
    .find((n: any) => n?._sys?.filename === "executive");

  const executive = execNode
    ? {
        slug: execNode._sys.filename,
        title: execNode.title,
        subtitle: execNode.subtitle || "",
      }
    : null;

  const appendixSlugs = ["scorecard", "sprint", "frameworks", "case-studies"];
  const appendices = appendixSlugs
    .map((slug) => {
      const node = edges
        .map((e: any) => e?.node)
        .find((n: any) => n?._sys?.filename === slug);
      return node
        ? {
            slug: node._sys.filename,
            title: node.title,
            subtitle: node.subtitle || "",
          }
        : null;
    })
    .filter(Boolean) as { slug: string; title: string; subtitle: string }[];

  return (
    <HomeContent
      query={homeRes.query}
      variables={homeRes.variables}
      data={homeRes.data}
      rules={rules}
      executive={executive}
      appendices={appendices}
    />
  );
}
