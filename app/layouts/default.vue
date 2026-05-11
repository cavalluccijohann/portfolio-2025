<script setup lang="ts">
const open = ref(true)
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

    <SideChat v-model:open="open" />
  </div>
</template>
