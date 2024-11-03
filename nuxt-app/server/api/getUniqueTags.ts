import { defineEventHandler } from 'h3'
import { readdirSync } from 'node:fs'
import { open } from 'node:fs/promises'
import { join } from 'node:path'

export default defineEventHandler(async (event) => {
  const contentDir = join(process.cwd(), 'content', 'project')
  const files = await getMarkdownFiles(contentDir)

  let allTags: string[] = [];

  for (const file of files) {
    const tags: string[] = await extractTags(join(contentDir,file));
    allTags.push(...tags);
  }

  const uniqueTags = [...new Set(allTags)].sort((a, b) => a.localeCompare(b));

  return uniqueTags;
})

async function getMarkdownFiles(dir: string): Promise<string[]> {
  const files = await readdirSync(dir)
  return files.filter(file => file.endsWith('.md'))
}

async function extractTags(filename: string): Promise<string[]> {
  let inTagsSection: boolean = false;
  let tags: string[] = [];

  const file = await open(filename);

  for await (const line of file.readLines()) {
    if (!line.startsWith("tags:") && !inTagsSection) {
      continue;
    } else if (line.startsWith("tags:") && !inTagsSection) {
      inTagsSection = true;
    } else if (inTagsSection && line.startsWith(" - ")) {
      tags.push(line.replace(" - ", ""));
    } else if (inTagsSection && !line.startsWith(" - ")) {
      break;
    }
  }

  await file.close();

  return tags;
}
