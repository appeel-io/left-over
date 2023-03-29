<script setup>
import { usePostingsStore } from '@/store/postings'
const store = usePostingsStore()
</script>

<template>
  <NuxtLayout>
    <h1 class="text-3xl text-primary mt-10">
      Find some Left Overs
    </h1>
    <div v-if="store.data">
      <Map :food-items="store.data" class="mt-5" />
    </div>
  </NuxtLayout>
</template>
