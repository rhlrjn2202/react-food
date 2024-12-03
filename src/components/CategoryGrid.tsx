import { useNavigate } from 'react-router-dom';
import { categories } from '../data/categories';
import { Utensils, Cookie, Star, Coffee } from 'lucide-react';
import { isMobile } from 'react-device-detect';

const iconMap = {
  'utensils': Utensils,
  'cookie': Cookie,
  'star': Star,
  'cup-soda': Coffee
};

export default function CategoryGrid() {
  const navigate = useNavigate();

  return (
    <div className={`grid ${isMobile ? 'grid-cols-2 gap-4 px-4' : 'grid-cols-4 gap-6'} mb-6`}>
      {categories.map((category) => {
        const Icon = iconMap[category.icon as keyof typeof iconMap];
        
        return (
          <button
            key={category.id}
            onClick={() => navigate(`/category/${category.id}`)}
            className="relative overflow-hidden rounded-xl bg-white shadow-sm border border-sand-200 p-6 flex flex-col items-center justify-center text-center group hover:shadow-md transition-all duration-300"
          >
            <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
              <img
                src={category.image}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <Icon className="w-10 h-10 text-primary-600 mb-4 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="font-semibold text-lg text-sand-900 mb-2">{category.name}</h3>
            <p className="text-sm text-sand-600">{category.description}</p>
          </button>
        );
      })}
    </div>
  );
}