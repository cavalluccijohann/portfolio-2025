<script setup lang="ts">
import { ref } from 'vue'

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
    class="flex items-center px-2 justify-center cursor-pointer  text-primary duration-300"
    :aria-label="'Go to ' + social.name + ' profile'"
  >
    <span
      class="text-primary inline-block w-20 text-center transition-all duration-300"
      :class="{
        'font-estrella text-2xl': hoveredItem === social.name,
        'font-clash-regular text-base py-[4.3px]': hoveredItem !== social.name
      }"
      @mouseenter="hoveredItem = social.name"
      @mouseleave="hoveredItem = ''"
    >
      {{ social.name }}
    </span>
  </nuxtlink>
</template>

<style scoped></style>

