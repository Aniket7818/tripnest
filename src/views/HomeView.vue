<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useDestinationsStore } from '@/stores/destinations'
import { TESTIMONIALS } from '@/data/testimonials'
import SearchPanel from '@/components/destinations/SearchPanel.vue'
import DestinationCard from '@/components/destinations/DestinationCard.vue'
import {
  Compass,
  MapPin,
  Calendar,
  Wallet,
  Heart,
  ArrowRight,
  Star,
  Mountain,
  Sun,
  Flame,
  Landmark,
  ShieldCheck,
  CheckCircle2
} from 'lucide-vue-next'

const router = useRouter()
const destinationsStore = useDestinationsStore()

const popularDestinations = computed(() => destinationsStore.popularDestinations)

const travelStyles = [
  {
    title: 'Mountain Escapes',
    subtitle: 'Alpine serenity, deodar forests & high Himalayan peaks',
    styleParam: 'Mountains',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
    icon: Mountain
  },
  {
    title: 'Beach Getaways',
    subtitle: 'Golden coastal sands, coconut groves & tranquil sunsets',
    styleParam: 'Beaches',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
    icon: Sun
  },
  {
    title: 'Adventure Trails',
    subtitle: 'White water rapids, high mountain passes & wilderness treks',
    styleParam: 'Adventure',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    icon: Flame
  },
  {
    title: 'Cultural Journeys',
    subtitle: 'Centuries-old royal palaces, vibrant bazaars & sacred ghats',
    styleParam: 'Culture',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
    icon: Landmark
  }
]

const features = [
  {
    number: '01',
    title: 'Discover Hidden Gems',
    description: 'Explore verified off-the-beaten-path destinations, quiet river hamlets, and royal heritage trails beyond crowded tourist corridors.',
    icon: Compass
  },
  {
    number: '02',
    title: 'Plan with Ease',
    description: 'Organize day-by-day itineraries with morning, afternoon, and evening slots tailored to your travel companions and pace.',
    icon: Calendar
  },
  {
    number: '03',
    title: 'Know Your Budget',
    description: 'Calculate realistic estimated travel expenses for transport, stays, dining, and activities before you step out of home.',
    icon: Wallet
  },
  {
    number: '04',
    title: 'Save Your Favorites',
    description: 'Keep your favorite dream escapes and finalized itineraries safely synchronized locally on your device for fast access.',
    icon: Heart
  }
]

const steps = [
  {
    step: '01',
    title: 'Discover Your Destination',
    desc: 'Browse scenic destinations categorized by mountains, beaches, heritage, and budget tiers.'
  },
  {
    step: '02',
    title: 'Build Your Itinerary',
    desc: 'Use our intuitive day-wise planner to craft realistic schedules with curated attractions.'
  },
  {
    step: '03',
    title: 'Travel with Confidence',
    desc: 'Print or export your complete day plans and budget estimates to travel with total peace of mind.'
  }
]

function navigateStyle(style: string) {
  destinationsStore.setFilter('travelStyle', style)
  router.push({ path: '/destinations', query: { style } })
}
</script>

