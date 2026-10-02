import type { Trip } from '@/types'

export const SAMPLE_TRIPS: Trip[] = [
  {
    id: 'trip-manali-2026',
    name: 'Himalayan Serenity & River Valleys',
    destinationIds: ['dest-manali', 'dest-kasol'],
    destinationNames: ['Manali', 'Kasol'],
    coverImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
    startDate: '2026-11-12',
    endDate: '2026-11-16',
    travelersCount: 2,
    travelStyle: 'Mountains',
    startingCity: 'New Delhi',
    budget: {
      transportation: 8000,
      accommodation: 14000,
      food: 9000,
      activities: 6500,
      miscellaneous: 2500
    },
    totalBudget: 40000,
    costPerPerson: 20000,
    status: 'upcoming',
    notes: 'Pack fleece jackets and gloves. Book Rohtang pass pass taxi through government counter in Manali. Try local trout at riverside cafe in Old Manali.',
    createdAt: '2026-09-15T10:00:00Z',
    updatedAt: '2026-09-15T10:00:00Z',
    itinerary: [
      {
        dayNumber: 1,
        date: '12 Nov 2026',
        theme: 'Arrival & Cedar Woods',
        activities: [
          {
            id: 'act-1-1',
            title: 'Check-in & Riverfront Chai',
            description: 'Check into pine-view wooden cottage, enjoy hot ginger honey tea listening to the Beas river.',
            location: 'Old Manali',
            timeOfDay: 'morning',
            estimatedCost: 300
          },
          {
            id: 'act-1-2',
            title: 'Hadimba Temple & Cedar Grove Walk',
            description: 'Walk through ancient deodar woods and admire the carved pagoda wooden temple.',
            location: 'Hadimba Road',
            timeOfDay: 'afternoon',
            estimatedCost: 100
          },
          {
            id: 'act-1-3',
            title: 'Live Acoustic Dinner in Old Manali',
            description: 'Wood-fired oven pizza with local cider at Cafe 1947.',
            location: 'Old Manali Bridge',
            timeOfDay: 'evening',
            estimatedCost: 1400
          }
        ]
      },
      {
        dayNumber: 2,
        date: '13 Nov 2026',
        theme: 'Solang Valley High Altitude Thrills',
        activities: [
          {
            id: 'act-2-1',
            title: 'Solang Valley Ropeway Gondola',
            description: 'Take the cable car to Mount Phatru for panoramic snow-peak views.',
            location: 'Solang Valley',
            timeOfDay: 'morning',
            estimatedCost: 1500
          },
          {
            id: 'act-2-2',
            title: 'Anjani Mahadev Cliff Trek',
            description: 'Short 2km scenic trail to the mountain cliff waterfall and rock shrine.',
            location: 'Upper Solang',
            timeOfDay: 'afternoon',
            estimatedCost: 0
          },
          {
            id: 'act-2-3',
            title: 'Vashisht Geothermal Springs',
            description: 'Soak in the soothing mineral hot water baths followed by rooftop cafe snacks.',
            location: 'Vashisht Village',
            timeOfDay: 'evening',
            estimatedCost: 400
          }
        ]
      },
      {
        dayNumber: 3,
        date: '14 Nov 2026',
        theme: 'Parvati Valley Transfer & Kasol Vibes',
        activities: [
          {
            id: 'act-3-1',
            title: 'Scenic Drive along Beas & Parvati Confluence',
            description: 'Private cab transfer through Kullu valley to Kasol with mountain viewpoint stops.',
            location: 'Bhuntar-Kasol Road',
            timeOfDay: 'morning',
            estimatedCost: 2000
          },
          {
            id: 'act-3-2',
            title: 'Chalal Hamlet Forest Trail',
            description: 'Cross the hanging footbridge across Parvati river into serene deodar paths.',
            location: 'Chalal Village',
            timeOfDay: 'afternoon',
            estimatedCost: 200
          },
          {
            id: 'act-3-3',
            title: 'Israeli Shakshuka & Stargazing',
            description: 'Cozy dinner at Evergreen Cafe followed by crisp mountain stargazing.',
            location: 'Kasol Center',
            timeOfDay: 'evening',
            estimatedCost: 900
          }
        ]
      },
      {
        dayNumber: 4,
        date: '15 Nov 2026',
        theme: 'Tosh Village & Waterfall Views',
        activities: [
          {
            id: 'act-4-1',
            title: 'Morning Hike to Tosh Waterfall',
            description: 'Explore the traditional wooden slate houses and hike up to the glacial stream.',
            location: 'Tosh Village',
            timeOfDay: 'morning',
            estimatedCost: 500
          },
          {
            id: 'act-4-2',
            title: 'Manikaran Sahib Langar & Hot Springs',
            description: 'Visit the revered gurudwara and partake in the community kitchen meal.',
            location: 'Manikaran',
            timeOfDay: 'afternoon',
            estimatedCost: 200
          },
          {
            id: 'act-4-3',
            title: 'Souvenir Shopping & Bonfire',
            description: 'Pick up handwoven wool mufflers and unwind by a pine-wood campfire.',
            location: 'Kasol Market',
            timeOfDay: 'evening',
            estimatedCost: 1200
          }
        ]
      },
      {
        dayNumber: 5,
        date: '16 Nov 2026',
        theme: 'Farewell Mountains',
        activities: [
          {
            id: 'act-5-1',
            title: 'Riverside Meditation & Packing',
            description: 'Final peaceful moments sitting on the smooth river boulders with coffee.',
            location: 'Parvati Riverside',
            timeOfDay: 'morning',
            estimatedCost: 150
          },
          {
            id: 'act-5-2',
            title: 'Departure Transfer to Chandigarh/Delhi',
            description: 'Comfortable Volvo coach journey back home with memories of the hills.',
            location: 'Kasol Bus Stand',
            timeOfDay: 'afternoon',
            estimatedCost: 1800
          }
        ]
      }
    ]
  },
  {
    id: 'trip-rajasthan-2026',
    name: 'Royal Palaces & Sunset Fortresses',
    destinationIds: ['dest-jaipur', 'dest-udaipur'],
    destinationNames: ['Jaipur', 'Udaipur'],
    coverImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    startDate: '2026-02-10',
    endDate: '2026-02-14',
    travelersCount: 2,
    travelStyle: 'Culture',
    startingCity: 'Mumbai',
    budget: {
      transportation: 12000,
      accommodation: 22000,
      food: 11000,
      activities: 7000,
      miscellaneous: 3000
    },
    totalBudget: 55000,
    costPerPerson: 27500,
    status: 'past',
    notes: 'Incredible heritage trip! Do not miss sunset from Nahargarh and the Lake Pichola dusk cruise.',
    createdAt: '2026-01-20T08:00:00Z',
    updatedAt: '2026-02-15T18:00:00Z',
    itinerary: [
      {
        dayNumber: 1,
        date: '10 Feb 2026',
        theme: 'Pink City Grandeur',
        activities: [
          {
            id: 'act-r1-1',
            title: 'Hawa Mahal Dawn View',
            description: 'Witness morning sunlight illuminating the terracotta pink honeycomb facade.',
            location: 'Badi Chaupar, Jaipur',
            timeOfDay: 'morning',
            estimatedCost: 100
          },
          {
            id: 'act-r1-2',
            title: 'City Palace Courtyards',
            description: 'Tour the royal museum and Pritam Niwas Chowk peacock gate.',
            location: 'City Palace, Jaipur',
            timeOfDay: 'afternoon',
            estimatedCost: 800
          },
          {
            id: 'act-r1-3',
            title: 'Sunset at Nahargarh Fort',
            description: 'Watch the entire pink city light up from the mountain ramparts.',
            location: 'Nahargarh, Jaipur',
            timeOfDay: 'evening',
            estimatedCost: 600
          }
        ]
      },
      {
        dayNumber: 2,
        date: '11 Feb 2026',
        theme: 'Amer Fortress & Block Printing',
        activities: [
          {
            id: 'act-r2-1',
            title: 'Amer Fort & Sheesh Mahal',
            description: 'Marvel at the royal mirror chamber and grand sandstone courtyards.',
            location: 'Amer, Jaipur',
            timeOfDay: 'morning',
            estimatedCost: 600
          },
          {
            id: 'act-r2-2',
            title: 'Anokhi Textile Museum Workshop',
            description: 'Hands-on block printing on handmade cotton fabric.',
            location: 'Amer Village',
            timeOfDay: 'afternoon',
            estimatedCost: 400
          },
          {
            id: 'act-r2-3',
            title: 'Traditional Rajasthani Thali',
            description: 'Indulge in authentic Dal Baati Churma with pure ghee.',
            location: 'Chokhi Dhani / MI Road',
            timeOfDay: 'evening',
            estimatedCost: 1600
          }
        ]
      },
      {
        dayNumber: 3,
        date: '12 Feb 2026',
        theme: 'City of Lakes Arrival',
        activities: [
          {
            id: 'act-r3-1',
            title: 'Express Train / Drive to Udaipur',
            description: 'Scenic journey past Aravalli hills to the City of Lakes.',
            location: 'Enroute Udaipur',
            timeOfDay: 'morning',
            estimatedCost: 1800
          },
          {
            id: 'act-r3-2',
            title: 'Check-in to Lakeside Haveli',
            description: 'Unpack at a heritage haveli with private balcony over Lake Pichola.',
            location: 'Lal Ghat, Udaipur',
            timeOfDay: 'afternoon',
            estimatedCost: 0
          },
          {
            id: 'act-r3-3',
            title: 'Sunset Boat Cruise on Lake Pichola',
            description: 'Glide past the floating Taj Lake Palace and Jag Mandir island.',
            location: 'Lake Pichola',
            timeOfDay: 'evening',
            estimatedCost: 1000
          }
        ]
      },
      {
        dayNumber: 4,
        date: '13 Feb 2026',
        theme: 'Udaipur Palaces & Cultural Dance',
        activities: [
          {
            id: 'act-r4-1',
            title: 'Udaipur City Palace Museum',
            description: 'Explore the vast white marble pavilions and colored glass balconies.',
            location: 'City Palace, Udaipur',
            timeOfDay: 'morning',
            estimatedCost: 700
          },
          {
            id: 'act-r4-2',
            title: 'Saheliyon Ki Bari Stroll',
            description: 'Walk past marble elephant fountains and fragrant lotus ponds.',
            location: 'Saheli Marg, Udaipur',
            timeOfDay: 'afternoon',
            estimatedCost: 150
          },
          {
            id: 'act-r4-3',
            title: 'Dharohar Folk Show at Bagore Ki Haveli',
            description: 'Vibrant Rajasthani folk dances, fire pot balancing, and puppet theater.',
            location: 'Gangaur Ghat',
            timeOfDay: 'evening',
            estimatedCost: 400
          }
        ]
      }
    ]
  }
]
