<script setup lang="ts">
import type { Experience } from '@/types'
import { formatINR } from '@/utils/formatters'
import { Clock, MapPin, Check, ArrowRight } from 'lucide-vue-next'

defineProps<{
  experience: Experience
}>()
</script>

<template>
  <article class="experience-card card">
    <div class="exp-media">
      <img
        :src="experience.image"
        :alt="experience.title"
        class="exp-img"
        loading="lazy"
      />
      <span class="badge badge-white exp-badge">
        {{ experience.category }}
      </span>
    </div>

    <div class="exp-body">
      <div class="exp-location">
        <MapPin :size="14" class="loc-icon" />
        <span>{{ experience.location }}</span>
      </div>

      <h3 class="exp-title">{{ experience.title }}</h3>
      <p class="exp-desc">{{ experience.shortDescription }}</p>

      <!-- Highlights list -->
      <ul class="exp-highlights">
        <li v-for="highlight in experience.highlights.slice(0, 2)" :key="highlight">
          <Check :size="14" class="check-icon" />
          <span>{{ highlight }}</span>
        </li>
      </ul>

      <div class="exp-meta">
        <div class="meta-duration">
          <Clock :size="14" />
          <span>{{ experience.duration }}</span>
        </div>
        <div class="meta-cost">
          <span class="cost-prefix">Est.</span>
          <span class="cost-num">{{ formatINR(experience.estimatedCost) }}</span>
          <span class="cost-suffix">/ person</span>
        </div>
      </div>

      <div class="exp-footer">
        <RouterLink
          :to="`/destinations/${experience.destinationSlug}`"
          class="btn btn-outline btn-sm action-btn"
        >
          View Destination
        </RouterLink>
        <RouterLink
          :to="`/plan?destination=${experience.destinationSlug}`"
          class="btn btn-primary btn-sm action-btn"
        >
          <span>Plan This</span>
          <ArrowRight :size="14" />
        </RouterLink>
      </div>
    </div>
  </article>
</template>

<style scoped>
.experience-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  min-width: 0;
  max-width: 100%;
}

.exp-media {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background-color: var(--color-beige);
}

.exp-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.experience-card:hover .exp-img {
  transform: scale(1.06);
}

.exp-badge {
  position: absolute;
  top: 0.85rem;
  left: 0.85rem;
  font-weight: 700;
}

.exp-body {
  padding: 1.4rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  overflow: hidden;
}

.exp-location {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.35rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.loc-icon {
  color: var(--color-terracotta);
  flex-shrink: 0;
}

.exp-title {
  font-size: 1.3rem;
  color: var(--color-forest);
  margin-bottom: 0.5rem;
  line-height: 1.3;
  overflow-wrap: break-word;
  word-break: break-word;
}

.exp-desc {
  font-size: 0.88rem;
  color: var(--color-text-muted);
  line-height: 1.45;
  margin-bottom: 1rem;
}

.exp-highlights {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 1.25rem;
}

.exp-highlights li {
  display: flex;
  align-items: flex-start;
  gap: 0.45rem;
  font-size: 0.83rem;
  color: var(--color-text-main);
  line-height: 1.35;
}

.check-icon {
  color: var(--color-primary);
  flex-shrink: 0;
  margin-top: 2px;
}

.exp-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.85rem;
  border-top: 1px solid var(--color-border-subtle);
  margin-top: auto;
  margin-bottom: 1.2rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.meta-duration {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.83rem;
  color: var(--color-text-muted);
  font-weight: 500;
}

.meta-cost {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
}

.cost-prefix {
  font-size: 0.72rem;
  color: var(--color-text-muted);
}

.cost-num {
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--color-forest);
}

.cost-suffix {
  font-size: 0.72rem;
  color: var(--color-text-muted);
}

.exp-footer {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.6rem;
  width: 100%;
}

.action-btn {
  width: 100%;
  padding: 0.55rem 0.5rem;
  font-size: 0.82rem;
  white-space: nowrap;
  justify-content: center;
  text-align: center;
}

@media (max-width: 480px) {
  .exp-body {
    padding: 1.15rem 1rem;
  }

  .exp-title {
    font-size: 1.2rem;
  }

  .action-btn {
    font-size: 0.8rem;
    padding: 0.55rem 0.35rem;
  }
}
</style>