<template>
  <div class="home-view">
    <!-- 1. HERO SECTION -->
    <section class="hero-section">
      <div class="hero-bg-container">
        <img
          src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1920&q=85"
          alt="Scenic Himalayan Mountain Landscape"
          class="hero-bg-image"
        />
        <div class="hero-overlay" />
      </div>

      <div class="container hero-container">
        <div class="hero-content fade-up">
          <span class="hero-eyebrow">YOUR NEXT ADVENTURE STARTS HERE</span>
          <h1 class="hero-headline">Find your escape.<br />Create your story.</h1>
          <p class="hero-subtext">
            Discover extraordinary destinations, plan meaningful journeys, and make every trip unforgettable.
          </p>
          <div class="hero-cta-group">
            <RouterLink to="/destinations" class="btn btn-accent btn-lg">
              <span>Explore Destinations</span>
              <ArrowRight :size="18" />
            </RouterLink>
            <RouterLink to="/plan" class="btn btn-outline-white btn-lg">
              Plan Your Trip
            </RouterLink>
          </div>
        </div>

        <!-- Destination Search Panel placed at base of hero -->
        <div class="hero-search-wrapper">
          <SearchPanel />
        </div>
      </div>
    </section>

    <!-- 2. POPULAR DESTINATIONS -->
    <section class="section popular-section">
      <div class="container">
        <div class="section-header">
          <span class="text-eyebrow">HANDPICKED RETREATS</span>
          <h2>Places worth discovering</h2>
          <p>Explore destinations that inspire unforgettable journeys across mountains, coastlines, and historic valleys.</p>
        </div>

        <div class="destinations-grid">
          <DestinationCard
            v-for="dest in popularDestinations"
            :key="dest.id"
            :destination="dest"
          />
        </div>

        <div class="view-all-cta">
          <RouterLink to="/destinations" class="btn btn-outline btn-lg">
            <span>View All Destinations ({{ destinationsStore.destinations.length }})</span>
            <ArrowRight :size="18" />
          </RouterLink>
          <p class="disclaimer-text">
            *All budgets and trip durations are illustrative estimates for planning guidance.
          </p>
        </div>
      </div>
    </section>

    <!-- 3. EXPLORE BY TRAVEL STYLE -->
    <section class="section travel-styles-section">
      <div class="container">
        <div class="section-header">
          <span class="text-eyebrow">TRAVEL BY MOOD</span>
          <h2>Explore by Travel Style</h2>
          <p>Whether you crave brisk alpine winds, sun-drenched coastal waters, or timeless royal citadels.</p>
        </div>

        <div class="styles-grid">
          <div
            v-for="item in travelStyles"
            :key="item.title"
            class="style-card"
            @click="navigateStyle(item.styleParam)"
          >
            <img :src="item.image" :alt="item.title" class="style-bg" loading="lazy" />
            <div class="style-overlay" />
            <div class="style-content">
              <div class="style-icon-bubble">
                <component :is="item.icon" :size="20" />
              </div>
              <h3 class="style-title">{{ item.title }}</h3>
              <p class="style-subtitle">{{ item.subtitle }}</p>
              <button type="button" class="style-explore-btn">
                <span>Explore {{ item.title }}</span>
                <ArrowRight :size="16" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. WHY TRIPNEST? -->
    <section class="section why-section">
      <div class="container">
        <div class="section-header">
          <span class="text-eyebrow">THE TRIPNEST ADVANTAGE</span>
          <h2>Why thoughtful travelers choose TripNest</h2>
          <p>We blend the visual inspiration of a travel magazine with the practical utility of a real-world itinerary builder.</p>
        </div>

        <div class="features-grid">
          <div
            v-for="feat in features"
            :key="feat.title"
            class="feature-card"
          >
            <div class="feat-top">
              <div class="feat-icon-box">
                <component :is="feat.icon" :size="22" />
              </div>
              <span class="feat-num">{{ feat.number }}</span>
            </div>
            <h3 class="feat-title">{{ feat.title }}</h3>
            <p class="feat-desc">{{ feat.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. FEATURED TRAVEL EXPERIENCE BANNER -->
    <section class="section experience-banner-section">
      <div class="container">
        <div class="editorial-banner">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80"
            alt="Himalayan Valley Stream"
            class="banner-bg"
            loading="lazy"
          />
          <div class="banner-overlay" />
          <div class="banner-content">
            <span class="banner-eyebrow">CURATED ADVENTURES</span>
            <h2 class="banner-headline">
              More than destinations.<br />Memories waiting to happen.
            </h2>
            <p class="banner-desc">
              From peaceful mountain mornings in cedar pine groves to vibrant spice markets and starry desert camps, discover experiences that stay with you long after you return.
            </p>
            <RouterLink to="/experiences" class="btn btn-accent btn-lg">
              <span>Explore Experiences</span>
              <ArrowRight :size="18" />
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. HOW IT WORKS -->
    <section class="section how-it-works-section">
      <div class="container">
        <div class="section-header">
          <span class="text-eyebrow">SIMPLE & INTUITIVE</span>
          <h2>How It Works</h2>
          <p>Three effortless steps to transform travel dreams into organized, day-by-day plans.</p>
        </div>

        <div class="steps-grid">
          <div
            v-for="(st, idx) in steps"
            :key="st.step"
            class="step-card"
          >
            <div class="step-num-bubble">{{ st.step }}</div>
            <h3 class="step-heading">{{ st.title }}</h3>
            <p class="step-desc">{{ st.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 7. TESTIMONIALS -->
    <section class="section testimonials-section">
      <div class="container">
        <div class="section-header">
          <span class="text-eyebrow">TRAVELER VOICES</span>
          <h2>Loved by weekenders and long-haul explorers</h2>
          <p>Real stories from demo travelers who planned their dream itineraries with TripNest.</p>
        </div>

        <div class="testimonials-grid">
          <div
            v-for="test in TESTIMONIALS"
            :key="test.id"
            class="testimonial-card card"
          >
            <div class="test-rating">
              <Star
                v-for="star in 5"
                :key="star"
                :size="16"
                class="star-icon"
                fill="#C77B5A"
              />
            </div>
            <p class="test-quote">"{{ test.quote }}"</p>
            <div class="test-author">
              <img :src="test.avatar" :alt="test.name" class="test-avatar" loading="lazy" />
              <div class="test-meta">
                <h4 class="test-name">{{ test.name }}</h4>
                <span class="test-trip">{{ test.destination }}</span>
                <span class="test-role">{{ test.role }}</span>
              </div>
            </div>
          </div>
        </div>

        <p class="demo-test-note">
          *Illustrative demonstration traveler testimonials.
        </p>
      </div>
    </section>

    <!-- 8. FINAL CTA -->
    <section class="final-cta-section">
      <div class="container cta-container">
        <div class="cta-box">
          <h2 class="cta-headline">Your next great journey is just a plan away.</h2>
          <p class="cta-subtitle">
            Explore curated destinations, estimate your budget in INR, and build a stress-free day-wise itinerary in minutes.
          </p>
          <div class="cta-buttons">
            <RouterLink to="/plan" class="btn btn-accent btn-lg">
              Start Planning Free
            </RouterLink>
            <RouterLink to="/destinations" class="btn btn-outline-white btn-lg">
              Explore Destinations
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
}

/* 1. HERO */
.hero-section {
  position: relative;
  min-height: 88vh;
  display: flex;
  align-items: center;
  padding: 5rem 0 4rem;
  overflow: hidden;
}

.hero-bg-container {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.hero-bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: gentleZoom 20s infinite alternate ease-in-out;
}

@keyframes gentleZoom {
  0% { transform: scale(1); }
  100% { transform: scale(1.08); }
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(23, 61, 53, 0.72) 0%,
    rgba(23, 61, 53, 0.8) 60%,
    rgba(23, 61, 53, 0.95) 100%
  );
}

.hero-container {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
}

.hero-content {
  max-width: 680px;
  color: var(--color-white);
}

.hero-eyebrow {
  display: inline-block;
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-terracotta);
  margin-bottom: 1rem;
}

.hero-headline {
  font-size: clamp(2.6rem, 5.5vw, 4.2rem);
  line-height: 1.15;
  color: var(--color-white);
  margin-bottom: 1.25rem;
}

.hero-subtext {
  font-size: 1.15rem;
  line-height: 1.6;
  color: #E2E8E4;
  margin-bottom: 2rem;
  max-width: 580px;
}

.hero-cta-group {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.hero-search-wrapper {
  margin-top: 1rem;
}

/* 2. POPULAR DESTINATIONS */
.popular-section {
  background-color: var(--color-cream);
}

.destinations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
  width: 100%;
}

.view-all-cta {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.disclaimer-text {
  font-size: 0.78rem;
  color: var(--color-text-muted);
}

/* 3. TRAVEL STYLES */
.travel-styles-section {
  background-color: var(--color-surface);
}

.styles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
}

.style-card {
  position: relative;
  height: 380px;
  border-radius: var(--radius-xl);
  overflow: hidden;
  cursor: pointer;
  box-shadow: var(--shadow-md);
  transition: transform var(--transition-normal), box-shadow var(--transition-normal);
}

.style-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
}

