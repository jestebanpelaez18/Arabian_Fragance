import Link from "next/link";
import SmoothImage from "../ui/SmoothImage";
import { type Product } from "@/data/products";

type ConcentrationFamily =
  | "extrait"
  | "parfum"
  | "eau_de_parfum"
  | "eau_de_toilette"
  | "eau_de_cologne"
  | "mist";

function extractConcentrationPercent(rawConcentration?: string) {
  const normalized = rawConcentration?.trim().toLowerCase();
  if (!normalized) return null;

  const percentageMatch = normalized.match(/(\d+(?:[.,]\d+)?)/);
  if (!percentageMatch) return null;

  const parsed = Number(percentageMatch[1].replace(",", "."));
  return Number.isNaN(parsed) ? null : parsed;
}

function getFamilyFromPercent(percent: number): ConcentrationFamily {
  if (percent >= 30) return "extrait";
  if (percent >= 22) return "parfum";
  if (percent >= 15) return "eau_de_parfum";
  if (percent >= 8) return "eau_de_toilette";
  if (percent >= 3) return "eau_de_cologne";
  return "mist";
}

function inferConcentrationFamily(rawConcentration?: string): ConcentrationFamily {
  const normalized = rawConcentration?.trim().toLowerCase();
  if (!normalized) return "eau_de_parfum";

  const explicitPercent = extractConcentrationPercent(normalized);
  if (explicitPercent !== null) {
    return getFamilyFromPercent(explicitPercent);
  }

  if (normalized.includes("extrait")) return "extrait";
  if (
    normalized.includes("eau de parfum") ||
    normalized.includes("edp")
  ) {
    return "eau_de_parfum";
  }
  if (
    normalized.includes("eau de toilette") ||
    normalized.includes("edt")
  ) {
    return "eau_de_toilette";
  }
  if (
    normalized.includes("eau de cologne") ||
    normalized.includes("edc") ||
    normalized.includes("cologne")
  ) {
    return "eau_de_cologne";
  }
  if (
    normalized.includes("parfum") ||
    normalized.includes("perfume")
  ) {
    return "parfum";
  }
  if (
    normalized.includes("mist") ||
    normalized.includes("splash")
  ) {
    return "mist";
  }

  return "eau_de_parfum";
}

function formatConcentrationLabel(rawConcentration?: string) {
  const family = inferConcentrationFamily(rawConcentration);

  if (family === "extrait") return "Esprit de Parfum"; // Dior-esque high prestigeNaming
  if (family === "parfum") return "Parfum";
  if (family === "eau_de_toilette") return "Eau de Toilette";
  if (family === "eau_de_cologne") return "Eau de Cologne";
  if (family === "mist") return "Body Mist";

  return "Eau de Parfum";
}

function getIntensityLevel(rawConcentration?: string) {
  const family = inferConcentrationFamily(rawConcentration);

  if (family === "extrait" || family === "parfum") return 4;
  if (family === "eau_de_parfum") return 3;
  if (family === "eau_de_toilette") return 2;
  return 1;
}

function formatNoteProfile(notes?: Product["notes"]) {
  if (!notes || notes.length === 0) return "Signature Notes";

  const uniqueNotes = Array.from(new Set(notes.map((note) => note.trim()))).filter(Boolean);

  const adjectiveByNote: Partial<Record<NonNullable<Product["notes"]>[number], string>> = {
    Amber: "Ambery",
    Citrus: "Citrusy",
    Spice: "Spicy",
    Sweet: "Sweet",
    Floral: "Floral",
    Woody: "Woody",
    Musk: "Musky",
    Oud: "Oud",
    Fresh: "Fresh",
    Fruity: "Fruity",
    Leather: "Leather",
    Vanilla: "Vanilla",
    Smoky: "Smoky",
  };

  const toDescriptor = (note: string) =>
    adjectiveByNote[note as NonNullable<Product["notes"]>[number]] ?? note;

  if (uniqueNotes.length === 0) return "Signature Notes";
  if (uniqueNotes.length === 1) return `${toDescriptor(uniqueNotes[0])} Notes`;

  return `${toDescriptor(uniqueNotes[0])} and ${toDescriptor(uniqueNotes[1])} Notes`;
}

function formatGenderPrefix(gender?: Product["gender"]) {
  if (gender === "women") return "For Her ";
  if (gender === "men") return "For Him ";
  if (gender === "unisex") return "Unisex ";
  return "";
}

export default function ProductCard({ p }: { p: Product }) {
  const href = `/product/${p.slug ?? p.id}`;
  const cardImage = p.images?.[1] || p.images?.[0] || p.image || "/catalog/Bottle_3.png";
  const genderPrefix = formatGenderPrefix(p.gender);
  const concentrationLabel = formatConcentrationLabel(p.concentration);
  const intensityLevel = getIntensityLevel(p.concentration);
  const noteProfile = formatNoteProfile(p.notes);
  const detailLabel = `${genderPrefix}${concentrationLabel} – ${noteProfile}`;

  return (
    <article className="group flex flex-col">
      {/* Image Container */}
      <Link
        href={href}
        aria-label={p.name}
        className="group relative block aspect-[4/5] w-full overflow-hidden bg-background"
      >
        <SmoothImage
          src={cardImage}
          alt={p.name}
          fill
          sizes="(min-width:1280px) 25vw, (min-width:768px) 33vw, 50vw"
          className="object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
        />
      </Link>

      {/* Product Info Block: Tuned to match Dior's specific typography rhythm and sizing */}
      <div className="mt-4 flex flex-col items-center px-1 text-center">
        
        {/* Title: Uses Magister (font-serif), sized down exactly to 14px-16px limits */}
        <Link
          href={href}
          className="font-magister text-sm md:text-sm text-neutral-900 tracking-wide leading-snug transition-colors duration-300 group-hover:text-neutral-500 font-medium"
        >
          {p.name}
        </Link>

        {/* Details: Uses Garamond (font-garamond), contrast heightened to charcoal grey */}
        <p className="font-garamond mt-2 text-xs md:text-sm text-neutral-600 tracking-wide max-w-[280px]">
          {detailLabel}
        </p>

        {/* Intensity Blocks: Spaced tighter to avoid taking over the minimalist layout */}
        <div className="mt-3 flex items-center gap-2.5 text-[10px] md:text-xs">
          <span className="font-garamond text-neutral-500 tracking-[0.05em]">Intensity</span>
          <span className="inline-flex gap-1.5">
            {[1, 2, 3, 4].map((step) => (
              <span
                key={step}
                className={`h-[5px] w-2 transition-colors duration-500 ${
                  step <= intensityLevel ? "bg-neutral-700" : "bg-neutral-200"
                }`}
              />
            ))}
          </span>
        </div>

        {/* Price: Uses Magister (font-serif) with tracking to look expensive */}
        <p className="font-serif mt-3 text-xs md:text-sm tracking-[0.06em] text-neutral-800 font-light">
          {p.price} EUR
        </p>
      </div>
    </article>
  );
}