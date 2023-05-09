<script setup>
import { reset } from '@formkit/core'
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
      <div class="flex flex-1 flex-row mt-2 ml-5">
        <Head>
          <Title>Give</Title>
        </Head>
        <div class="pb-12 grow pr-3 mt-2 h-full">
          <FormKit
            id="myForm"
            type="form"
            :value="{name: '', description: '', category: '', expiration_date_item: '', address: '', allergies: ''}"
            submit-label="Give"
            @submit="() => {
              postingsStore.addPosting
              reset('myForm')
            }"
          >
            <h1 class="text-primary">
              Give
            </h1>
            <div class="mt-10 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-6">
              <div class="sm:col-span-3">
                <div class="mt-2">
                  <FormKit name="name" type="text" label="Item Name" validation="required" />
                </div>
              </div>

              <div class="sm:col-span-3">
                <div class="mt-2">
                  <Input
                    name="category"
                    type="select"
                    :options="categoriesStore.options"
                    label="Category"
                    validation="required"
                    placeholder="Select Category"
                  />
                </div>
              </div>
            </div>
            <div class="mt-6 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-6">
              <div class="sm:col-span-3">
                <div class="mt-2">
                  <Input
                    placeholder="Select address"
                    validation="required"
                    name="address"
                    type="select"
                    :options="addressStore.options"
                    label="Address"
                  />
                </div>
              </div>

              <div class="sm:col-span-3">
                <div class="mt-2" />
              </div>
            </div>
            <div class="mt-6 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-6">
              <div class="sm:col-span-3">
                <div class="mt-2">
                  <Input name="expiration_date_post" type="date" label="Expiration Date Post" validation="required" />
                </div>
              </div>

              <div class="sm:col-span-3">
                <div class="mt-2">
                  <Input name="expiration_date_item" type="date" label="Expiration Date Item" validation="required" />
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
                  <Input name="description" type="textarea" label="Description" validation="required" />
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
            Item Name: Enter the name of the food item you want to add, such as "Apple Pie" or "Grilled Chicken Sandwich."<br><br>

            Category: Select the category that best fits the food item, such as "Desserts," "Sandwiches," or "Vegetarian." <br><br>

            Address: Provide the location of the food item, such as a restaurant or home address.<br><br>

            Expiration Date Post: Enter the date you are posting the food item to inform people how fresh it is. <br><br>

            Expiration Date Item: Enter the expiration date of the food item to inform people how long it will last. <br><br>

            Allergies: Indicate any known allergies associated with the food item, such as peanuts or gluten. <br><br>

            Description: Provide any additional information about the food item, such as ingredients or preparation methods.<br><br>
          </p>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
