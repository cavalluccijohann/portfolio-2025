<script setup lang="ts">

const { data: timelineData } = await useAsyncData('timeline', () =>
    queryCollection('timeline').all()
)

const events = computed(() => (timelineData.value?.[0]?.meta?.body as any[]) || [])

const actifEvent = ref(events.value.length - 1)
const scrollContainer = ref(null)

const handleMouseEnter = (index: number) => {
  actifEvent.value = index
}

const handleMouseLeave = () => {
  actifEvent.value = events.value.length - 1
}

const handleClick = (index: number) => {
  actifEvent.value = index
}

onMounted(() => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollLeft = scrollContainer.value.scrollWidth
  }
})

</script>

<template>
  <div class="w-full h-70 mb-8 lg:mb-20">
    <!-- Version Desktop -->
    <div class="hidden lg:flex lg:h-50 justify-center" @mouseleave="handleMouseLeave">
      <div
        v-for="(event, index) in events"
        :key="event.title"
        class="relative flex flex-row cursor-pointer"
        @mouseenter="handleMouseEnter(index)"
      >
        <span class="absolute -top-8 -left-2 text-primary/50">
          {{ event?.date }}
        </span>
        <div class="flex flex-col">
          <div
            class="w-1 rounded-b-sm mx-auto transition-colors"
            :class="[
              index == actifEvent ? 'spring-grow' : 'spring-shrink',
              index > actifEvent ? 'bg-primary/50' : 'bg-primary'
            ]"
          />
          <UIcon
              v-if="event?.icon?.startsWith('i-')"
            :name="event.icon"
            class="size-5 transition-all duration-300 ease-in-out"
            :class="[
              index == actifEvent ? 'scale-130 mt-3 bg-primary' : 'mt-2',
              index < actifEvent ? 'bg-primary/80' : index == actifEvent ? 'bg-primary' : 'bg-primary/50'
            ]"
          />
          <div
            v-else
            class="size-5 transition-all duration-300 ease-in-out flex items-center justify-center"
            :class="[
              index == actifEvent ? 'scale-110 mt-3' : 'mt-2',
              index < actifEvent ? 'text-primary/80' : index == actifEvent ? 'text-primary' : 'text-primary/50'
            ]"
            v-html="event?.icon"
          />
        </div>
        <div
          v-for="n in 5"
          v-if="index < events.length - 1"
          :key="n"
          class="w-1 h-2 rounded-b-sm mx-1 transition-all duration-300 ease-in-out"
          :class="index >= actifEvent ? 'bg-primary/50' : 'bg-primary'"
        />
        <div v-if="actifEvent == index" class="absolute w-80 -left-38 top-50">
          <NuxtLink
            v-if="event.link"
            target="_blank"
            :to="event?.link"
            class="flex flex-row justify-center items-center"
            :class="event.link ? 'hover:opacity-70 transition-all duration-300' : ''"
          >
            <UIcon
              v-if="event.link"
              name="i-lucide-external-link"
              class="size-4 bg-primary mr-2"
            />
            <h2 class="text-primary font-clash-bold text-lg">
              {{ event.title }}
            </h2>
          </NuxtLink>
          <div v-else class="flex flex-row justify-center items-center">
            <UIcon
              v-if="event.link"
              name="i-lucide-external-link"
              class="size-4 bg-primary mr-2"
            />
            <h2 class="text-primary font-clash-bold text-lg">
              {{ event.title }}
            </h2>
          </div>
          <p class="text-primary font-clash-regular text-sm">
            {{ event.description }}
          </p>
        </div>
      </div>
    </div>

    <!-- Mobile Version -->
    <div class="lg:hidden relative px-4">
      <div
        ref="scrollContainer"
        class="flex md:justify-center overflow-x-auto scrollbar-hide pb-4 pt-8 px-8 scroll-smooth"
        style="scrollbar-width: none; -ms-overflow-style: none;"
      >
        <div
          v-for="(event, index) in events"
          :key="event.title"
          class="relative flex flex-col items-center cursor-pointer flex-shrink-0"
          @click="handleClick(index)"
        >
          <!-- Date -->
          <span class="absolute -top-8 -left-1 text-primary/50 text-xs whitespace-nowrap">
            {{ event?.date }}
          </span>

          <!-- Timeline element -->
          <div class="flex items-start">
            <!-- Icon -->
            <div class="flex flex-col items-center">
              <div
                class="w-1 rounded-b-sm mx-auto transition-colors"
                :class="[
                  index == actifEvent ? 'spring-grow' : 'spring-shrink',
                  index > actifEvent ? 'bg-primary/50' : 'bg-primary'
                ]"
              />
              <UIcon
                  v-if="event?.icon?.startsWith('i-')"
                :name="event.icon"
                class="size-6 transition-all duration-300 ease-in-out mt-2"
                :class="[
                  index == actifEvent ? 'scale-125 bg-primary' : 'scale-100',
                  index < actifEvent ? 'bg-primary/80' : index == actifEvent ? 'bg-primary' : 'bg-primary/50'
                ]"
              />
              <div
                v-else
                class="size-6 transition-all duration-300 ease-in-out flex items-center justify-center mt-3"
                :class="[
                  index == actifEvent ? 'scale-125' : 'scale-100',
                  index < actifEvent ? 'text-primary/80' : index == actifEvent ? 'text-primary' : 'text-primary/50'
                ]"
                v-html="event?.icon"
              />
            </div>
            <div
              v-for="n in 5"
              v-if="index < events.length - 1"
              class="w-1 h-2 rounded-b-sm mx-1 transition-all duration-300 ease-in-out"
              :class="index >= actifEvent ? 'bg-primary/50' : 'bg-primary'"
            />
          </div>
        </div>
      </div>

      <!-- Details of the selected event -->
      <div class="mt-6 px-4 min-h-24">
        <div
          v-if="events[actifEvent]"
          :key="actifEvent"
          class="text-center transform transition-all duration-500 ease-in-out"
        >
          <NuxtLink
            target="_blank"
            :to="events[actifEvent]?.link"
            class="inline-flex items-center justify-center mb-3"
            :class="events[actifEvent].link ? 'hover:opacity-70 transition-all duration-300' : ''"
          >
            <UIcon
              v-if="events[actifEvent].link"
              name="i-lucide-external-link"
              class="size-4 bg-primary mr-2"
            />
            <h3 class="text-primary font-clash-bold text-lg">
              {{ events[actifEvent].title }}
            </h3>
          </NuxtLink>
          <p class="text-primary font-clash-regular text-sm leading-relaxed">
            {{ events[actifEvent].description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}


@keyframes springGrow {
  0%   { height: 5.5rem; }   /* h-22 */
  60%  { height: 10rem; }    /* dépasse un peu (rebond) */
  100%  { height: 9.7rem; }
}

@keyframes springShrink {
  0%   { height: 9.7rem; }   /* h-38 */
  60%  { height: 7rem; }
  100%  { height: 6.5rem; }
}

.spring-grow {
  animation: springGrow 0.6s ease-out forwards;
}

.spring-shrink {
  animation: springShrink 0.6s ease-out forwards;
}
</style>
