import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

interface Slide {
  image: string;
  title: string;
  description: string;
}

const slides: Slide[] = [
  {
    image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Discover Amazing Flavors',
    description: 'Fresh and delicious'
  },
  {
    image: 'https://images.pexels.com/photos/2271107/pexels-photo-2271107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Crafted with Care',
    description: 'Every dish made perfectly'
  },
  {
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Lightning Fast Delivery',
    description: 'From kitchen to you'
  }
];

export default function MobileHeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loadedImages, setLoadedImages] = useState<boolean[]>(new Array(slides.length).fill(false));

  useEffect(() => {
    slides.forEach((slide, index) => {
      const img = new Image();
      img.src = slide.image;
      img.onload = () => {
        setLoadedImages(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      };
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isTransitioning) {
        navigateSlide('next');
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [currentSlide, isTransitioning]);

  const navigateSlide = (direction: 'prev' | 'next') => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSlide(current => {
      if (direction === 'next') {
        return current === slides.length - 1 ? 0 : current + 1;
      } else {
        return current === 0 ? slides.length - 1 : current - 1;
      }
    });
    
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) { // minimum swipe distance
      navigateSlide(diff > 0 ? 'next' : 'prev');
    }
    
    setTouchStart(null);
  };

  const isAllImagesLoaded = loadedImages.every(Boolean);

  if (!isAllImagesLoaded) {
    return (
      <div className="h-48 bg-sand-100 rounded-xl mx-4 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-6 h-6 animate-spin text-primary-600 mx-auto mb-2" />
          <p className="text-sand-600 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="relative h-48 mx-4 rounded-xl overflow-hidden bg-sand-900 shadow-lg"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-transform duration-500 ease-out ${
            index === currentSlide 
              ? 'translate-x-0 z-10' 
              : index < currentSlide 
                ? '-translate-x-full' 
                : 'translate-x-full'
          }`}
          aria-hidden={index !== currentSlide}
        >
          {/* Background Image with Gradient */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-sand-900/70 to-sand-900/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-sand-900/70 via-transparent" />
            <img
              src={slide.image}
              alt=""
              className={`w-full h-full object-cover transform transition-transform duration-700 ${
                index === currentSlide ? 'scale-100' : 'scale-110'
              }`}
            />
          </div>

          {/* Content */}
          <div className="relative h-full flex flex-col justify-center px-6">
            <div className={`transition-all duration-500 ${
              index === currentSlide 
                ? 'opacity-100 translate-y-0 delay-200' 
                : 'opacity-0 translate-y-4'
            }`}>
              <h2 className="text-xl font-bold text-white mb-1">
                {slide.title}
              </h2>
              <p className="text-sm text-white/90">
                {slide.description}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isTransitioning && index !== currentSlide) {
                setCurrentSlide(index);
                setIsTransitioning(true);
                setTimeout(() => setIsTransitioning(false), 500);
              }
            }}
            disabled={isTransitioning}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide 
                ? 'w-6 h-1.5 bg-white' 
                : 'w-1.5 h-1.5 bg-white/40'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}