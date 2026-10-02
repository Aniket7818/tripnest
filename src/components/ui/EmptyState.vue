<script setup lang="ts">
defineProps<{
  title: string
  description: string
  actionText?: string
  actionRoute?: string
}>()

const emit = defineEmits<{
  (e: 'action'): void
}>()
</script>

<template>
  <div class="empty-state">
    <div class="empty-state-icon">
      <slot name="icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="12" cy="12" r="10" />
          <path d="m4.93 4.93 4.24 4.24" />
          <path d="m14.83 9.17 4.24-4.24" />
          <path d="m14.83 14.83 4.24 4.24" />
          <path d="m9.17 14.83-4.24 4.24" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      </slot>
    </div>
    <h3 class="empty-state-title">{{ title }}</h3>
    <p class="empty-state-desc">{{ description }}</p>

    <div v-if="actionText" class="empty-state-action">
      <RouterLink v-if="actionRoute" :to="actionRoute" class="btn btn-primary">
        {{ actionText }}
      </RouterLink>
      <button v-else type="button" class="btn btn-primary" @click="emit('action')">
        {{ actionText }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 3.5rem 1.5rem;
  background: var(--color-surface);
  border: 1px dashed var(--color-border);
  border-radius: var(--radius-xl);
  max-width: 580px;
  margin: 2rem auto;
}

.empty-state-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  border-radius: var(--radius-full);
  background: var(--color-primary-subtle);
  color: var(--color-primary);
  margin-bottom: 1.25rem;
}

.empty-state-title {
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
  color: var(--color-forest);
}

.empty-state-desc {
  color: var(--color-text-muted);
  font-size: 0.95rem;
  max-width: 420px;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.empty-state-action {
  display: flex;
  gap: 0.75rem;
}
</style>
