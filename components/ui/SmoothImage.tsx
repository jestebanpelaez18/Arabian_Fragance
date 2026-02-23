"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

export default function SmoothImage({
  alt,
  src,
  className,
  ...props
}: ImageProps) {
  const [isLoading, setLoading] = useState(true);

  return (
    <Image
      alt={alt}
      src={src}
      className={`duration-700 ease-in-out ${
        isLoading
          ? "scale-105 bg-black/5 blur-lg grayscale" // Mientras carga: zoom sutil, borroso y un gris muuuuy clarito
          : "blur-0 scale-100 bg-transparent grayscale-0" // Cargado: nítido y transparente
      } ${className || ""}`}
      onLoad={() => setLoading(false)}
      {...props}
    />
  );
}
