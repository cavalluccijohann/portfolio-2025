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
          technologies: z.array(z.string()),
          teamName: z.string().optional(),
          roles: z.array(z.string()),
          authors: z.array(z.object({
            name: z.string(),
            description: z.string(),
            to: z.string(),
            target: z.string(),
            avatar: z.object({
              src: z.string(),
              alt: z.string()
            }).optional()
          })),
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
