<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDestinationsStore } from '@/stores/destinations'
import { useToastStore } from '@/stores/toast'
import { formatINR } from '@/utils/formatters'
import FavoriteButton from '@/components/ui/FavoriteButton.vue'
import AttractionCard from '@/components/destinations/AttractionCard.vue'
import DestinationCard from '@/components/destinations/DestinationCard.vue'
import MapView from '@/components/ui/MapView.vue'
import {
  MapPin,
  Clock,
  Wallet,
  Calendar,
  Users,
  Share2,
  Check,
  Luggage,
  Bus,
  ShieldCheck,
  BookmarkCheck,
  ArrowRight,
  Sunrise,
  Sun,
  Sunset
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const destinationsStore = useDestinationsStore()
const toastStore = useToastStore()

const destinationSlug = computed(() => String(route.params.slug || ''))

const destination = computed(() => {
  return destinationsStore.getDestinationBySlug(destinationSlug.value)
})

const similarDestinations = computed(() => {
  return destinationsStore.getSimilarDestinations(destinationSlug.value)
})

// Map markers computed from destination attractions
const mapMarkers = computed(() => {
  if (!destination.value) return []
  return destination.value.attractions.map(att => ({
    id: att.id,
    title: att.name,
    description: att.shortDescription,
    coordinates: att.coordinates,
    category: att.category
  }))
})

function handleShare() {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(window.location.href)
    toastStore.showToast('Link copied to clipboard!', 'success')
  } else {
    toastStore.showToast('Destination URL ready to share', 'info')
  }
}

function handlePlanTrip() {
  if (destination.value) {
    router.push(`/plan?destination=${destination.value.slug}`)
  }
}
</script>

