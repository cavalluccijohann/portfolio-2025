import { generateObject } from 'ai'
import { queryCollection } from '@nuxt/content/server'
import { z } from 'zod'
import leoProfanity from 'leo-profanity'
import { TIMELINE_CONTENT_PATH } from './timelineContentPath'

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
- Si l'utilisateur envoie une suite courte ("dis-moi plus", "et pour X ?"), utilise TOUJOURS les messages précédents pour comprendre le sujet et choisir les mêmes documents pertinents que pour la question initiale.
- Si la question demande une liste (ex: "quels projets utilisent Nuxt"), tu peux retourner plusieurs paths.
- Si la question est très spécifique, retourne 1 seul path.
- Le path ${TIMELINE_CONTENT_PATH} correspond à la timeline (fichier YAML du parcours chronologique). Utilise-le pour l'historique par années, le parcours (école, alternance, Raycast, etc.), pas seulement pour la biographie courte de la page About.
- Si rien n'est pertinent et que tu ne trouve aucune information dans le contexte, retourne "no_match" dans le champ reason.
- Si la question est hors sujet et sortant du contexte du portfolio, retourne "out_of_scope" dans le champ reason.
- Si la question est rejetée parce que le contenue est insultant, innaproprié, retourne "rejected" dans le champ reason.
- Si la question est matchée, retourne "match" dans le champ reason.

Format de sortie OBLIGATOIRE (JSON strict, sans texte autour):
{"paths":["/path1","/path2","/path3"], "reason": "reasonValue"}

Exemples :

Question: "Quels projets de Johann utilisent Nuxt ?"
Sortie: {"paths":["/works/iv-patisserie", "/works/portfolio","/works/folio-magazine"], "reason":"match"}

Question: "Qu'est-ce que Johann a fait en 2022 ou son parcours chez Iothink ?"
Sortie: {"paths":["${TIMELINE_CONTENT_PATH}"], "reason":"match"}

Question: "Quelle est la couleur des yeux de Johann ?"
Sortie: {"paths":[], "reason":"out_of_scope"}

Question: "Connard"
Sortie: {"paths":[], "reason":"rejected"}

Question: "Quelle est l’adresse exacte de Johann ?"
Sortie: {"paths":[], "reason":"no_match"}
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
    type IndexRow = { collection: string; title: string; description: string; path: string }

    const rows: IndexRow[] = (
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

    rows.push({
      collection: 'timeline',
      title: 'Timeline / parcours (about/timeline.yml)',
      description:
        "Chronologie du parcours de Johann : années, titres d'étapes (La Valeur Sûre, Epitech, Iothink Solutions, Vue/Nuxt, IV Patisserie, Robot Fighting, Raycast ambassador, Raftou, nouvelle identité visuelle…), liens externes, descriptions. À utiliser pour l'historique chronologique, le CV par dates, « qu'en 2022 », l'alternance, Raycast, Raftou, etc.",
      path: TIMELINE_CONTENT_PATH,
    })

    const context = rows
      .map((row) => `Collection: ${row.collection}\nTitle: ${row.title}\nDescription: ${row.description}\nPath: ${row.path}`)
      .join('\n')

    const { object } = await generateObject({
      model: 'deepseek/deepseek-v4-flash',
      system: systemPrompt,
      prompt: `CONTEXTE:\n${context}\n---\nCONVERSATION OU QUESTION:\n${question}`,
      schema: z.object({
        paths: z.array(z.string()).max(3),
        reason: z.enum(reasonValues),
      }),
      temperature: 0,
      maxRetries: 1,
    })

    const validPaths = new Set(rows.map((row) => row.path))
    const filteredPaths = object.paths.filter((path) => validPaths.has(path))

    let result: SelectionResult = {
      paths: filteredPaths,
      reason: object.reason,
    }

    if (result.paths.length === 0) {
      if (object.reason === 'rejected' || object.reason === 'out_of_scope') {
        result = { paths: [], reason: object.reason }
      } else if (object.paths.length > 0 || object.reason === 'match') {
        result = { paths: [], reason: 'no_match' }
      } else {
        result = { paths: [], reason: object.reason }
      }
    } else if (object.reason !== 'match') {
      result = { paths: result.paths, reason: 'match' }
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
