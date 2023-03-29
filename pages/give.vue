<script setup>
import { useCategoriesStore } from '@/store/categories'
import { useAddressStore } from '@/store/address'
const categoriesStore = useCategoriesStore()
const addressStore = useAddressStore()
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
            :value="{itemName: '', description: '', category: '', expirationDate: ''}"
            submit-label="Give"
            @submit="(data) => {}"
          >
            <h1 class="text-primary">
              Give
            </h1>
            <div class="mt-10 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-6">
              <div class="sm:col-span-3">
                <div class="mt-2">
                  <Input name="itemName" type="text" label="Item Name" />
                </div>
              </div>

              <div class="sm:col-span-3">
                <div class="mt-2">
                  <Input name="description" type="textarea" label="Description" />
                </div>
              </div>
            </div>
            <div class="mt-6 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-6">
              <div class="sm:col-span-3">
                <div class="mt-2">
                  <Input name="category" type="select" :options="categoriesStore.options" label="Category" />
                </div>
              </div>

              <div class="sm:col-span-3">
                <div class="mt-2">
                  <Input name="expirationDate" type="date" label="Expiration Date" />
                </div>
              </div>
            </div>
            <div class="mt-6 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-6">
              <div class="sm:col-span-3">
                <div class="mt-2">
                  <Input name="addresses" type="select" :options="addressStore.options" label="Address" />
                </div>
              </div>

              <div class="sm:col-span-3">
                <div class="mt-2">
                  <Input name="expirationDate" type="date" label="Expiration Date" />
                </div>
              </div>
            </div>
            <div class="mt-6 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-6">
              <div class="sm:col-span-3">
                <div class="mt-2">
                  <Input name="category" type="select" :options="categoriesStore.options" label="Category" />
                </div>
              </div>

              <div class="sm:col-span-3">
                <div class="mt-2">
                  <Input name="expirationDate" type="date" label="Expiration Date" />
                </div>
              </div>
            </div>
            <div class="mt-6 grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-6 flex flex-row-reverse mr-6" />
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
