import { useState } from 'react';
import { Product } from '../data/product';

export const useCart = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const addItemToCart = (item: Product) => {
    setCartItems((prev) => [...prev, item]);
  };

  const removeItemFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return {
    cartItems,
    addToCart: addItemToCart,
    removeFromCart: removeItemFromCart,
  };
};
