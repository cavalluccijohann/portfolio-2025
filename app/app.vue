<script setup lang="ts">
import colors from 'tailwindcss/colors'

const appConfig = useAppConfig()
const colorMode = useColorMode()
const color = computed(() => colorMode.value === 'dark' ? (colors as any)[appConfig.ui.colors.neutral][950] : 'white')

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
</script>

<template>
  <Html lang="en">
    <Body
      class="overscroll-y-none selection:bg-primary overflow-x-hidden selection:text-inverted "
      :class="$route.path === '/contact' ? 'orange' : 'bg-white dark:bg-black'"
    >
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>
