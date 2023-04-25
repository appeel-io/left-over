<script setup>
const map = ref({})
const mapElement = ref()
const selectedLocation = ref()
const config = useRuntimeConfig()

const props = defineProps({
  foodItems: { type: Array, required: true },
})

// const dummyData = [
//   {
//     category: 'fruit',
//     name: 'pineapples',
//     isReserved: false,
//     latitude: 50,
//     longitude: 4,
//     description: 'yummy food for you',
//     experation_date_food: new Date(),
//     experation_date_item: new Date(),
//     created_at: new Date(),
//     retrieval_start_range: new Date(),
//     retrieval_end_range: new Date(),
//     profile: {
//       name: 'Lander',
//       rating: 4.3,
//       latitude: 50,
//       longitude: 4,
//     },
//   },
//   {
//     category: 'meat',
//     name: 'steak',
//     isReserved: true,
//     latitude: 50.4,
//     longitude: 4,
//     description: 'come by and get this yummy steak',
//     experation_date_food: new Date(),
//     experation_date_item: new Date(),
//     created_at: new Date(),
//     retrieval_start_range: new Date(),
//     retrieval_end_range: new Date(),
//     profile: {
//       name: 'Janny',
//       rating: 3.3,
//       latitude: 50,
//       longitude: 4,
//     },
//   },
// ]
const openLocation = (loc) => {
  selectedLocation.value = selectedLocation.value === loc ? null : loc
}

const enableLocation = () => {
  const customIcon = L.icon({
    iconUrl: 'https://em-content.zobj.net/thumbs/240/apple/354/red-apple_1f34e.png',
    iconSize: [40, 40],
    iconAnchor: [20, 30],
  })

  map.value.locate({ setView: true, maxZoom: 15 })
    .on('locationfound', (e) => {
      const marker = L.marker([e.latitude, e.longitude], { icon: customIcon })
      // var circle = L.circle([e.latitude, e.longitude], e.accuracy/2, {
      //     weight: 1,
      //     color: 'blue',
      //     fillColor: '#cacaca',
      //     fillOpacity: 0.2
      // });
      map.value.addLayer(marker)
      // map.addLayer(circle)
    })
    .on('locationerror', (e) => {
      // eslint-disable-next-line no-alert
      alert('Location access denied.')
    })
}

const getCategoryIcon = (category) => {
  switch (category) {
    case 'fruit':
      return L.icon({
        iconUrl: 'https://em-content.zobj.net/thumbs/240/apple/354/red-apple_1f34e.png',
        iconSize: [40, 40],
        iconAnchor: [20, 30],
      })
    case 'meat':
      return L.icon({
        iconUrl: 'https://em-content.zobj.net/thumbs/240/apple/354/cut-of-meat_1f969.png',
        iconSize: [40, 40],
        iconAnchor: [20, 30],
      })
    default:
      return L.icon({
        iconUrl: 'https://em-content.zobj.net/thumbs/240/apple/354/pot-of-food_1f372.png',
        iconSize: [40, 40],
        iconAnchor: [20, 30],
      })
  }
}

onMounted(() => {
  if (process.client) {
    map.value = L.map(mapElement.value, {
      center: [51.141516, 4.438494],
      zoom: 9,
    })

    L.tileLayer(`https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key=${config.public?.leafletApiKey}`).addTo(map.value)

    props.foodItems.forEach((location) => {
      L.marker([location.address.lat, location.address.long], { icon: getCategoryIcon(location.category.label) }).addTo(map.value).on('click', () => {
        openLocation(location)
      })
    })
  }
})

setTimeout(() => {
  if (process.client) window.dispatchEvent(new Event('resize'))
}, 1000)
</script>

<template>
  <section class="relative">
    <div
      id="leafletmap"
      ref="mapElement"
      class="relative z-10 w-full h-[500px]"
    />
    <Button
      class="z-20 right-10 top-7 absolute"
      label="enable location"
      @click="enableLocation"
    />
    <FoodItemDetail
      v-if="selectedLocation"
      class="z-20 right-10 bottom-7 absolute"
      :user-latitude="50"
      :user-longitude="5"
      :food-item="selectedLocation"
    />
  </section>
</template>
