"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Product } from "@/data/products";

export type CartItem = Pick<Product, "id" | "slug" | "name" | "price"> & {
  image?: string | null;
  qty: number;
};

type CartState = {
  items: CartItem[];

  count: () => number;      
  subtotal: () => number;   
  getQty: (id: string) => number;

  add: (p: Pick<Product, "id" | "slug" | "name" | "price"> & { image?: string | null }, qty?: number) => void;
  remove: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
};

const STORAGE_KEY = "af-cart-v1";

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      count: () => get().items.reduce((sum, it) => sum + it.qty, 0),
      subtotal: () => get().items.reduce((s, it) => s + it.price * it.qty, 0),
      getQty: (id) => get().items.find((i) => i.id === id)?.qty ?? 0,

      // Acciones
      add: (product, qty = 1) =>
        set((state) => {
          const idx = state.items.findIndex((i) => i.id === product.id);
          if (idx === -1) {
            return { items: [...state.items, { ...product, qty }] };
          }
          const items = [...state.items];
          items[idx] = { ...items[idx], qty: items[idx].qty + qty };
          return { items };
        }),

      remove: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

      updateQty: (id, qty) =>
        set((state) => {
          if (qty <= 0) return { items: state.items.filter((i) => i.id !== id) };
          const items = state.items.map((i) => (i.id === id ? { ...i, qty } : i));
          return { items };
        }),

      clear: () => set({ items: [] }),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage), // persistencia en localStorage
      partialize: (state) => ({ items: state.items }),
      version: 1,
    }
  )
);

// Evita hydration mismatch si lees derivadas en el primer render
import { useEffect, useState } from "react";
export function useCartReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  return ready;
}
