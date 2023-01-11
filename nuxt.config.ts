// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    '~/assets/css/main.css',
    '~/assets/css/font.css',
    '~/assets/css/global.css',
  ],
  modules: [
    '@nuxtjs/supabase',
    '@formkit/nuxt',
    '@pinia/nuxt',
  ],
  runtimeConfig: {
    public: {
      supabaseRedirectUrl: process.env.NUXT_SUPABASE_REDIRECT_URL || 'http://localhost:3000',
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
