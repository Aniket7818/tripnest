<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Compass, Search, Heart, Map, Menu, User, Sparkles } from 'lucide-vue-next'
import { useSavedStore } from '@/stores/saved'
import { useScrollPosition } from '@/composables/useScrollPosition'
import MobileMenu from './MobileMenu.vue'

const router = useRouter()
const savedStore = useSavedStore()
const { isScrolled } = useScrollPosition(25)

const isMobileMenuOpen = ref(false)
const showProfileMenu = ref(false)

function openSearch() {
  router.push('/destinations')
}
</script>

<template>
  <header
    :class="[
      'site-navbar',
      { 'is-scrolled': isScrolled }
    ]"
    role="banner"
  >
    <div class="container navbar-inner">
      <!-- Left: Brand Logo -->
      <RouterLink to="/" class="brand-link" aria-label="TripNest Homepage">
        <div class="brand-icon">
          <Compass :size="20" stroke-width="2.2" />
        </div>
        <span class="brand-name">TripNest</span>
      </RouterLink>

      <!-- Center: Primary Nav Links (Desktop) -->
      <nav class="desktop-nav" role="navigation" aria-label="Main Navigation">
        <RouterLink to="/" class="nav-link">Discover</RouterLink>
        <RouterLink to="/destinations" class="nav-link">Destinations</RouterLink>
        <RouterLink to="/experiences" class="nav-link">Experiences</RouterLink>
        <RouterLink to="/plan" class="nav-link plan-link">
          <Sparkles :size="14" class="plan-sparkle" />
          Plan a Trip
        </RouterLink>
        <RouterLink to="/about" class="nav-link">About</RouterLink>
      </nav>

      <!-- Right: Actions & Tools -->
      <div class="navbar-actions">
        <!-- Quick Search -->
        <button
          type="button"
          class="action-icon-btn"
          aria-label="Search destinations"
          title="Search destinations"
          @click="openSearch"
        >
          <Search :size="19" />
        </button>

        <!-- Saved Destinations -->
        <RouterLink
          to="/saved"
          class="action-icon-btn saved-badge-wrapper"
          aria-label="Saved Destinations"
          title="Saved Destinations"
        >
          <Heart :size="19" />
          <span
            v-if="savedStore.count > 0"
            class="counter-badge"
            aria-live="polite"
          >
            {{ savedStore.count }}
          </span>
        </RouterLink>

        <!-- My Trips Button -->
        <RouterLink to="/my-trips" class="btn btn-outline btn-sm my-trips-btn">
          <Map :size="15" />
          <span>My Trips</span>
        </RouterLink>

        <!-- Demo Profile Menu Trigger -->
        <div class="profile-dropdown-wrapper">
          <button
            type="button"
            class="avatar-btn"
            aria-label="User profile menu"
            @click="showProfileMenu = !showProfileMenu"
          >
            <span class="avatar-letter">A</span>
          </button>

          <!-- Dropdown popover -->
          <div v-if="showProfileMenu" class="profile-dropdown" @click="showProfileMenu = false">
            <div class="profile-header">
              <span class="profile-name">Aniket</span>
              <span class="profile-subtitle">demo@tripnest.travel</span>
            </div>
            <div class="profile-links">
              <RouterLink to="/my-trips" class="profile-link">My Saved Trips</RouterLink>
              <RouterLink to="/saved" class="profile-link">Favorite Places</RouterLink>
              <RouterLink to="/plan" class="profile-link">Plan New Itinerary</RouterLink>
            </div>
            <div class="profile-footer">
              <span class="demo-badge">Portfolio Showcase Mode</span>
            </div>
          </div>
        </div>

        <!-- Mobile Hamburger Button -->
        <button
          type="button"
          class="hamburger-btn"
          aria-label="Open mobile navigation menu"
          @click="isMobileMenuOpen = true"
        >
          <Menu :size="22" />
        </button>
      </div>
    </div>

    <!-- Mobile Drawer -->
    <MobileMenu
      :is-open="isMobileMenuOpen"
      @close="isMobileMenuOpen = false"
    />
  </header>
</template>

