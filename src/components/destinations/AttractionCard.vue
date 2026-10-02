<script setup lang="ts">
import type { Attraction } from '@/types'
import { Clock, MapPin } from 'lucide-vue-next'

defineProps<{
  attraction: Attraction
}>()
</script>

<template>
  <div class="attraction-card">
    <div class="attraction-image-wrap">
      <img
        :src="attraction.image"
        :alt="attraction.name"
        class="attraction-img"
        loading="lazy"
      />
      <span v-if="attraction.category" class="attraction-cat badge badge-white">
        {{ attraction.category }}
      </span>
    </div>
    <div class="attraction-content">
      <h4 class="attraction-title">{{ attraction.name }}</h4>
      <p class="attraction-desc">{{ attraction.shortDescription }}</p>
      <div class="attraction-meta">
        <Clock :size="14" class="time-icon" />
        <span>Ideal Visit: {{ attraction.duration }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.attraction-card {
  display: flex;
  flex-direction: column;
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition-normal), box-shadow var(--transition-normal);
}

.attraction-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.attraction-image-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background-color: var(--color-beige);
}

.attraction-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.attraction-card:hover .attraction-img {
  transform: scale(1.05);
}

.attraction-cat {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
}

.attraction-content {
  padding: 1.1rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.attraction-title {
  font-size: 1.15rem;
  color: var(--color-forest);
  margin-bottom: 0.4rem;
}

.attraction-desc {
  font-size: 0.85rem;
  color: var(--color-text-muted);
  line-height: 1.45;
  margin-bottom: 0.85rem;
  flex: 1;
}

.attraction-meta {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  color: var(--color-primary);
  font-weight: 600;
  border-top: 1px solid var(--color-border-subtle);
  padding-top: 0.65rem;
}

.time-icon {
  color: var(--color-terracotta);
}
</style>
