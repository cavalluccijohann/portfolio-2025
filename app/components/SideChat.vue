<script setup lang="ts">
import { Comark } from '@comark/vue'
import type { SideChatMessage } from '~/composables/useSideChat'
import CarrouselSuggestions from '~/components/CarrouselSuggestions.vue'

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

const COMPOSER_MAX_CHARS = 500

const draft = ref('')
const pending = ref(false)
const listEl = ref<HTMLElement | null>(null)

const draftCharCount = computed(() => draft.value.length)

async function send() {
  const question = draft.value.trim().slice(0, COMPOSER_MAX_CHARS)
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
    v-model:open="open"
    close
    rail
    collapsible="offcanvas"
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
      footer: 'py-0',
    }"
  >
    <template #header="{ close }">
      <Transition name="side-chat-ai-title">
        <div
          v-if="messages.length > 0"
          class="flex items-center gap-2 w-full justify-center relative"
        >
          <p class="font-estrella text-primary text-4xl">
            Johann’s &nbsp;&nbsp;AI
          </p>
        </div>
      </Transition>
      <div class="absolute right-2">
        <button
          class="bg-primary p-2 flex items-center justify-center size-10 hover:scale-105 transition-transform cursor-pointer"
          @click="close"
        >
          <UIcon name="i-lucide-x" class="size-5 text-inverted" />
        </button>
      </div>
    </template>


    <template #default>
      <div class="bg-gradient-to-b from-white to-white/0 dark:from-black dark:to-black/0 absolute h-10 w-full" />
      <div class="flex h-full min-h-0 flex-col gap-3">
        <div
          v-if="!messages.length"
          class="flex-1 items-center w-full h-full flex flex-col gap-4 justify-center text-center py-4"
        >
          <div class="size-20 bg-primary rounded-full flex items-center justify-center">
            <div class="flex items-center justify-center size-8 text-inverted text-white dark:text-black">
              <svg
                class="fill-white dark:fill-black"
                viewBox="0 0 224 334"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M176.859 271.5C151.881 304.06 115.996 306.779 91.6498 301.307C86.4151 300.131 80.8352 301.052 76.6727 304.438C67.9302 311.548 69.739 324.484 80.3571 328.258C83.2434 329.284 85.6938 330.102 87.1526 330.5C97.7171 332.421 114.346 335.732 136.152 330.5C148.404 327.56 163.152 322 178.152 311C208.409 288.812 219.896 256.654 222.845 233.33C223.847 225.407 217.271 219 209.284 219C200.89 219 194.334 226.083 193.109 234.388C190.369 252.961 181.627 266.335 176.859 271.5Z"
                />
                <path
                  d="M199.027 65.692C190.648 113.905 176.564 176.607 149.152 217.5C122.348 257.487 88.6155 286.727 59.6525 293.8C39.0237 298.837 21.2819 292.682 11.6525 271.5C-8.12274 228 0.15249 192 15.1525 165C28.2524 143.291 47.6414 127.936 62.6526 121C79.4464 113.241 92.6526 110.5 106.153 110C106.453 109.989 107.153 110.022 108.179 110.083C118.564 110.696 125.208 122.096 120.296 131.266C117.768 135.984 112.729 138.721 107.389 139.089C94.397 139.984 76.8752 144.322 61.6525 156C49.9118 165.007 39.1419 178.795 32.6525 197.5C28.0091 214.708 28.707 227.141 30.6525 237C32.2683 245.189 34.4764 251.602 37.6525 257.5C44.6525 270.5 61.6525 267.5 80.1525 253L80.4687 252.752C90.0695 245.228 97.7309 239.223 108.152 227C113.286 220.979 119.471 213.651 126.152 203.5C154.078 161.074 166.942 98.5921 172.114 61.9572C173.077 55.1403 178.848 50 185.732 50C194.081 50 200.456 57.4668 199.027 65.692Z"
                />
                <path
                  d="M194 28C201.732 28 208 21.732 208 14C208 6.26801 201.732 0 194 0C186.268 0 180 6.26801 180 14C180 21.732 186.268 28 194 28Z"
                />
              </svg>
            </div>
          </div>
          <div class="w-full">
            <p class="font-clash-regular text-lg text-primary">
              What would you like to know about<br>Johann ?
            </p>
            <p class="font-clash-regular text-sm text-primary/70 mt-2">
              Suggestions
            </p>
            <CarrouselSuggestions
              :suggestions
              @select="(value: string) => { draft = value.slice(0, COMPOSER_MAX_CHARS); send(); }"
            />
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
              class="side-chat-assistant mr-4 border border-primary/40 bg-transparent px-3 py-1.5 text-sm text-primary leading-relaxed
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
      <div
        class=" bottom-34 bg-gradient-to-t from-white to-white/0 dark:from-black dark:to-black/0 absolute h-5 w-full"
      />
    </template>


    <template #footer>
      <div class="flex flex-col gap-0.5 p-2 w-full">
        <div class="relative w-full">
          <textarea
            v-model="draft"
            rows="3"
            :maxlength="COMPOSER_MAX_CHARS"
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
        <div class="flex justify-end pr-1">
          <span
            class="font-clash-medium text-[11px] tabular-nums transition-colors"
            :class="
              draftCharCount >= COMPOSER_MAX_CHARS
                ? 'text-primary'
                : draftCharCount >= 430
                  ? 'text-amber-600 dark:text-amber-400'
                  : 'text-primary/45'
            "
          >
            {{ draftCharCount }}/{{ COMPOSER_MAX_CHARS }}
          </span>
        </div>
      </div>
    </template>
  </USidebar>
</template>

<style scoped>
/* Comark : `div.comark-content` ; marges par défaut des <p> / listes = vide haut-bas dans la bulle */
.side-chat-assistant :deep(.comark-content p),
.side-chat-assistant :deep(.comark-content ul),
.side-chat-assistant :deep(.comark-content ol) {
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}
.side-chat-assistant :deep(.comark-content > :first-child) {
  margin-top: 0 !important;
}
.side-chat-assistant :deep(.comark-content > :last-child) {
  margin-bottom: 0 !important;
}
.side-chat-assistant :deep(.comark-content li) {
  margin-top: 0;
  margin-bottom: 0.125rem;
}
.side-chat-assistant :deep(.comark-content li > p) {
  margin: 0;
}

/* Titre header « Johann's AI » : apparition / disparition douce */
.side-chat-ai-title-enter-active,
.side-chat-ai-title-leave-active {
  transition: opacity 0.28s ease, transform 0.28s ease;
}
.side-chat-ai-title-enter-from,
.side-chat-ai-title-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
</style>

