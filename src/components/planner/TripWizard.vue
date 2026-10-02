<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useDestinationsStore } from '@/stores/destinations'
import { useTripsStore } from '@/stores/trips'
import { useToastStore } from '@/stores/toast'
import type { Trip, TravelStyle, BudgetBreakdown, ItineraryDay, ItineraryActivity } from '@/types'
import { formatINR, formatDate, getDaysCount } from '@/utils/formatters'
import StepIndicator from '@/components/ui/StepIndicator.vue'
import BudgetCalculator from './BudgetCalculator.vue'
import ItineraryTimeline from './ItineraryTimeline.vue'
import {
  Search,
  Check,
  X,
  MapPin,
  Calendar,
  Users,
  Compass,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Info
} from 'lucide-vue-next'

const props = defineProps<{
  initialDestinationSlug?: string
}>()

const router = useRouter()
const destinationsStore = useDestinationsStore()
const tripsStore = useTripsStore()
const toastStore = useToastStore()

const currentStep = ref(1)

const wizardSteps = [
  { number: 1, title: 'Destination', subtitle: 'Where to go' },
  { number: 2, title: 'Trip Details', subtitle: 'Dates & Travelers' },
  { number: 3, title: 'Budget Plan', subtitle: 'Expense Estimator' },
  { number: 4, title: 'Itinerary', subtitle: 'Day-by-Day Schedule' },
  { number: 5, title: 'Review & Save', subtitle: 'Confirm Plan' }
]

// Step 1: Destination Selection
const destinationSearch = ref('')
const selectedDestinationIds = ref<string[]>([])

// If initialDestinationSlug passed in query, pre-select it
watch(
  () => props.initialDestinationSlug,
  (slug) => {
    if (slug) {
      const found = destinationsStore.getDestinationBySlug(slug)
      if (found && !selectedDestinationIds.value.includes(found.id)) {
        selectedDestinationIds.value.push(found.id)
      }
    }
  },
  { immediate: true }
)

const filteredDestinationsList = computed(() => {
  if (!destinationSearch.value.trim()) return destinationsStore.destinations
  const q = destinationSearch.value.toLowerCase().trim()
  return destinationsStore.destinations.filter(
    d => d.name.toLowerCase().includes(q) || d.state.toLowerCase().includes(q)
  )
})

const selectedDestinations = computed(() => {
  return selectedDestinationIds.value
    .map(id => destinationsStore.getDestinationById(id))
    .filter((d): d is NonNullable<typeof d> => d !== undefined)
})

function toggleDestination(destId: string) {
  if (selectedDestinationIds.value.includes(destId)) {
    selectedDestinationIds.value = selectedDestinationIds.value.filter(id => id !== destId)
  } else {
    selectedDestinationIds.value.push(destId)
  }
}

// Step 2: Trip Details
const tripName = ref('')
// Default dates: tomorrow to +4 days
const today = new Date()
const defaultStart = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
const defaultEnd = new Date(today.getTime() + 11 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]

const startDate = ref(defaultStart)
const endDate = ref(defaultEnd)
const travelersCount = ref(2)
const startingCity = ref('New Delhi')
const travelStyle = ref<TravelStyle>('Mountains')

// Auto-fill trip name when destinations change if empty
watch(
  selectedDestinations,
  (dests) => {
    if (dests.length > 0 && !tripName.value) {
      tripName.value = `${dests.map(d => d.name).join(' & ')} Getaway`
    }
  },
  { deep: true }
)

const durationDays = computed(() => {
  return getDaysCount(startDate.value, endDate.value)
})

// Step 3: Budget Breakdown
const budgetBreakdown = ref<BudgetBreakdown>({
  transportation: 8000,
  accommodation: 14000,
  food: 8000,
  activities: 5000,
  miscellaneous: 2000
})

// Step 4: Day-wise Itinerary
const itineraryDays = ref<ItineraryDay[]>([])

