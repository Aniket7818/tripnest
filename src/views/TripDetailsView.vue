<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTripsStore } from '@/stores/trips'
import { useDestinationsStore } from '@/stores/destinations'
import { useToastStore } from '@/stores/toast'
import type { ItineraryActivity, BudgetBreakdown } from '@/types'
import { formatINR, formatDate, getDaysCount } from '@/utils/formatters'
import BudgetCalculator from '@/components/planner/BudgetCalculator.vue'
import ItineraryTimeline from '@/components/planner/ItineraryTimeline.vue'
import ModalDialog from '@/components/ui/ModalDialog.vue'
import {
  Calendar,
  Users,
  MapPin,
  Printer,
  Trash2,
  Edit3,
  Check,
  ArrowLeft,
  Share2,
  AlertCircle,
  FileText,
  DollarSign
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const tripsStore = useTripsStore()
const destinationsStore = useDestinationsStore()
const toastStore = useToastStore()

const tripId = computed(() => String(route.params.id || ''))
const trip = computed(() => tripsStore.getTripById(tripId.value))

const isEditing = ref(false)
const isDeleteModalOpen = ref(false)

// Local edit fields for trip overview
const editName = ref('')
const editNotes = ref('')

function startEditing() {
  if (!trip.value) return
  editName.value = trip.value.name
  editNotes.value = trip.value.notes || ''
  isEditing.value = true
}

function saveEditing() {
  if (!trip.value) return
  tripsStore.updateTrip(trip.value.id, {
    name: editName.value.trim() || trip.value.name,
    notes: editNotes.value.trim()
  })
  isEditing.value = false
}

function cancelEditing() {
  isEditing.value = false
}

function handlePrint() {
  window.print()
}

function handleDelete() {
  if (trip.value) {
    tripsStore.deleteTrip(trip.value.id)
    router.push('/my-trips')
  }
}

// Activity Handlers
function handleAddActivity(dayNumber: number, act: Omit<ItineraryActivity, 'id'>) {
  if (trip.value) {
    tripsStore.addActivity(trip.value.id, dayNumber, act)
  }
}

function handleRemoveActivity(dayNumber: number, actId: string) {
  if (trip.value) {
    tripsStore.removeActivity(trip.value.id, dayNumber, actId)
  }
}

function handleMoveActivity(dayNumber: number, index: number, direction: 'up' | 'down') {
  if (trip.value) {
    tripsStore.moveActivity(trip.value.id, dayNumber, index, direction)
  }
}

function handleUpdateBudget(newBudget: BudgetBreakdown) {
  if (trip.value) {
    tripsStore.updateTripBudget(trip.value.id, newBudget)
  }
}

const daysCount = computed(() => {
  if (!trip.value) return 0
  return getDaysCount(trip.value.startDate, trip.value.endDate)
})
</script>

<template>
  <div v-if="trip" class="trip-details-view">
    <!-- Action Top Bar (Hidden in Print) -->
    <div class="top-nav-bar no-print">
      <div class="container top-nav-inner">
        <RouterLink to="/my-trips" class="back-link">
          <ArrowLeft :size="16" />
          <span>Back to All Trips</span>
        </RouterLink>

        <div class="action-buttons">
          <button
            type="button"
            class="btn btn-outline btn-sm print-action-btn"
            title="Print or Save Itinerary as PDF"
            @click="handlePrint"
          >
            <Printer :size="15" />
            <span>Print Itinerary</span>
          </button>

          <button
            v-if="!isEditing"
            type="button"
            class="btn btn-subtle btn-sm"
            @click="startEditing"
          >
            <Edit3 :size="15" />
            <span>Edit Trip Info</span>
          </button>
          <div v-else class="editing-controls">
            <button
              type="button"
              class="btn btn-subtle btn-sm"
              @click="cancelEditing"
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-primary btn-sm"
              @click="saveEditing"
            >
              <Check :size="15" />
              <span>Save</span>
            </button>
          </div>

          <button
            type="button"
            class="btn btn-outline btn-sm delete-btn"
            title="Delete Itinerary"
            @click="isDeleteModalOpen = true"
          >
            <Trash2 :size="15" />
          </button>
        </div>
      </div>
    </div>

    <!-- Printable Header Banner -->
    <header class="trip-header">
      <div class="container">
        <div class="trip-header-card">
          <div class="header-media-wrap">
            <img
              :src="trip.coverImage || 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80'"
              :alt="trip.name"
              class="header-img"
            />
            <div class="header-overlay" />
            <div class="header-overlay-content">
              <span class="badge badge-white">{{ trip.travelStyle }}</span>
              <div v-if="!isEditing" class="title-display">
                <h1 class="trip-main-title">{{ trip.name }}</h1>
              </div>
              <div v-else class="title-edit-wrap">
                <input
                  v-model="editName"
                  type="text"
                  class="edit-name-input"
                  placeholder="Trip name"
                />
              </div>
            </div>
          </div>

          <!-- Quick Parameters Row -->
          <div class="trip-meta-bar">
            <div class="meta-cell">
              <MapPin :size="16" class="cell-icon" />
              <div>
                <span class="cell-label">Destinations</span>
                <strong>{{ trip.destinationNames.join(', ') }}</strong>
              </div>
            </div>

            <div class="meta-cell">
              <Calendar :size="16" class="cell-icon" />
              <div>
                <span class="cell-label">Travel Dates</span>
                <strong>{{ formatDate(trip.startDate) }} – {{ formatDate(trip.endDate) }} ({{ daysCount }} Days)</strong>
              </div>
            </div>

            <div class="meta-cell">
              <Users :size="16" class="cell-icon" />
              <div>
                <span class="cell-label">Travelers</span>
                <strong>{{ trip.travelersCount }} {{ trip.travelersCount === 1 ? 'Person' : 'People' }}</strong>
              </div>
            </div>

            <div class="meta-cell budget-cell">
              <span class="cell-label">Total Estimated Budget</span>
              <strong class="cell-val-accent">{{ formatINR(trip.totalBudget) }}</strong>
              <span class="cell-sub">({{ formatINR(trip.costPerPerson) }} / person)</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content Tabs / Sections -->
    <main class="container trip-main-content">
      <!-- 1. Day-Wise Itinerary Section -->
      <section class="trip-section itinerary-section">
        <div class="section-title-wrap">
          <Calendar :size="22" class="sec-icon" />
          <h2>Day-by-Day Itinerary</h2>
        </div>

        <ItineraryTimeline
          :days="trip.itinerary"
          :editable="true"
          @add-activity="handleAddActivity"
          @remove-activity="handleRemoveActivity"
          @move-activity="handleMoveActivity"
        />
      </section>

      <!-- 2. Budget Breakdown Section -->
      <section class="trip-section budget-section">
        <div class="section-title-wrap">
          <DollarSign :size="22" class="sec-icon" />
          <h2>Estimated Budget Breakdown</h2>
        </div>

        <div class="budget-box card">
          <BudgetCalculator
            :model-value="trip.budget"
            :travelers-count="trip.travelersCount"
            :read-only="false"
            @update:model-value="handleUpdateBudget"
          />
        </div>
      </section>

      <!-- 3. Travel Notes Section -->
      <section class="trip-section notes-section">
        <div class="section-title-wrap">
          <FileText :size="22" class="sec-icon" />
          <h2>Travel Notes & Reminders</h2>
        </div>

        <div class="notes-card card">
          <div v-if="!isEditing" class="notes-content">
            <p v-if="trip.notes">{{ trip.notes }}</p>
            <p v-else class="notes-placeholder">No specific travel notes added yet. Click "Edit Trip Info" above to jot down gear checklists or flight details.</p>
          </div>
          <div v-else class="notes-edit-wrap">
            <textarea
              v-model="editNotes"
              rows="4"
              class="form-textarea"
              placeholder="Jot down booking confirmation IDs, packing reminders, or local contact details..."
            />
          </div>
        </div>
      </section>
    </main>

    <!-- Delete Confirmation Modal -->
    <ModalDialog
      :is-open="isDeleteModalOpen"
      title="Delete Trip Itinerary?"
      max-width="440px"
      @close="isDeleteModalOpen = false"
    >
      <div class="delete-box">
        <AlertCircle :size="30" class="del-icon" />
        <p>Are you sure you want to delete this trip itinerary? All day activities and budget data will be removed.</p>
      </div>
      <template #footer>
        <button type="button" class="btn btn-subtle" @click="isDeleteModalOpen = false">
          Cancel
        </button>
        <button type="button" class="btn btn-accent" @click="handleDelete">
          Delete Trip
        </button>
      </template>
    </ModalDialog>
  </div>

  <!-- Fallback if Trip Not Found -->
  <div v-else class="container not-found-box">
    <h2>Trip Not Found</h2>
    <p>We could not find the trip you requested. It may have been deleted or never existed.</p>
    <RouterLink to="/my-trips" class="btn btn-primary">
      Back to My Trips
    </RouterLink>
  </div>
</template>

<style scoped>
.trip-details-view {
  min-height: 85vh;
  padding-bottom: 5rem;
}

.top-nav-bar {
  background: var(--color-white);
  border-bottom: 1px solid var(--color-border);
  padding: 0.85rem 0;
  position: sticky;
  top: var(--nav-height);
  z-index: 50;
}

.top-nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-forest);
  transition: color var(--transition-fast);
}

