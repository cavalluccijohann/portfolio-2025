
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/seo',
    '@nuxt/content',
    '@nuxt/ui',
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
    url: 'https://www.johanncvl.com',
    name: 'Johann Cavallucci',
    description: 'Portfolio of Johann Cavallucci, Software Engineer based in Paris, France.',
    defaultLocale: 'en',
    indexable: true,
  },
  ogImage: {
    // Static /og.jpg and project images are used instead of generated OG images.
    enabled: false,
  },
  schemaOrg: {
    identity: {
      type: 'Person',
      name: 'Johann Cavallucci',
      jobTitle: 'Software Engineer',
      url: 'https://www.johanncvl.com',
      sameAs: [
        'https://github.com/cavalluccijohann',
        'https://www.linkedin.com/in/johann-cavallucci/',
        'https://x.com/JohannCVL',
      ],
    },
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
