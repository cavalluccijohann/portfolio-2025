export function useSideChat() {
  const nuxtApp = useNuxtApp()
  if (!nuxtApp.__portfolioSideChat) {
    nuxtApp.__portfolioSideChat = {
      open: ref(false),
    }
  }
  return nuxtApp.__portfolioSideChat
}
