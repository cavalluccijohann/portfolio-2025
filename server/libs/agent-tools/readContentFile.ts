import { queryCollection } from '@nuxt/content/server'
import type { Collections } from '@nuxt/content'

const ALLOWED_COLLECTIONS = ['works', 'about', 'home', 'contact'] as const

function collectionFromPath(path: string) {
  return path.replace(/^\//, '').split('/')[0] ?? ''
}

function isAllowedCollectionName(name: string): name is (typeof ALLOWED_COLLECTIONS)[number] {
  return (ALLOWED_COLLECTIONS as readonly string[]).includes(name)
}

function buildSection(path: string, fileContent: unknown) {
  const payload = fileContent as unknown as Record<string, unknown>
  const title = typeof payload.title === 'string' ? payload.title : ''
  const description = typeof payload.description === 'string' ? payload.description : ''
  const docPath = typeof payload.path === 'string' ? payload.path : path

  return [
    `Path: ${docPath}`,
    `Title: ${title}`,
    `Description: ${description}`,
    '',
    JSON.stringify(fileContent, null, 2),
  ].join('\n')
}

/** Lit un ou plusieurs documents Nuxt Content et renvoie un contexte concaténé. */
export default async function readContentFile(paths: string[], event: any): Promise<string> {
  const uniquePaths = [...new Set(paths.map((p) => p.trim()).filter(Boolean))]

  if (uniquePaths.length === 0) {
    return ''
  }

  const sections: string[] = []

  for (const path of uniquePaths) {
    const collection = collectionFromPath(path)

    if (!isAllowedCollectionName(collection)) {
      throw new Error(`Invalid collection for path: ${path}`)
    }

    const fileContent = await queryCollection(event, collection as keyof Collections)
      .path(path)
      .first()

    if (!fileContent) {
      throw new Error(`Content not found for path: ${path}`)
    }

    sections.push(buildSection(path, fileContent))
  }

  return sections.join('\n\n---\n\n')
}
