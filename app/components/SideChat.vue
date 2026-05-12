<script setup lang="ts">
import type { SideChatMessage } from '~/composables/useSideChat'
import CarrouselSuggestions from "~/components/CarrouselSuggestions.vue";
import { Comark } from '@comark/vue'

const { open, messages } = useSideChat()

const suggestions = [
  {
    id: 1,
    label: 'Raycast & Johann',
    value: 'What is the connection between Raycast and Johann?',
  },
  {
    id: 2,
    label: 'Where is Johann from?',
    value: 'Where is Johann from?',
  },
  {
    id: 3,
    label: 'Johann\'s latest project?',
    value: 'What is Johann\'s latest project?',
  },
  {
    id: 4,
    label: 'Johann\'s skills?',
    value: 'What are Johann\'s skills?',
  },
  {
    id: 5,
    label: 'Johann\'s experience?',
    value: 'What is Johann\'s experience?',
  }
]

const draft = ref('')
const pending = ref(false)
const listEl = ref<HTMLElement | null>(null)

async function send() {
  const question = draft.value.trim()
  if (!question || pending.value) return

  messages.value.push({ role: 'user', content: question })
  draft.value = ''
  pending.value = true

  try {
    const answer = await $fetch<string>('/api/chat-test', {
      method: 'POST',
      body: {
        question,
        messages: messages.value.map((m: SideChatMessage) => ({ role: m.role, content: m.content })),
      },
    })
    messages.value.push({ role: 'assistant', content: answer })
  } catch (e: unknown) {
    const msg =
      e && typeof e === 'object' && 'data' in e && e.data && typeof e.data === 'object' && 'message' in e.data
        ? String((e.data as { message?: string }).message)
        : e instanceof Error
          ? e.message
          : 'Une erreur est survenue.'
    messages.value.push({ role: 'assistant', content: msg })
  } finally {
    pending.value = false
  }
}

function onComposerKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    send()
  }
}

/** Liens internes du markdown : navigation SPA (Comark rend des `<a href="/...">`). */
function onChatInternalLink(e: MouseEvent) {
  const a = (e.target as HTMLElement).closest('a')
  if (!a) return
  const href = a.getAttribute('href')
  if (!href?.startsWith('/') || href.startsWith('//')) return
  e.preventDefault()
  void navigateTo(href)
}

watch(
  [() => messages.value.length, pending],
  async () => {
    await nextTick()
    listEl.value?.scrollTo({ top: listEl.value.scrollHeight, behavior: 'smooth' })
  },
)
</script>

<template>
    <USidebar
      close
      rail
      collapsible="offcanvas"
      v-model:open="open"
      variant="sidebar"
      side="right"
      class="side-chat-palette [--sidebar-width:min(28rem,calc(100vw-2rem))]"
      :menu="{
        ui: {
          content: 'max-w-2xl side-chat-palette',
        },
      }"
     :ui="{
        container: 'h-full bg-white dark:bg-black border-l border-primary z-99',
        inner: 'flex size-full flex-col overflow-hidden !divide-y-0',
        body: 'min-h-0 flex-1 overflow-hidden px-4 py-0',
      }"
    >
      <template #header="{ close }">
        <div class="absolute right-2">
          <button @click="close" class="bg-primary p-2 flex items-center justify-center size-10 hover:scale-105 transition-transform cursor-pointer">
            <UIcon name="i-lucide-x" class="size-5 text-inverted" />
          </button>
        </div>
      </template>


      <template #default>
        <div class="bg-gradient-to-b from-white to-white/0 dark:from-black dark:to-black/0 absolute h-10 w-full"/>
        <div class="flex h-full min-h-0 flex-col gap-3">
          <div v-if="!messages.length" class="flex-1 items-center w-full h-full flex flex-col gap-4 justify-center text-center py-4">
            <div class="size-20 bg-primary rounded-full"></div>
            <div class="w-full">
              <p class="font-clash-regular text-lg text-primary">
                What would you like to know about<br/>Johann ?
              </p>
              <p class="font-clash-regular text-sm text-primary/70 mt-2">
                Suggestions
              </p>
                <CarrouselSuggestions :suggestions="suggestions" @select="(value: string) => { draft = value; send(); }" />
            </div>
          </div>
          <div
              v-else
            ref="listEl"
            class="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto pr-1 py-6"
          >
            <template v-for="(msg, i) in messages" :key="i">
              <div
                v-if="msg.role === 'user'"
                class="ml-6 rounded-none border border-primary bg-primary/5 px-3 py-2 font-clash-medium text-sm text-primary"
              >
                {{ msg.content }}
              </div>
              <div
                  v-else
                  class="mr-4 border border-primary/40 bg-transparent px-3 py-2 text-sm text-primary leading-relaxed
           [&_strong]:font-clash-medium
           [&_a]:underline [&_a]:underline-offset-2 [&_a]:text-primary [&_a]:decoration-primary/50 [&_a]:hover:decoration-primary
           [&_ul]:list-disc [&_ul]:pl-4 [&_ul]:mt-1
           [&_ol]:list-decimal [&_ol]:pl-4 [&_ol]:mt-1
           [&_code]:bg-primary/10 [&_code]:px-1 [&_code]:text-xs"
                  @click="onChatInternalLink"
              >
                <Suspense>
                  <Comark :streaming="pending && i === messages.length - 1" caret>
                    {{ msg.content }}
                  </Comark>
                </Suspense>
              </div>
            </template>

            <div
              v-if="pending"
              class="mr-4 flex items-center gap-2 border border-dashed border-primary/40 px-3 py-2 text-sm text-gray-500 dark:text-gray-400"
            >
              <UIcon name="i-lucide-loader-2" class="size-5 shrink-0 animate-spin text-primary" />
              <span>Réflexion en cours…</span>
            </div>
          </div>
        </div>
        <div class=" bottom-34 bg-gradient-to-t from-white to-white/0 dark:from-black dark:to-black/0 absolute h-5 w-full"/>
      </template>


      <template #footer>
        <div class="relative w-full p-2">
          <textarea
            v-model="draft"
            rows="3"
            placeholder="Ask me anything"
            :disabled="pending"
            class="block min-h-20 w-full resize-none border-[1.5px] border-primary rounded-none p-2 pr-14 font-clash-medium text-primary align-top leading-normal placeholder:text-primary/50 focus:outline-none transition-all duration-300 disabled:opacity-50"
            @keydown="onComposerKeydown"
          />
          <UButton
            class="absolute bottom-3 right-3 bg-primary rounded-none p-2 hover:bg-primary transition-transform cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            :disabled="pending || !draft.trim()"
            @click="send"
          >
              <UIcon name="i-lucide-arrow-up" class="size-5 text-inverted" />
            </UButton>
        </div>
      
      </template>
    </USidebar>
</template>

<style scoped></style>

