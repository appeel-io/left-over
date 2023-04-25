<script setup>
import { useAuthStore } from '@/store/auth'
import { useProfileStore } from '@/store/profile'

const profileStore = useProfileStore()
const authStore = useAuthStore()

const isOpen = ref(false)
const routes = ref([{ url: '/profile', label: 'Profile' }])

await profileStore.getUserProfile()

const logout = async() => {
  try {
    await authStore.logout()
    await navigateTo('/')
  }
  catch (err) {
    console.error(err)
  }
}
</script>

<template>
  <section v-click-outside="() => (isOpen = false)" class="relative">
    <button
      v-if="profileStore.profile"
      class="flex gap-2 items-center group"
      @click="isOpen = true"
    >
      <p class="group-hover:text-primary duration-200 ease-in-out">
        {{ profileStore.profile.firstname }}
      </p>
      <img
        :src="`https://api.dicebear.com/5.x/initials/svg?seed=${profileStore.profile.firstname}&radius=50&backgroundColor=16B1AF`"
        alt="Avatar"
        class="w-10"
      >
    </button>
    <div class="absolute right-0 top-12 block w-max z-[1]" :class="{ 'invisible top-0': !isOpen }">
      <div class="bg-white flex flex-col gap-y-2 p-6 pr-10 relative shadow-xl rounded-b rounded-tl box-border">
        <NavigationLink v-for="route in routes" :key="route.url" :url="route.url" :label="route.label" />
        <NavigationLink label="Logout" @click="logout" />
      </div>
    </div>
  </section>
</template>
