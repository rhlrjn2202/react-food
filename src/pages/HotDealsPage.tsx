import { useOutletContext } from 'react-router-dom';
import { MenuItem as MenuItemType } from '../types';
import MenuItem from '../components/MenuItem';
import { menuItems } from '../data/menuItems';
import SEO from '../components/SEO';
import { ChevronLeft, Flame } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { isMobile } from 'react-device-detect';

interface HotDealsContext {
  onAddToCart: (item: MenuItemType) => void;
}

export default function HotDealsPage() {
  const navigate = useNavigate();
  const { onAddToCart } = useOutletContext<HotDealsContext>();
  const hotDeals = menuItems.filter(item => item.isHotDeal);

  return (
    <>
      <SEO 
        title="Hot Deals"
        description="Check out our special hot deals and discounts on delicious meals. Limited time offers!"
      />
      <div className={`${isMobile ? 'pb-safe pt-[52px]' : ''}`}>
        {/* Fixed Back Button - Mobile Only */}
        {isMobile && (
          <div className="fixed top-0 left-0 right-0 z-30 bg-white/80 backdrop-blur-md border-b border-sand-200/80">
            <div className="px-4 py-4">
              <button 
                onClick={() => navigate(-1)}
                className="group flex items-center text-sand-600 hover:text-sand-900 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span>Back</span>
              </button>
            </div>
          </div>
        )}

        {/* Header Section */}
        <div className={`bg-white border-b border-sand-200/80`}>
          <div className={`${isMobile ? 'px-4 py-4' : 'pt-20 pb-6 px-8'}`}>
            <div className={`max-w-7xl mx-auto ${!isMobile && 'px-4'}`}>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-50">
                  <Flame className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h1 className={`${isMobile ? 'text-xl' : 'text-2xl md:text-3xl'} font-bold text-sand-900`}>Hot Deals</h1>
                  <p className="text-sand-600 text-sm md:text-base mt-1">
                    Limited time special offers with great discounts
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className={`${isMobile ? 'p-4' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'}`}>
          {hotDeals.length > 0 ? (
            <div className={`
              grid gap-3
              ${isMobile ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'}
              ${!isMobile && 'animate-fade-in'}
            `}>
              {hotDeals.map((item, index) => (
                <div
                  key={item.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <MenuItem
                    item={item}
                    onAddToCart={onAddToCart}
                    imageClassName={isMobile ? 'aspect-[4/5]' : undefined}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <Flame className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <p className="text-sand-600 mb-4">No hot deals available at the moment</p>
              <button 
                onClick={() => navigate('/')}
                className="btn-primary"
              >
                Browse Regular Menu
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}