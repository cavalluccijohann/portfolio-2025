export type SideChatMessage = { role: 'user' | 'assistant'; content: string }

export function useSideChat() {
  const nuxtApp = useNuxtApp()
  if (!nuxtApp.__portfolioSideChat) {
    nuxtApp.__portfolioSideChat = {
      open: ref(false),
      messages: ref<SideChatMessage[]>([]),
    }
  }
  return nuxtApp.__portfolioSideChat
}
