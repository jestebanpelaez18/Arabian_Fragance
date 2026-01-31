import Link from "next/link";
import NavCartTrigger from "@/components/nav/NavCartTrigger";
import SearchOverlay from "../layout/SearchOverlay";
import { useState } from "react";

export default function NavRight() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
  };

  return (
    <>
      {/* Right (desktop) */}
      <div className="hidden items-center justify-end gap-6 text-sm lg:flex">
        <button
          onClick={toggleSearch} 
          className={`nav-link transition-colors ${isSearchOpen ? "text-[var(--gold)]" : ""}`}
        >
          Search
        </button>
        <Link href="/account" className="nav-link">
          Account
        </Link>
        <NavCartTrigger />
      </div>
      {/* Cart (mobile) */}
      <div className="flex items-center justify-self-end md:hidden">
        <NavCartTrigger />
      </div>
      {/* Right spacer (mobile symmetry) */}
      <div
        className="hidden justify-self-end md:block lg:hidden"
        aria-hidden="true"
      >
        <span className="block h-6 w-6" />
      </div>
      {isSearchOpen && (
        <SearchOverlay
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
        />
      )}
    </>
  );
}
