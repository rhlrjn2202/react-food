export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isHotDeal?: boolean;
  originalPrice?: number;
}

export interface CartItem extends MenuItem {
  quantity: number;
}