import React, { useState, Component } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SearchIcon,
  ShoppingCartIcon,
  UserIcon,
  MenuIcon,
  XIcon,
  UtensilsIcon,
  ChevronDownIcon } from
'lucide-react';
import { useCart } from '../../context/CartContext';
import { categories } from '../../data/mockData';
export function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const { getItemCount } = useCart();
  const navigate = useNavigate();
  const itemCount = getItemCount();
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMobileMenuOpen(false);
    }
  };
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-orange-500 p-2 rounded-lg">
              <UtensilsIcon className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-stone-900">FoodBay</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {/* Categories Dropdown */}
            <div className="relative">
              <button
                onClick={() =>
                setIsCategoryDropdownOpen(!isCategoryDropdownOpen)
                }
                onBlur={() =>
                setTimeout(() => setIsCategoryDropdownOpen(false), 150)
                }
                className="flex items-center gap-1 text-stone-700 hover:text-orange-600 transition-colors font-medium">

                Categories
                <ChevronDownIcon
                  className={`h-4 w-4 transition-transform ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />

              </button>

              <AnimatePresence>
                {isCategoryDropdownOpen &&
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10
                  }}
                  animate={{
                    opacity: 1,
                    y: 0
                  }}
                  exit={{
                    opacity: 0,
                    y: 10
                  }}
                  className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-stone-100 py-2 overflow-hidden">

                    {categories.map((category) =>
                  <Link
                    key={category.id}
                    to={`/category/${category.id}`}
                    className="block px-4 py-2 text-stone-700 hover:bg-orange-50 hover:text-orange-600 transition-colors">

                        {category.name}
                      </Link>
                  )}
                  </motion.div>
                }
              </AnimatePresence>
            </div>
          </nav>

          {/* Search Bar - Desktop */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-md mx-6">

            <div className="relative w-full">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for food, cafes..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-stone-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all" />

            </div>
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <Link to="/cart" className="relative">
              <motion.div
                whileTap={{
                  scale: 0.9
                }}>

                <ShoppingCartIcon className="h-6 w-6 text-stone-700 hover:text-orange-600 transition-colors" />
                <AnimatePresence>
                  {itemCount > 0 &&
                  <motion.span
                    initial={{
                      scale: 0
                    }}
                    animate={{
                      scale: 1
                    }}
                    exit={{
                      scale: 0
                    }}
                    className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">

                      {itemCount > 99 ? '99+' : itemCount}
                    </motion.span>
                  }
                </AnimatePresence>
              </motion.div>
            </Link>

            {/* User Account */}
            <Link to="/auth" className="hidden md:block">
              <UserIcon className="h-6 w-6 text-stone-700 hover:text-orange-600 transition-colors" />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2"
              aria-label="Toggle menu">

              {isMobileMenuOpen ?
              <XIcon className="h-6 w-6 text-stone-700" /> :

              <MenuIcon className="h-6 w-6 text-stone-700" />
              }
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen &&
          <motion.div
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
            className="md:hidden border-t border-stone-100 py-4">

              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="mb-4">
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400" />
                  <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for food, cafes..."
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-stone-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all" />

                </div>
              </form>

              {/* Mobile Categories */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide px-2">
                  Categories
                </p>
                {categories.map((category) =>
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-2 py-2 text-stone-700 hover:text-orange-600 transition-colors">

                    {category.name}
                  </Link>
              )}
              </div>

              {/* Mobile Account */}
              <div className="mt-4 pt-4 border-t border-stone-100">
                <Link
                to="/auth"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 px-2 py-2 text-stone-700 hover:text-orange-600 transition-colors">

                  <UserIcon className="h-5 w-5" />
                  Sign In / Sign Up
                </Link>
              </div>
            </motion.div>
          }
        </AnimatePresence>
      </div>
    </header>);

}