<template>
  <div v-if="destination" class="destination-details-view">
    <!-- 1. HERO SECTION -->
    <section class="dest-hero">
      <div class="dest-hero-bg-wrap">
        <img
          :src="destination.coverImage"
          :alt="destination.name"
          class="dest-hero-bg"
        />
        <div class="dest-hero-overlay" />
      </div>

      <div class="container dest-hero-container">
        <div class="dest-hero-content fade-up">
          <div class="dest-hero-top-meta">
            <span class="badge badge-white">
              <MapPin :size="13" />
              {{ destination.state }}, {{ destination.country }}
            </span>
            <span v-for="style in destination.travelStyles" :key="style" class="badge badge-forest">
              {{ style }}
            </span>
          </div>

          <h1 class="dest-hero-title">{{ destination.name }}</h1>
          <p class="dest-hero-tagline">{{ destination.tagline }}</p>

          <div class="dest-hero-actions">
            <button
              type="button"
              class="btn btn-accent btn-lg"
              @click="handlePlanTrip"
            >
              <span>Plan a Trip to {{ destination.name }}</span>
              <ArrowRight :size="18" />
            </button>

            <FavoriteButton
              :destination-id="destination.id"
              variant="badge"
              :show-label="true"
            />

            <button
              type="button"
              class="btn btn-outline-white btn-sm"
              title="Share destination"
              @click="handleShare"
            >
              <Share2 :size="16" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. QUICK INFORMATION STRIP -->
    <section class="quick-info-section">
      <div class="container">
        <div class="quick-info-card">
          <div class="info-item">
            <Wallet :size="20" class="info-icon" />
            <div class="info-meta">
              <span class="info-label">Estimated Budget</span>
              <strong class="info-value">{{ formatINR(destination.estimatedBudget) }}</strong>
              <span class="info-sub">/ person (demo guide)</span>
            </div>
          </div>

          <div class="info-divider" />

          <div class="info-item">
            <Clock :size="20" class="info-icon" />
            <div class="info-meta">
              <span class="info-label">Ideal Duration</span>
              <strong class="info-value">{{ destination.idealDurationText }}</strong>
              <span class="info-sub">{{ destination.idealDurationDays }} days recommended</span>
            </div>
          </div>

          <div class="info-divider" />

          <div class="info-item">
            <Calendar :size="20" class="info-icon" />
            <div class="info-meta">
              <span class="info-label">Best Season</span>
              <strong class="info-value">{{ destination.bestSeasonText }}</strong>
              <span class="info-sub">Optimal weather</span>
            </div>
          </div>

          <div class="info-divider" />

          <div class="info-item">
            <Users :size="20" class="info-icon" />
            <div class="info-meta">
              <span class="info-label">Group Size</span>
              <strong class="info-value">{{ destination.suggestedGroupSize }}</strong>
              <span class="info-sub">Solo & companions</span>
            </div>
          </div>
        </div>
        <p class="quick-info-note">
          *All details provided as general demo guidance, not guaranteed travel advice or live prices.
        </p>
      </div>
    </section>

    <!-- 3. ABOUT THE DESTINATION & GALLERY -->
    <section class="section about-dest-section">
      <div class="container">
        <div class="about-grid">
          <div class="about-text-col">
            <span class="text-eyebrow">ESSENCE & STORY</span>
            <h2>About {{ destination.name }}</h2>
            <p class="dest-long-desc">{{ destination.description }}</p>

            <div class="things-to-do-box">
              <h3>Signature Experiences</h3>
              <ul class="things-list">
                <li v-for="item in destination.thingsToDo" :key="item">
                  <div class="check-circle">
                    <Check :size="14" />
                  </div>
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Photo gallery -->
          <div class="about-gallery-col">
            <div class="gallery-mosaic">
              <div
                v-for="(img, idx) in destination.galleryImages"
                :key="img"
                :class="['gallery-img-wrap', `gallery-item-${idx}`]"
              >
                <img :src="img" :alt="`${destination.name} photo ${idx + 1}`" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. TOP ATTRACTIONS -->
    <section class="section attractions-section">
      <div class="container">
        <div class="section-header">
          <span class="text-eyebrow">MUST-SEE LANDMARKS</span>
          <h2>Top Attractions in {{ destination.name }}</h2>
          <p>Carefully curated highlights, heritage points, and scenic spots you won't want to miss.</p>
        </div>

        <div class="attractions-grid">
          <AttractionCard
            v-for="att in destination.attractions"
            :key="att.id"
            :attraction="att"
          />
        </div>
      </div>
    </section>

    <!-- 5. INTERACTIVE MAP SECTION -->
    <section class="section map-section">
      <div class="container">
        <div class="section-header">
          <span class="text-eyebrow">GEOGRAPHY & SITES</span>
          <h2>Explore on the Map</h2>
          <p>Approximate public coordinates for {{ destination.name }} and nearby landmark attractions.</p>
        </div>

        <MapView
          :center="destination.coordinates"
          :markers="mapMarkers"
          :zoom="12"
          height="450px"
        />
      </div>
    </section>

    <!-- 6. BEST TIME TO VISIT (SEASONAL GUIDE) -->
    <section class="section seasonal-section">
      <div class="container">
        <div class="section-header">
          <span class="text-eyebrow">WEATHER & TIMING</span>
          <h2>Best Time to Visit {{ destination.name }}</h2>
          <p>General seasonal climate conditions and traveler considerations.</p>
        </div>

        <div class="seasons-grid">
          <div
            v-for="guide in destination.seasonalGuides"
            :key="guide.season"
            class="season-card card"
          >
            <h4 class="season-title">{{ guide.season }}</h4>
            <div class="season-weather">
              <span class="weather-label">Climate:</span>
              <p>{{ guide.weather }}</p>
            </div>
            <div class="season-tips">
              <span class="weather-label">Travel Notes:</span>
              <p>{{ guide.considerations }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 7. SAMPLE DAY-BY-DAY ITINERARY -->
    <section class="section sample-itinerary-section">
      <div class="container">
        <div class="section-header">
          <span class="text-eyebrow">INSPIRATION BLUEPRINT</span>
          <h2>Sample {{ destination.sampleItinerary.length }}-Day Itinerary</h2>
          <p>A tested, leisurely day-by-day outline crafted by our travel specialists.</p>
        </div>

        <div class="sample-days-list">
          <div
            v-for="sDay in destination.sampleItinerary"
            :key="sDay.day"
            class="sample-day-card card"
          >
            <div class="sample-day-head">
              <span class="day-badge">Day {{ sDay.day }}</span>
              <h3 class="sample-day-title">{{ sDay.title }}</h3>
            </div>

            <div class="sample-slots-grid">
              <div
                v-for="item in sDay.items"
                :key="item.title"
                class="slot-item"
              >
                <div class="slot-head">
                  <span :class="['slot-time-badge', `slot-${item.timeOfDay}`]">
                    <Sunrise v-if="item.timeOfDay === 'morning'" :size="13" />
                    <Sun v-else-if="item.timeOfDay === 'afternoon'" :size="13" />
                    <Sunset v-else :size="13" />
                    {{ item.timeOfDay }}
                  </span>
                  <span class="slot-place">{{ item.place }}</span>
                </div>
                <h5 class="slot-title">{{ item.title }}</h5>
                <p class="slot-desc">{{ item.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="plan-custom-cta">
          <button
            type="button"
            class="btn btn-primary btn-lg"
            @click="handlePlanTrip"
          >
            <span>Customize This Plan in Trip Planner</span>
            <ArrowRight :size="18" />
          </button>
        </div>
      </div>
    </section>

    <!-- 8. PRACTICAL TRAVEL TIPS -->
    <section class="section tips-section">
      <div class="container">
        <div class="section-header">
          <span class="text-eyebrow">LOCAL ADVICE</span>
          <h2>Practical Travel Tips</h2>
          <p>Helpful advice on packing, local transportation, and mountain safety.</p>
        </div>

        <div class="tips-grid">
          <!-- Packing -->
          <div class="tip-card card">
            <div class="tip-icon-header">
              <Luggage :size="20" class="tip-icon" />
              <h4>Packing Checklist</h4>
            </div>
            <ul class="tip-list">
              <li v-for="t in destination.travelTips.packing" :key="t">
                {{ t }}
              </li>
            </ul>
          </div>

          <!-- Transport -->
          <div class="tip-card card">
            <div class="tip-icon-header">
              <Bus :size="20" class="tip-icon" />
              <h4>Local Transport</h4>
            </div>
            <ul class="tip-list">
              <li v-for="t in destination.travelTips.transport" :key="t">
                {{ t }}
              </li>
            </ul>
          </div>

          <!-- Safety -->
          <div class="tip-card card">
            <div class="tip-icon-header">
              <ShieldCheck :size="20" class="tip-icon" />
              <h4>Safety Reminders</h4>
            </div>
            <ul class="tip-list">
              <li v-for="t in destination.travelTips.safety" :key="t">
                {{ t }}
              </li>
            </ul>
          </div>

          <!-- Booking -->
          <div class="tip-card card">
            <div class="tip-icon-header">
              <BookmarkCheck :size="20" class="tip-icon" />
              <h4>Advance Booking</h4>
            </div>
            <ul class="tip-list">
              <li v-for="t in destination.travelTips.booking" :key="t">
                {{ t }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- 9. SIMILAR DESTINATIONS -->
    <section v-if="similarDestinations.length > 0" class="section similar-section">
      <div class="container">
        <div class="section-header">
          <span class="text-eyebrow">MORE TO EXPLORE</span>
          <h2>Similar Destinations</h2>
          <p>Other retreats offering matching landscapes or cultural heritage.</p>
        </div>

        <div class="similar-grid">
          <DestinationCard
            v-for="sim in similarDestinations"
            :key="sim.id"
            :destination="sim"
          />
        </div>
      </div>
    </section>
  </div>

  <!-- Fallback if slug not found -->
  <div v-else class="container not-found-fallback">
    <h2>Destination Not Found</h2>
    <p>We could not find the destination you are looking for.</p>
    <RouterLink to="/destinations" class="btn btn-primary">
      Browse All Destinations
    </RouterLink>
  </div>
</template>

<style scoped>
.destination-details-view {
  display: flex;
  flex-direction: column;
}

/* 1. HERO */
.dest-hero {
  position: relative;
  min-height: 60vh;
  display: flex;
  align-items: flex-end;
  padding-bottom: 4rem;
  padding-top: 5rem;
}

.dest-hero-bg-wrap {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.dest-hero-bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.dest-hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(23, 61, 53, 0.45) 0%,
    rgba(23, 61, 53, 0.85) 75%,
    rgba(23, 61, 53, 0.96) 100%
  );
}

.dest-hero-container {
  position: relative;
  z-index: 2;
  width: 100%;
}

.dest-hero-content {
  max-width: 820px;
  color: var(--color-white);
}

.dest-hero-top-meta {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin-bottom: 1.25rem;
}

.dest-hero-title {
  font-size: clamp(2.8rem, 6vw, 4.2rem);
  color: var(--color-white);
  line-height: 1.1;
  margin-bottom: 0.75rem;
}

.dest-hero-tagline {
  font-size: 1.25rem;
  color: #E2E8E4;
  line-height: 1.5;
  margin-bottom: 2rem;
}

.dest-hero-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

/* 2. QUICK INFO */
.quick-info-section {
  transform: translateY(-2rem);
  position: relative;
  z-index: 10;
}

.quick-info-card {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 1.75rem 2rem;
  box-shadow: var(--shadow-lg);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  align-items: center;
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.info-icon {
  color: var(--color-terracotta);
  flex-shrink: 0;
  margin-top: 3px;
}

.info-meta {
  display: flex;
  flex-direction: column;
}

.info-label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
}

.info-value {
  font-size: 1.25rem;
  color: var(--color-forest);
  margin: 0.2rem 0;
}

.info-sub {
  font-size: 0.78rem;
  color: var(--color-text-muted);
}

.info-divider {
  display: none;
}

.quick-info-note {
  text-align: center;
  font-size: 0.75rem;
  color: var(--color-text-muted);
  margin-top: 0.75rem;
}

/* 3. ABOUT & GALLERY */
.about-grid {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 3.5rem;
  align-items: center;
}

.dest-long-desc {
  font-size: 1.1rem;
  line-height: 1.7;
  color: var(--color-text-main);
  margin-top: 1rem;
  margin-bottom: 2rem;
}

.things-to-do-box {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
}

.things-to-do-box h3 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: var(--color-forest);
}

.things-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.things-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  font-size: 0.92rem;
  line-height: 1.45;
}

.check-circle {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--color-primary-subtle);
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
}

