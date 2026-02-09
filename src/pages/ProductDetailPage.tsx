import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronRightIcon,
  MinusIcon,
  PlusIcon,
  ShoppingCartIcon,
  ThumbsUpIcon } from
'lucide-react';
import {
  getItemById,
  getCategoryById,
  getReviewsByProductId,
  getItemsByCategory } from
'../data/mockData';
import { useCart } from '../context/CartContext';
import { StarRating } from '../components/ui/StarRating';
import { FoodCard } from '../components/food/FoodCard';
type TabType = 'description' | 'nutrition' | 'reviews';
export function ProductDetailPage() {
  const { productId } = useParams<{
    productId: string;
  }>();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<TabType>('description');
  const { addToCart } = useCart();
  const item = getItemById(productId || '');
  const category = item ? getCategoryById(item.categoryId) : null;
  const reviews = getReviewsByProductId(productId || '');
  const relatedItems = item ?
  getItemsByCategory(item.categoryId).
  filter((i) => i.id !== item.id).
  slice(0, 4) :
  [];
  if (!item) {
    return (
      <main className="min-h-screen bg-amber-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-stone-900 mb-2">
            Product Not Found
          </h1>
          <Link to="/" className="text-orange-600 hover:underline">
            Go back home
          </Link>
        </div>
      </main>);

  }
  const displayPrice =
  item.isOnSale && item.salePrice ? item.salePrice : item.price;
  const handleAddToCart = () => {
    addToCart(item, quantity);
    setQuantity(1);
  };
  return (
    <main className="min-h-screen bg-amber-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm flex-wrap">
            <Link to="/" className="text-stone-500 hover:text-orange-600">
              Home
            </Link>
            <ChevronRightIcon className="h-4 w-4 text-stone-400" />
            {category &&
            <>
                <Link
                to={`/category/${category.id}`}
                className="text-stone-500 hover:text-orange-600">

                  {category.name}
                </Link>
                <ChevronRightIcon className="h-4 w-4 text-stone-400" />
              </>
            }
            <span className="text-stone-900 font-medium truncate">
              {item.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Product Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image */}
          <motion.div
            initial={{
              opacity: 0,
              x: -20
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-sm">

            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover" />

            {item.isOnSale &&
            <span className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                SALE
              </span>
            }
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{
              opacity: 0,
              x: 20
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            className="flex flex-col">

            <p className="text-orange-600 font-medium mb-1">{item.cafeName}</p>
            <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
              {item.name}
            </h1>

            <div className="mb-4">
              <StarRating
                rating={item.rating}
                reviewCount={item.reviewCount}
                size="lg" />

            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-bold text-orange-600">
                Rs. {displayPrice.toFixed(2)}
              </span>
              {item.isOnSale && item.salePrice &&
              <span className="text-xl text-stone-400 line-through">
                  Rs. {item.price.toFixed(2)}
                </span>
              }
            </div>

            <p className="text-stone-600 mb-6 leading-relaxed">
              {item.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {item.tags.map((tag) =>
              <span
                key={tag}
                className="px-3 py-1 bg-amber-100 text-amber-800 text-sm rounded-full">

                  {tag}
                </span>
              )}
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-4 mt-auto">
              <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-2 shadow-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 hover:bg-stone-100 rounded-full transition-colors"
                  aria-label="Decrease quantity">

                  <MinusIcon className="h-5 w-5 text-stone-600" />
                </button>
                <span className="w-8 text-center font-semibold text-lg">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 hover:bg-stone-100 rounded-full transition-colors"
                  aria-label="Increase quantity">

                  <PlusIcon className="h-5 w-5 text-stone-600" />
                </button>
              </div>

              <motion.button
                onClick={handleAddToCart}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-4 px-8 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
                whileTap={{
                  scale: 0.98
                }}>

                <ShoppingCartIcon className="h-5 w-5" />
                Add to Cart
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-12">
          {/* Tab Headers */}
          <div className="flex border-b border-stone-200">
            {(['description', 'nutrition', 'reviews'] as TabType[]).map(
              (tab) =>
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 px-6 font-medium capitalize transition-colors relative ${activeTab === tab ? 'text-orange-600' : 'text-stone-500 hover:text-stone-700'}`}>

                  {tab === 'reviews' ? `Reviews (${reviews.length})` : tab}
                  {activeTab === tab &&
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500" />

                }
                </button>

            )}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'description' &&
            <motion.div
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}
              className="prose prose-stone max-w-none">

                <p className="text-stone-600 leading-relaxed">
                  {item.description}
                </p>
                <p className="text-stone-600 leading-relaxed mt-4">
                  Prepared fresh daily at {item.cafeName}. Our commitment to
                  quality means using only the finest ingredients sourced from
                  local suppliers whenever possible.
                </p>
              </motion.div>
            }

            {activeTab === 'nutrition' &&
            <motion.div
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}>

                {item.nutritionInfo ?
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-amber-50 rounded-xl p-4 text-center">
                      <p className="text-2xl font-bold text-stone-900">
                        {item.nutritionInfo.calories}
                      </p>
                      <p className="text-sm text-stone-500">Calories</p>
                    </div>
                    <div className="bg-amber-50 rounded-xl p-4 text-center">
                      <p className="text-2xl font-bold text-stone-900">
                        {item.nutritionInfo.protein}
                      </p>
                      <p className="text-sm text-stone-500">Protein</p>
                    </div>
                    <div className="bg-amber-50 rounded-xl p-4 text-center">
                      <p className="text-2xl font-bold text-stone-900">
                        {item.nutritionInfo.carbs}
                      </p>
                      <p className="text-sm text-stone-500">Carbs</p>
                    </div>
                    <div className="bg-amber-50 rounded-xl p-4 text-center">
                      <p className="text-2xl font-bold text-stone-900">
                        {item.nutritionInfo.fat}
                      </p>
                      <p className="text-sm text-stone-500">Fat</p>
                    </div>
                  </div> :

              <p className="text-stone-500">
                    Nutrition information not available.
                  </p>
              }
              </motion.div>
            }

            {activeTab === 'reviews' &&
            <motion.div
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}
              className="space-y-6">

                {reviews.length > 0 ?
              reviews.map((review) =>
              <div
                key={review.id}
                className="border-b border-stone-100 pb-6 last:border-0">

                      <div className="flex items-start gap-4">
                        <img
                    src={review.userAvatar}
                    alt={review.userName}
                    className="w-12 h-12 rounded-full object-cover" />

                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-stone-900">
                              {review.userName}
                            </h4>
                            <span className="text-sm text-stone-400">
                              {review.date}
                            </span>
                          </div>
                          <StarRating
                      rating={review.rating}
                      showCount={false}
                      size="sm" />

                          <p className="text-stone-600 mt-2">
                            {review.comment}
                          </p>
                          <button className="flex items-center gap-1 text-sm text-stone-500 hover:text-orange-600 mt-2">
                            <ThumbsUpIcon className="h-4 w-4" />
                            Helpful ({review.helpful})
                          </button>
                        </div>
                      </div>
                    </div>
              ) :

              <p className="text-stone-500 text-center py-8">
                    No reviews yet. Be the first to review!
                  </p>
              }
              </motion.div>
            }
          </div>
        </div>

        {/* Related Items */}
        {relatedItems.length > 0 &&
        <section>
            <h2 className="text-2xl font-bold text-stone-900 mb-6">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedItems.map((relatedItem) =>
            <FoodCard key={relatedItem.id} item={relatedItem} />
            )}
            </div>
          </section>
        }
      </div>
    </main>);

}