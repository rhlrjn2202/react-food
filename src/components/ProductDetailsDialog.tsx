import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { MenuItem } from '../types';
import { X, Plus } from 'lucide-react';
import { isMobile } from 'react-device-detect';

interface ProductDetailsDialogProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: MenuItem) => void;
}

export default function ProductDetailsDialog({
  item,
  isOpen,
  onClose,
  onAddToCart
}: ProductDetailsDialogProps) {
  if (!item) return null;

  const handleAddToCart = () => {
    onAddToCart(item);
    onClose();
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog 
        as="div" 
        className="relative z-50"
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-sand-900/40 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <Dialog.Panel className={`flex transform text-left text-base transition md:my-8 ${
                isMobile 
                  ? 'w-full min-h-screen' 
                  : 'max-w-2xl rounded-xl'
              } bg-white shadow-2xl`}>
                <div className="relative flex w-full flex-col">
                  {/* Close button */}
                  <button
                    type="button"
                    className="absolute right-4 top-4 z-10 rounded-full bg-white/80 p-2 backdrop-blur-sm 
                             hover:bg-white transition-colors"
                    onClick={onClose}
                  >
                    <X className="h-5 w-5 text-sand-900" aria-hidden="true" />
                  </button>

                  {/* Product image */}
                  <div className="relative aspect-square w-full md:aspect-[4/3] bg-sand-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                      loading="eager"
                    />
                    {item.isHotDeal && (
                      <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                        {Math.round(((item.originalPrice! - item.price) / item.originalPrice!) * 100)}% OFF
                      </div>
                    )}
                  </div>

                  {/* Product info */}
                  <div className="p-6 sm:p-8">
                    <Dialog.Title as="h3" className="text-2xl font-semibold text-sand-900 mb-2">
                      {item.name}
                    </Dialog.Title>

                    {/* Price and category */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-xl font-semibold text-primary-600">
                          ${item.price.toFixed(2)}
                        </span>
                        {item.isHotDeal && (
                          <span className="ml-2 text-sand-500 line-through">
                            ${item.originalPrice?.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-sand-600 capitalize px-3 py-1 bg-sand-100 rounded-full">
                        {item.category}
                      </span>
                    </div>

                    {/* Description */}
                    <div className="mt-4 prose prose-sand">
                      <p className="text-sand-600 text-lg leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Add to cart button */}
                    <button
                      type="button"
                      className="btn-primary w-full mt-8 text-lg"
                      onClick={handleAddToCart}
                    >
                      <Plus className="h-5 w-5 mr-2" aria-hidden="true" />
                      Add
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}