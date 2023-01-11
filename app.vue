<script setup>
import { onBeforeMount } from 'vue'
import { useAuthStore } from '@/store/auth'
import { useSupabaseProfile } from '@/composables/useSupabaseProfile'

const appName = 'Left-over'
const appDescription = 'A crowdsourced neighbourhood platform to prevent food waste'

useHead({
  meta: [{ name: 'description', content: appDescription }],
  titleTemplate: title => title ? `${title} - ${appName}` : appName,
})

const store = useAuthStore()
const supabase = useSupabaseClient()

supabase.auth.onAuthStateChange(async(_, session) => {
  store.profile = await useSupabaseProfile(session?.user)
})

onBeforeMount(async() => {
  store.profile = await useSupabaseProfile()
})
</script>

<template>
  <NuxtPage />
</template>
