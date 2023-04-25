<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper'

import 'swiper/css'
import 'swiper/css/navigation'

defineProps({ foodItems: { type: Array, required: true } })

onMounted(() => {
  setTimeout(() => document.querySelector('.swiper-button-next').click(), 500)
})
</script>

<template>
  <div class="relative">
    <div class="bg-white w-4 blur-sm absolute -left-2 top-1 bottom-1 z-[2]" />
    <Swiper
      v-if="foodItems.length"
      slides-per-view="auto"
      loop
      grab-cursor
      observer
      navigation
      :speed="1000"
      :modules="[ Navigation ]"
      class="w-full"
    >
      <SwiperSlide
        v-for="food in foodItems"
        :key="food.id"
        class="py-2 px-4 max-w-sm"
      >
        <FoodItemDetail
          :user-latitude="50"
          :user-longitude="5"
          :food-item="food"
        />
      </SwiperSlide>
    </Swiper>
    <div class="bg-white w-4 blur-sm absolute -right-2 top-1 bottom-1 z-[2]" />
  </div>
</template>

<style>
.swiper-button-prev, .swiper-button-next {
  @apply bg-transparent text-transparent !text-sm;
}
</style>
