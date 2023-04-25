<script setup>
import { usePostingsStore } from '@/store/postings'
import { useCategoriesStore } from '@/store/categories'
import { useAllergiesStore } from '@/store/allergies'

const postingsStore = usePostingsStore()
const categoriesStore = useCategoriesStore()
const allergiesStore = useAllergiesStore()
</script>

<template>
  <NuxtLayout>
    <section class="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 min-h-[85vh] py-4">
      <div class="flex flex-col">
        <div>
          <p v-for="category in categoriesStore.data" :key="category.id">
            {{ category.label }}
          </p>
        </div>
        <div>
          <p v-for="category in allergiesStore.data" :key="category.id">
            {{ category.label }}
          </p>
        </div>
      </div>
      <div class="col-span-2 lg:col-span-3 xl:col-span-4">
        <div v-if="postingsStore.data" class="flex flex-col gap-2">
          <FoodItemsList :food-items="postingsStore.data" />
          <Map
            :food-items="postingsStore.data"
            class="rounded-lg overflow-hidden mx-3"
          />
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>
