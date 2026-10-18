"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type ShopFiltersLabels = {
  countLabelSingular: string;
  countLabelPlural: string;
  filterButton: string;
  filterTitle: string;
  closeFilters: string;
  scentProfile: string;
  selectOneOrMore: string;
  clearAll: string;
  applyFilters: string;
};

type Props = {
  allNotes: string[];
  count: number;
  labels: ShopFiltersLabels;
};

function NoteCheckbox({
  note,
  checked,
  onToggle,
}: {
  note: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <label className="font-garamond group flex min-h-11 cursor-pointer items-center gap-3 text-base">
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        className="peer sr-only"
      />

      <span
        aria-hidden="true"
        className="flex h-3.5 w-3.5 shrink-0 items-center justify-center border border-black/30 transition-colors peer-checked:border-neutral-900 peer-checked:bg-neutral-900 peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4"
      >
        <svg
          width="10"
          height="10"
          viewBox="0 0 12 12"
          fill="none"
          className={checked ? "opacity-100" : "opacity-0"}
        >
          <path d="m2 6 2.5 2.5L10 3" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </span>

      <span className="transition-colors group-hover:text-black">{note}</span>
    </label>
  );
}

export default function ShopFilters({ allNotes, count, labels }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const titleId = useId();

  const dialogRef = useRef<HTMLDialogElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLButtonElement>(null);
  const animationsRef = useRef<Animation[]>([]);
  const closingRef = useRef(false);
  const scrollLockRef = useRef<string | null>(null);

  const [draft, setDraft] = useState<string[]>([]);

  const selected = Array.from(
    new Set(
      (searchParams.get("notes") ?? "")
        .split(",")
        .filter((note) => allNotes.includes(note)),
    ),
  );

  function cancelAnimations() {
    animationsRef.current.forEach((animation) => animation.cancel());
    animationsRef.current = [];
  }

  function restoreScroll() {
    if (scrollLockRef.current !== null) {
      document.body.style.overflow = scrollLockRef.current;
      scrollLockRef.current = null;
    }
  }

  useEffect(() => {
    return () => {
      animationsRef.current.forEach((animation) => animation.cancel());

      if (scrollLockRef.current !== null) {
        document.body.style.overflow = scrollLockRef.current;
      }
    };
  }, []);

  function getDuration() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? 0
      : 320;
  }

  function openFilters() {
    const dialog = dialogRef.current;
    const panel = panelRef.current;
    const overlay = overlayRef.current;

    if (!dialog || !panel || !overlay || dialog.open) return;

    cancelAnimations();
    closingRef.current = false;
    setDraft(selected);

    scrollLockRef.current = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";

    const duration = getDuration();

    animationsRef.current = [
      panel.animate(
        [{ transform: "translateY(100%)" }, { transform: "translateY(0)" }],
        {
          duration,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "both",
        },
      ),
      overlay.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration,
        easing: "ease-out",
        fill: "both",
      }),
    ];
  }

  async function closeFilters() {
    const dialog = dialogRef.current;
    const panel = panelRef.current;
    const overlay = overlayRef.current;

    if (!dialog?.open || !panel || !overlay || closingRef.current) {
      return;
    }

    closingRef.current = true;

    // Capture the current position if closed during the opening animation.
    const transform = getComputedStyle(panel).transform;
    const opacity = getComputedStyle(overlay).opacity;

    cancelAnimations();

    const duration = getDuration();

    const animations = [
      panel.animate([{ transform }, { transform: "translateY(100%)" }], {
        duration,
        easing: "cubic-bezier(0.4, 0, 1, 1)",
        fill: "both",
      }),
      overlay.animate([{ opacity }, { opacity: 0 }], {
        duration,
        easing: "ease-in",
        fill: "both",
      }),
    ];

    animationsRef.current = animations;

    await Promise.allSettled(animations.map((animation) => animation.finished));

    if (dialog.open) dialog.close();
  }

  function updateNotes(notes: string[]) {
    const params = new URLSearchParams(searchParams.toString());

    if (notes.length > 0) {
      params.set("notes", notes.join(","));
    } else {
      params.delete("notes");
    }

    const query = params.toString();

    router.push(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  }

  function toggleNote(note: string) {
    setDraft((current) =>
      current.includes(note)
        ? current.filter((value) => value !== note)
        : [...current, note],
    );
  }

  async function applyFilters() {
    const nextNotes = [...draft];
    await closeFilters();
    updateNotes(nextNotes);
  }

  return (
    <div className="w-full text-neutral-900">
      <div className="flex min-h-12 items-center justify-between gap-4">
        <button
          type="button"
          onClick={openFilters}
          disabled={allNotes.length === 0}
          className="font-garamond flex min-h-11 min-w-36 items-center justify-center gap-3 border border-black/10 px-5 text-sm tracking-[0.08em] uppercase transition-colors duration-200 hover:bg-neutral-900 hover:text-white disabled:opacity-40"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            aria-hidden="true"
          >
            <path d="M4 7h16M4 17h16M9 4v6M15 14v6" />
          </svg>
          {labels.filterButton}
          {selected.length > 0 ? ` (${selected.length})` : ""}
        </button>

        <p
          className="font-serif text-xs font-light tracking-[0.06em] text-black/60"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {count}{" "}
          {count === 1 ? labels.countLabelSingular : labels.countLabelPlural}
        </p>
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onCancel={(event) => {
          event.preventDefault();
          void closeFilters();
        }}
        onClose={() => {
          cancelAnimations();
          restoreScroll();
          closingRef.current = false;
        }}
        className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-hidden border-0 bg-transparent p-0 text-neutral-900 backdrop:bg-transparent"
      >
        <button
          ref={overlayRef}
          type="button"
          tabIndex={-1}
          aria-label={labels.closeFilters}
          onClick={() => void closeFilters()}
          className="absolute inset-0 h-full w-full cursor-default bg-black/30"
        />

        <div
          ref={panelRef}
          className="bg-background absolute inset-x-0 bottom-0 flex max-h-[85dvh] flex-col border-t border-black/10 md:max-h-[75dvh]"
        >
          <div className="flex shrink-0 items-center justify-between px-5 py-4 xl:px-6">
            <h2
              id={titleId}
              className="font-magister text-lg font-normal uppercase"
            >
              {labels.filterTitle}
            </h2>

            <button
              autoFocus
              type="button"
              onClick={() => void closeFilters()}
              aria-label={labels.closeFilters}
              className="-mr-3 flex h-11 w-11 items-center justify-center transition-opacity hover:opacity-50"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                aria-hidden="true"
              >
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            </button>
          </div>

          <div className="overflow-y-auto overscroll-contain px-5 pt-4 pb-8 md:pt-6 md:pb-12 xl:px-6">
            <fieldset>
              <legend className="font-magister text-base font-normal uppercase">
                {labels.scentProfile}
              </legend>

              <p className="font-garamond mt-2 mb-5 text-base text-black/60">
                {labels.selectOneOrMore}
              </p>

              <div className="grid grid-cols-2 gap-x-6 gap-y-1 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7">
                {allNotes.map((note) => (
                  <NoteCheckbox
                    key={note}
                    note={note}
                    checked={draft.includes(note)}
                    onToggle={() => toggleNote(note)}
                  />
                ))}
              </div>
            </fieldset>
          </div>

          <div className="font-garamond flex shrink-0 items-center justify-end gap-6 border-t border-black/10 px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] xl:px-6">
            <button
              type="button"
              onClick={() => {
                setDraft([]);
                updateNotes([]);
              }}
              className="min-h-11 text-sm underline underline-offset-4"
            >
              {labels.clearAll}
            </button>

            <button
              type="button"
              onClick={() => void applyFilters()}
              className="min-h-11 min-w-40 bg-neutral-900 px-6 text-sm tracking-[0.08em] text-white uppercase transition-colors hover:bg-neutral-800"
            >
              {labels.applyFilters}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
