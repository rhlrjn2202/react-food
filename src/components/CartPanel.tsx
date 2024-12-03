import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { X, ShoppingBag } from 'lucide-react';
import CartItem from './CartItem';
import { CartItem as CartItemType } from '../types/cart';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface CartPanelProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItemType[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export default function CartPanel({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemove,
}: CartPanelProps) {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleCheckout = () => {
    onClose();
    if (isAuthenticated) {
      navigate('/checkout');
    } else {
      navigate('/login');
    }
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-sand-900/40 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-200"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="flex items-center text-2xl font-semibold text-sand-900">
                          <ShoppingBag className="w-6 h-6 mr-3 text-primary-600" />
                          Your Cart
                        </Dialog.Title>
                        <button
                          type="button"
                          className="btn-secondary !p-2"
                          onClick={onClose}
                        >
                          <X className="h-5 w-5" aria-hidden="true" />
                        </button>
                      </div>

                      <div className="mt-8">
                        {items.length === 0 ? (
                          <div className="text-center py-12">
                            <ShoppingBag className="w-12 h-12 mx-auto text-sand-300 mb-4" />
                            <p className="text-sand-600 mb-2">Your cart is empty</p>
                            <button onClick={onClose} className="btn-primary mt-4">
                              Continue Shopping
                            </button>
                          </div>
                        ) : (
                          <div className="flow-root">
                            <div className="divide-y divide-sand-200">
                              {items.map((item) => (
                                <CartItem
                                  key={item.id}
                                  item={item}
                                  onUpdateQuantity={onUpdateQuantity}
                                  onRemove={onRemove}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {items.length > 0 && (
                      <div className="border-t border-sand-200 px-6 py-6 sm:px-8">
                        <div className="flex justify-between text-base font-medium text-sand-900 mb-4">
                          <p>Subtotal</p>
                          <p className="text-lg font-semibold">${total.toFixed(2)}</p>
                        </div>
                        <button 
                          className="btn-primary w-full text-lg"
                          onClick={handleCheckout}
                        >
                          {isAuthenticated ? 'Proceed to Checkout' : 'Sign in to Checkout'}
                        </button>
                        <p className="mt-4 text-center text-sm text-sand-500">
                          Free delivery on orders over $50
                        </p>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}