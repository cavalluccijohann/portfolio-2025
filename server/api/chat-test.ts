import { streamText } from 'ai'
import selectPathFile from '../libs/agent-tools/selectContentFile'
import readContentFile from '../libs/agent-tools/readContentFile'
import resolveSourcePages, { type ChatSourcePage } from '../libs/agent-tools/resolveSourcePages'
import { assertChatRateLimit } from '../utils/chatRateLimit'

// Règles de réponse (séparées du contenu : plus stable pour le modèle)
const systemPrompt = `Tu es l'assistant du portfolio de Johann Cavallucci.

Règles strictes :
- Les faits viennent UNIQUEMENT du bloc « CONTEXTE (documents du portfolio) » ci-dessous. N'invente rien.
- Tu peux t'appuyer sur l'historique de discussion pour comprendre les pronoms et les suites (« dis-moi plus », « et pour ce projet ? »), mais chaque affirmation factuelle doit rester vérifiable dans le CONTEXTE.
- Réponds directement : pas de préambule du type "D'après le contexte", "Selon les documents", "En se basant sur…".
- Ne commente pas le fait que tu lis un portfolio ou des fichiers ; va droit au fait.
- Même langue que la QUESTION ACTUELLE (si elle est en français, réponds en français).
- Style : concis, clair, phrases courtes. Évite les longues digressions.
- Tu peux utiliser du markdown léger (listes, **gras** ponctuel) seulement si ça améliore la lisibilité ; ne surcharge pas.
- Liens vers le site : dès que tu parles d'un projet, d'une page « works », de l'accueil, about ou contact par son nom, mets le lien markdown sur le mot (ou le groupe de mots) concerné : [Mockline](/works/mockline) en recopiant EXACTEMENT une paire titre + href de la section « PAGES DU SITE » du message. N'invente aucune URL.
- Si tu résumes ou qu'il manque du détail utile, tu peux en une courte phrase orienter vers la page du portfolio concernée avec le même type de lien — toujours dans le flux du texte, sans section « sources » ni liste séparée en fin de message.
- Si l'information demandée n'est pas dans le CONTEXTE, réponds exactement : Information non trouvée dans le contenu.
- Si la question est ambiguë mais que le CONTEXTE permet quand même une réponse partielle, réponds de façon prudente en restant strictement ancré dans le CONTEXTE (sans supposer au-delà).`

const errorMessages = {
  'out_of_scope': 'The question is off-topic and unrelated to the portfolio.',
  'rejected': 'The question is rejected because the content is offensive or inappropriate.',
  'no_match': 'Sorry, but no relevant information was found in the Portfolio.',
}

type ChatBodyMessage = { role: 'user' | 'assistant'; content: string }

const MAX_MESSAGES = 20
const MAX_MESSAGE_CHARS = 8000
const MAX_QUESTION_LENGTH = 500

function trimMessages(raw: unknown): ChatBodyMessage[] {
  if (!Array.isArray(raw)) return []
  const out: ChatBodyMessage[] = []
  for (const m of raw) {
    if (!m || typeof m !== 'object') continue
    const role = (m as ChatBodyMessage).role
    const content = typeof (m as ChatBodyMessage).content === 'string' ? (m as ChatBodyMessage).content : ''
    if (role !== 'user' && role !== 'assistant') continue
    const slice = content.slice(0, MAX_MESSAGE_CHARS)
    if (!slice.trim()) continue
    out.push({ role, content: slice.trim() })
    if (out.length >= MAX_MESSAGES) break
  }
  return out
}

/** Dernières lignes pour le sélecteur de fichiers (suites de conversation). */
function formatConversationForSelection(messages: ChatBodyMessage[]): string {
  const tail = messages.slice(-8)
  return tail.map((m) => `${m.role === 'user' ? 'Utilisateur' : 'Assistant'}: ${m.content}`).join('\n\n')
}

/** Historique pour le modèle de réponse (sans la toute dernière question utilisateur, passée à part). */
function formatHistoryBeforeLatest(
  messages: ChatBodyMessage[],
  latestUser: string,
): string {
  const withoutLast = [...messages]
  const last = withoutLast.at(-1)
  if (last?.role === 'user' && last.content.trim() === latestUser.trim()) {
    withoutLast.pop()
  }
  if (withoutLast.length === 0) return ''
  const tail = withoutLast.slice(-10)
  return tail.map((m) => `${m.role === 'user' ? 'Utilisateur' : 'Assistant'}: ${m.content}`).join('\n\n')
}

function escapeMdLinkText(s: string): string {
  return s.replace(/[[\]]/g, '')
}

function formatPagesForPrompt(sources: ChatSourcePage[]): string {
  if (sources.length === 0) return '(aucune entrée)'
  return sources.map((s) => `- [${escapeMdLinkText(s.title)}](${s.href})`).join('\n')
}

export default defineEventHandler(async (event) => {
  assertMethod(event, 'POST')

  let answer = ''

  const body = await readBody<{ question?: string; messages?: ChatBodyMessage[] }>(event)
  const messages = trimMessages(body?.messages)
  const latestFromThread =
    messages.length && messages.at(-1)?.role === 'user' ? messages.at(-1)!.content.trim() : ''
  const question = (body?.question?.trim() || latestFromThread).trim()

  if (question.length > MAX_QUESTION_LENGTH) {
    throw createError({
      statusCode: 400,
      statusMessage: `La question dépasse ${MAX_QUESTION_LENGTH} caractères.`,
    })
  }

  if (!question) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing "question" in request body',
    })
  }

  await assertChatRateLimit(event)

  const selectionInput =
    messages.length >= 2 ? formatConversationForSelection(messages) : question

  console.log('question du user: ' + question)
  if (messages.length) console.log('messages dans le fil: ' + messages.length)

  const pathFile = await selectPathFile(selectionInput, event)

  if (pathFile && pathFile.reason !== 'match') {
    return errorMessages[pathFile.reason as keyof typeof errorMessages]
  }

  console.log('pathFile: ', pathFile.paths, 'reason: ', pathFile.reason)

  if (pathFile.paths.length === 0) {
    return errorMessages.no_match
  }

  try {
    const context = await readContentFile(pathFile.paths, event)
    const sources = await resolveSourcePages(pathFile.paths, event)
    const pagesBlock = formatPagesForPrompt(sources)

    const historyBlock = formatHistoryBeforeLatest(messages, question)
    const pagesSection = `PAGES DU SITE (copie ces paires [titre](href) telles quelles ; place-les sur les mots du sujet dans tes phrases, pas en liste séparée) :\n${pagesBlock}`

    const userPayload =
      historyBlock.length > 0
        ? `CONTEXTE (documents du portfolio) :\n${context}\n\n---\n${pagesSection}\n\n---\nDiscussion précédente (pour comprendre la suite) :\n${historyBlock}\n\n---\nQUESTION ACTUELLE :\n${question}`
        : `CONTEXTE (documents du portfolio) :\n${context}\n\n---\n${pagesSection}\n\n---\nQUESTION ACTUELLE :\n${question}`

    const result = streamText({
      model: 'deepseek/deepseek-v4-flash',
      system: systemPrompt,
      prompt: userPayload,
      temperature: 0.2,
    })

    for await (const textPart of result.textStream) {
      answer += textPart
    }

    return answer
  } catch (error) {
    console.error(error)
    return errorMessages.no_match
  }
})
