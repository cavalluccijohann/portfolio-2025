<script setup lang="ts">

const { data: aboutData } = await useAsyncData('about', () => queryCollection('about').first())

useSeoMeta({
  title: 'About - Johanncvl',
  titleTemplate: 'About - Johanncvl',
  description: 'About Johann Cavallucci, a passionate Software Engineer from Paris, France, specializing in web development and creative digital projects.\n',
  ogTitle: 'About - Johanncvl',
  ogDescription: 'About Johann Cavallucci, a passionate Software Engineer from Paris, France, specializing in web development and creative digital projects.\n',
  ogImage: 'og.png',
  twitterCard: 'summary_large_image'
})
</script>
<template>
  <div class="relative -top-[1px]">
    <div class="hidden md:flex w-full flex-row">
      <div v-if="aboutData" class="w-1/3 border-r-10 border-b-10 border-primary rounded-br-2xl p-5 relative -right-1 min-h-1/2">
        <NuxtImg
            :src="aboutData.image"
          alt="Johann Cavallucci"
          class="w-full h-full object-cover rounded-lg shadow-lg"
        />
      </div>
      <div class="w-2/3 bg-primary px-5 flex flex-col">
        <h2 v-if="aboutData" class="leading-[6rem] md:leading-[5rem] lg:leading-none text-[90px]/40 md:text-[80px]/40 lg:text-[125px]/40 xl:text-[168px]/40 font-bread font-bold text-inverted uppercase">
          {{ aboutData.title }}
        </h2>
        <div class="pr-20 mt-5 space-y-4 [&_p]:font-clash-medium [&_p]:text-sm md:[&_p]:text-lg [&_p]:text-inverted">
          <ContentRenderer v-if="aboutData" :value="aboutData" />
        </div>
      </div>
    </div>
    <div class="flex flex-col md:hidden bg-primary px-4 pt-5">
      <h2 v-if="aboutData" class="leading-[5rem] md:leading-[5rem] lg:leading-none text-[68px]/40 md:text-[80px]/40 lg:text-[125px]/40 xl:text-[168px]/40 font-bread font-bold text-inverted">
        {{ aboutData.title }}
      </h2>
      <div class="[&_p]:font-clash-medium [&_p]:text-sm [&_p]:md:text-lg [&_p]:text-inverted mt-5">
        <ContentRenderer v-if="aboutData" :value="aboutData" />
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

