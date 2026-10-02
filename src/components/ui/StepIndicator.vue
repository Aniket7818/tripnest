<script setup lang="ts">
import { Check } from 'lucide-vue-next'

defineProps<{
  currentStep: number
  steps: { number: number; title: string; subtitle?: string }[]
}>()

const emit = defineEmits<{
  (e: 'selectStep', step: number): void
}>()
</script>

<template>
  <div class="step-indicator" role="navigation" aria-label="Trip planning steps">
    <div
      v-for="step in steps"
      :key="step.number"
      :class="[
        'step-node',
        {
          'is-active': currentStep === step.number,
          'is-completed': currentStep > step.number,
          'is-clickable': step.number < currentStep
        }
      ]"
      @click="step.number < currentStep ? emit('selectStep', step.number) : null"
    >
      <div class="step-bubble">
        <Check v-if="currentStep > step.number" :size="16" stroke-width="3" />
        <span v-else>{{ step.number }}</span>
      </div>
      <div class="step-meta">
        <span class="step-label">Step {{ step.number }}</span>
        <span class="step-title">{{ step.title }}</span>
      </div>
      <div v-if="step.number < steps.length" class="step-connector" />
    </div>
  </div>
</template>

<style scoped>
.step-indicator {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 900px;
  margin: 0 auto 2.5rem;
  padding: 0 1rem;
}

.step-node {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  position: relative;
  flex: 1;
}

.step-node:last-child {
  flex: initial;
}

.step-node.is-clickable {
  cursor: pointer;
}

.step-bubble {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.95rem;
  background: var(--color-beige);
  color: var(--color-text-muted);
  border: 2px solid var(--color-border);
  transition: all var(--transition-normal);
  flex-shrink: 0;
  z-index: 2;
}

.step-node.is-active .step-bubble {
  background: var(--color-primary);
  color: var(--color-white);
  border-color: var(--color-primary);
  box-shadow: 0 0 0 4px var(--color-primary-subtle);
}

.step-node.is-completed .step-bubble {
  background: var(--color-forest);
  color: var(--color-white);
  border-color: var(--color-forest);
}

.step-meta {
  display: flex;
  flex-direction: column;
}

.step-label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
}

.step-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-forest);
  white-space: nowrap;
}

.step-node.is-active .step-title {
  color: var(--color-primary);
}

.step-connector {
  flex: 1;
  height: 2px;
  background: var(--color-border);
  margin: 0 1rem;
  transition: background-color var(--transition-normal);
}

.step-node.is-completed .step-connector {
  background: var(--color-primary);
}

@media (max-width: 768px) {
  .step-meta {
    display: none;
  }
  .step-connector {
    margin: 0 0.5rem;
  }
  .step-bubble {
    width: 32px;
    height: 32px;
    font-size: 0.85rem;
  }
}
</style>
