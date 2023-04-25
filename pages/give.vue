<script setup>
import { useCategoriesStore } from '@/store/categories'
import { useAddressStore } from '@/store/address'
import { usePostingsStore } from '@/store/postings'
import { useAllergiesStore } from '~/store/allergies'
const categoriesStore = useCategoriesStore()
const addressStore = useAddressStore()
const postingsStore = usePostingsStore()
const allergiesStore = useAllergiesStore()
</script>
<template>
  <NuxtLayout>
    <div class="flex flex-1 flex-col">
      <div class="flex flex-1 flex-row mt-2">
        <Head>
          <Title>Give</Title>
        </Head>
        <div class="pb-12 grow pr-3 mt-2 h-full">
          <FormKit
            type="form"
            :value="{name: '', description: '', category: '', expiration_date_item: '', address: '', allergies: ''}"
            submit-label="Give"
            @submit="postingsStore.addPosting"
          >
            <h1 class="text-primary">
              Give
            </h1>
            <div class="mt-10 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-6">
              <div class="sm:col-span-3">
                <div class="mt-2">
                  <Input name="name" type="text" label="Item Name" />
                </div>
              </div>

              <div class="sm:col-span-3">
                <div class="mt-2">
                  <Input
                    name="category"
                    type="select"
                    :options="categoriesStore.options"
                    label="Category"
                    placeholder="Select Category"
                    value=""
                  />
                </div>
              </div>
            </div>
            <div class="mt-6 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-6">
              <div class="sm:col-span-3">
                <div class="mt-2">
                  <Input placeholder="Select address" name="address" type="select" :options="addressStore.options" label="Address" />
                </div>
              </div>

              <div class="sm:col-span-3">
                <div class="mt-2" />
              </div>
            </div>
            <div class="mt-6 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-6">
              <div class="sm:col-span-3">
                <div class="mt-2">
                  <Input name="expiration_date_post" type="date" label="Expiration Date Post" />
                </div>
              </div>

              <div class="sm:col-span-3">
                <div class="mt-2">
                  <Input name="expiration_date_item" type="date" label="Expiration Date Item" />
                </div>
              </div>
            </div>
            <div class="mt-6 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-6">
              <div class="sm:col-span-3">
                <div class="mt-2">
                  <Input name="allergies" type="checkbox" :options="allergiesStore.options" label="Allergies" />
                </div>
              </div>

              <div class="sm:col-span-3">
                <div class="mt-2">
                  <Input name="description" type="textarea" label="Description" />
                </div>
              </div>
            </div>
          </FormKit>
        </div>

        <div class="flex-1 pl-3 border-l-2 border-gray-100 ">
          <h3 class="mt-2 mb-6">
            Fill In Guide
          </h3>
          <p>
            item name = ??? <br>
            description = ??? <br>
            expiration date = should be same as product experation date <br>
          </p>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
