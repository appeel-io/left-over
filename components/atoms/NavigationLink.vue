<script setup>
defineProps({
  url: { type: String },
  label: { type: String, required: true },
})
</script>

<template>
  <NuxtLink
    v-if="url"
    :to="url"
    class="hover:text-primary duration-200 ease-in-out max-w-max"
    active-class="active-link"
  >
    {{ label }}
  </NuxtLink>
  <button v-else class="hover:text-primary duration-200 ease-in-out max-w-max">
    {{ label }}
  </button>
</template>

<style scoped>
.active-link {
  @apply underline;
}
</style>
