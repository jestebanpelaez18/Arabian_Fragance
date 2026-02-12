"use client";

import Link from "next/link";
import NavCartTrigger from "@/components/nav/NavCartTrigger";

interface NavRightProps {
  onOpenSearch: () => void;
}

export default function NavRight({ onOpenSearch }: NavRightProps) {
  return (
    <>
      {/* --- DESKTOP VIEW (Texto "Search") --- */}
      <div className="hidden items-center justify-end gap-6 text-sm lg:flex">
        <button
          onClick={onOpenSearch}
          className="nav-link transition-colors hover:text-[var(--gold)]"
        >
          Search
        </button>
        <Link href="/account" className="nav-link">
          Account
        </Link>
        <NavCartTrigger />
      </div>

      {/* --- MOBILE VIEW (Icono Lupa + Carrito) --- */}
      {/* Cambiamos 'md:hidden' por 'lg:hidden' para que salga en tablets y móviles */}
      <div className="flex items-center gap-4 justify-self-end lg:hidden">
        {/* Botón Lupa solo para móvil */}
        <button onClick={onOpenSearch} className="p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>

        <NavCartTrigger />
      </div>
    </>
  );
}
