import { readdirSync, readFileSync } from 'node:fs';

/** Paths of title-only documents, which remain accessible but are not ready for search. */
export function getEmptyContentPaths(directory = new URL('../src/content/docs/', import.meta.url), prefix = '') {
  const paths = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const relative = `${prefix}${entry.name}`;
    const file = new URL(entry.name, directory);
    if (entry.isDirectory()) {
      paths.push(...getEmptyContentPaths(new URL(`${entry.name}/`, directory), `${relative}/`));
    } else if (/\.mdx?$/.test(entry.name)) {
      const source = readFileSync(file, 'utf8');
      const body = source.replace(/^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/, '');
      if (!body.trim()) {
        const slug = relative.replace(/\.mdx?$/, '').replace(/\/index$/, '');
        paths.push(`/${slug}/`);
      }
    }
  }
  return paths;
}
