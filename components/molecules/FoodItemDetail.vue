<script setup>
import { addHours, format, formatDuration, intervalToDuration, parseISO } from 'date-fns'
import { calcCrow } from '@/util/distanceBetweenCoords'
import { useProfileStore } from '@/store/profile'
import { useGlobalStore } from '@/store/global'

const props = defineProps({ foodItem: { type: Object, required: true } })

const store = useProfileStore()
const global = useGlobalStore()

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
  <section
    class="bg-white max-w-sm w-full rounded-lg overflow-hidden hover:scale-[1.02] cursor-pointer"
    :style="{
      'box-shadow': `0 0 6px -2px ${themeColor}`
    }"
    @click="global.selectedPosting = foodItem"
  >
    <div class="flex justify-between items-center bg-gray-100 px-4 py-2">
      <p class="text-xs">
        {{ calcCrow(
          store.profile.address[0].lat,
          store.profile.address[0].long,
          foodItem.address.lat,
          foodItem.address.long
        ) }} km away
      </p>
      <p
        class="rounded-full text-white text-xs font-bold px-2 py-[2px]"
        :style="{ backgroundColor: themeColor }"
      >
        {{ foodItem.category?.label || '' }}
      </p>
    </div>

    <div class="p-4 flex flex-col min-h-[244px]">
      <div class="text-2xl font-bold">
        {{ foodItem.name }}
      </div>
      <p v-if="foodItem.created_by" class="text-sm">
        from {{ foodItem.created_by.firstname }}
      </p>
      <div class="text-base pt-4 grow">
        <div v-if="foodItem.description" class="line-clamp-3">
          {{ foodItem.description }}
        </div>
        <p class="text-xs pt-2">
          time left: {{ duration }}
        </p>
        <p class="text-xs">
          experation date: {{ format(parseISO(foodItem.expiration_date_post), 'dd/MM/yy') }}
        </p>
      </div>
      <div class="flex justify-end">
        <Button label="RESERVE" />
      </div>
    </div>
  </section>
</template>
