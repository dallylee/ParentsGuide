import { cp, mkdir } from "node:fs/promises";
import path from "node:path";

const src = path.resolve(process.cwd(), "..", "content");
const dst = path.resolve(process.cwd(), "public", "content");

await mkdir(dst, { recursive: true });
await cp(src, dst, { recursive: true });

console.log(`Copied content from ${src} to ${dst}`);
