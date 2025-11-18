import Link from "next/link";
import Image from "next/image";

export default function NavCenter() {
  return (
    <div className="justify-self-center">
      <Link
        href="/"
        aria-label="Arabian Fragrance — Inicio"
        className="inline-flex items-center"
      >
        <span className="hidden md:inline-flex">
          <Image
            src="/logo/AFC-logo-wordmark-light.svg"
            alt="Arabian Fragrance"
            width={140}
            height={30}
            priority
            className="h-5 w-auto select-none"
          />
        </span>
        <span className="inline-flex md:hidden">
          <Image
            src="/logo/AFC-logo-mark-light.svg"
            alt="Arabian Fragrance"
            width={36}
            height={36}
            priority
            className="h-9 w-9 select-none"
          />
        </span>
      </Link>
    </div>
  );
}
