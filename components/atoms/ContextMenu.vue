<script setup>
import { useAuthStore } from '@/store/auth'
import { useProfileStore } from '@/store/profile'

const profileStore = useProfileStore()
const authStore = useAuthStore()

const isOpen = ref(false)
const routes = ref([{ url: '/profile', label: 'Profile' }])

onMounted(() => profileStore.getUserProfile())

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
      v-if="profileStore.data"
      class="flex gap-4 items-center cursor-pointer"
      @click="isOpen = true"
    >
      <p>
        {{ profileStore.data.firstname }}
      </p>
      <img
        :src="profileStore.data.avatar_url || `https://api.dicebear.com/5.x/initials/svg?seed=${profileStore.data.firstname}&radius=50`"
        alt="Avatar"
        class="w-10"
      >
    </button>
    <div class="absolute right-0 top-12 block w-max" :class="{ 'invisible top-0': !isOpen }">
      <div class="bg-white flex flex-col gap-y-2 p-10 relative shadow-xl rounded-b rounded-tl box-border">
        <NavigationLink v-for="route in routes" :key="route.url" :url="route.url" :label="route.label" />
        <NavigationLink label="Logout" @click="logout" />
      </div>
    </div>
  </section>
</template>
