"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { searchProductsAction, getTrendingProducts } from "@/lib/shopify/actions";

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

export default function SearchOverlay({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [trending, setTrending] = useState<any[]>([]); // State for trending products
  const debouncedTerm = useDebounce(term, 500);

  // Load top products in the initial menu (trending products)
  useEffect(() => {
    async function loadTrending() {
        const trendingProducts = await getTrendingProducts();
        setTrending(trendingProducts);
    }
    loadTrending();
  }, []);

  useEffect(() => {
    async function fetchResults() {
      if (debouncedTerm.length < 2) {
        setResults([]);
        return;
      }
      setLoading(true);
      try {
        const products = await searchProductsAction(debouncedTerm);
        setResults(products);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchResults();
  }, [debouncedTerm]);

  // Bloquear scroll + Autofocus
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const input = document.getElementById("search-input");
      if (input) input.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* BACKDROP OSCURO (Cierra al hacer click fuera) */}
      <div
        className="fixed inset-0 z-[9990] bg-black/40 transition-opacity duration-300"
        onClick={onClose}
        style={{ top: "60px" }} // Ajusta a la altura de tu navbar
      />

      {/* PANEL PRINCIPAL */}
      <div
        className="animate-in slide-in-from-top-2 fixed right-0 left-0 z-[9999] flex flex-col overflow-hidden bg-[#F2F0EB] text-[#1a1a1a] shadow-2xl duration-300"
        style={{ top: "57px" }}
      >
        {/* --- 1. SEARCH BAR (Input limpia) --- */}
        <div className="w-full px-6 pt-10 pb-6 md:px-12">
          <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between border-b border-[#1a1a1a]/20 pb-4">
            <div className="flex flex-1 items-center gap-6">
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>

              <input
                id="search-input"
                type="text"
                placeholder="Search..."
                className="font-garamond w-full bg-transparent text-3xl text-[#1a1a1a] placeholder:text-gray-400 focus:outline-none"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                autoComplete="off"
              />
            </div>

            {/* Botón Cerrar */}
            <button
              onClick={onClose}
              className="ml-4 p-2 text-[#1a1a1a] transition-transform hover:rotate-90 hover:opacity-70"
            >
              <svg
                className="h-6 w-6 font-light"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* --- 2. CONTENIDO (Layout Armónico) --- */}
        <div className="px-6 pb-16 md:px-12 md:pb-20">
          {" "}
          {/* Padding inferior generoso para evitar corte */}
          <div className="mx-auto max-w-[1200px]">
            {loading ? (
              <div className="font-bodoni animate-pulse py-20 text-center text-xs tracking-widest text-gray-400 uppercase">
                Searching...
              </div>
            ) : term.length > 0 ? (
              /* --- RESULTADOS DE BÚSQUEDA --- */
              <div className="mt-8">
                {results.length > 0 ? (
                  // Grid de 4 columnas con espacio moderado (gap-6) para que las imágenes sean grandes
                  <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                    {results.slice(0, 4).map((product) => (
                      <Link
                        href={`/product/${product.handle}`}
                        key={product.id}
                        onClick={onClose}
                        className="group block"
                      >
                        <div className="relative mb-4 aspect-[4/5] w-full overflow-hidden bg-white shadow-sm transition-shadow duration-300 group-hover:shadow-md">
                          <Image
                            src={
                              product.featuredImage?.url ||
                              "/catalog/Bottle_3.png"
                            }
                            alt={
                              product.featuredImage?.altText || product.title
                            }
                            fill
                            className="object-cover transition duration-700 ease-out group-hover:scale-105"
                          />
                        </div>
                        <h3 className="font-bodoni text-center text-xs tracking-widest text-[#1a1a1a] uppercase transition-colors group-hover:text-[#C9A46A]">
                          {product.title}
                        </h3>
                        <p className="font-garamond mt-1 text-center text-sm text-gray-500">
                          {parseFloat(product.priceRange?.minVariantPrice?.amount)}{" "}
                          {product.priceRange?.minVariantPrice?.currencyCode}
                        </p>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <p className="font-garamond text-xl text-gray-400">
                      No results for "{term}"
                    </p>
                  </div>
                )}
              </div>
            ) : (
              /* --- MENÚ INICIAL (TRENDING & TOP PRODUCTS) --- */
              // Usamos un Grid con proporción 1/4 (Izq) y 3/4 (Der)
              <div className="mt-8 grid grid-cols-1 gap-12 md:grid-cols-[250px_1fr]">
                {/* COLUMNA IZQUIERDA: Trending */}
                <div className="hidden h-full border-r border-[#1a1a1a]/10 pr-8 md:block">
                  <h4 className="font-bodoni mb-6 text-xs font-bold tracking-widest text-[#1a1a1a] uppercase">
                    Trending
                  </h4>
                  <ul className="space-y-4">
                    {[
                      "Oud Collection",
                      "Summer Scents",
                      "Gift Sets",
                      "New Arrivals",
                    ].map((item) => (
                      <li key={item}>
                        <button
                          onClick={() => setTerm(item)}
                          className="font-garamond text-left text-lg text-[#1a1a1a]/80 transition-colors hover:text-[#C9A46A]"
                        >
                          {item}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* COLUMNA DERECHA: Top Products */}
                <div>
                  <h4 className="font-bodoni mb-6 text-xs font-bold tracking-widest text-[#1a1a1a] uppercase">
                    Top Products
                  </h4>

                  {trending.length > 0 ? (
                    <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
                      {trending.map((product) => (
                        <Link
                          href={`/product/${product.handle}`}
                          key={product.id}
                          onClick={onClose}
                          className="group cursor-pointer"
                        >
                            <div className="relative mb-3 aspect-square w-full overflow-hidden bg-[#EAE8E4]">
                              <Image
                                src={product.featuredImage?.url || "/catalog/Bottle_3.png"}
                                alt={product.title}
                                fill
                                className="object-cover transition-opacity duration-500 group-hover:opacity-90"
                              />
                           </div>
                           <div className="text-center">
                             <p className="font-bodoni text-xs font-bold uppercase tracking-widest text-[#1a1a1a] truncate">
                               {product.title}
                             </p>
                             <p className="font-garamond text-xs text-gray-500 mt-1">
                               {parseFloat(product.priceRange?.minVariantPrice?.amount)} {product.priceRange?.minVariantPrice?.currencyCode}
                             </p>
                           </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-4 opacity-50">
                        {[1,2,3].map(i => (
                          <div key={i} className="aspect-square bg-gray-200 animate-pulse"></div>
                        ))}
                     </div>
                  )}
                  </div>
                </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
