<script setup>
import { addHours, format, formatDuration, intervalToDuration, parseISO } from 'date-fns'
import { calcCrow } from '@/util/distanceBetweenCoords'

const props = defineProps({
  foodItem: { type: Object, required: true },
  userLatitude: { type: Number, required: true },
  userLongitude: { type: Number, required: true },
})

const duration = computed(() => {
  const start = parseISO(props.foodItem.created_at)
  const end = parseISO(props.foodItem.expiration_date_item)
  const dur = intervalToDuration({ start, end: addHours(end, 10) })

  return formatDuration(dur, { format: ['days', 'hours', 'minutes'] })
})

const themeColor = computed(() => {
  switch (props.foodItem.category?.label?.toLowerCase() || '') {
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
  <section class="relative w-64 gap-3 p-2 bg-white border-2 rounded-lg" :style="{ borderColor: themeColor }">
    <div class="absolute px-2 text-white rounded-full right-2 top-2" :style="{ backgroundColor: themeColor }">
      {{ foodItem.category?.label || '' }}
    </div>
    <div class="text-2xl font-bold">
      {{ foodItem.name }}
    </div>

    <div class="mb-1 text-base">
      time left: {{ duration }}
    </div>

    <div class="mb-1 text-base">
      experation date: {{ format(parseISO(foodItem.expiration_date_post), 'dd/MM/yy') }}
    </div>

    <div>Distance from your location</div>
    <div class="text-base">
      {{ calcCrow(userLatitude, userLongitude, foodItem.address.lat, foodItem.address.long) }} KM
    </div>

    <div class="my-5 ml-4">
      <div class="text-base font-bold">
        {{ foodItem.created_by.name }}
      </div>
      <div class="text-base">
        {{ foodItem.description }}
      </div>
    </div>
    <Button label="RESERVE" />
  </section>
</template>
