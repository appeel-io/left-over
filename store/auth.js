import { defineStore } from 'pinia'
import { useRuntimeConfig, useSupabaseClient } from '#imports'

export const useAuthStore = defineStore('useAuthStore', {
  state: () => ({
    profile: null,
  }),
  getters: {
    fullNameOrEmail: (state) => {
      if (state.profile?.firstname && state.profile?.lastname)
        return `${state.profile.firstname} ${state.profile.lastname}`
      else if (state.profile?.email)
        return state.profile.email
      else
        return 'N/A'
    },
  },
  actions: {
    async login(credentails) {
      const runtimeConfig = useRuntimeConfig()
      const supabase = useSupabaseClient()
      const options = { redirectTo: runtimeConfig.supabaseRedirectUrl }

      if (credentails?.email && credentails?.password) {
        const { error } = await supabase.auth.signInWithPassword(credentails, options)
        if (error) throw error
      }
      else if (credentails?.email && !credentails?.password) {
        const { error } = await supabase.auth.signInWithOtp(credentails, options)
        if (error) throw error
      }
    },
    async logout() {
      const supabase = useSupabaseClient()
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    },
  },
})
