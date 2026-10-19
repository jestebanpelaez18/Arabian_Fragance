"use client";

import { useEffect, useId, useRef, useState, useTransition } from "react";
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
  genderGroup: string;
  collectionGroup: string;
  genderOptions: Record<string, string>;
  collectionOptions: Record<string, string>;
};

type Props = {
  allNotes: string[];
  availableGenders: string[];
  availableCollections: string[];
  count: number;
  labels: ShopFiltersLabels;
};

type Selection = {
  notes: string[];
  genders: string[];
  collections: string[];
};

const SIDE_GROUP_GRID =
  "grid grid-cols-2 gap-x-6 sm:grid-cols-3 lg:grid-cols-1";

function emptySelection(): Selection {
  return { notes: [], genders: [], collections: [] };
}

function readSelection(value: string | null, available: string[]): string[] {
  return Array.from(
    new Set(
      (value ?? "")
        .split(",")
        .map((item) => item.trim())
        .filter((item) => available.includes(item)),
    ),
  );
}

function FilterCheckbox({
  label,
  checked,
  onToggle,
}: {
  label: string;
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

      <span className="transition-colors group-hover:text-black">{label}</span>
    </label>
  );
}

function FilterGroup({
  title,
  options,
  selected,
  onToggle,
  gridClassName,
}: {
  title: string;
  options: { value: string; label: string }[];
  selected: string[];
  onToggle: (value: string) => void;
  gridClassName: string;
}) {
  if (options.length === 0) return null;

  return (
    <fieldset className="min-w-0">
      <legend className="font-magister mb-4 text-base font-normal uppercase">
        {title}
      </legend>

      <div className={gridClassName}>
        {options.map(({ value, label }) => (
          <FilterCheckbox
            key={value}
            label={label}
            checked={selected.includes(value)}
            onToggle={() => onToggle(value)}
          />
        ))}
      </div>
    </fieldset>
  );
}

export default function ShopFilters({
  allNotes,
  availableGenders,
  availableCollections,
  count,
  labels,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const titleId = useId();
  const [isPending, startTransition] = useTransition();

  const dialogRef = useRef<HTMLDialogElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLButtonElement>(null);
  const animationsRef = useRef<Animation[]>([]);
  const closingRef = useRef(false);
  const scrollLockRef = useRef<string | null>(null);

  const [draft, setDraft] = useState<Selection>(emptySelection);

  const selected: Selection = {
    notes: readSelection(searchParams.get("notes"), allNotes),
    genders: readSelection(searchParams.get("genders"), availableGenders),
    collections: readSelection(
      searchParams.get("collections"),
      availableCollections,
    ),
  };

  const activeCount =
    selected.notes.length +
    selected.genders.length +
    selected.collections.length;

  const hasOptions =
    allNotes.length > 0 ||
    availableGenders.length > 0 ||
    availableCollections.length > 0;

  const hasExtraGroups =
    availableGenders.length > 0 || availableCollections.length > 0;

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

  function updateFilters(selection: Selection) {
    const params = new URLSearchParams(searchParams.toString());

    for (const key of ["notes", "genders", "collections"] as const) {
      if (selection[key].length > 0) {
        params.set(key, selection[key].join(","));
      } else {
        params.delete(key);
      }
    }

    const query = params.toString();
    const nextUrl = query ? `${pathname}?${query}` : pathname;
    const currentQuery = searchParams.toString();
    const currentUrl = currentQuery ? `${pathname}?${currentQuery}` : pathname;

    if (nextUrl === currentUrl) return;

    startTransition(() => {
      router.push(nextUrl, { scroll: false });
    });
  }

  function toggleOption(group: keyof Selection, value: string) {
    setDraft((current) => ({
      ...current,
      [group]: current[group].includes(value)
        ? current[group].filter((item) => item !== value)
        : [...current[group], value],
    }));
  }

  function clearAll() {
    const cleared = emptySelection();
    setDraft(cleared);
    updateFilters(cleared);
  }

  async function applyFilters() {
    if (closingRef.current || isPending) return;

    const nextSelection = draft;

    await closeFilters();
    updateFilters(nextSelection);
  }

  return (
    <div className="w-full text-neutral-900" aria-busy={isPending}>
      <div className="flex min-h-12 items-center justify-between gap-4">
        <button
          type="button"
          onClick={openFilters}
          disabled={!hasOptions}
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
          {activeCount > 0 ? ` (${activeCount})` : ""}
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

          <div className="min-h-0 overflow-y-auto overscroll-contain px-5 pt-4 pb-8 md:pt-6 md:pb-12 xl:px-6">
            <p className="font-garamond mb-6 text-base text-black/60">
              {labels.selectOneOrMore}
            </p>

            <div
              className={
                hasExtraGroups
                  ? "grid items-start gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-12"
                  : "grid gap-8"
              }
            >
              <FilterGroup
                title={labels.scentProfile}
                options={allNotes.map((note) => ({ value: note, label: note }))}
                selected={draft.notes}
                onToggle={(value) => toggleOption("notes", value)}
                gridClassName={
                  hasExtraGroups
                    ? "grid grid-cols-2 gap-x-6 gap-y-1 sm:grid-cols-3"
                    : "grid grid-cols-2 gap-x-6 gap-y-1 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7"
                }
              />

              <FilterGroup
                title={labels.genderGroup}
                options={availableGenders.map((value) => ({
                  value,
                  label: labels.genderOptions[value] ?? value,
                }))}
                selected={draft.genders}
                onToggle={(value) => toggleOption("genders", value)}
                gridClassName={SIDE_GROUP_GRID}
              />

              <FilterGroup
                title={labels.collectionGroup}
                options={availableCollections.map((value) => ({
                  value,
                  label: labels.collectionOptions[value] ?? value,
                }))}
                selected={draft.collections}
                onToggle={(value) => toggleOption("collections", value)}
                gridClassName={SIDE_GROUP_GRID}
              />
            </div>
          </div>

          <div className="font-garamond flex shrink-0 items-center justify-end gap-6 border-t border-black/10 px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] xl:px-6">
            <button
              type="button"
              onClick={clearAll}
              disabled={isPending}
              className="min-h-11 text-sm underline underline-offset-4 disabled:opacity-40"
            >
              {labels.clearAll}
            </button>

            <button
              type="button"
              onClick={() => void applyFilters()}
              disabled={isPending}
              className="min-h-11 min-w-40 bg-neutral-900 px-6 text-sm tracking-[0.08em] text-white uppercase transition-colors hover:bg-neutral-800 disabled:opacity-50"
            >
              {labels.applyFilters}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
