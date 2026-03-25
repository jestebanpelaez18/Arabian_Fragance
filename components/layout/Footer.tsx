"use client";

import Link from "next/link";
import { FormEvent } from "react";
import { usePathname } from "next/navigation";
import NewsletterForm from "@/components/footer/NewsletterForm";
import BrandCopy from "@/components/footer/BrandCopy";
import CurrencySelector from "@/components/footer/CurrencySelector";
import PaymentIcons from "../footer/PaymentsIcons";
import { getLocaleFromPathname, getUiLabels } from "@/lib/i18n/uiLabels";

export default function Footer() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const labels = getUiLabels(locale).footer;
  const columns = labels.columns;

  const year = new Date().getFullYear();

  function onSubscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: connect to your ESP (Klaviyo/Mailchimp/etc.)
  }

  return (
    <footer className="bg-footer min-h-[430px]">
      <div className="px-4 pt-8 pb-7 md:px-5">
        {/* MOBILE */}
        <div className="block md:hidden">
          <NewsletterForm
            onSubscribe={onSubscribe}
            labels={labels.newsletter}
          />
          {/* Collapsible menus */}
          <section className="mb-8">
            {columns.map((col) => (
              <details key={col.title} className="mb-2">
                <summary className="font-bodoni text-footer-text cursor-pointer py-2 text-xs tracking-wide uppercase">
                  {col.title}
                </summary>
                <ul className="space-y-2 pl-2">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="font-bodoni text-footer-text hover:text-footer-accent inline-flex items-center gap-2 text-sm transition"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </section>
          <BrandCopy text={labels.brandCopy} />
          <CurrencySelector
            selectCurrencyAria={labels.selectCurrency}
            logoAlt={labels.logoAlt}
          />
          <PaymentIcons />
          <div className="mt-2 text-center text-xs text-stone-400">
            © {year} Arabian Fragrance. {labels.allRightsReserved}
          </div>
        </div>

        {/* DESKTOP */}
        <div className="hidden grid-cols-4 gap-5 md:grid">
          {columns.map((col) => (
            <section key={col.title}>
              <ul className="footer space-y-3 text-sm">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="nav-link text-footer-text hover:text-footer-accent inline-flex items-center gap-2 transition"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
          <aside>
            <NewsletterForm
              onSubscribe={onSubscribe}
              labels={labels.newsletter}
            />
            <BrandCopy text={labels.brandCopy} />
            <CurrencySelector
              selectCurrencyAria={labels.selectCurrency}
              logoAlt={labels.logoAlt}
            />
            <PaymentIcons />
          </aside>
        </div>
      </div>

      {/* Copyright for desktop */}
      <div className="hidden md:block">
        <div className="flex max-w-7xl flex-col gap-4 px-4 py-6 md:flex-row md:items-center md:justify-between md:px-5">
          <p className="font-bodoni text-sm text-stone-400">
            © {year} Arabian Fragrance. {labels.allRightsReserved}
          </p>
        </div>
      </div>
    </footer>
  );
}
