import React, { useState, Children, Component } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  SearchIcon,
  ArrowRightIcon,
  TruckIcon,
  ClockIcon,
  ThumbsUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon } from
'lucide-react';
import {
  categories,
  getPopularItems,
  getTopRatedItems,
  promoBanners } from
'../data/mockData';
import { FoodCard } from '../components/food/FoodCard';
import { CategoryCard } from '../components/food/CategoryCard';
export function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');
  const [popularSlideIndex, setPopularSlideIndex] = useState(0);
  const navigate = useNavigate();
  const popularItems = getPopularItems();
  const topRatedItems = getTopRatedItems(6);
  const promoBanner = promoBanners[0];
  const ITEMS_PER_SLIDE = 5;
  const maxSlideIndex = Math.max(0, popularItems.length - ITEMS_PER_SLIDE);
  const handlePrevSlide = () => {
    setPopularSlideIndex((prev) => Math.max(0, prev - ITEMS_PER_SLIDE));
  };
  const handleNextSlide = () => {
    setPopularSlideIndex((prev) =>
    Math.min(maxSlideIndex, prev + ITEMS_PER_SLIDE)
    );
  };
  const canGoPrev = popularSlideIndex > 0;
  const canGoNext = popularSlideIndex < maxSlideIndex;
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail('');
    alert('Thanks for subscribing!');
  };
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0
    }
  };
  return (
    <main className="min-h-screen bg-amber-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=80"
            alt=""
            className="w-full h-full object-cover" />

          <div className="absolute inset-0 bg-gradient-to-r from-stone-900/90 via-stone-900/70 to-stone-900/40" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-32">
          <motion.div
            initial={{
              opacity: 0,
              y: 30
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.6
            }}
            className="max-w-2xl">

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Fresh Food,
              <br />
              <span className="text-orange-400">Delivered Fast</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-300 mb-8">
              Discover the best food from local cafes and restaurants. Order
              online and get it delivered to your doorstep.
            </p>

            {/* Hero Search */}
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What are you craving today?"
                  className="w-full pl-12 pr-4 py-4 rounded-xl text-lg focus:ring-2 focus:ring-orange-500 outline-none" />

              </div>
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold transition-colors">

                Search
              </button>
            </form>

            {/* Quick Links */}
            <div className="flex flex-wrap gap-2 mt-6">
              {['Coffee', 'Burgers', 'Pizza', 'Salads', 'Desserts'].map(
                (tag) =>
                <Link
                  key={tag}
                  to={`/search?q=${tag.toLowerCase()}`}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm transition-colors">

                    {tag}
                  </Link>

              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true
          }}
          variants={containerVariants}>

          <motion.div
            variants={itemVariants}
            className="flex items-center justify-between mb-8">

            <h2 className="text-2xl md:text-3xl font-bold text-stone-900">
              Browse Categories
            </h2>
            <Link
              to="/category/meals"
              className="text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1">

              View All <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) =>
            <motion.div
              key={category.id}
              variants={itemVariants}
              custom={index}>

                <CategoryCard category={category} />
              </motion.div>
            )}
          </div>
        </motion.div>
      </section>

      {/* Popular Items Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true
          }}
          variants={containerVariants}>

          <motion.div
            variants={itemVariants}
            className="flex items-center justify-between mb-8">

            <h2 className="text-2xl md:text-3xl font-bold text-stone-900">
              Popular Right Now
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevSlide}
                disabled={!canGoPrev}
                className={`p-2 rounded-full border transition-colors ${canGoPrev ? 'border-stone-300 text-stone-700 hover:bg-orange-500 hover:border-orange-500 hover:text-white' : 'border-stone-200 text-stone-300 cursor-not-allowed'}`}
                aria-label="Previous items">

                <ChevronLeftIcon className="h-5 w-5" />
              </button>
              <button
                onClick={handleNextSlide}
                disabled={!canGoNext}
                className={`p-2 rounded-full border transition-colors ${canGoNext ? 'border-stone-300 text-stone-700 hover:bg-orange-500 hover:border-orange-500 hover:text-white' : 'border-stone-200 text-stone-300 cursor-not-allowed'}`}
                aria-label="Next items">

                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>
          </motion.div>

          <div className="overflow-hidden">
            <motion.div
              className="flex gap-4"
              animate={{
                x: -(popularSlideIndex * (288 + 16))
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30
              }}>

              {popularItems.map((item, index) =>
              <motion.div
                key={item.id}
                variants={itemVariants}
                custom={index}
                className="flex-shrink-0 w-72">

                  <FoodCard item={item} />
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Slide Indicators */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {Array.from({
              length: Math.ceil(popularItems.length / ITEMS_PER_SLIDE)
            }).map((_, i) => {
              const isActive =
              popularSlideIndex >= i * ITEMS_PER_SLIDE &&
              popularSlideIndex < (i + 1) * ITEMS_PER_SLIDE;
              return (
                <button
                  key={i}
                  onClick={() =>
                  setPopularSlideIndex(
                    Math.min(i * ITEMS_PER_SLIDE, maxSlideIndex)
                  )
                  }
                  className={`h-2 rounded-full transition-all ${isActive ? 'w-6 bg-orange-500' : 'w-2 bg-stone-300 hover:bg-stone-400'}`}
                  aria-label={`Go to slide ${i + 1}`} />);


            })}
          </div>
        </motion.div>
      </section>

      {/* Promo Banner */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95
          }}
          whileInView={{
            opacity: 1,
            scale: 1
          }}
          viewport={{
            once: true
          }}
          className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${promoBanner.bgColor}`}>

          <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-white text-center md:text-left">
              <h3 className="text-2xl md:text-4xl font-bold mb-2">
                {promoBanner.title}
              </h3>
              <p className="text-white/90 text-lg">{promoBanner.subtitle}</p>
            </div>
            <Link
              to={promoBanner.ctaLink}
              className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-3 rounded-full font-semibold transition-colors whitespace-nowrap">

              {promoBanner.ctaText}
            </Link>
          </div>
          <div className="absolute right-0 top-0 w-1/3 h-full opacity-20">
            <img
              src={promoBanner.image}
              alt=""
              className="w-full h-full object-cover" />

          </div>
        </motion.div>
      </section>

      {/* Top Rated Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true
          }}
          variants={containerVariants}>

          <motion.div
            variants={itemVariants}
            className="flex items-center justify-between mb-8">

            <h2 className="text-2xl md:text-3xl font-bold text-stone-900">
              Top Rated
            </h2>
            <Link
              to="/category/meals"
              className="text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1">

              View All <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topRatedItems.map((item, index) =>
            <motion.div key={item.id} variants={itemVariants} custom={index}>
                <FoodCard item={item} />
              </motion.div>
            )}
          </div>
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true
            }}
            variants={containerVariants}>

            <motion.h2
              variants={itemVariants}
              className="text-2xl md:text-3xl font-bold text-stone-900 text-center mb-12">

              How It Works
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
              {
                icon: SearchIcon,
                title: 'Browse',
                description:
                'Explore menus from your favorite local cafes and restaurants'
              },
              {
                icon: ClockIcon,
                title: 'Order',
                description:
                'Add items to your cart and checkout in just a few clicks'
              },
              {
                icon: TruckIcon,
                title: 'Enjoy',
                description:
                'Sit back and relax while we deliver fresh food to your door'
              }].
              map((step, index) =>
              <motion.div
                key={step.title}
                variants={itemVariants}
                custom={index}
                className="text-center">

                  <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 text-orange-600 rounded-full mb-4">
                    <step.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-stone-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-stone-600">{step.description}</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-stone-900 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            className="text-center">

            <ThumbsUpIcon className="h-12 w-12 text-orange-500 mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Get Exclusive Deals
            </h2>
            <p className="text-stone-400 mb-8 max-w-md mx-auto">
              Subscribe to our newsletter and be the first to know about special
              offers and new menu items.
            </p>

            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />

              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">

                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </main>);

}