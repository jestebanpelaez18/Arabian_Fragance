"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandCopy from "@/components/footer/BrandCopy";
import PaymentIcons from "@/components/footer/PaymentsIcons";
import { i18n } from "@/i18n-config";
import { getLocaleFromPathname, getUiLabels } from "@/lib/i18n/uiLabels";
import type { FooterSocialLink } from "@/lib/shopify/get-footer-social-links";

type FooterProps = {
  socialLinks?: FooterSocialLink[];
};

type FooterColumn = {
  id: string;
  title: string;
  links: Array<{
    label: string;
    href: string;
  }>;
};

export default function Footer({ socialLinks = [] }: FooterProps) {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const labels = getUiLabels(locale).footer;
  const year = new Date().getFullYear();

  const columns: FooterColumn[] = labels.columns
    .slice(0, 2)
    .map((column, index) => ({
      id: `footer-column-${index}`,
      title: column.title,
      links: column.links,
    }));

  if (socialLinks.length > 0) {
    columns.push({
      id: "footer-social",
      title: labels.columns[2]?.title ?? "Social",
      links: socialLinks,
    });
  }

  function localizeHref(href: string): string {
    if (!href.startsWith("/") || href.startsWith("//")) {
      return href;
    }

    const existingLocale = i18n.locales.find(
      (language) =>
        href === `/${language}` ||
        href.startsWith(`/${language}/`) ||
        href.startsWith(`/${language}?`) ||
        href.startsWith(`/${language}#`),
    );

    const path = existingLocale ? href.slice(existingLocale.length + 1) : href;

    return `/${locale}${path}`;
  }

  const linkClassName =
    "font-garamond text-footer-text hover:text-footer-accent " +
    "inline-block py-1 text-sm leading-relaxed tracking-[0.1em] " +
    "uppercase transition-colors duration-200 " +
    "focus-visible:outline-2 focus-visible:outline-offset-4 " +
    "focus-visible:outline-current";

  function renderLink(link: { label: string; href: string }) {
    const isExternal = /^(https?:)?\/\//i.test(link.href);

    if (isExternal) {
      return (
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName}
        >
          {link.label}
        </a>
      );
    }

    return (
      <Link href={localizeHref(link.href)} className={linkClassName}>
        {link.label}
      </Link>
    );
  }

  return (
    <footer className="bg-footer text-footer-text">
      <div className="px-5 pt-9 pb-6 md:pt-12 md:pb-8 xl:px-6">
        <div className="grid grid-cols-1 gap-9 md:grid-cols-4 md:gap-6 lg:gap-10">
          <div className="md:hidden">
            {columns.map((column) => (
              <details
                key={column.id}
                className="group border-b border-white/15"
              >
                <summary className="font-garamond flex min-h-14 cursor-pointer list-none items-center justify-between gap-5 py-4 text-sm tracking-[0.12em] uppercase focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current [&::-webkit-details-marker]:hidden">
                  <span>{column.title}</span>

                  <span
                    aria-hidden="true"
                    className="relative flex h-5 w-5 shrink-0 items-center justify-center"
                  >
                    <span className="absolute h-px w-3 bg-current" />
                    <span className="absolute h-3 w-px bg-current group-open:hidden" />
                  </span>
                </summary>

                <ul className="space-y-2 pt-1 pb-5">
                  {column.links.map((link) => (
                    <li key={`${link.label}-${link.href}`}>
                      {renderLink(link)}
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>

          {columns.map((column) => (
            <nav
              key={column.id}
              aria-label={column.title}
              className="hidden md:block"
            >
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={`${link.label}-${link.href}`}>{renderLink(link)}</li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="min-w-0 md:col-start-4">
            <div className="mb-5 flex justify-start">
              <Image
                src="/logo/AFC-logo-mark-light.svg"
                alt={labels.logoAlt}
                width={40}
                height={40}
                className="h-10 w-auto select-none"
              />
            </div>

            <BrandCopy text={labels.brandCopy} />

            <div className="mt-6">
              <PaymentIcons />
            </div>
          </div>
        </div>

        <div className="mt-9 border-t border-white/10 pt-5 md:mt-12 md:pt-6">
          <p className="font-garamond text-xs leading-relaxed text-white/50 md:text-sm">
            © {year} Arabian Fragrance. {labels.allRightsReserved}
          </p>
        </div>
      </div>
    </footer>
  );
}
