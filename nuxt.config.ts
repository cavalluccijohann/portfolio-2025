
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxt/scripts',
    '@nuxt/image',
    'nuxt-studio',
  ],
  devtools: { enabled: true },
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
    i18n: {
      defaultLocale: 'fr'
    },
    repository: {
      provider: 'github',
      owner: 'johanncvl',
      repo: 'portfolio-2025',
    }
  }
})