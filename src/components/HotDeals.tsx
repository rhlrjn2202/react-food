import { useRef } from 'react';
import { isMobile } from 'react-device-detect';
import { ChevronLeft, ChevronRight, Flame } from 'lucide-react';
import { MenuItem as MenuItemType } from '../types';
import { Link } from 'react-router-dom';
import MenuItem from './MenuItem';

interface HotDealsProps {
  items: MenuItemType[];
  onAddToCart: (item: MenuItemType) => void;
}

export default function HotDeals({ items, onAddToCart }: HotDealsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = direction === 'left' ? -container.clientWidth : container.clientWidth;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const hotDeals = items.filter(item => item.isHotDeal);

  if (hotDeals.length === 0) return null;

  return (
    <section className={`${isMobile ? 'px-4' : ''} py-6 relative`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-50">
              <Flame className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-sand-900">Hot Deals</h2>
              <p className="text-sand-600 text-sm">Limited time special offers</p>
            </div>
          </div>
          <Link 
            to="/hot-deals" 
            className="text-sm font-medium text-primary-600 hover:text-primary-700 hover:underline
                     transition-colors duration-200"
          >
            View All →
          </Link>
        </div>

        {/* Deals Slider Container */}
        <div className="relative group">
          {/* Navigation Buttons */}
          {hotDeals.length > 3 && (
            <>
              <button
                onClick={() => scroll('left')}
                className={`absolute ${isMobile ? '-left-2' : '-left-8'} top-1/2 -translate-y-1/2 z-20
                         bg-white rounded-full shadow-lg p-2.5
                         border border-sand-200 opacity-0 group-hover:opacity-100
                         hover:bg-sand-50 transform hover:scale-105
                         transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500`}
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4 text-sand-600" />
              </button>
              <button
                onClick={() => scroll('right')}
                className={`absolute ${isMobile ? '-right-2' : '-right-8'} top-1/2 -translate-y-1/2 z-20
                         bg-white rounded-full shadow-lg p-2.5
                         border border-sand-200 opacity-0 group-hover:opacity-100
                         hover:bg-sand-50 transform hover:scale-105
                         transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500`}
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4 text-sand-600" />
              </button>
            </>
          )}

          {/* Gradient Fade Effect */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-sand-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-sand-50 to-transparent z-10 pointer-events-none" />

          {/* Deals Slider */}
          <div
            ref={scrollContainerRef}
            className="flex gap-3 overflow-x-auto scrollbar-hide pb-3 px-1 scroll-smooth"
            style={{ 
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {hotDeals.map((item, index) => (
              <div
                key={item.id}
                className={`flex-none ${
                  isMobile 
                    ? 'w-[calc((100vw-2rem)/3-0.5rem)]'
                    : 'w-[380px]'
                } transform transition-transform duration-300 hover:scale-[1.02]`}
                style={{ 
                  scrollSnapAlign: 'start',
                  animationDelay: `${index * 150}ms`,
                  minWidth: isMobile ? 'calc((100vw - 2rem)/3 - 0.5rem)' : '380px',
                  maxWidth: isMobile ? 'calc((100vw - 2rem)/3 - 0.5rem)' : '380px'
                }}
              >
                <MenuItem item={item} onAddToCart={onAddToCart} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}