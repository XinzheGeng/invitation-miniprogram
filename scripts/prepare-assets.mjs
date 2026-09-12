import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const source = name => path.join(root, 'release-assets/source-placeholders', `${name}.svg`);
const output = name => path.join(root, name);
const jobs = [
  ['cover-main', 'src/assets/cover-main.jpg', 900, 78],
];

for (const [name, target, width, quality] of jobs) {
  await mkdir(path.dirname(output(target)), { recursive: true });
  await sharp(source(name), { density: 144 }).resize({ width }).jpeg({ quality, mozjpeg: true }).toFile(output(target));
}
await sharp(source('cover-thread'), { density: 144 }).resize({ width: 840 }).png({ palette: true }).toFile(output('src/assets/cover-thread.png'));
await sharp(source('hub-thread'), { density: 144 }).resize({ width: 840 }).png({ palette: true }).toFile(output('src/assets/hub-thread.png'));
await sharp(source('cover-main'), { density: 144 }).resize(500, 400, { fit: 'cover' }).jpeg({ quality: 80, mozjpeg: true }).toFile(output('src/assets/share.jpg'));
console.log(`Prepared ${jobs.length + 3} runtime images.`);
