export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  image: string;
}

export const categories: Category[] = [
  {
    id: 'pickles',
    name: 'Pickles',
    icon: 'utensils',
    description: 'Traditional homemade pickles',
    image: 'https://images.unsplash.com/photo-1589135233689-c449a69d4526?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'palaharams',
    name: 'Palaharams',
    icon: 'cookie',
    description: 'Authentic South Indian snacks',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'special',
    name: 'Special',
    icon: 'star',
    description: 'Our chef\'s special dishes',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'juices',
    name: 'Juices',
    icon: 'cup-soda',
    description: 'Fresh and refreshing beverages',
    image: 'https://images.unsplash.com/photo-1622597467836-f3c7ca9d7ae4?auto=format&fit=crop&w=800&q=80'
  }
];