<script setup lang="ts">
import { Compass, ArrowRight } from 'lucide-vue-next'
</script>

<template>
  <div class="not-found-view">
    <div class="container not-found-card">
      <div class="icon-circle">
        <Compass :size="44" stroke-width="1.8" />
      </div>
      <span class="text-eyebrow">404 — OFF THE MAP</span>
      <h1 class="not-found-title">Lost in Exploration?</h1>
      <p class="not-found-desc">
        The travel page you are looking for may have moved, expired, or never existed in this territory.
      </p>
      <div class="not-found-actions">
        <RouterLink to="/" class="btn btn-primary btn-lg">
          Return to Discover
        </RouterLink>
        <RouterLink to="/destinations" class="btn btn-outline btn-lg">
          <span>Explore All Destinations</span>
          <ArrowRight :size="16" />
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.not-found-view {
  min-height: 75vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 1.5rem;
}

.not-found-card {
  max-width: 620px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.icon-circle {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  background: var(--color-primary-subtle);
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.not-found-title {
  font-size: clamp(2.2rem, 4vw, 3rem);
  margin-top: 0.5rem;
  margin-bottom: 1rem;
}

.not-found-desc {
  font-size: 1.1rem;
  color: var(--color-text-muted);
  line-height: 1.6;
  margin-bottom: 2.25rem;
  max-width: 500px;
}

.not-found-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
