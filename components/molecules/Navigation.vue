<script setup>
const user = useSupabaseUser()
const route = useRoute()

const routes = ref([
  { url: '/', label: 'Home' },
])
</script>

<template>
  <nav class="bg-gray-100 shadow-md">
    <div class="container flex justify-between gap-2 p-4 items-center">
      <NuxtLink to="/">
        <img
          class="w-12 mx-auto"
          src="~/assets/images/logo.webp"
          alt="Appeel logo"
        >
      </NuxtLink>
      <ToggleGetGive v-if="route.fullPath !== '/'" />

      <div class="flex items-center gap-4">
        <NavigationLink
          v-for="navRoute in routes"
          :key="navRoute.url"
          :url="navRoute.url"
          :label="navRoute.label"
        />
        <ContextMenu v-if="user" />
        <template v-else>
          <NavigationLink label="Login" url="/login" />
          <NavigationLink label="Register" url="/register" />
        </template>
      </div>
    </div>
  </nav>
</template>
