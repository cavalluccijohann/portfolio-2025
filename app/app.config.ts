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
      p: {
        base: 'text-primary font-clash-medium',
      }
    }
  }
})
