import Link from "next/link";
import SmoothImage from "../ui/SmoothImage";
import { type Product } from "@/data/products";
import {
  formatProductDetailLabel,
  getIntensityLevel,
} from "@/lib/shopify/product-display";

const INTENSITY_STEPS = [1, 2, 3, 4] as const;

export default function ProductCard({ p }: { p: Product }) {
  const href = `/product/${p.slug ?? p.id}`;
  const cardImage =
    p.images?.[1] || p.images?.[0] || p.image || "/catalog/Bottle_3.png";
  const intensityLevel = getIntensityLevel(p.concentration);
  const detailLabel = formatProductDetailLabel(p);

  return (
    <article data-testid="product-card" className="group flex flex-col">
      <Link
        href={href}
        aria-label={p.name}
        className="group bg-background relative block aspect-4/5 w-full overflow-hidden"
      >
        <SmoothImage
          src={cardImage}
          alt={p.name}
          fill
          sizes="(min-width:1280px) 25vw, (min-width:768px) 33vw, 50vw"
          className="object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
        />
      </Link>

      <div className="mt-4 flex flex-col items-center px-1 text-center">
        <Link
          href={href}
          className="font-magister text-sm leading-snug font-medium tracking-wide text-neutral-900 transition-colors duration-300 group-hover:text-neutral-500 md:text-sm"
        >
          {p.name}
        </Link>

        <p className="font-garamond mt-2 max-w-[280px] text-xs tracking-wide text-neutral-600 md:text-sm">
          {detailLabel}
        </p>

        <div className="mt-3 flex items-center gap-2.5 text-[10px] md:text-xs">
          <span className="font-garamond tracking-[0.05em] text-neutral-500">
            Intensity
          </span>
          <span className="inline-flex gap-1.5">
            {INTENSITY_STEPS.map((step) => (
              <span
                key={step}
                className={`h-[5px] w-2 transition-colors duration-500 ${
                  step <= intensityLevel ? "bg-neutral-700" : "bg-neutral-200"
                }`}
              />
            ))}
          </span>
        </div>

        <p className="mt-3 font-serif text-xs font-light tracking-[0.06em] text-neutral-800 md:text-sm">
          {p.price} EUR
        </p>
      </div>
    </article>
  );
}
