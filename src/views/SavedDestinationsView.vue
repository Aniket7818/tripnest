<script setup lang="ts">
import { computed } from 'vue'
import { useSavedStore } from '@/stores/saved'
import DestinationCard from '@/components/destinations/DestinationCard.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import { Heart, Trash2 } from 'lucide-vue-next'

const savedStore = useSavedStore()
const savedDestinations = computed(() => savedStore.savedDestinations)
</script>

<template>
  <div class="saved-view">
    <header class="saved-hero">
      <div class="container hero-inner">
        <div class="hero-left">
          <span class="text-eyebrow">YOUR COLLECTION</span>
          <h1 class="page-title">Saved Destinations</h1>
          <p class="page-subtitle">Places you love and want to visit on your upcoming travels.</p>
        </div>

        <button
          v-if="savedDestinations.length > 0"
          type="button"
          class="btn btn-subtle btn-sm clear-btn"
          @click="savedStore.clearAllSaved"
        >
          <Trash2 :size="14" />
          <span>Clear All Saved</span>
        </button>
      </div>
    </header>

    <main class="container saved-content">
      <!-- Destination Cards Grid -->
      <div v-if="savedDestinations.length > 0" class="saved-grid">
        <DestinationCard
          v-for="dest in savedDestinations"
          :key="dest.id"
          :destination="dest"
        />
      </div>

      <!-- Empty State -->
      <EmptyState
        v-else
        title="No saved destinations yet"
        description="Explore our curated collection of mountain retreats, sunny coastlines, and heritage valleys. Click the heart icon on any destination to save it here."
        action-text="Explore Destinations"
        action-route="/destinations"
      >
        <template #icon>
          <Heart :size="32" />
        </template>
      </EmptyState>
    </main>
  </div>
</template>

<style scoped>
.saved-view {
  min-height: 85vh;
  padding-bottom: 5rem;
}

.saved-hero {
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  padding: 3.5rem 0 2.5rem;
  margin-bottom: 2.5rem;
}

.hero-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.page-title {
  margin-top: 0.35rem;
  margin-bottom: 0.4rem;
}

.page-subtitle {
  font-size: 1.05rem;
  color: var(--color-text-muted);
}

.clear-btn {
  color: var(--color-text-muted);
}

.saved-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
  gap: 2rem;
  width: 100%;
}

@media (max-width: 640px) {
  .hero-inner {
    flex-direction: column;
    align-items: flex-start;
  }

  .saved-grid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
}
</style>
