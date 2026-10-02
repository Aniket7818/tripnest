<script setup lang="ts">
import { Compass, X, Heart, Map, Calendar, HelpCircle, PhoneCall, Sparkles } from 'lucide-vue-next'
import { useSavedStore } from '@/stores/saved'

defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const savedStore = useSavedStore()
</script>

<template>
  <Teleport to="body">
    <Transition name="drawer">
      <div v-if="isOpen" class="mobile-drawer-backdrop" @click="emit('close')">
        <aside class="mobile-drawer" @click.stop>
          <div class="drawer-header">
            <RouterLink to="/" class="brand-link" @click="emit('close')">
              <div class="brand-icon">
                <Compass :size="20" stroke-width="2.2" />
              </div>
              <span class="brand-title">TripNest</span>
            </RouterLink>
            <button
              type="button"
              class="close-btn"
              aria-label="Close navigation menu"
              @click="emit('close')"
            >
              <X :size="20" />
            </button>
          </div>

          <nav class="drawer-nav">
            <RouterLink to="/" class="nav-item" @click="emit('close')">
              <Sparkles :size="18" />
              <span>Discover</span>
            </RouterLink>

            <RouterLink to="/destinations" class="nav-item" @click="emit('close')">
              <Map :size="18" />
              <span>Destinations</span>
            </RouterLink>

            <RouterLink to="/experiences" class="nav-item" @click="emit('close')">
              <Compass :size="18" />
              <span>Experiences</span>
            </RouterLink>

            <RouterLink to="/plan" class="nav-item highlight-item" @click="emit('close')">
              <Calendar :size="18" />
              <span>Plan a Trip</span>
            </RouterLink>

            <RouterLink to="/my-trips" class="nav-item" @click="emit('close')">
              <Map :size="18" />
              <span>My Trips</span>
            </RouterLink>

            <RouterLink to="/saved" class="nav-item" @click="emit('close')">
              <Heart :size="18" />
              <span>Saved Destinations</span>
              <span v-if="savedStore.count > 0" class="badge badge-terracotta ml-auto">
                {{ savedStore.count }}
              </span>
            </RouterLink>

            <div class="drawer-divider" />

            <RouterLink to="/about" class="nav-item sub-item" @click="emit('close')">
              <HelpCircle :size="16" />
              <span>About TripNest</span>
            </RouterLink>

            <RouterLink to="/contact" class="nav-item sub-item" @click="emit('close')">
              <PhoneCall :size="16" />
              <span>Contact Us</span>
            </RouterLink>
          </nav>

          <div class="drawer-footer">
            <RouterLink to="/plan" class="btn btn-primary w-full" @click="emit('close')">
              Start Planning Free
            </RouterLink>
            <p class="demo-tag">Portfolio Demo Application</p>
          </div>
        </aside>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.mobile-drawer-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9995;
  background-color: rgba(23, 61, 53, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: flex-end;
}

.mobile-drawer {
  width: 85%;
  max-width: 340px;
  height: 100%;
  background: var(--color-white);
  box-shadow: var(--shadow-lg);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--color-border);
}

.brand-link {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--font-serif);
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--color-forest);
}

.brand-icon {
  width: 34px;
  height: 34px;
  border-radius: var(--radius-sm);
  background: var(--color-forest);
  color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-full);
  color: var(--color-text-muted);
}

.close-btn:hover {
  background-color: var(--color-beige);
  color: var(--color-text-main);
}

.drawer-nav {
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  flex: 1;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.8rem 1rem;
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--color-text-main);
  transition: all var(--transition-fast);
}

.nav-item:hover,
.nav-item.router-link-active {
  background-color: var(--color-primary-subtle);
  color: var(--color-primary);
}

.highlight-item {
  background-color: var(--color-beige);
  color: var(--color-forest);
}

.sub-item {
  font-size: 0.88rem;
  color: var(--color-text-muted);
}

.ml-auto {
  margin-left: auto;
}

.drawer-divider {
  height: 1px;
  background-color: var(--color-border);
  margin: 0.75rem 0.5rem;
}

.drawer-footer {
  padding: 1.5rem;
  border-top: 1px solid var(--color-border);
  background-color: var(--color-surface);
  text-align: center;
}

.w-full {
  width: 100%;
}

.demo-tag {
  margin-top: 0.75rem;
  font-size: 0.75rem;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Slide Transition */
.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.3s ease;
}

.drawer-enter-active .mobile-drawer,
.drawer-leave-active .mobile-drawer {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}

.drawer-enter-from .mobile-drawer,
.drawer-leave-to .mobile-drawer {
  transform: translateX(100%);
}
</style>
