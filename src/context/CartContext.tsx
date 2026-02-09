import React, { useCallback, useState, createContext, useContext } from 'react';
import { FoodItem } from '../data/mockData';
export type CartItem = {
  item: FoodItem;
  quantity: number;
};
type CartContextType = {
  items: CartItem[];
  addToCart: (item: FoodItem, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
  getSubtotal: () => number;
  getDeliveryFee: () => number;
  getTax: () => number;
};
const CartContext = createContext<CartContextType | undefined>(undefined);
type CartProviderProps = {
  children: ReactNode;
};
export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([]);
  const addToCart = useCallback((item: FoodItem, quantity: number = 1) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (cartItem) => cartItem.item.id === item.id
      );
      if (existingItem) {
        return currentItems.map((cartItem) =>
        cartItem.item.id === item.id ?
        {
          ...cartItem,
          quantity: cartItem.quantity + quantity
        } :
        cartItem
        );
      }
      return [
      ...currentItems,
      {
        item,
        quantity
      }];

    });
  }, []);
  const removeFromCart = useCallback((itemId: string) => {
    setItems((currentItems) =>
    currentItems.filter((cartItem) => cartItem.item.id !== itemId)
    );
  }, []);
  const updateQuantity = useCallback(
    (itemId: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(itemId);
        return;
      }
      setItems((currentItems) =>
      currentItems.map((cartItem) =>
      cartItem.item.id === itemId ?
      {
        ...cartItem,
        quantity
      } :
      cartItem
      )
      );
    },
    [removeFromCart]
  );
  const clearCart = useCallback(() => {
    setItems([]);
  }, []);
  const getSubtotal = useCallback(() => {
    return items.reduce((total, cartItem) => {
      const price =
      cartItem.item.isOnSale && cartItem.item.salePrice ?
      cartItem.item.salePrice :
      cartItem.item.price;
      return total + price * cartItem.quantity;
    }, 0);
  }, [items]);
  const getDeliveryFee = useCallback(() => {
    const subtotal = getSubtotal();
    return subtotal >= 25 ? 0 : 4.99;
  }, [getSubtotal]);
  const getTax = useCallback(() => {
    return getSubtotal() * 0.08; // 8% tax
  }, [getSubtotal]);
  const getTotal = useCallback(() => {
    return getSubtotal() + getDeliveryFee() + getTax();
  }, [getSubtotal, getDeliveryFee, getTax]);
  const getItemCount = useCallback(() => {
    return items.reduce((count, cartItem) => count + cartItem.quantity, 0);
  }, [items]);
  const value: CartContextType = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotal,
    getItemCount,
    getSubtotal,
    getDeliveryFee,
    getTax
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}