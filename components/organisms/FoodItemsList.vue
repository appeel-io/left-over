<script setup>
defineProps({ foodItems: { type: Array, required: true } })
</script>

<template>
  <div class="flex gap-4 py-4 items-start">
    <FoodItemDetail
      v-for="food in foodItems"
      :key="food.id"
      :user-latitude="50"
      :user-longitude="5"
      :food-item="food"
    />
  </div>
</template>
