<script setup lang="ts">
import { ref, watch } from 'vue'


// Init
const route = useRoute()
const hoveredItem = ref('')
const isMenuOpen = ref(false)
const items = [
  {
    label: 'Home',
    to: '/',
  },
  {
    label: 'Projects',
    to: '/works'
  },
  {
    label: 'About',
    to: '/about'
  },
  /*  {
    label: 'Blog',
    to: '/blog'
  },*/
  {
    label: 'Contact',
    to: '/contact'
  }
]

watch(isMenuOpen, (open) => {
  if (open) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

/**
 * Check if the current route is active based on the provided path.
 * @param path
 */
function isActive(path: string) {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}

</script>

<template>
  <header class="flex justify-between items-center min-w-full px-5 md:px-15 py-2">
    <!-- Bouton burger -->
    <button
      class="lg:hidden flex flex-col justify-between w-8 h-6 z-60"
      aria-label="Toggle menu"
      @click="isMenuOpen = !isMenuOpen"
    >
      <span :class="['block h-1 w-full transition-all rounded', isMenuOpen ? 'bg-white dark:bg-black rotate-45 translate-y-2' : 'bg-primary']" />
      <span :class="['block h-1 w-full transition-all rounded', isMenuOpen ? 'opacity-0' : 'bg-primary']" />
      <span :class="['block h-1 w-full transition-all rounded', isMenuOpen ? 'bg-white dark:bg-black -rotate-45 -translate-y-2' : 'bg-primary']" />
    </button>
    <a
      aria-current="page"
      href="/"
      class="flex items-center space-x-2 whitespace-nowrap min-w-fit z-60"
      aria-label="Johann Cavallucci"
    >
      <div class="flex items-center justify-center w-10 h-10 text-inverted text-white dark:text-black">
        <svg
          :class="['size-10', isMenuOpen ? 'fill-white dark:fill-black' : 'fill-primary']"
          viewBox="0 0 224 334"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M176.859 271.5C151.881 304.06 115.996 306.779 91.6498 301.307C86.4151 300.131 80.8352 301.052 76.6727 304.438C67.9302 311.548 69.739 324.484 80.3571 328.258C83.2434 329.284 85.6938 330.102 87.1526 330.5C97.7171 332.421 114.346 335.732 136.152 330.5C148.404 327.56 163.152 322 178.152 311C208.409 288.812 219.896 256.654 222.845 233.33C223.847 225.407 217.271 219 209.284 219C200.89 219 194.334 226.083 193.109 234.388C190.369 252.961 181.627 266.335 176.859 271.5Z"
          />
          <path
            d="M199.027 65.692C190.648 113.905 176.564 176.607 149.152 217.5C122.348 257.487 88.6155 286.727 59.6525 293.8C39.0237 298.837 21.2819 292.682 11.6525 271.5C-8.12274 228 0.15249 192 15.1525 165C28.2524 143.291 47.6414 127.936 62.6526 121C79.4464 113.241 92.6526 110.5 106.153 110C106.453 109.989 107.153 110.022 108.179 110.083C118.564 110.696 125.208 122.096 120.296 131.266C117.768 135.984 112.729 138.721 107.389 139.089C94.397 139.984 76.8752 144.322 61.6525 156C49.9118 165.007 39.1419 178.795 32.6525 197.5C28.0091 214.708 28.707 227.141 30.6525 237C32.2683 245.189 34.4764 251.602 37.6525 257.5C44.6525 270.5 61.6525 267.5 80.1525 253L80.4687 252.752C90.0695 245.228 97.7309 239.223 108.152 227C113.286 220.979 119.471 213.651 126.152 203.5C154.078 161.074 166.942 98.5921 172.114 61.9572C173.077 55.1403 178.848 50 185.732 50C194.081 50 200.456 57.4668 199.027 65.692Z"
          />
          <path
            d="M194 28C201.732 28 208 21.732 208 14C208 6.26801 201.732 0 194 0C186.268 0 180 6.26801 180 14C180 21.732 186.268 28 194 28Z"
          />
        </svg>
      </div>
      <p class="hidden lg:block lg:absolute ml-9 text-primary font-semibold text-base font-clash tracking-wider pl-5">Johann Cavallucci</p>
    </a>
    <nav class="hidden lg:block">
      <ul class="flex space-x-6 justify-start">
        <li
          v-for="item in items"
          :key="item.label"
          class="flex items-center justify-center"
          :style="{ width: `calc(${item.label.length}ch)` }"
        >
          <a
            v-if="isActive(item.to)"
            :href="item.to"
            class="text-primary font-semibold text-4xl mb-2 font-estrella text-center"
          >
            {{ item.label }}
          </a>

          <a
            v-else
            :href="item.to"
            class="text-primary font-semibold text-center"
            :class="{
              'font-estrella text-4xl mb-2': hoveredItem === item.label,
              'font-clash text-base': hoveredItem !== item.label
            }"
            @mouseenter="hoveredItem = item.label"
            @mouseleave="hoveredItem = ''"
          >
            {{ item.label }}
          </a>
        </li>
      </ul>
    </nav>

    <UColorModeButton size="xl" color="primary" class="'cursor-pointer hover:bg-transparent z-60 scale-125 md:scale-100  " :class="isMenuOpen ? 'text-white! dark:text-black!' : 'text-primary'" />
  </header>

  <!-- Menu mobile -->
  <div
    v-if="isMenuOpen"
    class="fixed inset-0 z-50 bg-[#FF5800] text-inverted p-6 flex flex-col items-center justify-center space-y-6 overflow-y-auto lg:hidden transition-transform duration-300 ease-in-out"
  >
    <a
      v-for="item in items"
      :key="item.label"
      :href="item.to"
      :class="[
        'text-center transition-colors duration-200',
        isActive(item.to)
          ? 'text-inverted font-estrella text-7xl'
          : 'text-inverted font-clash-light text-3xl'
      ]"
      @mouseenter="hoveredItem = item.label"
      @mouseleave="hoveredItem = ''"
    >
      {{ item.label }}
    </a>

    <div class="absolute bottom-0 mb-10 flex flex-row items-center mt-30">
      <Socials :menu="true" />
    </div>
  </div>


  <div class="hidden sm:block border-b border-b-primary mx-10" />
</template>

<style>
button[aria-label="Open menu"], button[aria-label="Close menu"] {
  color: var(--color-primary);
}


</style>
