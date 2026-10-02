<script setup lang="ts">
withDefaults(
  defineProps<{
    width?: string
    height?: string
    borderRadius?: string
    count?: number
  }>(),
  {
    width: '100%',
    height: '20px',
    borderRadius: 'var(--radius-md)',
    count: 1
  }
)
</script>

<template>
  <div class="skeleton-wrapper">
    <div
      v-for="i in count"
      :key="i"
      class="skeleton-item"
      :style="{ width, height, borderRadius }"
    />
  </div>
</template>

<style scoped>
.skeleton-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  width: 100%;
}

.skeleton-item {
  background: linear-gradient(
    90deg,
    var(--color-beige) 25%,
    var(--color-cream) 50%,
    var(--color-beige) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.6s infinite ease-in-out;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
