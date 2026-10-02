# TripNest — Discover More. Travel Better.

> A premium travel discovery and trip planning platform built with Vue 3 (Composition API), TypeScript, Pinia, and Leaflet.

TripNest combines the visual inspiration of a high-end travel magazine with the practical utility of a modern day-wise itinerary planner and budget estimator.

---

## ✨ Features

- **Curated Destination Discovery:** Explore destinations categorized by travel style (Mountains, Beaches, Adventure, Heritage) and budget tiers.
- **Interactive Leaflet Maps:** Embedded OpenStreetMap tiles with landmark attraction markers and smooth fallback handling.
- **Multi-Step Trip Wizard:**
  - Choose single or multi-destination routes.
  - Set travel dates, travelers count, travel pace, and starting city.
  - Automated day-wise itinerary generation with morning, afternoon, and evening slots.
  - Interactive activity management (add, delete, reorder slots).
- **Realistic Budget Calculator:**
  - Dynamic estimation across stays, transit, meals, and activities.
  - Reactive cost-per-person and total trip calculations in Indian Rupees (INR).
- **Offline & Local Storage Persistence:**
  - Save dream destinations to your favorites.
  - Create and store custom itineraries locally on your device.
- **Print & PDF Ready:** Clean print view formatting for taking itineraries on the road.
- **Responsive Editorial Design:** Pixel-perfect layout across mobile, tablet, and desktop using vanilla CSS and custom design tokens.

---

## 🛠️ Tech Stack

- **Framework:** Vue 3 (Composition API with `<script setup lang="ts">`)
- **Language:** TypeScript
- **Build Tool:** Vite
- **Routing:** Vue Router 4
- **State Management:** Pinia (with LocalStorage synchronization)
- **Maps:** Leaflet & OpenStreetMap
- **Icons:** Lucide Vue Next
- **Date Utilities:** date-fns
- **Styling:** Vanilla CSS with scoped design tokens (No Tailwind or external CSS frameworks)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- pnpm or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Aniket7818/tripnest.git

# Navigate to project directory
cd tripnest

# Install dependencies
pnpm install
# or
npm install
```

### Development Server

```bash
# Start local development server
pnpm dev
# or
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Production Build

```bash
# Build production bundle
pnpm build
# or
npm run build
```

---

## 📂 Project Structure

```
src/
├── assets/         # Static visual assets
├── components/     # Modular Vue components
│   ├── destinations/ # Cards, filters, search panels, drawers
│   ├── experiences/  # Experience showcases
│   ├── layout/       # Navbar, Footer, Mobile Drawer
│   ├── planner/      # Wizard steps, BudgetCalculator, Timeline
│   ├── trips/        # Trip management cards
│   └── ui/           # Buttons, modals, maps, toasts
├── data/           # Static curated datasets (destinations, experiences, testimonials)
├── router/         # Vue Router configuration
├── stores/         # Pinia stores (destinations, trips, saved, toast)
├── styles/         # Global design tokens and reset styles
├── types/          # TypeScript interfaces and domain models
├── utils/          # Formatting helpers (currency, dates)
├── views/          # Route views
├── App.vue         # Root application shell
└── main.ts         # Application entry point
```

---

## 📄 License

MIT License. Designed and developed as a portfolio showcase.
