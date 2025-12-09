import Link from "next/link";
import MegaMenu from "./MegaMenu";
import type { Dispatch, SetStateAction } from "react";

type MobileView = "root" | "shop";

interface Props {
  openMobile: boolean;
  setOpenMobile: Dispatch<SetStateAction<boolean>>;
  setMobileView: Dispatch<SetStateAction<MobileView>>;
  openShopNow: () => void;
  closeShopSoon: () => void;
  openShop: boolean;
}

export default function NavLeft({
  openMobile,
  setOpenMobile,
  setMobileView,
  openShopNow,
  closeShopSoon,
  openShop,
}: Props) {
  return (
    <>
      {/* Desktop links */}
      <div className="hidden items-center gap-8 justify-self-start text-sm lg:flex">
        <div
          className="relative"
          onPointerEnter={openShopNow}
          onPointerLeave={closeShopSoon}
        >
          <span className="pointer-events-none absolute top-full right-0 left-0 h-2" />
          <button
            className="nav-link relative before:absolute before:top-full before:right-0 before:left-0 before:h-2 before:content-['']"
            aria-haspopup="true"
            aria-expanded={openShop}
            aria-controls="shop-panel"
          >
            Shop
          </button>
          <MegaMenu open={openShop} />
        </div>
        <Link href="/about" className="nav-link">
          About
        </Link>
        <Link href="/showroom" className="nav-link">
          Showroom
        </Link>
      </div>
      {/* Burger / X (mobile) */}
      <div className="col-start-1 flex items-center justify-self-start lg:hidden">
        <button
          aria-label={openMobile ? "Close menu" : "Open menu"}
          aria-expanded={openMobile}
          onClick={() => {
            const toOpen = !openMobile;
            setOpenMobile(toOpen);
            if (toOpen) setMobileView("root");
          }}
          className="p-2 text-white/90"
        >
          {openMobile ? (
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M4 6h16M4 12h16M4 18h16"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}
