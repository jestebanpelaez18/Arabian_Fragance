"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  allNotes: string[];         
  className?: string;
};

export default function NoteFilterChips({ allNotes, className }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const selected = useMemo(() => {
    const raw = sp.get("notes");
    return raw ? raw.split(",").filter(Boolean) : [];
  }, [sp]);

  const toggle = (note: string) => {
    const set = new Set(selected);
    set.has(note) ? set.delete(note) : set.add(note);
    const next = [...set].join(",");
    const qs = new URLSearchParams(sp.toString());
    if (next) qs.set("notes", next);
    else qs.delete("notes");
    router.push(`${pathname}?${qs.toString()}`, { scroll: false });
  };

  return (
    <div className={className ?? ""}>
      <div className="flex flex-wrap gap-4">
        {allNotes.map((n) => {
          const active = selected.includes(n);
          return (
            <button
              key={n}
              type="button"
              onClick={() => toggle(n)}
              className={[
                "rounded-full px-4 py-2 text-sm transition",
                "border",
                active
                  ? "border-white/80 bg-white/10 text-white"
                  : "border-white/25 text-white/85 hover:border-white/40 hover:bg-white/5",
              ].join(" ")}
              aria-pressed={active}
            >
              {n}
            </button>
          );
        })}
      </div>
    </div>
  );
}
