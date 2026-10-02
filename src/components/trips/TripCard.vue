<script setup lang="ts">
import type { Trip } from '@/types'
import { formatINR, formatDate, getDaysCount } from '@/utils/formatters'
import { Calendar, Users, MapPin, Trash2, ArrowRight } from 'lucide-vue-next'

const props = defineProps<{
  trip: Trip
}>()

const emit = defineEmits<{
  (e: 'delete', tripId: string): void
}>()

const daysCount = getDaysCount(props.trip.startDate, props.trip.endDate)
</script>

<template>
  <article class="trip-card card">
    <div class="trip-card-media">
      <img
        :src="trip.coverImage || 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80'"
        :alt="trip.name"
        class="trip-img"
        loading="lazy"
      />
      <span :class="['status-badge', `status-${trip.status}`]">
        {{ trip.status }}
      </span>
      <span class="trip-style-tag badge badge-white">
        {{ trip.travelStyle }}
      </span>
    </div>

    <div class="trip-card-body">
      <div class="trip-destinations">
        <MapPin :size="14" class="dest-icon" />
        <span>{{ trip.destinationNames.join(' & ') }}</span>
      </div>

      <h3 class="trip-title">
        <RouterLink :to="`/my-trips/${trip.id}`">
          {{ trip.name }}
        </RouterLink>
      </h3>

      <div class="trip-info-grid">
        <div class="info-item">
          <Calendar :size="15" class="info-icon" />
          <div class="info-text">
            <span class="info-label">Travel Dates</span>
            <span class="info-val">{{ formatDate(trip.startDate, 'dd MMM') }} – {{ formatDate(trip.endDate, 'dd MMM yyyy') }}</span>
          </div>
        </div>

        <div class="info-item">
          <Users :size="15" class="info-icon" />
          <div class="info-text">
            <span class="info-label">Party & Days</span>
            <span class="info-val">{{ trip.travelersCount }} Travelers &bull; {{ daysCount }} Days</span>
          </div>
        </div>
      </div>

      <div class="trip-card-budget">
        <div class="budget-stat">
          <span class="b-label">Total Estimate</span>
          <span class="b-val">{{ formatINR(trip.totalBudget) }}</span>
        </div>
        <div class="budget-stat per-person">
          <span class="b-label">Per Person</span>
          <span class="b-val">{{ formatINR(trip.costPerPerson) }}</span>
        </div>
      </div>

      <div class="trip-card-actions">
        <button
          type="button"
          class="delete-trip-btn"
          title="Delete trip"
          aria-label="Delete trip"
          @click="emit('delete', trip.id)"
        >
          <Trash2 :size="16" />
        </button>

        <div class="main-ctas">
          <RouterLink
            :to="`/my-trips/${trip.id}`"
            class="btn btn-primary btn-sm view-trip-btn"
          >
            <span>View Itinerary</span>
            <ArrowRight :size="14" />
          </RouterLink>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
.trip-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  min-width: 0;
  max-width: 100%;
}

.trip-card-media {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background-color: var(--color-beige);
}

.trip-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.trip-card:hover .trip-img {
  transform: scale(1.05);
}

.status-badge {
  position: absolute;
  top: 0.85rem;
  left: 0.85rem;
  padding: 0.25rem 0.65rem;
  border-radius: var(--radius-full);
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.status-upcoming {
  background: var(--color-primary);
  color: var(--color-white);
}

.status-past {
  background: var(--color-forest);
  color: #BDC8C3;
}

.status-draft {
  background: var(--color-terracotta);
  color: var(--color-white);
}

.trip-style-tag {
  position: absolute;
  bottom: 0.85rem;
  right: 0.85rem;
  font-size: 0.75rem;
}

.trip-card-body {
  padding: 1.4rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  overflow: hidden;
}

.trip-destinations {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
  margin-bottom: 0.35rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dest-icon {
  color: var(--color-terracotta);
  flex-shrink: 0;
}

.trip-title {
  font-size: 1.35rem;
  color: var(--color-forest);
  margin-bottom: 1rem;
  overflow-wrap: break-word;
  word-break: break-word;
}

.trip-title a:hover {
  color: var(--color-primary);
}

.trip-info-grid {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  margin-bottom: 1.25rem;
  min-width: 0;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  min-width: 0;
}

.info-icon {
  color: var(--color-primary);
  flex-shrink: 0;
}

.info-text {
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
}

.info-label {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
}

.info-val {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--color-text-main);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.trip-card-budget {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  margin-top: auto;
  margin-bottom: 1.25rem;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.budget-stat {
  display: flex;
  flex-direction: column;
}

.b-label {
  font-size: 0.72rem;
  color: var(--color-text-muted);
  text-transform: uppercase;
}

.b-val {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--color-forest);
}

.per-person .b-val {
  color: var(--color-primary);
}

.trip-card-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.delete-trip-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: var(--radius-md);
  color: var(--color-text-muted);
  border: 1px solid var(--color-border);
  transition: all var(--transition-fast);
  flex-shrink: 0;
}

.delete-trip-btn:hover {
  background-color: var(--color-danger-bg);
  color: var(--color-danger);
  border-color: var(--color-danger);
}

.main-ctas {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
}

.view-trip-btn {
  padding: 0.55rem 1rem;
  width: 100%;
  justify-content: center;
  font-size: 0.85rem;
}

@media (max-width: 480px) {
  .trip-card-body {
    padding: 1.15rem 1rem;
  }

  .trip-title {
    font-size: 1.2rem;
  }

  .b-val {
    font-size: 0.98rem;
  }
}
</style>
