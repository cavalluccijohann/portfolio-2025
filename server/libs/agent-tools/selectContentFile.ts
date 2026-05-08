import { generateObject } from 'ai'
import { queryCollection } from '@nuxt/content/server'
import { z } from 'zod'
import leoProfanity from 'leo-profanity'

leoProfanity.clearList()
leoProfanity.add(leoProfanity.getDictionary('en'))
leoProfanity.add(leoProfanity.getDictionary('fr'))
const collections = ['works', 'about', 'home', 'contact'] as const
const systemPrompt = `
Tu es un sélecteur de documents.
Ta mission: choisir les chemins les plus pertinents pour répondre à la question.

Règles:
- Utilise UNIQUEMENT les paths présents dans le CONTEXTE.
- Retourne entre 1 et 3 paths maximum.
- Trie les paths par pertinence décroissante.
- Si la question demande une liste (ex: "quels projets utilisent Nuxt"), tu peux retourner plusieurs paths.
- Si la question est très spécifique, retourne 1 seul path.
- Si rien n'est pertinent et que tu ne trouve aucune information dans le contexte, retourne "no_match" dans le champ reason.
- Si la question est hors sujet et sortant du contexte du portfolio, retourne "out_of_scope" dans le champ reason.
- Si la question est rejetée parce que le contenue est insultant, innaproprié, retourne "rejected" dans le champ reason.
- Si la question est matchée, retourne "match" dans le champ reason.

Format de sortie OBLIGATOIRE (JSON strict, sans texte autour):
{"paths":["/path1","/path2","/path3"], "reason": "reasonValue"}
`

const reasonValues = ['match', 'out_of_scope', 'rejected', 'no_match'] as const
type Reason = (typeof reasonValues)[number]
type SelectionResult = { paths: string[]; reason: Reason }
type CacheEntry = { value: SelectionResult; expiresAt: number }

const CACHE_MAX_SIZE = 50
const CACHE_TTL_MS = 60 * 60 * 1000
const cache = new Map<string, CacheEntry>()

function normalizeKey(question: string) {
  return question.trim().toLowerCase().replace(/\s+/g, ' ')
}

function getFromCache(key: string): SelectionResult | undefined {
  const entry = cache.get(key)
  if (!entry) return undefined
  if (Date.now() > entry.expiresAt) {
    cache.delete(key)
    return undefined
  }
  return entry.value
}

function setInCache(key: string, value: SelectionResult) {
  if (cache.size >= CACHE_MAX_SIZE) {
    const oldestKey = cache.keys().next().value
    if (oldestKey) cache.delete(oldestKey)
  }
  cache.set(key, { value, expiresAt: Date.now() + CACHE_TTL_MS })
}

export default async function selectPathFile(question: string, event: any): Promise<SelectionResult> {
  if (leoProfanity.check(question)) {
    return { paths: [], reason: 'rejected' }
  }

  const cacheKey = normalizeKey(question)

  const cached = getFromCache(cacheKey)
  if (cached) return cached

  try {
    const rows = (
      await Promise.all(
        collections.map(async (name) => {
          const docs = await queryCollection(event, name)
            .select('title', 'contextPreview', 'path')
            .all()
          return docs.map((d) => ({
            collection: name,
            title: d.title,
            description: d.contextPreview ?? '',
            path: d.path,
          }))
        }),
      )
    ).flat()

    const context = rows
      .map((row) => `Collection: ${row.collection}\nTitle: ${row.title}\nDescription: ${row.description}\nPath: ${row.path}`)
      .join('\n')

    const { object } = await generateObject({
      model: 'deepseek/deepseek-v4-flash',
      system: systemPrompt,
      prompt: `CONTEXTE:\n${context}\n---\nQUESTION:\n${question}`,
      schema: z.object({
        paths: z.array(z.string()).max(3),
        reason: z.enum(reasonValues),
      }),
      temperature: 0,
      maxRetries: 1,
    })

    let result: SelectionResult = object

    if (object.reason === 'match' && object.paths.length === 0) {
      result = { paths: [], reason: 'no_match' }
    } else if (object.paths.length > 0 && object.reason !== 'match') {
      result = { paths: object.paths, reason: 'match' }
    }

    if (result.reason === 'match') {
      setInCache(cacheKey, result)
    }

    return result
  } catch (error) {
    console.error(error)
    return { paths: [], reason: 'no_match' }
  }
}
