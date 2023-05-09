<script setup>
import { useProfileStore } from '@/store/profile'

const appName = 'Left-over'
const appDescription = 'A crowdsourced neighbourhood platform to prevent food waste'

useHead({
  meta: [{ name: 'description', content: appDescription }],
  titleTemplate: title => title ? `${title} - ${appName}` : appName,
})

const store = useProfileStore()
const supabase = useSupabaseClient()

supabase.auth.onAuthStateChange(async(_, session) => {
  await store.getUserProfile()
})

onBeforeMount(async() => await store.getUserProfile())
</script>

<template>
  <NuxtPage />
</template>
