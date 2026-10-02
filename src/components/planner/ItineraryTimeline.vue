<script setup lang="ts">
import { ref } from 'vue'
import type { ItineraryDay, ItineraryActivity, TimeOfDay } from '@/types'
import { formatINR } from '@/utils/formatters'
import {
  Sun,
  Sunrise,
  Sunset,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  MapPin,
  Clock,
  Sparkles,
  Edit3
} from 'lucide-vue-next'
import ModalDialog from '@/components/ui/ModalDialog.vue'

const props = withDefaults(
  defineProps<{
    days: ItineraryDay[]
    editable?: boolean
  }>(),
  {
    editable: true
  }
)

const emit = defineEmits<{
  (e: 'addActivity', dayNumber: number, activity: Omit<ItineraryActivity, 'id'>): void
  (e: 'removeActivity', dayNumber: number, activityId: string): void
  (e: 'moveActivity', dayNumber: number, index: number, direction: 'up' | 'down'): void
  (e: 'updateDayTheme', dayNumber: number, theme: string): void
}>()

// Modal state for adding activity
const isAddModalOpen = ref(false)
const targetDayNumber = ref<number>(1)

const newActivityTitle = ref('')
const newActivityDesc = ref('')
const newActivityLocation = ref('')
const newActivityTime = ref<TimeOfDay>('morning')
const newActivityCost = ref<number>(0)

function openAddModal(dayNum: number) {
  targetDayNumber.value = dayNum
  newActivityTitle.value = ''
  newActivityDesc.value = ''
  newActivityLocation.value = ''
  newActivityTime.value = 'morning'
  newActivityCost.value = 500
  isAddModalOpen.value = true
}

function handleSaveActivity() {
  if (!newActivityTitle.value.trim()) return

  emit('addActivity', targetDayNumber.value, {
    title: newActivityTitle.value.trim(),
    description: newActivityDesc.value.trim(),
    location: newActivityLocation.value.trim() || 'Local Area',
    timeOfDay: newActivityTime.value,
    estimatedCost: Number(newActivityCost.value) || 0
  })

  isAddModalOpen.value = false
}

function getTimeIcon(time: TimeOfDay) {
  if (time === 'morning') return Sunrise
  if (time === 'afternoon') return Sun
  return Sunset
}

function getTimeLabel(time: TimeOfDay) {
  if (time === 'morning') return 'Morning'
  if (time === 'afternoon') return 'Afternoon'
  return 'Evening'
}
</script>

<template>
  <div class="itinerary-timeline">
    <div
      v-for="day in days"
      :key="day.dayNumber"
      class="day-card"
    >
      <!-- Day Header -->
      <div class="day-header">
        <div class="day-badge-wrap">
          <span class="day-number-badge">Day {{ day.dayNumber }}</span>
          <span v-if="day.date" class="day-date-text">{{ day.date }}</span>
        </div>

        <div class="day-theme-wrap">
          <input
            v-if="editable"
            type="text"
            :value="day.theme"
            placeholder="Give this day a theme (e.g. Mountain Views & Heritage)"
            class="day-theme-input"
            @change="emit('updateDayTheme', day.dayNumber, ($event.target as HTMLInputElement).value)"
          />
          <h4 v-else class="day-theme-text">{{ day.theme || `Day ${day.dayNumber} Exploration` }}</h4>
        </div>

        <button
          v-if="editable"
          type="button"
          class="btn btn-outline btn-sm add-act-btn"
          @click="openAddModal(day.dayNumber)"
        >
          <Plus :size="14" />
          <span>Add Activity</span>
        </button>
      </div>

      <!-- Activities List -->
      <div v-if="day.activities && day.activities.length > 0" class="activities-list">
        <div
          v-for="(act, actIndex) in day.activities"
          :key="act.id"
          class="activity-row"
        >
          <!-- Time indicator -->
          <div :class="['time-indicator', `time-${act.timeOfDay}`]">
            <component :is="getTimeIcon(act.timeOfDay)" :size="16" class="time-slot-icon" />
            <span class="time-slot-text">{{ getTimeLabel(act.timeOfDay) }}</span>
          </div>

          <!-- Activity Details -->
          <div class="activity-content">
            <h5 class="activity-title">{{ act.title }}</h5>
            <p v-if="act.description" class="activity-desc">{{ act.description }}</p>
            <div class="activity-meta">
              <span v-if="act.location" class="act-loc">
                <MapPin :size="13" />
                {{ act.location }}
              </span>
              <span v-if="act.estimatedCost !== undefined" class="act-cost">
                {{ formatINR(act.estimatedCost) }}
              </span>
            </div>
          </div>

          <!-- Action controls in Edit Mode -->
          <div v-if="editable" class="activity-controls">
            <!-- Up button -->
            <button
              type="button"
              class="control-btn"
              :disabled="actIndex === 0"
              title="Move Up"
              aria-label="Move activity earlier"
              @click="emit('moveActivity', day.dayNumber, actIndex, 'up')"
            >
              <ChevronUp :size="15" />
            </button>
            <!-- Down button -->
            <button
              type="button"
              class="control-btn"
              :disabled="actIndex === day.activities.length - 1"
              title="Move Down"
              aria-label="Move activity later"
              @click="emit('moveActivity', day.dayNumber, actIndex, 'down')"
            >
              <ChevronDown :size="15" />
            </button>
            <!-- Delete button -->
            <button
              type="button"
              class="control-btn delete-btn"
              title="Remove Activity"
              aria-label="Remove activity"
              @click="emit('removeActivity', day.dayNumber, act.id)"
            >
              <Trash2 :size="14" />
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State for Day -->
      <div v-else class="day-empty">
        <p>No activities scheduled for Day {{ day.dayNumber }} yet.</p>
        <button
          v-if="editable"
          type="button"
          class="btn btn-subtle btn-sm"
          @click="openAddModal(day.dayNumber)"
        >
          <Plus :size="14" /> Plan an activity
        </button>
      </div>
    </div>

    <!-- Modal to add activity -->
    <ModalDialog
      :is-open="isAddModalOpen"
      :title="`Add Activity to Day ${targetDayNumber}`"
      @close="isAddModalOpen = false"
    >
      <form @submit.prevent="handleSaveActivity">
        <div class="form-group">
          <label class="form-label" for="act-title">Activity Title *</label>
          <input
            id="act-title"
            v-model="newActivityTitle"
            type="text"
            placeholder="e.g. Sunrise Yoga by the Ganges"
            class="form-input"
            required
          />
        </div>

        <div class="form-group">
          <label class="form-label" for="act-time">Time of Day</label>
          <select id="act-time" v-model="newActivityTime" class="form-select">
            <option value="morning">Morning (Sunrise - 12 PM)</option>
            <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
            <option value="evening">Evening (5 PM - Night)</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label" for="act-location">Location / Landmark</label>
          <input
            id="act-location"
            v-model="newActivityLocation"
            type="text"
            placeholder="e.g. Tapovan Ghat"
            class="form-input"
          />
        </div>

        <div class="form-group">
          <label class="form-label" for="act-cost">Estimated Expense (₹ INR)</label>
          <input
            id="act-cost"
            v-model="newActivityCost"
            type="number"
            min="0"
            step="50"
            class="form-input"
          />
        </div>

        <div class="form-group">
          <label class="form-label" for="act-desc">Description & Notes</label>
          <textarea
            id="act-desc"
            v-model="newActivityDesc"
            rows="3"
            placeholder="Tips, ticket info, or what to carry..."
            class="form-textarea"
          />
        </div>

        <div class="modal-form-actions">
          <button type="button" class="btn btn-subtle" @click="isAddModalOpen = false">
            Cancel
          </button>
          <button type="submit" class="btn btn-primary">
            Save Activity
          </button>
        </div>
      </form>
    </ModalDialog>
  </div>
