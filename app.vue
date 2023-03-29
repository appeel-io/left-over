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
