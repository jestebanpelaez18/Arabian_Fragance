"use client";

import NavCartTrigger from "@/components/navbar/NavCartTrigger";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname, getUiLabels } from "@/lib/i18n/uiLabels";

interface NavRightProps {
  onOpenSearch: () => void;
}

export default function NavRight({ onOpenSearch }: NavRightProps) {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const labels = getUiLabels(locale).navbar;

  return (
    <div className="flex items-center justify-end gap-5 text-[#1a1a1a] lg:gap-6">
      {/* SEARCH BUTTON: Icon ONLY for all screens */}
      <button
        onClick={onOpenSearch}
        className="opacity-75 transition-all hover:text-[#C9A46A] hover:opacity-100"
        aria-label={labels.search}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.2} // Clean, thin stroke
          stroke="currentColor"
          className="h-[18px] w-[18px]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </button>

      {/* CART TRIGGER */}
      <NavCartTrigger />
    </div>
  );
}
