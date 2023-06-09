/* eslint-disable no-undef */

export default defineNuxtRouteMiddleware(async() => {
  const user = useSupabaseUser()
  if (!user.value) return navigateTo('/login')
})
