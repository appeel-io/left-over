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
  <Head>
    <Link
      rel="stylesheet"
      href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
      integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
      crossorigin=""
    />
  </Head>
  <NuxtPage />
</template>
