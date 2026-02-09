import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCartIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FoodItem } from '../../data/mockData';
import { StarRating } from '../ui/StarRating';
import { useCart } from '../../context/CartContext';
type FoodCardProps = {
  item: FoodItem;
};
export function FoodCard({ item }: FoodCardProps) {
  const { addToCart } = useCart();
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(item);
  };
  const displayPrice =
  item.isOnSale && item.salePrice ? item.salePrice : item.price;
  return (
    <Link to={`/product/${item.id}`}>
      <motion.article
        className="bg-white rounded-xl shadow-sm overflow-hidden group cursor-pointer h-full flex flex-col"
        whileHover={{
          y: -4,
          boxShadow: '0 12px 24px -8px rgba(0,0,0,0.15)'
        }}
        transition={{
          duration: 0.2
        }}>

        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />

          {item.isOnSale &&
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              SALE
            </span>
          }
          {item.isPopular && !item.isOnSale &&
          <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              POPULAR
            </span>
          }
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <p className="text-xs text-stone-500 mb-1">{item.cafeName}</p>
          <h3 className="font-semibold text-stone-900 mb-1 line-clamp-1">
            {item.name}
          </h3>

          <div className="mb-2">
            <StarRating
              rating={item.rating}
              reviewCount={item.reviewCount}
              size="sm" />

          </div>

          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-orange-600">
                Rs. {displayPrice.toFixed(2)}
              </span>
              {item.isOnSale && item.salePrice &&
              <span className="text-sm text-stone-400 line-through">
                  Rs. {item.price.toFixed(2)}
                </span>
              }
            </div>

            <motion.button
              onClick={handleAddToCart}
              className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full transition-colors"
              whileTap={{
                scale: 0.9
              }}
              aria-label={`Add ${item.name} to cart`}>

              <ShoppingCartIcon className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </motion.article>
    </Link>);

}