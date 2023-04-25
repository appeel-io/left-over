<script setup>
import { usePostingsStore } from '@/store/postings'

const postingsStore = usePostingsStore()

</script>

<template>
  <NuxtLayout>
    <section class="grid grid-cols-3 gap-8 lg:grid-cols-4 xl:grid-cols-5 min-h-[85vh]">
      <GetSidebar />

      <div class="col-span-2 lg:col-span-3 xl:col-span-4">
        <div v-if="postingsStore.data" class="grid">
          <FoodItemsList :food-items="postingsStore.data" />
          <Map :food-items="postingsStore.data" />
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>
