import type { Destination } from '@/types'

export const DESTINATIONS: Destination[] = [
  {
    id: 'dest-manali',
    slug: 'manali',
    name: 'Manali',
    state: 'Himachal Pradesh',
    country: 'India',
    tagline: 'Snow-capped peaks, pine forests & alpine serenity',
    description: 'Nestled on the banks of the Beas River, Manali is a magical Himalayan retreat surrounded by towering snow peaks, ancient pine woodlands, vibrant cafes in Old Manali, and thrilling mountain passes like Rohtang and Solang Valley.',
    coverImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1593181629936-11c609b8db9b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1605649487212-47bdab064df8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
    ],
    travelStyles: ['Mountains', 'Adventure', 'Nature'],
    estimatedBudget: 14500,
    budgetTier: '10000-20000',
    idealDurationDays: 5,
    durationTier: '5-7-days',
    idealDurationText: '4–5 Days',
    bestSeasonText: 'Oct – Jun',
    suggestedGroupSize: '2–4 Travelers',
    coordinates: [32.2396, 77.1887],
    featured: true,
    popularOrder: 1,
    attractions: [
      {
        id: 'att-solang',
        name: 'Solang Valley',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
        shortDescription: 'Epic glaciated valley known for paragliding, zorbing, and winter snow sports.',
        duration: '4–5 hours',
        coordinates: [32.3168, 77.1578],
        category: 'Adventure'
      },
      {
        id: 'att-hadimba',
        name: 'Hadimba Temple',
        image: 'https://images.unsplash.com/photo-1593181629936-11c609b8db9b?auto=format&fit=crop&w=600&q=80',
        shortDescription: 'Historic 16th-century wooden pagoda temple tucked inside lush cedar woods.',
        duration: '1–2 hours',
        coordinates: [32.2483, 77.1804],
        category: 'Heritage'
      },
      {
        id: 'att-oldmanali',
        name: 'Old Manali Cafes & Lanes',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
        shortDescription: 'Bohemian village vibe with artisanal cafes, live indie acoustic music, and mountain bakeries.',
        duration: '3–4 hours',
        coordinates: [32.2562, 77.1850],
        category: 'Culture'
      },
      {
        id: 'att-jogini',
        name: 'Jogini Waterfall Trek',
        image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=600&q=80',
        shortDescription: 'Gentle nature walk through apple orchards leading to cascading mountain waters.',
        duration: '3 hours',
        coordinates: [32.2690, 77.1950],
        category: 'Nature'
      }
    ],
    thingsToDo: [
      'Paragliding over the snow-dusted Solang alpine meadows',
      'Trek through aromatic deodar pine forests to Jogini Falls',
      'Sample trout and wood-fired sourdough pizzas in Old Manali',
      'Drive across the Atal Tunnel into the rugged Lahaul Valley',
      'Soak in the natural sulfur hot springs at Vashisht'
    ],
    seasonalGuides: [
      {
        season: 'Winter (Nov – Feb)',
        weather: 'Cold, snowfall in Solang/Rohtang (-2°C to 10°C)',
        considerations: 'Perfect for snow enthusiasts and winter sports. Pack thermal layers and heavy woolens.'
      },
      {
        season: 'Spring/Summer (Mar – Jun)',
        weather: 'Pleasant and breezy mountain weather (12°C to 26°C)',
        considerations: 'Prime season for sightseeing, paragliding, hiking, and apple orchard blossoms.'
      },
      {
        season: 'Monsoon (Jul – Sep)',
        weather: 'Heavy rainfall and lush mist (14°C to 20°C)',
        considerations: 'Check road advisories before travel; landscape turns dramatically green and tranquil.'
      }
    ],
    sampleItinerary: [
      {
        day: 1,
        title: 'Arrival & Old Manali Heritage',
        items: [
          { timeOfDay: 'morning', title: 'Arrival & Cedar Stroll', place: 'Mall Road & Hadimba Woods', description: 'Check into your stay, savor fresh Himalayan tea, and wander through cedar groves to Hadimba Temple.' },
          { timeOfDay: 'afternoon', title: 'Old Manali Exploration', place: 'Old Manali Village', description: 'Cross the bridge into cobblestone lanes, browse handmade knitwear, and enjoy lunch at a riverside cafe.' },
          { timeOfDay: 'evening', title: 'Sunset at Manaslu River', place: 'Riverside Walk', description: 'Unwind by the sound of gushing streams with hot apple cider and live folk tunes.' }
        ]
      },
      {
        day: 2,
        title: 'High Altitude Thrills in Solang',
        items: [
          { timeOfDay: 'morning', title: 'Drive to Solang Valley', place: 'Solang Alpine Basin', description: 'Early morning mountain drive. Take the ropeway gondola up for panoramic Pir Panjal views.' },
          { timeOfDay: 'afternoon', title: 'Adventure & Valley Walks', place: 'Anjani Mahadev Trail', description: 'Short scenic hike to the cliff shrine and local lunch with Himachali Siddu.' },
          { timeOfDay: 'evening', title: 'Return & Vashisht Springs', place: 'Vashisht Village', description: 'Relax tired muscles in geothermal spring baths and visit rooftop craft cafes.' }
        ]
      },
      {
        day: 3,
        title: 'Waterfalls & Hidden Trails',
        items: [
          { timeOfDay: 'morning', title: 'Jogini Waterfall Hike', place: 'Vashisht to Jogini', description: 'Scenic 4 km trail through pine trees and terraced orchards with panoramic views.' },
          { timeOfDay: 'afternoon', title: 'Picnic by Cascades', place: 'Jogini Falls', description: 'Packed local lunch beside the falls while taking in valley vistas.' },
          { timeOfDay: 'evening', title: 'Souvenir Hunting & Dinner', place: 'Mall Road', description: 'Pick up organic saffron, honey, and handmade shawls before a cozy dinner.' }
        ]
      }
    ],
    travelTips: {
      packing: ['Thermal innerwear and windproof fleece jacket', 'Sturdy broken-in hiking boots', 'Sunscreen SPF 50+ and UV sunglasses', 'Reusable insulated thermos'],
      transport: ['Overnight volvo bus from Delhi/Chandigarh', 'Local taxi union cabs for Rohtang/Solang', 'Rented scooters for Old Manali exploration'],
      safety: ['Carry motion sickness pills for winding hairpin turns', 'Drink plenty of water to acclimatize above 2,000m', 'Verify Rohtang pass permits if planning to cross'],
      booking: ['Book mountain-view stays 3–4 weeks ahead in peak summer', 'Rent snow gear at approved roadside government checkpoints']
    },
    similarDestinationSlugs: ['kasol', 'rishikesh', 'manali']
  },
  {
    id: 'dest-kasol',
    slug: 'kasol',
    name: 'Kasol',
    state: 'Himachal Pradesh',
    country: 'India',
    tagline: 'Parvati Valley sanctuary for dreamers and trekkers',
    description: 'Set alongside the roar of the turquoise Parvati River, Kasol is a tranquil haven beloved by backpackers, trekkers, and peace seekers. It serves as the gateway to legendary treks like Kheerganga and mystical villages like Tosh and Malana.',
    coverImage: 'https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80'
    ],
    travelStyles: ['Mountains', 'Adventure', 'Nature', 'Weekend Getaway'],
    estimatedBudget: 8500,
    budgetTier: '5000-10000',
    idealDurationDays: 3,
    durationTier: '3-4-days',
    idealDurationText: '3–4 Days',
    bestSeasonText: 'Apr – Jun, Sep – Nov',
    suggestedGroupSize: 'Solo or 2–3 Friends',
    coordinates: [32.0100, 77.3152],
    featured: true,
    popularOrder: 2,
    attractions: [
      {
        id: 'att-parvati',
        name: 'Parvati River Trail',
        image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=600&q=80',
        shortDescription: 'Walking paths along the boulder-strewn, crystalline glacial river.',
        duration: '2 hours',
        coordinates: [32.0095, 77.3140],
        category: 'Nature'
      },
      {
        id: 'att-tosh',
        name: 'Tosh Village',
        image: 'https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=600&q=80',
        shortDescription: 'Traditional timber-and-slate village perched at the top edge of the valley.',
        duration: 'Half day',
        coordinates: [32.0160, 77.4520],
        category: 'Culture'
      },
      {
        id: 'att-manikaran',
        name: 'Manikaran Sahib Gurudwara',
        image: 'https://images.unsplash.com/photo-1593181629936-11c609b8db9b?auto=format&fit=crop&w=600&q=80',
        shortDescription: 'Sacred riverfront shrine with steaming natural hot spring kunds.',
        duration: '2–3 hours',
        coordinates: [32.0270, 77.3460],
        category: 'Heritage'
      },
      {
        id: 'att-chalal',
        name: 'Chalal Hamlet',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
        shortDescription: 'Quiet pedestrian settlement across the suspension bridge amid deodar groves.',
        duration: '2 hours',
        coordinates: [32.0145, 77.3200],
        category: 'Nature'
      }
    ],
    thingsToDo: [
      'Cross the suspended cable bridge to bohemian Chalal village',
      'Hike up to Tosh for dramatic views of glacier peaks',
      'Taste shakshuka, falafel, and herbal teas at riverside cafes',
      'Take a holy dip in the natural mineral baths of Manikaran',
      'Stargaze under crystal clear mountain night skies'
    ],
    seasonalGuides: [
      {
        season: 'Spring & Summer (Apr – Jun)',
        weather: 'Crisp sunshine, blooming wildflowers (15°C to 24°C)',
        considerations: 'Best time for hiking trails, camping, and riverside relaxation.'
      },
      {
        season: 'Autumn (Sep – Nov)',
        weather: 'Cool temperatures, golden forest foliage (8°C to 18°C)',
        considerations: 'Clear mountain panoramas and tranquil trails with fewer crowds.'
      },
      {
        season: 'Winter (Dec – Feb)',
        weather: 'Chilly with intermittent valley snow (-3°C to 10°C)',
        considerations: 'Cozy wood-stove cafes; some high altitude trails might be snowy.'
      }
    ],
    sampleItinerary: [
      {
        day: 1,
        title: 'River Whispers & Village Stroll',
        items: [
          { timeOfDay: 'morning', title: 'Reach Kasol & Riverside Chai', place: 'Kasol Market', description: 'Arrive from Bhuntar, settle in a pine-wood cottage, and sip spiced chai beside Parvati river.' },
          { timeOfDay: 'afternoon', title: 'Walk to Chalal Village', place: 'Suspension Bridge to Chalal', description: 'Walk across the river along forested dirt paths to discover tranquil hidden cafes.' },
          { timeOfDay: 'evening', title: 'Sunset Acoustics & Dinner', place: 'Evergreen Cafe', description: 'Enjoy wood-fired pizza and traditional hummus platters with indie music.' }
        ]
      },
      {
        day: 2,
        title: 'Tosh Village & Highland Vistas',
        items: [
          { timeOfDay: 'morning', title: 'Drive to Barshaini', place: 'Valley Road', description: 'Short scenic drive followed by an uphill walk into quaint Tosh.' },
          { timeOfDay: 'afternoon', title: 'Exploration & Waterfall Hike', place: 'Tosh Waterfall', description: 'Walk past wooden carved homes to the waterfall edge overlooking snowy crags.' },
          { timeOfDay: 'evening', title: 'Manikaran Springs', place: 'Manikaran Sahib', description: 'Visit the hot springs and partake in the community langar meal on the journey back.' }
        ]
      },
      {
        day: 3,
        title: 'Pine Forest Meditations',
        items: [
          { timeOfDay: 'morning', title: 'Nature Trail Walk', place: 'Katagla Forest Trail', description: 'Gentle sunrise stroll listening to birds and river flow.' },
          { timeOfDay: 'afternoon', title: 'Artisanal Cafe Hopping', place: 'Kasol Town', description: 'Try freshly baked cinnamon rolls and lemon mint tea.' },
          { timeOfDay: 'evening', title: 'Souvenir Shopping', place: 'Kasol Bazaar', description: 'Pick up handwoven wool beanies, dreamcatchers, and chillum art.' }
        ]
      }
    ],
    travelTips: {
      packing: ['Warm fleece and rainproof shell', 'Power bank (frequent power cuts in high villages)', 'Cash in hand (ATMs often run out of cash)', 'Good grip trekking shoes'],
      transport: ['Buses drop at Bhuntar; take local HRTC bus or cab to Kasol', 'Walking is the best way to explore villages'],
      safety: ['Never venture into the roaring Parvati River currents', 'Stay on marked trails during dusk', 'Respect village rules and local sacred sites'],
      booking: ['Homestays in Tosh and Chalal offer authentic hospitality']
    },
    similarDestinationSlugs: ['manali', 'rishikesh']
  },
  {
    id: 'dest-rishikesh',
    slug: 'rishikesh',
    name: 'Rishikesh',
    state: 'Uttarakhand',
    country: 'India',
    tagline: 'Yoga capital of the world and white-water rapids',
    description: 'Where the emerald Ganges emerges from Himalayan foothills into the plains, Rishikesh balances spiritual devotion with high-octane adventure. Iconic suspension bridges, sunset Ganga Aarti rituals, and thrilling white-water rapids make it truly unforgettable.',
    coverImage: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'
    ],
    travelStyles: ['Adventure', 'Culture', 'Nature', 'Weekend Getaway'],
    estimatedBudget: 9500,
    budgetTier: '5000-10000',
    idealDurationDays: 3,
    durationTier: '3-4-days',
    idealDurationText: '3–4 Days',
    bestSeasonText: 'Sep – Apr',
    suggestedGroupSize: '2–6 Friends & Families',
    coordinates: [30.0869, 78.2676],
    featured: true,
    popularOrder: 3,
    attractions: [
      {
        id: 'att-triveni',
        name: 'Triveni Ghat Evening Aarti',
        image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80',
        shortDescription: 'Mesmerizing synchronized brass lamps and devotional chants along the river steps.',
        duration: '2 hours',
        coordinates: [30.1060, 78.2930],
        category: 'Spiritual'
      },
      {
        id: 'att-shivpuri',
        name: 'Shivpuri River Rafting',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
        shortDescription: 'Grade III & IV white-water rapids through dramatic Himalayan gorges.',
        duration: '4 hours',
        coordinates: [30.1340, 78.3880],
        category: 'Adventure'
      },
      {
        id: 'att-beatles',
        name: 'The Beatles Ashram',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
        shortDescription: 'Graffiti-covered meditation domes inside the Rajaji Tiger Reserve boundary.',
        duration: '2–3 hours',
        coordinates: [30.1130, 78.3120],
        category: 'Heritage'
      },
      {
        id: 'att-neer',
        name: 'Neer Garh Waterfall',
        image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=600&q=80',
        shortDescription: 'Multi-tiered natural swimming pools nestled within green forest cliffs.',
        duration: '3 hours',
        coordinates: [30.1450, 78.3320],
        category: 'Nature'
      }
    ],
    thingsToDo: [
      'Tackle thrilling rapids like The Roller Coaster and Golf Course',
      'Attend the evening Ganga Aarti at Triveni Ghat or Parmarth Niketan',
      'Practice early morning Hatha yoga overlooking the emerald river',
      'Bungee jump from India’s premier platform at Mohan Chatti',
      'Explore vegan wellness cafes with panoramic river terraces'
    ],
    seasonalGuides: [
      {
        season: 'Autumn to Spring (Oct – Apr)',
        weather: 'Pleasant daytime sun and cool refreshing evenings (14°C to 28°C)',
        considerations: 'Prime season for white-water rafting, cliff jumping, and outdoor yoga.'
      },
      {
        season: 'Summer (May – Jun)',
        weather: 'Warm sunny weather (24°C to 38°C)',
        considerations: 'Water sports active until mid-June; mornings and evenings are best for sightseeing.'
      },
      {
        season: 'Monsoon (Jul – Aug)',
        weather: 'Substantial rain; river levels swell (22°C to 30°C)',
        considerations: 'Rafting is closed; perfect for quiet Ayurvedic healing and yoga retreats.'
      }
    ],
    sampleItinerary: [
      {
        day: 1,
        title: 'Spiritual Riverfront & Bridges',
        items: [
          { timeOfDay: 'morning', title: 'Arrival & River View Breakfast', place: 'Tapovan', description: 'Settle into your boutique stay and savor smoothie bowls overlooking Lakshman Jhula.' },
          { timeOfDay: 'afternoon', title: 'Beatles Ashram Walk', place: 'Chaurasi Kutia', description: 'Tour the artistic meditation pods and forest galleries where The Beatles wrote the White Album.' },
          { timeOfDay: 'evening', title: 'Ganga Aarti Ceremony', place: 'Parmarth Niketan', description: 'Witness oil lamps floating down the sacred Ganges accompanied by Vedic chanting.' }
        ]
      },
      {
        day: 2,
        title: 'River Rapids & Jungle Waterfalls',
        items: [
          { timeOfDay: 'morning', title: 'White-Water Rafting Adventure', place: 'Shivpuri to NIM Beach', description: '16 km thrilling descent through Grade III rapids with cliff jump stops.' },
          { timeOfDay: 'afternoon', title: 'Neer Garh Waterfall Hike', place: 'Neer Garh', description: 'Hike up limestone pathways to natural pools and cool off under gentle cascades.' },
          { timeOfDay: 'evening', title: 'Cafe Sunset & Live Kirtan', place: 'Little Buddha Cafe', description: 'Rooftop dinner watching dusk settle over the river valley.' }
        ]
      },
      {
        day: 3,
        title: 'Sunrise Heights & Wellness',
        items: [
          { timeOfDay: 'morning', title: 'Kunjapuri Temple Sunrise', place: 'Kunjapuri Ridge', description: 'Drive up to 1,665m for 360-degree sunrise views over snowy Himalayan peaks.' },
          { timeOfDay: 'afternoon', title: 'Ayurvedic Massage & Rest', place: 'Tapovan Spa', description: 'Rejuvenating herbal oil therapy and relaxed market shopping.' },
          { timeOfDay: 'evening', title: 'Riverfront Meditation & Farewell', place: 'Ghat Steps', description: 'Peaceful moments by the river edge before onward travel.' }
        ]
      }
    ],
    travelTips: {
      packing: ['Quick-dry synthetic clothing for water rafting', 'Water shoes or secure sports sandals', 'Modest attire for ghats and ashrams', 'Mosquito repellent'],
      transport: ['Nearest airport is Dehradun (Jolly Grant, 20 km)', 'Shared autos and electric rickshaws connect Tapovan and Ram Jhula'],
      safety: ['Wear certified life vests and helmets on rafting trips', 'Respect sacred non-alcoholic and vegetarian regulations in holy zones'],
      booking: ['Book rafting slots with certified guides early during weekends']
    },
    similarDestinationSlugs: ['manali', 'kasol']
  },
  {
    id: 'dest-jaipur',
    slug: 'jaipur',
    name: 'Jaipur',
    state: 'Rajasthan',
    country: 'India',
    tagline: 'The Pink City of majestic forts and royal heritage',
    description: 'The storied capital of Rajasthan dazzles with terracotta-hued ramparts, opulent maharajah palaces, celestial observatories, and vibrant bazaars filled with block-print textiles, blue pottery, and silver jewelry.',
    coverImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1609137144822-263a41e9cf0a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80'
    ],
    travelStyles: ['Culture', 'City Breaks'],
    estimatedBudget: 11000,
    budgetTier: '10000-20000',
    idealDurationDays: 3,
    durationTier: '3-4-days',
    idealDurationText: '3–4 Days',
    bestSeasonText: 'Oct – Mar',
    suggestedGroupSize: 'Couples, Families & Solo',
    coordinates: [26.9124, 75.7873],
    featured: true,
    popularOrder: 4,
    attractions: [
      {
        id: 'att-amer',
        name: 'Amer Fort & Palace',
        image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80',
        shortDescription: 'Grand hilltop sandstone fortress showcasing the mirror mosaic Sheesh Mahal.',
        duration: '3–4 hours',
        coordinates: [26.9855, 75.8513],
        category: 'Heritage'
      },
      {
        id: 'att-hawa',
        name: 'Hawa Mahal',
        image: 'https://images.unsplash.com/photo-1609137144822-263a41e9cf0a?auto=format&fit=crop&w=600&q=80',
        shortDescription: 'Iconic five-story pink honeycomb palace with 953 ornate latticed windows.',
        duration: '1–2 hours',
        coordinates: [26.9239, 75.8267],
        category: 'Heritage'
      },
      {
        id: 'att-nahargarh',
        name: 'Nahargarh Fort Sunset Point',
        image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80',
        shortDescription: 'Panoramic fort bastion with breathtaking sunset views over the entire illuminated city.',
        duration: '2 hours',
        coordinates: [26.9374, 75.8155],
        category: 'Viewpoint'
      },
      {
        id: 'att-citypalace',
        name: 'City Palace & Museum',
        image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80',
        shortDescription: 'Living royal complex fusing Rajput, Mughal, and European architecture.',
        duration: '2–3 hours',
        coordinates: [26.9258, 75.8237],
        category: 'Culture'
      }
    ],
    thingsToDo: [
      'Admire the sunrise reflection from the Wind View Cafe opposite Hawa Mahal',
      'Walk through the glittering mirror chamber (Sheesh Mahal) in Amer Fort',
      'Watch city lights flicker from the ramparts of Nahargarh Fort at dusk',
      'Shop for hand-block printed cotton quilts in Johari & Bapu Bazaars',
      'Feast on traditional Dal Baati Churma and Ghewar sweets'
    ],
    seasonalGuides: [
      {
        season: 'Winter (Nov – Feb)',
        weather: 'Pleasant sunshine, cool crisp nights (10°C to 24°C)',
        considerations: 'The ideal time for sightseeing and fort walks; host to the famous Literature Festival.'
      },
      {
        season: 'Shoulder (Mar & Oct)',
        weather: 'Warm afternoons, comfortable mornings (20°C to 32°C)',
        considerations: 'Good balance of lower crowds and manageable temperatures.'
      },
      {
        season: 'Summer (Apr – Jun)',
        weather: 'High heat (32°C to 44°C)',
        considerations: 'Sightsee early morning and late evening; plan air-conditioned museum visits mid-day.'
      }
    ],
    sampleItinerary: [
      {
        day: 1,
        title: 'Old Pink City & Royal Splendor',
        items: [
          { timeOfDay: 'morning', title: 'Hawa Mahal Sunrise & City Palace', place: 'Badi Chaupar', description: 'Photograph the honeycomb facade in morning light followed by courtyards of City Palace.' },
          { timeOfDay: 'afternoon', title: 'Jantar Mantar Astronomical Wonders', place: 'Jantar Mantar', description: 'Explore UNESCO-listed giant sundials and historic celestial measuring instruments.' },
          { timeOfDay: 'evening', title: 'Bazaar Walking Tour', place: 'Johari Bazaar', description: 'Browse blue pottery, silver bangles, and enjoy sweet lassi at the iconic Lassiwala.' }
        ]
      },
      {
        day: 2,
        title: 'Fortresses of the Aravalli Hills',
        items: [
          { timeOfDay: 'morning', title: 'Amer Fort & Sheesh Mahal', place: 'Amer', description: 'Early exploration of the grand courtyards and intricate mirror mosaics.' },
          { timeOfDay: 'afternoon', title: 'Panna Meena Stepwell & Jal Mahal', place: 'Amber Stepwell', description: 'Geometric stepwell photo stop followed by the picturesque water palace on Man Sagar Lake.' },
          { timeOfDay: 'evening', title: 'Sunset from Nahargarh Ramparts', place: 'Nahargarh Fort', description: 'Sip chilled tea while watching the sun dip behind the Aravalli hills.' }
        ]
      },
      {
        day: 3,
        title: 'Crafts, Villages & Gastronomy',
        items: [
          { timeOfDay: 'morning', title: 'Anokhi Block Printing Museum', place: 'Amer Village', description: 'Try your hand at traditional block printing on natural fabrics.' },
          { timeOfDay: 'afternoon', title: 'Royal Thali Tasting', place: 'MI Road', description: 'Indulge in a royal Rajasthani banquet of Dal Baati Churma, Gatte ki Sabzi, and Ker Sangri.' },
          { timeOfDay: 'evening', title: 'Patrika Gate Photography', place: 'Jawahar Circle', description: 'Marvel at the hand-painted arches illustrating Rajasthani culture before departure.' }
        ]
      }
    ],
    travelTips: {
      packing: ['Light breathable cottons for daytime', 'Comfortable walking shoes for fort cobblestones', 'Wide brim sun hat and sunglasses', 'Light jacket for winter evenings'],
      transport: ['Metro connects major transit hubs', 'Uber and auto-rickshaws are readily available throughout the city', 'Jaipur composite tourist pass covers major monuments'],
      safety: ['Politely decline aggressive street vendors outside Amer Fort', 'Stay hydrated during warm midday walks'],
      booking: ['Purchase monument composite tickets online to bypass ticket lines']
    },
    similarDestinationSlugs: ['udaipur', 'rishikesh']
  },
  {
    id: 'dest-udaipur',
    slug: 'udaipur',
    name: 'Udaipur',
    state: 'Rajasthan',
    country: 'India',
    tagline: 'The romantic City of Lakes and whitewashed palaces',
    description: 'Often called the Venice of the East, Udaipur is draped in timeless romance. Surrounded by the gentle Aravalli mountains, its tranquil lakes reflect marble palaces, regal havelis, and sun-drenched ghats where peacocks roam freely.',
    coverImage: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80'
    ],
    travelStyles: ['Culture', 'Weekend Getaway', 'City Breaks'],
    estimatedBudget: 15500,
    budgetTier: '10000-20000',
    idealDurationDays: 4,
    durationTier: '3-4-days',
    idealDurationText: '3–4 Days',
    bestSeasonText: 'Oct – Mar',
    suggestedGroupSize: 'Couples & Small Groups',
    coordinates: [24.5854, 73.7125],
    featured: true,
    popularOrder: 5,
    attractions: [
      {
        id: 'att-citypalace-udr',
        name: 'Udaipur City Palace',
        image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=600&q=80',
        shortDescription: 'Vast white marble palace complex rising majestically over the eastern shore of Lake Pichola.',
        duration: '3 hours',
        coordinates: [24.5764, 73.6835],
        category: 'Heritage'
      },
      {
        id: 'att-pichola',
        name: 'Lake Pichola Sunset Cruise',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
        shortDescription: 'Golden hour boat ride gliding past the floating Jag Mandir and Lake Palace.',
        duration: '1.5 hours',
        coordinates: [24.5750, 73.6780],
        category: 'Scenic'
      },
      {
        id: 'att-bagore',
        name: 'Bagore Ki Haveli',
        image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=600&q=80',
        shortDescription: 'Historic waterfront mansion hosting the vibrant Dharohar Rajasthani folk dance show.',
        duration: '2 hours',
        coordinates: [24.5794, 73.6811],
        category: 'Culture'
      },
      {
        id: 'att-monsoon',
        name: 'Sajjangarh Monsoon Palace',
        image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80',
        shortDescription: 'Mountain-crest palace offering panoramic views over the lakes and sunset hills.',
        duration: '2–3 hours',
        coordinates: [24.5940, 73.6360],
        category: 'Viewpoint'
      }
    ],
    thingsToDo: [
      'Take a romantic sunset boat cruise across serene Lake Pichola',
      'Watch traditional Rajasthani puppetry and folk dances at Bagore Ki Haveli',
      'Wander through the mirror halls and royal balconies of Udaipur City Palace',
      'Enjoy dinner at a candlelit rooftop restaurant overlooking glowing palace lights',
      'Browse miniature paintings and handmade leather journals in Hathipole'
    ],
    seasonalGuides: [
      {
        season: 'Winter (Oct – Mar)',
        weather: 'Pleasant daytime breezes, cool romantic evenings (12°C to 27°C)',
        considerations: 'Prime season for lake walks, boat rides, and heritage sightseeing.'
      },
      {
        season: 'Monsoon (Jul – Sep)',
        weather: 'Lush greenery, replenished lakes, refreshing rain (22°C to 30°C)',
        considerations: 'The lakes fill up, creating a cinematic, verdant countryside landscape.'
      },
      {
        season: 'Summer (Apr – Jun)',
        weather: 'Sunny and warm (28°C to 40°C)',
        considerations: 'Great hotel deals; best experienced with lake cruises at dawn and twilight.'
      }
    ],
    sampleItinerary: [
      {
        day: 1,
        title: 'Lakeside Welcome & Royal Walk',
        items: [
          { timeOfDay: 'morning', title: 'City Palace Exploration', place: 'City Palace Complex', description: 'Marvel at colorful peacock mosaics, glass courtyards, and armory galleries.' },
          { timeOfDay: 'afternoon', title: 'Lakeside Cafe & Jagdish Temple', place: 'Gangaur Ghat', description: 'Sip cold coffee by the ghats and admire 17th-century Indo-Aryan stone carvings.' },
          { timeOfDay: 'evening', title: 'Lake Pichola Sunset Boat Ride', place: 'Rameshwar Ghat', description: 'Cruise gently past Jag Mandir Island as the palaces illuminate in golden glow.' }
        ]
      },
      {
        day: 2,
        title: 'Folk Heritage & Hilltop Sunsets',
        items: [
          { timeOfDay: 'morning', title: 'Saheliyon Ki Bari Gardens', place: 'Fountain Gardens', description: 'Stroll through historic marble elephant fountains and lotus pools.' },
          { timeOfDay: 'afternoon', title: 'Fateh Sagar Lake & Craft Village', place: 'Fateh Sagar', description: 'Walk along the promenade and visit Shilpgram rural arts & craft village.' },
          { timeOfDay: 'evening', title: 'Sajjangarh Monsoon Palace & Folk Show', place: 'Monsoon Peak', description: 'Panoramic sunset followed by the Dharohar folk dance show at Bagore ki Haveli.' }
        ]
      },
      {
        day: 3,
        title: 'Hidden Havelis & Artisan Souvenirs',
        items: [
          { timeOfDay: 'morning', title: 'Ahar Cenotaphs Walk', place: 'Ahar Royal Cenotaphs', description: 'Photograph 400-year-old white marble royal chhatris in peaceful quiet.' },
          { timeOfDay: 'afternoon', title: 'Artisan Workshop & Cooking Class', place: 'Hathipole', description: 'Learn miniature Rajasthani brush painting and sample spicy Laal Maas.' },
          { timeOfDay: 'evening', title: 'Candlelit Rooftop Farewell', place: 'Lakeside Rooftop', description: 'Dine under star-lit skies overlooking the shimmering lake reflections.' }
        ]
      }
    ],
    travelTips: {
      packing: ['Elegant casual wear for palace dinners', 'Comfortable flat footwear for cobblestone slopes', 'Sunglasses and sunscreen', 'Camera with low-light lens for illuminated palaces'],
      transport: ['Walkable old town alleys; autos are best for narrow streets', 'Udaipur Maharana Pratap Airport is 24 km from city center'],
      safety: ['Confirm taxi/auto fare or use ride apps for longer trips', 'Watch your step on algae-slick ghat stairs'],
      booking: ['Book sunset boat slots in advance at City Palace jetty during peak winter']
    },
    similarDestinationSlugs: ['jaipur', 'goa']
  },
  {
    id: 'dest-goa',
    slug: 'goa',
    name: 'Goa',
    state: 'Goa',
    country: 'India',
    tagline: 'Sun-drenched golden beaches, Portuguese villas & tropical bliss',
    description: 'From coconut palm fringes and serene south beaches like Palolem to vibrant beach shacks, heritage Portuguese quarters in Fontainhas, and spicy coastal cuisine, Goa is India’s ultimate coastal sanctuary for unwinding.',
    coverImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80'
    ],
    travelStyles: ['Beaches', 'Nature', 'Culture', 'Weekend Getaway'],
    estimatedBudget: 16000,
    budgetTier: '10000-20000',
    idealDurationDays: 5,
    durationTier: '5-7-days',
    idealDurationText: '4–6 Days',
    bestSeasonText: 'Nov – Mar',
    suggestedGroupSize: 'Solo, Couples & Groups',
    coordinates: [15.2993, 74.1240],
    featured: true,
    popularOrder: 6,
    attractions: [
      {
        id: 'att-palolem',
        name: 'Palolem Beach & Butterfly Beach',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
        shortDescription: 'Crescent-shaped serene bay lined with pastel beach shacks and kayak rentals.',
        duration: 'Half day',
        coordinates: [15.0100, 74.0230],
        category: 'Beach'
      },
      {
        id: 'att-fontainhas',
        name: 'Fontainhas Latin Quarter',
        image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80',
        shortDescription: 'Vibrant UNESCO-heritage neighborhood filled with ochre, blue, and yellow Portuguese villas.',
        duration: '2–3 hours',
        coordinates: [15.4989, 73.8310],
        category: 'Heritage'
      },
      {
        id: 'att-chapora',
        name: 'Chapora Fort & Vagator Sunset',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
        shortDescription: 'Historic red laterite fort overlooking dramatic rocky coves and red cliffs.',
        duration: '2 hours',
        coordinates: [15.6050, 73.7380],
        category: 'Viewpoint'
      },
      {
        id: 'att-dudhsagar',
        name: 'Dudhsagar Waterfalls',
        image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=600&q=80',
        shortDescription: 'Four-tiered milky white waterfall roaring through the Western Ghats jungle.',
        duration: '5 hours',
        coordinates: [15.3144, 74.3143],
        category: 'Adventure'
      }
    ],
    thingsToDo: [
      'Sea kayak during sunrise in the calm waters of Palolem Bay',
      'Stroll through pastel-colored cobblestone alleys of Fontainhas in Panaji',
      'Sip fresh tender coconut water and savor coastal fish curry rice by the sea',
      'Watch spectacular orange sunsets from the cliffs of Vagator and Anjuna',
      'Rent a vintage scooter to cruise along scenic coastal backwaters'
    ],
    seasonalGuides: [
      {
        season: 'Peak Winter (Nov – Feb)',
        weather: 'Sunny tropical beach weather, breezy balmy nights (21°C to 31°C)',
        considerations: 'Vibrant beach shacks, water sports, and sunset music sessions in full swing.'
      },
      {
        season: 'Summer (Mar – May)',
        weather: 'Warm and humid beach sunshine (26°C to 35°C)',
        considerations: 'Quiet beaches, great boutique stay discounts, and warm ocean swims.'
      },
      {
        season: 'Monsoon (Jun – Sep)',
        weather: 'Lush tropical rainfall, emerald paddy fields (24°C to 29°C)',
        considerations: 'Water sports closed; serene paradise for countryside exploring, waterfalls, and nature lovers.'
      }
    ],
    sampleItinerary: [
      {
        day: 1,
        title: 'Heritage Alleys & Riverside Panaji',
        items: [
          { timeOfDay: 'morning', title: 'Arrival & Check-in', place: 'Boutique Stay', description: 'Arrive at your coastal sanctuary and enjoy fresh Goan poi bread and coffee.' },
          { timeOfDay: 'afternoon', title: 'Fontainhas Walking Tour', place: 'Latin Quarter', description: 'Admire terracotta tile roofs, azulejo ceramic tiles, and vintage Portuguese balconies.' },
          { timeOfDay: 'evening', title: 'Mandovi River Sunset Promenade', place: 'Panaji Promenade', description: 'Watch river cruises glide by and dine at an authentic Goan heritage kitchen.' }
        ]
      },
      {
        day: 2,
        title: 'Coastal Cliffs & Northern Sands',
        items: [
          { timeOfDay: 'morning', title: 'Scooter Ride to Anjuna & Vagator', place: 'North Coast Roads', description: 'Wind through coconut groves and sample organic smoothie bowls at coastal garden cafes.' },
          { timeOfDay: 'afternoon', title: 'Chapora Fort Clifftop Walk', place: 'Chapora Ramparts', description: 'Take in panoramic views of the Arabian Sea crashing against red laterite rocks.' },
          { timeOfDay: 'evening', title: 'Sunset Shack & Live Acoustic Beats', place: 'Ashwem Beach', description: 'Watch the sun plunge into the horizon with grilled seafood and beachside bonfires.' }
        ]
      },
      {
        day: 3,
        title: 'Serene South Bays & Backwaters',
        items: [
          { timeOfDay: 'morning', title: 'Kayak Trip in Palolem', place: 'Palolem Beach', description: 'Paddle out to peaceful Monkey Island in gentle morning tides.' },
          { timeOfDay: 'afternoon', title: 'Fresh Catch Lunch & Hammock Nap', place: 'South Beach Shacks', description: 'Feast on freshly caught prawn curry while resting in beachside hammocks.' },
          { timeOfDay: 'evening', title: 'Cabo de Rama Sunset', place: 'Cabo de Rama Cliff', description: 'Perch atop dramatic coastal fortress cliffs for one of India’s most pristine sunset vistas.' }
        ]
      }
    ],
    travelTips: {
      packing: ['Light breathable linen and swimwear', 'Reef-safe sunscreen and wide sun hat', 'Waterproof phone pouch for beach walks', 'Flip flops and light sandals'],
      transport: ['Scooter or car rentals are the most convenient mode of transit (carry valid driving license)', 'Goa Taxi app (GoaMiles) available at Dabolim and MOPA airports'],
      safety: ['Swim only within marked lifeguard flags on beaches', 'Wear helmets when riding rented two-wheelers'],
      booking: ['Book flights and beach cottages well in advance for December holidays']
    },
    similarDestinationSlugs: ['udaipur', 'manali']
  },
  {
    id: 'dest-munnar',
    slug: 'munnar',
    name: 'Munnar',
    state: 'Kerala',
    country: 'India',
    tagline: 'Rolling emerald tea hills, misty valleys & exotic spice gardens',
    description: 'Set at the confluence of three mountain streams in God’s Own Country, Munnar is draped in velvety emerald tea plantations, cool mountain mist, pristine wildlife sanctuaries, and aromatic spice groves.',
    coverImage: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
    ],
    travelStyles: ['Nature', 'Mountains', 'Weekend Getaway'],
    estimatedBudget: 12500,
    budgetTier: '10000-20000',
    idealDurationDays: 4,
    durationTier: '3-4-days',
    idealDurationText: '3–4 Days',
    bestSeasonText: 'Sep – May',
    suggestedGroupSize: 'Couples & Nature Enthusiasts',
    coordinates: [10.0889, 77.0595],
    featured: false,
    popularOrder: 7,
    attractions: [
      {
        id: 'att-kolukkumalai',
        name: 'Kolukkumalai Tea Estate',
        image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=600&q=80',
        shortDescription: 'Highest organic tea plantation in the world known for breathtaking sea-of-clouds sunrise.',
        duration: '4 hours',
        coordinates: [10.0833, 77.2167],
        category: 'Scenic'
      },
      {
        id: 'att-eravikulam',
        name: 'Eravikulam National Park',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
        shortDescription: 'Protected mountain habitat for the endangered Nilgiri Tahr and purple Neelakurinji blossoms.',
        duration: '3 hours',
        coordinates: [10.1989, 77.0620],
        category: 'Wildlife'
      },
      {
        id: 'att-mattupetty',
        name: 'Mattupetty Dam & Lake',
        image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=600&q=80',
        shortDescription: 'Tranquil storage reservoir bordered by tea slopes with speedboating options.',
        duration: '2 hours',
        coordinates: [10.1060, 77.1260],
        category: 'Nature'
      }
    ],
    thingsToDo: [
      'Take an exhilarating 4x4 Jeep ride to Kolukkumalai for the sea-of-clouds sunrise',
      'Walk through manicured tea gardens and learn orthodox leaf processing',
      'Spot wild Nilgiri Tahr mountain goats roaming high alpine ridges',
      'Visit a traditional spice garden to smell fresh cardamom, pepper, and cinnamon',
      'Stay in an eco-treehouse surrounded by mist-drenched canopies'
    ],
    seasonalGuides: [
      {
        season: 'Winter (Nov – Feb)',
        weather: 'Pleasantly cool, misty mornings (10°C to 20°C)',
        considerations: 'Crisp clear skies and ideal weather for trekking and plantation walks.'
      },
      {
        season: 'Summer (Mar – May)',
        weather: 'Cool respite from plains heat (15°C to 25°C)',
        considerations: 'Lush greenery, great flora in bloom, perfect mountain breeze.'
      },
      {
        season: 'Monsoon (Jun – Aug)',
        weather: 'Romantic downpours, misty magic (14°C to 20°C)',
        considerations: 'Ideal for leisurely indoor plantation stays and watching roaring waterfalls.'
      }
    ],
    sampleItinerary: [
      {
        day: 1,
        title: 'Misty Arrival & Tea Heritage',
        items: [
          { timeOfDay: 'morning', title: 'Arrival from Kochi', place: 'Munnar Hills', description: 'Scenic drive through Cheeyappara and Valara waterfalls into the misty hills.' },
          { timeOfDay: 'afternoon', title: 'Tea Museum Tour', place: 'KDHP Tea Museum', description: 'Learn about century-old tea manufacturing methods and sample single-estate black teas.' },
          { timeOfDay: 'evening', title: 'Sunset at Pothamedu Viewpoint', place: 'Pothamedu', description: 'Look out across endless tea valleys as the evening fog rolls in.' }
        ]
      },
      {
        day: 2,
        title: 'High Peak Sunrise & Wildlife',
        items: [
          { timeOfDay: 'morning', title: 'Kolukkumalai Sunrise Expedition', place: 'Kolukkumalai Peak', description: 'Dawn jeep safari over rugged mountain tracks to watch the sun rise above clouds.' },
          { timeOfDay: 'afternoon', title: 'Eravikulam National Park', place: 'Rajamalai', description: 'Board the park safari bus to observe the endangered Nilgiri Tahr mountain goats.' },
          { timeOfDay: 'evening', title: 'Kerala Spice Walk & Warm Dinner', place: 'Spice Garden', description: 'Discover vanilla and clove cultivation followed by traditional Malabar parotta.' }
        ]
      },
      {
        day: 3,
        title: 'Lakes & Pine Woods',
        items: [
          { timeOfDay: 'morning', title: 'Mattupetty Lake Boating', place: 'Mattupetty', description: 'Peaceful boat ride surrounded by reflection of undulating tea slopes.' },
          { timeOfDay: 'afternoon', title: 'Echo Point & Kundala Lake', place: 'Echo Point', description: 'Pedal boat ride among cherry blossom trees and natural acoustic cliffs.' },
          { timeOfDay: 'evening', title: 'Tea & Homemade Chocolates Shopping', place: 'Munnar Market', description: 'Stock up on fresh estate green tea, handmade spices, and chocolates.' }
        ]
      }
    ],
    travelTips: {
      packing: ['Light woolens and sweaters', 'Raincoat or umbrella even in summer', 'Sturdy walking shoes with grip'],
      transport: ['Nearest airport is Cochin International (COK, 110 km)', 'Hired taxi is the most practical way to reach and tour plantations'],
      safety: ['Be cautious on steep winding mountain hairpin roads', 'Do not feed or approach wild animals in reserve zones'],
      booking: ['Book Eravikulam entry passes online to avoid morning ticket lines']
    },
    similarDestinationSlugs: ['manali', 'kasol']
  },
  {
    id: 'dest-ladakh',
    slug: 'ladakh',
    name: 'Leh-Ladakh',
    state: 'Ladakh',
    country: 'India',
    tagline: 'Land of high mountain passes, azure lakes & ancient monasteries',
    description: 'A trans-Himalayan wonderland of stark desert beauty, Ladakh features cobalt skies, ancient cliffside Tibetan Buddhist gompas, world-record high motorable passes, and surreal high-altitude lakes like Pangong Tso.',
    coverImage: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
    ],
    travelStyles: ['Adventure', 'Mountains', 'Nature'],
    estimatedBudget: 32000,
    budgetTier: '20000-40000',
    idealDurationDays: 7,
    durationTier: '5-7-days',
    idealDurationText: '6–8 Days',
    bestSeasonText: 'May – Sep',
    suggestedGroupSize: '2–4 Adventure Seekers',
    coordinates: [34.1526, 77.5771],
    featured: false,
    popularOrder: 8,
    attractions: [
      {
        id: 'att-pangong',
        name: 'Pangong Tso Lake',
        image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=600&q=80',
        shortDescription: 'High-altitude saltwater lake famous for shifting vibrant shades from turquoise to deep cobalt.',
        duration: 'Full Day / Overnight',
        coordinates: [33.7595, 78.6674],
        category: 'Scenic'
      },
      {
        id: 'att-nubra',
        name: 'Nubra Valley & Hunder Dunes',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
        shortDescription: 'Cold mountain desert with white sand dunes and double-humped Bactrian camels.',
        duration: 'Overnight',
        coordinates: [34.5800, 77.5300],
        category: 'Adventure'
      },
      {
        id: 'att-thiksey',
        name: 'Thiksey Monastery',
        image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=600&q=80',
        shortDescription: 'Spectacular multi-tiered gompa resembling the Potala Palace of Lhasa.',
        duration: '2–3 hours',
        coordinates: [34.0560, 77.6670],
        category: 'Heritage'
      }
    ],
    thingsToDo: [
      'Camp beside the mesmerizing turquoise shores of Pangong Lake under millions of stars',
      'Ride across the Khardung La pass at 17,982 ft into Nubra Valley',
      'Witness early morning prayer chantings at Thiksey Monastery',
      'Experience the zero-gravity optical illusion at Magnetic Hill',
      'Sample authentic Ladakhi butter tea and piping hot momos in Leh Market'
    ],
    seasonalGuides: [
      {
        season: 'Peak Summer (Jun – Aug)',
        weather: 'Sunny days, cool crisp evenings (15°C to 25°C)',
        considerations: 'All mountain passes (Manali-Leh and Srinagar-Leh) open; ideal travel window.'
      },
      {
        season: 'Autumn (Sep – Oct)',
        weather: 'Crisp mountain air, golden poplars (5°C to 18°C)',
        considerations: 'Fewer tourists; dramatic landscape colors; pack heavy woolens.'
      },
      {
        season: 'Winter (Nov – Mar)',
        weather: 'Extreme sub-zero cold (-15°C to 2°C)',
        considerations: 'High adventure travelers visiting for frozen river Chadar Trek; flights only.'
      }
    ],
    sampleItinerary: [
      {
        day: 1,
        title: 'Acclimatization in Leh',
        items: [
          { timeOfDay: 'morning', title: 'Arrival at Leh Airport', place: 'Leh Hotel', description: 'Strict mandatory rest for 24 hours to acclimatize safely to 3,500m elevation.' },
          { timeOfDay: 'afternoon', title: 'Hydration & Gentle Stroll', place: 'Leh Bazaar', description: 'Slow-paced walk through the quiet cobblestone market; drink lots of garlic soup.' },
          { timeOfDay: 'evening', title: 'Sunset at Shanti Stupa', place: 'Shanti Stupa', description: 'Gaze over Leh valley and the Indus river as the sun paints the barren mountains gold.' }
        ]
      },
      {
        day: 2,
        title: 'Ancient Monasteries & Royal Palaces',
        items: [
          { timeOfDay: 'morning', title: 'Thiksey Morning Prayers', place: 'Thiksey Gompa', description: 'Listen to the deep resonant horns and chants in the 12-story monastery hall.' },
          { timeOfDay: 'afternoon', title: 'Shey Palace & Rancho School', place: 'Shey', description: 'Historic summer palace of kings and ancient copper-gold Buddha statue.' },
          { timeOfDay: 'evening', title: 'Leh Palace Ramparts', place: 'Leh Town', description: 'Overlook the historic mudbrick old quarter as evening twilight sets.' }
        ]
      },
      {
        day: 3,
        title: 'Over Khardung La to Nubra Valley',
        items: [
          { timeOfDay: 'morning', title: 'Crossing Khardung La', place: 'Khardung La Pass', description: 'Climb through world-famous winding hairpins above 17,900 ft into Nubra Valley.' },
          { timeOfDay: 'afternoon', title: 'Diskit Monastery & Giant Buddha', place: 'Diskit', description: 'Admire the 32m Maitreya Buddha facing down the Shyok river valley.' },
          { timeOfDay: 'evening', title: 'Hunder Sand Dunes & Camels', place: 'Hunder Dunes', description: 'Ride double-humped Bactrian camels amid white desert sands encircled by snowy peaks.' }
        ]
      }
    ],
    travelTips: {
      packing: ['Thermal inner layers, windproof down jacket, and balaclava', 'Heavy-duty lip balm and high SPF sunblock (high UV intensity)', 'Diamox (consult physician for altitude acclimatization)', 'Cash for remote valley stays'],
      transport: ['Inner Line Permits (ILP) required for Nubra & Pangong', 'Self-drive bikes or hired local 4x4 tourist taxis'],
      safety: ['Do not ignore headache or breathlessness; allow 24-48 hours to acclimatize', 'Strictly no littering or plastic disposal in fragile high altitude eco-zones'],
      booking: ['Arrange permits and local Ladakhi vehicle drivers beforehand']
    },
    similarDestinationSlugs: ['manali', 'kasol']
  }
]
