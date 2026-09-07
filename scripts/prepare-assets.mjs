import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const source = name => path.join(root, 'release-assets/source-placeholders', `${name}.svg`);
const output = name => path.join(root, name);
const jobs = [
  ['cover-main', 'src/assets/cover-main.jpg', 900, 78],
  ['hub-main', 'src/assets/hub-main.jpg', 900, 78],
  ['nav-story', 'src/assets/nav-story.jpg', 480, 76],
  ['nav-gallery', 'src/assets/nav-gallery.jpg', 480, 76],
  ['nav-day', 'src/assets/nav-day.jpg', 480, 76],
  ['nav-weekend', 'src/assets/nav-weekend.jpg', 480, 76],
  ['story-trip', 'src/packages/story/assets/story-trip.jpg', 900, 78],
  ...['travel', 'wedding'].flatMap(group => [1, 2, 3].map(n => [`gallery-${group}-0${n}`, `src/packages/gallery/assets/gallery-${group}-0${n}.jpg`, 900, 78])),
  ...[1, 2, 3].map(n => [`venue-0${n}`, `src/packages/day/assets/venue-0${n}.jpg`, 900, 78]),
  ['weekend-hero', 'src/packages/weekend/assets/weekend-hero.jpg', 900, 78],
];

for (const [name, target, width, quality] of jobs) {
  await mkdir(path.dirname(output(target)), { recursive: true });
  await sharp(source(name), { density: 144 }).resize({ width }).jpeg({ quality, mozjpeg: true }).toFile(output(target));
}
await sharp(source('cover-thread'), { density: 144 }).resize({ width: 840 }).png({ palette: true }).toFile(output('src/assets/cover-thread.png'));
await sharp(source('hub-thread'), { density: 144 }).resize({ width: 840 }).png({ palette: true }).toFile(output('src/assets/hub-thread.png'));
await sharp(source('cover-main'), { density: 144 }).resize(500, 400, { fit: 'cover' }).jpeg({ quality: 80, mozjpeg: true }).toFile(output('src/assets/share.jpg'));
console.log(`Prepared ${jobs.length + 3} runtime images.`);
