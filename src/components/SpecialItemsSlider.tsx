import { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MenuItem as MenuItemType } from '../types';
import MenuItem from './MenuItem';
import { isMobile } from 'react-device-detect';
import { Link } from 'react-router-dom';

interface SpecialItemsSliderProps {
  items: MenuItemType[];
  onAddToCart: (item: MenuItemType) => void;
}

export default function SpecialItemsSlider({ items, onAddToCart }: SpecialItemsSliderProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Don't auto-scroll if there aren't enough items
    if (items.length <= (isMobile ? 1 : 3)) return;
    
    // Don't auto-scroll when user is hovering
    if (isHovered) return;

    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const nextIndex = (currentIndex + 1) % items.length;
        scrollToIndex(nextIndex);
        setCurrentIndex(nextIndex);
      }
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [currentIndex, items.length, isHovered]);

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const itemWidth = container.clientWidth / (isMobile ? 1 : 3);
      const scrollPosition = index * itemWidth;
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const itemWidth = container.clientWidth / (isMobile ? 1 : 3);
      const nextIndex = direction === 'left' 
        ? Math.max(0, currentIndex - 1)
        : Math.min(items.length - 1, currentIndex + 1);
      
      scrollToIndex(nextIndex);
      setCurrentIndex(nextIndex);
    }
  };

  if (items.length === 0) return null;

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Navigation Buttons - Only show if there are enough items */}
      {items.length > (isMobile ? 1 : 3) && (
        <>
          <button
            onClick={() => scroll('left')}
            disabled={currentIndex === 0}
            className={`absolute ${isMobile ? '-left-2' : '-left-12'} top-1/2 -translate-y-1/2 z-20
                     bg-white rounded-full shadow-lg p-3
                     border border-sand-200 opacity-0 group-hover:opacity-100
                     hover:bg-sand-50 transform hover:scale-105 disabled:opacity-30
                     transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500`}
            aria-label="Previous item"
          >
            <ChevronLeft className="w-5 h-5 text-sand-600" />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={currentIndex >= items.length - (isMobile ? 1 : 3)}
            className={`absolute ${isMobile ? '-right-2' : '-right-12'} top-1/2 -translate-y-1/2 z-20
                     bg-white rounded-full shadow-lg p-3
                     border border-sand-200 opacity-0 group-hover:opacity-100
                     hover:bg-sand-50 transform hover:scale-105 disabled:opacity-30
                     transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500`}
            aria-label="Next item"
          >
            <ChevronRight className="w-5 h-5 text-sand-600" />
          </button>
        </>
      )}

      {/* Gradient Fade Effect */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-sand-50 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-sand-50 to-transparent z-10 pointer-events-none" />

      {/* Items Slider */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-hidden pb-4 px-1 scroll-smooth"
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
                ? 'w-full' 
                : 'w-[calc((100%-2rem)/3)]'
            } transform transition-transform duration-300 hover:scale-[1.02]`}
            style={{ 
              scrollSnapAlign: 'start',
              animationDelay: `${index * 150}ms`
            }}
          >
            <MenuItem item={item} onAddToCart={onAddToCart} />
          </div>
        ))}
      </div>

      {/* Dots Navigation - Only show on mobile and if there are multiple items */}
      {isMobile && items.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-4">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                scrollToIndex(index);
                setCurrentIndex(index);
              }}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'w-4 bg-primary-600' 
                  : 'bg-sand-300'
              }`}
              aria-label={`Go to item ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}