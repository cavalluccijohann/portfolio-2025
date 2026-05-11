<script setup lang="ts">
const open = defineModel<boolean>('open', { required: true })

type ChatMessage = { role: 'user' | 'assistant'; content: string }

const messages = ref<ChatMessage[]>([])
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
      body: { question },
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
      class="[--sidebar-width:min(28rem,calc(100vw-2rem))]"
      :menu="{
        ui: {
          content: 'max-w-2xl',
        },
      }"
     :ui="{
        container: 'h-full bg-white dark:bg-black border-l border-primary z-99',
        inner: 'flex size-full flex-col overflow-hidden !divide-y-0',
        body: 'min-h-0 flex-1 overflow-hidden',
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
        <div class="flex h-full min-h-0 flex-col gap-3 p-4">
          <div
            ref="listEl"
            class="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto pr-1"
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
                class="mr-4 border border-primary/40 bg-transparent px-3 py-2 text-sm text-primary whitespace-pre-wrap leading-relaxed"
              >
                {{ msg.content }}
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
      </template>


      <template #footer>
        <div class="relative w-full border-t border-primary/20 p-2">
          <textarea
            v-model="draft"
            rows="3"
            placeholder="Ask me anything"
            :disabled="pending"
            class="block min-h-20 w-full resize-none border-[1.5px] border-primary rounded-none p-2 pr-14 font-clash-medium text-primary align-top leading-normal placeholder:text-primary/50 focus:border-b-4 focus:outline-none transition-all duration-300 disabled:opacity-50"
            @keydown="onComposerKeydown"
          />
          <UButton
            class="absolute bottom-4 right-3 bg-primary rounded-none p-2 hover:bg-primary transition-transform cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
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

