<script setup lang="ts">
import type { ProjectMenu } from '~~/types'

const route = useRoute()


const { data: projects, status } = await useAsyncData(route.path, async () => {
  return await queryCollection('works').all()
})

if (!projects.value) {
  throw createError({ statusCode: 404, statusMessage: `Page not found: ${route.path}`, fatal: true })
}

console.log('projects', projects.value)

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
  <div v-if="projects" class="flex flex-col h-min-screen">
    <Menu :projects />
  </div>
</template>

<style scoped></style>

