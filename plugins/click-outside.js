import vClickOutside from 'click-outside-vue3'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.use(vClickOutside)
})
