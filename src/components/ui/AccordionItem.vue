<script setup lang="ts">
import { ref } from 'vue'
import { ChevronDown } from 'lucide-vue-next'

const props = withDefaults(
  defineProps<{
    title: string
    initiallyOpen?: boolean
  }>(),
  {
    initiallyOpen: false
  }
)

const isOpen = ref(props.initiallyOpen)

function toggle() {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div :class="['accordion-item', { 'is-open': isOpen }]">
    <button
      type="button"
      class="accordion-trigger"
      :aria-expanded="isOpen"
      @click="toggle"
    >
      <span class="accordion-title">{{ title }}</span>
      <ChevronDown :size="18" class="accordion-icon" />
    </button>
    <div v-show="isOpen" class="accordion-content">
      <div class="accordion-inner">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.accordion-item {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-white);
  overflow: hidden;
  margin-bottom: 0.75rem;
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.accordion-item.is-open {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-sm);
}

.accordion-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.1rem 1.25rem;
  text-align: left;
  font-weight: 600;
  font-size: 1.05rem;
  color: var(--color-forest);
  background: transparent;
  transition: background-color var(--transition-fast);
}

.accordion-trigger:hover {
  background-color: var(--color-surface);
}

.accordion-icon {
  color: var(--color-terracotta);
  transition: transform var(--transition-normal);
  flex-shrink: 0;
  margin-left: 1rem;
}

.accordion-item.is-open .accordion-icon {
  transform: rotate(180deg);
}

.accordion-content {
  border-top: 1px solid var(--color-border-subtle);
}

.accordion-inner {
  padding: 1.25rem;
  color: var(--color-text-main);
  font-size: 0.95rem;
  line-height: 1.6;
}
</style>
