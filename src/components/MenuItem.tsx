import { Plus } from 'lucide-react';
import { MenuItem as MenuItemType } from '../types';
import { useState } from 'react';
import { isMobile } from 'react-device-detect';
import LoadingSpinner from './LoadingSpinner';
import ProductDetailsDialog from './ProductDetailsDialog';
import { Helmet } from 'react-helmet-async';

interface MenuItemProps {
  item: MenuItemType;
  onAddToCart: (item: MenuItemType) => void;
  imageClassName?: string;
}

export default function MenuItem({ item, onAddToCart, imageClassName }: MenuItemProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    onAddToCart(item);
    setTimeout(() => setIsAdding(false), 500);
  };

  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": item.name,
    "description": item.description,
    "image": item.image,
    "category": item.category,
    "offers": {
      "@type": "Offer",
      "price": item.price,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  };

  const isHotDealsSection = item.isHotDeal;

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <article 
        className={`card h-full flex flex-col animate-slide-up ${isMobile ? 'bg-white' : ''}`}
        onClick={() => setIsDetailsOpen(true)}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === 'Enter') setIsDetailsOpen(true);
        }}
      >
        {/* Image Container */}
        <div className={`relative overflow-hidden bg-sand-100 ${
          imageClassName || (isMobile ? 'aspect-square w-full' : 'aspect-[4/3]')
        }`}>
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <LoadingSpinner size="small" />
            </div>
          )}
          {imageError ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sand-400">Image unavailable</span>
            </div>
          ) : (
            <img
              src={item.image}
              alt={item.name}
              className={`w-full h-full object-cover transition-all duration-700 ${
                imageLoaded ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
              }`}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          )}
          {item.isHotDeal && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {Math.round(((item.originalPrice! - item.price) / item.originalPrice!) * 100)}% OFF
            </div>
          )}
        </div>

        {/* Content Container */}
        <div className={`${isMobile ? 'p-2' : 'p-4'} flex flex-col flex-grow`}>
          <div className="flex justify-between items-start gap-2 mb-auto">
            <div>
              <h2 className={`${isMobile ? 'text-sm' : 'text-lg'} font-semibold text-sand-900 line-clamp-1`}>
                {item.name}
              </h2>
              {(!isMobile || !isHotDealsSection) && (
                <p className="text-sand-600 text-sm mt-1 line-clamp-2">{item.description}</p>
              )}
            </div>
            <div className="text-right shrink-0">
              <span className={`${isMobile ? 'text-sm' : 'text-lg'} font-semibold text-primary-600 whitespace-nowrap`}>
                ${item.price.toFixed(2)}
              </span>
              {item.isHotDeal && (
                <span className={`block ${isMobile ? 'text-xs' : 'text-sm'} text-sand-500 line-through`}>
                  ${item.originalPrice?.toFixed(2)}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`btn-primary w-full ${isMobile ? 'mt-2 text-sm py-1.5' : 'mt-4'}`}
            aria-label={`Add ${item.name} to cart`}
          >
            <Plus className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} mr-1 transition-transform duration-200 ${
              isAdding ? 'rotate-180 scale-90' : 'group-hover:rotate-90'
            }`} 
            aria-hidden="true" />
            {isAdding ? 'Adding...' : 'Add'}
          </button>
        </div>
      </article>

      <ProductDetailsDialog
        item={item}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        onAddToCart={onAddToCart}
      />
    </>
  );
}