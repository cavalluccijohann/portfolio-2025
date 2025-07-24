<template>
  <div class="scrollbar-hide flex min-h-screen w-full flex-col overflow-hidden">
    <LayoutNavBar />
    <div class="noise-background" />
    <div class="flex-1 h-full">
      <slot />
    </div>
  </div>
</template>

<style scoped>

</style>
