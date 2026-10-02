<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapPin, AlertCircle, RefreshCw } from 'lucide-vue-next'

export interface MapMarker {
  id: string
  title: string
  description?: string
  coordinates: [number, number]
  category?: string
}

const props = withDefaults(
  defineProps<{
    center: [number, number]
    zoom?: number
    markers?: MapMarker[]
    height?: string
  }>(),
  {
    zoom: 12,
    markers: () => [],
    height: '420px'
  }
)

const mapContainer = ref<HTMLElement | null>(null)
let mapInstance: L.Map | null = null
let markerGroup: L.LayerGroup | null = null

const hasError = ref(false)
const isLoading = ref(true)

function initMap() {
  if (!mapContainer.value) return
  hasError.value = false
  isLoading.value = true

  try {
    if (mapInstance) {
      mapInstance.remove()
      mapInstance = null
    }

    mapInstance = L.map(mapContainer.value, {
      center: props.center,
      zoom: props.zoom,
      zoomControl: true,
      scrollWheelZoom: false
    })

    const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors'
    })

    tileLayer.on('tileerror', () => {
      // If offline or tiles blocked, we record tile loading issue
      console.warn('Map tile failed to load; using graceful fallback.')
    })

    tileLayer.addTo(mapInstance)

    markerGroup = L.layerGroup().addTo(mapInstance)
    renderMarkers()

    isLoading.value = false
  } catch (err) {
    console.error('Error initializing Leaflet map:', err)
    hasError.value = true
    isLoading.value = false
  }
}

function renderMarkers() {
  if (!mapInstance || !markerGroup) return
  markerGroup.clearLayers()

  const customIcon = L.divIcon({
    className: 'custom-map-pin',
    html: `
      <div style="background-color: #C77B5A; width: 30px; height: 30px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.3); border: 2px solid #FFFFFF;">
        <div style="width: 10px; height: 10px; background: #FFFFFF; border-radius: 50%;"></div>
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -32]
  })

  props.markers.forEach(marker => {
    const leafletMarker = L.marker(marker.coordinates, { icon: customIcon })
    const popupContent = `
      <div style="font-family: inherit; padding: 4px; min-width: 160px;">
        <span style="font-size: 11px; text-transform: uppercase; font-weight: 700; color: #2D6658; letter-spacing: 0.05em;">${marker.category || 'Point of Interest'}</span>
        <h4 style="font-size: 14px; font-weight: 600; margin: 4px 0 2px; color: #173D35;">${marker.title}</h4>
        ${marker.description ? `<p style="font-size: 12px; color: #777E79; margin: 0; line-height: 1.3;">${marker.description}</p>` : ''}
      </div>
    `
    leafletMarker.bindPopup(popupContent)
    markerGroup?.addLayer(leafletMarker)
  })

  // If there are multiple markers, fit map bounds nicely
  if (props.markers.length > 1) {
    const latLngs = props.markers.map(m => m.coordinates)
    const bounds = L.latLngBounds(latLngs)
    mapInstance.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 })
  }
}

watch(
  () => props.center,
  (newCenter) => {
    if (mapInstance) {
      mapInstance.setView(newCenter, props.zoom)
      renderMarkers()
    }
  },
  { deep: true }
)

watch(
  () => props.markers,
  () => {
    renderMarkers()
  },
  { deep: true }
)

onMounted(() => {
  // Give container time to compute layout size
  setTimeout(() => {
    initMap()
  }, 100)
})

onBeforeUnmount(() => {
  if (mapInstance) {
    mapInstance.remove()
    mapInstance = null
  }
})
</script>

<template>
  <div class="map-view-wrapper" :style="{ height }">
    <!-- Map Container -->
    <div ref="mapContainer" class="leaflet-map-element" />

    <!-- Error / Fallback State -->
    <div v-if="hasError" class="map-fallback">
      <div class="map-fallback-card">
        <AlertCircle :size="32" class="fallback-icon" />
        <h4>Interactive Map Unavailable</h4>
        <p>
          We are unable to connect to the OpenStreetMap tile server at this moment. You can still explore the coordinates and attractions listed below.
        </p>
        <button type="button" class="btn btn-sm btn-outline" @click="initMap">
          <RefreshCw :size="14" /> Retry Loading Map
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.map-view-wrapper {
  position: relative;
  width: 100%;
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  background-color: var(--color-beige);
}

.leaflet-map-element {
  width: 100%;
  height: 100%;
  z-index: 1;
}

.map-fallback {
  position: absolute;
  inset: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-surface);
  padding: 1.5rem;
  text-align: center;
}

.map-fallback-card {
  max-width: 380px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.fallback-icon {
  color: var(--color-terracotta);
}

.map-fallback-card h4 {
  color: var(--color-forest);
  margin: 0;
}

.map-fallback-card p {
  font-size: 0.88rem;
  color: var(--color-text-muted);
  line-height: 1.45;
}
</style>
