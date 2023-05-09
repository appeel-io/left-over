<script setup>
import { LIcon, LMap, LMarker, LTileLayer } from '@vue-leaflet/vue-leaflet'
import { useProfileStore } from '@/store/profile'
import { useGlobalStore } from '@/store/global'
import 'leaflet/dist/leaflet.css'

const store = useProfileStore()
const global = useGlobalStore()
const config = useRuntimeConfig()

const props = defineProps({
  foodItems: { type: Array, required: true },
})

const center = computed(() => {
  if (global.selectedPosting?.address)
    return [global.selectedPosting.address.lat, global.selectedPosting.address.long]
  else if (store.position?.lat && store.position?.long)
    return [store.position.lat, store.position.long]
  else return [50.8476, 4.3572] // Brussel
})
</script>

<template>
  <section class="relative z-10">
    <div class="h-[500px]">
      <ClientOnly>
        <l-map
          :use-global-leaflet="false"
          :zoom="9"
          :center="center"
        >
          <l-tile-layer
            :url="`https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key=${config.public?.leafletApiKey}`"
            layer-type="base"
            name="OpenStreetMap"
          />
          <l-marker
            v-if="store.position?.lat && store.position?.long"
            :lat-lng="[store.position.lat, store.position.long]"
          >
            <l-icon
              :icon-size="[40, 40]"
              class-name="bg-transparent"
            >
              <Icon
                name="fluent-emoji-flat:round-pushpin"
                size="40px"
                class="relative bottom-2"
              />
            </l-icon>
          </l-marker>
          <l-marker
            v-for="item in props.foodItems"
            :key="item.id"
            :lat-lng="[item.address.lat, item.address.long]"
            @click="global.selectedPosting = item"
          >
            <l-icon
              :icon-size="[40, 40]"
              class-name="bg-transparent"
            >
              <Icon
                :name="`fluent-emoji-flat:${item.category.icon}`"
                size="40px"
                class="relative bottom-2"
              />
            </l-icon>
          </l-marker>
        </l-map>
      </ClientOnly>
    </div>
    <Button
      :label="
        store.currentLocation && !store.geoError
          ? 'Stop sharing location'
          : 'Use current location'
      "
      class="mt-2"
      @click="
        store.currentLocation && !store.geoError
          ? store.pauseCurrentLocation()
          : store.startCurrentLocation()
      "
    />
  </section>
</template>

<style>
.leaflet-control-attribution {
  @apply hidden;
}
</style>
