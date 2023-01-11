<script setup>
import { useAuthStore } from '@/store/auth'

const user = useSupabaseUser()
const store = useAuthStore()

const routes = ref([{ url: '/', label: 'Home' }])

const logout = async() => {
  try {
    await store.logout()
    await navigateTo('/')
  }
  catch (err) {
    console.error(err)
  }
}
</script>

<template>
  <nav class="bg-slate-200">
    <div class="container p-4 flex gap-2 justify-between ietms-center">
      <h1>Left Over logo</h1>
      <div class="flex gap-4 items-center">
        <NavigationLink
          v-for="route in routes"
          :key="route.url"
          :url="route.url"
          :label="route.label"
        />
        <NavigationLink v-if="user" label="Logout" @click="logout" />
        <template v-if="!user">
          <NavigationLink label="Login" url="/login" />
          <NuxtLink to="/registrate">
            <Button label="Register" />
          </NuxtLink>
        </template>
      </div>
    </div>
  </nav>
</template>
