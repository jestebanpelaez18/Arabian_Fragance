import Link from "next/link";
import Image from "next/image";

export default function MegaMenu({ open }: { open: boolean }) {
  return (
    <div
      id="shop-panel"
      className={`fixed top-14 right-0 left-0 z-[9990] transition-[opacity,visibility] duration-150 ${
        open ? "visible opacity-100" : "invisible opacity-0"
      }`}
      role="dialog"
      aria-hidden={!open}
    >
      <div className="w-[min(92vw,980px)] rounded-lg border border-white/10 bg-[var(--background)] shadow-2xl">
        <div className="grid grid-cols-12 gap-8 p-8">
          <div className="col-span-8 grid grid-cols-2 gap-8">
            <div>
              <p className="mb-4 text-[11px] tracking-[0.18em] text-white/60 uppercase">Shop</p>
              <ul className="space-y-3 text-white/90">
                <li><Link href="/shop" className="nav-link inline-block">Shop All</Link></li>
                <li><Link href="/shop/women" className="nav-link inline-block">Women</Link></li>
                <li><Link href="/shop/men" className="nav-link inline-block">Men</Link></li>
                <li><Link href="/shop/unisex" className="nav-link inline-block">Unisex</Link></li>
                <li><Link href="/shop/gifts" className="nav-link inline-block">Gifts</Link></li>
              </ul>
            </div>
            <div>
              <p className="mb-4 text-[11px] tracking-[0.18em] text-white/60 uppercase">Highlights</p>
              <ul className="space-y-3 text-white/90">
                <li><Link href="/shop?tag=best" className="nav-link inline-block">Best Sellers</Link></li>
                <li><Link href="/shop?note=Woody" className="nav-link inline-block">Woody Notes</Link></li>
              </ul>
            </div>
          </div>
          <div className="col-span-4">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md border border-white/10">
              <Image
                src="/shop/hero-unisex.jpg"
                alt="Arabian Fragrance – Shop"
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}