.gallery-mosaic {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.gallery-img-wrap {
  border-radius: var(--radius-lg);
  overflow: hidden;
  height: 220px;
}

.gallery-item-0 {
  grid-column: span 2;
  height: 260px;
}

.gallery-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.gallery-img-wrap:hover img {
  transform: scale(1.05);
}

/* 4. ATTRACTIONS */
.attractions-section {
  background-color: var(--color-surface);
}

.attractions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 1.75rem;
}

/* 6. SEASONAL */
.seasonal-section {
  background-color: var(--color-surface);
}

.seasons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.75rem;
}

.season-card {
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.season-title {
  font-size: 1.25rem;
  color: var(--color-forest);
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 0.75rem;
}

.weather-label {
  display: block;
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--color-terracotta);
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
}

.season-weather p,
.season-tips p {
  font-size: 0.9rem;
  color: var(--color-text-main);
  line-height: 1.5;
}

/* 7. SAMPLE ITINERARY */
.sample-days-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 2.5rem;
}

.sample-day-card {
  padding: 2rem;
}

.sample-day-head {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--color-border-subtle);
  padding-bottom: 1rem;
}

.day-badge {
  background: var(--color-forest);
  color: var(--color-white);
  padding: 0.35rem 0.85rem;
  border-radius: var(--radius-full);
  font-weight: 700;
  font-size: 0.85rem;
  text-transform: uppercase;
}

