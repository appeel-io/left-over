<script setup>
import { useProfileStore } from '@/store/profile'
import { useGlobalStore } from '@/store/global'

const store = useProfileStore()
const global = useGlobalStore()
const config = useRuntimeConfig()

const map = ref({})
const mapElement = ref()
const selectedLocation = ref()

const props = defineProps({
  foodItems: { type: Array, required: true },
})

function openLocation(loc) {
  selectedLocation.value = selectedLocation.value === loc ? null : loc
}

function getCategoryIcon(category) {
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
    case 'pin':
      return L.icon({
        iconUrl: 'https://em-content.zobj.net/thumbs/120/google/350/round-pushpin_1f4cd.png',
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
      center: [store.profile.address[0].lat, store.profile.address[0].long],
      zoom: 9,
    })

    L.tileLayer(`https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key=${config.public?.leafletApiKey}`).addTo(map.value)

    // Location marker
    if (store.profile.address[0]) {
      L.marker(
        [store.profile.address[0].lat, store.profile.address[0].long],
        { icon: getCategoryIcon('pin') },
      ).addTo(map.value)
    }

    // Food markers
    props.foodItems.forEach((location) => {
      L.marker(
        [location.address.lat, location.address.long],
        { icon: getCategoryIcon(location.category.label) },
      ).addTo(map.value).on('click', () => {
        openLocation(location)
      })
    })
  }
})

setTimeout(() => {
  if (process.client) window.dispatchEvent(new Event('resize'))
}, 1000)

watch(() => global.selectedPosting, (v) => {
  if (v) map.value.flyTo([v.address.lat, v.address.long])
})
</script>

<template>
  <section class="relative">
    <div
      id="leafletmap"
      ref="mapElement"
      class="relative z-10 w-full h-[500px]"
    />
    <FoodItemDetail
      v-if="selectedLocation"
      v-click-outside="() => (selectedLocation = null)"
      class="z-20 right-10 bottom-7 absolute"
      :food-item="selectedLocation"
    />
  </section>
</template>
