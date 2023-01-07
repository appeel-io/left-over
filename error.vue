<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <div class="flex flex-col items-center space-y-2">
      <h1 class="text-3xl text-primary">
        {{ errorMessage }}
      </h1>

      <NuxtLink :to="'/'">
        Go home
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
defineProps({ error: Object })

const error = useError()
const errorMessage = computed(() => {
  if (Number(error.value.statusCode) === 404) return "Oops, we could not find that page"
  else return "Something went wrong"
})
</script>