.style-bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.style-card:hover .style-bg {
  transform: scale(1.08);
}

.style-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(23, 61, 53, 0.9) 0%,
    rgba(23, 61, 53, 0.3) 50%,
    rgba(23, 61, 53, 0.2) 100%
  );
}

.style-content {
  position: absolute;
  inset: 0;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  color: var(--color-white);
  z-index: 2;
}

.style-icon-bubble {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: var(--color-white);
}

.style-title {
  font-size: 1.55rem;
  color: var(--color-white);
  margin-bottom: 0.35rem;
}

.style-subtitle {
  font-size: 0.88rem;
  color: #D6E0DC;
  line-height: 1.4;
  margin-bottom: 1.25rem;
}

.style-explore-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--color-white);
  font-weight: 600;
  font-size: 0.9rem;
  transition: transform var(--transition-fast);
}

.style-card:hover .style-explore-btn {
  transform: translateX(4px);
  color: var(--color-terracotta);
}

/* 4. WHY SECTION */
.why-section {
  background-color: var(--color-cream);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.75rem;
}

.feature-card {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 2rem 1.75rem;
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition-normal);
}

.feature-card:hover {
  transform: translateY(-4px);
}

.feat-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.feat-icon-box {
  width: 50px;
  height: 50px;
  border-radius: var(--radius-md);
  background-color: var(--color-primary-subtle);
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
}

