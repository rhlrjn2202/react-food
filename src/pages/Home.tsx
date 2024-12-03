import { useOutletContext } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import HeroSlider from '../components/HeroSlider';
import MobileHome from '../components/MobileHome';
import SEO from '../components/SEO';
import { menuItems } from '../data/menuItems';
import { categories } from '../data/categories';
import { MenuItem as MenuItemType } from '../types';
import CategoryGrid from '../components/CategoryGrid';
import HotDeals from '../components/HotDeals';
import CategorySection from '../components/CategorySection';

interface HomeContext {
  onAddToCart: (item: MenuItemType) => void;
}

export default function Home() {
  const { onAddToCart } = useOutletContext<HomeContext>();
  const getCategoryItems = (categoryId: string) => 
    menuItems.filter(item => item.category === categoryId);

  if (isMobile) {
    return (
      <>
        <SEO 
          title="SpeedBite"
          description="Order your favorite food for delivery. Fresh, fast, and delicious meals at your fingertips."
        />
        <MobileHome onAddToCart={onAddToCart} />
      </>
    );
  }

  return (
    <>
      <SEO 
        title="Home"
        description="SpeedBite - Your favorite food delivered fast. Order burgers, pizza, salads and more from our delicious menu. Fast delivery and great prices!"
      />
      <div className="pt-16">
        <HeroSlider />
        <main>
          {/* Hot Deals Section - Reduced padding */}
          <section className="bg-sand-50/50 border-y border-sand-200/80">
            <div className="max-w-7xl mx-auto">
              <HotDeals items={menuItems} onAddToCart={onAddToCart} />
            </div>
          </section>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Categories Section - Reduced vertical padding */}
            <section className="py-8">
              <div className="text-center max-w-2xl mx-auto mb-6">
                <h2 className="text-3xl font-bold text-sand-900 mb-2">Categories</h2>
                <p className="text-sand-600">
                  Browse our diverse selection of culinary categories
                </p>
              </div>
              <div className="max-w-5xl mx-auto">
                <CategoryGrid />
              </div>
            </section>

            {/* Category Sections - Reduced spacing */}
            <div className="space-y-10 pb-12">
              {categories.map(category => (
                <section 
                  key={category.id} 
                  className="pt-8 first:pt-0 border-t border-sand-200/60 first:border-t-0"
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
        </main>
      </div>
    </>
  );
}