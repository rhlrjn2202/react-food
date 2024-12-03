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
    description: 'Fresh ingredients, expertly prepared and delivered to your door'
  },
  {
    image: 'https://images.pexels.com/photos/2271107/pexels-photo-2271107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Crafted with Care',
    description: 'Every dish is made with love and attention to detail'
  },
  {
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Lightning Fast Delivery',
    description: 'From our kitchen to your table in minutes'
  }
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loadedImages, setLoadedImages] = useState<boolean[]>(new Array(slides.length).fill(false));

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isTransitioning) {
        navigateSlide('next');
      }
    }, 6000);

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
    
    setTimeout(() => setIsTransitioning(false), 750);
  };

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

  const isAllImagesLoaded = loadedImages.every(Boolean);

  if (!isAllImagesLoaded) {
    return (
      <div className="h-[600px] bg-sand-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-sand-600">Loading amazing dishes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[600px] overflow-hidden bg-sand-900">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-transform duration-[750ms] ease-out ${
            index === currentSlide 
              ? 'translate-x-0 z-10' 
              : index < currentSlide 
                ? '-translate-x-full' 
                : 'translate-x-full'
          }`}
          aria-hidden={index !== currentSlide}
        >
          {/* Background Image */}
          <div className="absolute inset-0 transition-transform duration-[750ms] ease-out scale-110">
            <div className="absolute inset-0 bg-gradient-to-r from-sand-900/80 to-sand-900/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-sand-900/80 via-transparent to-transparent" />
            <img
              src={slide.image}
              alt=""
              className={`w-full h-full object-cover transform transition-transform duration-[750ms] ${
                index === currentSlide ? 'scale-100' : 'scale-110'
              }`}
            />
          </div>

          {/* Content */}
          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
            <div className={`max-w-xl transition-all duration-[750ms] ${
              index === currentSlide 
                ? 'opacity-100 translate-y-0 delay-300' 
                : 'opacity-0 translate-y-8'
            }`}>
              <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
                {slide.title}
              </h2>
              <p className="text-xl text-white/90 mb-8">
                {slide.description}
              </p>
              <button className="btn-primary text-lg px-8 py-3">
                Order Now
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        <button
          onClick={() => navigateSlide('prev')}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all 
                   text-white border border-white/20 disabled:opacity-50"
          disabled={isTransitioning}
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Indicators */}
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isTransitioning && index !== currentSlide) {
                  setCurrentSlide(index);
                  setIsTransitioning(true);
                  setTimeout(() => setIsTransitioning(false), 750);
                }
              }}
              disabled={isTransitioning}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'w-8 bg-white' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => navigateSlide('next')}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all 
                   text-white border border-white/20 disabled:opacity-50"
          disabled={isTransitioning}
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}