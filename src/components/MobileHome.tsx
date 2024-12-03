import { Search, Home as HomeIcon } from 'lucide-react';
import { MenuItem as MenuItemType } from '../types';
import MobileHeroSlider from './MobileHeroSlider';
import CategoryGrid from './CategoryGrid';
import HotDeals from './HotDeals';
import CategorySection from './CategorySection';
import { useNavigate } from 'react-router-dom';
import { menuItems } from '../data/menuItems';
import { categories } from '../data/categories';

interface MobileHomeProps {
  onAddToCart: (item: MenuItemType) => void;
}

export default function MobileHome({ onAddToCart }: MobileHomeProps) {
  const navigate = useNavigate();
  
  const getCategoryItems = (categoryId: string) => 
    menuItems.filter(item => item.category === categoryId);

  return (
    <div className="pb-16">
      {/* Header */}
      <header className="bg-white px-4 pt-3 pb-2 border-b border-sand-200/80">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <HomeIcon className="w-5 h-5 text-primary-600" />
            <h1 className="text-xl font-semibold tracking-tight">
              Welcome Back!
            </h1>
          </div>
        </div>
        <button
          onClick={() => navigate('/search')}
          className="relative w-full animate-fade-in"
        >
          <div className="w-full px-4 py-2 pl-10 bg-sand-100/50 rounded-xl text-left text-sand-500">
            Search for dishes...
          </div>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-sand-400" />
        </button>
      </header>

      {/* Hero Slider - Reduced top margin */}
      <section className="mt-2">
        <MobileHeroSlider />
      </section>

      {/* Hot Deals - Reduced top margin */}
      <section className="mt-4">
        <HotDeals items={menuItems} onAddToCart={onAddToCart} />
      </section>

      {/* Categories Grid - Reduced margins */}
      <section className="mt-6 mb-6">
        <div className="px-4 mb-3">
          <h2 className="text-xl font-semibold text-sand-900">Categories</h2>
        </div>
        <CategoryGrid />
      </section>

      {/* Category Sections - Reduced spacing */}
      <div className="space-y-6">
        {categories.map(category => (
          <section 
            key={category.id} 
            className="pt-4 first:pt-0 border-t border-sand-200/60 first:border-t-0"
          >
            <CategorySection
              category={category}
              items={getCategoryItems(category.id)}
              onAddToCart={onAddToCart}
            />
          </section>
        ))}
      </div>
    </div>
  );
}