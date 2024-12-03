import { useParams } from 'react-router-dom';
import { menuItems } from '../data/menuItems';
import { categories } from '../data/categories';
import MenuItem from '../components/MenuItem';
import { useOutletContext } from 'react-router-dom';
import { MenuItem as MenuItemType } from '../types';
import SEO from '../components/SEO';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { isMobile } from 'react-device-detect';

interface CategoryContext {
  onAddToCart: (item: MenuItemType) => void;
}

export default function CategoryPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { onAddToCart } = useOutletContext<CategoryContext>();

  const category = categories.find(c => c.id === categoryId);
  const categoryItems = menuItems.filter(item => item.category === categoryId);

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <>
      <SEO 
        title={category.name}
        description={`Browse our selection of ${category.name.toLowerCase()}. ${category.description}`}
      />
      <div className={`${isMobile ? 'pb-safe' : 'pb-16'}`}>
        {/* Mobile Back Button - Fixed */}
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

        {/* Header Section - Not Fixed */}
        <div className={`bg-white border-b border-sand-200 
          ${isMobile ? 'mt-[60px] px-4 py-4' : 'pt-20 pb-6 px-8'}`}>
          <div className={`max-w-7xl mx-auto ${!isMobile && 'px-4'}`}>
            <div className={`${!isMobile && 'max-w-2xl'}`}>
              <h1 className="text-2xl md:text-3xl font-bold text-sand-900">{category.name}</h1>
              <p className="text-sand-600 text-sm md:text-base mt-2">{category.description}</p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className={`${isMobile ? 'p-4' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'}`}>
          {categoryItems.length > 0 ? (
            <div className={`
              grid gap-3
              ${isMobile ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'}
              ${!isMobile && 'animate-fade-in'}
            `}>
              {categoryItems.map((item, index) => (
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
              <p className="text-sand-600 mb-4">No items available in this category</p>
              <button 
                onClick={() => navigate('/')}
                className="btn-primary"
              >
                Browse Other Categories
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}