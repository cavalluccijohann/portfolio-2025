<script setup lang="ts">
const { open } = useSideChat()
</script>

<template>
  <div class="scrollbar-hide flex min-h-screen w-full flex-col overflow-hidden">
    <LayoutNavBar />
    <div
      class="noise-background"
      :class="$route.path === '/contact' ? 'noise-background-orange' : ''"
    />
    <div class="flex-1 h-full">
      <slot />
    </div>
    <div class="side-chat-palette fixed bottom-0 right-0 text-center text-sm text-gray-500 px-5 pb-2 sm:p-4">
      <UButton
          class="absolute bottom-3 right-3 bg-primary rounded-none p-2 hover:bg-primary transition-transform cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 border-2 border-white dark:border-black hover:scale-104"
          @click="open = !open"
      >
        <UIcon name="i-lucide-bot-message-square" class="size-5 text-inverted" />
      </UButton>
    </div>

    <SideChat />
  </div>
</template>
