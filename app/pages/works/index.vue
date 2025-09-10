<script setup lang="ts">
import { ref } from 'vue'
import { motion, stagger } from 'motion-v'
import type { ProjectMenu } from '~~/types'

useSeoMeta({
  title: 'Projects - Johanncvl',
  titleTemplate: 'Projects - Johanncvl',
  description: 'Explore the projects of Johann Cavallucci, Software Engineer, showcasing web development, software, and creative digital work.\n',
  ogTitle: 'Projects - Johanncvl',
  ogDescription: 'Explore the projects of Johann Cavallucci, Software Engineer, showcasing web development, software, and creative digital work.\n',
  ogImage: 'og.png',
  twitterCard: 'summary_large_image'
})

const route = useRoute()

const { data: projects, status } = await useAsyncData(route.path, async () => {
  return await queryCollection('works').all()
})

if (!projects.value) {
  throw createError({ statusCode: 404, statusMessage: `Page not found: ${route.path}`, fatal: true })
}

projects.value = projects.value.map((item: any) => {
  return {
    name: item.title,
    path: item.path,
    date: item.year,
    description: item.description || '',
    image: item.image,
  } as ProjectMenu
}).sort((a, b) => b.date - a.date)
</script>

<template>
  <motion.div
    v-if="projects"
    class="flex flex-col h-min-screen"
    :variants="{
      hidden: {},
      visible: {
        transition: {
          delayChildren: stagger(0.1),
        },
      },
    }"
    initial="hidden"
    animate="visible"
  >
    <motion.div
      :variants="{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }"
      :transition="{ duration: 0.5, ease: 'easeOut' }"
    >
      <Menu :projects />
    </motion.div>
  </motion.div>
</template>
