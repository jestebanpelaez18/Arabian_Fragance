"use client";

import { useState, useRef, useEffect } from "react";

export default function LocalizationMenu() {
  const [activeMenu, setActiveMenu] = useState<"currency" | "language" | null>(
    null,
  );
  const menuRef = useRef<HTMLDivElement>(null);

  // CLOSE DROPDOWN WHEN CLICKING OUTSIDE
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // CLOSE ON ESCAPE KEY
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveMenu(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleMenu = (menu: "currency" | "language") => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  return (
    <div
      ref={menuRef}
      className="font-garamond relative hidden items-center gap-4 text-xs tracking-widest text-[#1a1a1a] uppercase lg:flex"
    >
      {/* --- LANGUAGE SELECTOR --- */}
      <div className="relative flex flex-col items-center">
        <button
          onClick={() => toggleMenu("language")}
          className={`py-2 transition-colors hover:text-[#C9A46A] ${
            activeMenu === "language" ? "text-[#C9A46A]" : ""
          }`}
          aria-expanded={activeMenu === "language"}
        >
          EN
        </button>

        {/* LANGUAGE DROPDOWN PANEL (Centered) */}
        <div
          className={`absolute top-[85%] left-1/2 z-50 mt-1 w-28 -translate-x-1/2 border border-black/5 bg-[var(--background)] py-2 shadow-sm transition-all duration-200 ${
            activeMenu === "language"
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-2 opacity-0"
          }`}
        >
          {/* Changed text inside to match the elegance of Garamond with slight tracking */}
          <ul className="font-garamond flex flex-col text-center text-sm tracking-[0.05em] capitalize">
            <li>
              <button className="w-full px-2 py-1.5 transition-colors hover:bg-black/5 hover:text-[#C9A46A]">
                English
              </button>
            </li>
            <li>
              <button className="w-full px-2 py-1.5 opacity-50 transition-colors hover:bg-black/5 hover:text-[#C9A46A]">
                Suomi
              </button>
            </li>
            <li>
              <button className="w-full px-2 py-1.5 opacity-50 transition-colors hover:bg-black/5 hover:text-[#C9A46A]">
                Svenska
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
