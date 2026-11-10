<script setup lang="ts">
/**
 * Renders a markdown `# heading` from a project body as an <h2>,
 * because the project page already has its own <h1> (the project title).
 * Classes mirror Nuxt UI's ProseH1 + app.config prose.h1 so the look is unchanged.
 */
defineProps<{ id?: string }>()
</script>

<template>
  <h2
    :id="id"
    class="text-4xl font-bold mb-8 scroll-mt-[calc(45px+var(--ui-header-height))] lg:scroll-mt-(--ui-header-height) text-primary font-clash-medium"
  >
    <slot />
  </h2>
</template>
