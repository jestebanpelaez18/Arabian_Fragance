import Link from "next/link";
import NavCartTrigger from "@/components/nav/NavCartTrigger";

export default function NavRight({ openShop }: any) {
  return (
    <>
      {/* Right (desktop) */}
      <div className="hidden items-center justify-end gap-6 text-sm text-white lg:flex">
        <Link href="/search" className="nav-link">
          Search
        </Link>
        <Link href="/account" className="nav-link">
          Account
        </Link>
        <NavCartTrigger />
      </div>
      {/* Cart (mobile) */}
      <div className="flex items-center justify-self-end md:hidden">
        <NavCartTrigger />
      </div>
      {/* Right spacer (mobile symmetry) */}
      <div className="justify-self-end lg:hidden" aria-hidden="true">
        <span className="block h-6 w-6" />
      </div>
    </>
  );
}