const defaultTheme = require('tailwindcss/defaultTheme')
const formKitTailwind = require('@formkit/themes/tailwindcss')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './formkit.config.js',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#16B1AF',
        secondary: '#066D6B',
        accent: '#FFA593',
      },
      fontFamily: {
        title: ['Inter', ...defaultTheme.fontFamily.sans],
        text: ['Inter', ...defaultTheme.fontFamily.serif],
      },
    },
    backgroundImage: {
      'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
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
  plugins: [formKitTailwind],
}
