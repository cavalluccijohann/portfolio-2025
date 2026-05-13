import type { Ref } from 'vue'

declare module '#app' {
  interface NuxtApp {
    /** State of the side chat (refs Vue, outside payload — survives client navigations) */
    __portfolioSideChat?: {
      open: Ref<boolean>
      messages: Ref<Array<{ role: 'user' | 'assistant'; content: string }>>
    }
  }
}

export {}
