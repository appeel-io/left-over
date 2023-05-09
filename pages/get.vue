<script setup>
import { usePostingsStore } from '@/store/postings'

const postingsStore = usePostingsStore()
</script>

<template>
  <NuxtLayout>
    <section class="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 min-h-[85vh]">
      <GetSidebar />

      <div class="col-span-2 py-4 lg:col-span-3 xl:col-span-4">
        <div v-if="postingsStore.data" class="flex flex-col gap-8">
          <FoodItemsList :food-items="postingsStore.data" class="mx-6" />
          <Map
            :food-items="postingsStore.data || []"
            class="mx-6 overflow-hidden rounded-lg"
          />
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>
