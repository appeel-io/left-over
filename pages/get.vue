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
    <section class="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 min-h-[85vh]">
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
        <div v-if="postingsStore.data" class="grid">
          <FoodItemsList :food-items="postingsStore.data" />
          <Map :food-items="postingsStore.data" />
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>
