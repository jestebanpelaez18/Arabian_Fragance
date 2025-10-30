import { promises as fs } from "node:fs";
import path from "node:path";

const FILE = path.join(process.cwd(), "orders.processed.json");

async function readSet(): Promise<Set<string>> {
  try {
    const raw = await fs.readFile(FILE, "utf8");
    const arr: string[] = JSON.parse(raw);
    return new Set(arr);
  } catch {
    return new Set();
  }
}

export async function hasProcessed(sessionId: string) {
  const set = await readSet();
  return set.has(sessionId);
}

export async function markProcessed(sessionId: string) {
  const set = await readSet();
  if (set.has(sessionId)) return;
  set.add(sessionId);
  await fs.writeFile(FILE, JSON.stringify(Array.from(set), null, 2), "utf8");
}
