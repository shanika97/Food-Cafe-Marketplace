import React from 'react';
import { Link } from 'react-router-dom';
import {
  UtensilsIcon,
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  CreditCardIcon,
  WalletIcon,
  SmartphoneIcon } from
'lucide-react';
export function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-orange-500 p-2 rounded-lg">
                <UtensilsIcon className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">FoodBay</span>
            </div>
            <p className="text-sm leading-relaxed">
              Your favorite local cafes and restaurants, delivered fresh to your
              door. Quality food, fast delivery, happy customers.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/category/beverages"
                  className="hover:text-orange-400 transition-colors">

                  Beverages
                </Link>
              </li>
              <li>
                <Link
                  to="/category/pastries"
                  className="hover:text-orange-400 transition-colors">

                  Pastries
                </Link>
              </li>
              <li>
                <Link
                  to="/category/meals"
                  className="hover:text-orange-400 transition-colors">

                  Meals
                </Link>
              </li>
              <li>
                <Link
                  to="/category/snacks"
                  className="hover:text-orange-400 transition-colors">

                  Snacks
                </Link>
              </li>
              <li>
                <Link
                  to="/category/desserts"
                  className="hover:text-orange-400 transition-colors">

                  Desserts
                </Link>
              </li>
              <li>
                <Link
                  to="/category/breakfast"
                  className="hover:text-orange-400 transition-colors">

                  Breakfast
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">
                  Track Your Order
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">
                  Shipping & Delivery
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">
                  Returns & Refunds
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm">
              <li>support@foodbay.com</li>
              <li>1-800-FOODBAY</li>
              <li>Mon - Sun: 8am - 10pm</li>
            </ul>

            {/* Social Links */}
            <div className="flex gap-4 mt-4">
              <a
                href="#"
                className="hover:text-orange-400 transition-colors"
                aria-label="Facebook">

                <FacebookIcon className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="hover:text-orange-400 transition-colors"
                aria-label="Twitter">

                <TwitterIcon className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="hover:text-orange-400 transition-colors"
                aria-label="Instagram">

                <InstagramIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-stone-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-sm">We accept:</span>
              <div className="flex items-center gap-3">
                <CreditCardIcon className="h-8 w-8 text-stone-500" />
                <WalletIcon className="h-8 w-8 text-stone-500" />
                <SmartphoneIcon className="h-8 w-8 text-stone-500" />
              </div>
            </div>
            <p className="text-sm text-stone-500">
              © {new Date().getFullYear()} FoodBay. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>);

}