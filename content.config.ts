import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    works: defineCollection(
      {
        type: 'page',
        source: 'works/**/*.md',
        schema: z.object({
          title: z.string().nonempty(),
          description: z.string().nonempty(),
          url: z.string().url(),
          date: z.string(),
          year: z.string(),
          minRead: z.number(),
          image: z.string(),
        })
      }
    ),
    worksPage: defineCollection({
      type: 'data',
      source: 'works.yml',
      schema: z.object({
        title: z.string().nonempty(),
        description: z.string().nonempty()
      })
    }),
  }
})
