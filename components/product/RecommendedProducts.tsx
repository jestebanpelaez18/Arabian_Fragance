import Link from "next/link";
import Image from "next/image";
import { PRODUCTS, type Product } from "@/data/products";
import SectionDivider from "../ui/SectionDivider";

function ProductCard({ p }: { p: Product }) {
  const href = `/product/${p.slug ?? p.id}`;

  return (
    <article className="group flex flex-col">
      <Link
        href={href}
        className="relative block aspect-[3/4] overflow-hidden rounded-sm bg-white ring-1 ring-black/10"
      >
        <Image
          src={p.image ?? p.images?.[0] ?? "/catalog/Bottle_3.png"}
          alt={p.name}
          fill
          sizes="(min-width:1280px) 25vw, (min-width:768px) 33vw, 50vw"
          className="object-contain p-8 transition-transform duration-300 group-hover:scale-[1.02] md:p-10 lg:p-12"
          priority={false}
        />
      </Link>

      <div className="mt-2.5 text-center">
        <Link
          href={href}
          className="font-playfair-display mt-4 text-[15px] tracking-wide text-black/90 transition-colors group-hover:text-[var(--gold)]"
        >
          {p.name}
        </Link>
        <p className="mt-0.5 text-[13px] text-black/70">{p.price} EUR</p>
      </div>
    </article>
  );
}

type Props = {
  currentSlug: string;
  currentNotes?: string[];
  gender?: string;
};

export default function RecommendedProducts({
  currentSlug,
  currentNotes,
  gender,
}: Props) {
  const currentNotesSet = currentNotes ? new Set(currentNotes) : undefined;
  const recommended = PRODUCTS.filter(
    (p) =>
      p.slug !== currentSlug &&
      p.status === "active" &&
      ((gender && p.gender === gender) ||
        (currentNotesSet && p.notes?.some((n) => currentNotesSet.has(n)))),
  ).slice(0, 4);

  if (!recommended.length) return null;

  return (
    <section className="pb-12 md:pb-15">
      <SectionDivider text="You may also like" />

      <div className="grid grid-cols-2 gap-x-2.5 gap-y-6 px-5 md:grid-cols-4 md:gap-x-5">
        {recommended.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </section>
  );
}