.sample-day-title {
  font-size: 1.35rem;
  color: var(--color-forest);
  margin: 0;
}

.sample-slots-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.slot-item {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 1.25rem;
}

.slot-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.slot-time-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  padding: 0.2rem 0.55rem;
  border-radius: var(--radius-full);
}

.slot-morning {
  background: #FFF8E1;
  color: #B78103;
}

.slot-afternoon {
  background: #E8F5E9;
  color: #2E7D32;
}

.slot-evening {
  background: #EDE7F6;
  color: #5E35B1;
}

.slot-place {
  font-size: 0.78rem;
  color: var(--color-text-muted);
}

.slot-title {
  font-size: 1.05rem;
  color: var(--color-forest);
  margin-bottom: 0.35rem;
}

.slot-desc {
  font-size: 0.85rem;
  color: var(--color-text-muted);
  line-height: 1.45;
}

.plan-custom-cta {
  display: flex;
  justify-content: center;
}

/* 8. TRAVEL TIPS */
.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.tip-card {
  padding: 1.75rem;
}

.tip-icon-header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1.25rem;
  border-bottom: 1px solid var(--color-border-subtle);
  padding-bottom: 0.75rem;
}

.tip-icon {
  color: var(--color-primary);
}

.tip-icon-header h4 {
  font-size: 1.15rem;
  color: var(--color-forest);
  margin: 0;
}

.tip-list {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.tip-list li {
  font-size: 0.88rem;
  color: var(--color-text-main);
  line-height: 1.45;
  position: relative;
  padding-left: 1.1rem;
}

.tip-list li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--color-terracotta);
  font-size: 1.2rem;
  line-height: 1;
}

/* 9. SIMILAR */
.similar-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
  gap: 2rem;
}

.not-found-fallback {
  padding: 6rem 1.5rem;
  text-align: center;
}

@media (max-width: 992px) {
  .quick-info-card {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  .about-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .quick-info-card {
    grid-template-columns: 1fr;
  }

  .dest-hero-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .similar-grid,
  .seasons-grid,
  .attractions-grid,
  .tips-grid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  .sample-slots-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .sample-day-card {
    padding: 1.25rem 1rem;
  }
}
</style>
