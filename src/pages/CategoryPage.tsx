import React, { useMemo, useState, Children } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRightIcon, SlidersHorizontalIcon, XIcon } from 'lucide-react';
import { getCategoryById, getItemsByCategory } from '../data/mockData';
import { FoodCard } from '../components/food/FoodCard';
import { StarRating } from '../components/ui/StarRating';
type SortOption = 'popular' | 'rating' | 'price-low' | 'price-high';
type DietaryFilter = 'vegan' | 'vegetarian' | 'gluten-free';
export function CategoryPage() {
  const { categoryId } = useParams<{
    categoryId: string;
  }>();
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50]);
  const [minRating, setMinRating] = useState(0);
  const [dietaryFilters, setDietaryFilters] = useState<DietaryFilter[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const category = getCategoryById(categoryId || '');
  const items = getItemsByCategory(categoryId || '');
  const filteredAndSortedItems = useMemo(() => {
    let filtered = items.filter((item) => {
      const price =
      item.isOnSale && item.salePrice ? item.salePrice : item.price;
      if (price < priceRange[0] || price > priceRange[1]) return false;
      if (item.rating < minRating) return false;
      if (dietaryFilters.length > 0) {
        const itemTags = item.tags.map((t) => t.toLowerCase());
        const hasMatchingDiet = dietaryFilters.some(
          (filter) =>
          itemTags.includes(filter) ||
          itemTags.includes(filter.replace('-', ' '))
        );
        if (!hasMatchingDiet) return false;
      }
      return true;
    });
    switch (sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'price-low':
        filtered.sort((a, b) => {
          const priceA = a.isOnSale && a.salePrice ? a.salePrice : a.price;
          const priceB = b.isOnSale && b.salePrice ? b.salePrice : b.price;
          return priceA - priceB;
        });
        break;
      case 'price-high':
        filtered.sort((a, b) => {
          const priceA = a.isOnSale && a.salePrice ? a.salePrice : a.price;
          const priceB = b.isOnSale && b.salePrice ? b.salePrice : b.price;
          return priceB - priceA;
        });
        break;
      default:
        filtered.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
    }
    return filtered;
  }, [items, sortBy, priceRange, minRating, dietaryFilters]);
  const toggleDietaryFilter = (filter: DietaryFilter) => {
    setDietaryFilters((prev) =>
    prev.includes(filter) ?
    prev.filter((f) => f !== filter) :
    [...prev, filter]
    );
  };
  if (!category) {
    return (
      <main className="min-h-screen bg-amber-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-stone-900 mb-2">
            Category Not Found
          </h1>
          <Link to="/" className="text-orange-600 hover:underline">
            Go back home
          </Link>
        </div>
      </main>);

  }
  return (
    <main className="min-h-screen bg-amber-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-stone-500 hover:text-orange-600">
              Home
            </Link>
            <ChevronRightIcon className="h-4 w-4 text-stone-400" />
            <span className="text-stone-900 font-medium">{category.name}</span>
          </nav>
        </div>
      </div>

      {/* Category Header */}
      <div className="relative h-48 md:h-64 overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {category.name}
            </h1>
            <p className="text-white/80">{category.description}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setIsFilterOpen(true)}
            className="lg:hidden flex items-center justify-center gap-2 bg-white px-4 py-3 rounded-xl shadow-sm font-medium">

            <SlidersHorizontalIcon className="h-5 w-5" />
            Filters
          </button>

          {/* Filter Sidebar */}
          <aside
            className={`
            fixed lg:static inset-0 z-50 lg:z-auto
            ${isFilterOpen ? 'block' : 'hidden lg:block'}
          `}>

            {/* Mobile Overlay */}
            <div
              className="lg:hidden absolute inset-0 bg-black/50"
              onClick={() => setIsFilterOpen(false)} />


            {/* Filter Content */}
            <div className="absolute lg:static right-0 top-0 h-full lg:h-auto w-80 lg:w-64 bg-white lg:rounded-xl shadow-lg lg:shadow-sm p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-6 lg:hidden">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button onClick={() => setIsFilterOpen(false)}>
                  <XIcon className="h-6 w-6" />
                </button>
              </div>

              {/* Sort By */}
              <div className="mb-6">
                <h4 className="font-semibold text-stone-900 mb-3">Sort By</h4>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none">

                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-semibold text-stone-900 mb-3">
                  Price Range
                </h4>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) =>
                    setPriceRange([Number(e.target.value), priceRange[1]])
                    }
                    min={0}
                    max={priceRange[1]}
                    className="w-20 px-2 py-1 border border-stone-300 rounded-lg text-center" />

                  <span className="text-stone-500">to</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) =>
                    setPriceRange([priceRange[0], Number(e.target.value)])
                    }
                    min={priceRange[0]}
                    className="w-20 px-2 py-1 border border-stone-300 rounded-lg text-center" />

                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-stone-900 mb-3">
                  Minimum Rating
                </h4>
                <div className="space-y-2">
                  {[4, 3, 2, 0].map((rating) =>
                  <label
                    key={rating}
                    className="flex items-center gap-2 cursor-pointer">

                      <input
                      type="radio"
                      name="rating"
                      checked={minRating === rating}
                      onChange={() => setMinRating(rating)}
                      className="text-orange-500 focus:ring-orange-500" />

                      {rating > 0 ?
                    <span className="flex items-center gap-1">
                          <StarRating
                        rating={rating}
                        showCount={false}
                        size="sm" />

                          <span className="text-sm text-stone-600">& up</span>
                        </span> :

                    <span className="text-sm text-stone-600">
                          All ratings
                        </span>
                    }
                    </label>
                  )}
                </div>
              </div>

              {/* Dietary Filters */}
              <div>
                <h4 className="font-semibold text-stone-900 mb-3">Dietary</h4>
                <div className="space-y-2">
                  {(
                  ['vegan', 'vegetarian', 'gluten-free'] as DietaryFilter[]).
                  map((filter) =>
                  <label
                    key={filter}
                    className="flex items-center gap-2 cursor-pointer">

                      <input
                      type="checkbox"
                      checked={dietaryFilters.includes(filter)}
                      onChange={() => toggleDietaryFilter(filter)}
                      className="rounded text-orange-500 focus:ring-orange-500" />

                      <span className="text-sm text-stone-700 capitalize">
                        {filter}
                      </span>
                    </label>
                  )}
                </div>
              </div>

              {/* Apply Button (Mobile) */}
              <button
                onClick={() => setIsFilterOpen(false)}
                className="lg:hidden w-full mt-6 bg-orange-500 text-white py-3 rounded-lg font-semibold">

                Apply Filters
              </button>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-stone-600">
                {filteredAndSortedItems.length}{' '}
                {filteredAndSortedItems.length === 1 ? 'item' : 'items'}
              </p>
            </div>

            {filteredAndSortedItems.length > 0 ?
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {
                  opacity: 0
                },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.05
                  }
                }
              }}
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

                {filteredAndSortedItems.map((item) =>
              <motion.div
                key={item.id}
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 20
                  },
                  visible: {
                    opacity: 1,
                    y: 0
                  }
                }}>

                    <FoodCard item={item} />
                  </motion.div>
              )}
              </motion.div> :

            <div className="text-center py-16">
                <p className="text-stone-500 text-lg">
                  No items match your filters
                </p>
                <button
                onClick={() => {
                  setPriceRange([0, 50]);
                  setMinRating(0);
                  setDietaryFilters([]);
                }}
                className="mt-4 text-orange-600 hover:underline">

                  Clear all filters
                </button>
              </div>
            }
          </div>
        </div>
      </div>
    </main>);

}