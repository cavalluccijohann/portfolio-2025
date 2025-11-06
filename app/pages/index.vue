<script setup lang="ts">
const draw = ref(false)
const isVisible = ref(false)

onMounted(() => {
  // Délai pour déclencher l'animation après le montage
  setTimeout(() => {
    isVisible.value = true
  }, 10)
})

useSeoMeta({
  title: 'Johann Cavallucci - Software engineer',
  titleTemplate: 'Johann Cavallucci - Portfolio',
  description: 'Portfolio of Johann Cavallucci, Software Engineer specializing in web and modern application development. I create tailored digital experiences for your projects.',
  ogTitle: 'Johann Cavallucci - Software engineer',
  ogDescription: 'Portfolio of Johann Cavallucci, Software Engineer specializing in web and modern application development. I create tailored digital experiences for your projects.',
  ogImage: 'og.png',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <CanvaDraw :draw />
  <div
    class="w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:-z-10"
    :class="draw ? '-z-10' : 'z-10'"
  >
    <h1
      class="text-[7vh] sm:text-[15vh] font-bold text-center mb-5 sm:mb-0 sm:mt-10 w-full text-primary font-clash-regular leading-tight sm:leading-normal"
      :class="[
        draw ? 'opacity-25 transition-opacity duration-300' : '',
        isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
      ]"
    >
      Johann Cavallucci
    </h1>
    <p 
      v-if="!draw" 
      class="text-center font-clash-regular text-md sm:text-lg 2xl:text-2xl font-semibold text-primary w-full max-w-2xl px-5 sm:mx-auto"
      :class="isVisible ? 'animate-fade-in-up-delay-200' : 'opacity-0 translate-y-8'"
    >
      It all starts with a sketch. An idea, a vision.<br>
      My goal: turning that vision into digital experiences.
    </p>
    <div
      class="md:hidden flex w-full justify-center mt-5"
      :class="[
        draw ? 'hidden' : '',
        isVisible ? 'animate-fade-in-up-delay-300' : 'opacity-0 translate-y-8'
      ]"
    >
      <UButton
        class="w-1/2 bg-primary py-2 text-inverted text-xl font-clash-medium flex items-center justify-center gap-2 hover:scale-105 transition-transform"
        @click="() => { draw = !draw }"
      >
        <UIcon name="i-lucide-brush" class="size-5 text-inverted" />
        Start Sketch
      </UButton>
    </div>
  </div>

  <div
    class="absolute bottom-0 left-0 w-full text-center text-sm text-gray-500 px-5 pb-2 sm:p-4"
  >
    <div
      class="md:hidden flex w-full justify-center mt-5"
      :class="draw ? '' : 'hidden'"
    >
      <UButton
        class="w-1/2 bg-primary py-2 text-inverted text-xl font-clash-medium flex items-center justify-center gap-2 hover:scale-105 transition-transform"
        @click="() => { draw = !draw }"
      >
        <UIcon name="i-lucide-undo-2" class="size-5 text-inverted" />
        Back
      </UButton>
    </div>
    <div 
      class="w-full mx-4 sm:px-0 sm:w-1/3 h-[1px] bg-primary mx-auto mb-2" 
      :class="[
        draw ? 'hidden' : '',
        isVisible ? 'animate-fade-in-delay-500' : 'opacity-0'
      ]" 
    />
    <div 
      class="w-1/2 sm:w-1/2 mx-auto flex items-center justify-center gap-4 sm:gap-6" 
      :class="[
        draw ? 'hidden' : '',
        isVisible ? 'animate-fade-in-delay-600' : 'opacity-0'
      ]"
    >
      <Socials />
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(2rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
}

.animate-fade-in-up-delay-200 {
  animation: fade-in-up 0.8s ease-out 0.2s forwards;
  opacity: 0;
}

.animate-fade-in-up-delay-300 {
  animation: fade-in-up 0.8s ease-out 0.3s forwards;
  opacity: 0;
}

.animate-fade-in-delay-500 {
  animation: fade-in 0.8s ease-out 0.5s forwards;
  opacity: 0;
}

.animate-fade-in-delay-600 {
  animation: fade-in 0.8s ease-out 0.6s forwards;
  opacity: 0;
}
</style>
