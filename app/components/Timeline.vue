<script setup lang="ts">
const events = [
  {
    date: 2020,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bell-electric"><path d="M18.518 17.347A7 7 0 0 1 14 19"></path><path d="M18.8 4A11 11 0 0 1 20 9"></path><path d="M9 9h.01"></path><circle cx="20" cy="16" r="2"></circle><circle cx="9" cy="9" r="7"></circle><rect x="4" y="16" width="10" height="6" rx="2"></rect></svg>',
    title: 'School',
    description: 'Nostrud in elit nisi eu nostrud reprehenderit et adipisicing ea incididunt nisi irure. Culpa laborum fugiat ipsum ullamco quis. Magna veniam cillum eiusmod consequat consectetur voluptate ea excepteur occaecat magna. Est non cillum proident consequat laboris nostrud commodo dolore duis sint.'
  },
  {
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-anchor"><path d="M12 22V8"></path><path d="M5 12H2a10 10 0 0 0 20 0h-3"></path><circle cx="12" cy="5" r="3"></circle></svg>',
    title: 'Inside School',
    description: 'Nostrud in elit nisi eu nostrud reprehenderit et adipisicing ea incididunt nisi irure. Culpa laborum fugiat ipsum ullamco quis. Magna veniam cillum eiusmod consequat consectetur voluptate ea excepteur occaecat magna. Est non cillum proident consequat laboris nostrud commodo dolore duis sint.'
  },
  {
    date: 2021,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-accessibility"><circle cx="16" cy="4" r="1"></circle><path d="m18 19 1-7-6 1"></path><path d="m5 8 3-3 5.5 3-2.36 3.5"></path><path d="M4.24 14.5a5 5 0 0 0 6.88 6"></path><path d="M13.76 17.5a5 5 0 0 0-6.88-6"></path></svg>',
    title: 'After',
    description: 'Nostrud in elit nisi eu nostrud reprehenderit et adipisicing ea incididunt nisi irure. Culpa laborum fugiat ipsum ullamco quis. Magna veniam cillum eiusmod consequat consectetur voluptate ea excepteur occaecat magna. Est non cillum proident consequat laboris nostrud commodo dolore duis sint.'
  },
  {
    date: 2022,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-alarm-clock-check"><circle cx="12" cy="13" r="8"></circle><path d="M5 3 2 6"></path><path d="m22 6-3-3"></path><path d="M6.38 18.7 4 21"></path><path d="M17.64 18.67 20 21"></path><path d="m9 13 2 2 4-4"></path></svg>',
    title: 'End',
    description: 'Nostrud in elit nisi eu nostrud reprehenderit et adipisicing ea incididunt nisi irure. Culpa laborum fugiat ipsum ullamco quis. Magna veniam cillum eiusmod consequat consectetur voluptate ea excepteur occaecat magna. Est non cillum proident consequat laboris nostrud commodo dolore duis sint.'
  },

]
</script>

<template>
  <div class="w-full flex justify-center">
    <div v-for="(event, index) in events" :key="event.title" class="flex flex-row">
      <div class="w-3 h-22 bg-primary rounded-full mx-1" />
      <div v-for="n in 5" v-if="index < events.length - 1" :key="n" class="w-3 h-3 bg-primary rounded-full mx-1" />
    </div>
  </div>
</template>

<style scoped></style>

