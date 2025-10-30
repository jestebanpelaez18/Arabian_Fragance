import { promises as fs } from "node:fs";
import path from "node:path";
import { PRODUCTS } from "@/data/products";

const FILE = path.join(process.cwd(), "stock.dev.json");

async function readJSON<T>(file: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(file, "utf8");
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

// Crea/actualiza el snapshot si falta algún id nuevo del catálogo
export async function ensureFile() {
  const snapshot: Record<string, number> = await readJSON(FILE, {});
  let changed = false;
  for (const p of PRODUCTS) {
    if (!(p.id in snapshot)) {
      snapshot[p.id] = p.stock ?? 0;
      changed = true;
    }
  }
  if (changed) {
    await fs.writeFile(FILE, JSON.stringify(snapshot, null, 2), "utf8");
  } else {
    // si no cambió nada pero el archivo no existe, escríbelo
    try {
      await fs.access(FILE);
    } catch {
      await fs.writeFile(FILE, JSON.stringify(snapshot, null, 2), "utf8");
    }
  }
}

export async function getStockMap(): Promise<Record<string, number>> {
  await ensureFile();
  const raw = await fs.readFile(FILE, "utf8");
  return JSON.parse(raw);
}

export async function setStockMap(map: Record<string, number>) {
  await fs.writeFile(FILE, JSON.stringify(map, null, 2), "utf8");
}

export async function get(id: string): Promise<number> {
  const map = await getStockMap();
  return map[id] ?? 0;
}

// Decremento estricto: lanza error si no hay stock suficiente (úsalo en flows “fuertes”)
export async function decrementStrict(id: string, qty: number) {
  const q = Math.max(1, Math.floor(qty || 0));
  const map = await getStockMap();
  const cur = map[id] ?? 0;
  if (q > cur) throw new Error(`Insufficient stock for ${id}`);
  map[id] = cur - q;
  await setStockMap(map);
  return map[id];
}

// Decremento “seguro” para webhook: nunca lanza; si falta stock, deja en 0
export async function decrementSafe(id: string, qty: number) {
  const q = Math.max(1, Math.floor(qty || 0));
  const map = await getStockMap();
  const cur = map[id] ?? 0;
  const next = Math.max(0, cur - q);
  map[id] = next;
  await setStockMap(map);
  return next;
}
