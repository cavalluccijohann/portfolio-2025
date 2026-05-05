<script setup lang="ts">
import { toast, Toaster } from 'vue-sonner'
import 'vue-sonner/style.css'

const { data: contactData } = await useAsyncData('contact', () => queryCollection('contact').first())

const networksData = computed(() => {
  const typedData = contactData.value as {
    networks?: { name: string; link: string }[]
    socialNetworks?: { name: string; link: string }[]
  } | null

  return typedData?.networks || typedData?.socialNetworks || []
})
useSeoMeta({
  title: 'Contact - Johanncvl',
  titleTemplate: 'Contact - Johanncvl',
  description: 'Get in touch with Johann Cavallucci, Software Engineer, to discuss web and modern application projects. Let\'s build something amazing together!\n',
  ogTitle: 'Contact - Johanncvl',
  ogDescription: 'Get in touch with Johann Cavallucci, Software Engineer, to discuss web and modern application projects. Let\'s build something amazing together!\n',
  ogImage: 'og.png',
  twitterCard: 'summary_large_image'
})

const form = ref({
  name: '',
  phone: '',
  email: '',
  company: '',
  message: '',
})
const loading = ref(false)
async function sendForm() {
  loading.value = true
  try {
    await useFetch('/api/sendEmail', {
      method: 'POST',
      body: form.value,
    })

    form.value = {
      name: '',
      email: '',
      phone: '',
      company: '',
      message: '',
    }

    toast.success('Message sent successfully', {
      style: {
        background: 'var(--toast-bg)',
        color: 'var(--toast-text)',
        border: 'none',
        boxShadow: '0 2px 0 0 var(--toast-color)',
      },
    })
  } catch (error) {
    console.error('Error sending form:', error)

    toast.error('Error sending form', {
      style: {
        background: 'var(--toast-bg)',
        color: 'var(--toast-text)',
        border: 'none',
        boxShadow: '0 2px 0 0 var(--toast-color)',
      },
    })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex flex-col min-h-[calc(100vh-64px)] justify-between">
    <div class="flex flex-col md:grid md:grid-cols-2 gap-4 p-4 w-full md:pt-10">
      <div class="flex flex-col">
        <!--   button that create toast    -->
        <span
            v-if="contactData"
            class="leading-[6rem] md:leading-[5rem] lg:leading-none text-[90px]/40 md:text-[80px]/40 lg:text-[125px]/40 xl:text-[168px]/40 font-bread font-bold mb-4"
            v-html="contactData.title"
        ></span>
        <div class="font-clash-regular text-sm md:text-lg md:pr-14 md:p-0 [&_strong]:font-clash-bold [&_strong]:font-bold">
          <ContentRenderer v-if="contactData" :value="contactData" />
        </div>
      </div>
      <form class="flex flex-col justify-center items-center" @submit.prevent="sendForm">
        <input
          id="name"
          v-model="form.name"
          type="text"
          placeholder="Name*"
          required
          class="relative text-xl w-full md:w-lg font-clash-medium my-1 pb-2 m-4 border-b border-primary focus:outline-none focus:border-b-4 transition-all duration-100"
        >
        <input
          id="email"
          v-model="form.email"
          type="email"
          placeholder="Email*"
          required
          class="relative text-xl w-full md:w-lg font-clash-medium my-1 pb-2 m-4 border-b border-primary focus:outline-none focus:border-b-4 transition-all duration-300"
        >
        <input
          id="phone"
          v-model="form.phone"
          type="text"
          placeholder="Phone"
          class="relative text-xl w-full md:w-lg font-clash-medium my-1 pb-2 m-4 border-b border-primary focus:outline-none focus:border-b-4 transition-all duration-300"
        >
        <input
          v-model="form.company"
          type="text"
          name="company"
          autocomplete="off"
          style="display:none"
        >

        <textarea
          id="message"
          v-model="form.message"
          placeholder="Message*"
          required
          class="relative text-xl w-full md:w-lg font-clash-medium my-1 pb-20 m-4 border-b-[1px] focus:outline-none focus:border-b-4 transition-all duration-300"
        />
        <button
          type="submit"
          :disabled="loading"
          class="w-full md:w-lg mt-5 block w-full font-clash-medium font-bold text-xl rounded-none border-2 color-primary text-[#FF5800] border-primary hover:text-primary bg-primary hover:bg-transparent cursor-pointer px-4 py-2 text-sm font-semibold transition-colors duration-300"
          @click="!loading"
        >
          <span v-if="loading">Sending...</span>
          <span v-else>Send</span>
        </button>
      </form>
    </div>
    <footer class="w-full relative bottom-0 text-center text-sm mt-10 md:mt-0">
      <div class="w-2/3 h-[1px] bg-primary mx-auto mb-2" />
      <div class="w-full flex justify-center items-center">
        <Socials :socialsNetworks="networksData" />
      </div>
    </footer>
  </div>
</template>
