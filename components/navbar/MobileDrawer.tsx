import Link from "next/link";
import type { Dispatch, SetStateAction } from "react";

type MobileView = "root" | "shop";

export default function MobileDrawer({
  openMobile,
  setOpenMobile,
  mobileView,
  setMobileView,
  viewIndex,
  title,
}: {
  openMobile: boolean;
  setOpenMobile: Dispatch<SetStateAction<boolean>>;
  mobileView: MobileView;
  setMobileView: Dispatch<SetStateAction<MobileView>>;
  viewIndex: number;
  title: string;
}) {
  return (
    <div
      aria-hidden={!openMobile}
      className={`fixed inset-x-0 top-14 bottom-0 z-[10000] lg:hidden ${
        openMobile ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <button
        aria-label="Close menu"
        onClick={() => setOpenMobile(false)}
        className={`absolute inset-0 z-10 bg-black/45 duration-300 motion-safe:transition-opacity ${
          openMobile ? "opacity-100" : "opacity-0"
        }`}
      />
      <aside
        className={`absolute top-0 left-0 z-20 flex h-[100dvh] w-[88vw] max-w-[380px] flex-col overscroll-contain border-r border-white/10 bg-[var(--background)] text-white shadow-2xl duration-300 ease-out will-change-transform motion-safe:transition-transform ${
          openMobile ? "translate-x-0" : "-translate-x-full"
        } `}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex h-14 items-center justify-between border-b border-white/10 px-4">
          {mobileView !== "root" ? (
            <button
              onClick={() => setMobileView("root")}
              className="-m-2 p-2 text-white/85"
              aria-label="Back"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M15 6l-6 6 6 6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </button>
          ) : (
            <span className="h-8 w-8" />
          )}
          <span className="text-xs tracking-[0.18em] text-white/60 uppercase">
            {title}
          </span>
          <span className="h-8 w-8" />
        </div>
        <div className="relative flex-1 overflow-hidden">
          <div
            className="flex h-full w-[200%] duration-300 ease-out motion-safe:transition-transform"
            style={{ transform: `translateX(-${viewIndex * 100}%)` }}
          >
            <section className="h-full min-w-full space-y-5 overflow-y-auto px-4 py-5">
              <button
                className="nav-link block text-left text-white"
                onClick={() => setMobileView("shop")}
              >
                Shop
              </button>
              <Link
                href="/about"
                onClick={() => setOpenMobile(false)}
                className="nav-link block text-white"
              >
                About
              </Link>
              <Link
                href="/showroom"
                onClick={() => setOpenMobile(false)}
                className="nav-link block text-white"
              >
                Showroom
              </Link>
            </section>
            <section className="h-full min-w-full overflow-y-auto px-4 py-5">
              <p className="mb-4 text-[11px] tracking-[0.18em] text-white/60 uppercase">
                Shop
              </p>
              <ul className="space-y-3 text-white/90">
                <li>
                  <Link
                    href="/shop"
                    onClick={() => setOpenMobile(false)}
                    className="nav-link block"
                  >
                    Shop All
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop/women"
                    onClick={() => setOpenMobile(false)}
                    className="nav-link block"
                  >
                    Women
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop/men"
                    onClick={() => setOpenMobile(false)}
                    className="nav-link block"
                  >
                    Men
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop/unisex"
                    onClick={() => setOpenMobile(false)}
                    className="nav-link block"
                  >
                    Unisex
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop/gifts"
                    onClick={() => setOpenMobile(false)}
                    className="nav-link block"
                  >
                    Gifts
                  </Link>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </aside>
    </div>
  );
}
