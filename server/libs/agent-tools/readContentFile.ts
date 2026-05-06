import { queryCollection } from '@nuxt/content/server'
import type { Collections } from '@nuxt/content'

const ALLOWED_COLLECTIONS = ['works', 'about', 'home', 'contact'] as const
type AllowedCollection = typeof ALLOWED_COLLECTIONS[number]

function isAllowedCollection(value: string): value is AllowedCollection {
  return (ALLOWED_COLLECTIONS as readonly string[]).includes(value)
}

export default async function readContentFile(pathFile: string, event: any) {
  const collection = pathFile.replace(/^\//, '').split('/')[0] ?? ''

  if (!isAllowedCollection(collection)) {
    throw new Error(`Invalid collection for path: ${pathFile}`)
  }

  const fileContent = await queryCollection(event, collection as keyof Collections)
    .path(pathFile)
    .first()

  if (!fileContent) {
    throw new Error(`Content not found for path: ${pathFile}`)
  }

  const payload = fileContent as unknown as Record<string, unknown>
  const title = typeof payload.title === 'string' ? payload.title : ''
  const description = typeof payload.description === 'string' ? payload.description : ''
  const path = typeof payload.path === 'string' ? payload.path : pathFile

  const context = [
    `Title: ${title}`,
    `Description: ${description}`,
    `Path: ${path}`,
    '',
    JSON.stringify(fileContent, null, 2),
  ].join('\n')


  return context
}

