import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../data/product';

interface CartItem extends Product {
  quantity: number;
  colorKey?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Product & { colorKey?: string }) => void;
  removeFromCart: (id: number, colorKey?: string, removeAll?: boolean) => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

useEffect(() => {
  const stored = localStorage.getItem('cart');
  if (stored) {
    setCartItems(JSON.parse(stored));
  }
}, []);

useEffect(() => {
  if (cartItems.length > 0) {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  } else {
    localStorage.removeItem('cart');
  }
}, [cartItems]);


  const normalizeColor = (color?: string) => {
    if (!color) return undefined;
    if (color.toLowerCase() === 'default') return undefined;
    return color;
  };

  const addToCart = (item: Product & { colorKey?: string }) => {
    const normalizedColor = normalizeColor(item.colorKey);

    setCartItems(prev => {
      const existingItem = prev.find(p =>
        p.id === item.id && normalizeColor(p.colorKey) === normalizedColor
      );

      if (existingItem) {
        return prev.map(p =>
          p.id === item.id && normalizeColor(p.colorKey) === normalizedColor
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      }

      return [...prev, { ...item, colorKey: normalizedColor, quantity: 1 }];
    });
  };

  const removeFromCart = (
    id: number,
    colorKey?: string,
    removeAll = false
  ) => {
    const normalizedColor = normalizeColor(colorKey);

    setCartItems(prev => {
      return prev.flatMap(item => {
        if (item.id === id && normalizeColor(item.colorKey) === normalizedColor) {
          if (removeAll || item.quantity === 1) {
            return [];
          } else {
            return [{ ...item, quantity: item.quantity - 1 }];
          }
        }
        return [item];
      });
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
