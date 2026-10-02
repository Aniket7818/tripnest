<script setup lang="ts">
import { X, Filter, RotateCcw } from 'lucide-vue-next'
import { useDestinationsStore } from '@/stores/destinations'
import FilterSidebar from './FilterSidebar.vue'

defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const destinationsStore = useDestinationsStore()
</script>

<template>
  <Teleport to="body">
    <Transition name="drawer">
      <div v-if="isOpen" class="filter-drawer-backdrop" @click="emit('close')">
        <aside class="filter-drawer" @click.stop>
          <div class="drawer-header">
            <div class="drawer-title">
              <Filter :size="18" class="icon" />
              <h3>Filter Destinations</h3>
            </div>
            <button
              type="button"
              class="close-btn"
              aria-label="Close filters"
              @click="emit('close')"
            >
              <X :size="20" />
            </button>
          </div>

          <div class="drawer-body">
            <FilterSidebar />
          </div>

          <div class="drawer-footer">
            <button
              type="button"
              class="btn btn-outline btn-sm"
              @click="destinationsStore.resetFilters"
            >
              Reset All
            </button>
            <button
              type="button"
              class="btn btn-primary btn-sm flex-1"
              @click="emit('close')"
            >
              Show {{ destinationsStore.filteredDestinations.length }} Places
            </button>
          </div>
        </aside>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.filter-drawer-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9996;
  background-color: rgba(23, 61, 53, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: flex-end;
}

.filter-drawer {
  width: 90%;
  max-width: 360px;
  height: 100%;
  background: var(--color-white);
  box-shadow: var(--shadow-lg);
  display: flex;
  flex-direction: column;
}

.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--color-border);
}

.drawer-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.drawer-title h3 {
  font-size: 1.2rem;
  margin: 0;
  color: var(--color-forest);
}

.icon {
  color: var(--color-terracotta);
}

.close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: var(--radius-full);
  color: var(--color-text-muted);
}

.close-btn:hover {
  background-color: var(--color-beige);
  color: var(--color-text-main);
}

.drawer-body {
  padding: 1.25rem;
  overflow-y: auto;
  flex: 1;
}

.drawer-body :deep(.filter-sidebar) {
  border: none;
  padding: 0;
  box-shadow: none;
}

.drawer-footer {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--color-border);
  background-color: var(--color-surface);
}

.flex-1 {
  flex: 1;
}

/* Transitions */
.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.3s ease;
}

.drawer-enter-active .filter-drawer,
.drawer-leave-active .filter-drawer {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}

.drawer-enter-from .filter-drawer,
.drawer-leave-to .filter-drawer {
  transform: translateX(100%);
}
</style>
