"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

export default function SmoothImage({ alt, src, className, ...props }: ImageProps) {
  const [isLoading, setLoading] = useState(true);

  return (
    <Image
      alt={alt}
      src={src}
      className={`duration-700 ease-in-out ${
        isLoading 
          ? "scale-105 blur-lg grayscale bg-black/5" // Mientras carga: zoom sutil, borroso y un gris muuuuy clarito
          : "scale-100 blur-0 grayscale-0 bg-transparent" // Cargado: nítido y transparente
      } ${className || ""}`}
      onLoad={() => setLoading(false)}
      {...props}
    />
  );
}