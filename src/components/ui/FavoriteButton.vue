<script setup lang="ts">
import { computed } from 'vue'
import { Heart } from 'lucide-vue-next'
import { useSavedStore } from '@/stores/saved'

const props = withDefaults(
  defineProps<{
    destinationId: string
    size?: number
    variant?: 'badge' | 'floating' | 'inline'
    showLabel?: boolean
  }>(),
  {
    size: 20,
    variant: 'floating',
    showLabel: false
  }
)

const savedStore = useSavedStore()
const isSaved = computed(() => savedStore.isSaved(props.destinationId))

function handleToggle(e: Event) {
  e.preventDefault()
  e.stopPropagation()
  savedStore.toggleSaved(props.destinationId)
}
</script>

<template>
  <button
    type="button"
    :class="['fav-btn', `fav-btn--${variant}`, { 'is-active': isSaved }]"
    :aria-label="isSaved ? 'Remove from saved destinations' : 'Save destination'"
    :title="isSaved ? 'Remove from saved' : 'Save destination'"
    @click="handleToggle"
  >
    <Heart
      :size="size"
      :class="['fav-icon', { 'is-filled': isSaved }]"
      :fill="isSaved ? 'currentColor' : 'none'"
    />
    <span v-if="showLabel" class="fav-label">
      {{ isSaved ? 'Saved' : 'Save' }}
    </span>
  </button>
</template>

<style scoped>
.fav-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  border-radius: var(--radius-full);
  transition: all var(--transition-fast);
  color: var(--color-forest);
}

.fav-btn:hover {
  transform: scale(1.08);
}

.fav-btn:active {
  transform: scale(0.92);
}

.fav-btn--floating {
  width: 38px;
  height: 38px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  color: var(--color-text-main);
}

.fav-btn--floating:hover {
  background: var(--color-white);
  color: var(--color-terracotta);
}

.fav-btn--floating.is-active {
  color: var(--color-terracotta);
  background: var(--color-white);
}

.fav-btn--badge {
  padding: 0.4rem 0.85rem;
  background: var(--color-beige);
  font-size: 0.85rem;
  font-weight: 600;
}

.fav-btn--badge.is-active {
  background: var(--color-terracotta-subtle);
  color: var(--color-terracotta);
}

.fav-btn--inline {
  padding: 0.5rem;
  background: transparent;
}

.fav-btn.is-active .fav-icon {
  color: var(--color-terracotta);
}

.fav-label {
  font-size: 0.85rem;
  font-weight: 600;
}
</style>
