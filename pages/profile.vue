<script setup>
import { useProfileStore } from '@/store/profile'
import { useAddressStore } from '@/store/address'
import { useAllergiesStore } from '@/store/allergies'

const profileStore = useProfileStore()
const addressStore = useAddressStore()
const allergiesStore = useAllergiesStore()
</script>

<template>
  <NuxtLayout>
    <div class="flex flex-row gap-5 pt-10">
      <Head>
        <Title>Give</Title>
      </Head>
      <FormKit
        v-if="profileStore.profile"
        type="form"
        :value="profileStore.profile"
        submit-label="Save"
        @submit="(data) => {
          profileStore.updateProfile(data)
        }"
      >
        <div
          class="w-[500px]"
        >
          <h1 class="text-primary">
            Profile
          </h1>
          <Input name="firstname" type="text" label="First name" />
          <Input name="lastname" type="text" label="Last name" />
          <Input name="allergies" type="checkbox" :options="allergiesStore.options" label="Allergies" />
        </div>
      </FormKit>
      <FormKit
        v-if="addressStore.address"
        type="form"
        :value="addressStore.address[0]"
        submit-label="Save"
        @submit="(data) => {
          addressStore.updateAddress(addressStore.address[0].id, data)
        }"
      >
        <div
          class="w-[500px]"
        >
          <h1 class="text-primary">
            address
          </h1>
          <Input name="zip" type="number" label="zip" />
          <Input name="street" type="text" label="street" />
          <Input name="house_number" type="number" label="House number" />
          <Input name="city" type="text" label="City" />
          <Input name="country" type="text" label="Country" />
        </div>
      </FormKit>
    </div>
  </NuxtLayout>
</template>
