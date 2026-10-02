import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useDestinationsStore } from './destinations'
import { useToastStore } from './toast'
import type { Destination } from '@/types'

const STORAGE_KEY = 'tripnest_saved_destinations'

export const useSavedStore = defineStore('saved', () => {
  const destinationsStore = useDestinationsStore()
  const toastStore = useToastStore()

  // Load initial from LocalStorage safely
  function loadSavedIds(): string[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) return parsed
      }
    } catch (e) {
      console.warn('Failed to parse saved destinations from localStorage', e)
    }
    // Default initial favorites for demo: Manali & Udaipur
    return ['dest-manali', 'dest-udaipur']
  }

  const savedIds = ref<string[]>(loadSavedIds())

  // Save to LocalStorage
  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedIds.value))
    } catch (e) {
      console.warn('Failed to save to localStorage', e)
    }
  }

  const count = computed(() => savedIds.value.length)

  const savedDestinations = computed<Destination[]>(() => {
    return savedIds.value
      .map(id => destinationsStore.getDestinationById(id))
      .filter((d): d is Destination => d !== undefined)
  })

  function isSaved(destinationId: string): boolean {
    return savedIds.value.includes(destinationId)
  }

  function toggleSaved(destinationId: string) {
    const dest = destinationsStore.getDestinationById(destinationId)
    const name = dest ? dest.name : 'Destination'

    if (isSaved(destinationId)) {
      savedIds.value = savedIds.value.filter(id => id !== destinationId)
      persist()
      toastStore.showToast(`Removed ${name} from saved destinations`, 'info')
    } else {
      savedIds.value.push(destinationId)
      persist()
      toastStore.showToast(`Saved ${name} to your travel list!`, 'success')
    }
  }

  function clearAllSaved() {
    savedIds.value = []
    persist()
    toastStore.showToast('Cleared all saved destinations', 'info')
  }

  return {
    savedIds,
    count,
    savedDestinations,
    isSaved,
    toggleSaved,
    clearAllSaved
  }
})
