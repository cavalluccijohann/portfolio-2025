// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  modules: [
    '@nuxt/ui-pro',
    '@nuxt/content',
    '@nuxt/scripts',
    '@nuxt/image'
  ],
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4
  },
  css: [
    '~/assets/css/main.css',
    '~/assets/css/clash-display.css',
    '~/assets/css/estrella.css',
    '~/assets/css/bread-toast.css',
  ],
  colorMode: {
    preference: 'light',
    fallback: 'light',
  },
  content: {
    preview: {
      api: 'https://api.nuxt.studio'
    }
  },
  site: {
    url: 'https://johanncvl.com',
    defaultLocale: 'en',
    indexable: true,
  }
})
