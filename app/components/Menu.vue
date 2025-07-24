<script setup lang="ts">
import { Ticker } from 'motion-plus-vue'
import { AnimatePresence, motion } from 'motion-v'
import { ref } from 'vue'
import type { ProjectMenu } from '~~/types'

interface Props {
  projects: ProjectMenu[]
}

const props = defineProps<Props>()

const hoveredIndex = ref<number | null>(null)

const handleHoverStart = (index: number) => {
  hoveredIndex.value = index
}

const handleHoverEnd = () => {
  hoveredIndex.value = null
}
</script>

<template>
  <nav class="flex flex-col items-center justify-center overflow-hidden w-full bg-transparent">
    <template v-for="(project, index) in projects" :key="index">
      <motion.div
        class=" py-3 font-bold text-primary leading-none w-full flex justify-center items-center py-2.5 relative no-underline"
        @hover-start="() => handleHoverStart(index)"
        @hover-end="handleHoverEnd"
      >
        <NuxtLink
          :to="project.path"
          class="flex-1"
        >
          <div class="flex  items-center justify-between w-full px-10 relative">
            <div>
              <span class="text-primary font-bread text-7xl mr-3">
                {{ index + 1 }}
              </span>
            </div>
            <div class="flex flex-1 flex-col justify-between px-10 items-start w-full w-auto ">
              <span class="text-5xl  font-clash-medium">{{ project.name }}</span>
              <span class="text-3xl normal-case leading-relaxed font-clash-light">{{ project.description }}</span>
            </div>
            <div>
              <div>
                <span class="text-2xl font-bread text-primary [writing-mode:vertical-lr] [text-orientation:upright]">
                  {{ project.date }}
                </span>
              </div>
            </div>
          </div>

          <AnimatePresence>
            <Ticker
              v-if="hoveredIndex === index"
              class="ticker bg-primary text-inverted"
              :style="{ position: 'absolute' }"
              :initial="{ clipPath: 'inset(50% 0 50% 0)' }"
              :animate="{ clipPath: 'inset(0% 0 0% 0)' }"
              :exit="{
                clipPath: 'inset(50% 0 50% 0)',
                transition: { duration: 0.1 }
              }"
              :transition="{
                duration: 0.2,
                ease: 'easeOut'
              }"
            >
              <div class="flex flex-col items-center text-center">
                <span class="text-5xl font-bold mb-2">{{ project.name }}*</span>
              </div>
              <img :src="project.image" class="w-32 object-cover rounded mb-2">
            </Ticker>
          </AnimatePresence>
        </NuxtLink>
      </motion.div>

      <div class="w-full px-10">
        <div class="w-full h-px bg-primary" />
      </div>
    </template>
  </nav>
</template>

<style scoped>
.ticker {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  font-style: italic;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