.feat-num {
  font-family: var(--font-serif);
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--color-terracotta);
  opacity: 0.8;
}

.feat-title {
  font-size: 1.35rem;
  color: var(--color-forest);
  margin-bottom: 0.75rem;
}

.feat-desc {
  font-size: 0.92rem;
  color: var(--color-text-muted);
  line-height: 1.55;
}

/* 5. EDITORIAL BANNER */
.experience-banner-section {
  padding-top: 0;
}

.editorial-banner {
  position: relative;
  border-radius: var(--radius-xl);
  overflow: hidden;
  min-height: 440px;
  display: flex;
  align-items: center;
  padding: 4rem;
}

.banner-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(23, 61, 53, 0.92) 0%,
    rgba(23, 61, 53, 0.8) 50%,
    rgba(23, 61, 53, 0.4) 100%
  );
}

.banner-content {
  position: relative;
  z-index: 2;
  max-width: 600px;
  color: var(--color-white);
}

.banner-eyebrow {
  display: block;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-terracotta);
  margin-bottom: 0.75rem;
}

.banner-headline {
  color: var(--color-white);
  font-size: clamp(2rem, 3.8vw, 2.8rem);
  line-height: 1.2;
  margin-bottom: 1.25rem;
}

.banner-desc {
  color: #D6E0DC;
  font-size: 1.05rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

/* 6. HOW IT WORKS */
.how-it-works-section {
  background-color: var(--color-surface);
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.step-card {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 2.25rem 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.step-num-bubble {
  width: 54px;
  height: 54px;
  border-radius: var(--radius-full);
  background: var(--color-forest);
  color: var(--color-white);
  font-family: var(--font-serif);
  font-size: 1.25rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.step-heading {
  font-size: 1.35rem;
  color: var(--color-forest);
  margin-bottom: 0.75rem;
}

.step-desc {
  font-size: 0.92rem;
  color: var(--color-text-muted);
  line-height: 1.55;
}

/* 7. TESTIMONIALS */
.testimonials-section {
  background-color: var(--color-cream);
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
  gap: 2rem;
  margin-bottom: 1.5rem;
}

.testimonial-card {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.test-rating {
  display: flex;
  gap: 0.25rem;
  margin-bottom: 1rem;
}

.star-icon {
  color: var(--color-terracotta);
}

.test-quote {
  font-size: 0.96rem;
  color: var(--color-text-main);
  line-height: 1.6;
  font-style: italic;
  margin-bottom: 1.5rem;
}

.test-author {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  border-top: 1px solid var(--color-border-subtle);
  padding-top: 1rem;
}

.test-avatar {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-full);
  object-fit: cover;
}

.test-meta {
  display: flex;
  flex-direction: column;
}

.test-name {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-forest);
}

.test-trip {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-terracotta);
}

.test-role {
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.demo-test-note {
  text-align: center;
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

/* 8. FINAL CTA */
.final-cta-section {
  background-color: var(--color-forest);
  padding: 5rem 0;
  color: var(--color-white);
}

.cta-box {
  text-align: center;
  max-width: 680px;
  margin: 0 auto;
}

.cta-headline {
  color: var(--color-white);
  font-size: clamp(2.2rem, 4.5vw, 3.2rem);
  line-height: 1.2;
  margin-bottom: 1rem;
}

.cta-subtitle {
  font-size: 1.15rem;
  color: #D6E0DC;
  line-height: 1.6;
  margin-bottom: 2.5rem;
}

.cta-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

@media (max-width: 900px) {
  .steps-grid {
    grid-template-columns: 1fr;
  }

  .editorial-banner {
    padding: 2.5rem 1.5rem;
  }
}

@media (max-width: 640px) {
  .hero-cta-group {
    flex-direction: column;
    align-items: stretch;
  }

  .destinations-grid,
  .testimonials-grid,
  .features-grid,
  .styles-grid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  .style-card {
    height: 320px;
  }

  .final-cta-section {
    padding: 3.5rem 0;
  }
}
</style>
