import client from "@/tina/__generated__/client";
import PageContent from "@/components/PageContent";
import { getPrevNext, allPageSlugs } from "@/lib/content";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return allPageSlugs
    .filter((s) => s !== "home")
    .map((slug) => ({ slug: [slug] }));
}

export default async function ContentPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const slug = params.slug.join("/");

  let res;
  try {
    res = await client.queries.page({
      relativePath: `${slug}.md`,
    });
  } catch {
    notFound();
  }

  const { prev, next } = getPrevNext(slug);

  return (
    <PageContent
      query={res.query}
      variables={res.variables}
      data={res.data}
      prev={prev}
      next={next}
    />
  );
}
