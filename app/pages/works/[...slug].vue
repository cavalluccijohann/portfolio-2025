<script setup lang="ts">
import { findPageHeadline } from '@nuxt/ui-pro/utils/content'

const route = useRoute()

const { data: page } = await useAsyncData(route.path, () => queryCollection('works').path(route.path).first())

console.log(page.value)

const headline = computed(() => findPageHeadline(page.value))
</script>

<template>
  <UPage>
    <UPageHeader v-bind="page" :headline />
  </UPage>
</template>
