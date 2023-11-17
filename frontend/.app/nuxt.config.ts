export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  extends: [
    // shared layers
    '../layers/tairo-layout-sidebar',
    '../layers/tairo-layout-collapse',
    '../layers/tairo-layout-topnav',
    '../layers/my-first-layer',

    // base layer
    '../layers/tairo',
  ],
  modules: ['@pinia/nuxt', '@vueuse/nuxt', '@nuxt/devtools'],
  /**
   * Load local font with @fontsource packages
   * @see https://fontsource.org/
   */
  css: [
    '@fontsource-variable/inter/index.css',
    '@fontsource-variable/karla/index.css',
  ],
  pinia: {
    storesDirs: ['./composables/**', './stores/**'],
  },
  // router: {
  //   middleware: ['auth'],
  // },
  // this is for reverse proxy
  vite: {
    server: {
      hmr: {
        protocol: 'wss',
        clientPort: 443,
        path: 'hmr/',
      },
    },
  },
})
