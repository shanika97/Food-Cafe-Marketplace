import React, { useMemo, useState, Children } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SearchIcon, SlidersHorizontalIcon, XIcon } from 'lucide-react';
import { searchItems } from '../data/mockData';
import { FoodCard } from '../components/food/FoodCard';
import { StarRating } from '../components/ui/StarRating';
type SortOption = 'relevance' | 'rating' | 'price-low' | 'price-high';
export function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50]);
  const [minRating, setMinRating] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const results = searchItems(query);
  const filteredAndSortedResults = useMemo(() => {
    let filtered = results.filter((item) => {
      const price =
      item.isOnSale && item.salePrice ? item.salePrice : item.price;
      if (price < priceRange[0] || price > priceRange[1]) return false;
      if (item.rating < minRating) return false;
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
        // Keep original order for relevance
        break;
    }
    return filtered;
  }, [results, sortBy, priceRange, minRating]);
  return (
    <main className="min-h-screen bg-amber-50">
      {/* Search Header */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <SearchIcon className="h-6 w-6 text-stone-400" />
            <h1 className="text-2xl font-bold text-stone-900">
              Search results for "{query}"
            </h1>
          </div>
          <p className="text-stone-500">
            {filteredAndSortedResults.length}{' '}
            {filteredAndSortedResults.length === 1 ? 'result' : 'results'} found
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {results.length > 0 ?
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

                    <option value="relevance">Most Relevant</option>
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

                {/* Apply Button (Mobile) */}
                <button
                onClick={() => setIsFilterOpen(false)}
                className="lg:hidden w-full mt-6 bg-orange-500 text-white py-3 rounded-lg font-semibold">

                  Apply Filters
                </button>
              </div>
            </aside>

            {/* Results Grid */}
            <div className="flex-1">
              {filteredAndSortedResults.length > 0 ?
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

                  {filteredAndSortedResults.map((item) =>
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
                }}
                className="mt-4 text-orange-600 hover:underline">

                    Clear all filters
                  </button>
                </div>
            }
            </div>
          </div> :

        <div className="text-center py-16">
            <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <SearchIcon className="h-12 w-12 text-stone-400" />
            </div>
            <h2 className="text-2xl font-bold text-stone-900 mb-2">
              No results found
            </h2>
            <p className="text-stone-500 mb-8">
              We couldn't find anything matching "{query}". Try a different
              search term.
            </p>
            <Link
            to="/"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors">

              Browse All Items
            </Link>
          </div>
        }
      </div>
    </main>);

}