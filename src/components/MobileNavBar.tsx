import { Home, Search, ShoppingBag, User } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface MobileNavBarProps {
  cartItemsCount: number;
  onCartClick: () => void;
}

export default function MobileNavBar({ cartItemsCount, onCartClick }: MobileNavBarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path: string) => location.pathname === path;

  const NavButton = ({ icon: Icon, label, isActive, onClick }: any) => (
    <button 
      onClick={onClick}
      className={`relative w-full flex flex-col items-center justify-center gap-1
        ${isActive ? 'text-primary-600' : 'text-sand-600'}
        active:scale-95 transition-all duration-200`}
      aria-label={label}
    >
      <div className={`relative inline-flex items-center justify-center p-1.5
        ${isActive ? 'bg-primary-50/80' : 'hover:bg-sand-100/80'} 
        rounded-xl transition-colors duration-200`}>
        <Icon className={`w-[22px] h-[22px] transition-transform duration-200 
          ${isActive ? 'scale-110' : 'scale-100'}`} 
        />
      </div>
      <span className={`text-[10px] tracking-tight font-medium transition-colors duration-200
        ${isActive ? 'text-primary-900' : 'text-sand-700'}`}>
        {label}
      </span>
    </button>
  );

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      {/* Backdrop blur container */}
      <div className="bg-white/95 backdrop-blur-md border-t border-sand-200/50 
                    shadow-lg shadow-sand-900/5">
        {/* Safe area container */}
        <div className="safe-bottom">
          <div className="grid grid-cols-4 max-w-lg mx-auto px-1 h-[56px]">
            <Link to="/" className="relative">
              <NavButton 
                icon={Home}
                label="Home"
                isActive={isActive('/')}
              />
            </Link>
            
            <div className="relative">
              <NavButton 
                icon={Search}
                label="Search"
                onClick={() => navigate('/search')}
                isActive={isActive('/search')}
              />
            </div>
            
            <div className="relative">
              <NavButton 
                icon={ShoppingBag}
                label="Cart"
                onClick={onCartClick}
                isActive={cartItemsCount > 0}
              />
              {cartItemsCount > 0 && (
                <span className="absolute top-0.5 left-[58%] -translate-x-1/2
                             bg-primary-600 text-white text-[10px] font-bold 
                             rounded-full min-w-[16px] h-[16px] 
                             flex items-center justify-center px-1
                             shadow-sm animate-bounce">
                  {cartItemsCount}
                </span>
              )}
            </div>
            
            <div className="relative">
              <NavButton 
                icon={User}
                label="Profile"
                onClick={() => {}}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}