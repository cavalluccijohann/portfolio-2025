<script setup lang="ts">
const route = useRoute()


const { data: projects, status } = await useAsyncData(route.path, async () => {
  const content = await queryCollection('content').all()
  return content.filter(item =>
    item.path.startsWith('/works/') && item.path !== '/works'
  )
})

if (!projects.value) {
  throw createError({ statusCode: 404, statusMessage: `Page not found: ${route.path}`, fatal: true })
}


</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-4xl font-bold mb-4">
      Works Page
    </h1>
    <p v-for="work in projects" :key="work.id" class="text-lg text-gray-900">
      {{ work.title }} - {{ work.description }}
    </p>
  </div>
</template>

<style scoped></style>

