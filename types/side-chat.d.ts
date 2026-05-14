import type { Ref } from 'vue'

declare module '#app' {
  interface NuxtApp {
    __portfolioSideChat?: {
      open: Ref<boolean>
    }
  }
}

export {}
