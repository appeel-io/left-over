<script setup>

</script>

<template>
  <NuxtLayout>
    <div class="flex flex-col">
      <Head>
        <Title>Home</Title>
      </Head>

      <FoodItemDetail
        :user-latitude="50"
        :user-longitude="5"
        :food-item="{
          name: 'Steak',
          category: {
            label: 'Meat',
            icon: 'mdi:fish',
            color: '#CC0000'
          },
          profile: {
            name: 'Lander',
            latitude: 50,
            longitude: 4,
          },
          experation_date_food: new Date(),
          experation_date_item: new Date(),
          created_at: new Date(),
          retrieval_start_range: new Date(),
          retrieval_end_range: new Date(),
          description: 'come pick this up asap please',
        }"
      />
    </div>
  </NuxtLayout>
</template>
