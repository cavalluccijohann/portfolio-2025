<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  suggestions: {
    type: Array as () => { id: number; label: string; value: string }[],
    required: true,
  }
})

const doubled = computed(() => [...props.suggestions, ...props.suggestions])
</script>

<template>
  <div class="w-full flex items-center justify-center overflow-hidden relative">
    <div class="w-10 h-full bg-gradient-to-r from-white to-white/0 dark:from-black dark:to-black/0 absolute left-0 z-20"/>
    <div class="w-full">
      <div class="flex py-2 animate-marquee w-max">
        <button
            v-for="(suggestion, index) in doubled"
            :key="`${suggestion.id}-${index}`"
            class="px-4 py-2 mx-2 bg-primary/70 whitespace-nowrap flex-shrink-0 hover:bg-primary transition-colors cursor-pointer text-inverted duration-200"
            @click="$emit('select', suggestion.value)"
        >
          {{ suggestion.label }}
        </button>
      </div>

      <!--   same dive but with the animation in the other sens -->
      <div class="flex py-2 animate-marquee w-max" style="animation-direction: reverse;">
        <button
            v-for="(suggestion, index) in doubled"
            :key="`reverse-${suggestion.id}-${index}`"
            class="px-4 py-2 mx-2 bg-primary/70 whitespace-nowrap flex-shrink-0 hover:bg-primary transition-colors cursor-pointer text-inverted duration-200"
            @click="$emit('select', suggestion.value)"
        >
          {{ suggestion.label }}
        </button>
      </div>
    </div>

    <div class="w-10 h-full bg-gradient-to-l from-white to-white/0 dark:from-black dark:to-black/0 absolute right-0"/>
  </div>
</template>

<style scoped>
.animate-marquee {
  animation: marquee 40s linear infinite;
  will-change: transform;
}

.animate-marquee:hover {
  animation-play-state: paused;
}

@keyframes marquee {
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(-50%, 0, 0); }
}
</style>