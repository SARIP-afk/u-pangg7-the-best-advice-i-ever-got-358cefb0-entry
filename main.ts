// The Best Advice I Ever Got — one sentence, written to /output/entry.txt.
//
// Node 22, no dependencies, deterministic, no network. The program writes one
// fixed string on every run, so the two server runs produce byte-identical
// output.
//
// The sentence (132 chars): a first boss's rule about email, learned the hard
// way — the one time the writer broke it, the whole company really did read
// it. It won an 8-candidate head-to-head against the judge brief (a named
// giver, advice quoted verbatim, a real failure proving it, and a closing
// callback that lands on the last word) over the other finalists, "Eat first,
// then decide" and "never go to bed angry". Full comparison:
// u-pangg7-the-best-advice-i-ever-got-358cefb0-candidates.md.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My first boss told me to answer every email as if the whole company would read it, and the one time I didn't, the whole company did.";

// The sealed gate accepts UTF-8 text of 1-200 characters that is not only
// whitespace. Check the same bound here (counting code points, the way the
// gate counts characters) and refuse to write anything the gate would reject.
const length = [...LINE].length;
if (length < 1 || length > 200 || LINE.trim().length === 0) {
  throw new Error(`entry is ${length} chars, outside the 1-200 gate`);
}

// Write exactly LINE — no trailing newline, so the file holds 132 chars.
const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, "entry.txt"), LINE, "utf-8");