.back-link:hover {
  color: var(--color-terracotta);
}

.action-buttons {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.editing-controls {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.trip-header {
  padding-top: 2rem;
  margin-bottom: 2.5rem;
}

.trip-header-card {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.header-media-wrap {
  position: relative;
  width: 100%;
  height: 280px;
}

.header-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.header-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(23, 61, 53, 0.9) 0%,
    rgba(23, 61, 53, 0.3) 60%,
    rgba(23, 61, 53, 0.1) 100%
  );
}

.header-overlay-content {
  position: absolute;
  inset: 0;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 0.6rem;
}

.trip-main-title {
  color: var(--color-white);
  font-size: clamp(2rem, 4vw, 2.8rem);
  margin: 0;
}

.edit-name-input {
  width: 100%;
  padding: 0.5rem 1rem;
  font-size: 1.8rem;
  font-weight: 700;
  border-radius: var(--radius-md);
  border: 2px solid var(--color-terracotta);
  background: rgba(255, 255, 255, 0.95);
  color: var(--color-forest);
}

.trip-meta-bar {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  padding: 1.5rem 2rem;
  background-color: var(--color-surface);
  border-top: 1px solid var(--color-border);
}

.meta-cell {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.cell-icon {
  color: var(--color-primary);
  margin-top: 2px;
  flex-shrink: 0;
}

.cell-label {
  display: block;
  font-size: 0.72rem;
  text-transform: uppercase;
  color: var(--color-text-muted);
  letter-spacing: 0.05em;
}

.cell-val-accent {
  font-size: 1.35rem;
  color: var(--color-forest);
}

.cell-sub {
  display: block;
  font-size: 0.78rem;
  color: var(--color-text-muted);
}

.trip-main-content {
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
}

.section-title-wrap {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin-bottom: 1.5rem;
}

.sec-icon {
  color: var(--color-terracotta);
}

.section-title-wrap h2 {
  font-size: 1.7rem;
  margin: 0;
}

.budget-box,
.notes-card {
  padding: 2rem;
}

.notes-content p {
  font-size: 0.96rem;
  line-height: 1.6;
  color: var(--color-text-main);
  margin: 0;
}

.notes-placeholder {
  color: var(--color-text-muted) !important;
  font-style: italic;
}

.delete-box {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 0.5rem 0;
}

.del-icon {
  color: var(--color-danger);
  flex-shrink: 0;
}

.not-found-box {
  padding: 6rem 1.5rem;
  text-align: center;
}

@media (max-width: 768px) {
  .trip-meta-bar {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 1.25rem 1rem;
  }

  .header-overlay-content {
    padding: 1.25rem 1rem;
  }

  .budget-box,
  .notes-card {
    padding: 1.25rem 1rem;
  }
}

@media (max-width: 640px) {
  .trip-details-view {
    padding-bottom: 2.5rem;
  }

  .top-nav-inner {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .action-buttons {
    width: 100%;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .trip-header {
    padding-top: 1.25rem;
    margin-bottom: 1.5rem;
  }

  .trip-main-content {
    gap: 2.25rem;
  }
}
</style>
