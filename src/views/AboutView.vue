<script setup lang="ts">
import { Compass, Feather, Map, ShieldCheck, Heart, Sparkles, ArrowRight } from 'lucide-vue-next'

const values = [
  {
    icon: Feather,
    title: 'Mindful & Calm Travel',
    description: 'We believe travel is not about ticking off boxes in a checklist, but about moments of stillness, conversation with locals, and breathing mountain air.'
  },
  {
    icon: Map,
    title: 'Practical Clarity',
    description: 'Inspirational photos mean little if you do not know how many days to spend or what expenses to anticipate. We bridge visual delight with honest itineraries.'
  },
  {
    icon: ShieldCheck,
    title: 'Thoughtful Design',
    description: 'Our software aims for clean typography, generous whitespace, and zero visual clutter. No aggressive ads, no popups, no dark patterns.'
  },
  {
    icon: Heart,
    title: 'Respect for Places',
    description: 'Fragile ecosystems in the Himalayas and coastal zones deserve gentle stewardship. We encourage mindful tourism and responsible footsteps.'
  }
]
</script>

<template>
  <div class="about-view">
    <!-- 1. Hero -->
    <header class="about-hero">
      <div class="container hero-inner">
        <span class="text-eyebrow">OUR STORY & VISION</span>
        <h1 class="page-title">Designed for travelers who seek meaning in the journey.</h1>
        <p class="page-subtitle">
          TripNest was born out of a desire to replace overwhelmed browser tabs with calm, beautifully curated travel blueprints.
        </p>
      </div>
    </header>

    <!-- 2. Philosophy -->
    <section class="section philosophy-section">
      <div class="container">
        <div class="philosophy-grid">
          <div class="phil-text">
            <span class="text-eyebrow">THE PHILOSOPHY</span>
            <h2>Travel should inspire calm, not anxiety.</h2>
            <p>
              Planning a trip often turns into an exhausting maze of disjointed blogs, conflicting reviews, and opaque budget estimates. By the time travelers set foot on the train or plane, they are already tired of planning.
            </p>
            <p>
              TripNest reimagines travel discovery. We treat every itinerary like a story with a rhythm — combining peaceful mornings, purposeful afternoon visits, and unhurried evening sunsets.
            </p>
            <div class="quote-card">
              <p>"Discover More. Travel Better."</p>
              <span>— The TripNest Design Principle</span>
            </div>
          </div>
          <div class="phil-media">
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
              alt="Misty Mountain Road"
              class="phil-img"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- 3. Core Values -->
    <section class="section values-section">
      <div class="container">
        <div class="section-header">
          <span class="text-eyebrow">GUIDING PRINCIPLES</span>
          <h2>Values that shape TripNest</h2>
          <p>What drives the experience we build every day for the travel community.</p>
        </div>

        <div class="values-grid">
          <div
            v-for="val in values"
            :key="val.title"
            class="value-card card"
          >
            <div class="val-icon-box">
              <component :is="val.icon" :size="22" />
            </div>
            <h3 class="val-title">{{ val.title }}</h3>
            <p class="val-desc">{{ val.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. How TripNest Helps -->
    <section class="section helps-section">
      <div class="container">
        <div class="helps-card">
          <div class="helps-content">
            <span class="text-eyebrow">THE PRODUCT DIFFERENCE</span>
            <h2>How TripNest Helps Modern Travelers</h2>
            <ul class="helps-list">
              <li>
                <strong>Curated Local Guidance:</strong> We highlight authentic local dishes, secret mountain viewpoints, and cultural etiquettes for every region.
              </li>
              <li>
                <strong>Predictable Budgeting:</strong> Our interactive category estimator provides realistic cost projections in Indian Rupees (INR) across accommodation, dining, and transit.
              </li>
              <li>
                <strong>Offline-Ready Itineraries:</strong> Print your customized day schedules with one click or view them without an internet connection using local browser storage.
              </li>
            </ul>
            <div class="helps-cta">
              <RouterLink to="/plan" class="btn btn-accent btn-lg">
                <span>Start Planning Your Journey</span>
                <ArrowRight :size="18" />
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about-view {
  min-height: 85vh;
}

.about-hero {
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  padding: 4.5rem 0 3.5rem;
  text-align: center;
}

.hero-inner {
  max-width: 780px;
}

.page-title {
  font-size: clamp(2.4rem, 4.5vw, 3.4rem);
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.page-subtitle {
  font-size: 1.15rem;
  color: var(--color-text-muted);
  line-height: 1.6;
}

.philosophy-grid {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 3.5rem;
  align-items: center;
}

.phil-text h2 {
  margin-top: 0.4rem;
  margin-bottom: 1.25rem;
}

.phil-text p {
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--color-text-main);
  margin-bottom: 1.25rem;
}

.quote-card {
  background: var(--color-surface);
  border-left: 4px solid var(--color-terracotta);
  padding: 1.25rem 1.5rem;
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
  margin-top: 1.5rem;
}

.quote-card p {
  font-family: var(--font-serif);
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--color-forest);
  margin-bottom: 0.25rem;
}

.quote-card span {
  font-size: 0.82rem;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.phil-media {
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  height: 440px;
}

.phil-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.values-section {
  background-color: var(--color-surface);
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.75rem;
}

.value-card {
  padding: 2rem;
}

.val-icon-box {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  background: var(--color-primary-subtle);
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.25rem;
}

.val-title {
  font-size: 1.25rem;
  color: var(--color-forest);
  margin-bottom: 0.6rem;
}

.val-desc {
  font-size: 0.92rem;
  color: var(--color-text-muted);
  line-height: 1.6;
}

.helps-card {
  background: var(--color-forest);
  border-radius: var(--radius-xl);
  padding: 4rem 3rem;
  color: var(--color-white);
}

.helps-content {
  max-width: 800px;
  margin: 0 auto;
}

.helps-content h2 {
  color: var(--color-white);
  font-size: 2.2rem;
  margin-top: 0.5rem;
  margin-bottom: 2rem;
}

.helps-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 2.5rem;
}

.helps-list li {
  font-size: 1.05rem;
  color: #D6E0DC;
  line-height: 1.6;
}

.helps-list strong {
  color: var(--color-white);
}

@media (max-width: 900px) {
  .philosophy-grid {
    grid-template-columns: 1fr;
  }

  .helps-card {
    padding: 2.5rem 1.5rem;
  }
}

@media (max-width: 640px) {
  .values-grid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  .about-hero {
    padding: 3rem 0 2rem;
  }
}
</style>
