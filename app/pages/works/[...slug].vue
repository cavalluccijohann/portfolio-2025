<script setup lang="ts">
import { findPageHeadline } from '@nuxt/ui-pro/utils/content'

const route = useRoute()

const { data: page } = await useAsyncData(route.path, () => queryCollection('works').path(route.path).first())

const headline = computed(() => findPageHeadline(page.value))
</script>

<template>
  <div v-if="page" class="flex max-w-5xl mx-auto flex-col items-center min-h-screen py-20">
    <h1 class="font-clash-medium text-primary text-6xl">
      {{ page.title }}
    </h1>
    <div class="w-full flex mt-10 px-10 justify-around">
      <!--    Technologies    -->
      <div class="flex flex-col items-center gap-2 w-1/3">
        <span class="font-clash-medium text-primary text-xl">
          Technologies
        </span>
        <div class="flex flex-col items-center gap-2">
          <div class="flex gap-2">
            <UBadge
              v-for="tech in page.technologies.slice(0, 2)"
              :key="tech"
              class="font-bold font-clash-medium rounded-full ring-1 ring-primary/40 bg-primary/70 px-4"
            >
              {{ tech }}
            </UBadge>
          </div>

          <div v-if="page.technologies.length > 2" class="flex gap-2">
            <UBadge
              v-for="tech in page.technologies.slice(2)"
              :key="tech"
              class="font-bold font-clash-medium rounded-full ring-1 ring-primary/40 bg-primary/70 px-4"
            >
              {{ tech }}
            </UBadge>
          </div>
        </div>
      </div>

      <!--    Team    -->
      <div class="flex flex-col items-center gap-2 w-1/3">
        <span class="font-clash-medium text-primary text-xl">
          {{ page?.teamName }}
        </span>
        <UAvatarGroup :ui="{ base: 'ring-primary/50'}">
          <NuxtLink v-for="author in page?.authors" :to="author.to">
            <UAvatar
              :key="author.name"
              :src="author.avatar.src"
              :alt="author.avatar.alt"
              size="lg"
            />
          </NuxtLink>
        </UAvatarGroup>
      </div>

      <!--    Role    -->
      <div class="flex flex-col items-center gap-2 w-1/3">
        <span class="font-clash-medium text-primary text-xl">
          Role
        </span>
        <div class="flex flex-wrap items-center justify-center">
          <span v-for="(role, index) in page.roles" :key="role" class="font-bold font-clash-medium text-primary/70">
            {{ role }}{{ index < page.roles.length - 1 ? ', ' : '' }}
          </span>
        </div>
      </div>
    </div>

    <ProseImg
      :src="page.image"
      :alt="page.title"
      class="mt-10 rounded-lg shadow-lg w-full max-w-4xl h-120 object-cover"
    />

    <ContentRenderer
      :value="page.body"
      class="mt-10 max-w-3xl"
    />
  </div>
</template>


