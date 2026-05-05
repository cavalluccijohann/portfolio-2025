import { z } from 'zod'
import { queryCollection } from '@nuxt/content/server'
import type { Collections } from '@nuxt/content'

async function selectPathFile(question: string) {
    // 1 - lire les fichier dans content ( lire titre, description)
    const collections = ['works', 'about', 'home', 'contact', 'timeline'] as const


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
    // 2 - laisser choisir le llm pour choisir le fichier en focntion de la question

    // 3 - return le path du ou des fichiers selectionnés
   
    return ""
}
