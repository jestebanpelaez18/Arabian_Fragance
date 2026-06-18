"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  allNotes: string[];
  className?: string;
  allLabel?: string;
};

const CHIP_BASE_CLASS =
  "relative py-1.5 text-xs uppercase tracking-[0.18em] transition-colors duration-300 font-light";
const CHIP_ACTIVE_CLASS = "text-gold font-normal";
const CHIP_INACTIVE_CLASS = "text-black/40 hover:text-gold";
const UNDERLINE_BASE_CLASS =
  "absolute bottom-0 left-0 h-px w-full bg-gold transition-transform duration-300 origin-left";

export default function NoteFilterChips({
  allNotes,
  className,
  allLabel = "All",
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const selectedNote = sp.get("notes") || null;

  const pushWithQuery = (qs: URLSearchParams) => {
    const query = qs.toString();
    const nextUrl = query ? `${pathname}?${query}` : pathname;
    const currentUrl = sp.toString()
      ? `${pathname}?${sp.toString()}`
      : pathname;

    if (nextUrl !== currentUrl) {
      router.push(nextUrl, { scroll: false });
    }
  };

  const toggle = (note: string) => {
    const qs = new URLSearchParams(sp.toString());

    if (selectedNote === note) {
      qs.delete("notes");
    } else {
      qs.set("notes", note);
    }

    pushWithQuery(qs);
  };

  const clearFilter = () => {
    if (selectedNote === null) return;

    const qs = new URLSearchParams(sp.toString());
    qs.delete("notes");
    pushWithQuery(qs);
  };

  const isAllActive = selectedNote === null;

  return (
    <div className={`w-full ${className ?? ""}`}>
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 md:gap-x-12">
        <button
          type="button"
          onClick={clearFilter}
          className={[
            CHIP_BASE_CLASS,
            isAllActive ? CHIP_ACTIVE_CLASS : CHIP_INACTIVE_CLASS,
          ].join(" ")}
          aria-pressed={isAllActive}
        >
          {allLabel}
          <span
            className={[
              UNDERLINE_BASE_CLASS,
              isAllActive ? "scale-x-100" : "scale-x-0",
            ].join(" ")}
          />
        </button>

        {allNotes.map((n) => {
          const active = selectedNote === n;
          return (
            <button
              key={n}
              type="button"
              onClick={() => toggle(n)}
              className={[
                CHIP_BASE_CLASS,
                active ? CHIP_ACTIVE_CLASS : CHIP_INACTIVE_CLASS,
              ].join(" ")}
              aria-pressed={active}
            >
              {n}
              <span
                className={[
                  UNDERLINE_BASE_CLASS,
                  active ? "scale-x-100" : "scale-x-0",
                ].join(" ")}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
