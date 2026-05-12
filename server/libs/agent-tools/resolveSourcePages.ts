import { queryCollection } from '@nuxt/content/server'
import type { Collections } from '@nuxt/content'
import { TIMELINE_CONTENT_PATH } from './timelineContentPath'

const ALLOWED = ['works', 'about', 'home', 'contact'] as const

function firstSegment(path: string): string {
  return path.replace(/^\//, '').split('/')[0] ?? ''
}

function isAllowed(name: string): name is (typeof ALLOWED)[number] {
  return (ALLOWED as readonly string[]).includes(name)
}

function hrefForCollection(col: (typeof ALLOWED)[number], docPath: string): string {
  if (col === 'home') return '/'
  if (col === 'about') return '/about'
  if (col === 'contact') return '/contact'
  return docPath.startsWith('/') ? docPath : `/${docPath}`
}

export type ChatSourcePage = { title: string; href: string; path: string }

/** Titres + URLs du site pour les pages utilisées comme contexte. */
export default async function resolveSourcePages(paths: string[], event: any): Promise<ChatSourcePage[]> {
  const unique = [...new Set(paths.map((p) => p.trim()).filter(Boolean))]
  const out: ChatSourcePage[] = []

  for (const path of unique) {
    if (path === TIMELINE_CONTENT_PATH || path.endsWith('/about/timeline')) {
      out.push({ title: 'Timeline', href: '/about', path: TIMELINE_CONTENT_PATH })
      continue
    }

    const seg = firstSegment(path)

    if (!seg || !isAllowed(seg)) {
      if (path === '/' || path === '') {
        const doc = await queryCollection(event, 'home').first()
        if (doc) {
          const rec = doc as { title?: string; path?: string }
          const title = typeof rec.title === 'string' ? rec.title : 'Accueil'
          const docPath = typeof rec.path === 'string' ? rec.path : '/'
          out.push({ title, href: '/', path: docPath })
        }
      }
      continue
    }

    const col = seg as keyof Collections
    const doc = await queryCollection(event, col).path(path).first()
    if (!doc) continue

    const rec = doc as { title?: string; path?: string }
    const title = typeof rec.title === 'string' ? rec.title : path
    const docPath = typeof rec.path === 'string' ? rec.path : path
    const colName = seg as (typeof ALLOWED)[number]

    out.push({
      title,
      href: hrefForCollection(colName, docPath),
      path: docPath,
    })
  }

  return out
}
