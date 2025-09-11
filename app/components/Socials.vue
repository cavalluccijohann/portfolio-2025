<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  menu?: boolean
}>()

const socials = [
  {
    name: 'GitHub',
    link: 'https://github.com/cavalluccijohann',
  },
  {
    name: 'LinkedIn',
    link: 'https://www.linkedin.com/in/johann-cavallucci/',
  },
  {
    name: 'Twitter',
    link: 'https://x.com/JohannCVL',
  },
]

const hoveredItem = ref('')
</script>

<template>
  <NuxtLink
    v-for="social in socials"
    :key="social.name"
    :to="social.link"
    target="_blank"
    class="relative min-h-11 font-semibold items-center inline-block sm:px-2 justify-center cursor-pointer text-primary duration-300"
    :class="hoveredItem ? 'pb-2' : ''"
    :aria-label="'Go to ' + social.name + ' profile'"
    @mouseenter="hoveredItem = social.name"
    @mouseleave="hoveredItem = ''"
  >
    <!-- font-clash -->
    <span
      class="absolute self-center inset-0 font-clash transition-all duration-100"
      :class="{
        'scale-50 blur-[7px] opacity-0': hoveredItem === social.name,
        'scale-100 blur-none opacity-100': hoveredItem !== social.name
      }"
    >
      {{ social.name }}
    </span>

    <!-- font-estrella -->
    <span
      class="font-estrella text-3xl mb-10 transition-all duration-100 text-center"
      :class="{
        'scale-100 blur-none opacity-100': hoveredItem === social.name,
        'scale-50 blur-[7px] opacity-0': hoveredItem !== social.name
      }"
    >
      {{ social.name }}
    </span>
  </NuxtLink>
</template>

