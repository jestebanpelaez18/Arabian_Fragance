import Link from "next/link";

type Crumb = { label: string; href?: string; current?: boolean };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="w-7xl py-4">
      <ol className="font-garamond flex items-center gap-2 text-sm md:text-base">
        {items.map((it, i) => {
          const isLast = i === items.length - 1;
          const current = isLast || it.current;
          return (
            <li key={i} className="inline-flex items-center gap-2">
              {it.href && !current ? (
                <Link
                  href={it.href}
                  className="opacity-70 transition hover:opacity-100"
                >
                  {it.label}
                </Link>
              ) : (
                <span
                  aria-current={current ? "page" : undefined}
                  className={current ? "" : "opacity-70"}
                >
                  {it.label}
                </span>
              )}
              {!isLast && (
                <svg
                  aria-hidden
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  className="opacity-60"
                >
                  <path
                    d="M9 18l6-6-6-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
