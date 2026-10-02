<script setup lang="ts">
import { useDestinationsStore } from '@/stores/destinations'
import { RotateCcw, Filter } from 'lucide-vue-next'

const destinationsStore = useDestinationsStore()

const travelStyles = [
  'Mountains',
  'Beaches',
  'Adventure',
  'Culture',
  'Nature',
  'City Breaks'
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

const seasonOptions = [
  { value: '', label: 'All Seasons' },
  { value: 'winter', label: 'Winter (Nov – Feb)' },
  { value: 'summer', label: 'Summer (Mar – Jun)' },
  { value: 'monsoon', label: 'Monsoon (Jul – Sep)' }
]
</script>

<template>
  <aside class="filter-sidebar">
    <div class="sidebar-header">
      <div class="header-title">
        <Filter :size="18" class="filter-icon" />
        <h3>Filter Places</h3>
      </div>
      <button
        type="button"
        class="clear-filters-btn"
        title="Reset all filters"
        @click="destinationsStore.resetFilters"
      >
        <RotateCcw :size="14" />
        <span>Reset</span>
      </button>
    </div>

    <!-- Keyword Search -->
    <div class="filter-section">
      <label class="filter-section-title" for="sidebar-search">Search Keyword</label>
      <input
        id="sidebar-search"
        v-model="destinationsStore.filters.searchQuery"
        type="text"
        placeholder="Search by name, state..."
        class="form-input form-input-sm"
      />
    </div>

    <!-- State / Region -->
    <div class="filter-section">
      <label class="filter-section-title" for="sidebar-state">State / Region</label>
      <select
        id="sidebar-state"
        v-model="destinationsStore.filters.state"
        class="form-select form-select-sm"
      >
        <option value="">All Regions</option>
        <option v-for="state in destinationsStore.states" :key="state" :value="state">
          {{ state }}
        </option>
      </select>
    </div>

    <!-- Travel Style -->
    <div class="filter-section">
      <label class="filter-section-title">Travel Style</label>
      <div class="chips-container">
        <button
          type="button"
          :class="['chip-btn', { 'is-active': destinationsStore.filters.travelStyle === '' }]"
          @click="destinationsStore.setFilter('travelStyle', '')"
        >
          All
        </button>
        <button
          v-for="style in travelStyles"
          :key="style"
          type="button"
          :class="['chip-btn', { 'is-active': destinationsStore.filters.travelStyle === style }]"
          @click="destinationsStore.setFilter('travelStyle', destinationsStore.filters.travelStyle === style ? '' : style)"
        >
          {{ style }}
        </button>
      </div>
    </div>

    <!-- Estimated Budget -->
    <div class="filter-section">
      <label class="filter-section-title">Budget Tier</label>
      <div class="radio-options">
        <label class="radio-label">
          <input
            type="radio"
            name="budgetTier"
            value=""
            :checked="destinationsStore.filters.budgetTier === ''"
            @change="destinationsStore.setFilter('budgetTier', '')"
          />
          <span>Any Budget</span>
        </label>
        <label v-for="opt in budgetOptions" :key="opt.value" class="radio-label">
          <input
            type="radio"
            name="budgetTier"
            :value="opt.value"
            :checked="destinationsStore.filters.budgetTier === opt.value"
            @change="destinationsStore.setFilter('budgetTier', opt.value)"
          />
          <span>{{ opt.label }}</span>
        </label>
      </div>
    </div>

    <!-- Trip Duration -->
    <div class="filter-section">
      <label class="filter-section-title">Trip Duration</label>
      <div class="radio-options">
        <label class="radio-label">
          <input
            type="radio"
            name="durationTier"
            value=""
            :checked="destinationsStore.filters.durationTier === ''"
            @change="destinationsStore.setFilter('durationTier', '')"
          />
          <span>Any Duration</span>
        </label>
        <label v-for="opt in durationOptions" :key="opt.value" class="radio-label">
          <input
            type="radio"
            name="durationTier"
            :value="opt.value"
            :checked="destinationsStore.filters.durationTier === opt.value"
            @change="destinationsStore.setFilter('durationTier', opt.value)"
          />
          <span>{{ opt.label }}</span>
        </label>
      </div>
    </div>

    <!-- Best Season -->
    <div class="filter-section">
      <label class="filter-section-title" for="sidebar-season">Best Season</label>
      <select
        id="sidebar-season"
        v-model="destinationsStore.filters.season"
        class="form-select form-select-sm"
      >
        <option v-for="opt in seasonOptions" :key="opt.value" :value="opt.value">
          {{ opt.label }}
        </option>
      </select>
    </div>
  </aside>
</template>

<style scoped>
.filter-sidebar {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 1.25rem;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filter-icon {
  color: var(--color-terracotta);
}

.header-title h3 {
  font-size: 1.15rem;
  margin: 0;
  color: var(--color-forest);
}

.clear-filters-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-text-muted);
  padding: 0.3rem 0.6rem;
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
}

.clear-filters-btn:hover {
  background-color: var(--color-beige);
  color: var(--color-forest);
}

.filter-section {
  margin-bottom: 1.5rem;
}

.filter-section:last-child {
  margin-bottom: 0;
}

.filter-section-title {
  display: block;
  font-size: 0.82rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-forest);
  margin-bottom: 0.5rem;
}

.form-input-sm,
.form-select-sm {
  padding: 0.6rem 0.85rem;
  font-size: 0.9rem;
}

.chips-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.chip-btn {
  padding: 0.35rem 0.7rem;
  border-radius: var(--radius-full);
  font-size: 0.8rem;
  font-weight: 600;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  color: var(--color-text-main);
  transition: all var(--transition-fast);
}

.chip-btn:hover {
  border-color: var(--color-primary);
  background-color: var(--color-primary-subtle);
}

.chip-btn.is-active {
  background-color: var(--color-primary);
  color: var(--color-white);
  border-color: var(--color-primary);
}

.radio-options {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.88rem;
  color: var(--color-text-main);
  cursor: pointer;
}

.radio-label input[type="radio"] {
  accent-color: var(--color-primary);
  cursor: pointer;
}
</style>