<style scoped>
.site-navbar {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: rgba(248, 246, 240, 0.92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
  height: var(--nav-height);
  display: flex;
  align-items: center;
  transition: height var(--transition-normal), box-shadow var(--transition-normal), background-color var(--transition-normal);
}

.site-navbar.is-scrolled {
  height: var(--nav-height-scrolled);
  background-color: rgba(255, 255, 255, 0.96);
  box-shadow: var(--shadow-sm);
}

.navbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Brand */
.brand-link {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  color: var(--color-forest);
  font-family: var(--font-serif);
  font-size: 1.45rem;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.brand-icon {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-sm);
  background-color: var(--color-forest);
  color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform var(--transition-fast);
}

.brand-link:hover .brand-icon {
  transform: rotate(15deg);
}

/* Desktop Nav */
.desktop-nav {
  display: flex;
  align-items: center;
  gap: 1.75rem;
}

.nav-link {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-text-main);
  position: relative;
  padding: 0.4rem 0;
  transition: color var(--transition-fast);
}

.nav-link:hover {
  color: var(--color-primary);
}

.nav-link.router-link-active {
  color: var(--color-primary);
}

.nav-link.router-link-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background-color: var(--color-terracotta);
  border-radius: 2px;
}

.plan-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  color: var(--color-forest);
  font-weight: 600;
}

.plan-sparkle {
  color: var(--color-terracotta);
}

/* Actions */
.navbar-actions {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.action-icon-btn {
  width: 38px;
  height: 38px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-forest);
  transition: all var(--transition-fast);
}

.action-icon-btn:hover {
  background-color: var(--color-beige);
  color: var(--color-primary);
}

.saved-badge-wrapper {
  position: relative;
}

.counter-badge {
  position: absolute;
  top: 2px;
  right: 2px;
  min-width: 17px;
  height: 17px;
  border-radius: var(--radius-full);
  background-color: var(--color-terracotta);
  color: var(--color-white);
  font-size: 0.68rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
}

.my-trips-btn {
  padding: 0.45rem 1rem;
}

/* Profile Avatar */
.profile-dropdown-wrapper {
  position: relative;
}

.avatar-btn {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-full);
  background: var(--color-primary);
  color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.85rem;
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition-fast);
}

.avatar-btn:hover {
  transform: scale(1.06);
}

.profile-dropdown {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: 210px;
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  padding: 0.75rem 0;
  z-index: 100;
  animation: fadeIn 0.2s ease;
}

.profile-header {
  padding: 0.5rem 1rem 0.75rem;
  border-bottom: 1px solid var(--color-border-subtle);
  display: flex;
  flex-direction: column;
}

.profile-name {
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--color-forest);
}

.profile-subtitle {
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.profile-links {
  display: flex;
  flex-direction: column;
  padding: 0.4rem 0;
}

.profile-link {
  padding: 0.45rem 1rem;
  font-size: 0.85rem;
  color: var(--color-text-main);
  transition: background var(--transition-fast);
}

.profile-link:hover {
  background-color: var(--color-surface);
  color: var(--color-primary);
}

.profile-footer {
  padding: 0.5rem 1rem 0.25rem;
  border-top: 1px solid var(--color-border-subtle);
}

.demo-badge {
  font-size: 0.7rem;
  color: var(--color-terracotta);
  font-weight: 600;
}

.hamburger-btn {
  display: none;
  width: 38px;
  height: 38px;
  border-radius: var(--radius-md);
  align-items: center;
  justify-content: center;
  color: var(--color-forest);
}

@media (max-width: 992px) {
  .desktop-nav {
    display: none;
  }

  .my-trips-btn {
    display: none;
  }

  .hamburger-btn {
    display: flex;
  }
}

@media (max-width: 480px) {
  .navbar-actions {
    gap: 0.35rem;
  }

  .brand-name {
    font-size: 1.25rem;
  }

  .brand-icon {
    width: 32px;
    height: 32px;
  }

  .action-icon-btn {
    width: 34px;
    height: 34px;
  }

  .avatar-btn {
    width: 32px;
    height: 32px;
  }
}
</style>
