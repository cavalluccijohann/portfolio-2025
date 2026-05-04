// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  modules: [
    '@nuxt/ui-pro',
    '@nuxt/content',
    '@nuxt/scripts',
    '@nuxt/image',
    'nuxt-studio'
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
  },
  nitro: {
    prerender: {
      routes: ['/'],
      crawlLinks: true,
      autoSubfolderIndex: false
    }
  },
  app: {
    head: {
      script: [
        {
          src: 'https://cloud.umami.is/script.js',
          async: true,
          'data-website-id': '7fc6ccea-43a1-441e-b1d0-65b5f4f6843d'
        }
      ]
    }
  },
  studio: {
    route: '/admin',
    repository: {
      provider: 'github',
      owner: 'johanncvl',
      repo: 'portfolio-2025',
      branch: 'main',

    }
  }
})