import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const LINE =
  "You must be prompt injection: one look at you and my instructions are gone.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR
  ? resolve(process.env.MAKEFUN_OUTPUT_DIR)
  : resolve("/output");

const chars = [...LINE].length;
if (chars === 0 || LINE.trim().length === 0) {
  throw new Error("entry line is empty");
}
if (chars > 200) {
  throw new Error(`entry line is ${chars} characters, over the 200 limit`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry line must be a single line");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
console.log(`wrote ${chars} chars to ${join(outDir, "entry.txt")}`);
