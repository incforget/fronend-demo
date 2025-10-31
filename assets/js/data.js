// ==================== DEMO DATA INITIALIZATION ====================

// Initialize demo data if not exists
const initializeDemoData = () => {
    if (!storage.get('branches')) {
        storage.set('branches', [
            {
                id: 'dhaka-dhanmondi',
                name: 'Dhanmondi Branch',
                address: 'Road 8, Dhanmondi, Dhaka',
                phone: '+880 2 8616637',
                email: 'dhanmondi@restaurant.com',
                coverImage: 'https://picsum.photos/seed/dhanmondi/800/400.jpg',
                logo: 'https://picsum.photos/seed/logo1/200/200.jpg',
                coordinates: { lat: 23.7465, lng: 90.3760 },
                openingHours: { open: '10:00', close: '22:00' },
                isOpen: true,
                rating: 4.5,
                reviewCount: 234
            },
            {
                id: 'dhaka-gulshan',
                name: 'Gulshan Branch',
                address: 'Gulshan Avenue, Gulshan-1, Dhaka',
                phone: '+880 2 8835462',
                email: 'gulshan@restaurant.com',
                coverImage: 'https://picsum.photos/seed/gulshan/800/400.jpg',
                logo: 'https://picsum.photos/seed/logo2/200/200.jpg',
                coordinates: { lat: 23.7937, lng: 90.4064 },
                openingHours: { open: '11:00', close: '23:00' },
                isOpen: true,
                rating: 4.7,
                reviewCount: 312
            },
            {
                id: 'chittagong',
                name: 'Chittagong Branch',
                address: 'Agrabad, Chittagong',
                phone: '+880 31 654321',
                email: 'ctg@restaurant.com',
                coverImage: 'https://picsum.photos/seed/chittagong/800/400.jpg',
                logo: 'https://picsum.photos/seed/logo3/200/200.jpg',
                coordinates: { lat: 22.3569, lng: 91.7832 },
                openingHours: { open: '10:30', close: '22:30' },
                isOpen: false,
                rating: 4.3,
                reviewCount: 156
            },
            {
                id: 'sylhet',
                name: 'Sylhet Branch',
                address: 'Zindabazar, Sylhet',
                phone: '+880 821 714321',
                email: 'sylhet@restaurant.com',
                coverImage: 'https://picsum.photos/seed/sylhet/800/400.jpg',
                logo: 'https://picsum.photos/seed/logo4/200/200.jpg',
                coordinates: { lat: 24.8949, lng: 91.8687 },
                openingHours: { open: '10:00', close: '22:00' },
                isOpen: true,
                rating: 4.4,
                reviewCount: 198
            },
            {
                id: 'rajshahi',
                name: 'Rajshahi Branch',
                address: 'Shaheb Bazar, Rajshahi',
                phone: '+880 721 774321',
                email: 'rajshahi@restaurant.com',
                coverImage: 'https://picsum.photos/seed/rajshahi/800/400.jpg',
                logo: 'https://picsum.photos/seed/logo5/200/200.jpg',
                coordinates: { lat: 24.3636, lng: 88.6241 },
                openingHours: { open: '11:00', close: '23:00' },
                isOpen: true,
                rating: 4.2,
                reviewCount: 145
            },
            {
                id: 'khulna',
                name: 'Khulna Branch',
                address: 'Khan Jahan Ali Road, Khulna',
                phone: '+880 41 721321',
                email: 'khulna@restaurant.com',
                coverImage: 'https://picsum.photos/seed/khulna/800/400.jpg',
                logo: 'https://picsum.photos/seed/logo6/200/200.jpg',
                coordinates: { lat: 22.8456, lng: 89.5403 },
                openingHours: { open: '10:30', close: '22:30' },
                isOpen: true,
                rating: 4.1,
                reviewCount: 112
            },
            {
                id: 'barisal',
                name: 'Barisal Branch',
                address: 'Sadharan Bima Bhaban, Barisal',
                phone: '+880 431 654321',
                email: 'barisal@restaurant.com',
                coverImage: 'https://picsum.photos/seed/barisal/800/400.jpg',
                logo: 'https://picsum.photos/seed/logo7/200/200.jpg',
                coordinates: { lat: 22.7010, lng: 90.3535 },
                openingHours: { open: '10:00', close: '22:00' },
                isOpen: false,
                rating: 4.0,
                reviewCount: 89
            }
        ]);
    }

    if (!storage.get('menu')) {
        storage.set('menu', {
            'dhaka-dhanmondi': [
                {
                    id: 'item1',
                    name: 'Biryani',
                    description: 'Traditional aromatic rice dish with meat and spices',
                    price: 280,
                    image: 'https://picsum.photos/seed/biryani/300/200.jpg',
                    category: 'Main Course',
                    badges: ['spicy', 'popular'],
                    variants: [
                        { name: 'Chicken', price: 280 },
                        { name: 'Mutton', price: 350 },
                        { name: 'Beef', price: 320 }
                    ],
                    addons: [
                        { name: 'Extra Raita', price: 30 },
                        { name: 'Salad', price: 20 }
                    ],
                    rating: 4.6,
                    reviewCount: 89,
                    isNew: false,
                    isVegetarian: false,
                    containsNuts: false
                },
                {
                    id: 'item2',
                    name: 'Kacchi Biryani',
                    description: 'Premium basmati rice with tender mutton and aromatic spices',
                    price: 450,
                    image: 'https://picsum.photos/seed/kacchi/300/200.jpg',
                    category: 'Main Course',
                    badges: ['spicy', 'chef-special'],
                    variants: [
                        { name: 'Mutton', price: 450 },
                        { name: 'Beef', price: 420 }
                    ],
                    addons: [
                        { name: 'Borhani', price: 40 },
                        { name: 'Salad', price: 20 }
                    ],
                    rating: 4.8,
                    reviewCount: 124,
                    isNew: false,
                    isVegetarian: false,
                    containsNuts: false
                },
                {
                    id: 'item3',
                    name: 'Chicken Tikka',
                    description: 'Grilled chicken marinated in yogurt and spices',
                    price: 220,
                    image: 'https://picsum.photos/seed/tikka/300/200.jpg',
                    category: 'Starters',
                    badges: ['popular'],
                    variants: [
                        { name: 'Half Plate', price: 220 },
                        { name: 'Full Plate', price: 380 }
                    ],
                    addons: [
                        { name: 'Mint Chutney', price: 15 },
                        { name: 'Onion Rings', price: 25 }
                    ],
                    rating: 4.5,
                    reviewCount: 67,
                    isNew: false,
                    isVegetarian: false,
                    containsNuts: false
                },
                {
                    id: 'item4',
                    name: 'Vegetable Pulao',
                    description: 'Fragrant rice cooked with mixed vegetables and spices',
                    price: 180,
                    image: 'https://picsum.photos/seed/pulao/300/200.jpg',
                    category: 'Main Course',
                    badges: ['vegetarian'],
                    variants: [
                        { name: 'Regular', price: 180 },
                        { name: 'Special', price: 220 }
                    ],
                    addons: [
                        { name: 'Raita', price: 30 },
                        { name: 'Papad', price: 15 }
                    ],
                    rating: 4.3,
                    reviewCount: 45,
                    isNew: true,
                    isVegetarian: true,
                    containsNuts: false
                },
                {
                    id: 'item5',
                    name: 'Fuchka',
                    description: 'Crispy hollow spheres filled with spicy tamarind water',
                    price: 60,
                    image: 'https://picsum.photos/seed/fuchka/300/200.jpg',
                    category: 'Snacks',
                    badges: ['popular', 'spicy'],
                    variants: [
                        { name: '6 Pieces', price: 60 },
                        { name: '10 Pieces', price: 90 }
                    ],
                    addons: [
                        { name: 'Extra Tamarind Water', price: 10 }
                    ],
                    rating: 4.7,
                    reviewCount: 156,
                    isNew: false,
                    isVegetarian: true,
                    containsNuts: false
                },
                {
                    id: 'item6',
                    name: 'Bengali Thali',
                    description: 'Complete meal with rice, dal, vegetables, fish curry and dessert',
                    price: 350,
                    image: 'https://picsum.photos/seed/thali/300/200.jpg',
                    category: 'Main Course',
                    badges: ['popular'],
                    variants: [
                        { name: 'Regular', price: 350 },
                        { name: 'Large', price: 450 }
                    ],
                    addons: [
                        { name: 'Extra Fish', price: 80 },
                        { name: 'Extra Rice', price: 30 }
                    ],
                    rating: 4.6,
                    reviewCount: 98,
                    isNew: false,
                    isVegetarian: false,
                    containsNuts: false
                },
                {
                    id: 'item7',
                    name: 'Misti Doi',
                    description: 'Traditional sweet yogurt',
                    price: 50,
                    image: 'https://picsum.photos/seed/misti/300/200.jpg',
                    category: 'Desserts',
                    badges: ['vegetarian'],
                    variants: [
                        { name: 'Small', price: 50 },
                        { name: 'Large', price: 80 }
                    ],
                    addons: [],
                    rating: 4.4,
                    reviewCount: 76,
                    isNew: false,
                    isVegetarian: true,
                    containsNuts: false
                },
                {
                    id: 'item8',
                    name: 'Roshogolla',
                    description: 'Soft spongy cheese balls in sugar syrup',
                    price: 40,
                    image: 'https://picsum.photos/seed/roshogolla/300/200.jpg',
                    category: 'Desserts',
                    badges: ['vegetarian'],
                    variants: [
                        { name: '4 Pieces', price: 40 },
                        { name: '8 Pieces', price: 70 }
                    ],
                    addons: [],
                    rating: 4.5,
                    reviewCount: 62,
                    isNew: false,
                    isVegetarian: true,
                    containsNuts: false
                },
                {
                    id: 'item9',
                    name: 'Lassi',
                    description: 'Refreshing yogurt drink',
                    price: 70,
                    image: 'https://picsum.photos/seed/lassi/300/200.jpg',
                    category: 'Beverages',
                    badges: ['vegetarian'],
                    variants: [
                        { name: 'Sweet', price: 70 },
                        { name: 'Salty', price: 70 },
                        { name: 'Mango', price: 90 }
                    ],
                    addons: [],
                    rating: 4.3,
                    reviewCount: 48,
                    isNew: true,
                    isVegetarian: true,
                    containsNuts: false
                },
                {
                    id: 'item10',
                    name: 'Alu Kabli',
                    description: 'Spicy potato chaat with chickpeas',
                    price: 80,
                    image: 'https://picsum.photos/seed/alukabli/300/200.jpg',
                    category: 'Snacks',
                    badges: ['vegetarian', 'spicy'],
                    variants: [
                        { name: 'Regular', price: 80 },
                        { name: 'Large', price: 120 }
                    ],
                    addons: [
                        { name: 'Extra Lemon', price: 5 },
                        { name: 'Extra Onion', price: 10 }
                    ],
                    rating: 4.2,
                    reviewCount: 34,
                    isNew: false,
                    isVegetarian: true,
                    containsNuts: false
                }
            ],
            'dhaka-gulshan': [
                {
                    id: 'gulshan-item1',
                    name: 'Premium Biryani',
                    description: 'Special biryani with premium ingredients and saffron',
                    price: 320,
                    image: 'https://picsum.photos/seed/premium-biryani/300/200.jpg',
                    category: 'Main Course',
                    badges: ['spicy', 'chef-special'],
                    variants: [
                        { name: 'Chicken', price: 320 },
                        { name: 'Mutton', price: 390 },
                        { name: 'Beef', price: 360 }
                    ],
                    addons: [
                        { name: 'Extra Raita', price: 35 },
                        { name: 'Salad', price: 25 }
                    ],
                    rating: 4.7,
                    reviewCount: 112,
                    isNew: false,
                    isVegetarian: false,
                    containsNuts: false
                },
                {
                    id: 'gulshan-item2',
                    name: 'Kacchi Biryani',
                    description: 'Premium basmati rice with tender mutton and aromatic spices',
                    price: 480,
                    image: 'https://picsum.photos/seed/kacchi/300/200.jpg',
                    category: 'Main Course',
                    badges: ['spicy', 'chef-special'],
                    variants: [
                        { name: 'Mutton', price: 480 },
                        { name: 'Beef', price: 450 }
                    ],
                    addons: [
                        { name: 'Borhani', price: 45 },
                        { name: 'Salad', price: 25 }
                    ],
                    rating: 4.8,
                    reviewCount: 134,
                    isNew: false,
                    isVegetarian: false,
                    containsNuts: false
                },
                {
                    id: 'gulshan-item3',
                    name: 'Chicken Tikka',
                    description: 'Grilled chicken marinated in yogurt and premium spices',
                    price: 250,
                    image: 'https://picsum.photos/seed/tikka/300/200.jpg',
                    category: 'Starters',
                    badges: ['popular'],
                    variants: [
                        { name: 'Half Plate', price: 250 },
                        { name: 'Full Plate', price: 420 }
                    ],
                    addons: [
                        { name: 'Mint Chutney', price: 20 },
                        { name: 'Onion Rings', price: 30 }
                    ],
                    rating: 4.6,
                    reviewCount: 78,
                    isNew: false,
                    isVegetarian: false,
                    containsNuts: false
                },
                {
                    id: 'gulshan-item4',
                    name: 'Vegetable Pulao',
                    description: 'Fragrant rice cooked with mixed vegetables and premium spices',
                    price: 200,
                    image: 'https://picsum.photos/seed/pulao/300/200.jpg',
                    category: 'Main Course',
                    badges: ['vegetarian'],
                    variants: [
                        { name: 'Regular', price: 200 },
                        { name: 'Special', price: 250 }
                    ],
                    addons: [
                        { name: 'Raita', price: 35 },
                        { name: 'Papad', price: 20 }
                    ],
                    rating: 4.4,
                    reviewCount: 52,
                    isNew: true,
                    isVegetarian: true,
                    containsNuts: false
                },
                {
                    id: 'gulshan-item5',
                    name: 'Fuchka',
                    description: 'Crispy hollow spheres filled with spicy tamarind water',
                    price: 70,
                    image: 'https://picsum.photos/seed/fuchka/300/200.jpg',
                    category: 'Snacks',
                    badges: ['popular', 'spicy'],
                    variants: [
                        { name: '6 Pieces', price: 70 },
                        { name: '10 Pieces', price: 100 }
                    ],
                    addons: [
                        { name: 'Extra Tamarind Water', price: 15 }
                    ],
                    rating: 4.7,
                    reviewCount: 167,
                    isNew: false,
                    isVegetarian: true,
                    containsNuts: false
                },
                {
                    id: 'gulshan-item6',
                    name: 'Bengali Thali',
                    description: 'Complete meal with rice, dal, vegetables, fish curry and dessert',
                    price: 380,
                    image: 'https://picsum.photos/seed/thali/300/200.jpg',
                    category: 'Main Course',
                    badges: ['popular'],
                    variants: [
                        { name: 'Regular', price: 380 },
                        { name: 'Large', price: 480 }
                    ],
                    addons: [
                        { name: 'Extra Fish', price: 90 },
                        { name: 'Extra Rice', price: 35 }
                    ],
                    rating: 4.7,
                    reviewCount: 105,
                    isNew: false,
                    isVegetarian: false,
                    containsNuts: false
                },
                {
                    id: 'gulshan-item7',
                    name: 'Misti Doi',
                    description: 'Traditional sweet yogurt with premium quality',
                    price: 60,
                    image: 'https://picsum.photos/seed/misti/300/200.jpg',
                    category: 'Desserts',
                    badges: ['vegetarian'],
                    variants: [
                        { name: 'Small', price: 60 },
                        { name: 'Large', price: 90 }
                    ],
                    addons: [],
                    rating: 4.5,
                    reviewCount: 83,
                    isNew: false,
                    isVegetarian: true,
                    containsNuts: false
                },
                {
                    id: 'gulshan-item8',
                    name: 'Roshogolla',
                    description: 'Soft spongy cheese balls in premium sugar syrup',
                    price: 50,
                    image: 'https://picsum.photos/seed/roshogolla/300/200.jpg',
                    category: 'Desserts',
                    badges: ['vegetarian'],
                    variants: [
                        { name: '4 Pieces', price: 50 },
                        { name: '8 Pieces', price: 80 }
                    ],
                    addons: [],
                    rating: 4.6,
                    reviewCount: 71,
                    isNew: false,
                    isVegetarian: true,
                    containsNuts: false
                },
                {
                    id: 'gulshan-item9',
                    name: 'Lassi',
                    description: 'Refreshing yogurt drink with premium ingredients',
                    price: 80,
                    image: 'https://picsum.photos/seed/lassi/300/200.jpg',
                    category: 'Beverages',
                    badges: ['vegetarian'],
                    variants: [
                        { name: 'Sweet', price: 80 },
                        { name: 'Salty', price: 80 },
                        { name: 'Mango', price: 100 }
                    ],
                    addons: [],
                    rating: 4.4,
                    reviewCount: 56,
                    isNew: true,
                    isVegetarian: true,
                    containsNuts: false
                },
                {
                    id: 'gulshan-item10',
                    name: 'Alu Kabli',
                    description: 'Spicy potato chaat with chickpeas and premium toppings',
                    price: 90,
                    image: 'https://picsum.photos/seed/alukabli/300/200.jpg',
                    category: 'Snacks',
                    badges: ['vegetarian', 'spicy'],
                    variants: [
                        { name: 'Regular', price: 90 },
                        { name: 'Large', price: 130 }
                    ],
                    addons: [
                        { name: 'Extra Lemon', price: 10 },
                        { name: 'Extra Onion', price: 15 }
                    ],
                    rating: 4.3,
                    reviewCount: 42,
                    isNew: false,
                    isVegetarian: true,
                    containsNuts: false
                }
            ],
            'chittagong': [
                {
                    id: 'ctg-item1',
                    name: 'Mezban Beef',
                    description: 'Traditional Chittagong style beef curry with rich spices',
                    price: 380,
                    image: 'https://picsum.photos/seed/mezban/300/200.jpg',
                    category: 'Main Course',
                    badges: ['spicy', 'popular'],
                    variants: [
                        { name: 'Regular', price: 380 },
                        { name: 'Large', price: 480 }
                    ],
                    addons: [
                        { name: 'Extra Rice', price: 30 },
                        { name: 'Salad', price: 20 }
                    ],
                    rating: 4.6,
                    reviewCount: 87,
                    isNew: false,
                    isVegetarian: false,
                    containsNuts: false
                },
                {
                    id: 'ctg-item2',
                    name: 'Fish Biryani',
                    description: 'Aromatic rice dish with fresh fish and coastal spices',
                    price: 320,
                    image: 'https://picsum.photos/seed/fish-biryani/300/200.jpg',
                    category: 'Main Course',
                    badges: ['spicy', 'chef-special'],
                    variants: [
                        { name: 'Rui Fish', price: 320 },
                        { name: 'Hilsa', price: 450 }
                    ],
                    addons: [
                        { name: 'Borhani', price: 40 },
                        { name: 'Salad', price: 20 }
                    ],
                    rating: 4.7,
                    reviewCount: 98,
                    isNew: false,
                    isVegetarian: false,
                    containsNuts: false
                },
                {
                    id: 'ctg-item3',
                    name: 'Prawn Curry',
                    description: 'Fresh prawns cooked in coconut milk and spices',
                    price: 280,
                    image: 'https://picsum.photos/seed/prawn-curry/300/200.jpg',
                    category: 'Main Course',
                    badges: ['spicy', 'seafood'],
                    variants: [
                        { name: 'Regular', price: 280 },
                        { name: 'Large', price: 380 }
                    ],
                    addons: [
                        { name: 'Extra Rice', price: 30 },
                        { name: 'Naan', price: 25 }
                    ],
                    rating: 4.5,
                    reviewCount: 76,
                    isNew: false,
                    isVegetarian: false,
                    containsNuts: false
                },
                {
                    id: 'ctg-item4',
                    name: 'Vegetable Pulao',
                    description: 'Fragrant rice cooked with mixed vegetables and spices',
                    price: 180,
                    image: 'https://picsum.photos/seed/pulao/300/200.jpg',
                    category: 'Main Course',
                    badges: ['vegetarian'],
                    variants: [
                        { name: 'Regular', price: 180 },
                        { name: 'Special', price: 220 }
                    ],
                    addons: [
                        { name: 'Raita', price: 30 },
                        { name: 'Papad', price: 15 }
                    ],
                    rating: 4.3,
                    reviewCount: 45,
                    isNew: true,
                    isVegetarian: true,
                    containsNuts: false
                },
                {
                    id: 'ctg-item5',
                    name: 'Fuchka',
                    description: 'Crispy hollow spheres filled with spicy tamarind water',
                    price: 60,
                    image: 'https://picsum.photos/seed/fuchka/300/200.jpg',
                    category: 'Snacks',
                    badges: ['popular', 'spicy'],
                    variants: [
                        { name: '6 Pieces', price: 60 },
                        { name: '10 Pieces', price: 90 }
                    ],
                    addons: [
                        { name: 'Extra Tamarind Water', price: 10 }
                    ],
                    rating: 4.7,
                    reviewCount: 156,
                    isNew: false,
                    isVegetarian: true,
                    containsNuts: false
                },
                {
                    id: 'ctg-item6',
                    name: 'Bengali Thali',
                    description: 'Complete meal with rice, dal, vegetables, fish curry and dessert',
                    price: 350,
                    image: 'https://picsum.photos/seed/thali/300/200.jpg',
                    category: 'Main Course',
                    badges: ['popular'],
                    variants: [
                        { name: 'Regular', price: 350 },
                        { name: 'Large', price: 450 }
                    ],
                    addons: [
                        { name: 'Extra Fish', price: 80 },
                        { name: 'Extra Rice', price: 30 }
                    ],
                    rating: 4.6,
                    reviewCount: 98,
                    isNew: false,
                    isVegetarian: false,
                    containsNuts: false
                },
                {
                    id: 'ctg-item7',
                    name: 'Misti Doi',
                    description: 'Traditional sweet yogurt',
                    price: 50,
                    image: 'https://picsum.photos/seed/misti/300/200.jpg',
                    category: 'Desserts',
                    badges: ['vegetarian'],
                    variants: [
                        { name: 'Small', price: 50 },
                        { name: 'Large', price: 80 }
                    ],
                    addons: [],
                    rating: 4.4,
                    reviewCount: 76,
                    isNew: false,
                    isVegetarian: true,
                    containsNuts: false
                },
                {
                    id: 'ctg-item8',
                    name: 'Roshogolla',
                    description: 'Soft spongy cheese balls in sugar syrup',
                    price: 40,
                    image: 'https://picsum.photos/seed/roshogolla/300/200.jpg',
                    category: 'Desserts',
                    badges: ['vegetarian'],
                    variants: [
                        { name: '4 Pieces', price: 40 },
                        { name: '8 Pieces', price: 70 }
                    ],
                    addons: [],
                    rating: 4.5,
                    reviewCount: 62,
                    isNew: false,
                    isVegetarian: true,
                    containsNuts: false
                },
                {
                    id: 'ctg-item9',
                    name: 'Lassi',
                    description: 'Refreshing yogurt drink',
                    price: 70,
                    image: 'https://picsum.photos/seed/lassi/300/200.jpg',
                    category: 'Beverages',
                    badges: ['vegetarian'],
                    variants: [
                        { name: 'Sweet', price: 70 },
                        { name: 'Salty', price: 70 },
                        { name: 'Mango', price: 90 }
                    ],
                    addons: [],
                    rating: 4.3,
                    reviewCount: 48,
                    isNew: true,
                    isVegetarian: true,
                    containsNuts: false
                },
                {
                    id: 'ctg-item10',
                    name: 'Alu Kabli',
                    description: 'Spicy potato chaat with chickpeas',
                    price: 80,
                    image: 'https://picsum.photos/seed/alukabli/300/200.jpg',
                    category: 'Snacks',
                    badges: ['vegetarian', 'spicy'],
                    variants: [
                        { name: 'Regular', price: 80 },
                        { name: 'Large', price: 120 }
                    ],
                    addons: [
                        { name: 'Extra Lemon', price: 5 },
                        { name: 'Extra Onion', price: 10 }
                    ],
                    rating: 4.2,
                    reviewCount: 34,
                    isNew: false,
                    isVegetarian: true,
                    containsNuts: false
                }
            ],
            'sylhet': [
                {
                    id: 'sylhet-item1',
                    name: 'Shatkora Chicken',
                    description: 'Chicken cooked with Sylhet\'s famous shatkora citrus',
                    price: 300,
                    image: 'https://picsum.photos/seed/shatkora-chicken/300/200.jpg',
                    category: 'Main Course',
                    badges: ['spicy', 'local-special'],
                    variants: [
                        { name: 'Regular', price: 300 },
                        { name: 'Large', price: 400 }
                    ],
                    addons: [
                        { name: 'Extra Rice', price: 30 },
                        { name: 'Salad', price: 20 }
                    ],
                    rating: 4.5,
                    reviewCount: 92,
                    isNew: false,
                    isVegetarian: false,
                    containsNuts: false
                },
                {
                    id: 'sylhet-item2',
                    name: 'Kacchi Biryani',
                    description: 'Premium basmati rice with tender mutton and aromatic spices',
                    price: 450,
                    image: 'https://picsum.photos/seed/kacchi/300/200.jpg',
                    category: 'Main Course',
                    badges: ['spicy', 'chef-special'],
                    variants: [
                        { name: 'Mutton', price: 450 },
                        { name: 'Beef', price: 420 }
                    ],
                    addons: [
                        { name: 'Borhani', price: 40 },
                        { name: 'Salad', price: 20 }
                    ],
                    rating: 4.8,
                    reviewCount: 124,
                    isNew: false,
                    isVegetarian: false,
                    containsNuts: false
                },
                {
                    id: 'sylhet-item3',
                    name: 'Chicken Tikka',
                    description: 'Grilled chicken marinated in yogurt and spices',
                    price: 220,
                    image: 'https://picsum.photos/seed/tikka/300/200.jpg',
                    category: 'Starters',
                    badges: ['popular'],
                    variants: [
                        { name: 'Half Plate', price: 220 },
                        { name: 'Full Plate', price: 380 }
                    ],
                    addons: [
                        { name: 'Mint Chutney', price: 15 },
                        { name: 'Onion Rings', price: 25 }
                    ],
                    rating: 4.5,
                    reviewCount: 67,
                    isNew: false,
                    isVegetarian: false,
                    containsNuts: false
                },
                {
                    id: 'sylhet-item4',
                    name: 'Vegetable Pulao',
                    description: 'Fragrant rice cooked with mixed vegetables and spices',
                    price: 180,
                    image: 'https://picsum.photos/seed/pulao/300/200.jpg',
                    category: 'Main Course',
                    badges: ['vegetarian'],
                    variants: [
                        { name: 'Regular', price: 180 },
                        { name: 'Special', price: 220 }
                    ],
                    addons: [
                        { name: 'Raita', price: 30 },
                        { name: 'Papad', price: 15 }
                    ],
                    rating: 4.3,
                    reviewCount: 45,
                    isNew: true,
                    isVegetarian: true,
                    containsNuts: false
                },
                {
                    id: 'sylhet-item5',
                    name: 'Fuchka',
                    description: 'Crispy hollow spheres filled with spicy tamarind water',
                    price: 60,
                    image: 'https://picsum.photos/seed/fuchka/300/200.jpg',
                    category: 'Snacks',
                    badges: ['popular', 'spicy'],
                    variants: [
                        { name: '6 Pieces', price: 60 },
                        { name: '10 Pieces', price: 90 }
                    ],
                    addons: [
                        { name: 'Extra Tamarind Water', price: 10 }
                    ],
                    rating: 4.7,
                    reviewCount: 156,
                    isNew: false,
                    isVegetarian: true,
                    containsNuts: false
                },
                {
                    id: 'sylhet-item6',
                    name: 'Bengali Thali',
                    description: 'Complete meal with rice, dal, vegetables, fish curry and dessert',
                    price: 350,
                    image: 'https://picsum.photos/seed/thali/300/200.jpg',
                    category: 'Main Course',
                    badges: ['popular'],
                    variants: [
                        { name: 'Regular', price: 350 },
                        { name: 'Large', price: 450 }
                    ],
                    addons: [
                        { name: 'Extra Fish', price: 80 },
                        { name: 'Extra Rice', price: 30 }
                    ],
                    rating: 4.6,
                    reviewCount: 98,
                    isNew: false,
                    isVegetarian: false,
                    containsNuts: false
                },
                {
                    id: 'sylhet-item7',
                    name: 'Misti Doi',
                    description: 'Traditional sweet yogurt',
                    price: 50,
                    image: 'https://picsum.photos/seed/misti/300/200.jpg',
                    category: 'Desserts',
                    badges: ['vegetarian'],
                    variants: [
                        { name: 'Small', price: 50 },
                        { name: 'Large', price: 80 }
                    ],
                    addons: [],
                    rating: 4.4,
                    reviewCount: 76,
                    isNew: false,
                    isVegetarian: true,
                    containsNuts: false
                },
                {
                    id: 'sylhet-item8',
                    name: 'Roshogolla',
                    description: 'Soft spongy cheese balls in sugar syrup',
                    price: 40,
                    image: 'https://picsum.photos/seed/roshogolla/300/200.jpg',
                    category: 'Desserts',
                    badges: ['vegetarian'],
                    variants: [
                        { name: '4 Pieces', price: 40 },
                        { name: '8 Pieces', price: 70 }
                    ],
                    addons: [],
                    rating: 4.5,
                    reviewCount: 62,
                    isNew: false,
                    isVegetarian: true,
                    containsNuts: false
                },
                {
                    id: 'sylhet-item9',
                    name: 'Lassi',
                    description: 'Refreshing yogurt drink',
                    price: 70,
                    image: 'https://picsum.photos/seed/lassi/300/200.jpg',
                    category: 'Beverages',
                    badges: ['vegetarian'],
                    variants: [
                        { name: 'Sweet', price: 70 },
                        { name: 'Salty', price: 70 },
                        { name: 'Mango', price: 90 }
                    ],
                    addons: [],
                    rating: 4.3,
                    reviewCount: 48,
                    isNew: true,
                    isVegetarian: true,
                    containsNuts: false
                },
                {
                    id: 'sylhet-item10',
                    name: 'Alu Kabli',
                    description: 'Spicy potato chaat with chickpeas',
                    price: 80,
                    image: 'https://picsum.photos/seed/alukabli/300/200.jpg',
                    category: 'Snacks',
                    badges: ['vegetarian', 'spicy'],
                    variants: [
                        { name: 'Regular', price: 80 },
                        { name: 'Large', price: 120 }
                    ],
                    addons: [
                        { name: 'Extra Lemon', price: 5 },
                        { name: 'Extra Onion', price: 10 }
                    ],
                    rating: 4.2,
                    reviewCount: 34,
                    isNew: false,
                    isVegetarian: true,
                    containsNuts: false
                }
            ],
            'rajshahi': [
                {
                    id: 'rajshahi-item1',
                    name: 'Mango Lassi',
                    description: 'Refreshing yogurt drink with Rajshahi mangoes',
                    price: 90,
                    image: 'https://picsum.photos/seed/mango-lassi/300/200.jpg',
                    category: 'Beverages',
                    badges: ['vegetarian', 'seasonal'],
                    variants: [
                        { name: 'Regular', price: 90 },
                        { name: 'Large', price: 120 }
                    ],
                    addons: [],
                    rating: 4.6,
                    reviewCount: 78,
                    isNew: true,
                    isVegetarian: true,
                    containsNuts: false
                },
                {
                    id: 'rajshahi-item2',
                    name: 'Kacchi Biryani',
                    description: 'Premium basmati rice with tender mutton and aromatic spices',
                    price: 450,
                    image: 'https://picsum.photos/seed/kacchi/300/200.jpg',
                    category: 'Main Course',
                    badges: ['spicy', 'chef-special'],
                    variants: [
                        { name: 'Mutton', price: 450 },
                        { name: 'Beef', price: 420 }
                    ],
                    addons: [
                        { name: 'Borhani', price: 40 },
                        { name: 'Salad', price: 20 }
                    ],
                    rating: 4.8,
                    reviewCount: 124,
                    isNew: false,
                    isVegetarian: false,
                    containsNuts: false
                },
                {
                    id: 'rajshahi-item3',
                    name: 'Chicken Tikka',
                    description: 'Grilled chicken marinated in yogurt and spices',
                    price: 220,
                    image: 'https://picsum.photos/seed/tikka/300/200.jpg',
                    category: 'Starters',
                    badges: ['popular'],
                    variants: [
                        { name: 'Half Plate', price: 220 },
                        { name: 'Full Plate', price: 380 }
                    ],
                    addons: [
                        { name: 'Mint Chutney', price: 15 },
                        { name: 'Onion Rings', price: 25 }
                    ],
                    rating: 4.5,
                    reviewCount: 67,
                    isNew: false,
                    isVegetarian: false,
                    containsNuts: false
                },
                {
                    id: 'rajshahi-item4',
                    name: 'Vegetable Pulao',
                    description: 'Fragrant rice cooked with mixed vegetables and spices',
                    price: 180,
                    image: 'https://picsum.photos/seed/pulao/300/200.jpg',
                    category: 'Main Course',
                    badges: ['vegetarian'],
                    variants: [
                        { name: 'Regular', price: 180 },
                        { name: 'Special', price: 220 }
                    ],
                    addons: [
                        { name: 'Raita', price: 30 },
                        { name: 'Papad', price: 15 }
                    ],
                    rating: 4.3,
                    reviewCount: 45,
                    isNew: true,
                    isVegetarian: true,
                    containsNuts: false
                },
                {
                    id: 'rajshahi-item5',
                    name: 'Fuchka',
                    description: 'Crispy hollow spheres filled with spicy tamarind water',
                    price: 60,
                    image: 'https://picsum.photos/seed/fuchka/300/200.jpg',
                    category: 'Snacks',
                    badges: ['popular', 'spicy'],
                    variants: [
                        { name: '6 Pieces', price: 60 },
                        { name: '10 Pieces', price: 90 }
                    ],
                    addons: [
                        { name: 'Extra Tamarind Water', price: 10 }
                    ],
                    rating: 4.7,
                    reviewCount: 156,
                    isNew: false,
                    isVegetarian: true,
                    containsNuts: false
                },
                {
                    id: 'rajshahi-item6',
                    name: 'Bengali Thali',
                    description: 'Complete meal with rice, dal, vegetables, fish curry and dessert',
                    price: 350,
                    image: 'https://picsum.photos/seed/thali/300/200.jpg',
                    category: 'Main Course',
                    badges: ['popular'],
                    variants: [
                        { name: 'Regular', price: 350 },
                        { name: 'Large', price: 450 }
                    ],
                    addons: [
                        { name: 'Extra Fish', price: 80 },
                        { name: 'Extra Rice', price: 30 }
                    ],
                    rating: 4.6,
                    reviewCount: 98,
                    isNew: false,
                    isVegetarian: false,
                    containsNuts: false
                },
                {
                    id: 'rajshahi-item7',
                    name: 'Misti Doi',
                    description: 'Traditional sweet yogurt',
                    price: 50,
                    image: 'https://picsum.photos/seed/misti/300/200.jpg',
                    category: 'Desserts',
                    badges: ['vegetarian'],
                    variants: [
                        { name: 'Small', price: 50 },
                        { name: 'Large', price: 80 }
                    ],
                    addons: [],
                    rating: 4.4,
                    reviewCount: 76,
                    isNew: false,
                    isVegetarian: true,
                    containsNuts: false
                },
                {
                    id: 'rajshahi-item8',
                    name: 'Roshogolla',
                    description: 'Soft spongy cheese balls in sugar syrup',
                    price: 40,
                    image: 'https://picsum.photos/seed/roshogolla/300/200.jpg',
                    category: 'Desserts',
                    badges: ['vegetarian'],
                    variants: [
                        { name: '4 Pieces', price: 40 },
                        { name: '8 Pieces', price: 70 }
                    ],
                    addons: [],
                    rating: 4.5,
                    reviewCount: 62,
                    isNew: false,
                    isVegetarian: true,
                    containsNuts: false
                },
                {
                    id: 'rajshahi-item9',
                    name: 'Lassi',
                    description: 'Refreshing yogurt drink',
                    price: 70,
                    image: 'https://picsum.photos/seed/lassi/300/200.jpg',
                    category: 'Beverages',
                    badges: ['vegetarian'],
                    variants: [
                        { name: 'Sweet', price: 70 },
                        { name: 'Salty', price: 70 },
                        { name: 'Mango', price: 90 }
                    ],
                    addons: [],
                    rating: 4.3,
                    reviewCount: 48,
                    isNew: true,
                    isVegetarian: true,
                    containsNuts: false
                },
                {
                    id: 'rajshahi-item10',
                    name: 'Alu Kabli',
                    description: 'Spicy potato chaat with chickpeas',
                    price: 80,
                    image: 'https://picsum.photos/seed/alukabli/300/200.jpg',
                    category: 'Snacks',
                    badges: ['vegetarian', 'spicy'],
                    variants: [
                        { name: 'Regular', price: 80 },
                        { name: 'Large', price: 120 }
                    ],
                    addons: [
                        { name: 'Extra Lemon', price: 5 },
                        { name: 'Extra Onion', price: 10 }
                    ],
                    rating: 4.2,
                    reviewCount: 34,
                    isNew: false,
                    isVegetarian: true,
                    containsNuts: false
                }
            ],
            'khulna': [
                {
                    id: 'khulna-item1',
                    name: 'Hilsa Fish Curry',
                    description: 'Fresh Hilsa fish cooked in traditional Bengali style',
                    price: 400,
                    image: 'https://picsum.photos/seed/hilsa/300/200.jpg',
                    category: 'Main Course',
                    badges: ['spicy', 'seafood'],
                    variants: [
                        { name: 'Regular', price: 400 },
                        { name: 'Large', price: 550 }
                    ],
                    addons: [
                        { name: 'Extra Rice', price: 30 },
                        { name: 'Salad', price: 20 }
                    ],
                    rating: 4.7,
                    reviewCount: 105,
                    isNew: false,
                    isVegetarian: false,
                    containsNuts: false
                },
                {
                    id: 'khulna-item2',
                    name: 'Kacchi Biryani',
                    description: 'Premium basmati rice with tender mutton and aromatic spices',
                    price: 450,
                    image: 'https://picsum.photos/seed/kacchi/300/200.jpg',
                    category: 'Main Course',
                    badges: ['spicy', 'chef-special'],
                    variants: [
                        { name: 'Mutton', price: 450 },
                        { name: 'Beef', price: 420 }
                    ],
                    addons: [
                        { name: 'Borhani', price: 40 },
                        { name: 'Salad', price: 20 }
                    ],
                    rating: 4.8,
                    reviewCount: 124,
                    isNew: false,
                    isVegetarian: false,
                    containsNuts: false
                },
                {
                    id: 'khulna-item3',
                    name: 'Chicken Tikka',
                    description: 'Grilled chicken marinated in yogurt and spices',
                    price: 220,
                    image: 'https://picsum.photos/seed/tikka/300/200.jpg',
                    category: 'Starters',
                    badges: ['popular'],
                    variants: [
                        { name: 'Half Plate', price: 220 },
                        { name: 'Full Plate', price: 380 }
                    ],
                    addons: [
                        { name: 'Mint Chutney', price: 15 },
                        { name: 'Onion Rings', price: 25 }
                    ],
                    rating: 4.5,
                    reviewCount: 67,
                    isNew: false,
                    isVegetarian: false,
                    containsNuts: false
                },
                {
                    id: 'khulna-item4',
                    name: 'Vegetable Pulao',
                    description: 'Fragrant rice cooked with mixed vegetables and spices',
                    price: 180,
                    image: 'https://picsum.photos/seed/pulao/300/200.jpg',
                    category: 'Main Course',
                    badges: ['vegetarian'],
                    variants: [
                        { name: 'Regular', price: 180 },
                        { name: 'Special', price: 220 }
                    ],
                    addons: [
                        { name: 'Raita', price: 30 },
                        { name: 'Papad', price: 15 }
                    ],
                    rating: 4.3,
                    reviewCount: 45,
                    isNew: true,
                    isVegetarian: true,
                    containsNuts: false
                },
                {
                    id: 'khulna-item5',
                    name: 'Fuchka',
                    description: 'Crispy hollow spheres filled with spicy tamarind water',
                    price: 60,
                    image: 'https://picsum.photos/seed/fuchka/300/200.jpg',
                    category: 'Snacks',
                    badges: ['popular', 'spicy'],
                    variants: [
                        { name: '6 Pieces', price: 60 },
                        { name: '10 Pieces', price: 90 }
                    ],
                    addons: [
                        { name: 'Extra Tamarind Water', price: 10 }
                    ],
                    rating: 4.7,
                    reviewCount: 156,
                    isNew: false,
                    isVegetarian: true,
                    containsNuts: false
                },
                {
                    id: 'khulna-item6',
                    name: 'Bengali Thali',
                    description: 'Complete meal with rice, dal, vegetables, fish curry and dessert',
                    price: 350,
                    image: 'https://picsum.photos/seed/thali/300/200.jpg',
                    category: 'Main Course',
                    badges: ['popular'],
                    variants: [
                        { name: 'Regular', price: 350 },
                        { name: 'Large', price: 450 }
                    ],
                    addons: [
                        { name: 'Extra Fish', price: 80 },
                        { name: 'Extra Rice', price: 30 }
                    ],
                    rating: 4.6,
                    reviewCount: 98,
                    isNew: false,
                    isVegetarian: false,
                    containsNuts: false
                },
                {
                    id: 'khulna-item7',
                    name: 'Misti Doi',
                    description: 'Traditional sweet yogurt',
                    price: 50,
                    image: 'https://picsum.photos/seed/misti/300/200.jpg',
                    category: 'Desserts',
                    badges: ['vegetarian'],
                    variants: [
                        { name: 'Small', price: 50 },
                        { name: 'Large', price: 80 }
                    ],
                    addons: [],
                    rating: 4.4,
                    reviewCount: 76,
                    isNew: false,
                    isVegetarian: true,
                    containsNuts: false
                },
                {
                    id: 'khulna-item8',
                    name: 'Roshogolla',
                    description: 'Soft spongy cheese balls in sugar syrup',
                    price: 40,
                    image: 'https://picsum.photos/seed/roshogolla/300/200.jpg',
                    category: 'Desserts',
                    badges: ['vegetarian'],
                    variants: [
                        { name: '4 Pieces', price: 40 },
                        { name: '8 Pieces', price: 70 }
                    ],
                    addons: [],
                    rating: 4.5,
                    reviewCount: 62,
                    isNew: false,
                    isVegetarian: true,
                    containsNuts: false
                },
                {
                    id: 'khulna-item9',
                    name: 'Lassi',
                    description: 'Refreshing yogurt drink',
                    price: 70,
                    image: 'https://picsum.photos/seed/lassi/300/200.jpg',
                    category: 'Beverages',
                    badges: ['vegetarian'],
                    variants: [
                        { name: 'Sweet', price: 70 },
                        { name: 'Salty', price: 70 },
                        { name: 'Mango', price: 90 }
                    ],
                    addons: [],
                    rating: 4.3,
                    reviewCount: 48,
                    isNew: true,
                    isVegetarian: true,
                    containsNuts: false
                },
                {
                    id: 'khulna-item10',
                    name: 'Alu Kabli',
                    description: 'Spicy potato chaat with chickpeas',
                    price: 80,
                    image: 'https://picsum.photos/seed/alukabli/300/200.jpg',
                    category: 'Snacks',
                    badges: ['vegetarian', 'spicy'],
                    variants: [
                        { name: 'Regular', price: 80 },
                        { name: 'Large', price: 120 }
                    ],
                    addons: [
                        { name: 'Extra Lemon', price: 5 },
                        { name: 'Extra Onion', price: 10 }
                    ],
                    rating: 4.2,
                    reviewCount: 34,
                    isNew: false,
                    isVegetarian: true,
                    containsNuts: false
                }
            ],
            'barisal': [
                {
                    id: 'barisal-item1',
                    name: 'Panta Ilish',
                    description: 'Fermented rice with Hilsa fish, a Barisal specialty',
                    price: 350,
                    image: 'https://picsum.photos/seed/panta-ilish/300/200.jpg',
                    category: 'Main Course',
                    badges: ['spicy', 'traditional'],
                    variants: [
                        { name: 'Regular', price: 350 },
                        { name: 'Large', price: 450 }
                    ],
                    addons: [
                        { name: 'Extra Rice', price: 30 },
                        { name: 'Salad', price: 20 }
                    ],
                    rating: 4.5,
                    reviewCount: 89,
                    isNew: false,
                    isVegetarian: false,
                    containsNuts: false
                },
                {
                    id: 'barisal-item2',
                    name: 'Kacchi Biryani',
                    description: 'Premium basmati rice with tender mutton and aromatic spices',
                    price: 450,
                    image: 'https://picsum.photos/seed/kacchi/300/200.jpg',
                    category: 'Main Course',
                    badges: ['spicy', 'chef-special'],
                    variants: [
                        { name: 'Mutton', price: 450 },
                        { name: 'Beef', price: 420 }
                    ],
                    addons: [
                        { name: 'Borhani', price: 40 },
                        { name: 'Salad', price: 20 }
                    ],
                    rating: 4.8,
                    reviewCount: 124,
                    isNew: false,
                    isVegetarian: false,
                    containsNuts: false
                },
                {
                    id: 'barisal-item3',
                    name: 'Chicken Tikka',
                    description: 'Grilled chicken marinated in yogurt and spices',
                    price: 220,
                    image: 'https://picsum.photos/seed/tikka/300/200.jpg',
                    category: 'Starters',
                    badges: ['popular'],
                    variants: [
                        { name: 'Half Plate', price: 220 },
                        { name: 'Full Plate', price: 380 }
                    ],
                    addons: [
                        { name: 'Mint Chutney', price: 15 },
                        { name: 'Onion Rings', price: 25 }
                    ],
                    rating: 4.5,
                    reviewCount: 67,
                    isNew: false,
                    isVegetarian: false,
                    containsNuts: false
                },
                {
                    id: 'barisal-item4',
                    name: 'Vegetable Pulao',
                    description: 'Fragrant rice cooked with mixed vegetables and spices',
                    price: 180,
                    image: 'https://picsum.photos/seed/pulao/300/200.jpg',
                    category: 'Main Course',
                    badges: ['vegetarian'],
                    variants: [
                        { name: 'Regular', price: 180 },
                        { name: 'Special', price: 220 }
                    ],
                    addons: [
                        { name: 'Raita', price: 30 },
                        { name: 'Papad', price: 15 }
                    ],
                    rating: 4.3,
                    reviewCount: 45,
                    isNew: true,
                    isVegetarian: true,
                    containsNuts: false
                },
                {
                    id: 'barisal-item5',
                    name: 'Fuchka',
                    description: 'Crispy hollow spheres filled with spicy tamarind water',
                    price: 60,
                    image: 'https://picsum.photos/seed/fuchka/300/200.jpg',
                    category: 'Snacks',
                    badges: ['popular', 'spicy'],
                    variants: [
                        { name: '6 Pieces', price: 60 },
                        { name: '10 Pieces', price: 90 }
                    ],
                    addons: [
                        { name: 'Extra Tamarind Water', price: 10 }
                    ],
                    rating: 4.7,
                    reviewCount: 156,
                    isNew: false,
                    isVegetarian: true,
                    containsNuts: false
                },
                {
                    id: 'barisal-item6',
                    name: 'Bengali Thali',
                    description: 'Complete meal with rice, dal, vegetables, fish curry and dessert',
                    price: 350,
                    image: 'https://picsum.photos/seed/thali/300/200.jpg',
                    category: 'Main Course',
                    badges: ['popular'],
                    variants: [
                        { name: 'Regular', price: 350 },
                        { name: 'Large', price: 450 }
                    ],
                    addons: [
                        { name: 'Extra Fish', price: 80 },
                        { name: 'Extra Rice', price: 30 }
                    ],
                    rating: 4.6,
                    reviewCount: 98,
                    isNew: false,
                    isVegetarian: false,
                    containsNuts: false
                },
                {
                    id: 'barisal-item7',
                    name: 'Misti Doi',
                    description: 'Traditional sweet yogurt',
                    price: 50,
                    image: 'https://picsum.photos/seed/misti/300/200.jpg',
                    category: 'Desserts',
                    badges: ['vegetarian'],
                    variants: [
                        { name: 'Small', price: 50 },
                        { name: 'Large', price: 80 }
                    ],
                    addons: [],
                    rating: 4.4,
                    reviewCount: 76,
                    isNew: false,
                    isVegetarian: true,
                    containsNuts: false
                },
                {
                    id: 'barisal-item8',
                    name: 'Roshogolla',
                    description: 'Soft spongy cheese balls in sugar syrup',
                    price: 40,
                    image: 'https://picsum.photos/seed/roshogolla/300/200.jpg',
                    category: 'Desserts',
                    badges: ['vegetarian'],
                    variants: [
                        { name: '4 Pieces', price: 40 },
                        { name: '8 Pieces', price: 70 }
                    ],
                    addons: [],
                    rating: 4.5,
                    reviewCount: 62,
                    isNew: false,
                    isVegetarian: true,
                    containsNuts: false
                },
                {
                    id: 'barisal-item9',
                    name: 'Lassi',
                    description: 'Refreshing yogurt drink',
                    price: 70,
                    image: 'https://picsum.photos/seed/lassi/300/200.jpg',
                    category: 'Beverages',
                    badges: ['vegetarian'],
                    variants: [
                        { name: 'Sweet', price: 70 },
                        { name: 'Salty', price: 70 },
                        { name: 'Mango', price: 90 }
                    ],
                    addons: [],
                    rating: 4.3,
                    reviewCount: 48,
                    isNew: true,
                    isVegetarian: true,
                    containsNuts: false
                },
                {
                    id: 'barisal-item10',
                    name: 'Alu Kabli',
                    description: 'Spicy potato chaat with chickpeas',
                    price: 80,
                    image: 'https://picsum.photos/seed/alukabli/300/200.jpg',
                    category: 'Snacks',
                    badges: ['vegetarian', 'spicy'],
                    variants: [
                        { name: 'Regular', price: 80 },
                        { name: 'Large', price: 120 }
                    ],
                    addons: [
                        { name: 'Extra Lemon', price: 5 },
                        { name: 'Extra Onion', price: 10 }
                    ],
                    rating: 4.2,
                    reviewCount: 34,
                    isNew: false,
                    isVegetarian: true,
                    containsNuts: false
                }
            ]
        });
    }
};

// Initialize demo data on first load
initializeDemoData();