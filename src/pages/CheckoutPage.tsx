import React, { useState, Component } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckIcon,
  ChevronLeftIcon,
  MapPinIcon,
  CreditCardIcon,
  ClipboardListIcon,
  PartyPopperIcon,
  MailIcon,
  PrinterIcon } from
'lucide-react';
import { useCart, CartItem } from '../context/CartContext';
import {
  PaymentOptions,
  PaymentMethod } from
'../components/checkout/PaymentOptions';
type CheckoutStep = 1 | 2 | 3;
type DeliveryInfo = {
  fullName: string;
  address: string;
  city: string;
  zipCode: string;
  phone: string;
  instructions: string;
};
type OrderSnapshot = {
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  orderNumber: string;
  orderDate: string;
  deliveryInfo: DeliveryInfo;
  paymentMethod: PaymentMethod;
};
export function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(1);
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({
    fullName: '',
    address: '',
    city: '',
    zipCode: '',
    phone: '',
    instructions: ''
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [orderSnapshot, setOrderSnapshot] = useState<OrderSnapshot | null>(null);
  const [errors, setErrors] = useState<Partial<DeliveryInfo>>({});
  const { items, getSubtotal, getDeliveryFee, getTax, getTotal, clearCart } =
  useCart();
  const navigate = useNavigate();
  const subtotal = getSubtotal();
  const deliveryFee = getDeliveryFee();
  const tax = getTax();
  const total = getTotal();
  const steps = [
  {
    number: 1,
    title: 'Delivery',
    icon: MapPinIcon
  },
  {
    number: 2,
    title: 'Payment',
    icon: CreditCardIcon
  },
  {
    number: 3,
    title: 'Review',
    icon: ClipboardListIcon
  }];

  const validateDeliveryInfo = (): boolean => {
    const newErrors: Partial<DeliveryInfo> = {};
    if (!deliveryInfo.fullName.trim()) newErrors.fullName = 'Name is required';
    if (!deliveryInfo.address.trim()) newErrors.address = 'Address is required';
    if (!deliveryInfo.city.trim()) newErrors.city = 'City is required';
    if (!deliveryInfo.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    if (!deliveryInfo.phone.trim()) newErrors.phone = 'Phone is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleNextStep = () => {
    if (currentStep === 1 && !validateDeliveryInfo()) return;
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1 as CheckoutStep);
    }
  };
  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1 as CheckoutStep);
    }
  };
  const handlePlaceOrder = () => {
    const snapshot: OrderSnapshot = {
      items: [...items],
      subtotal,
      deliveryFee,
      tax,
      total,
      orderNumber: `FD${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      orderDate: new Date().toLocaleString(),
      deliveryInfo: {
        ...deliveryInfo
      },
      paymentMethod
    };
    setOrderSnapshot(snapshot);
    setIsOrderComplete(true);
    clearCart();
  };
  const handleSendEmail = () => {
    if (!orderSnapshot) return;
    const subject = `Order Confirmation #${orderSnapshot.orderNumber}`;
    const body = `
Order Confirmation #${orderSnapshot.orderNumber}
Date: ${orderSnapshot.orderDate}

Hello ${orderSnapshot.deliveryInfo.fullName},

Thank you for your order! Here are your order details:

ITEMS:
${orderSnapshot.items.map((item) => `- ${item.quantity}x ${item.item.name} (Rs. ${((item.item.isOnSale && item.item.salePrice ? item.item.salePrice : item.item.price) * item.quantity).toFixed(2)})`).join('\n')}

SUMMARY:
Subtotal: Rs. ${orderSnapshot.subtotal.toFixed(2)}
Delivery Fee: Rs. ${orderSnapshot.deliveryFee.toFixed(2)}
Tax: Rs. ${orderSnapshot.tax.toFixed(2)}
Total: Rs. ${orderSnapshot.total.toFixed(2)}

DELIVERY ADDRESS:
${orderSnapshot.deliveryInfo.fullName}
${orderSnapshot.deliveryInfo.address}
${orderSnapshot.deliveryInfo.city}, ${orderSnapshot.deliveryInfo.zipCode}
${orderSnapshot.deliveryInfo.phone}
${orderSnapshot.deliveryInfo.instructions ? `Note: ${orderSnapshot.deliveryInfo.instructions}` : ''}

PAYMENT METHOD:
${orderSnapshot.paymentMethod === 'card' ? 'Credit/Debit Card' : orderSnapshot.paymentMethod === 'paypal' ? 'PayPal' : orderSnapshot.paymentMethod === 'digital' ? 'Apple Pay / Google Pay' : 'Cash on Delivery'}

Thank you for choosing FoodBay!
    `.trim();
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };
  if (items.length === 0 && !isOrderComplete) {
    navigate('/cart');
    return null;
  }
  if (isOrderComplete && orderSnapshot) {
    return (
      <main className="min-h-screen bg-amber-50 py-12 px-4">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">

          {/* Success Header */}
          <div className="bg-green-500 p-8 text-center text-white">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
              <CheckIcon className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
            <p className="text-green-100 text-lg">
              Thank you for your purchase. Your order has been received.
            </p>
          </div>

          {/* Receipt Body */}
          <div className="p-8">
            {/* Order Meta */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-stone-100 pb-6 mb-6 gap-4">
              <div>
                <p className="text-sm text-stone-500 uppercase tracking-wide font-semibold">
                  Order Number
                </p>
                <p className="text-xl font-bold text-stone-900">
                  #{orderSnapshot.orderNumber}
                </p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-sm text-stone-500 uppercase tracking-wide font-semibold">
                  Date
                </p>
                <p className="text-stone-900">{orderSnapshot.orderDate}</p>
              </div>
            </div>

            {/* Items List */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wide mb-4">
                Order Details
              </h3>
              <div className="space-y-4">
                {orderSnapshot.items.map((cartItem) => {
                  const price =
                  cartItem.item.isOnSale && cartItem.item.salePrice ?
                  cartItem.item.salePrice :
                  cartItem.item.price;
                  return (
                    <div
                      key={cartItem.item.id}
                      className="flex items-center justify-between">

                      <div className="flex items-center gap-4">
                        <div className="bg-stone-100 rounded-lg p-2 w-12 h-12 flex items-center justify-center font-bold text-stone-600">
                          {cartItem.quantity}x
                        </div>
                        <div>
                          <p className="font-medium text-stone-900">
                            {cartItem.item.name}
                          </p>
                          <p className="text-sm text-stone-500">
                            {cartItem.item.cafeName}
                          </p>
                        </div>
                      </div>
                      <p className="font-medium text-stone-900">
                        Rs. {(price * cartItem.quantity).toFixed(2)}
                      </p>
                    </div>);

                })}
              </div>
            </div>

            {/* Totals */}
            <div className="bg-stone-50 rounded-xl p-6 mb-8 space-y-3">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span>Rs. {orderSnapshot.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Delivery Fee</span>
                <span>
                  {orderSnapshot.deliveryFee === 0 ?
                  'Free' :
                  `Rs. ${orderSnapshot.deliveryFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Tax</span>
                <span>Rs. {orderSnapshot.tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-stone-200 pt-3 flex justify-between text-lg font-bold text-stone-900">
                <span>Total</span>
                <span>Rs. {orderSnapshot.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Delivery & Payment Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wide mb-3 flex items-center gap-2">
                  <MapPinIcon className="h-4 w-4" /> Delivery Address
                </h3>
                <div className="text-stone-600 text-sm leading-relaxed">
                  <p className="font-medium text-stone-900">
                    {orderSnapshot.deliveryInfo.fullName}
                  </p>
                  <p>{orderSnapshot.deliveryInfo.address}</p>
                  <p>
                    {orderSnapshot.deliveryInfo.city},{' '}
                    {orderSnapshot.deliveryInfo.zipCode}
                  </p>
                  <p>{orderSnapshot.deliveryInfo.phone}</p>
                  {orderSnapshot.deliveryInfo.instructions &&
                  <p className="mt-2 text-stone-500 italic">
                      Note: {orderSnapshot.deliveryInfo.instructions}
                    </p>
                  }
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wide mb-3 flex items-center gap-2">
                  <CreditCardIcon className="h-4 w-4" /> Payment Method
                </h3>
                <div className="text-stone-600 text-sm">
                  <p className="capitalize font-medium text-stone-900">
                    {orderSnapshot.paymentMethod === 'card' &&
                    'Credit/Debit Card'}
                    {orderSnapshot.paymentMethod === 'paypal' && 'PayPal'}
                    {orderSnapshot.paymentMethod === 'digital' &&
                    'Apple Pay / Google Pay'}
                    {orderSnapshot.paymentMethod === 'cash' &&
                    'Cash on Delivery'}
                  </p>
                  <p className="mt-1 text-stone-500">Payment Successful</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-stone-100">
              <button
                onClick={handleSendEmail}
                className="flex-1 flex items-center justify-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-900 px-6 py-3 rounded-xl font-semibold transition-colors">

                <MailIcon className="h-5 w-5" />
                Email Receipt
              </button>
              <Link
                to="/"
                className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors">

                Continue Shopping
              </Link>
            </div>
          </div>
        </motion.div>
      </main>);

  }
  return (
    <main className="min-h-screen bg-amber-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            {/* Progress Line */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-stone-200">
              <motion.div
                className="h-full bg-orange-500"
                initial={{
                  width: '0%'
                }}
                animate={{
                  width: `${(currentStep - 1) / 2 * 100}%`
                }} />

            </div>

            {steps.map((step) => {
              const Icon = step.icon;
              const isCompleted = currentStep > step.number;
              const isCurrent = currentStep === step.number;
              return (
                <div
                  key={step.number}
                  className="relative z-10 flex flex-col items-center">

                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isCompleted ? 'bg-orange-500 text-white' : isCurrent ? 'bg-orange-500 text-white' : 'bg-white border-2 border-stone-300 text-stone-400'}`}>

                    {isCompleted ?
                    <CheckIcon className="h-5 w-5" /> :

                    <Icon className="h-5 w-5" />
                    }
                  </div>
                  <span
                    className={`mt-2 text-sm font-medium ${isCurrent ? 'text-orange-600' : 'text-stone-500'}`}>

                    {step.title}
                  </span>
                </div>);

            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <AnimatePresence mode="wait">
                {/* Step 1: Delivery */}
                {currentStep === 1 &&
                <motion.div
                  key="delivery"
                  initial={{
                    opacity: 0,
                    x: 20
                  }}
                  animate={{
                    opacity: 1,
                    x: 0
                  }}
                  exit={{
                    opacity: 0,
                    x: -20
                  }}>

                    <h2 className="text-xl font-bold text-stone-900 mb-6">
                      Delivery Information
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1">
                          Full Name *
                        </label>
                        <input
                        type="text"
                        value={deliveryInfo.fullName}
                        onChange={(e) =>
                        setDeliveryInfo({
                          ...deliveryInfo,
                          fullName: e.target.value
                        })
                        }
                        className={`w-full px-4 py-3 rounded-lg border ${errors.fullName ? 'border-red-500' : 'border-stone-300'} focus:ring-2 focus:ring-orange-500 outline-none`}
                        placeholder="John Doe" />

                        {errors.fullName &&
                      <p className="text-red-500 text-sm mt-1">
                            {errors.fullName}
                          </p>
                      }
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1">
                          Street Address *
                        </label>
                        <input
                        type="text"
                        value={deliveryInfo.address}
                        onChange={(e) =>
                        setDeliveryInfo({
                          ...deliveryInfo,
                          address: e.target.value
                        })
                        }
                        className={`w-full px-4 py-3 rounded-lg border ${errors.address ? 'border-red-500' : 'border-stone-300'} focus:ring-2 focus:ring-orange-500 outline-none`}
                        placeholder="123 Main Street" />

                        {errors.address &&
                      <p className="text-red-500 text-sm mt-1">
                            {errors.address}
                          </p>
                      }
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-stone-700 mb-1">
                            City *
                          </label>
                          <input
                          type="text"
                          value={deliveryInfo.city}
                          onChange={(e) =>
                          setDeliveryInfo({
                            ...deliveryInfo,
                            city: e.target.value
                          })
                          }
                          className={`w-full px-4 py-3 rounded-lg border ${errors.city ? 'border-red-500' : 'border-stone-300'} focus:ring-2 focus:ring-orange-500 outline-none`}
                          placeholder="New York" />

                          {errors.city &&
                        <p className="text-red-500 text-sm mt-1">
                              {errors.city}
                            </p>
                        }
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-stone-700 mb-1">
                            ZIP Code *
                          </label>
                          <input
                          type="text"
                          value={deliveryInfo.zipCode}
                          onChange={(e) =>
                          setDeliveryInfo({
                            ...deliveryInfo,
                            zipCode: e.target.value
                          })
                          }
                          className={`w-full px-4 py-3 rounded-lg border ${errors.zipCode ? 'border-red-500' : 'border-stone-300'} focus:ring-2 focus:ring-orange-500 outline-none`}
                          placeholder="10001" />

                          {errors.zipCode &&
                        <p className="text-red-500 text-sm mt-1">
                              {errors.zipCode}
                            </p>
                        }
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1">
                          Phone Number *
                        </label>
                        <input
                        type="tel"
                        value={deliveryInfo.phone}
                        onChange={(e) =>
                        setDeliveryInfo({
                          ...deliveryInfo,
                          phone: e.target.value
                        })
                        }
                        className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-stone-300'} focus:ring-2 focus:ring-orange-500 outline-none`}
                        placeholder="(555) 123-4567" />

                        {errors.phone &&
                      <p className="text-red-500 text-sm mt-1">
                            {errors.phone}
                          </p>
                      }
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1">
                          Delivery Instructions (Optional)
                        </label>
                        <textarea
                        value={deliveryInfo.instructions}
                        onChange={(e) =>
                        setDeliveryInfo({
                          ...deliveryInfo,
                          instructions: e.target.value
                        })
                        }
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-orange-500 outline-none resize-none"
                        placeholder="Leave at door, ring bell, etc." />

                      </div>
                    </div>
                  </motion.div>
                }

                {/* Step 2: Payment */}
                {currentStep === 2 &&
                <motion.div
                  key="payment"
                  initial={{
                    opacity: 0,
                    x: 20
                  }}
                  animate={{
                    opacity: 1,
                    x: 0
                  }}
                  exit={{
                    opacity: 0,
                    x: -20
                  }}>

                    <h2 className="text-xl font-bold text-stone-900 mb-6">
                      Payment Method
                    </h2>
                    <PaymentOptions
                    selectedMethod={paymentMethod}
                    onMethodChange={setPaymentMethod} />

                  </motion.div>
                }

                {/* Step 3: Review */}
                {currentStep === 3 &&
                <motion.div
                  key="review"
                  initial={{
                    opacity: 0,
                    x: 20
                  }}
                  animate={{
                    opacity: 1,
                    x: 0
                  }}
                  exit={{
                    opacity: 0,
                    x: -20
                  }}>

                    <h2 className="text-xl font-bold text-stone-900 mb-6">
                      Review Your Order
                    </h2>

                    {/* Delivery Info Summary */}
                    <div className="mb-6 p-4 bg-stone-50 rounded-xl">
                      <h3 className="font-semibold text-stone-900 mb-2 flex items-center gap-2">
                        <MapPinIcon className="h-4 w-4" />
                        Delivery Address
                      </h3>
                      <p className="text-stone-600">
                        {deliveryInfo.fullName}
                        <br />
                        {deliveryInfo.address}
                        <br />
                        {deliveryInfo.city}, {deliveryInfo.zipCode}
                        <br />
                        {deliveryInfo.phone}
                      </p>
                      {deliveryInfo.instructions &&
                    <p className="text-stone-500 text-sm mt-2">
                          Note: {deliveryInfo.instructions}
                        </p>
                    }
                    </div>

                    {/* Payment Summary */}
                    <div className="mb-6 p-4 bg-stone-50 rounded-xl">
                      <h3 className="font-semibold text-stone-900 mb-2 flex items-center gap-2">
                        <CreditCardIcon className="h-4 w-4" />
                        Payment Method
                      </h3>
                      <p className="text-stone-600 capitalize">
                        {paymentMethod === 'card' && 'Credit/Debit Card'}
                        {paymentMethod === 'paypal' && 'PayPal'}
                        {paymentMethod === 'digital' &&
                      'Apple Pay / Google Pay'}
                        {paymentMethod === 'cash' && 'Cash on Delivery'}
                      </p>
                    </div>

                    {/* Items Summary */}
                    <div className="mb-6">
                      <h3 className="font-semibold text-stone-900 mb-3">
                        Order Items
                      </h3>
                      <div className="space-y-3">
                        {items.map((cartItem) => {
                        const price =
                        cartItem.item.isOnSale && cartItem.item.salePrice ?
                        cartItem.item.salePrice :
                        cartItem.item.price;
                        return (
                          <div
                            key={cartItem.item.id}
                            className="flex items-center gap-3">

                              <img
                              src={cartItem.item.image}
                              alt={cartItem.item.name}
                              className="w-12 h-12 rounded-lg object-cover" />

                              <div className="flex-1">
                                <p className="font-medium text-stone-900">
                                  {cartItem.item.name}
                                </p>
                                <p className="text-sm text-stone-500">
                                  Qty: {cartItem.quantity}
                                </p>
                              </div>
                              <p className="font-medium text-stone-900">
                                Rs. {(price * cartItem.quantity).toFixed(2)}
                              </p>
                            </div>);

                      })}
                      </div>
                    </div>
                  </motion.div>
                }
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-stone-100">
                {currentStep > 1 ?
                <button
                  onClick={handlePrevStep}
                  className="flex items-center gap-2 text-stone-600 hover:text-stone-900 font-medium">

                    <ChevronLeftIcon className="h-5 w-5" />
                    Back
                  </button> :

                <Link
                  to="/cart"
                  className="flex items-center gap-2 text-stone-600 hover:text-stone-900 font-medium">

                    <ChevronLeftIcon className="h-5 w-5" />
                    Back to Cart
                  </Link>
                }

                {currentStep < 3 ?
                <button
                  onClick={handleNextStep}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold transition-colors">

                    Continue
                  </button> :

                <button
                  onClick={handlePlaceOrder}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold transition-colors">

                    Place Order
                  </button>
                }
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <h3 className="text-lg font-bold text-stone-900 mb-4">
                Order Summary
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal ({items.length} items)</span>
                  <span>Rs. {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Delivery</span>
                  <span>
                    {deliveryFee === 0 ?
                    'Free' :
                    `Rs. ${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Tax</span>
                  <span>Rs. {tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-stone-900 pt-3 border-t border-stone-100">
                  <span>Total</span>
                  <span>Rs. {total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>);

}