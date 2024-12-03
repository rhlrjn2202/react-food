import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';
import SEO from '../components/SEO';
import { CartItem as CartItemType } from '../types';

interface CartProps {
  items: CartItemType[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export default function Cart({ items, onUpdateQuantity, onRemove }: CartProps) {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const cartDescription = items.length > 0 
    ? `Your cart has ${items.length} items with a total of $${total.toFixed(2)}`
    : 'Your cart is empty';

  if (items.length === 0) {
    return (
      <>
        <SEO 
          title="Cart"
          description="Your SpeedBite cart is empty. Browse our menu to add delicious items!"
        />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">Your cart is empty</p>
            <Link
              to="/"
              className="inline-block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Browse Menu
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <SEO 
        title="Cart"
        description={cartDescription}
        type="website"
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>
        <div className="bg-white rounded-lg shadow-sm p-6">
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={onUpdateQuantity}
              onRemove={onRemove}
            />
          ))}
          <div className="mt-6 pt-6 border-t">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-lg font-semibold">${total.toFixed(2)}</span>
            </div>
            <button 
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
              aria-label="Proceed to checkout"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </main>
    </>
  );
}