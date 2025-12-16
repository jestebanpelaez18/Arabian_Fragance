"use client";

import Link from "next/link";
import { FormEvent } from "react";
import NewsletterForm from "@/components/footer/NewsletterForm";
import BrandCopy from "@/components/footer/BrandCopy";
import CurrencySelector from "@/components/footer/CurrencySelector";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Customer Care",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Shipping", href: "/shipping" },
      { label: "Returns & Repairs", href: "/returns" },
      { label: "FAQs", href: "/faq" },
      { label: "Warranty Policy", href: "/warranty" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Cookies Policy", href: "/cookies" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Brand Profile", href: "/about" },
      { label: "Store", href: "/showroom" },
      { label: "Philanthropy", href: "/philanthropy" },
      { label: "Recycling", href: "/recycling" },
      { label: "Care Guide", href: "/care" },
    ],
  },
  {
    title: "Social",
    links: [
      { label: "Instagram", href: "https://instagram.com/" },
      { label: "Facebook", href: "https://facebook.com/" },
      { label: "Pinterest", href: "https://pinterest.com/" },
    ],
  },
];

const BRAND_COPY =
  "Arabian Fragrance is a contemporary perfumery house crafting evocative scents with ethically sourced ingredients. Explore signature blends, layered rituals and limited editions in-store or online.";

export default function Footer() {
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
          <NewsletterForm onSubscribe={onSubscribe} />
          {/* Collapsible menus */}
          <section className="mb-8">
            {COLUMNS.map((col) => (
              <details key={col.title} className="mb-2">
                <summary className="font-bodoni text-footer-text cursor-pointer py-2 text-xs tracking-wide uppercase">
                  {col.title}
                </summary>
                <ul className="space-y-2 pl-2">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="font-bodoni text-footer-text inline-flex text-sm items-center gap-2 transition hover:text-footer-accent"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </section>
          <BrandCopy text={BRAND_COPY} />
          <CurrencySelector />
          <div className="mt-2 text-center text-xs text-stone-400">
            © {year} Arabian Fragrance. All rights reserved.
          </div>
        </div>

        {/* DESKTOP */}
        <div className="hidden grid-cols-4 gap-5 md:grid">
          {COLUMNS.map((col) => (
            <section key={col.title}>
              <ul className="footer space-y-3 text-sm">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="nav-link inline-flex text-footer-text items-center gap-2 transition hover:text-footer-accent"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
          <aside>
            <NewsletterForm onSubscribe={onSubscribe} />
            <BrandCopy text={BRAND_COPY} />
            <CurrencySelector />
          </aside>
        </div>
      </div>

      {/* Copyright for desktop */}
      <div className="hidden md:block">
        <div className="flex max-w-7xl flex-col gap-4 px-4 py-6 md:flex-row md:items-center md:justify-between md:px-5">
          <p className="font-bodoni text-sm text-stone-400">
            © {year} Arabian Fragrance. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
