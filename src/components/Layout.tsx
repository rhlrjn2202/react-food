import { Outlet } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import Navbar from './Navbar';
import MobileNavBar from './MobileNavBar';
import CartPanel from './CartPanel';
import Footer from './Footer';
import { useEffect, useState } from 'react';
import { CartItem } from '../types';
import { storage } from '../utils/storage';
import ErrorBoundary from './ErrorBoundary';

export default function Layout() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      return storage.get<CartItem[]>('cart', []);
    } catch (error) {
      console.error('Error loading cart:', error);
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      storage.set('cart', cartItems);
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  }, [cartItems]);

  const handleAddToCart = (item: CartItem) => {
    try {
      setCartItems((prev) => {
        const existingItem = prev.find((i) => i.id === item.id);
        if (existingItem) {
          return prev.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          );
        }
        return [...prev, { ...item, quantity: 1 }];
      });
      setIsCartOpen(true);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    try {
      if (quantity < 0) return;
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity } : item
        ).filter((item) => item.quantity > 0)
      );
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleRemoveFromCart = (id: string) => {
    try {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <ErrorBoundary>
      <div className={`min-h-screen flex flex-col bg-sand-50 ${isMobile ? 'pb-16' : ''}`}>
        <ErrorBoundary>
          {isMobile ? (
            <MobileNavBar 
              cartItemsCount={cartItemsCount}
              onCartClick={() => setIsCartOpen(true)}
            />
          ) : (
            <Navbar 
              cartItemsCount={cartItemsCount}
              onCartClick={() => setIsCartOpen(true)}
            />
          )}
        </ErrorBoundary>

        <ErrorBoundary>
          <CartPanel
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            items={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemove={handleRemoveFromCart}
          />
        </ErrorBoundary>

        <main className={`flex-grow ${isMobile ? 'pb-safe' : ''}`}>
          <ErrorBoundary>
            <Outlet context={{ onAddToCart: handleAddToCart }} />
          </ErrorBoundary>
        </main>

        {!isMobile && (
          <ErrorBoundary>
            <Footer />
          </ErrorBoundary>
        )}
      </div>
    </ErrorBoundary>
  );
}