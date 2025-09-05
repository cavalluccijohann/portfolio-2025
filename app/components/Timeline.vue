<script setup lang="ts">
const events = [
  {
    date: 2019,
    icon: 'i-lucide-footprints',
    title: 'La Valeur Sûre',
    link: 'https://www.instagram.com/lavaleursurefr_/',
    description: 'My first business: an Instagram account for buying and reselling sneakers. It was my very first entrepreneurial step.'
  },
  {
    date: 2020,
    icon: 'i-lucide-graduation-cap',
    title: 'Epitech',
    description: 'My first steps into computer science by joining Epitech. This is where it all really began.'
  },
  {
    date: 2022,
    icon: '<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">\n' + '<path d="M34.7638 6.30227C34.7638 5.54595 34.1466 4.92969 33.389 4.92969C32.6314 4.92969 32.0142 5.54595 32.0142 6.30227C32.0142 7.0586 32.6314 7.67486 33.389 7.67486C34.1466 7.67486 34.7638 7.0586 34.7638 6.30227Z" fill="currentColor"/>\n' + '<path d="M5.63986 24.6225L8.72623 21.5132C7.23916 20.6728 6.22908 19.0761 6.22908 17.2274C6.22908 14.5102 8.44565 12.3253 11.1392 12.3253C13.8328 12.3253 16.0493 14.5382 16.0493 17.2274C16.0493 19.9165 13.8328 22.1295 11.1392 22.1295C10.8306 22.1295 10.55 22.1014 10.2694 22.0454L7.40751 25.1828V37.452L19.0796 26.6674V17.6475L20.8753 15.8548V14.6222C19.9213 13.978 19.3041 12.8855 19.3041 11.653C19.3041 9.66413 20.9314 8.03944 22.9235 8.03944C24.9156 8.03944 26.543 9.66413 26.543 11.653C26.543 13.6418 24.9156 15.2665 22.9235 15.2665C22.6149 15.2665 22.3063 15.2105 21.9976 15.1545V16.499L20.2861 18.2078V25.5469L31.7337 14.9584V8.87979C30.892 8.34757 30.3028 7.39516 30.3028 6.30269C30.3028 4.62197 31.6776 3.24939 33.3611 3.24939C35.0445 3.24939 36.4194 4.62197 36.4194 6.30269C36.4194 7.98341 35.0445 9.356 33.3611 9.356C33.2488 9.356 33.1085 9.356 32.9963 9.32799V13.7539L47.867 0H21.4645C9.79243 0 0.336914 9.44003 0.336914 21.093V43.9508L5.6118 39.0767V24.6225H5.63986Z" fill="currentColor" stroke=""/>\n' + '<path d="M13.2717 17.2269C13.2717 16.0504 12.3177 15.126 11.1673 15.126C9.9889 15.126 9.06299 16.0784 9.06299 17.2269C9.06299 18.4034 10.017 19.3278 11.1673 19.3278C12.3177 19.3558 13.2717 18.4034 13.2717 17.2269Z" fill="currentColor"/>\n' + '<path d="M24.6072 11.6527C24.6072 10.7283 23.8497 10 22.9518 10C22.054 10 21.2964 10.7563 21.2964 11.6527C21.2964 12.5771 22.054 13.3054 22.9518 13.3054C23.8497 13.3054 24.6072 12.5491 24.6072 11.6527Z" fill="currentColor"/>\n' + '<path d="M28.5349 49.2452C40.207 49.2452 49.6625 39.8052 49.6625 28.1522V1.79297L5.63965 49.2452H28.5349Z" fill="currentColor"/>\n' + '</svg>\n', title: 'Iothink Solutions',
    link: 'https://iothink-solutions.com/',
    description: 'Three years of work-study at Iothink Solutions, which helped me expand my skills and discover the professional world.'
  },
  {
    date: 2023,
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M14.5 3L12 7.156L9.857 3H2l10 18L22 3zM4.486 4.5h2.4L12 13.8l5.107-9.3h2.4L12 18.021z"/></svg>',
    title: 'Vue / Nuxt',
    description: 'Thanks to the Helpr project I discovered Vue and Nuxt, two technologies that became a real turning point in my journey.'
  },
  {
    date: 2024,
    icon: 'i-lucide-file-user',
    link: 'https://ivpatisserie.com/',
    title: 'Work for client',
    description: 'My very first client collaboration, building a showcase website for IV Patisserie.'
  },
  {
    date: 2025,
    icon: 'i-lucide-bot',
    link: 'http://localhost:3000/works/robot',
    title: 'Robot Fighting',
    description: 'Built a combat robot, detailed in my projects page. Small but fierce!'
  },
  {
    icon: 'i-lucide-play',
    title: 'New start',
    description: 'Graduation complete, time for a new chapter with a move to Paris. To be continued…'
  },
  {
    icon: 'i-lucide-brush',
    title: 'New visual identity',
    description: 'Redesigned my personal identity: full brand guidelines and this portfolio.'
  },
]


const actifEvent = ref(events.length - 1)

// Fonction pour gérer le survol d'un événement
const handleMouseEnter = (index: number) => {
  actifEvent.value = index
}

// Fonction pour revenir au dernier élément quand on quitte la timeline
const handleMouseLeave = () => {
  actifEvent.value = events.length - 1
}
</script>

<template>
  <div class="w-full flex h-50 justify-center mb-20" @mouseleave="handleMouseLeave">
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
          class="w-1 rounded-b-sm mx-auto transition-all duration-300 ease-in-out"
          :class="[
            index == actifEvent ? 'h-38' : 'h-22',
            index > actifEvent ? 'bg-primary/50' : 'bg-primary'
          ]"
        />
        <UIcon
          v-if="event.icon.startsWith('i-')"
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
          v-html="event.icon"
        />
      </div>
      <div
        v-for="n in 5"
        v-if="index < events.length - 1"
        :key="n"
        class="w-1 h-2 rounded-b-sm  mx-1 transition-all duration-300 ease-in-out"
        :class="index >= actifEvent ? 'bg-primary/50' : 'bg-primary'"
      />
      <div v-if="actifEvent == index" class="absolute w-80 -left-38 top-50">
        <NuxtLink target="_blank" :to="event?.link" class="flex flex-row justify-center items-center" :class="event.link ? 'hover:opacity-70 transition-all duration-300' : ''">
          <UIcon
            v-if="event.link"
            name="i-lucide-external-link"
            class="size-4 bg-primary mr-2"
          />
          <h2
            class="text-primary font-clash-bold text-lg"
          >
            {{ event.title }}
          </h2>
        </NuxtLink>

        <p class="text-primary font-clash-regular text-sm">
          {{ event.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
