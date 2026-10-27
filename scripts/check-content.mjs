import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const root = 'src/content/docs';
const locales = ['en', 'zh-cn'];
const ids = new Map();
let errors = 0;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map((entry) => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(file) : entry.name.endsWith('.md') || entry.name.endsWith('.mdx') ? [file] : [];
  }))).flat();
}

for (const locale of locales) {
  for (const file of await walk(path.join(root, locale))) {
    const source = await readFile(file, 'utf8');
    const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---/.exec(source)?.[1] ?? '';
    const field = (key) => new RegExp(`^${key}:\\s*["']?([^"'\\r\\n]+)`, 'm').exec(frontmatter)?.[1]?.trim();
    const id = field('contentId');
    if (!id || !field('title') || !field('description') || !field('updated') || !['current', 'needs-sync'].includes(field('translationStatus'))) {
      console.error(`${file}: missing or invalid required frontmatter`); errors++; continue;
    }
    const key = `${locale}:${id}`;
    if (ids.has(key)) { console.error(`${file}: duplicate content ID ${id}`); errors++; }
    ids.set(key, file);
  }
}
for (const [key, file] of ids) {
  if (key.startsWith('en:') && !ids.has(`zh-cn:${key.slice(3)}`)) {
    console.error(`${file}: English content must have a Chinese source`); errors++;
  }
}
if (errors) process.exitCode = 1;
else console.log(`Checked ${ids.size} content files.`);
