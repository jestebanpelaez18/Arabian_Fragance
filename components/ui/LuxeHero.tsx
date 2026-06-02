"use client";

import SmoothImage from "./SmoothImage";
import Link from "next/link";
import { ReactNode, useEffect, useRef, useState } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const VIDEO_IN_VIEW_THRESHOLD = 0.4;

type Props = {
  title: ReactNode;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  imageSrc?: string;
  videoSrc?: string;
  poster?: string;
  objectClassName?: string; // e.g., "object-[50%_35%]"
  minH?: string; // e.g., "min-h-[90svh] md:min-h-screen"
  fit?: "contain" | "cover"; // media fit control
  centerContent?: boolean; // center content exactly
  imageAlt?: string;
  // Image optimization
  priority?: boolean; // controls if it is critical (default true)
  sizes?: string; // responsive sizes for fill
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  // Overlays
  overlaysEnabled?: boolean;
  softLightBlend?: boolean;
  // Video optimization
  autoPlayVideo?: boolean; // respects prefers-reduced-motion
  pauseVideoOffscreen?: boolean; // pauses if not visible
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
  // CRITICAL FIX: Changed default from "object-center" to shift focus down
  objectClassName = "object-[center_15%]",
  minH = "min-h-[80vh] md:min-h-screen", // Make it full screen on desktop by default
  fit = "cover",
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
  const hasVideo = Boolean(videoSrc);
  const hasImage = Boolean(imageSrc);
  const safeImageSrc = imageSrc ?? "";
  const shouldCenterContent = centerContent;
  const shouldShowSoftBlend = overlaysEnabled && softLightBlend;

  const mediaFitClass = fit === "cover" ? "object-cover" : "object-contain";
  const containerAlign = shouldCenterContent
    ? "items-center text-center"
    : "items-start text-left";
  const innerAlign = shouldCenterContent
    ? "items-center justify-center"
    : "items-start justify-center";
  const centeredClass = shouldCenterContent ? "mx-auto" : "";
  const sectionCenterClass = shouldCenterContent
    ? "grid place-items-center"
    : "";

  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [allowMotion, setAllowMotion] = useState(true);
  const [inView, setInView] = useState(true);

  const shouldPlayVideo = autoPlayVideo && allowMotion && inView;

  useEffect(() => {
    const mq = window.matchMedia(REDUCED_MOTION_QUERY);
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
      { threshold: VIDEO_IN_VIEW_THRESHOLD },
    );

    obs.observe(el);

    return () => obs.disconnect();
  }, [pauseVideoOffscreen]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    if (shouldPlayVideo) v.play().catch(() => {});
    else v.pause();
  }, [shouldPlayVideo]);

  return (
    <section
      ref={sectionRef}
      className={`relative w-full overflow-hidden bg-black ${minH} ${sectionCenterClass}`}
    >
      {/* Background media */}
      {hasVideo ? (
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
      ) : hasImage ? (
        <div className="absolute inset-0 bg-black">
          <SmoothImage
            src={safeImageSrc}
            alt={imageAlt}
            fill
            priority={priority}
            quality={88}
            sizes={sizes}
            placeholder={placeholder}
            blurDataURL={placeholder === "blur" ? blurDataURL : undefined}
            className={`${mediaFitClass} ${objectClassName}`}
          />
        </div>
      ) : null}

      {/* Overlays for a deep, rich "luxe" look */}
      {overlaysEnabled && (
        <>
          <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-black/60" />
          {shouldShowSoftBlend && (
            <div className="pointer-events-none absolute inset-0 bg-black/20 mix-blend-overlay" />
          )}
        </>
      )}

      {/* Content */}
      <div
        className={`relative z-10 mx-auto flex h-full max-w-5xl flex-col px-6 py-24 text-white ${containerAlign}`}
      >
        <div className={`flex flex-1 flex-col gap-6 ${innerAlign}`}>
          <h1 className="max-w-4xl font-serif text-4xl leading-tight tracking-widest text-white uppercase md:text-5xl lg:text-6xl">
            {title}
          </h1>
          {subtitle ? (
            <p
              className={`max-w-2xl font-serif text-base tracking-wide text-white/80 md:text-lg ${centeredClass}`}
            >
              {subtitle}
            </p>
          ) : null}
          {ctaHref && ctaLabel ? (
            <div className={`${centeredClass} mt-10`}>
              <Link
                href={ctaHref}
                // Redesigned Editorial Button: Thin border, no rounding, sharp hover
                className="inline-flex items-center border border-white bg-transparent px-10 py-4 text-xs font-medium tracking-[0.2em] text-white uppercase transition-colors duration-500 hover:bg-white hover:text-black"
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
