"use client";

import Link from "next/link";
import { FormEvent } from "react";

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
      { label: "Stores", href: "/stores" },
      { label: "Philanthropy", href: "/philanthropy" },
      { label: "Recycling", href: "/recycling" },
      { label: "Care Guide", href: "/care" },
      { label: "Careers", href: "/careers" },
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

function ArrowRightIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        d="M13 5l7 7-7 7M5 12h14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  function onSubscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: connect to your ESP (Klaviyo/Mailchimp/etc.)
    // For now we just prevent navigation.
  }

  return (
    <footer className="bg-background border-t border-white/10 text-foreground">
      <div className="mx-auto max-w-7xl px-6 py-14 md:px-12 xl:px-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
            {COLUMNS.map((col) => (
              <section key={col.title}>
                <h4 className="pb-3 text-sm tracking-widest text-foreground uppercase">
                  {col.title}
                </h4>
                <ul className="space-y-3 text-foreground">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="inline-flex items-center gap-2 transition hover:text-white"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <aside className="lg:col-span-5">
            <h3 className="text-lg tracking-wide text-foreground uppercase">
              Join the list
            </h3>
            <p className="mt-3 max-w-xl text-foreground">
              Receive updates on new arrivals, exclusive events, and private
              releases.
            </p>

            <form onSubmit={onSubscribe} className="mt-4 max-w-xl">
              <label htmlFor="footerEmail" className="sr-only">
                Email address
              </label>
              <div className="flex items-stretch overflow-hidden rounded-md ring-1 ring-stone-300 focus-within:ring-stone-900">
                <input
                  id="footerEmail"
                  type="email"
                  required
                  placeholder="Email address"
                  className="w-full bg-white px-4 py-2.5 text-sm outline-none"
                />
                <button
                  type="submit"
                  className="px-4 text-foreground hover:text-stone-900"
                  aria-label="Subscribe"
                  title="Subscribe"
                >
                  <ArrowRightIcon className="h-5 w-5" />
                </button>
              </div>
            </form>

            <p className="mt-8 max-w-xl leading-relaxed text-foreground">
              {BRAND_COPY}
            </p>
            <div className="mt-8">
              <label htmlFor="currency" className="sr-only">
                Currency
              </label>
              <select
                id="currency"
                className="rounded-md border border-white/70 px-3 py-2 text-sm"
                defaultValue="EUR"
                aria-label="Select currency"
              >
                <option value="EUR">€ / EUR</option>
                <option value="USD">$ / USD</option>
                <option value="GBP">£ / GBP</option>
              </select>
            </div>
          </aside>
        </div>
      </div>

      <div className="border-t border-stone-200">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 md:flex-row md:items-center md:justify-between md:px-12 xl:px-16">
          <p className="text-sm text-foreground">
            © {year} Arabian Fragrance. All rights reserved.
          </p>
          <nav aria-label="Footer Social" className="flex gap-5 text-foreground">
            <Link href="https://instagram.com" className="hover:text-stone-900">
              Instagram
            </Link>
            <Link href="https://facebook.com" className="hover:text-stone-900">
              Facebook
            </Link>
            <Link href="https://pinterest.com" className="hover:text-stone-900">
              Pinterest
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
