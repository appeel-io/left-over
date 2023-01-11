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
  <nav class="bg-gray-100">
    <div class="container flex justify-between gap-2 p-4 ietms-center">
      <h1 class="flex items-center space-x-2 text-2xl">
        <img
          class="w-12 mx-auto rounded-full"
          src="~/assets/icons/favicon.png"
          alt="Appeel logo"
        >

        <span class="text-primary">Left-over</span>
      </h1>

      <div class="flex items-center gap-4">
        <NavigationLink
          v-for="route in routes"
          :key="route.url"
          :url="route.url"
          :label="route.label"
        />
        <NavigationLink v-if="user" label="Logout" @click="logout" />
        <template v-if="!user">
          <NavigationLink label="Login" url="/login" />
          <NuxtLink to="/register">
            <Button label="Register" />
          </NuxtLink>
        </template>
      </div>
    </div>
  </nav>
</template>
