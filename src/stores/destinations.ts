import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Destination, DestinationFilterOptions } from '@/types'
import { DESTINATIONS } from '@/data/destinations'

export const useDestinationsStore = defineStore('destinations', () => {
  const destinations = ref<Destination[]>(DESTINATIONS)

  const initialFilters: DestinationFilterOptions = {
    searchQuery: '',
    state: '',
    travelStyle: '',
    budgetTier: '',
    durationTier: '',
    season: '',
    sortBy: 'recommended'
  }

  const filters = ref<DestinationFilterOptions>({ ...initialFilters })

  // Unique list of states
  const states = computed(() => {
    const set = new Set(destinations.value.map(d => d.state))
    return Array.from(set).sort()
  })

  // Popular destinations (the 6 specified in prompt)
  const popularDestinations = computed(() => {
    return destinations.value
      .filter(d => d.popularOrder !== undefined)
      .sort((a, b) => (a.popularOrder || 0) - (b.popularOrder || 0))
  })

  // Filtered & sorted destinations
  const filteredDestinations = computed(() => {
    return destinations.value
      .filter(dest => {
        // Search query (name, state, tagline, description)
        if (filters.value.searchQuery) {
          const query = filters.value.searchQuery.toLowerCase().trim()
          const matchName = dest.name.toLowerCase().includes(query)
          const matchState = dest.state.toLowerCase().includes(query)
          const matchTagline = dest.tagline.toLowerCase().includes(query)
          const matchDesc = dest.description.toLowerCase().includes(query)
          if (!matchName && !matchState && !matchTagline && !matchDesc) {
            return false
          }
        }

        // State filter
        if (filters.value.state && dest.state !== filters.value.state) {
          return false
        }

        // Travel style filter
        if (filters.value.travelStyle) {
          const style = filters.value.travelStyle as any
          if (!dest.travelStyles.includes(style)) {
            return false
          }
        }

        // Budget tier filter
        if (filters.value.budgetTier) {
          if (dest.budgetTier !== filters.value.budgetTier) {
            return false
          }
        }

        // Duration tier filter
        if (filters.value.durationTier) {
          if (dest.durationTier !== filters.value.durationTier) {
            return false
          }
        }

        // Season filter
        if (filters.value.season) {
          const s = filters.value.season.toLowerCase()
          if (!dest.bestSeasonText.toLowerCase().includes(s)) {
            return false
          }
        }

        return true
      })
      .sort((a, b) => {
        if (filters.value.sortBy === 'name-asc') {
          return a.name.localeCompare(b.name)
        }
        if (filters.value.sortBy === 'budget-asc') {
          return a.estimatedBudget - b.estimatedBudget
        }
        if (filters.value.sortBy === 'budget-desc') {
          return b.estimatedBudget - a.estimatedBudget
        }
        // Recommended default
        return (a.popularOrder || 99) - (b.popularOrder || 99)
      })
  })

  function setFilter<K extends keyof DestinationFilterOptions>(key: K, value: DestinationFilterOptions[K]) {
    filters.value[key] = value
  }

  function resetFilters() {
    filters.value = { ...initialFilters }
  }

  function getDestinationBySlug(slug: string): Destination | undefined {
    return destinations.value.find(d => d.slug.toLowerCase() === slug.toLowerCase())
  }

  function getDestinationById(id: string): Destination | undefined {
    return destinations.value.find(d => d.id === id)
  }

  function getSimilarDestinations(slug: string): Destination[] {
    const current = getDestinationBySlug(slug)
    if (!current) return []
    // Match similar slugs or travel styles
    return destinations.value
      .filter(d => d.slug !== slug)
      .filter(d => {
        if (current.similarDestinationSlugs.includes(d.slug)) return true
        return d.travelStyles.some(s => current.travelStyles.includes(s))
      })
      .slice(0, 3)
  }

  return {
    destinations,
    filters,
    states,
    popularDestinations,
    filteredDestinations,
    setFilter,
    resetFilters,
    getDestinationBySlug,
    getDestinationById,
    getSimilarDestinations
  }
})
