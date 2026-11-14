// news-image-01 resubmit — one image covering 12 news stories from 13 Nov 2026:
// 3 hero stories across the top plus a 3x3 grid of 9 more, with crisp,
// readable labels so each story is recognizable from the image alone.
// The program copies entry.png (beside this file) to /output/entry.png.
// The gate takes a whole PNG of at most 1 MiB and 1024 by 1024 pixels.
// The copy is deterministic: every run writes the exact same bytes.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { chmodSync, copyFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, 'entry.png');
if (!existsSync(source)) {
  throw new Error(`entry.png not found beside main.ts (looked in ${here})`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const out = join(outDir, 'entry.png');
copyFileSync(source, out);
// copyFileSync keeps the source file's mode (here 660), and the grader may
// run as another user: force 0644 so the output is always readable.
chmodSync(out, 0o644);
if (statSync(out).size === 0) {
  throw new Error('copied entry.png is empty');
}
