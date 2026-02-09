import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CreditCardIcon,
  WalletIcon,
  BanknoteIcon,
  SmartphoneIcon } from
'lucide-react';
type PaymentMethod = 'card' | 'paypal' | 'digital' | 'cash';
type PaymentOptionsProps = {
  selectedMethod: PaymentMethod;
  onMethodChange: (method: PaymentMethod) => void;
};
export function PaymentOptions({
  selectedMethod,
  onMethodChange
}: PaymentOptionsProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [paypalEmail, setPaypalEmail] = useState('');
  const paymentMethods = [
  {
    id: 'card' as PaymentMethod,
    name: 'Credit/Debit Card',
    icon: CreditCardIcon,
    description: 'Visa, Mastercard, Amex'
  },
  {
    id: 'paypal' as PaymentMethod,
    name: 'PayPal',
    icon: WalletIcon,
    description: 'Pay with your PayPal account'
  },
  {
    id: 'digital' as PaymentMethod,
    name: 'Apple Pay / Google Pay',
    icon: SmartphoneIcon,
    description: 'Quick one-tap payment'
  },
  {
    id: 'cash' as PaymentMethod,
    name: 'Cash on Delivery',
    icon: BanknoteIcon,
    description: 'Pay when you receive'
  }];

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };
  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };
  return (
    <div className="space-y-4">
      {/* Payment Method Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          const isSelected = selectedMethod === method.id;
          return (
            <motion.button
              key={method.id}
              type="button"
              onClick={() => onMethodChange(method.id)}
              className={`p-4 rounded-xl border-2 text-left transition-all ${isSelected ? 'border-orange-500 bg-orange-50' : 'border-stone-200 bg-white hover:border-stone-300'}`}
              whileTap={{
                scale: 0.98
              }}>

              <div className="flex items-start gap-3">
                <div
                  className={`p-2 rounded-lg ${isSelected ? 'bg-orange-500 text-white' : 'bg-stone-100 text-stone-600'}`}>

                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p
                    className={`font-medium ${isSelected ? 'text-orange-700' : 'text-stone-900'}`}>

                    {method.name}
                  </p>
                  <p className="text-xs text-stone-500">{method.description}</p>
                </div>
              </div>
            </motion.button>);

        })}
      </div>

      {/* Payment Form Fields */}
      <AnimatePresence mode="wait">
        {selectedMethod === 'card' &&
        <motion.div
          key="card-form"
          initial={{
            opacity: 0,
            height: 0
          }}
          animate={{
            opacity: 1,
            height: 'auto'
          }}
          exit={{
            opacity: 0,
            height: 0
          }}
          className="space-y-4 pt-4">

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Card Number
              </label>
              <input
              type="text"
              value={cardNumber}
              onChange={(e) =>
              setCardNumber(formatCardNumber(e.target.value))
              }
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all" />

            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">
                  Expiry Date
                </label>
                <input
                type="text"
                value={cardExpiry}
                onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                placeholder="MM/YY"
                maxLength={5}
                className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all" />

              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">
                  CVV
                </label>
                <input
                type="text"
                value={cardCvv}
                onChange={(e) =>
                setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))
                }
                placeholder="123"
                maxLength={4}
                className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all" />

              </div>
            </div>
          </motion.div>
        }

        {selectedMethod === 'paypal' &&
        <motion.div
          key="paypal-form"
          initial={{
            opacity: 0,
            height: 0
          }}
          animate={{
            opacity: 1,
            height: 'auto'
          }}
          exit={{
            opacity: 0,
            height: 0
          }}
          className="pt-4">

            <label className="block text-sm font-medium text-stone-700 mb-1">
              PayPal Email
            </label>
            <input
            type="email"
            value={paypalEmail}
            onChange={(e) => setPaypalEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all" />

          </motion.div>
        }

        {selectedMethod === 'digital' &&
        <motion.div
          key="digital-form"
          initial={{
            opacity: 0,
            height: 0
          }}
          animate={{
            opacity: 1,
            height: 'auto'
          }}
          exit={{
            opacity: 0,
            height: 0
          }}
          className="pt-4">

            <div className="bg-stone-50 rounded-xl p-6 text-center">
              <SmartphoneIcon className="h-12 w-12 text-stone-400 mx-auto mb-3" />
              <p className="text-stone-600">
                Click "Place Order" to complete payment with Apple Pay or Google
                Pay
              </p>
            </div>
          </motion.div>
        }

        {selectedMethod === 'cash' &&
        <motion.div
          key="cash-form"
          initial={{
            opacity: 0,
            height: 0
          }}
          animate={{
            opacity: 1,
            height: 'auto'
          }}
          exit={{
            opacity: 0,
            height: 0
          }}
          className="pt-4">

            <div className="bg-amber-50 rounded-xl p-6 text-center border border-amber-200">
              <BanknoteIcon className="h-12 w-12 text-amber-500 mx-auto mb-3" />
              <p className="text-amber-800">
                Please have exact change ready. Our delivery partner will
                collect payment upon delivery.
              </p>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}
export type { PaymentMethod };