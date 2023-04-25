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
      return L.divIcon({
        className: '',
        html: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><g fill="none"><path fill="#F3AD61" d="M27.34 25.593L15 30V16.5L29 13v10.238a2.5 2.5 0 0 1-1.66 2.355Z"/><path fill="#E19747" d="M14.59 3.262L3.202 7.556L17 19l10.98-3.8A3 3 0 0 0 30 12.364v-.904a5 5 0 0 0-3.239-4.679l-9.35-3.52a4 4 0 0 0-2.821 0Z"/><path fill="#FFDEA7" d="M3 13.5v9.955a3 3 0 0 0 1.903 2.793l9.366 3.679A2 2 0 0 0 17 28.065V19l.157-.235a5.02 5.02 0 0 0-2.415-7.487L4.702 7.513A2 2 0 0 0 2 9.386v1.403a4 4 0 0 0 .672 2.219L3 13.5Z"/><path fill="#E19747" d="M8 13.5a.5.5 0 1 1-1 0a.5.5 0 0 1 1 0Zm-2 1a.5.5 0 1 1-1 0a.5.5 0 0 1 1 0ZM7.5 17a.5.5 0 1 0 0-1a.5.5 0 0 0 0 1Zm-1.5.5a.5.5 0 1 1-1 0a.5.5 0 0 1 1 0ZM9.5 16a.5.5 0 1 0 0-1a.5.5 0 0 0 0 1Zm2.5-1.5a.5.5 0 1 1-1 0a.5.5 0 0 1 1 0Zm1.5 3.5a.5.5 0 1 0 0-1a.5.5 0 0 0 0 1Zm-1.5.5a.5.5 0 1 1-1 0a.5.5 0 0 1 1 0ZM9.5 20a.5.5 0 1 0 0-1a.5.5 0 0 0 0 1Zm-1.5.5a.5.5 0 1 1-1 0a.5.5 0 0 1 1 0ZM5.5 22a.5.5 0 1 0 0-1a.5.5 0 0 0 0 1Zm4.5 1.5a.5.5 0 1 1-1 0a.5.5 0 0 1 1 0Zm1.5-.5a.5.5 0 1 0 0-1a.5.5 0 0 0 0 1Zm2.5-1.5a.5.5 0 1 1-1 0a.5.5 0 0 1 1 0Zm-.5 3.5a.5.5 0 1 0 0-1a.5.5 0 0 0 0 1Z"/></g></svg>',
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
    if (store.profile?.address[0]) {
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
