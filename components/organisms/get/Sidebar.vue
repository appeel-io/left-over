<script setup>
import { useCategoriesStore } from '@/store/categories'
import { useAllergiesStore } from '@/store/allergies'

const categoriesStore = useCategoriesStore()
const allergiesStore = useAllergiesStore()
const radiusOptions = [5, 10, 15, 25, 35].map(i => ({ value: i, label: `${i}km` }))

const search = ref(null)
const radius = ref(10)
const filters = ref([])
</script>

<template>
  <div class="flex flex-col min-h-screen p-4 space-y-4 border-l border-r">
    <FormKit v-model="search" type="search" placeholder="Search..." label="Search" />

    <FormKit
      v-model="radius"
      type="select"
      label="Radius"
      name="radius"
      :options="radiusOptions"
    />

    <FormKit
      v-model="filters"
      type="checkbox"
      label="Filter"
      :options="categoriesStore.categoriesOptions"
      help="Select your categories"
    />
  </div>
</template>
