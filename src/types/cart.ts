import { CartItem as GlobalCartItem } from '../types';

// Make sure CartItem matches the global type
export interface CartItem extends GlobalCartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    category: string;
    // other properties...
}
  
export interface Cart {
    items: CartItem[];
    total: number;
}