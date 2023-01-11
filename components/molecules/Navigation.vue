<script setup>
const user = useSupabaseUser()
const route = useRoute()

const routes = ref([{ url: '/', label: 'Home' }])
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
