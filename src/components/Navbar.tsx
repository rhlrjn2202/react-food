import { ShoppingBag, Search, Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface NavbarProps {
  cartItemsCount: number;
  onCartClick: () => void;
}

export default function Navbar({ cartItemsCount, onCartClick }: NavbarProps) {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-white/70 backdrop-blur-md border-b border-sand-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <Link 
                to="/" 
                className="flex items-center group"
              >
                <span className="text-2xl font-bold tracking-tight text-sand-900 group-hover:text-primary-600 transition-colors">
                  Speed<span className="text-primary-600 group-hover:text-sand-900 transition-colors">Bite</span>
                </span>
              </Link>
              
              <div className="hidden md:flex items-center gap-6">
                <Link 
                  to="/category/special" 
                  className="text-sand-600 hover:text-sand-900 transition-colors"
                >
                  Special
                </Link>
                <Link 
                  to="/category/pickles" 
                  className="text-sand-600 hover:text-sand-900 transition-colors"
                >
                  Pickles
                </Link>
                <Link 
                  to="/category/palaharams" 
                  className="text-sand-600 hover:text-sand-900 transition-colors"
                >
                  Palaharams
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/search')}
                className="hidden md:flex items-center gap-2 px-3 py-1.5 text-sand-600 hover:text-sand-900 
                         hover:bg-sand-100/80 rounded-lg transition-all"
              >
                <Search className="w-5 h-5" />
                <span className="text-sm">Search</span>
              </button>

              <button 
                onClick={onCartClick}
                className="relative p-2 rounded-lg hover:bg-sand-100/80 transition-colors group"
                aria-label={`Shopping cart with ${cartItemsCount} items`}
              >
                <ShoppingBag className="w-6 h-6 text-sand-700 group-hover:text-sand-900 transition-colors" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs font-bold 
                                rounded-full min-w-[20px] h-5 flex items-center justify-center px-1 
                                animate-fade-in ring-2 ring-white">
                    {cartItemsCount}
                  </span>
                )}
              </button>

              <button 
                className="md:hidden p-2 rounded-lg hover:bg-sand-100/80 transition-colors"
                aria-label="Menu"
              >
                <Menu className="w-6 h-6 text-sand-700" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}