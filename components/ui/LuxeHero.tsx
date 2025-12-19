import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  title: ReactNode;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  imageSrc?: string;
  videoSrc?: string;
  poster?: string;
  objectClassName?: string; // ej: "object-[50%_35%]"
  minH?: string; // ej: "min-h-[90svh] md:min-h-screen"
  fit?: "contain" | "cover"; // control del ajuste de media
  centerContent?: boolean; // centrar contenido exactamente
};

export default function LuxeHero({
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  imageSrc,
  videoSrc,
  poster,
  objectClassName = "object-center",
  minH = "min-h-[80vh]",
  fit = "cover", // default como en ShowroomHero (llena el área)
  centerContent = true,
}: Props) {
  const mediaFitClass = fit === "cover" ? "object-cover" : "object-contain";
  const containerAlign = centerContent ? "items-center text-center" : "items-start text-left";
  const innerAlign = centerContent ? "items-center justify-center" : "items-start justify-center";

  return (
    <section
      className={`relative w-full overflow-hidden ${minH} ${centerContent ? "grid place-items-center" : ""}`}
    >
      {/* Background media */}
      {videoSrc ? (
        <video
          className={`absolute inset-0 h-full w-full ${objectClassName} ${mediaFitClass}`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={poster}
        >
          <source src={videoSrc} />
        </video>
      ) : imageSrc ? (
        <Image
          src={imageSrc}
          alt=""
          fill
          priority
          sizes="100vw"
          className={`${mediaFitClass} ${objectClassName}`}
        />
      ) : null}

      {/* Overlays para look “luxe” */}
      <div className="absolute inset-0 bg-linear-to-b from-black/45 via-black/20 to-black/45" />
      <div className="absolute inset-0 bg-[radial-gradient(70%_50%_at_50%_30%,rgba(255,255,255,0.08),transparent_60%)] mix-blend-soft-light" />

      {/* Content */}
      <div className={`relative z-10 mx-auto flex min-h-[80vh] max-w-5xl flex-col px-6 text-white ${containerAlign}`}>
        <div className={`flex flex-1 flex-col gap-4 ${innerAlign}`}>
          <h1 className="font-garamond text-shadow-soft text-3xl leading-tight tracking-[0.04em] md:text-5xl lg:text-6xl">
            {title}
          </h1>
          {subtitle ? (
            <p className={`font-garamond max-w-2xl text-base text-white/85 md:text-lg ${centerContent ? "mx-auto" : ""}`}>
              {subtitle}
            </p>
          ) : null}
          {ctaHref && ctaLabel ? (
            <div className={`${centerContent ? "mx-auto" : ""} mt-8`}>
              <Link
                href={ctaHref}
                className="ease-luxe inline-flex h-11 items-center rounded-full border border-white/55 bg-white/10 px-6 text-sm tracking-[0.18em] text-white/95 uppercase backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:shadow-[0_10px_30px_rgba(0,0,0,.25)]"
              >
                {ctaLabel}
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
