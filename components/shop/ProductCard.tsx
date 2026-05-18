import Link from "next/link";
import SmoothImage from "../ui/SmoothImage";
import { type Product } from "@/data/products";

function formatConcentrationLabel(rawConcentration?: string) {
  const normalized = rawConcentration?.trim().toLowerCase();

  if (!normalized) return "Eau de Parfum";

  if (normalized.includes("eau de parfum") || normalized.includes("edp")) {
    return "Eau de Parfum";
  }

  if (
    normalized.includes("parfum") ||
    normalized.includes("perfume") ||
    normalized.includes("extrait")
  ) {
    return "Parfum";
  }

  const percentageMatch = normalized.match(/(\d+(?:[.,]\d+)?)/);
  if (percentageMatch) {
    const parsed = Number(percentageMatch[1].replace(",", "."));
    if (!Number.isNaN(parsed)) {
      return parsed >= 25 ? "Parfum" : "Eau de Parfum";
    }
  }

  return "Eau de Parfum";
}

export default function ProductCard({ p }: { p: Product }) {
  const href = `/product/${p.slug ?? p.id}`;
  const cardImage = p.images?.[1] || p.images?.[0] || p.image || "/catalog/Bottle_3.png";
  const detailLabel = formatConcentrationLabel(p.concentration);

  return (
    <article className="group flex flex-col">
      {/* Image Container */}
      <Link
        href={href}
        aria-label={p.name}
        className="group relative block aspect-4/5 w-full overflow-hidden bg-background"
      >
        <SmoothImage
          src={cardImage}
          alt={p.name}
          fill
          sizes="(min-width:1280px) 25vw, (min-width:768px) 33vw, 50vw"
          className="object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
        />
      </Link>

      {/* Product Information Block - Elevated with professional luxury typography tracking */}
      <div className="mt-5 flex flex-col items-center text-center px-2">
        {/* Product Name: Changed to uppercase with spacing for an elite brand feel */}
        <Link
          href={href}
          className="font-serif text-xs md:text-sm text-gray-900 tracking-[0.18em] uppercase transition-colors duration-300 group-hover:text-gray-500"
        >
          {p.name}
        </Link>
        
        {/* Subtle detail label */}
        <p className="font-garamond mt-1.5 text-[11px] md:text-xs text-gray-400 uppercase tracking-[0.15em]">
          {detailLabel}
        </p>

        {/* Price: Clean, spaced out and distinct */}
        <p className="font-serif mt-3 text-xs font-light tracking-widest text-gray-800 md:text-sm">
          {p.price} EUR
        </p>
      </div>
    </article>
  );
}