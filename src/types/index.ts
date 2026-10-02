export type TravelStyle =
  | 'Mountains'
  | 'Beaches'
  | 'Adventure'
  | 'Culture'
  | 'Nature'
  | 'Weekend Getaway'
  | 'City Breaks'

export type BudgetTier =
  | 'under-5000'
  | '5000-10000'
  | '10000-20000'
  | '20000-40000'
  | 'above-40000'

export type DurationTier =
  | '1-2-days'
  | '3-4-days'
  | '5-7-days'
  | '8-plus-days'

export type TimeOfDay = 'morning' | 'afternoon' | 'evening'

export interface Attraction {
  id: string
  name: string
  image: string
  shortDescription: string
  duration: string // e.g. "2-3 hours"
  coordinates: [number, number] // [lat, lng]
  category?: string
}

export interface SeasonalGuide {
  season: string // e.g. "Winter (Nov - Feb)"
  weather: string // e.g. "Chilly crisp mountain air with clear skies (5°C to 15°C)"
  considerations: string // e.g. "Ideal for snow views and cozy cafe visits. Pack heavy woolens."
}

export interface TravelTips {
  packing: string[]
  transport: string[]
  safety: string[]
  booking: string[]
}

export interface SampleItineraryItem {
  timeOfDay: TimeOfDay
  title: string
  description: string
  place: string
}

export interface SampleItineraryDay {
  day: number
  title: string
  items: SampleItineraryItem[]
}

export interface Destination {
  id: string
  slug: string
  name: string
  state: string
  country: string
  tagline: string
  description: string
  coverImage: string
  galleryImages: string[]
  travelStyles: TravelStyle[]
  estimatedBudget: number // numeric INR per person e.g. 12000
  budgetTier: BudgetTier
  idealDurationDays: number // e.g. 4
  durationTier: DurationTier
  idealDurationText: string // e.g. "3–4 Days"
  bestSeasonText: string // e.g. "Oct – Mar"
  suggestedGroupSize: string // e.g. "2–4 Travelers"
  coordinates: [number, number] // [lat, lng]
  featured?: boolean
  popularOrder?: number
  attractions: Attraction[]
  thingsToDo: string[]
  seasonalGuides: SeasonalGuide[]
  sampleItinerary: SampleItineraryDay[]
  travelTips: TravelTips
  similarDestinationSlugs: string[]
}

export interface Experience {
  id: string
  title: string
  location: string
  destinationSlug: string
  category: 'Trekking' | 'Camping' | 'Food & Culture' | 'Nature Walks' | 'Adventure' | 'Relaxation'
  duration: string // e.g. "Full Day", "2 Days"
  shortDescription: string
  image: string
  estimatedCost: number // INR
  highlights: string[]
}

export interface Testimonial {
  id: string
  name: string
  avatar: string
  destination: string
  role: string
  quote: string
  rating: number
}

export interface ItineraryActivity {
  id: string
  title: string
  description: string
  location: string
  timeOfDay: TimeOfDay
  estimatedCost: number // INR
}

export interface ItineraryDay {
  dayNumber: number
  date?: string // formatted date string
  theme?: string
  activities: ItineraryActivity[]
}

export interface BudgetBreakdown {
  transportation: number
  accommodation: number
  food: number
  activities: number
  miscellaneous: number
}

export type BudgetCategoryKey = keyof BudgetBreakdown

export interface Trip {
  id: string
  name: string
  destinationIds: string[]
  destinationNames: string[]
  coverImage?: string
  startDate: string // YYYY-MM-DD
  endDate: string // YYYY-MM-DD
  travelersCount: number
  travelStyle: TravelStyle
  startingCity?: string
  budget: BudgetBreakdown
  totalBudget: number
  costPerPerson: number
  itinerary: ItineraryDay[]
  notes?: string
  createdAt: string // ISO string
  updatedAt: string // ISO string
  status: 'upcoming' | 'past' | 'draft'
}

export interface ContactSubmission {
  id: string
  name: string
  email: string
  subject: string
  message: string
  submittedAt: string
}

export interface DestinationFilterOptions {
  searchQuery: string
  state: string
  travelStyle: string
  budgetTier: string
  durationTier: string
  season: string
  sortBy: 'recommended' | 'name-asc' | 'budget-asc' | 'budget-desc'
}
