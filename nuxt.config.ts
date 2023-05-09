// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  components: {
    global: true,
    dirs: [
      '~/components/atoms',
      '~/components/molecules',
      '~/components/organisms',
    ],
  },
  css: [
    '~/assets/css/main.css',
    '~/assets/css/font.css',
    '~/assets/css/global.css',
  ],
  modules: [
    'nuxt-icon',
    '@nuxtjs/supabase',
    '@formkit/nuxt',
    '@pinia/nuxt',
  ],
  runtimeConfig: {
    public: {
      supabaseRedirectUrl: process.env.NUXT_SUPABASE_REDIRECT_URL || 'http://localhost:3000',
      leafletApiKey: process.env.LEAFLET_API_KEY,
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    head: {
      script: [
        {
          src: 'https://unpkg.com/leaflet@1.9.3/dist/leaflet.js',
          integrity: 'sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM=',
          crossorigin: '',
        },
      ],
    },
  },
})
