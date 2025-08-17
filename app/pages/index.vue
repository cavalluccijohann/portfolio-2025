<script setup lang="ts">
</script>

<template>
  <CanvaDraw />
  <div class="w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
    <h1 class="text-[7vh] sm:text-[15vh] font-bold text-center mb-5 sm:mb-0 sm:mt-10 w-full text-primary font-clash-regular leading-tight sm:leading-normal">
      Johann Cavallucci
    </h1>
    <p class="text-center font-clash-regular text-md sm:text-lg font-semibold text-primary w-full max-w-2xl px-5 sm:mx-auto">
      Ex qui do enim fugiat esse dolore labore ea non pariatur cillum ad ea. Duis consectetur velit non occaecat ea velit cupidatat.
    </p>
  </div>
  <div class="absolute bottom-0 left-0 w-full text-center text-sm text-gray-500 px-5 pb-2 sm:p-4">
    <div class="w-full mx-4 sm:px-0 sm:w-1/3 h-[1px] bg-primary mx-auto mb-2" />
    <div class="w-1/2 sm:w-1/2 mx-auto flex items-center justify-center gap-4 sm:gap-6">
      <Socials />
    </div>
  </div>
</template>
