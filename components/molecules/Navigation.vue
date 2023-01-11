<script setup>
const user = useSupabaseUser()
const route = useRoute()

const routes = ref([{ url: '/', label: 'Home' }])
</script>

<template>
  <nav class="bg-slate-200">
    <div class="container p-4 flex gap-2 justify-between ietms-center">
      <NuxtLink to="/">
        <h1>Left Over logo</h1>
      </NuxtLink>
      <ToggleGetGive v-if="route.fullPath !== '/'" />
      <div class="flex gap-4 items-center">
        <NavigationLink
          v-for="navRoute in routes"
          :key="navRoute.url"
          :url="navRoute.url"
          :label="navRoute.label"
        />
        <ContextMenu v-if="user" />
        <template v-else>
          <NavigationLink label="Login" url="/login" />
          <NavigationLink label="Register" url="/registrate" />
        </template>
      </div>
    </div>
  </nav>
</template>
