<script setup lang="ts">
import { ref } from 'vue'
import { useTripsStore } from '@/stores/trips'
import TripCard from '@/components/trips/TripCard.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import ModalDialog from '@/components/ui/ModalDialog.vue'
import { Plus, RotateCcw, Calendar, ArrowUpDown, AlertCircle } from 'lucide-vue-next'

const tripsStore = useTripsStore()

// Deletion confirmation modal
const isDeleteModalOpen = ref(false)
const tripToDeleteId = ref<string | null>(null)

function confirmDelete(id: string) {
  tripToDeleteId.value = id
  isDeleteModalOpen.value = true
}

function executeDelete() {
  if (tripToDeleteId.value) {
    tripsStore.deleteTrip(tripToDeleteId.value)
    tripToDeleteId.value = null
  }
  isDeleteModalOpen.value = false
}
</script>

<template>
  <div class="my-trips-view">
    <header class="trips-hero">
      <div class="container hero-inner">
        <div class="hero-left">
          <span class="text-eyebrow">YOUR JOURNEYS</span>
          <h1 class="page-title">My Saved Trips</h1>
          <p class="page-subtitle">Manage your customized travel itineraries, schedules, and budgets.</p>
        </div>
        <div class="hero-actions">
          <button
            type="button"
            class="btn btn-subtle btn-sm"
            title="Restore sample demo itineraries"
            @click="tripsStore.resetDemoData"
          >
            <RotateCcw :size="15" />
            <span>Reset Demo Data</span>
          </button>
          <RouterLink to="/plan" class="btn btn-primary">
            <Plus :size="16" />
            <span>Plan New Trip</span>
          </RouterLink>
        </div>
      </div>
    </header>

    <main class="container trips-content">
      <!-- Filter & Sort Toolbar -->
      <div class="trips-toolbar">
        <div class="status-tabs">
          <button
            type="button"
            :class="['tab-btn', { 'is-active': tripsStore.filterStatus === 'all' }]"
            @click="tripsStore.filterStatus = 'all'"
          >
            All ({{ tripsStore.trips.length }})
          </button>
          <button
            type="button"
            :class="['tab-btn', { 'is-active': tripsStore.filterStatus === 'upcoming' }]"
            @click="tripsStore.filterStatus = 'upcoming'"
          >
            Upcoming
          </button>
          <button
            type="button"
            :class="['tab-btn', { 'is-active': tripsStore.filterStatus === 'past' }]"
            @click="tripsStore.filterStatus = 'past'"
          >
            Past
          </button>
        </div>

        <div class="sort-box">
          <label for="trip-sort" class="sort-label">
            <ArrowUpDown :size="14" />
            <span>Sort by:</span>
          </label>
          <select
            id="trip-sort"
            v-model="tripsStore.sortBy"
            class="sort-select"
          >
            <option value="created-desc">Recently Created</option>
            <option value="date-asc">Earliest Start Date</option>
            <option value="budget-asc">Budget: Low to High</option>
            <option value="budget-desc">Budget: High to Low</option>
          </select>
        </div>
      </div>

      <!-- Trips Grid -->
      <div v-if="tripsStore.filteredTrips.length > 0" class="trips-grid">
        <TripCard
          v-for="trip in tripsStore.filteredTrips"
          :key="trip.id"
          :trip="trip"
          @delete="confirmDelete"
        />
      </div>

      <!-- Empty State -->
      <EmptyState
        v-else
        title="No saved trips found"
        description="You have not created any trips under this filter yet. Start building your custom day-wise itinerary now."
        action-text="Plan Your First Trip"
        action-route="/plan"
      />
    </main>

    <!-- Delete Confirmation Modal -->
    <ModalDialog
      :is-open="isDeleteModalOpen"
      title="Delete Trip Itinerary?"
      max-width="440px"
      @close="isDeleteModalOpen = false"
    >
      <div class="delete-confirm-body">
        <div class="alert-icon-wrap">
          <AlertCircle :size="28" class="alert-icon" />
        </div>
        <p>
          Are you sure you want to delete this trip itinerary? This action will remove the saved day-wise activities and expense breakdown from your local storage.
        </p>
      </div>

      <template #footer>
        <button
          type="button"
          class="btn btn-subtle"
          @click="isDeleteModalOpen = false"
        >
          Cancel
        </button>
        <button
          type="button"
          class="btn btn-accent"
          @click="executeDelete"
        >
          Yes, Delete Trip
        </button>
      </template>
    </ModalDialog>
  </div>
</template>

<style scoped>
.my-trips-view {
  min-height: 85vh;
  padding-bottom: 5rem;
}

.trips-hero {
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  padding: 3.5rem 0 2.5rem;
  margin-bottom: 2.5rem;
}

.hero-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.page-title {
  margin-top: 0.35rem;
  margin-bottom: 0.4rem;
}

.page-subtitle {
  font-size: 1.05rem;
  color: var(--color-text-muted);
}

.trips-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 1.25rem;
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  margin-bottom: 2rem;
  box-shadow: var(--shadow-sm);
  flex-wrap: wrap;
  gap: 1rem;
}

.status-tabs {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.tab-btn {
  padding: 0.4rem 1rem;
  border-radius: var(--radius-full);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-text-muted);
  transition: all var(--transition-fast);
}

.tab-btn:hover {
  background-color: var(--color-beige);
  color: var(--color-forest);
}

.tab-btn.is-active {
  background-color: var(--color-forest);
  color: var(--color-white);
}

.sort-box {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.sort-label {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-text-muted);
}

.sort-select {
  border: 1px solid var(--color-border);
  padding: 0.4rem 0.75rem;
  border-radius: var(--radius-sm);
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--color-forest);
  outline: none;
}

.trips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr));
  gap: 2rem;
  width: 100%;
}

@media (max-width: 640px) {
  .hero-inner {
    flex-direction: column;
    align-items: flex-start;
  }

  .trips-toolbar {
    flex-direction: column;
    align-items: stretch;
    padding: 0.85rem 1rem;
    gap: 0.85rem;
  }

  .status-tabs {
    width: 100%;
    overflow-x: auto;
    padding-bottom: 0.2rem;
    -webkit-overflow-scrolling: touch;
  }

  .sort-box {
    width: 100%;
    justify-content: space-between;
  }

  .sort-select {
    flex: 1;
  }

  .trips-grid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
}

.delete-confirm-body {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 0.5rem 0;
}

.alert-icon-wrap {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--color-danger-bg);
  color: var(--color-danger);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.delete-confirm-body p {
  font-size: 0.95rem;
  line-height: 1.5;
  color: var(--color-text-main);
  margin: 0;
}

@media (max-width: 640px) {
  .hero-inner {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
