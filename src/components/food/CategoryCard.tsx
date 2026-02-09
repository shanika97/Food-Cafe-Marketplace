import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Category } from '../../data/mockData';
type CategoryCardProps = {
  category: Category;
};
export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link to={`/category/${category.id}`}>
      <motion.article
        className="relative aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer"
        whileHover={{
          scale: 1.02
        }}
        transition={{
          duration: 0.2
        }}>

        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />


        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="text-xl font-bold mb-1">{category.name}</h3>
          <p className="text-sm text-white/80">{category.itemCount} items</p>
        </div>
      </motion.article>
    </Link>);

}