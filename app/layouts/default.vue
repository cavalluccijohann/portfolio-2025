<template>
  <div class="scrollbar-hide flex min-h-screen w-full flex-col overflow-hidden">
    <LayoutNavBar />
    <div class="px-4">
      <slot />
    </div>
    <LayoutFooter />
  </div>
</template>

<script setup lang="ts">
</script>