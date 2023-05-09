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
  return L.icon({
    iconUrl: `https://api.iconify.design/fluent-emoji-flat/${category.icon}.svg`,
    iconSize: [40, 40],
    iconAnchor: [20, 30],
  })
}

onMounted(() => {
  if (process.client) {
    map.value = L.map(mapElement.value, {
      center: store.profile ? [store.profile.address[0].lat, store.profile.address[0].long] : [0, 0],
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
      L.marker([location.address.lat, location.address.long], { icon: getCategoryIcon(location.category) }).addTo(map.value).on('click', () => {
        openLocation(location)
      })
    })
  }
})

setTimeout(() => {
  if (process.client) window.dispatchEvent(new Event('resize'))
}, 1000)

watch(() => global.selectedPosting, (v) => {
  if (v) map.value.flyTo([v.address.lat, v.address.long], 15, { animate: true, duration: 2 })
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
