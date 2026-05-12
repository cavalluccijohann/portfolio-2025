import type { Ref } from 'vue'

declare module '#app' {
  interface NuxtApp {
    /** État du side chat (refs Vue, hors payload — survit aux navigations client) */
    __portfolioSideChat?: {
      open: Ref<boolean>
      messages: Ref<Array<{ role: 'user' | 'assistant'; content: string }>>
    }
  }
}

export {}