function buildDefaultItinerary() {
  const count = durationDays.value
  const newDays: ItineraryDay[] = []

  // Check if first selected destination has a sample itinerary
  const primaryDest = selectedDestinations.value[0]

  for (let i = 1; i <= count; i++) {
    // Generate date string
    const d = new Date(startDate.value)
    d.setDate(d.getDate() + (i - 1))
    const formattedDate = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

    // Check if sample itinerary matches this day
    const sampleDay = primaryDest?.sampleItinerary?.find(s => s.day === i)

    const activities: ItineraryActivity[] = []
    if (sampleDay) {
      sampleDay.items.forEach((item, idx) => {
        activities.push({
          id: `act-${i}-${idx}-${Date.now()}`,
          title: item.title,
          description: item.description,
          location: item.place,
          timeOfDay: item.timeOfDay,
          estimatedCost: idx === 0 ? 300 : idx === 1 ? 800 : 1200
        })
      })
    }

    newDays.push({
      dayNumber: i,
      date: formattedDate,
      theme: sampleDay?.title || `Day ${i} Discovery`,
      activities
    })
  }

  itineraryDays.value = newDays
}

// When duration days change, rebuild itinerary if count mismatch
watch(
  durationDays,
  (newCount) => {
    if (itineraryDays.value.length !== newCount) {
      buildDefaultItinerary()
    }
  },
  { immediate: true }
)

