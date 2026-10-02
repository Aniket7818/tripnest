<script setup lang="ts">
import { ref, computed } from 'vue'
import { EXPERIENCES } from '@/data/experiences'
import ExperienceCard from '@/components/experiences/ExperienceCard.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import { Sparkles, Compass } from 'lucide-vue-next'

const selectedCategory = ref<string>('All')

const categories = [
  'All',
  'Trekking',
  'Camping',
  'Food & Culture',
  'Nature Walks',
  'Adventure',
  'Relaxation'
]

const filteredExperiences = computed(() => {
  if (selectedCategory.value === 'All') return EXPERIENCES
  return EXPERIENCES.filter(exp => exp.category === selectedCategory.value)
})
</script>

<template>
  <div class="experiences-view">
    <header class="exp-hero">
      <div class="container hero-inner">
        <span class="text-eyebrow">AUTHENTIC ENCOUNTERS</span>
        <h1 class="page-title">Travel Experiences</h1>
        <p class="page-subtitle">
          From mountain treks and starry river camps to royal culinary trails and silent backwater kayaking.
        </p>
      </div>
    </header>

    <main class="container exp-content">
      <!-- Category Pills -->
      <div class="category-pills-bar">
        <button
          v-for="cat in categories"
          :key="cat"
          type="button"
          :class="['cat-pill-btn', { 'is-active': selectedCategory === cat }]"
          @click="selectedCategory = cat"
        >
          {{ cat }}
        </button>
      </div>

      <!-- Experiences Grid -->
      <div v-if="filteredExperiences.length > 0" class="exp-grid">
        <ExperienceCard
          v-for="exp in filteredExperiences"
          :key="exp.id"
          :experience="exp"
        />
      </div>

      <EmptyState
        v-else
        title="No experiences in this category"
        description="Try selecting a different travel experience category above."
        action-text="Show All Experiences"
        @action="selectedCategory = 'All'"
      />

      <div class="exp-disclaimer">
        <p>
          *All activities and costs are fictional portfolio demo suggestions for trip planning inspiration. No live commercial bookings or payments are offered.
        </p>
      </div>
    </main>
  </div>
</template>

<style scoped>
.experiences-view {
  min-height: 85vh;
  padding-bottom: 5rem;
}

.exp-hero {
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  padding: 3.5rem 0 2.5rem;
  text-align: center;
  margin-bottom: 2.5rem;
}

.hero-inner {
  max-width: 700px;
}

.page-title {
  margin-top: 0.35rem;
  margin-bottom: 0.5rem;
}

.page-subtitle {
  font-size: 1.05rem;
  color: var(--color-text-muted);
}

.category-pills-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2.5rem;
}

.cat-pill-btn {
  padding: 0.5rem 1.15rem;
  border-radius: var(--radius-full);
  font-size: 0.88rem;
  font-weight: 600;
  background: var(--color-white);
  border: 1px solid var(--color-border);
  color: var(--color-forest);
  transition: all var(--transition-fast);
}

.cat-pill-btn:hover {
  border-color: var(--color-primary);
  background: var(--color-primary-subtle);
}

.cat-pill-btn.is-active {
  background: var(--color-forest);
  color: var(--color-white);
  border-color: var(--color-forest);
}

.exp-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
  width: 100%;
}

@media (max-width: 640px) {
  .exp-grid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
}

.exp-disclaimer {
  text-align: center;
  font-size: 0.8rem;
  color: var(--color-text-muted);
  max-width: 650px;
  margin: 0 auto;
}
</style>
