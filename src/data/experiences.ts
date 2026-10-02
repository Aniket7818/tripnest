import type { Experience } from '@/types'

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp-kheerganga',
    title: 'Kheerganga Hot Spring Trek',
    location: 'Parvati Valley, Himachal Pradesh',
    destinationSlug: 'kasol',
    category: 'Trekking',
    duration: '2 Days / 1 Night',
    shortDescription: 'Trek through pine wilderness and roaring river canyons to soak in natural geothermal hot spring baths with 360-degree mountain panoramas.',
    image: 'https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=800&q=80',
    estimatedCost: 3200,
    highlights: ['Natural sulfur pool bath at 9,700 ft', 'Rustic alpine tent stay under star-studded skies', 'Pine woodland trail crossing gushing waterfalls']
  },
  {
    id: 'exp-rishikesh-rafting',
    title: 'White Water Rafting & Cliff Jump Expedition',
    location: 'Rishikesh, Uttarakhand',
    destinationSlug: 'rishikesh',
    category: 'Adventure',
    duration: 'Full Day (6 hours)',
    shortDescription: 'Navigate thrilling Grade III & IV rapids on the turquoise Ganges followed by cliff jumping from natural river ledges.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    estimatedCost: 1800,
    highlights: ['Conquer legendary rapids like The Wall & Roller Coaster', 'Certified rescue kayaker guidance', 'Cliff jump into serene river pools']
  },
  {
    id: 'exp-pangong-camping',
    title: 'Stargazing Camp on Pangong Tso Shores',
    location: 'Leh-Ladakh',
    destinationSlug: 'ladakh',
    category: 'Camping',
    duration: '2 Days / 1 Night',
    shortDescription: 'Sleep beside the cobalt shores of high-altitude Pangong Lake with clear views of the Milky Way arching over rugged trans-Himalayan peaks.',
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80',
    estimatedCost: 4500,
    highlights: ['Zero light-pollution astronomy viewing', 'Insulated Swiss alpine tent with heating', 'Sunrise reflection photography']
  },
  {
    id: 'exp-jaipur-heritage-food',
    title: 'Royal Walled City Culinary Walk',
    location: 'Jaipur, Rajasthan',
    destinationSlug: 'jaipur',
    category: 'Food & Culture',
    duration: '4 Hours',
    shortDescription: 'Sample seven generations of Rajasthani gastronomy: artisanal kachoris, saffron lassi, Dal Baati, and honey-soaked ghewar sweets inside historic bazaars.',
    image: 'https://images.unsplash.com/photo-1609137144822-263a41e9cf0a?auto=format&fit=crop&w=800&q=80',
    estimatedCost: 1500,
    highlights: ['Heritage cookery secrets shared by local halwais', 'Guided walk through century-old spice markets', 'Tasting over 8 signature regional delicacies']
  },
  {
    id: 'exp-munnar-tea-walk',
    title: 'High Peak Tea Plantation & Cloud Walk',
    location: 'Munnar, Kerala',
    destinationSlug: 'munnar',
    category: 'Nature Walks',
    duration: 'Half Day (4 hours)',
    shortDescription: 'A peaceful sunrise walk through mist-veiled estate trails learning the delicate art of two-leaves-and-a-bud tea picking and leaf curing.',
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80',
    estimatedCost: 1200,
    highlights: ['Early morning sea-of-clouds vistas', 'Private tea tasting masterclass with estate planter', 'Scenic trails flanked by silver oak and eucalyptus']
  },
  {
    id: 'exp-goa-sunset-kayak',
    title: 'Backwater Mangrove Kayaking & Sunset',
    location: 'Goa, India',
    destinationSlug: 'goa',
    category: 'Relaxation',
    duration: '3 Hours',
    shortDescription: 'Glide peacefully through untouched mangrove waterways listening to kingfishers and watching the sunset glow over the Arabian Sea backwaters.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    estimatedCost: 1600,
    highlights: ['Serene silence away from crowded tourist beaches', 'Spotting native migratory birds and mudskippers', 'Tender coconut break on a secluded sandy river island']
  },
  {
    id: 'exp-solang-paragliding',
    title: 'Tandem Paragliding Over Solang Valley',
    location: 'Manali, Himachal Pradesh',
    destinationSlug: 'manali',
    category: 'Adventure',
    duration: '2 Hours',
    shortDescription: 'Soar like an eagle with an experienced pilot over pine forests and snow-capped peaks of the Pir Panjal range.',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
    estimatedCost: 3500,
    highlights: ['15-minute flight at 8,000+ ft altitude', 'Action camera video recording included', 'Gentle meadow touchdown']
  },
  {
    id: 'exp-udaipur-heritage-boat',
    title: 'Private Royal Lake Pichola Cruise & Dinner',
    location: 'Udaipur, Rajasthan',
    destinationSlug: 'udaipur',
    category: 'Relaxation',
    duration: '3.5 Hours',
    shortDescription: 'A candlelit sunset boat journey gliding past illuminated white marble palaces with Rajasthani flute music and royal refreshments.',
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80',
    estimatedCost: 3800,
    highlights: ['Unrivaled photo vantage of City Palace from water', 'Traditional sitar and flute melodies on board', 'Chef-crafted regional refreshments']
  }
]
