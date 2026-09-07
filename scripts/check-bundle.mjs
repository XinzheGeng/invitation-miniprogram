import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const root = path.join(process.cwd(), 'dist');
async function bytes(directory) {
  let total = 0;
  for (const item of await readdir(directory, { withFileTypes: true })) {
    const target = path.join(directory, item.name);
    total += item.isDirectory() ? await bytes(target) : (await stat(target)).size;
  }
  return total;
}
const all = await bytes(root);
const packages = ['story', 'gallery', 'day', 'weekend'];
let sub = 0;
for (const name of packages) {
  const size = await bytes(path.join(root, 'packages', name));
  sub += size;
  console.log(`${name} subpackage: ${(size / 1024).toFixed(1)} KiB`);
  if (size > 1.5 * 1024 * 1024) throw new Error(`${name} exceeds engineering target 1.5 MiB`);
}
const main = all - sub;
console.log(`main package estimate: ${(main / 1024).toFixed(1)} KiB`);
console.log(`total output: ${(all / 1024).toFixed(1)} KiB`);
if (main > 1.5 * 1024 * 1024) throw new Error('main package estimate exceeds engineering target 1.5 MiB');
