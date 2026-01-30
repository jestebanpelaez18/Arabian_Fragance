"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // 1. Comprobar si ya existe la cookie de consentimiento
    const consent = localStorage.getItem("cookie_consent");

    // 2. Si no existe, mostramos el banner tras un pequeño retraso (para que la web cargue primero)
    if (!consent) {
      const timer = setTimeout(() => setShowBanner(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    // Guardamos la decisión en el navegador del usuario
    localStorage.setItem("cookie_consent", "true");
    setShowBanner(false);

    // AQUÍ es donde en el futuro activarías Google Analytics/Pixel
    // window.gtag('consent', 'update', { ... })
  };

  const handleDecline = () => {
    localStorage.setItem("cookie_consent", "false");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div
      className="fixed right-0 bottom-0 left-0 z-50 flex flex-col items-center justify-between gap-4 border-t border-[var(--gold)]/20 bg-[#F9F8F6] px-6 py-6 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] md:flex-row md:px-12 md:py-5"
      style={{ animation: "slideUp 0.5s ease-out" }}
    >
      {/* Texto Legal */}
      <div className="max-w-4xl text-center md:text-left">
        <p className="font-garamond text-base leading-relaxed text-[var(--ink)] md:text-lg">
          We use cookies to ensure you get the best experience on our digital
          boutique. By continuing, you accept our{" "}
          <Link
            href="/policies/privacy-policy"
            className="border-b border-[var(--gold)]/50 pb-0.5 text-[var(--ink)] transition-colors hover:text-[var(--gold)]"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>

      {/* Botones */}
      <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center">
        <button
          onClick={handleAccept}
          className="font-bodoni bg-[var(--ink)] px-8 py-3 text-xs tracking-[0.15em] whitespace-nowrap text-white uppercase transition-all hover:bg-[var(--gold)]"
        >
          Accept
        </button>

        <button
          onClick={handleDecline}
          className="font-bodoni px-4 py-2 text-xs tracking-[0.15em] whitespace-nowrap text-[var(--ink)] uppercase opacity-60 transition-opacity hover:opacity-100"
        >
          Decline
        </button>
      </div>

      {/* Estilo inline para la animación de entrada */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
