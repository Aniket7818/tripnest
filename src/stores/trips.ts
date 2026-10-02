import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Trip, ItineraryActivity, BudgetBreakdown } from '@/types'
import { SAMPLE_TRIPS } from '@/data/sampleTrips'
import { useToastStore } from './toast'
import { generateUniqueId } from '@/utils/formatters'

const STORAGE_KEY = 'tripnest_user_trips'

export const useTripsStore = defineStore('trips', () => {
  const toastStore = useToastStore()

  function loadTrips(): Trip[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed
        }
      }
    } catch (e) {
      console.warn('Failed to load trips from localStorage', e)
    }
    // Return sample trips as default initial state
    return JSON.parse(JSON.stringify(SAMPLE_TRIPS))
  }

  const trips = ref<Trip[]>(loadTrips())

  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trips.value))
    } catch (e) {
      console.warn('Failed to save trips to localStorage', e)
    }
  }

  // Filter options for My Trips
  const filterStatus = ref<'all' | 'upcoming' | 'past'>('all')
  const sortBy = ref<'created-desc' | 'date-asc' | 'budget-asc' | 'budget-desc'>('created-desc')

  const filteredTrips = computed(() => {
    return trips.value
      .filter(t => {
        if (filterStatus.value === 'all') return true
        return t.status === filterStatus.value
      })
      .sort((a, b) => {
        if (sortBy.value === 'created-desc') {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        }
        if (sortBy.value === 'date-asc') {
          return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        }
        if (sortBy.value === 'budget-asc') {
          return a.totalBudget - b.totalBudget
        }
        if (sortBy.value === 'budget-desc') {
          return b.totalBudget - a.totalBudget
        }
        return 0
      })
  })

  function getTripById(id: string): Trip | undefined {
    return trips.value.find(t => t.id === id)
  }

  function recalculateTripBudget(trip: Trip) {
    const total =
      Number(trip.budget.transportation || 0) +
      Number(trip.budget.accommodation || 0) +
      Number(trip.budget.food || 0) +
      Number(trip.budget.activities || 0) +
      Number(trip.budget.miscellaneous || 0)

    trip.totalBudget = total
    trip.costPerPerson = trip.travelersCount > 0 ? Math.round(total / trip.travelersCount) : total
  }

  function createTrip(newTripData: Omit<Trip, 'id' | 'createdAt' | 'updatedAt'>): Trip {
    const id = generateUniqueId('trip')
    const now = new Date().toISOString()
    const trip: Trip = {
      ...newTripData,
      id,
      createdAt: now,
      updatedAt: now
    }
    recalculateTripBudget(trip)
    trips.value.unshift(trip)
    persist()
    toastStore.showToast(`Trip "${trip.name}" successfully created!`, 'success')
    return trip
  }

  function updateTrip(id: string, updates: Partial<Trip>): boolean {
    const idx = trips.value.findIndex(t => t.id === id)
    if (idx === -1) return false

    const updated = {
      ...trips.value[idx],
      ...updates,
      updatedAt: new Date().toISOString()
    }
    recalculateTripBudget(updated)
    trips.value[idx] = updated
    persist()
    toastStore.showToast('Trip updated successfully', 'success')
    return true
  }

  function deleteTrip(id: string): boolean {
    const trip = getTripById(id)
    const name = trip ? trip.name : 'Trip'
    trips.value = trips.value.filter(t => t.id !== id)
    persist()
    toastStore.showToast(`Deleted trip "${name}"`, 'info')
    return true
  }

  function addActivity(tripId: string, dayNumber: number, activity: Omit<ItineraryActivity, 'id'>) {
    const trip = getTripById(tripId)
    if (!trip) return false
    const day = trip.itinerary.find(d => d.dayNumber === dayNumber)
    if (!day) return false

    const newActivity: ItineraryActivity = {
      ...activity,
      id: generateUniqueId('act')
    }
    day.activities.push(newActivity)
    trip.updatedAt = new Date().toISOString()
    persist()
    toastStore.showToast(`Added activity "${newActivity.title}"`, 'success')
    return true
  }

  function removeActivity(tripId: string, dayNumber: number, activityId: string) {
    const trip = getTripById(tripId)
    if (!trip) return false
    const day = trip.itinerary.find(d => d.dayNumber === dayNumber)
    if (!day) return false

    day.activities = day.activities.filter(a => a.id !== activityId)
    trip.updatedAt = new Date().toISOString()
    persist()
    toastStore.showToast('Activity removed', 'info')
    return true
  }

  function moveActivity(tripId: string, dayNumber: number, activityIndex: number, direction: 'up' | 'down') {
    const trip = getTripById(tripId)
    if (!trip) return false
    const day = trip.itinerary.find(d => d.dayNumber === dayNumber)
    if (!day) return false

    const targetIndex = direction === 'up' ? activityIndex - 1 : activityIndex + 1
    if (targetIndex < 0 || targetIndex >= day.activities.length) return false

    const [movedItem] = day.activities.splice(activityIndex, 1)
    day.activities.splice(targetIndex, 0, movedItem)
    trip.updatedAt = new Date().toISOString()
    persist()
    return true
  }

  function updateTripBudget(tripId: string, budget: BudgetBreakdown) {
    const trip = getTripById(tripId)
    if (!trip) return false
    trip.budget = { ...budget }
    recalculateTripBudget(trip)
    trip.updatedAt = new Date().toISOString()
    persist()
    toastStore.showToast('Budget updated successfully', 'success')
    return true
  }

  function resetDemoData() {
    trips.value = JSON.parse(JSON.stringify(SAMPLE_TRIPS))
    persist()
    toastStore.showToast('Reset trips to sample demo data', 'info')
  }

  return {
    trips,
    filterStatus,
    sortBy,
    filteredTrips,
    getTripById,
    createTrip,
    updateTrip,
    deleteTrip,
    addActivity,
    removeActivity,
    moveActivity,
    updateTripBudget,
    resetDemoData
  }
})
