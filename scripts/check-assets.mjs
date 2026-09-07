import { access, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const expected = [
  'src/assets/cover-main.jpg', 'src/assets/hub-main.jpg', 'src/assets/nav-story.jpg',
  'src/assets/nav-gallery.jpg', 'src/assets/nav-day.jpg', 'src/assets/nav-weekend.jpg',
  'src/assets/cover-thread.png', 'src/assets/hub-thread.png', 'src/assets/share.jpg',
  'src/packages/story/assets/story-trip.jpg',
  ...['travel', 'wedding'].flatMap(group => [1, 2, 3].map(n => `src/packages/gallery/assets/gallery-${group}-0${n}.jpg`)),
  ...[1, 2, 3].map(n => `src/packages/day/assets/venue-0${n}.jpg`),
  'src/packages/weekend/assets/weekend-hero.jpg',
];

const failures = [];
for (const file of expected) {
  try {
    await access(path.join(root, file));
    if ((await stat(path.join(root, file))).size > 350 * 1024) failures.push(`${file}: exceeds 350 KiB`);
  } catch { failures.push(`${file}: missing`); }
}

const sources = (await Promise.all([
  readFile(path.join(root, 'src/data/entries.ts'), 'utf8'),
  readFile(path.join(root, 'src/pages/cover/index.tsx'), 'utf8'),
  readFile(path.join(root, 'src/pages/home/index.tsx'), 'utf8'),
  readFile(path.join(root, 'src/packages/story/pages/index/index.tsx'), 'utf8'),
  readFile(path.join(root, 'src/packages/story/data.ts'), 'utf8'),
  readFile(path.join(root, 'src/packages/gallery/data.ts'), 'utf8'),
  readFile(path.join(root, 'src/packages/day/data.ts'), 'utf8'),
  readFile(path.join(root, 'src/packages/weekend/pages/index/index.tsx'), 'utf8'),
])).join('\n');
const requiredReferences = [
  '/assets/cover-main.jpg', '/assets/hub-main.jpg', '/assets/nav-story.jpg', '/assets/nav-gallery.jpg',
  '/assets/nav-day.jpg', '/assets/nav-weekend.jpg', '/packages/story/assets/story-trip.jpg',
  '/packages/gallery/assets/gallery-travel-0${number}.jpg',
  '/packages/gallery/assets/gallery-wedding-0${number}.jpg',
  '/packages/day/assets/venue-0${number}.jpg',
  '/packages/weekend/assets/weekend-hero.jpg',
];
for (const reference of requiredReferences) {
  if (!sources.includes(reference)) failures.push(`${reference}: source reference missing`);
}
for (const forbidden of ['miniprogram-avatar-yixian-liangchen.png', 'icon-large.png']) {
  if (sources.includes(forbidden)) failures.push(`${forbidden}: release asset must not enter runtime data`);
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else console.log(`Asset check passed: ${expected.length} optimized runtime files.`);
