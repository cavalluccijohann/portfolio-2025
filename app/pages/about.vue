<script setup lang="ts">

const { data: aboutData } = await useAsyncData('about', () => queryCollection('about').first())

useSeoMeta({
  title: 'About - Johanncvl',
  titleTemplate: 'About - Johanncvl',
  description: 'About Johann Cavallucci, a passionate Software Engineer from Paris, France, specializing in web development and creative digital projects.\n',
  ogTitle: 'About - Johanncvl',
  ogDescription: 'About Johann Cavallucci, a passionate Software Engineer from Paris, France, specializing in web development and creative digital projects.\n',
  ogImage: '/og.jpg',
  twitterCard: 'summary_large_image'
})
</script>
<template>
  <div class="relative -top-[1px]">
    <!-- Single block for mobile + desktop: one <h1>, content rendered once -->
    <div v-if="aboutData" class="flex flex-col md:flex-row w-full">
      <div class="hidden md:block w-1/3 border-r-10 border-b-10 border-primary rounded-br-2xl p-5 relative -right-1 min-h-1/2">
        <NuxtImg
          :src="aboutData.image"
          alt="Johann Cavallucci"
          sizes="md:33vw"
          class="w-full h-full object-cover rounded-lg shadow-lg"
        />
      </div>
      <div class="w-full md:w-2/3 bg-primary px-4 pt-5 md:px-5 md:pt-0 flex flex-col">
        <h1 class="leading-[5rem] lg:leading-none text-[68px]/40 md:text-[80px]/40 lg:text-[125px]/40 xl:text-[168px]/40 font-bread font-bold text-inverted md:uppercase">
          {{ aboutData.title }}
        </h1>
        <div class="mt-5 md:pr-20 md:space-y-4 [&_p]:[font-family:'ClashDisplay-Medium',Arial,sans-serif] [&_p]:text-sm md:[&_p]:text-lg [&_p]:text-inverted">
          <ContentRenderer :value="aboutData" />
        </div>
      </div>
    </div>
    <div class="w-full bg-primary relative -top-[0.7rem] py-3">
      <p class="text-center text-inverted font-clash-medium text-4xl md:text-5xl font-semibold py-4">
        Timeline
      </p>
    </div>
    <div class="w-full flex justify-center text-center my-20 font-clash-medium">
      <Timeline />
    </div>
  </div>
</template>

