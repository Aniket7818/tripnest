<script setup lang="ts">
import { ref } from 'vue'
import { Compass, Heart, ArrowRight } from 'lucide-vue-next'
import { useToastStore } from '@/stores/toast'

const toastStore = useToastStore()
const newsletterEmail = ref('')

function handleSubscribe(e: Event) {
  e.preventDefault()
  if (!newsletterEmail.value || !newsletterEmail.value.includes('@')) {
    toastStore.showToast('Please enter a valid email address', 'error')
    return
  }
  toastStore.showToast('Thank you for subscribing to TripNest travel dispatches!', 'success')
  newsletterEmail.value = ''
}
</script>

<template>
  <footer class="site-footer" role="contentinfo">
    <div class="container footer-content">
      <!-- Brand & Mission Column -->
      <div class="footer-col brand-col">
        <RouterLink to="/" class="footer-brand">
          <div class="footer-brand-icon">
            <Compass :size="20" stroke-width="2.2" />
          </div>
          <span>TripNest</span>
        </RouterLink>
        <p class="footer-tagline">Discover More. Travel Better.</p>
        <p class="footer-desc">
          A modern travel discovery and day-wise itinerary planning platform designed to bring calm, clarity, and inspiration to your journeys.
        </p>
        <div class="demo-notice">
          <span class="demo-tag-pill">Portfolio Project</span>
          <p>Crafted for demonstration purposes. All itineraries, travel estimates, and reviews are illustrative.</p>
        </div>
      </div>

      <!-- Navigation Links Group -->
      <div class="footer-nav-grid">
        <!-- Discovery Links -->
        <div class="footer-col">
          <h4 class="footer-heading">Explore</h4>
          <ul class="footer-links">
            <li><RouterLink to="/destinations">All Destinations</RouterLink></li>
            <li><RouterLink to="/experiences">Travel Experiences</RouterLink></li>
            <li><RouterLink to="/destinations?style=Mountains">Mountain Escapes</RouterLink></li>
            <li><RouterLink to="/destinations?style=Beaches">Coastal Retreats</RouterLink></li>
            <li><RouterLink to="/destinations?style=Culture">Heritage & Forts</RouterLink></li>
          </ul>
        </div>

        <!-- Planner Links -->
        <div class="footer-col">
          <h4 class="footer-heading">Plan & Manage</h4>
          <ul class="footer-links">
            <li><RouterLink to="/plan">Itinerary Wizard</RouterLink></li>
            <li><RouterLink to="/my-trips">Saved Trips Dashboard</RouterLink></li>
            <li><RouterLink to="/saved">Favorite Destinations</RouterLink></li>
            <li><RouterLink to="/about">About TripNest</RouterLink></li>
            <li><RouterLink to="/contact">Get in Touch</RouterLink></li>
          </ul>
        </div>
      </div>

      <!-- Newsletter Column -->
      <div class="footer-col newsletter-col">
        <h4 class="footer-heading">Travel Dispatches</h4>
        <p class="newsletter-desc">
          Subscribe for monthly editorial dispatches, curated route guides, and secret trails.
        </p>
        <form class="newsletter-form" @submit="handleSubscribe">
          <input
            v-model="newsletterEmail"
            type="email"
            placeholder="Enter your email"
            class="newsletter-input"
            aria-label="Email for travel dispatches"
            required
          />
          <button type="submit" class="newsletter-btn" aria-label="Subscribe">
            <ArrowRight :size="18" />
          </button>
        </form>
        <span class="newsletter-guarantee">No spam. Only inspiring journeys.</span>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="footer-bottom">
      <div class="container bottom-inner">
        <p class="copyright">
          &copy; {{ new Date().getFullYear() }} TripNest. Designed & Built with Vue 3 & TypeScript.
        </p>
        <div class="bottom-links">
          <span>Explore with purpose</span>
          <span class="dot">&bull;</span>
          <span>OpenStreetMap &copy; Leaflet</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background-color: var(--color-forest);
  color: #E2E8E4;
  padding-top: 5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: auto;
  width: 100%;
}

.footer-content {
  display: grid;
  grid-template-columns: 1.8fr 2fr 1.5fr;
  gap: 3.5rem;
  padding-bottom: 3.5rem;
}

.footer-nav-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.footer-brand {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  font-family: var(--font-serif);
  font-size: 1.55rem;
  font-weight: 700;
  color: var(--color-white);
  margin-bottom: 0.5rem;
}

.footer-brand-icon {
  width: 34px;
  height: 34px;
  border-radius: var(--radius-sm);
  background-color: var(--color-terracotta);
  color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer-tagline {
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-terracotta);
  margin-bottom: 1rem;
}

.footer-desc {
  font-size: 0.9rem;
  line-height: 1.6;
  color: #BDC8C3;
  margin-bottom: 1.5rem;
  max-width: 360px;
  width: 100%;
}

.demo-notice {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius-md);
  padding: 0.85rem 1rem;
  max-width: 360px;
  width: 100%;
  box-sizing: border-box;
}

.demo-tag-pill {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: var(--color-terracotta);
  color: var(--color-white);
  padding: 0.2rem 0.5rem;
  border-radius: var(--radius-full);
  margin-bottom: 0.4rem;
}

.demo-notice p {
  font-size: 0.8rem;
  color: #BDC8C3;
  line-height: 1.4;
  margin: 0;
}

.footer-heading {
  font-family: var(--font-sans);
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-white);
  margin-bottom: 1.25rem;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-links a {
  font-size: 0.9rem;
  color: #BDC8C3;
  transition: color var(--transition-fast), transform var(--transition-fast);
  display: inline-block;
}

.footer-links a:hover {
  color: var(--color-white);
  transform: translateX(3px);
}

.newsletter-desc {
  font-size: 0.88rem;
  color: #BDC8C3;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.newsletter-form {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: var(--radius-full);
  padding: 0.3rem 0.3rem 0.3rem 1rem;
  transition: border-color var(--transition-fast);
  max-width: 380px;
  width: 100%;
  box-sizing: border-box;
}

.newsletter-form:focus-within {
  border-color: var(--color-terracotta);
}

.newsletter-input {
  background: transparent;
  border: none;
  outline: none;
  color: var(--color-white);
  font-size: 0.88rem;
  flex: 1;
  min-width: 0;
  width: 100%;
}

.newsletter-input::placeholder {
  color: #8C9993;
}

.newsletter-btn {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-full);
  background: var(--color-terracotta);
  color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background-color var(--transition-fast), transform var(--transition-fast);
}

.newsletter-btn:hover {
  background-color: var(--color-terracotta-hover);
  transform: scale(1.05);
}

.newsletter-guarantee {
  display: block;
  font-size: 0.75rem;
  color: #8C9993;
  margin-top: 0.6rem;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding: 1.5rem 0;
  font-size: 0.85rem;
  color: #8C9993;
}

.bottom-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}

.bottom-links {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.dot {
  opacity: 0.5;
}

@media (max-width: 1024px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .footer-nav-grid {
    gap: 2.5rem;
  }
}

@media (max-width: 640px) {
  .site-footer {
    padding-top: 2.75rem;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding-bottom: 2.25rem;
  }

  .footer-nav-grid {
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }

  .demo-notice,
  .footer-desc,
  .newsletter-form {
    max-width: 100%;
  }

  .footer-bottom {
    padding: 1.25rem 0;
  }

  .bottom-inner {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }

  .bottom-links {
    justify-content: center;
    font-size: 0.8rem;
    gap: 0.5rem;
  }

  .copyright {
    font-size: 0.8rem;
  }
}
</style>
