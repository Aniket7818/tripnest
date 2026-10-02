<script setup lang="ts">
import { computed } from 'vue'
import type { BudgetBreakdown } from '@/types'
import { formatINR } from '@/utils/formatters'
import { Plane, Hotel, UtensilsCrossed, Compass, MoreHorizontal, Users, Wallet } from 'lucide-vue-next'

const props = withDefaults(
  defineProps<{
    modelValue: BudgetBreakdown
    travelersCount?: number
    readOnly?: boolean
  }>(),
  {
    travelersCount: 2,
    readOnly: false
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: BudgetBreakdown): void
}>()

const budget = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

function updateCategory(key: keyof BudgetBreakdown, value: number) {
  const updated = {
    ...props.modelValue,
    [key]: Math.max(0, Number(value) || 0)
  }
  emit('update:modelValue', updated)
}

const totalBudget = computed(() => {
  return (
    Number(budget.value.transportation || 0) +
    Number(budget.value.accommodation || 0) +
    Number(budget.value.food || 0) +
    Number(budget.value.activities || 0) +
    Number(budget.value.miscellaneous || 0)
  )
})

const perPersonCost = computed(() => {
  const travelers = props.travelersCount > 0 ? props.travelersCount : 1
  return Math.round(totalBudget.value / travelers)
})

const categories = [
  { key: 'transportation' as const, label: 'Transportation', icon: Plane, color: '#2D6658' },
  { key: 'accommodation' as const, label: 'Accommodation', icon: Hotel, color: '#C77B5A' },
  { key: 'food' as const, label: 'Food & Dining', icon: UtensilsCrossed, color: '#3D806F' },
  { key: 'activities' as const, label: 'Experiences & Activities', icon: Compass, color: '#D49479' },
  { key: 'miscellaneous' as const, label: 'Miscellaneous & Shopping', icon: MoreHorizontal, color: '#777E79' }
]

function getPercentage(amount: number): number {
  if (totalBudget.value === 0) return 0
  return Math.round((amount / totalBudget.value) * 100)
}

function applyPreset(preset: 'budget' | 'comfort' | 'luxury') {
  const travelers = props.travelersCount || 2
  if (preset === 'budget') {
    emit('update:modelValue', {
      transportation: 3500 * travelers,
      accommodation: 4500 * travelers,
      food: 3000 * travelers,
      activities: 2000 * travelers,
      miscellaneous: 1000 * travelers
    })
  } else if (preset === 'comfort') {
    emit('update:modelValue', {
      transportation: 6500 * travelers,
      accommodation: 9000 * travelers,
      food: 5500 * travelers,
      activities: 4000 * travelers,
      miscellaneous: 2500 * travelers
    })
  } else {
    emit('update:modelValue', {
      transportation: 12000 * travelers,
      accommodation: 20000 * travelers,
      food: 10000 * travelers,
      activities: 8000 * travelers,
      miscellaneous: 5000 * travelers
    })
  }
}
</script>

