<script setup>
import { usePostingsStore } from '@/store/postings'

const postingsStore = usePostingsStore()

</script>

<template>
  <NuxtLayout>
    <section class="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 min-h-[85vh]">
      <GetSidebar />
      <div class="col-span-2 lg:col-span-3 xl:col-span-4 py-4">
        <div v-if="postingsStore.data" class="flex flex-col gap-2">
          <FoodItemsList :food-items="postingsStore.data" class="mx-6" />
          <Map
            :food-items="postingsStore.data"
            class="rounded-lg overflow-hidden mx-6"
          />
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>
