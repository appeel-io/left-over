<script setup>
import { format, parseISO } from 'date-fns'

const props = defineProps({ reservationItem: { type: Object, required: true } })

const formattedAdress = computed(() => `${props.reservationItem.id.address.street} ${props.reservationItem.id.address.house_number}, ${props.reservationItem.id.address.city}`)
</script>

<template>
  <section
    class="bg-white max-w-sm w-full rounded-lg overflow-hidden border"
  >
    <div class="p-4 flex flex-col">
      <div class="flex justify-between items-center">
        <div class="text-2xl font-bold">
          {{ reservationItem.id.name }}
        </div>
        <p
          class="rounded-full text-white font-bold px-2 py-[2px]"
          :class="{
            'bg-yellow-400' : reservationItem.id.status === 'reserved',
            'bg-green-400' : reservationItem.id.status === 'open',
            'bg-red-400' : reservationItem.id.status === 'closed',
          }"
        >
          {{ reservationItem.id.status }}
        </p>
      </div>

      <div class="pt-4 text-base grow">
        <div v-if="reservationItem.message" class="line-clamp-3">
          {{ reservationItem.message }}
        </div>
        <div class="text-lg font-bold mt-5">
          Pickup details
        </div>
        <p>
          time: {{ format(parseISO(reservationItem.pickup_date_time), 'dd/MM/yy hh:mm') }}
        </p>
        <p>
          location: {{ formattedAdress }}
        </p>
      </div>
    </div>
  </section>
</template>
