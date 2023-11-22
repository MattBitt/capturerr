export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },

  sourcemap: {
    server: true,
    client: true,
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
    storesDirs: ['./stores/**'],
  },
  runtimeConfig: {
    apiSecret: '', // can be overridden by NUXT_API_SECRET environment variable
    public: {
      apiBase: process.env.API_BASE || 'http://xxxxxxxxxxxx',
      environment: process.env.ENVIRONMENT || 'dev',
    },
  },
})
