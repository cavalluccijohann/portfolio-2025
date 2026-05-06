import { streamText } from 'ai'
import * as fs from 'fs';
import selectPathFile from '../libs/agent-tools/selectContentFile';
import { useRequestEvent } from 'nuxt/app';
import readContentFile from '../libs/agent-tools/readContentFile';

// INIT
const systemPrompt = "Tu es l'assistant du portfolio de Johann.\nRéponds uniquement avec les informations du CONTEXTE.\nSi l'information n'est pas dans le contexte, réponds: \"Information non trouvée dans le contenu.\""
let answer = ""

export default defineEventHandler(async (event) => {
    const body = await readBody<{ question?: string }>(event)
    const question = body?.question?.trim()

    if (!question) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Missing "question" in request body',
        })
      }

      console.log("question: " + question)

    
    const pathFile = await selectPathFile(question, event)
    const context = await readContentFile(pathFile, event)
    const result = streamText({
        model: 'deepseek/deepseek-v4-flash',
        prompt: systemPrompt + "\n---\n" + "CONTEXTE:" + context + "\n---\n" + "QUESTION:" + question,
      })

    for await (const textPart of result.textStream) {
        answer += textPart
    }

    return answer
})
