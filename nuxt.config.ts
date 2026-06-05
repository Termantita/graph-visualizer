// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/eslint',
    "@vueuse/nuxt",
    "@pinia/nuxt"
  ],

  tailwindcss: {
    config: {
      content: [
        "./app/components/**/*.{js,vue,ts}",
        "./app/services/**/*.{js,ts}",
        "./app/layouts/**/*.vue",
        "./app/pages/**/*.vue",
        "./app/plugins/**/*.{js,ts}",
        "./app/app.vue",
        "./app/error.vue",
      ]
    }
  },

  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'force-graph',
        'marked',
      ]
    }
  }
})