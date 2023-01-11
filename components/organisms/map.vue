<script setup>
// defineProps(
//   { blok: { type: Object, required: true }}
// )

const map = ref({})
const mapElement = ref()
const selectedLocation = ref()
const config = useRuntimeConfig()

const dummyData = [
  {
    category: 'fruit',
    name: 'pineapples',
    age: '2 days',
    availableStart: '',
    availableEnd: '',
    isReserved: false,
    latitude: 50,
    longitude: 4,
    description: 'yummy food for you',
    profile: {
      name: 'Lander',
      rating: 4.3,
    },
  },
  {
    category: 'meat',
    name: 'steak',
    age: '3 days',
    availableStart: '',
    availableEnd: '',
    isReserved: true,
    latitude: 50.4,
    longitude: 4,
    description: 'come by and get this yummy steak',
    profile: {
      name: 'Janny',
      rating: 3.3,
    },
  },
]
const openLocation = (loc) => {
  selectedLocation.value = selectedLocation.value === loc ? null : loc
}

const getCategoryIcon = (category) => {
  switch (category) {
    case 'fruit':
      return L.icon({
        iconUrl: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/red-apple_1f34e.png',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      })
    case 'meat':
      return L.icon({
        iconUrl: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/cut-of-meat_1f969.png',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      })
    default:
      return L.icon({
        iconUrl: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/pot-of-food_1f372.png',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
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

    dummyData.forEach((location) => {
      L.marker([location.latitude, location.longitude], { icon: getCategoryIcon(location.category) }).addTo(map.value).on('click', () => {
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
  <section class="container relative">
    <div class="flex flex-row">
      <div class="bg-slate-300">
        Sidebar filters
      </div>
      <div class="flex flex-col">
        <div class="bg-slate-300">
          search
        </div>
        <div id="leafletmap" ref="mapElement" class="relative z-10 w-[1000px] h-[500px]" />
      </div>
    </div>
    <div
      v-if="selectedLocation"
      class="z-20 gap-3 p-8 bg-white shadow-lg w-64 rounded-2xl right-4 bottom-7 absolute"
    >
      <div
        class="text-xl font-bold text-blue-500"
        :class="{ 'text-red-500' : selectedLocation.isReserved}"
      >
        {{ selectedLocation.name }}
      </div>
      <div class="text-base">
        {{ selectedLocation.age }} old
      </div>
      <div class="text-base">
        {{ selectedLocation.description }}
      </div>
      <div class="text-base">
        {{ selectedLocation.profile.rating }} ⭐️
      </div>
      <div class="text-base">
        {{ selectedLocation.profile.name }}
      </div>
    </div>
  </section>
</template>
