<script setup>
import { useCategoriesStore } from '@/store/categories'
import { useAllergiesStore } from '@/store/allergies'

const categoriesStore = useCategoriesStore()
const allergiesStore = useAllergiesStore()
</script>

<template>
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
</template>
