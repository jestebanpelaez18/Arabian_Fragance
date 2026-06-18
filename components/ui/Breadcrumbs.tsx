import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
  listClassName?: string;
  linkClassName?: string;
  currentClassName?: string;
  separatorClassName?: string;
  ariaLabel?: string;
};

export default function Breadcrumbs({
  items,
  className = "w-full px-5 pt-6 pb-2 text-[10px] tracking-[0.2em] text-black/30 uppercase md:px-8 xl:px-12",
  listClassName = "flex items-center gap-3",
  linkClassName = "font-light text-black/40 transition-colors duration-300 hover:text-gold",
  currentClassName = "font-normal text-black/70",
  separatorClassName = "font-light text-black/20 select-none",
  ariaLabel = "Breadcrumb",
}: BreadcrumbsProps) {
  if (items.length === 0) return null;

  return (
    <nav aria-label={ariaLabel} className={className}>
      <ol className={listClassName}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li
              key={`${item.label}-${index}`}
              className="flex items-center gap-3"
            >
              {item.href && !isLast ? (
                <Link href={item.href} className={linkClassName}>
                  {item.label}
                </Link>
              ) : (
                <span className={currentClassName}>{item.label}</span>
              )}

              {!isLast && <span className={separatorClassName}>/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
