<template>
  <div class="scrollbar-hide flex min-h-screen w-full flex-col overflow-hidden">
    <LayoutNavBar />
    <div class="noise-background" />
    <div class="px-4 flex-1 h-full">
      <slot />
    </div>
    <LayoutFooter />
  </div>
</template>

<style scoped>


</style>
