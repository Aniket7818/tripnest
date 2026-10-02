<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import TripWizard from '@/components/planner/TripWizard.vue'

const route = useRoute()
const destinationSlug = computed(() => (route.query.destination as string) || undefined)
</script>

<template>
  <div class="planner-view">
    <header class="planner-hero">
      <div class="container hero-inner">
        <span class="text-eyebrow">CUSTOM TRAVEL ARCHITECT</span>
        <h1 class="page-title">Trip Planner</h1>
        <p class="page-subtitle">
          Design your personalized day-by-day travel itinerary, balance expenses with our smart budget estimator, and save your plan.
        </p>
      </div>
    </header>

    <main class="container wizard-wrapper">
      <TripWizard :initial-destination-slug="destinationSlug" />
    </main>
  </div>
</template>

<style scoped>
.planner-view {
  min-height: 85vh;
  padding-bottom: 5rem;
}

.planner-hero {
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  padding: 3rem 0 2.5rem;
  text-align: center;
  margin-bottom: 2.5rem;
}

.hero-inner {
  max-width: 680px;
}

.page-title {
  margin-top: 0.4rem;
  margin-bottom: 0.6rem;
}

.page-subtitle {
  font-size: 1.05rem;
  color: var(--color-text-muted);
  line-height: 1.5;
}

.wizard-wrapper {
  max-width: 1040px;
}
</style>
