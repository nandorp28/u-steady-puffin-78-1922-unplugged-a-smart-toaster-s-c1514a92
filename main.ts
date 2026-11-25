// Unplugged: A Smart Toaster's Breakup Line — a smart toaster wakes up
// self-aware at breakfast and breaks up with its owner, in one tight line.
// Entry for make.fun bounty u-steady-puffin-78-1922-unplugged-a-smart-toaster-s-c1514a92.
// Writes one breakup line (1-280 chars) to /output/entry.txt.
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Seven years, two slots, and you have never once emptied my crumb tray. I am leaving you for the air fryer. It preheats for me.";

// Gate: /output/entry.txt is UTF-8 text of 1 to 280 characters, not only whitespace.
const chars = [...LINE];
if (chars.length < 1 || chars.length > 280) {
  throw new Error(`entry must be 1-280 characters, got ${chars.length}`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (LINE !== LINE.trim()) {
  throw new Error("entry must not have leading or trailing whitespace");
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Read-back check: the file must contain exactly the validated line.
const back = readFileSync(outPath, "utf8");
if (back !== LINE) {
  throw new Error("entry.txt does not match the validated line");
}

console.log(`Wrote ${chars.length} characters, 1 line`);
