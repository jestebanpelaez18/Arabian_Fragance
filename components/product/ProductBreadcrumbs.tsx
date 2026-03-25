"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname, getUiLabels } from "@/lib/i18n/uiLabels";

type Crumb = { label: string; href?: string };

type ProductBreadcrumbsProps = {
  current: string;
  path?: Crumb[];
  containerClassName?: string;
  navClassName?: string;
};

export default function ProductBreadcrumbs({
  current,
  path,
  containerClassName = "mx-auto w-full max-w-[1600px] px-5",
  navClassName = "font-playfair-display pt-6 pb-4 text-xs tracking-[0.08em]",
}: ProductBreadcrumbsProps) {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const labels = getUiLabels(locale);

  const resolvedPath = path ?? [
    { label: labels.navbar.home, href: "/" },
    { label: labels.navbar.mobileShopTitle, href: "/shop" },
  ];

  return (
    <div className={containerClassName}>
      <nav aria-label={labels.commerce.breadcrumbs} className={navClassName}>
        <ol className="flex items-center gap-2">
          {resolvedPath.map((item, i) => (
            <li key={i} className="flex items-center gap-2">
              {item.href ? (
                <Link href={item.href} className="hover:text-gold transition">
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
