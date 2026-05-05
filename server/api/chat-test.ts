import { streamText } from 'ai'
import * as fs from 'fs';
import selectPathFile from '../libs/agent-tools/selectContentFile';
import { useRequestEvent } from 'nuxt/app';

export default defineEventHandler(async (event) => {
    const systemPrompt = "Tu es l'assistant du portfolio de Johann.\nRéponds uniquement avec les informations du CONTEXTE.\nSi l'information n'est pas dans le contexte, réponds: \"Information non trouvée dans le contenu.\""
    const question = "De quelles ville viens Johann Cavallucci ?"
    //const pathFile = "content/about/index.md"
    // const context = fs.readFileSync(pathFile, 'utf8')
    let answer = ""
    const pathFile = await selectPathFile(question, event)
    // const result = streamText({
    //     model: 'deepseek/deepseek-v4-flash',
    //     prompt: systemPrompt + "\n---\n" + "CONTEXTE:" + context + "\n---\n" + "QUESTION:" + question,
    //   })

    // for await (const textPart of result.textStream) {
    //     answer += textPart
    // }



    return "toto"
})
