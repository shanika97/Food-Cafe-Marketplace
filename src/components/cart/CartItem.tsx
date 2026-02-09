import React from 'react';
import { motion } from 'framer-motion';
import { MinusIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { CartItem as CartItemType } from '../../context/CartContext';
import { useCart } from '../../context/CartContext';
type CartItemProps = {
  cartItem: CartItemType;
};
export function CartItem({ cartItem }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const { item, quantity } = cartItem;
  const displayPrice =
  item.isOnSale && item.salePrice ? item.salePrice : item.price;
  const lineTotal = displayPrice * quantity;
  return (
    <motion.div
      layout
      initial={{
        opacity: 0,
        x: -20
      }}
      animate={{
        opacity: 1,
        x: 0
      }}
      exit={{
        opacity: 0,
        x: -20
      }}
      className="flex gap-4 p-4 bg-white rounded-xl shadow-sm">

      {/* Image */}
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 object-cover rounded-lg flex-shrink-0" />


      {/* Details */}
      <div className="flex-1 min-w-0">
        <p className="text-xs text-stone-500">{item.cafeName}</p>
        <h4 className="font-semibold text-stone-900 truncate">{item.name}</h4>

        <div className="flex items-center gap-2 mt-1">
          <span className="font-bold text-orange-600">
            Rs. {displayPrice.toFixed(2)}
          </span>
          {item.isOnSale && item.salePrice &&
          <span className="text-xs text-stone-400 line-through">
              Rs. {item.price.toFixed(2)}
            </span>
          }
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateQuantity(item.id, quantity - 1)}
              className="p-1 rounded-full bg-stone-100 hover:bg-stone-200 transition-colors"
              aria-label="Decrease quantity">

              <MinusIcon className="h-4 w-4 text-stone-600" />
            </button>
            <span className="w-8 text-center font-medium">{quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, quantity + 1)}
              className="p-1 rounded-full bg-stone-100 hover:bg-stone-200 transition-colors"
              aria-label="Increase quantity">

              <PlusIcon className="h-4 w-4 text-stone-600" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-bold text-stone-900">
              Rs. {lineTotal.toFixed(2)}
            </span>
            <button
              onClick={() => removeFromCart(item.id)}
              className="p-1 text-red-500 hover:bg-red-50 rounded-full transition-colors"
              aria-label="Remove item">

              <TrashIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>);

}