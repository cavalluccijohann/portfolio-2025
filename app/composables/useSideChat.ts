export type SideChatMessage = { role: 'user' | 'assistant'; content: string }

/**
 * État du chat (sidebar) : ouverture + messages.
 *
 * On évite `useState` ici : en Nuxt il vit dans `payload.state`, qui peut être
 * réaligné avec le payload de la nouvelle route (prerender / extraction), ce qui
 * vide l’historique à chaque navigation.
 *
 * Des `ref` sur `nuxtApp` restent en mémoire pour toute la session SPA (sans
 * localStorage). Une nouvelle instance Nuxt = nouvelle session (F5, nouvel onglet).
 */
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
