<script setup>
import { format, formatDuration, intervalToDuration, parseISO } from 'date-fns'
import { useReservationsStore } from '@/store/reservations'
import { usePostingsStore } from '@/store/postings'
import { calcCrow } from '@/util/distanceBetweenCoords'
import { useProfileStore } from '@/store/profile'
import { useGlobalStore } from '@/store/global'

const props = defineProps({ foodItem: { type: Object, required: true } })

const store = useProfileStore()
const reservationsStore = useReservationsStore()
const postingsStore = usePostingsStore()
const global = useGlobalStore()
const openModal = ref(false)

const duration = computed(() => {
  const start = parseISO(new Date().toISOString())
  const end = parseISO(props.foodItem.expiration_date_item)
  const dur = intervalToDuration({ start, end })

  return formatDuration(dur, { format: ['years', 'months', 'days', 'hours', 'minutes'] })
})

const themeColor = computed(() => props.foodItem.category?.color || '#000000')

const confirmPickup = (data) => {
  reservationsStore.addReservation(props.foodItem.id, data)
  postingsStore.updatePosting(props.foodItem.id, { status: 'reserved' })
  openModal.value = false
}
</script>

<template>
  <section
    class="bg-white max-w-sm w-full rounded-lg overflow-hidden border cursor-pointer"
    :class="{
      'duration-200 ease-in-out scale-105 shadow-xl': global.selectedPosting?.id && foodItem.id === global.selectedPosting.id
    }"
    @click="global.selectedPosting = foodItem"
  >
    <div class="flex items-center justify-between px-4 py-2 bg-gray-50">
      <p v-if="store.profile?.address[0]" class="text-xs">
        {{ calcCrow(
          store.profile.address[0].lat,
          store.profile.address[0].long,
          foodItem.address.lat,
          foodItem.address.long
        ) }} km away
      </p>
      <div v-else class="grow" />
      <p
        class="rounded-full text-white text-xs font-bold px-2 py-[2px]"
        :style="{ backgroundColor: themeColor }"
      >
        {{ foodItem.category?.label || '' }}
      </p>
    </div>

    <div class="p-4 flex flex-col min-h-[244px]">
      <div class="text-2xl font-bold" :style="{ color: themeColor }">
        {{ foodItem.name }}
      </div>
      <p v-if="foodItem.created_by" class="text-sm" :style="{ color: themeColor }">
        from {{ foodItem.created_by.firstname }}
      </p>
      <div class="pt-4 text-base grow">
        <div v-if="foodItem.description" class="line-clamp-3">
          {{ foodItem.description }}
        </div>
        <p class="pt-2 text-xs">
          time left: {{ duration }}
        </p>
        <p class="text-xs">
          experation date: {{ format(parseISO(foodItem.expiration_date_post), 'dd/MM/yy') }}
        </p>
      </div>
      {{ foodItem.status }}
      <div class="flex justify-end">
        <Button :disabled="foodItem.status !== 'open'" :label="foodItem.status === 'open' ? 'RESERVE' : 'Not available'" :style="{ backgroundColor: themeColor }" @click="() => openModal = true" />
      </div>
    </div>

    <Modal
      :title="foodItem.name"
      :open="openModal"
      @close="openModal = false"
    >
      <template #container>
        <FormKit
          type="form"
          :actions="false"
          message-class="text-red-500"
          :value="{
            pickup_date_time: '',
            message: ''
          }"
          @submit="(data) => {
            confirmPickup(data)
          }"
        >
          <div class="max-w-md">
            <div class="text-xl font-bold mb-3">
              {{ `You are picking up food from ${foodItem.created_by.firstname} ${foodItem.created_by.lastname}` }}
            </div>

            <Input
              name="pickup_date_time"
              label="pick up time and date"
              :validation="`required|date_before:${format(parseISO(foodItem.expiration_date_post), 'yyyy-MM-dd HH:mm')}`"
              type="datetime-local"
            />
            <Input name="message" type="textarea" label="Personal message" />
          </div>
          <Button
            type="submit"
            label="Confirm pickup"
          />
        </FormKit>
      </template>
    </Modal>
  </section>
</template>
