<script setup>
import { useReservationsStore } from '@/store/reservations'

const store = useReservationsStore()
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
      <ReservationDetail v-for="reservation in store.data" :key="reservation.id" :reservation-item="reservation" />
    </div>
  </NuxtLayout>
</template>
