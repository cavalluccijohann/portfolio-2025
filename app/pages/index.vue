<script setup lang="ts">
import { ref } from 'vue'


</script>

<template>
  <CanvaDraw />
  <div class="w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
    <h1 class="text-[15vh] font-bold text-center mt-10 w-full text-primary font-clash">
      Johann Cavallucci
    </h1>
    <p class="text-center font-clash-regular text-lg font-semibold text-primary w-full max-w-2xl mx-auto">
      Ex qui do enim fugiat esse dolore labore ea non pariatur cillum ad ea. Duis consectetur velit non occaecat ea velit cupidatat.
    </p>
  </div>
  <!--  link
  bottom the canva  -->
  <div class="absolute bottom-0 left-0 w-full text-center text-sm text-gray-500 p-4">
    <div class="w-1/3 h-[1px] bg-primary mx-auto mb-2" />

    <!-- social display name link    -->

    <div class="w-1/2 mx-auto flex items-center justify-center gap-4 sm:gap-6">
      <Socials />
    </div>
  </div>

<!--  <div class=" ">
    <div class="flex text-primary items-center justify-center gap-6 sm:gap-10 my-7 z-10">
      <NuxtLink
          v-for="social in socials"
          :key="social.name"
          :to="social.link"
          target="_blank"
          class="flex items-center justify-center cursor-pointer"
          :aria-label="'Go to ' + social.name + ' profile'"
      >
        <span class="sr-only">Go to {{ social.name }} profile</span>
        <component
            :is="social.logo"
            class="social-item w-6 h-6 transition-all duration-300 text-color-text hover:text-primary-color"
            :fontControlled="false"
            :alt="social.name + ' logo'"
            :aria-label="social.name + ' logo'"
        />
      </NuxtLink>
    </div>
  </div>-->
</template>
