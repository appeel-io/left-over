<script setup>
import { useProfileStore } from '@/store/profile'
import { useAddressStore } from '@/store/address'

const profileStore = useProfileStore()
const addressStore = useAddressStore()
</script>

<template>
  <NuxtLayout>
    <div class="flex flex-row">
      <Head>
        <Title>Give</Title>
      </Head>
      <div class="pb-12 flex pr-3 mt-2 h-full gap-5">
        <FormKit
          v-if="profileStore.profile"
          type="form"
          :value="profileStore.profile"
          submit-label="Save"
          @submit="(data) => {
            console.log(data)
          }"
        >
          <h1 class="text-primary">
            Profile
          </h1>
          <Input name="firstname" type="text" label="First name" />
          <Input name="lastname" type="text" label="Last name" />
        </FormKit>
        <!-- <FormKit
          v-if="addressStore.address"
          type="form"
          :value="addressStore.address"
          submit-label="Save"
          @submit="(data) => {
            addressStore.updateAddress( ,data)
          }"
        >
          <h1 class="text-primary">
            address
          </h1>
          <Input name="zip" type="text" label="zip" />
          <Input name="street" type="text" label="street" />
          <Input name="house_number" type="number" label="House number" />
          <Input name="lat" type="number" label="lat" />
          <Input name="long" type="number" label="long" />
        </FormKit> -->
      </div>
    </div>
  </NuxtLayout>
</template>
