import Link from "next/link";

interface NavLink {
  title: string;
  slug: string;
}

export default function PageNav({
  prev,
  next,
}: {
  prev: NavLink | null;
  next: NavLink | null;
}) {
  if (!prev && !next) return null;

  return (
    <nav className="page-nav">
      {prev && (
        <Link
          href={prev.slug === "home" ? "/" : `/${prev.slug}`}
          className="nav-prev"
        >
          <div className="nav-label">&larr; Previous</div>
          <div className="nav-title">{prev.title}</div>
        </Link>
      )}
      {next && (
        <Link
          href={next.slug === "home" ? "/" : `/${next.slug}`}
          className="nav-next"
        >
          <div className="nav-label">Next &rarr;</div>
          <div className="nav-title">{next.title}</div>
        </Link>
      )}
    </nav>
  );
}
