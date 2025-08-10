<script setup lang="ts">
import { toast, Toaster } from 'vue-sonner'
import 'vue-sonner/style.css'

const form = ref({
  name: '',
  phone: '',
  email: '',
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
      message: '',
    }
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
    toast.success('Message sent successfully', {
      style: {
        background: 'var(--toast-bg)',
        color: 'var(--toast-text)',
        border: 'none',
        boxShadow: '0 2px 0 0 var(--toast-color)',
      },
    })
    loading.value = false
  }
}
</script>

<template>
  <div class=" grid grid-cols-2 gap-4 p-4 w-full mt-10">
    <div class="flex flex-col">
      <!--   button that create toast    -->
      <span class="text-[168px]/40 font-bread font-bold mb-4">
        CON<br>TACT<br> ME
      </span>
      <p class="font-clash-medium text-md">
        Fugiat duis et non amet officia adipisicing aliqua aliquip dolor est nostrud. Do deserunt nisi sit ut laborum ullamco pariatur tempor cillum minim amet enim laborum. Ea et commodo id deserunt et tempor. Ad amet occaecat enim nulla labore cillum laboris tempor laborum. Quis nostrud consectetur occaecat consectetur officia et elit enim irure occaecat laboris incididunt reprehenderit occaecat ut.
      </p>
    </div>
    <form class="flex flex-col justify-center items-center" @submit.prevent="sendForm">
      <input
        id="name"
        v-model="form.name"
        type="text"
        placeholder="Name"
        required
        class="relative text-xl w-lg font-clash-medium my-1 pb-2 m-4 border-b-[1px] focus:outline-none focus:ring-b-1"
      >
      <input
        id="email"
        v-model="form.email"
        type="email"
        placeholder="Email"
        required
        class="relative text-xl w-lg font-clash-medium my-1 pb-2 m-4 border-b-[1px] focus:outline-none focus:ring-b-1"
      >
      <input
        id="phone"
        v-model="form.phone"
        type="text"
        placeholder="Phone"
        class="relative text-xl w-lg font-clash-medium my-1 pb-2 m-4 border-b-[1px] focus:outline-none focus:ring-b-1"
      >
      <textarea
        id="message"
        v-model="form.message"
        placeholder="Message"
        required
        class="relative text-xl w-lg font-clash-medium my-1 pb-20 m-4 border-b-[1px] focus:outline-none focus:ring-b-1"
      />
      <button
        type="submit"
        :disabled="loading"
        class="w-lg mt-5 block w-full font-clash-medium font-bold text-xl rounded-none border-2 color-primary text-[#FF5800] border-primary hover:text-primary bg-primary hover:bg-transparent cursor-pointer px-4 py-2 text-sm font-semibold transition-colors duration-300"
        @click="!loading"
      >
        <span v-if="loading">Sending...</span>
        <span v-else>Send</span>
      </button>
    </form>
  </div>
</template>

<style scoped>

</style>

