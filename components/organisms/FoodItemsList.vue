<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper'
import { useGlobalStore } from '@/store/global'

import 'swiper/css'
import 'swiper/css/navigation'

const props = defineProps({ foodItems: { type: Array, required: true } })

const global = useGlobalStore()

const swiper = ref()

onMounted(() => {
  setTimeout(() => document.querySelector('.swiper-button-next').click(), 500)
})

watch(() => global.selectedPosting, (v) => {
  if (v) {
    const index = props.foodItems.findIndex(item => item.id === v.id)
    if (index >= 0) swiper.value.slideTo(index)
  }
})
</script>

<template>
  <div class="relative z-0 min-h-[298px]">
    <div
      v-if="foodItems.length"
      class="bg-white w-4 blur-sm absolute -left-2 top-1 bottom-1 z-[2]"
    />
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
      @swiper="(v) => swiper = v"
    >
      <SwiperSlide
        v-for="food in foodItems"
        :id="food.id"
        :key="food.id"
        class="py-2 px-4 max-w-sm"
      >
        <FoodItemDetail :food-item="food" />
      </SwiperSlide>
    </Swiper>
    <h4 v-else>
      No food items found with the selected filters
    </h4>
    <div
      v-if="foodItems.length"
      class="bg-white w-4 blur-sm absolute -right-2 top-1 bottom-1 z-[2]"
    />
  </div>
</template>

<style>
.swiper-button-prev, .swiper-button-next {
  @apply bg-transparent text-transparent !text-sm;
}
</style>