function handleAddActivity(dayNumber: number, act: Omit<ItineraryActivity, 'id'>) {
  const day = itineraryDays.value.find(d => d.dayNumber === dayNumber)
  if (day) {
    day.activities.push({
      ...act,
      id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`
    })
    toastStore.showToast(`Activity "${act.title}" added to Day ${dayNumber}`, 'success')
  }
}

function handleRemoveActivity(dayNumber: number, actId: string) {
  const day = itineraryDays.value.find(d => d.dayNumber === dayNumber)
  if (day) {
    day.activities = day.activities.filter(a => a.id !== actId)
    toastStore.showToast('Activity removed', 'info')
  }
}

function handleMoveActivity(dayNumber: number, index: number, direction: 'up' | 'down') {
  const day = itineraryDays.value.find(d => d.dayNumber === dayNumber)
  if (day) {
    const target = direction === 'up' ? index - 1 : index + 1
    if (target >= 0 && target < day.activities.length) {
      const [moved] = day.activities.splice(index, 1)
      day.activities.splice(target, 0, moved)
    }
  }
}

function handleUpdateDayTheme(dayNumber: number, theme: string) {
  const day = itineraryDays.value.find(d => d.dayNumber === dayNumber)
  if (day) {
    day.theme = theme
  }
}

// Navigation & Validation
const stepErrors = ref<string[]>([])

function validateCurrentStep(): boolean {
  stepErrors.value = []

  if (currentStep.value === 1) {
    if (selectedDestinationIds.value.length === 0) {
      stepErrors.value.push('Please select at least one destination to proceed.')
      return false
    }
  } else if (currentStep.value === 2) {
    if (!tripName.value.trim()) {
      stepErrors.value.push('Trip name is required.')
    }
    if (!startDate.value || !endDate.value) {
      stepErrors.value.push('Both start date and end date are required.')
    } else if (endDate.value < startDate.value) {
      stepErrors.value.push('End date cannot be earlier than start date.')
    }
    if (travelersCount.value < 1) {
      stepErrors.value.push('Number of travelers must be at least 1.')
    }
    if (stepErrors.value.length > 0) return false
  }

  return true
}

function nextStep() {
  if (validateCurrentStep()) {
    if (currentStep.value === 2 && itineraryDays.value.length === 0) {
      buildDefaultItinerary()
    }
    currentStep.value++
    window.scrollTo({ top: 120, behavior: 'smooth' })
  }
}

function prevStep() {
  if (currentStep.value > 1) {
    currentStep.value--
    window.scrollTo({ top: 120, behavior: 'smooth' })
  }
}

function goToStep(stepNum: number) {
  if (stepNum < currentStep.value) {
    currentStep.value = stepNum
  }
}

// Save Trip
const isSaving = ref(false)

function handleSaveTrip() {
  isSaving.value = true

  const primaryDest = selectedDestinations.value[0]

  const total =
    Number(budgetBreakdown.value.transportation) +
    Number(budgetBreakdown.value.accommodation) +
    Number(budgetBreakdown.value.food) +
    Number(budgetBreakdown.value.activities) +
    Number(budgetBreakdown.value.miscellaneous)

  const createdTrip = tripsStore.createTrip({
    name: tripName.value.trim() || 'My Dream Itinerary',
    destinationIds: selectedDestinationIds.value,
    destinationNames: selectedDestinations.value.map(d => d.name),
    coverImage: primaryDest?.coverImage || 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
    startDate: startDate.value,
    endDate: endDate.value,
    travelersCount: travelersCount.value,
    travelStyle: travelStyle.value,
    startingCity: startingCity.value,
    budget: { ...budgetBreakdown.value },
    totalBudget: total,
    costPerPerson: Math.round(total / (travelersCount.value || 1)),
    itinerary: JSON.parse(JSON.stringify(itineraryDays.value)),
    notes: `Planned via TripNest Planner for ${travelersCount.value} travelers.`,
    status: 'upcoming'
  })

  // Navigate to saved trip page
  setTimeout(() => {
    isSaving.value = false
    router.push(`/my-trips/${createdTrip.id}`)
  }, 400)
}
</script>

<template>
  <div class="trip-wizard">
    <!-- Stepper Indicator -->
    <StepIndicator
      :current-step="currentStep"
      :steps="wizardSteps"
      @select-step="goToStep"
    />

    <!-- Errors banner -->
    <div v-if="stepErrors.length > 0" class="step-errors-banner">
      <Info :size="18" />
      <div class="errors-content">
        <p v-for="err in stepErrors" :key="err">{{ err }}</p>
      </div>
    </div>

    <!-- STEP 1: CHOOSE DESTINATION -->
    <section v-if="currentStep === 1" class="wizard-step step-destinations">
      <div class="step-intro">
        <h2>Where do you want to escape?</h2>
        <p>Pick one or more inspiring destinations for your upcoming journey.</p>
      </div>

      <!-- Search Filter bar -->
      <div class="dest-search-bar">
        <Search :size="18" class="search-icon" />
        <input
          v-model="destinationSearch"
          type="text"
          placeholder="Search by destination name or state (e.g. Manali, Goa, Rajasthan)..."
          class="dest-search-input"
        />
        <button
          v-if="destinationSearch"
          type="button"
          class="clear-search-btn"
          @click="destinationSearch = ''"
        >
          <X :size="14" />
        </button>
      </div>

      <!-- Selected Destinations Summary Bar -->
      <div v-if="selectedDestinations.length > 0" class="selected-pill-bar">
        <span class="pill-label">Selected ({{ selectedDestinations.length }}):</span>
        <div class="pills-list">
          <div
            v-for="dest in selectedDestinations"
            :key="dest.id"
            class="selected-dest-pill"
          >
            <MapPin :size="13" />
            <span>{{ dest.name }}</span>
            <button
              type="button"
              class="remove-pill-btn"
              title="Remove"
              @click="toggleDestination(dest.id)"
            >
              <X :size="12" />
            </button>
          </div>
        </div>
      </div>

      <!-- Destinations Grid -->
      <div class="dest-select-grid">
        <div
          v-for="dest in filteredDestinationsList"
          :key="dest.id"
          :class="['dest-select-card', { 'is-selected': selectedDestinationIds.includes(dest.id) }]"
          @click="toggleDestination(dest.id)"
        >
          <div class="dest-card-media">
            <img :src="dest.coverImage" :alt="dest.name" loading="lazy" />
            <div class="dest-check-indicator">
              <Check :size="16" stroke-width="3" />
            </div>
            <span class="dest-badge">{{ dest.state }}</span>
          </div>
          <div class="dest-card-info">
            <h4 class="dest-name">{{ dest.name }}</h4>
            <p class="dest-tagline">{{ dest.tagline }}</p>
            <div class="dest-card-bottom">
              <span class="dest-cost">From {{ formatINR(dest.estimatedBudget) }}</span>
              <span class="dest-time">{{ dest.idealDurationText }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- STEP 2: TRIP DETAILS -->
    <section v-if="currentStep === 2" class="wizard-step step-details">
      <div class="step-intro">
        <h2>Trip Parameters & Details</h2>
        <p>Define your travel dates, companion group size, and preferred vibe.</p>
      </div>

      <div class="details-form-card">
        <div class="form-group">
          <label class="form-label" for="trip-name">Trip Name *</label>
          <input
            id="trip-name"
            v-model="tripName"
            type="text"
            placeholder="e.g. Himalayan Monsoons & River Retreat"
            class="form-input"
            required
          />
        </div>

        <div class="form-grid-2">
          <div class="form-group">
            <label class="form-label" for="start-date">Start Date *</label>
            <input
              id="start-date"
              v-model="startDate"
              type="date"
              class="form-input"
              required
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="end-date">End Date *</label>
            <input
              id="end-date"
              v-model="endDate"
              type="date"
              class="form-input"
              required
            />
          </div>
        </div>

        <div class="duration-highlight-bar">
          <Calendar :size="18" class="duration-icon" />
          <span>Trip Duration: <strong>{{ durationDays }} Days</strong> ({{ formatDate(startDate) }} – {{ formatDate(endDate) }})</span>
        </div>

        <div class="form-grid-2">
          <div class="form-group">
            <label class="form-label" for="travelers-count">Number of Travelers *</label>
            <div class="travelers-stepper">
              <button
                type="button"
                class="stepper-btn"
                :disabled="travelersCount <= 1"
                @click="travelersCount = Math.max(1, travelersCount - 1)"
              >
                -
              </button>
              <input
                id="travelers-count"
                v-model.number="travelersCount"
                type="number"
                min="1"
                class="stepper-input"
              />
              <button
                type="button"
                class="stepper-btn"
                @click="travelersCount++"
              >
                +
              </button>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label" for="travel-style">Travel Style</label>
            <select id="travel-style" v-model="travelStyle" class="form-select">
              <option value="Mountains">Mountain & Alpine</option>
              <option value="Beaches">Beach & Coastal</option>
              <option value="Adventure">Adventure & Trekking</option>
              <option value="Culture">Heritage & Palaces</option>
              <option value="Nature">Nature & Wildlife</option>
              <option value="Weekend Getaway">Weekend Quick Getaway</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" for="starting-city">Starting City / Origin (Optional)</label>
          <input
            id="starting-city"
            v-model="startingCity"
            type="text"
            placeholder="e.g. New Delhi, Mumbai, Bengaluru..."
            class="form-input"
          />
        </div>
      </div>
    </section>

    <!-- STEP 3: BUDGET PLANNING -->
    <section v-if="currentStep === 3" class="wizard-step step-budget">
      <div class="step-intro">
        <h2>Expense & Budget Estimator</h2>
        <p>Plan and customize your estimated costs across five essential travel categories.</p>
      </div>

      <BudgetCalculator
        v-model="budgetBreakdown"
        :travelers-count="travelersCount"
      />
    </section>

    <!-- STEP 4: ITINERARY BUILDER -->
    <section v-if="currentStep === 4" class="wizard-step step-itinerary">
      <div class="step-intro">
        <h2>Day-by-Day Itinerary Builder</h2>
        <p>Organize morning, afternoon, and evening experiences for each day of your {{ durationDays }}-day trip.</p>
      </div>

      <div class="itinerary-actions-header">
        <button
          type="button"
          class="btn btn-subtle btn-sm"
          @click="buildDefaultItinerary"
        >
          <Sparkles :size="14" />
          <span>Reload Curated Recommendations</span>
        </button>
      </div>

      <ItineraryTimeline
        :days="itineraryDays"
        :editable="true"
        @add-activity="handleAddActivity"
        @remove-activity="handleRemoveActivity"
        @move-activity="handleMoveActivity"
        @update-day-theme="handleUpdateDayTheme"
      />
    </section>

    <!-- STEP 5: REVIEW AND SAVE -->
    <section v-if="currentStep === 5" class="wizard-step step-review">
      <div class="step-intro">
        <h2>Review Your Trip Blueprint</h2>
        <p>Verify your destinations, dates, budget breakdown, and activities before saving.</p>
      </div>

      <div class="review-grid">
        <!-- Left summary column -->
        <div class="review-card trip-overview-review">
          <div class="review-cover-wrap">
            <img
              :src="selectedDestinations[0]?.coverImage || 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80'"
              :alt="tripName"
              class="review-cover-img"
            />
            <div class="review-cover-overlay">
              <span class="badge badge-white">{{ travelStyle }}</span>
              <h3 class="review-trip-name">{{ tripName }}</h3>
            </div>
          </div>

          <div class="review-body">
            <div class="review-meta-row">
              <div class="review-meta-item">
                <Calendar :size="16" class="rev-icon" />
                <div>
                  <span class="rev-label">Dates & Duration</span>
                  <strong>{{ formatDate(startDate) }} – {{ formatDate(endDate) }} ({{ durationDays }} Days)</strong>
                </div>
              </div>

              <div class="review-meta-item">
                <Users :size="16" class="rev-icon" />
                <div>
                  <span class="rev-label">Travelers</span>
                  <strong>{{ travelersCount }} {{ travelersCount === 1 ? 'Traveler' : 'Travelers' }}</strong>
                </div>
              </div>

              <div class="review-meta-item">
                <MapPin :size="16" class="rev-icon" />
                <div>
                  <span class="rev-label">Destinations</span>
                  <strong>{{ selectedDestinations.map(d => d.name).join(', ') }}</strong>
                </div>
              </div>
            </div>

            <!-- Budget review section -->
            <div class="review-budget-box">
              <div class="rev-budget-top">
                <span>Total Estimated Budget</span>
                <h3>{{ formatINR(budgetBreakdown.transportation + budgetBreakdown.accommodation + budgetBreakdown.food + budgetBreakdown.activities + budgetBreakdown.miscellaneous) }}</h3>
              </div>
              <div class="rev-budget-person">
                <span>Cost Per Traveler:</span>
                <strong>{{ formatINR(Math.round((budgetBreakdown.transportation + budgetBreakdown.accommodation + budgetBreakdown.food + budgetBreakdown.activities + budgetBreakdown.miscellaneous) / travelersCount)) }}</strong>
              </div>
            </div>

            <!-- Demo statement -->
            <div class="demo-statement">
              <Info :size="16" class="info-icon" />
              <p>This is a frontend demonstration project. Saving this trip stores your itinerary locally in your browser. No live bookings or payments are processed.</p>
            </div>
          </div>
        </div>

        <!-- Right itinerary preview column -->
        <div class="review-card review-itinerary-box">
          <h3 class="review-section-title">Day-wise Schedule Preview</h3>
          <div class="preview-days-list">
            <div
              v-for="day in itineraryDays"
              :key="day.dayNumber"
              class="preview-day-item"
            >
              <div class="preview-day-head">
                <span class="badge badge-forest">Day {{ day.dayNumber }}</span>
                <span class="preview-theme">{{ day.theme }}</span>
                <span class="preview-date">{{ day.date }}</span>
              </div>
              <ul v-if="day.activities.length > 0" class="preview-acts-list">
                <li v-for="act in day.activities" :key="act.id">
                  <span class="act-slot-tag">{{ act.timeOfDay }}</span>
                  <span class="act-name">{{ act.title }}</span>
                  <span class="act-cost">{{ formatINR(act.estimatedCost) }}</span>
                </li>
              </ul>
              <p v-else class="preview-empty-day">No activities planned.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Wizard Footer Controls -->
    <div class="wizard-footer-nav">
      <button
        v-if="currentStep > 1"
        type="button"
        class="btn btn-outline"
        @click="prevStep"
      >
        <ArrowLeft :size="16" />
        <span>Back</span>
      </button>

      <div class="nav-right-actions">
        <button
          v-if="currentStep < 5"
          type="button"
          class="btn btn-primary"
          @click="nextStep"
        >
          <span>Continue</span>
          <ArrowRight :size="16" />
        </button>

        <button
          v-else
          type="button"
          class="btn btn-accent btn-lg"
          :disabled="isSaving"
          @click="handleSaveTrip"
        >
          <Sparkles :size="18" />
          <span>{{ isSaving ? 'Saving Trip...' : 'Save My Trip' }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.trip-wizard {
  display: flex;
  flex-direction: column;
  max-width: 1040px;
  margin: 0 auto;
}

.step-intro {
  text-align: center;
  margin-bottom: 2.5rem;
}

.step-intro h2 {
  font-size: 2.1rem;
  color: var(--color-forest);
  margin-bottom: 0.5rem;
}

.step-intro p {
  color: var(--color-text-muted);
  font-size: 1.05rem;
}

.step-errors-banner {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  background-color: var(--color-danger-bg);
  border: 1px solid var(--color-danger);
  color: var(--color-danger);
  padding: 1rem 1.25rem;
  border-radius: var(--radius-md);
  margin-bottom: 1.5rem;
}

.errors-content p {
  color: var(--color-danger);
  font-size: 0.9rem;
  font-weight: 500;
  margin: 0;
}

/* STEP 1: DESTINATIONS */
.dest-search-bar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  padding: 0.75rem 1.25rem;
  box-shadow: var(--shadow-sm);
  margin-bottom: 1.5rem;
}

.search-icon {
  color: var(--color-text-muted);
}

.dest-search-input {
  border: none;
  outline: none;
  background: transparent;
  width: 100%;
  font-size: 0.95rem;
}

.clear-search-btn {
  color: var(--color-text-muted);
  display: flex;
  align-items: center;
}

.selected-pill-bar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
  padding: 0.75rem 1rem;
  background: var(--color-surface);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
}

.pill-label {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-forest);
}

.pills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.selected-dest-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: var(--color-forest);
  color: var(--color-white);
  padding: 0.35rem 0.75rem;
  border-radius: var(--radius-full);
  font-size: 0.82rem;
  font-weight: 600;
}

.remove-pill-btn {
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
}

.remove-pill-btn:hover {
  color: var(--color-white);
}

.dest-select-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.25rem;
}

.dest-select-card {
  background: var(--color-white);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  cursor: pointer;
  transition: all var(--transition-normal);
  display: flex;
  flex-direction: column;
}

.dest-select-card:hover {
  transform: translateY(-4px);
  border-color: var(--color-primary-light);
  box-shadow: var(--shadow-md);
}

.dest-select-card.is-selected {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 4px var(--color-primary-subtle);
}

.dest-card-media {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: var(--color-beige);
}

.dest-card-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.dest-select-card:hover .dest-card-media img {
  transform: scale(1.05);
}

.dest-check-indicator {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
}

.dest-select-card.is-selected .dest-check-indicator {
  background: var(--color-primary);
  color: var(--color-white);
}

.dest-badge {
  position: absolute;
  bottom: 0.75rem;
  left: 0.75rem;
  background: rgba(0, 0, 0, 0.6);
  color: var(--color-white);
  padding: 0.2rem 0.5rem;
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 600;
}

.dest-card-info {
  padding: 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.dest-name {
  font-size: 1.25rem;
  color: var(--color-forest);
  margin-bottom: 0.25rem;
}

.dest-tagline {
  font-size: 0.82rem;
  color: var(--color-text-muted);
  line-height: 1.4;
  margin-bottom: 0.85rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

.dest-card-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid var(--color-border-subtle);
  padding-top: 0.65rem;
  font-size: 0.8rem;
}

.dest-cost {
  font-weight: 700;
  color: var(--color-forest);
}

.dest-time {
  color: var(--color-text-muted);
}

/* STEP 2: DETAILS */
.details-form-card {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 2rem;
  box-shadow: var(--shadow-sm);
  max-width: 760px;
  margin: 0 auto;
}

.form-grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.duration-highlight-bar {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  color: var(--color-forest);
  margin-bottom: 1.25rem;
}

.duration-icon {
  color: var(--color-terracotta);
}

.travelers-stepper {
  display: flex;
  align-items: center;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--color-white);
}

.stepper-btn {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: 700;
  background: var(--color-beige);
  color: var(--color-forest);
}

.stepper-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.stepper-input {
  flex: 1;
  text-align: center;
  border: none;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-forest);
  outline: none;
  width: 50px;
}

/* STEP 4: ITINERARY HEADER */
.itinerary-actions-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1.25rem;
}

/* STEP 5: REVIEW */
.review-grid {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 2rem;
}

.review-card {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.review-cover-wrap {
  position: relative;
  width: 100%;
  height: 220px;
}

.review-cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.review-cover-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(23, 61, 53, 0.85) 0%, rgba(23, 61, 53, 0.1) 70%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.5rem;
  gap: 0.5rem;
}

.review-trip-name {
  color: var(--color-white);
  font-size: 1.6rem;
}

.review-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.review-meta-row {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.review-meta-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.rev-icon {
  color: var(--color-terracotta);
  margin-top: 3px;
}

.rev-label {
  display: block;
  font-size: 0.75rem;
  text-transform: uppercase;
  color: var(--color-text-muted);
  letter-spacing: 0.05em;
}

.review-budget-box {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 1.25rem;
}

.rev-budget-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.rev-budget-top span {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-text-muted);
}

.rev-budget-top h3 {
  font-size: 1.5rem;
  color: var(--color-forest);
}

.rev-budget-person {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.88rem;
  color: var(--color-text-muted);
  border-top: 1px solid var(--color-border-subtle);
  padding-top: 0.5rem;
}

.rev-budget-person strong {
  color: var(--color-primary);
}

.demo-statement {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  background: var(--color-primary-subtle);
  padding: 0.85rem 1rem;
  border-radius: var(--radius-md);
}

.info-icon {
  color: var(--color-primary);
  flex-shrink: 0;
  margin-top: 2px;
}

.demo-statement p {
  font-size: 0.82rem;
  color: var(--color-forest);
  line-height: 1.45;
  margin: 0;
}

.review-itinerary-box {
  padding: 1.5rem;
  max-height: 600px;
  overflow-y: auto;
}

.review-section-title {
  font-size: 1.3rem;
  margin-bottom: 1.25rem;
  color: var(--color-forest);
}

.preview-days-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.preview-day-item {
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-md);
  padding: 0.85rem 1rem;
}

.preview-day-head {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.6rem;
  flex-wrap: wrap;
}

.preview-theme {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--color-forest);
}

.preview-date {
  margin-left: auto;
  font-size: 0.78rem;
  color: var(--color-text-muted);
}

.preview-acts-list {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.preview-acts-list li {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.82rem;
}

.act-slot-tag {
  text-transform: uppercase;
  font-size: 0.68rem;
  font-weight: 700;
  padding: 0.15rem 0.4rem;
  background: var(--color-beige);
  border-radius: var(--radius-sm);
  color: var(--color-text-muted);
}

.act-name {
  flex: 1;
  font-weight: 500;
}

.act-cost {
  color: var(--color-text-muted);
  font-weight: 600;
}

.preview-empty-day {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  font-style: italic;
}

/* WIZARD FOOTER NAVIGATION */
.wizard-footer-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);
}

.nav-right-actions {
  margin-left: auto;
  display: flex;
  gap: 0.75rem;
}

@media (max-width: 900px) {
  .review-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .dest-select-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .details-form-card {
    padding: 1.25rem 1rem;
  }

  .form-grid-2 {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .review-body {
    padding: 1.25rem 1rem;
  }

  .review-itinerary-box {
    padding: 1.25rem 1rem;
  }

  .step-intro {
    margin-bottom: 1.5rem;
  }

  .step-intro h2 {
    font-size: 1.6rem;
  }
}
</style>
