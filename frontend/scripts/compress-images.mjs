import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const dir = path.join(process.cwd(), "public", "images");
const files = await readdir(dir);

for (const file of files) {
  if (!/\.(jpe?g|webp)$/i.test(file)) continue;
  const target = path.join(dir, file);
  const before = (await readFile(target)).length;
  const output = await sharp(target)
    .rotate()
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();
  await writeFile(target, output);
  const saved = Math.round((1 - output.length / before) * 100);
  console.log(`${file}: ${Math.round(before / 1024)}KB → ${Math.round(output.length / 1024)}KB (−${saved}%)`);
}