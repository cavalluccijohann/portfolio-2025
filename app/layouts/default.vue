<script setup lang="ts">
const open = ref(false)
const colorMode = useColorMode()
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
    <div class="fixed bottom-0 right-0 text-center text-sm text-gray-500 px-5 pb-2 sm:p-4">
      <UButton class="w-1/2 p-7 bg-primary py-2 text-inverted text-xl font-clash-medium flex items-center justify-center gap-2 hover:scale-105 transition-transform cursor-pointer" @click="open = !open">
        IA
      </UButton>
    </div>
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
      }"
    >
      <template #header="{ close }">
        <div class="flex w-full items-center justify-between gap-2">
         <button @click="close" class="bg-primary p-2 flex items-center justify-center size-10 hover:scale-105 transition-transform cursor-pointer">
          <UIcon name="i-lucide-x" class="size-5 text-inverted" />
         </button>
        </div>
      </template>
    </USidebar>
  </div>
</template>
