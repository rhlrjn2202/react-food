import { MenuItem } from '../types';

export const menuItems: MenuItem[] = [
  // Pickles Category
  {
    id: 'pickle-1',
    name: 'Mango Pickle',
    description: 'Traditional spicy mango pickle made with sun-ripened mangoes and aromatic spices',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1599640165026-8bfea76cc6cd?auto=format&fit=crop&w=800&q=80',
    category: 'pickles',
    isHotDeal: true,
    originalPrice: 7.99
  },
  {
    id: 'pickle-2',
    name: 'Lemon Pickle',
    description: 'Tangy and spicy lemon pickle, perfect with any meal',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1620146344904-097a0002d797?auto=format&fit=crop&w=800&q=80',
    category: 'pickles'
  },
  {
    id: 'pickle-3',
    name: 'Mixed Vegetable Pickle',
    description: 'A medley of carrots, cauliflower, and green chilies in aromatic spices',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1589135233689-c449a69d4526?auto=format&fit=crop&w=800&q=80',
    category: 'pickles'
  },
  {
    id: 'pickle-4',
    name: 'Green Chili Pickle',
    description: 'Fiery hot green chili pickle for spice lovers',
    price: 4.49,
    image: 'https://images.unsplash.com/photo-1604335078124-14e0c44f1e1f?auto=format&fit=crop&w=800&q=80',
    category: 'pickles',
    isHotDeal: true,
    originalPrice: 5.99
  },
  {
    id: 'pickle-5',
    name: 'Garlic Pickle',
    description: 'Strong and flavorful garlic pickle with a perfect blend of spices',
    price: 5.49,
    image: 'https://images.unsplash.com/photo-1588949837440-f5ef634eacf3?auto=format&fit=crop&w=800&q=80',
    category: 'pickles'
  },
  {
    id: 'pickle-6',
    name: 'Ginger Pickle',
    description: 'Zesty ginger pickle with a perfect balance of spices',
    price: 5.29,
    image: 'https://images.unsplash.com/photo-1595265616410-a3d727d72dd6?auto=format&fit=crop&w=800&q=80',
    category: 'pickles'
  },

  // Palaharams Category
  {
    id: 'palaharam-1',
    name: 'Samosa',
    description: 'Crispy pastry filled with spiced potatoes and green peas',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    category: 'palaharams',
    isHotDeal: true,
    originalPrice: 5.99
  },
  {
    id: 'palaharam-2',
    name: 'Medu Vada',
    description: 'Crispy lentil doughnuts served with coconut chutney',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1599487476230-6154911bc4bc?auto=format&fit=crop&w=800&q=80',
    category: 'palaharams'
  },
  {
    id: 'palaharam-3',
    name: 'Masala Dosa',
    description: 'Crispy rice crepe filled with spiced potato filling',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    category: 'palaharams',
    isHotDeal: true,
    originalPrice: 9.99
  },
  {
    id: 'palaharam-4',
    name: 'Idli Sambar',
    description: 'Steamed rice cakes served with lentil soup and chutneys',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1589301761660-f43e4955afb7?auto=format&fit=crop&w=800&q=80',
    category: 'palaharams'
  },
  {
    id: 'palaharam-5',
    name: 'Pani Puri',
    description: 'Crispy hollow puris filled with spicy and tangy water',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?auto=format&fit=crop&w=800&q=80',
    category: 'palaharams'
  },
  {
    id: 'palaharam-6',
    name: 'Bhel Puri',
    description: 'Crunchy puffed rice mixed with vegetables and tamarind chutney',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=800&q=80',
    category: 'palaharams'
  },

  // Special Category
  {
    id: 'special-1',
    name: 'Chicken Biryani',
    description: 'Aromatic basmati rice cooked with tender chicken and special spices',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    category: 'special',
    isHotDeal: true,
    originalPrice: 15.99
  },
  {
    id: 'special-2',
    name: 'Butter Chicken',
    description: 'Tender chicken in rich tomato and butter gravy',
    price: 13.99,
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80',
    category: 'special'
  },
  {
    id: 'special-3',
    name: 'Paneer Tikka',
    description: 'Grilled cottage cheese marinated in spices',
    price: 11.99,
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80',
    category: 'special',
    isHotDeal: true,
    originalPrice: 14.99
  },
  {
    id: 'special-4',
    name: 'Dal Makhani',
    description: 'Creamy black lentils slow-cooked to perfection',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    category: 'special'
  },
  {
    id: 'special-5',
    name: 'Vegetable Korma',
    description: 'Mixed vegetables in a rich cashew and cream sauce',
    price: 10.99,
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80',
    category: 'special'
  },
  {
    id: 'special-6',
    name: 'Hyderabadi Biryani',
    description: 'Fragrant rice dish with aromatic spices and tender meat',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    category: 'special'
  },

  // Juices Category
  {
    id: 'juice-1',
    name: 'Mango Lassi',
    description: 'Creamy yogurt smoothie with sweet alphonso mangoes',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1622597467836-f3c7ca9d7ae4?auto=format&fit=crop&w=800&q=80',
    category: 'juices',
    isHotDeal: true,
    originalPrice: 4.99
  },
  {
    id: 'juice-2',
    name: 'Fresh Orange Juice',
    description: 'Freshly squeezed sweet oranges',
    price: 3.49,
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80',
    category: 'juices'
  },
  {
    id: 'juice-3',
    name: 'Watermelon Juice',
    description: 'Refreshing juice from sweet watermelons',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1597306691225-69ef217a43cc?auto=format&fit=crop&w=800&q=80',
    category: 'juices',
    isHotDeal: true,
    originalPrice: 4.99
  },
  {
    id: 'juice-4',
    name: 'Mixed Berry Smoothie',
    description: 'Blend of strawberries, blueberries, and raspberries',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=80',
    category: 'juices'
  },
  {
    id: 'juice-5',
    name: 'Green Apple Juice',
    description: 'Fresh and tart green apple juice',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1628557044797-f21a177c37ec?auto=format&fit=crop&w=800&q=80',
    category: 'juices'
  },
  {
    id: 'juice-6',
    name: 'Pineapple Coconut Smoothie',
    description: 'Tropical blend of fresh pineapple and coconut milk',
    price: 4.49,
    image: 'https://images.unsplash.com/photo-1622597467836-f3c7ca9d7ae4?auto=format&fit=crop&w=800&q=80',
    category: 'juices'
  }
];