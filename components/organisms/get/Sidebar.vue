<script setup>
import { useCategoriesStore } from '@/store/categories'
import { useAllergiesStore } from '@/store/allergies'
import { useGlobalStore } from '@/store/global'

const categoriesStore = useCategoriesStore()
const allergiesStore = useAllergiesStore()
const globalStore = useGlobalStore()
</script>

<template>
  <div class="flex flex-col min-h-screen p-4 space-y-4 border-l border-r">
    <FormKit
      v-model="globalStore.search"
      type="search"
      placeholder="Search..."
      label="Search"
    />

    <FormKit
      v-model="globalStore.radius"
      type="select"
      label="Radius"
      name="radius"
      :options="globalStore.radiusOptions"
    />

    <FormKit
      v-model="globalStore.filters"
      type="checkbox"
      label="Filter"
      :options="categoriesStore.categoriesOptions"
      help="Select your categories"
    />

    <FormKit
      v-model="globalStore.allergies"
      type="checkbox"
      label="Allergies"
      :options="allergiesStore.allergiesOptions"
      help="Select your allergies"
    />
  </div>
</template>