</template>

<style scoped>
.itinerary-timeline {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.day-card {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.day-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.4rem;
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  flex-wrap: wrap;
}

.day-badge-wrap {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.day-number-badge {
  background-color: var(--color-forest);
  color: var(--color-white);
  padding: 0.35rem 0.8rem;
  border-radius: var(--radius-full);
  font-weight: 700;
  font-size: 0.82rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.day-date-text {
  font-size: 0.85rem;
  color: var(--color-text-muted);
  font-weight: 600;
}

.day-theme-wrap {
  flex: 1;
  min-width: 200px;
}

.day-theme-input {
  width: 100%;
  border: 1px dashed var(--color-border);
  border-radius: var(--radius-sm);
  padding: 0.4rem 0.75rem;
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--color-forest);
  background: transparent;
  transition: border-color var(--transition-fast);
}

.day-theme-input:focus {
  border-style: solid;
  border-color: var(--color-primary);
  outline: none;
  background: var(--color-white);
}

.day-theme-text {
  font-size: 1.05rem;
  color: var(--color-forest);
  margin: 0;
}

.add-act-btn {
  padding: 0.4rem 0.85rem;
}

.activities-list {
  display: flex;
  flex-direction: column;
}

.activity-row {
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
  padding: 1.2rem 1.4rem;
  border-bottom: 1px solid var(--color-border-subtle);
  transition: background-color var(--transition-fast);
}

.activity-row:last-child {
  border-bottom: none;
}

.activity-row:hover {
  background-color: rgba(248, 246, 240, 0.5);
}

.time-indicator {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.7rem;
  border-radius: var(--radius-full);
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  flex-shrink: 0;
  min-width: 110px;
}

.time-morning {
  background-color: #FFF8E1;
  color: #B78103;
}

.time-afternoon {
  background-color: #E8F5E9;
  color: #2E7D32;
}

.time-evening {
  background-color: #EDE7F6;
  color: #5E35B1;
}

.time-slot-icon {
  flex-shrink: 0;
}

.activity-content {
  flex: 1;
}

.activity-title {
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--color-forest);
  margin-bottom: 0.3rem;
}

.activity-desc {
  font-size: 0.88rem;
  color: var(--color-text-muted);
  line-height: 1.45;
  margin-bottom: 0.5rem;
}

.activity-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.82rem;
  font-weight: 500;
}

.act-loc {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  color: var(--color-text-muted);
}

.act-cost {
  color: var(--color-primary);
  font-weight: 700;
}

.activity-controls {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  flex-shrink: 0;
}

.control-btn {
  width: 28px;
  height: 28px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-muted);
  border: 1px solid var(--color-border);
  background: var(--color-white);
  transition: all var(--transition-fast);
}

.control-btn:hover:not(:disabled) {
  background-color: var(--color-beige);
  color: var(--color-forest);
}

.control-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.delete-btn:hover:not(:disabled) {
  background-color: var(--color-danger-bg);
  color: var(--color-danger);
  border-color: var(--color-danger);
}

.day-empty {
  padding: 2rem 1.4rem;
  text-align: center;
  color: var(--color-text-muted);
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.modal-form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

@media (max-width: 640px) {
  .day-header {
    padding: 0.85rem 1rem;
    gap: 0.75rem;
  }

  .activity-row {
    flex-direction: column;
    gap: 0.75rem;
    padding: 1rem;
  }

  .time-indicator {
    min-width: auto;
  }

  .activity-controls {
    align-self: flex-end;
  }
}
</style>
