import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBagIcon, ArrowLeftIcon, TagIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CartItem } from '../components/cart/CartItem';
export function CartPage() {
  const { items, getSubtotal, getDeliveryFee, getTax, getTotal, clearCart } =
  useCart();
  const subtotal = getSubtotal();
  const deliveryFee = getDeliveryFee();
  const tax = getTax();
  const total = getTotal();
  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-amber-50 flex items-center justify-center px-4">
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          className="text-center">

          <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBagIcon className="h-12 w-12 text-orange-500" />
          </div>
          <h1 className="text-2xl font-bold text-stone-900 mb-2">
            Your cart is empty
          </h1>
          <p className="text-stone-500 mb-8">
            Looks like you haven't added anything yet.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors">

            <ArrowLeftIcon className="h-5 w-5" />
            Start Shopping
          </Link>
        </motion.div>
      </main>);

  }
  return (
    <main className="min-h-screen bg-amber-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-stone-900">Your Cart</h1>
          <button
            onClick={clearCart}
            className="text-red-500 hover:text-red-600 text-sm font-medium">

            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence mode="popLayout">
              {items.map((cartItem) =>
              <CartItem key={cartItem.item.id} cartItem={cartItem} />
              )}
            </AnimatePresence>

            <Link
              to="/"
              className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium mt-4">

              <ArrowLeftIcon className="h-4 w-4" />
              Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold text-stone-900 mb-6">
                Order Summary
              </h2>

              {/* Promo Code */}
              <div className="mb-6">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <TagIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                    <input
                      type="text"
                      placeholder="Promo code"
                      className="w-full pl-10 pr-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />

                  </div>
                  <button className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg font-medium transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              {/* Totals */}
              <div className="space-y-3 border-t border-stone-100 pt-4">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span>Rs. {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Delivery Fee</span>
                  <span>
                    {deliveryFee === 0 ?
                    <span className="text-green-600">Free</span> :

                    `Rs. ${deliveryFee.toFixed(2)}`
                    }
                  </span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Tax</span>
                  <span>Rs. {tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-stone-900 border-t border-stone-100 pt-3">
                  <span>Total</span>
                  <span>Rs. {total.toFixed(2)}</span>
                </div>
              </div>

              {/* Free Delivery Notice */}
              {deliveryFee > 0 &&
              <p className="text-sm text-stone-500 mt-4 text-center">
                  Add Rs. {(25 - subtotal).toFixed(2)} more for free delivery!
                </p>
              }

              {/* Checkout Button */}
              <Link
                to="/checkout"
                className="block w-full bg-orange-500 hover:bg-orange-600 text-white text-center py-4 rounded-xl font-semibold mt-6 transition-colors">

                Proceed to Checkout
              </Link>

              {/* Trust Badges */}
              <div className="flex items-center justify-center gap-4 mt-6 text-xs text-stone-400">
                <span>🔒 Secure Checkout</span>
                <span>•</span>
                <span>🚚 Fast Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>);

}