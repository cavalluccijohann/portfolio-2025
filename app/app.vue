<script setup lang="ts">
const [{ data: navigation }, { data: files }] = await Promise.all([
  useAsyncData('navigation', () => {
    return Promise.all([queryCollectionNavigation('works')])
  }, {
    transform: data => data.flat()
  }),
  useLazyAsyncData('search', () => {
    return Promise.all([queryCollectionSearchSections('works')])
  }, {
    server: false,
    transform: data => data.flat()
  })
])

provide('navigation', navigation!)

console.log('Navigation:', navigation.value)
</script>

<template>
  <Html lang="en">
    <Body class="overscroll-y-none selection:bg-primary overflow-x-hidden selection:text-inverted bg-white">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>
