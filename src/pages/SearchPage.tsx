import { useEffect, useState } from 'react';
import { useSearchParams, useOutletContext } from 'react-router-dom';
import { MenuItem as MenuItemType } from '../types';
import MenuItem from '../components/MenuItem';
import { menuItems } from '../data/menuItems';
import { Search, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import SEO from '../components/SEO';

interface SearchContext {
  onAddToCart: (item: MenuItemType) => void;
}

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState<MenuItemType[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const { onAddToCart } = useOutletContext<SearchContext>();
  const query = searchParams.get('q') || '';

  useEffect(() => {
    const searchQuery = query.toLowerCase().trim();
    setIsSearching(true);

    // Simulate a slight delay for better UX
    const timer = setTimeout(() => {
      if (searchQuery) {
        const results = menuItems.filter(item => 
          item.name.toLowerCase().includes(searchQuery) ||
          item.description.toLowerCase().includes(searchQuery) ||
          item.category.toLowerCase().includes(searchQuery)
        );
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setSearchParams(newQuery ? { q: newQuery } : {});
  };

  return (
    <>
      <SEO 
        title={query ? `Search: ${query}` : 'Search'}
        description={`Search results for "${query}" - Find your favorite dishes`}
      />
      <div className={`${isMobile ? 'pb-safe' : 'pb-20'}`}>
        {/* Header Section */}
        <div className={`bg-white/80 backdrop-blur-md sticky ${isMobile ? 'top-0' : 'top-16'} z-20 border-b border-sand-200 
          ${isMobile ? 'px-4 py-4' : 'py-6 px-8'}`}>
          <div className={`max-w-7xl mx-auto ${!isMobile && 'px-4'}`}>
            {/* Back button - only show on mobile */}
            {isMobile && (
              <button 
                onClick={() => navigate(-1)}
                className="group flex items-center text-sand-600 hover:text-sand-900 transition-colors mb-4"
              >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span>Back</span>
              </button>
            )}

            {/* Search Input */}
            <div className="relative max-w-2xl mx-auto">
              <input
                type="search"
                placeholder="Search for dishes..."
                value={query}
                onChange={handleSearchChange}
                className="w-full px-4 py-3 pl-12 bg-sand-100/50 rounded-xl 
                         focus:outline-none focus:ring-2 focus:ring-primary-500 
                         focus:bg-white transition-all text-sand-900 
                         placeholder:text-sand-500"
                autoFocus
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sand-400" />
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className={`${isMobile ? 'p-4' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'}`}>
          {/* Loading State */}
          {isSearching && (
            <div className="text-center py-12">
              <div className="animate-pulse">
                <div className="h-4 bg-sand-200 rounded w-1/4 mx-auto mb-4"></div>
                <div className="h-4 bg-sand-200 rounded w-1/2 mx-auto"></div>
              </div>
            </div>
          )}

          {/* Results Grid */}
          {!isSearching && query && (
            <>
              <p className="text-sand-600 mb-6">
                {searchResults.length === 0 
                  ? 'No results found' 
                  : `Found ${searchResults.length} result${searchResults.length === 1 ? '' : 's'}`
                }
              </p>
              <div className={`
                grid gap-3
                ${isMobile ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'}
                ${!isMobile && 'animate-fade-in'}
              `}>
                {searchResults.map((item, index) => (
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
            </>
          )}

          {/* Empty State */}
          {!isSearching && !query && (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-sand-300 mx-auto mb-4" />
              <p className="text-sand-600">Start typing to search for dishes</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}