<script setup>
import { format, parseISO } from 'date-fns'
import { usePostingsStore } from '@/store/postings'
import { useGlobalStore } from '@/store/global'
import { useReservationsStore } from '@/store/reservations'

const global = useGlobalStore()
const postingsStore = usePostingsStore()
const reservationsStore = useReservationsStore()

const confirmPickup = (id, data) => {
  reservationsStore.addReservation(id, data)
  postingsStore.updatePosting(id, { status: 'reserved' })
  global.selectedReservePosting = null
}
</script>

<template>
  <NuxtLayout>
    <section class="flex min-h-[85vh]">
      <Sidebar class="max-w-[250px] xl:max-w-[350px]" />

      <div class="grow py-4">
        <div v-if="postingsStore.data" class="flex flex-col gap-8">
          <FoodItemsList
            :food-items="postingsStore.data"
            class="mx-6"
          />
          <Map
            :food-items="postingsStore.data || []"
            class="mx-6 overflow-hidden rounded-lg"
          />
        </div>
      </div>

      <Modal
        :title="global.selectedReservePosting?.name"
        :open="!!global.selectedReservePosting"
        @close="global.selectedReservePosting = null"
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
              confirmPickup(global.selectedReservePosting.id, data)
            }"
          >
            <div class="max-w-md">
              <div class="text-xl font-bold mb-3">
                {{ `You are picking up food from ${global.selectedReservePosting.created_by.firstname} ${global.selectedReservePosting.created_by.lastname}` }}
              </div>

              <Input
                name="pickup_date_time"
                label="pick up time and date"
                :validation="`required|date_before:${format(parseISO(global.selectedReservePosting.expiration_date_post), 'yyyy-MM-dd HH:mm')}`"
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
  </NuxtLayout>
</template>
