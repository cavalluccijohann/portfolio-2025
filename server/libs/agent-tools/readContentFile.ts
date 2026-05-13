import { queryCollection } from '@nuxt/content/server'
import type { Collections } from '@nuxt/content'
import { TIMELINE_CONTENT_PATH } from './timelineContentPath'

const ALLOWED_COLLECTIONS = ['works', 'about', 'home', 'contact', 'timeline'] as const

/*
 * Get the collection name from the path
 */
function collectionFromPath(path: string) {
  const normalized = path.trim().replace(/\/$/, '')
  if (normalized === TIMELINE_CONTENT_PATH || normalized.endsWith('/about/timeline')) {
    return 'timeline'
  }
  return normalized.replace(/^\//, '').split('/')[0] ?? ''
}

/*
 * Check if the collection name is allowed
 */
function isAllowedCollectionName(name: string): name is (typeof ALLOWED_COLLECTIONS)[number] {
  return (ALLOWED_COLLECTIONS as readonly string[]).includes(name)
}

/*
 * Build the section for the file
 */
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

/*
 * Slim the timeline events
 */
function slimTimelineEvents(body: unknown[]): Array<Record<string, unknown>> {
  return body.map((ev) => {
    const row = ev as Record<string, unknown>
    const icon = row.icon
    const iconStr = typeof icon === 'string' ? icon : ''
    let iconOut: string
    if (iconStr.startsWith('i-')) iconOut = iconStr
    else if (iconStr.includes('<svg')) iconOut = '[svg]'
    else iconOut = iconStr ? '[icône]' : ''
    return {
      date: row.date,
      title: row.title,
      link: row.link,
      description: row.description,
      icon: iconOut,
    }
  })
}

/*
 * Get the timeline body from the document
 */
function timelineBodyFromDoc(doc: unknown): unknown[] {
  const raw = doc as Record<string, unknown>
  const meta = raw.meta as { body?: unknown } | undefined
  if (Array.isArray(meta?.body)) return meta.body as unknown[]
  if (Array.isArray(raw.body)) return raw.body as unknown[]
  return []
}

/*
 * Build the timeline section
 */
function buildTimelineSection(path: string, doc: unknown) {
  const events = slimTimelineEvents(timelineBodyFromDoc(doc))
  return [
    `Path: ${path}`,
    'Title: Timeline (parcours — about/timeline.yml)',
    'Description: Chronologie des étapes du parcours (dates, titres, textes, liens).',
    '',
    JSON.stringify(events, null, 2),
  ].join('\n')
}

/*
 * Read the content of the files
 */
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

    if (collection === 'timeline') {
      const fileContent = await queryCollection(event, 'timeline').first()
      if (!fileContent) {
        throw new Error(`Content not found for timeline: ${path}`)
      }
      sections.push(buildTimelineSection(TIMELINE_CONTENT_PATH, fileContent))
      continue
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
