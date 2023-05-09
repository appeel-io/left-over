<script setup>
import { useReservationsStore } from '@/store/reservations'

const store = useReservationsStore()
const reservations = ref(null)

onMounted(async() => {
  reservations.value = await store.getReservationsForUser()
})
</script>

<template>
  <NuxtLayout>
    <div class="flex flex-col gap-5 pt-10 ml-10">
      <Head>
        <Title>My reservations</Title>
      </Head>
      <h1 class="text-primary">
        My reservations
      </h1>
      <ReservationDetail v-for="reservation in reservations" :key="reservation.id" :reservation-item="reservation" />
    </div>
  </NuxtLayout>
</template>
