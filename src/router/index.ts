import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import DestinationsView from '@/views/DestinationsView.vue'
import DestinationDetailsView from '@/views/DestinationDetailsView.vue'
import PlannerView from '@/views/PlannerView.vue'
import MyTripsView from '@/views/MyTripsView.vue'
import TripDetailsView from '@/views/TripDetailsView.vue'
import SavedDestinationsView from '@/views/SavedDestinationsView.vue'
import ExperiencesView from '@/views/ExperiencesView.vue'
import AboutView from '@/views/AboutView.vue'
import ContactView from '@/views/ContactView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'TripNest — Discover More. Travel Better.' }
  },
  {
    path: '/destinations',
    name: 'destinations',
    component: DestinationsView,
    meta: { title: 'Explore Destinations — TripNest' }
  },
  {
    path: '/destinations/:slug',
    name: 'destination-details',
    component: DestinationDetailsView,
    meta: { title: 'Destination Guide — TripNest' }
  },
  {
    path: '/plan',
    name: 'plan',
    component: PlannerView,
    meta: { title: 'Trip Planner & Itinerary Builder — TripNest' }
  },
  {
    path: '/my-trips',
    name: 'my-trips',
    component: MyTripsView,
    meta: { title: 'My Saved Trips — TripNest' }
  },
  {
    path: '/my-trips/:id',
    name: 'trip-details',
    component: TripDetailsView,
    meta: { title: 'Trip Itinerary & Budget — TripNest' }
  },
  {
    path: '/saved',
    name: 'saved',
    component: SavedDestinationsView,
    meta: { title: 'Saved Destinations — TripNest' }
  },
  {
    path: '/experiences',
    name: 'experiences',
    component: ExperiencesView,
    meta: { title: 'Travel Experiences — TripNest' }
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: { title: 'About TripNest — Discover More' }
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView,
    meta: { title: 'Contact Us — TripNest' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView,
    meta: { title: 'Page Not Found — TripNest' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0, behavior: 'smooth' }
  }
})

router.afterEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title as string
  }
})

export default router
