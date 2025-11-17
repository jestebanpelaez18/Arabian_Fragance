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
  }

  return (
    <footer className="h-full border-white/10 text-white">
      <div className="px-4 pt-11 pb-7 md:px-5">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
          {/* Cada columna en su propia sección */}
          {COLUMNS.map((col) => (
            <section key={col.title}>
              <ul className="footer space-y-3 text-sm text-white">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="nav-link inline-flex items-center gap-2 transition hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
          {/* Suscripción al newsletter */}
          <aside>
            <h3 className="font-bodoni text-base tracking-wide text-white uppercase">
              Join the list
            </h3>
            <p className="font-bodoni mt-3 max-w-xl text-sm text-white">
              Receive updates on new arrivals, exclusive events, and private
              releases.
            </p>

            <form onSubmit={onSubscribe} className="mb-8">
              <div className="flex items-center border-b border-stone-300 py-2">
                <input
                  id="footerEmail"
                  type="email"
                  required
                  placeholder="Email address"
                  className="font-bodoni flex-1 border-none bg-transparent text-xs placeholder-stone-400 outline-none"
                />
                <button
                  type="submit"
                  className="ml-2 text-white hover:text-stone-900"
                  aria-label="Subscribe"
                  title="Subscribe"
                >
                  <ArrowRightIcon className="h-6 w-6" />
                </button>
              </div>
            </form>

            <p className="font-bodoni mt-8 max-w-xl text-sm leading-relaxed text-white">
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
        <div className="flex max-w-7xl flex-col gap-4 px-6 py-6 md:flex-row md:items-center md:justify-between md:px-12 xl:px-16">
          <p className="text-sm text-white">
            © {year} Arabian Fragrance. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
