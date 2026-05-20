"use client";

import Link from "next/link";
import SmoothImage from "../ui/SmoothImage";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname, getUiLabels } from "@/lib/i18n/uiLabels";

interface AboutSectionProps {
  imageSrc?: string;
  imageAlt?: string;
  title?: string;
  description?: string;
  descriptions?: string[];
  ctaHref?: string;
  ctaLabel?: string;
  reverse?: boolean; 
}

export default function AboutSection({
  imageSrc = "/hero/story.jpg", 
  imageAlt,
  title,
  description,
  ctaHref = "/about",
  ctaLabel,
  descriptions,
  // True = Imagen a la izquierda, Texto a la derecha (Como en "The Luxury Collection")
  reverse = true, 
}: AboutSectionProps) {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const labels = getUiLabels(locale).sections.aboutDefaults;

  const resolvedImageAlt = imageAlt ?? labels.imageAlt;
  const resolvedTitle = title ?? labels.title ?? "Our Story";
  const resolvedDescription = description ?? labels.description;
  const resolvedCtaLabel = ctaLabel ?? labels.ctaLabel ?? "Discover Our Story";

  const imageOrder = reverse ? "lg:order-1" : "lg:order-2";
  const textOrder = reverse ? "lg:order-2" : "lg:order-1";

  return (
    <section className="w-full bg-background px-4 pt-12 pb-20 md:px-6 md:pt-16 md:pb-24">
      <div className="grid w-full grid-cols-1 items-stretch overflow-hidden lg:grid-cols-2 lg:min-h-[620px] xl:min-h-[700px]">
        
        {/* COLUMNA IMAGEN: A sangre 50% */}
        <div className={`relative w-full min-h-[380px] md:min-h-[460px] lg:min-h-full ${imageOrder}`}>
          <SmoothImage
            src={imageSrc}
            alt={resolvedImageAlt}
            fill
            sizes="(min-width:1024px) 50vw, 100vw"
            className="object-cover"
            loading="lazy"
            priority={false}
            decoding="async"
          />
        </div>

        {/* COLUMNA TEXTO: Padding asimétrico idéntico al CollectionsShowcase */}
        <div className={`flex w-full flex-col justify-center px-6 py-10 md:px-10 md:py-12 ${
          reverse 
            // Si el texto está a la derecha: padding a la izquierda para separarlo de la foto
            ? "lg:pl-14 lg:pr-8 xl:pl-20" 
            // Si el texto está a la izquierda: padding a la derecha para separarlo de la foto
            : "lg:pr-14 lg:pl-8 xl:pr-20"
        } ${textOrder}`}>
          
          {/* CONTENEDOR INTERNO: mr-auto / ml-auto ancla el bloque de texto cerca de la imagen */}
          <div className={`w-full max-w-[440px] ${reverse ? "mr-auto" : "ml-auto"}`}>
            <span className="mb-4 block text-[10px] font-light tracking-[0.3em] text-neutral-400 uppercase md:text-xs">
              Savoir-Faire
            </span>

            <h2 className="font-serif mb-6 text-3xl font-light leading-tight tracking-[0.08em] text-neutral-900 uppercase md:text-4xl lg:text-5xl">
              {resolvedTitle}
            </h2>

            <div className="flex flex-col gap-5">
              {descriptions && descriptions.length > 0 ? (
                descriptions.map((para, idx) => (
                  <p key={idx} className="font-garamond text-base leading-relaxed text-neutral-600 md:text-lg">
                    {para}
                  </p>
                ))
              ) : (
                <p className="font-garamond text-base leading-relaxed text-neutral-600 md:text-lg">
                  {resolvedDescription}
                </p>
              )}
            </div>

            <div className="mt-12">
              <Link
                href={ctaHref}
                className="inline-block border border-neutral-900 bg-transparent px-9 py-3.5 text-xs font-medium tracking-[0.22em] text-neutral-900 uppercase transition-colors duration-300 hover:bg-neutral-900 hover:text-white"
              >
                {resolvedCtaLabel}
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}