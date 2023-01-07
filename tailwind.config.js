const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1BA0FC',
      },
      fontFamily: {
        title: ['Inter', ...defaultTheme.fontFamily.sans],
        text: ['Inter', ...defaultTheme.fontFamily.serif],
      },
    },
    container: {
      center: true,
    },
    screens: {
      sm: '768px',
      md: '1024px',
      lg: '1440px',
      xl: '1920px',
    },
  },
  plugins: [],
}