<template>
  <div class="budget-calculator">
    <!-- Presets bar (if not read-only) -->
    <div v-if="!readOnly" class="preset-header">
      <span class="preset-label">Quick Smart Presets:</span>
      <div class="preset-buttons">
        <button
          type="button"
          class="btn btn-subtle btn-sm"
          @click="applyPreset('budget')"
        >
          Backpacker (₹14k/person)
        </button>
        <button
          type="button"
          class="btn btn-subtle btn-sm"
          @click="applyPreset('comfort')"
        >
          Comfort (₹27.5k/person)
        </button>
        <button
          type="button"
          class="btn btn-subtle btn-sm"
          @click="applyPreset('luxury')"
        >
          Boutique Luxury (₹55k/person)
        </button>
      </div>
    </div>

    <!-- Summary Headline Cards -->
    <div class="budget-summary-cards">
      <div class="summary-card total-card">
        <div class="summary-icon">
          <Wallet :size="24" />
        </div>
        <div class="summary-info">
          <span class="summary-label">Total Estimated Trip Budget</span>
          <h3 class="summary-value">{{ formatINR(totalBudget) }}</h3>
        </div>
      </div>

      <div class="summary-card per-person-card">
        <div class="summary-icon">
          <Users :size="24" />
        </div>
        <div class="summary-info">
          <span class="summary-label">Cost Per Traveler ({{ travelersCount }} {{ travelersCount === 1 ? 'person' : 'people' }})</span>
          <h3 class="summary-value">{{ formatINR(perPersonCost) }}</h3>
        </div>
      </div>
    </div>

    <!-- Visual Category Progress Bar -->
    <div class="progress-bar-container">
      <div class="multi-progress-bar">
        <div
          v-for="cat in categories"
          :key="cat.key"
          class="progress-segment"
          :style="{
            width: `${getPercentage(budget[cat.key])}%`,
            backgroundColor: cat.color
          }"
          :title="`${cat.label}: ${getPercentage(budget[cat.key])}% (${formatINR(budget[cat.key])})`"
        />
      </div>
    </div>

    <!-- Category Inputs / Details -->
    <div class="category-inputs-grid">
      <div
        v-for="cat in categories"
        :key="cat.key"
        class="category-input-card"
      >
        <div class="cat-header">
          <div class="cat-title-wrap">
            <span class="cat-color-dot" :style="{ backgroundColor: cat.color }" />
            <component :is="cat.icon" :size="16" class="cat-icon" />
            <span class="cat-name">{{ cat.label }}</span>
          </div>
          <span class="cat-pct">{{ getPercentage(budget[cat.key]) }}%</span>
        </div>

        <div class="cat-input-wrap">
          <span class="currency-symbol">₹</span>
          <input
            v-if="!readOnly"
            type="number"
            min="0"
            step="100"
            :value="budget[cat.key]"
            class="cat-input"
            @input="updateCategory(cat.key, Number(($event.target as HTMLInputElement).value))"
          />
          <span v-else class="cat-readonly-value">
            {{ (budget[cat.key] || 0).toLocaleString('en-IN') }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.budget-calculator {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.preset-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  padding: 0.75rem 1rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}

.preset-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-forest);
}

.preset-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.budget-summary-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
  gap: 1.25rem;
  width: 100%;
}

@media (max-width: 640px) {
  .budget-summary-cards {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

.summary-card {
  padding: 1.25rem 1.5rem;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  gap: 1.25rem;
  box-shadow: var(--shadow-sm);
}

.total-card {
  background: var(--color-forest);
  color: var(--color-white);
}

.total-card .summary-icon {
  background: rgba(255, 255, 255, 0.15);
  color: var(--color-white);
}

.total-card .summary-label {
  color: #BDC8C3;
}

.total-card .summary-value {
  color: var(--color-white);
}

.per-person-card {
  background: var(--color-white);
  border: 1px solid var(--color-border);
}

.per-person-card .summary-icon {
  background: var(--color-primary-subtle);
  color: var(--color-primary);
}

.per-person-card .summary-label {
  color: var(--color-text-muted);
}

.per-person-card .summary-value {
  color: var(--color-forest);
}

.summary-icon {
  width: 50px;
  height: 50px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.summary-info {
  display: flex;
  flex-direction: column;
}

.summary-label {
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
}

.summary-value {
  font-size: 1.7rem;
  font-weight: 700;
  line-height: 1.1;
}

.progress-bar-container {
  width: 100%;
}

.multi-progress-bar {
  display: flex;
  height: 12px;
  width: 100%;
  border-radius: var(--radius-full);
  overflow: hidden;
  background-color: var(--color-beige);
}

.progress-segment {
  height: 100%;
  transition: width 0.3s ease;
}

.category-inputs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 190px), 1fr));
  gap: 1rem;
  width: 100%;
}

@media (max-width: 480px) {
  .category-inputs-grid {
    grid-template-columns: 1fr;
  }
}

.category-input-card {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  transition: border-color var(--transition-fast);
}

.category-input-card:hover {
  border-color: var(--color-primary);
}

.cat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.cat-title-wrap {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.cat-color-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.cat-icon {
  color: var(--color-text-muted);
}

.cat-name {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--color-forest);
}

.cat-pct {
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--color-text-muted);
}

.cat-input-wrap {
  display: flex;
  align-items: center;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 0.4rem 0.65rem;
}

.cat-input-wrap:focus-within {
  border-color: var(--color-primary);
  background-color: var(--color-white);
}

.currency-symbol {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-right: 0.35rem;
}

.cat-input {
  border: none;
  background: transparent;
  width: 100%;
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text-main);
  outline: none;
}

.cat-readonly-value {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text-main);
}
</style>
