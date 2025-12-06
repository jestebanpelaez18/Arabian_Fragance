import Link from "next/link";

type Crumb = { label: string; href?: string };

type ProductBreadcrumbsProps = {
  current: string;
  path?: Crumb[];
  containerClassName?: string;
  navClassName?: string;
};

export default function ProductBreadcrumbs({
  current,
  path = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
  ],
  containerClassName = "mx-auto w-full max-w-[1600px] px-3 md:px-6 lg:px-8",
  navClassName = "font-playfair-display pt-6 pb-4 text-xs tracking-[0.08em] text-white/60",
}: ProductBreadcrumbsProps) {
  return (
    <div className={containerClassName}>
      <nav aria-label="Breadcrumb" className={navClassName}>
        <ol className="flex items-center gap-2">
          {path.map((item, i) => (
            <li key={i} className="flex items-center gap-2">
              {item.href ? (
                <Link href={item.href} className="transition hover:text-gold">
                  {item.label}
                </Link>
              ) : (
                <span>{item.label}</span>
              )}
              <span>/</span>
            </li>
          ))}
          <li className="text-foreground">{current}</li>
        </ol>
      </nav>
    </div>
  );
}