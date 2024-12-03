import { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MenuItem as MenuItemType } from '../types';
import { Link } from 'react-router-dom';
import MenuItem from './MenuItem';
import { isMobile } from 'react-device-detect';
import { Category } from '../data/categories';

interface CategorySectionProps {
  category: Category;
  items: MenuItemType[];
  onAddToCart: (item: MenuItemType) => void;
}

export default function CategorySection({ category, items, onAddToCart }: CategorySectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const itemsPerView = isMobile ? 2 : 3;

  // Only auto-slide for Special category
  useEffect(() => {
    if (category.id !== 'special') return; // Early return for non-special categories
    if (items.length <= itemsPerView) return;
    if (isHovered) return;

    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const nextIndex = (currentIndex + 1) % (items.length - itemsPerView + 1);
        scrollToIndex(nextIndex);
        setCurrentIndex(nextIndex);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, items.length, isHovered, itemsPerView, category.id]);

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const itemWidth = container.clientWidth / itemsPerView;
      const scrollPosition = index * itemWidth;
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const nextIndex = direction === 'left' 
        ? Math.max(0, currentIndex - 1)
        : Math.min(items.length - itemsPerView, currentIndex + 1);
      
      scrollToIndex(nextIndex);
      setCurrentIndex(nextIndex);
    }
  };

  if (items.length === 0) return null;

  return (
    <section className={`${isMobile ? 'px-4' : ''} py-2 relative`}>
      {/* Header - Reduced margin bottom */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-sand-100">
            <div className="w-4 h-4 text-primary-600">
              {category.icon === 'utensils' && '🍽️'}
              {category.icon === 'cookie' && '🍪'}
              {category.icon === 'star' && '⭐'}
              {category.icon === 'cup-soda' && '🥤'}
            </div>
          </div>
          <div>
            <h2 className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold text-sand-900`}>
              {category.name}
            </h2>
            <p className="text-sand-600 text-sm">{category.description}</p>
          </div>
        </div>
        <Link 
          to={`/category/${category.id}`} 
          className="text-primary-600 font-medium hover:text-primary-700 hover:underline transition-colors"
        >
          View All →
        </Link>
      </div>

      {/* Slider Container */}
      <div 
        className="relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {items.length > itemsPerView && (
          <>
            <button
              onClick={() => scroll('left')}
              disabled={currentIndex === 0}
              className={`absolute ${isMobile ? '-left-2' : '-left-8'} top-1/2 -translate-y-1/2 z-20
                       bg-white rounded-full shadow-lg p-2.5
                       border border-sand-200 opacity-0 group-hover:opacity-100
                       hover:bg-sand-50 transform hover:scale-105 disabled:opacity-30
                       transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500`}
              aria-label="Previous items"
            >
              <ChevronLeft className="w-4 h-4 text-sand-600" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={currentIndex >= items.length - itemsPerView}
              className={`absolute ${isMobile ? '-right-2' : '-right-8'} top-1/2 -translate-y-1/2 z-20
                       bg-white rounded-full shadow-lg p-2.5
                       border border-sand-200 opacity-0 group-hover:opacity-100
                       hover:bg-sand-50 transform hover:scale-105 disabled:opacity-30
                       transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500`}
              aria-label="Next items"
            >
              <ChevronRight className="w-4 h-4 text-sand-600" />
            </button>
          </>
        )}

        {/* Gradient Fade Effect */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-sand-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-sand-50 to-transparent z-10 pointer-events-none" />

        {/* Items Slider */}
        <div
          ref={scrollContainerRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 px-1 scroll-smooth"
          style={{ 
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {items.map((item, index) => (
            <div
              key={item.id}
              className={`flex-none ${
                isMobile 
                  ? 'w-[calc((100%-1rem)/2)]'
                  : 'w-[calc((100%-2rem)/3)]'
              } transform transition-transform duration-300 hover:scale-[1.02]`}
              style={{ 
                scrollSnapAlign: 'start',
                animationDelay: `${index * 150}ms`,
                minWidth: isMobile ? 'calc((100% - 1rem)/2)' : 'calc((100% - 2rem)/3)',
                maxWidth: isMobile ? 'calc((100% - 1rem)/2)' : 'calc((100% - 2rem)/3)',
              }}
            >
              <MenuItem 
                item={item} 
                onAddToCart={onAddToCart}
                imageClassName={isMobile ? 'aspect-[4/5]' : undefined}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}