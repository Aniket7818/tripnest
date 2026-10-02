<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useDestinationsStore } from '@/stores/destinations'
import DestinationCard from '@/components/destinations/DestinationCard.vue'
import FilterSidebar from '@/components/destinations/FilterSidebar.vue'
import FilterDrawer from '@/components/destinations/FilterDrawer.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import { SlidersHorizontal, ArrowUpDown, Search, RotateCcw } from 'lucide-vue-next'

const route = useRoute()
const destinationsStore = useDestinationsStore()

const isFilterDrawerOpen = ref(false)

// Handle query params on mount
onMounted(() => {
  if (route.query.q) {
    destinationsStore.setFilter('searchQuery', String(route.query.q))
  }
  if (route.query.style) {
    destinationsStore.setFilter('travelStyle', String(route.query.style))
  }
  if (route.query.budget) {
    destinationsStore.setFilter('budgetTier', String(route.query.budget))
  }
  if (route.query.duration) {
    destinationsStore.setFilter('durationTier', String(route.query.duration))
  }
})

const destinations = computed(() => destinationsStore.filteredDestinations)
</script>

<template>
  <div class="destinations-view">
    <!-- Page Header -->
    <header class="destinations-hero">
      <div class="container hero-inner">
        <span class="text-eyebrow">CURATED DISCOVERY</span>
        <h1 class="page-title">Explore the World, One Place at a Time</h1>
        <p class="page-subtitle">Find inspiration for your next escape.</p>
      </div>
    </header>

    <div class="container main-content-layout">
      <!-- Desktop Filter Sidebar -->
      <aside class="desktop-sidebar-column">
        <FilterSidebar />
      </aside>

      <!-- Results Column -->
      <main class="results-column">
        <!-- Results Bar -->
        <div class="results-toolbar">
          <div class="results-count">
            Showing <strong>{{ destinations.length }}</strong> {{ destinations.length === 1 ? 'Destination' : 'Destinations' }}
          </div>

          <div class="toolbar-controls">
            <!-- Mobile Filters Trigger Button -->
            <button
              type="button"
              class="btn btn-outline btn-sm mobile-filter-btn"
              @click="isFilterDrawerOpen = true"
            >
              <SlidersHorizontal :size="15" />
              <span>Filters</span>
            </button>

            <!-- Sorting Dropdown -->
            <div class="sort-wrapper">
              <label for="sort-select" class="sort-label">
                <ArrowUpDown :size="14" />
                <span>Sort by:</span>
              </label>
              <select
                id="sort-select"
                :value="destinationsStore.filters.sortBy"
                class="sort-select"
                @change="destinationsStore.setFilter('sortBy', ($event.target as HTMLSelectElement).value as any)"
              >
                <option value="recommended">Recommended</option>
                <option value="name-asc">Name: A – Z</option>
                <option value="budget-asc">Budget: Low to High</option>
                <option value="budget-desc">Budget: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Destination Cards Grid -->
        <div v-if="destinations.length > 0" class="destinations-results-grid">
          <DestinationCard
            v-for="dest in destinations"
            :key="dest.id"
            :destination="dest"
          />
        </div>

        <!-- Empty State -->
        <EmptyState
          v-else
          title="No destinations match your criteria"
          description="Try broadening your search keyword, adjusting your budget tier, or resetting filters."
          action-text="Reset All Filters"
          @action="destinationsStore.resetFilters"
        />
      </main>
    </div>

    <!-- Mobile Filter Drawer -->
    <FilterDrawer
      :is-open="isFilterDrawerOpen"
      @close="isFilterDrawerOpen = false"
    />
  </div>
</template>

<style scoped>
.destinations-view {
  min-height: 85vh;
  padding-bottom: 5rem;
}

.destinations-hero {
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  padding: 3.5rem 0 3rem;
  text-align: center;
  margin-bottom: 2.5rem;
}

.hero-inner {
  max-width: 700px;
}

.page-title {
  margin-top: 0.5rem;
  margin-bottom: 0.75rem;
}

.page-subtitle {
  font-size: 1.15rem;
  color: var(--color-text-muted);
}

.main-content-layout {
  display: grid;
  grid-template-columns: 290px 1fr;
  gap: 2.5rem;
  align-items: flex-start;
}

.results-column {
  display: flex;
  flex-direction: column;
}

.results-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 1.25rem;
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  margin-bottom: 1.75rem;
  box-shadow: var(--shadow-sm);
  flex-wrap: wrap;
  gap: 1rem;
}

.results-count {
  font-size: 0.95rem;
  color: var(--color-text-main);
}

.results-count strong {
  color: var(--color-forest);
}

.toolbar-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.mobile-filter-btn {
  display: none;
}

.sort-wrapper {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.sort-label {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-text-muted);
}

.sort-select {
  border: 1px solid var(--color-border);
  background: var(--color-white);
  padding: 0.4rem 0.75rem;
  border-radius: var(--radius-sm);
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--color-forest);
  cursor: pointer;
  outline: none;
}

.sort-select:focus {
  border-color: var(--color-primary);
}

.destinations-results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
  gap: 1.75rem;
  width: 100%;
}

@media (max-width: 992px) {
  .main-content-layout {
    grid-template-columns: 1fr;
  }

  .desktop-sidebar-column {
    display: none;
  }

  .mobile-filter-btn {
    display: inline-flex;
  }
}

@media (max-width: 640px) {
  .destinations-view {
    padding-bottom: 2.5rem;
  }

  .destinations-hero {
    padding: 2.25rem 0 1.75rem;
    margin-bottom: 1.5rem;
  }

  .page-subtitle {
    font-size: 1rem;
  }

  .results-toolbar {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
    padding: 0.85rem 1rem;
    margin-bottom: 1.25rem;
  }

  .results-count {
    font-size: 0.88rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--color-border-subtle);
  }

  .toolbar-controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.6rem;
    width: 100%;
  }

  .mobile-filter-btn {
    flex: 1;
    justify-content: center;
    padding: 0.45rem 0.6rem;
    font-size: 0.82rem;
    white-space: nowrap;
  }

  .sort-wrapper {
    flex: 1.2;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.35rem;
    min-width: 0;
  }

  .sort-label span {
    display: none;
  }

  .sort-select {
    width: 100%;
    min-width: 0;
    font-size: 0.82rem;
    padding: 0.45rem 0.5rem;
  }

  .destinations-results-grid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
}
</style>
