export default defineAppConfig({
  ui: {
    icons: {
      light: 'i-lucide-sun-medium',
      dark: 'i-lucide-moon'
    },
    colors: {
      neutral: 'neutral',
    },
  },
  uiPro: {
    prose: {

      h1: {
        slots: {
          base: 'text-primary font-clash-medium',
        }
      },
      h2: {
        slots: {
          base: 'text-primary font-clash-medium',
        }
      },
      h3: {
        slots: {
          base: 'text-primary font-clash-medium',
        }
      },
      table: {
        base: 'text-primary font-clash-regular',
        th: {
          base: 'text-primary font-clash-medium',
        },
        td: {
          base: 'text-primary font-clash-regular',
        }
      },
      li: {
        base: 'text-primary font-clash-regular',
      },
      p: {
        base: 'text-primary font-clash-regular',
      },
      a: {
        base: 'text-primary font-clash-medium no-underline hover:underline',
      }
    }
  }
})
