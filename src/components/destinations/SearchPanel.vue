<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { MapPin, Mountain, Wallet, Calendar, Search } from 'lucide-vue-next'
import { useDestinationsStore } from '@/stores/destinations'

const router = useRouter()
const destinationsStore = useDestinationsStore()

const searchQuery = ref('')
const selectedTravelType = ref('')
const selectedBudget = ref('')
const selectedDuration = ref('')

const travelTypes = [
  'Mountains',
  'Beaches',
  'Adventure',
  'Culture',
  'Nature',
  'Weekend Getaway'
]

const budgetOptions = [
  { value: 'under-5000', label: 'Under ₹5,000' },
  { value: '5000-10000', label: '₹5,000–₹10,000' },
  { value: '10000-20000', label: '₹10,000–₹20,000' },
  { value: '20000-40000', label: '₹20,000–₹40,000' },
  { value: 'above-40000', label: 'Above ₹40,000' }
]

const durationOptions = [
  { value: '1-2-days', label: '1–2 Days' },
  { value: '3-4-days', label: '3–4 Days' },
  { value: '5-7-days', label: '5–7 Days' },
  { value: '8-plus-days', label: '8+ Days' }
]

function handleSearch() {
  if (searchQuery.value) {
    destinationsStore.setFilter('searchQuery', searchQuery.value)
  }
  if (selectedTravelType.value) {
    destinationsStore.setFilter('travelStyle', selectedTravelType.value)
  }
  if (selectedBudget.value) {
    destinationsStore.setFilter('budgetTier', selectedBudget.value)
  }
  if (selectedDuration.value) {
    destinationsStore.setFilter('durationTier', selectedDuration.value)
  }

  router.push({
    path: '/destinations',
    query: {
      q: searchQuery.value || undefined,
      style: selectedTravelType.value || undefined,
      budget: selectedBudget.value || undefined,
      duration: selectedDuration.value || undefined
    }
  })
}
</script>

<template>
  <div class="search-panel-container">
    <form class="search-panel" @submit.prevent="handleSearch">
      <!-- Field 1: Where to? -->
      <div class="search-field">
        <label for="search-where" class="field-label">
          <MapPin :size="15" class="field-icon" />
          <span>Where to?</span>
        </label>
        <input
          id="search-where"
          v-model="searchQuery"
          type="text"
          placeholder="e.g. Manali, Goa, Jaipur..."
          class="field-input"
        />
      </div>

      <div class="field-divider" />

      <!-- Field 2: Travel Type -->
      <div class="search-field">
        <label for="search-type" class="field-label">
          <Mountain :size="15" class="field-icon" />
          <span>Travel Type</span>
        </label>
        <select id="search-type" v-model="selectedTravelType" class="field-select">
          <option value="">All Travel Styles</option>
          <option v-for="type in travelTypes" :key="type" :value="type">
            {{ type }}
          </option>
        </select>
      </div>

      <div class="field-divider" />

      <!-- Field 3: Budget -->
      <div class="search-field">
        <label for="search-budget" class="field-label">
          <Wallet :size="15" class="field-icon" />
          <span>Budget</span>
        </label>
        <select id="search-budget" v-model="selectedBudget" class="field-select">
          <option value="">Any Budget</option>
          <option v-for="opt in budgetOptions" :key="opt.value" :value="opt.value">
            {{ opt.label }}
          </option>
        </select>
      </div>

      <div class="field-divider" />

      <!-- Field 4: Duration -->
      <div class="search-field">
        <label for="search-duration" class="field-label">
          <Calendar :size="15" class="field-icon" />
          <span>Duration</span>
        </label>
        <select id="search-duration" v-model="selectedDuration" class="field-select">
          <option value="">Any Duration</option>
          <option v-for="opt in durationOptions" :key="opt.value" :value="opt.value">
            {{ opt.label }}
          </option>
        </select>
      </div>

      <!-- Submit CTA -->
      <button type="submit" class="search-submit-btn" aria-label="Search destinations">
        <Search :size="18" />
        <span class="btn-text">Explore</span>
      </button>
    </form>
  </div>
</template>

<style scoped>
.search-panel-container {
  width: 100%;
  max-width: 1060px;
  margin: 0 auto;
}

.search-panel {
  background: var(--color-white);
  border-radius: var(--radius-xl);
  padding: 0.75rem 1rem 0.75rem 1.5rem;
  box-shadow: 0 16px 40px rgba(23, 61, 53, 0.16);
  display: flex;
  align-items: center;
  border: 1px solid rgba(23, 61, 53, 0.08);
  gap: 0.5rem;
}

.search-field {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0.35rem 0.6rem;
}

.field-label {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-forest);
  margin-bottom: 0.25rem;
}

.field-icon {
  color: var(--color-terracotta);
}

.field-input,
.field-select {
  border: none;
  background: transparent;
  outline: none;
  font-size: 0.92rem;
  font-weight: 500;
  color: var(--color-text-main);
  padding: 0.15rem 0;
  width: 100%;
}

.field-input::placeholder {
  color: var(--color-text-subtle);
  font-weight: 400;
}

.field-select {
  cursor: pointer;
  appearance: auto;
}

.field-divider {
  width: 1px;
  height: 38px;
  background-color: var(--color-border);
  flex-shrink: 0;
}

.search-submit-btn {
  background-color: var(--color-terracotta);
  color: var(--color-white);
  border: none;
  border-radius: var(--radius-full);
  padding: 0.9rem 1.6rem;
  font-weight: 600;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all var(--transition-fast);
  flex-shrink: 0;
}

.search-submit-btn:hover {
  background-color: var(--color-terracotta-hover);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.search-submit-btn:active {
  transform: scale(0.98);
}

@media (max-width: 900px) {
  .search-panel {
    flex-direction: column;
    align-items: stretch;
    padding: 1.25rem;
    border-radius: var(--radius-lg);
  }

  .field-divider {
    width: 100%;
    height: 1px;
    margin: 0.4rem 0;
  }

  .search-field {
    padding: 0.4rem 0;
  }

  .search-submit-btn {
    margin-top: 0.75rem;
    justify-content: center;
    width: 100%;
  }
}
</style>
