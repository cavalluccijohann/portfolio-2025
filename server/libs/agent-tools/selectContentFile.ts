import { z } from 'zod'
import { streamText } from 'ai'
import { queryCollection } from '@nuxt/content/server'
import type { Collections } from '@nuxt/content'

export default async function selectPathFile(question: string, event: any) {
    // 1 - lire les fichier dans content ( lire titre, description)
    const collections = ['works', 'about', 'home', 'contact'] as const

    const systemPrompt = "Tu dois me un path, parmis ce qui existe dans le CONTEXTE, et qui pourrait contenir la reponse a la QUESTION. sous la forme d'une string."

    let answer = ""

   // utiliser querycollection de nuxt content pour lire les fichiers
   try {
    const rows = (
        await Promise.all(
          collections.map(async (name) => {
            const docs = await queryCollection(event, name)
              .select('title', 'description', 'path')
              .all()
            return docs.map((d) => ({
              collection: name,
              title: d.title,
              description: d.description ?? '',
              path: d.path,
            }))
          }),
        )
      ).flat()

      const context = rows.map((row) => `Collection: ${row.collection}\nTitle: ${row.title}\nDescription: ${row.description}\nPath: ${row.path}`).join("\n")

      // 2 - laisser choisir le llm pour choisir le fichier en focntion de la question
      const result = await streamText({
        model: 'deepseek/deepseek-v4-flash',
        prompt: systemPrompt + "\n---\n" + "CONTEXTE:" + context + "\n---\n" + "QUESTION:" + question,
      })

      for await (const textPart of result.textStream) {
        answer += textPart
      }

      console.log(answer)

    } catch (error) {
      console.error(error)
    }
    // 2 - laisser choisir le llm pour choisir le fichier en focntion de la question

    // 3 - return le path du ou des fichiers selectionnés
   
    return ""
}
