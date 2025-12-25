"use client";

import Image from "next/image";
import Link from "next/link";
import { ReactNode, useEffect, useRef, useState } from "react";

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
  imageAlt?: string;
  // Optimización imagen
  priority?: boolean; // controla si es crítica (por defecto true)
  sizes?: string; // tamaños responsivos para fill
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  // Overlays
  overlaysEnabled?: boolean;
  softLightBlend?: boolean;
  // Optimización video
  autoPlayVideo?: boolean; // respeta prefers-reduced-motion
  pauseVideoOffscreen?: boolean; // pausa si no está visible
  videoPreload?: "auto" | "metadata" | "none";
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
  imageAlt = "",
  priority = true,
  sizes = "(max-width: 768px) 100vw, 100vw",
  placeholder = "empty",
  blurDataURL,
  overlaysEnabled = true,
  softLightBlend = true,
  autoPlayVideo = true,
  pauseVideoOffscreen = true,
  videoPreload = "metadata",
}: Props) {
  const mediaFitClass = fit === "cover" ? "object-cover" : "object-contain";
  const containerAlign = centerContent
    ? "items-center text-center"
    : "items-start text-left";
  const innerAlign = centerContent
    ? "items-center justify-center"
    : "items-start justify-center";

  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [allowMotion, setAllowMotion] = useState(true);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setAllowMotion(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!pauseVideoOffscreen) return;
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [pauseVideoOffscreen]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const shouldPlay = autoPlayVideo && allowMotion && inView;
    if (shouldPlay) v.play().catch(() => {});
    else v.pause();
  }, [autoPlayVideo, allowMotion, inView]);

  return (
    <section
      ref={sectionRef}
      className={`relative w-full overflow-hidden ${minH} ${centerContent ? "grid place-items-center" : ""}`}
    >
      {/* Background media */}
      {videoSrc ? (
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full ${objectClassName} ${mediaFitClass}`}
          muted
          loop
          playsInline
          preload={videoPreload}
          poster={poster}
          aria-hidden={true}
          tabIndex={-1}
        >
          <source src={videoSrc} />
        </video>
      ) : imageSrc ? (
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority={priority}
          sizes={sizes}
          placeholder={placeholder}
          blurDataURL={placeholder === "blur" ? blurDataURL : undefined}
          className={`${mediaFitClass} ${objectClassName}`}
        />
      ) : null}

      {/* Overlays para look “luxe” */}
      {overlaysEnabled && (
        <>
          <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/45 via-black/20 to-black/45" />
          {softLightBlend && (
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_50%_at_50%_30%,rgba(255,255,255,0.08),transparent_60%)] mix-blend-soft-light" />
          )}
        </>
      )}

      {/* Content */}
      <div
        className={`relative z-10 mx-auto flex min-h-[80vh] max-w-5xl flex-col px-6 text-white ${containerAlign}`}
      >
        <div className={`flex flex-1 flex-col gap-4 ${innerAlign}`}>
          <h1 className="font-garamond text-shadow-soft text-3xl leading-tight tracking-[0.04em] md:text-5xl lg:text-6xl">
            {title}
          </h1>
          {subtitle ? (
            <p
              className={`font-garamond max-w-2xl text-base text-white/85 md:text-lg ${centerContent ? "mx-auto" : ""}`}
            >
              {subtitle}
            </p>
          ) : null}
          {ctaHref && ctaLabel ? (
            <div className={`${centerContent ? "mx-auto" : ""} mt-8`}>
              <Link
                href={ctaHref}
                className="ease-luxe inline-flex h-11 items-center rounded-full border border-white/55 bg-white/10 px-6 text-sm tracking-[0.18em] text-white/95 uppercase backdrop-blur-sm hover:bg-white/20 hover:shadow-[0_10px_30px_rgba(0,0,0,.25)] motion-safe:transition-all motion-safe:duration-300"
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
