import type { Product } from "@/data/products";
import type { Locale } from "@/i18n-config";

type ProductNotesProps = {
  pyramid?: Product["pyramid"];
  locale: Locale;
};

type NotesLabels = {
  title: string;
  top: string;
  heart: string;
  base: string;
};

const LABELS = {
  en: {
    title: "Olfactory Notes",
    top: "Top Notes",
    heart: "Heart Notes",
    base: "Base Notes",
  },
  fi: {
    title: "Tuoksunuotit",
    top: "Alkunuotit",
    heart: "Sydännuotit",
    base: "Pohjanuotit",
  },
  sv: {
    title: "Doftnoter",
    top: "Toppnoter",
    heart: "Hjärtnoter",
    base: "Basnoter",
  },
} satisfies Record<Locale, NotesLabels>;

// Full class names so Tailwind can detect them.
const COLUMNS_CLASS: Record<number, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
};

function cleanNotes(notes?: string[]): string[] {
  return Array.from(
    new Set((notes ?? []).map((note) => note.trim()).filter(Boolean)),
  );
}

export default function ProductNotes({ pyramid, locale }: ProductNotesProps) {
  const labels = LABELS[locale];

  const groups = [
    {
      id: "top",
      title: labels.top,
      notes: cleanNotes(pyramid?.top),
    },
    {
      id: "heart",
      title: labels.heart,
      notes: cleanNotes(pyramid?.heart),
    },
    {
      id: "base",
      title: labels.base,
      notes: cleanNotes(pyramid?.base),
    },
  ].filter((group) => group.notes.length > 0);

  if (groups.length === 0) return null;

  return (
    <section
      aria-labelledby="product-notes-heading"
      className="bg-background w-full px-5 pt-12 pb-12 md:pt-16 md:pb-16 lg:pt-16 lg:pb-20"
    >
      <div className="mx-auto w-full max-w-[1440px]">
        <h2
          id="product-notes-heading"
          className="font-magister text-center text-[28px] leading-tight font-normal text-neutral-900 md:text-[34px]"
        >
          {labels.title}
        </h2>

        <div
          className={[
            "mt-14 grid grid-cols-1 items-start gap-y-12",
            "md:mt-20 md:gap-x-12 lg:mt-24 lg:gap-x-20",
            COLUMNS_CLASS[groups.length],
          ].join(" ")}
        >
          {groups.map((group) => (
            <div
              key={group.id}
              className="mx-auto w-full max-w-[340px] text-center"
            >
              <h3 className="font-garamond! text-base leading-normal font-medium tracking-[0.08em] text-neutral-600 uppercase">
                {group.title}
              </h3>

              <p className="font-garamond mt-5 text-2xl leading-relaxed font-normal text-neutral-900 lg:text-[28px]">
                {group.notes.join(", ")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
