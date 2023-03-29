<script setup>
import { addHours, format, formatDuration, intervalToDuration } from 'date-fns'
import { calcCrow } from '@/util/distanceBetweenCoords'

const props = defineProps({
  foodItem: { type: Object, required: true },
  userLatitude: { type: Number, required: true },
  userLongitude: { type: Number, required: true },
})

const duration = computed(() => {
  const dur = intervalToDuration({
    start: props.foodItem.created_at,
    end: addHours(props.foodItem.experation_date_item, 10),
  })

  return formatDuration(dur, { format: ['days', 'hours', 'minutes'] })
})

const themeColor = computed(() => {
  switch (props.foodItem.category) {
    case 'meat':
      return '#CC0000'
    case 'fish':
      return '#0000CC'
    case 'vegetables':
      return '#00CC00'
    case 'fruit':
      return '#CC00CC'
    case 'bread':
      return '#CC6600'
    case 'dairy':
      return '#00CCCC'
    default:
      return '#000000'
  }
})
</script>

<template>
  <section>
    <div
      class="gap-3 p-2 bg-white border-2 w-64 rounded-lg relative"
      :style="{ borderColor: themeColor }"
    >
      <div
        class="absolute right-2 top-2 rounded-full text-white px-2"
        :style="{ backgroundColor: themeColor }"
      >
        {{ foodItem.category }}
      </div>
      <div class="text-2xl font-bold">
        {{ foodItem.name }}
      </div>

      <div class="text-base mb-1">
        time left: {{ duration }}
      </div>

      <div class="text-base mb-1">
        experation date: {{ format(foodItem.experation_date_food, 'dd/mm/yy') }}
      </div>

      <div>Available for pickup</div>
      <div class="text-base">
        {{ `${format( foodItem.retrieval_start_range, 'hh:mm')} - ${format( foodItem.retrieval_end_range, 'hh:mm')} ` }}
      </div>

      <div>Distance from your location</div>
      <div class="text-base">
        {{ calcCrow(userLatitude, userLongitude, foodItem.profile.latitude, foodItem.profile.longitude) }} KM
      </div>

      <div class="my-5 ml-4">
        <div class="text-base font-bold">
          {{ foodItem.profile.name }}
        </div>
        <div class="text-base">
          {{ foodItem.description }}
        </div>
      </div>
      <Button
        label="RESERVE"
      />
    </div>
  </section>
</template>
