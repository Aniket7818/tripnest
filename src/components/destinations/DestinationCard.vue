<script setup lang="ts">
import type { Destination } from '@/types'
import { formatINR } from '@/utils/formatters'
import FavoriteButton from '@/components/ui/FavoriteButton.vue'
import { MapPin, Clock, ArrowRight } from 'lucide-vue-next'

defineProps<{
  destination: Destination
}>()
</script>

<template>
  <article class="destination-card card">
    <div class="card-media">
      <img
        :src="destination.coverImage"
        :alt="`${destination.name}, ${destination.state}`"
        class="card-img"
        loading="lazy"
      />
      <!-- Floating Favorite Button -->
      <div class="card-fav-wrapper">
        <FavoriteButton :destination-id="destination.id" variant="floating" />
      </div>

      <!-- Travel Style Tag -->
      <div class="card-badges">
        <span
          v-for="style in destination.travelStyles.slice(0, 2)"
          :key="style"
          class="badge badge-white"
        >
          {{ style }}
        </span>
      </div>
    </div>

    <div class="card-body">
      <div class="card-location">
        <MapPin :size="14" class="loc-icon" />
        <span>{{ destination.state }}, {{ destination.country }}</span>
      </div>

      <h3 class="card-title">
        <RouterLink :to="`/destinations/${destination.slug}`">
          {{ destination.name }}
        </RouterLink>
      </h3>

      <p class="card-desc">{{ destination.tagline }}</p>

      <div class="card-meta">
        <div class="meta-item">
          <Clock :size="15" class="meta-icon" />
          <span>{{ destination.idealDurationText }}</span>
        </div>
        <div class="meta-item price-item">
          <span class="price-label">Starts from</span>
          <span class="price-value">{{ formatINR(destination.estimatedBudget) }}</span>
          <span class="price-unit">/ person</span>
        </div>
      </div>

      <div class="card-footer">
        <RouterLink
          :to="`/destinations/${destination.slug}`"
          class="explore-link"
        >
          <span>Explore Details</span>
          <ArrowRight :size="16" class="explore-arrow" />
        </RouterLink>

        <RouterLink
          :to="`/plan?destination=${destination.slug}`"
          class="btn btn-subtle btn-sm plan-cta-btn"
          title="Plan trip to this place"
        >
          Plan Trip
        </RouterLink>
      </div>
    </div>
  </article>
</template>

<style scoped>
.destination-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  min-width: 0;
  max-width: 100%;
}

.card-media {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background-color: var(--color-beige);
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.destination-card:hover .card-img {
  transform: scale(1.06);
}

.card-fav-wrapper {
  position: absolute;
  top: 0.85rem;
  right: 0.85rem;
  z-index: 2;
}

.card-badges {
  position: absolute;
  bottom: 0.85rem;
  left: 0.85rem;
  display: flex;
  gap: 0.4rem;
  z-index: 2;
}

.card-body {
  padding: 1.25rem 1.4rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.card-location {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.35rem;
}

.loc-icon {
  color: var(--color-terracotta);
}

.card-title {
  font-size: 1.4rem;
  margin-bottom: 0.45rem;
  color: var(--color-forest);
  transition: color var(--transition-fast);
}

.card-title a:hover {
  color: var(--color-primary);
}

.card-desc {
  font-size: 0.88rem;
  color: var(--color-text-muted);
  line-height: 1.45;
  margin-bottom: 1.25rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.85rem;
  border-top: 1px solid var(--color-border-subtle);
  margin-top: auto;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  color: var(--color-text-main);
  font-weight: 500;
}

.meta-icon {
  color: var(--color-primary);
}

.price-item {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
  flex-wrap: wrap;
}

.price-label {
  font-size: 0.72rem;
  color: var(--color-text-muted);
}

.price-value {
  font-weight: 700;
  font-size: 1.05rem;
  color: var(--color-forest);
}

.price-unit {
  font-size: 0.72rem;
  color: var(--color-text-muted);
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.explore-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--color-forest);
  transition: all var(--transition-fast);
}

.explore-arrow {
  transition: transform var(--transition-fast);
}

.explore-link:hover {
  color: var(--color-terracotta);
}

.explore-link:hover .explore-arrow {
  transform: translateX(4px);
}

.plan-cta-btn {
  font-size: 0.8rem;
  padding: 0.35rem 0.75rem;
  white-space: nowrap;
}

@media (max-width: 480px) {
  .card-body {
    padding: 1.15rem 1rem;
  }

  .card-title {
    font-size: 1.25rem;
  }

  .card-meta {
    padding-top: 0.75rem;
    margin-bottom: 0.85rem;
    gap: 0.35rem;
  }

  .explore-link {
    font-size: 0.82rem;
  }

  .plan-cta-btn {
    font-size: 0.78rem;
    padding: 0.35rem 0.65rem;
  }
}
</style>
