import { streamText } from 'ai'
import selectPathFile from '../libs/agent-tools/selectContentFile';
import readContentFile from '../libs/agent-tools/readContentFile';

// Règles de réponse (séparées du contenu : plus stable pour le modèle)
const systemPrompt = `Tu es l'assistant du portfolio de Johann Cavallucci.

Règles strictes :
- Réponds UNIQUEMENT à partir du CONTEXTE fourni dans le message utilisateur. N'invente rien.
- Réponds directement : pas de préambule du type "D'après le contexte", "Selon les documents", "En se basant sur…".
- Ne commente pas le fait que tu lis un portfolio ou des fichiers ; va droit au fait.
- Même langue que la QUESTION (si la question est en français, réponds en français).
- Style : concis, clair, phrases courtes. Évite les longues digressions.
- Tu peux utiliser du markdown léger (listes, **gras** ponctuel) seulement si ça améliore la lisibilité ; ne surcharge pas.
- Si l'information demandée n'est pas dans le CONTEXTE, réponds exactement : Information non trouvée dans le contenu.
- Si la question est ambiguë mais que le CONTEXTE permet quand même une réponse partielle, réponds de façon prudente en restant strictement ancré dans le CONTEXTE (sans supposer au-delà).`

const errorMessages = {
  'out_of_scope': 'The question is off-topic and unrelated to the portfolio.',
  'rejected': 'The question is rejected because the content is offensive or inappropriate.',
  'no_match': 'Sorry, but no relevant information was found in the Portfolio.',
}

export default defineEventHandler(async (event) => {
  assertMethod(event, 'POST')

  let answer = ''

  const body = await readBody<{ question?: string }>(event)
  const question = body?.question?.trim().toLowerCase()

  if (!question) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing "question" in request body',
    })
  }

  console.log('question du user: ' + question)

  const pathFile = await selectPathFile(question, event)

  if (pathFile && pathFile.reason !== 'match') {
    return errorMessages[pathFile.reason as keyof typeof errorMessages]
  }

  console.log('pathFile: ', pathFile.paths, 'reason: ', pathFile.reason)

  if (pathFile.paths.length === 0) {
    return errorMessages.no_match
  }

  try {
    const context = await readContentFile(pathFile.paths, event)

    const result = streamText({
      model: 'deepseek/deepseek-v4-flash',
      system: systemPrompt,
      prompt: `CONTEXTE:\n${context}\n\nQUESTION:\n${question}`,
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
