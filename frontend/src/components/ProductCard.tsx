import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useCartStore } from '../store/cartStore';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem, isLoading } = useCartStore();

  const effectivePrice = product.discountPercent > 0 
    ? parseFloat((product.price * (1 - product.discountPercent / 100)).toFixed(2))
    : product.price;

  return (
    <div className="group animate-fade-up">
      <Link to={`/product/${product._id}`} className="block relative aspect-[3/4] overflow-hidden border border-white-alpha mb-4">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {product.discountPercent > 0 && (
          <div className="absolute top-4 left-4 bg-amber-accent px-2 py-1 text-[10px] font-mono font-bold text-black uppercase">
            -{product.discountPercent}%
          </div>
        )}
      </Link>

      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber-accent">
              {typeof product.categoryId === 'object' ? product.categoryId.name : 'Catalogue'}
            </p>
            <Link to={`/product/${product._id}`} className="block">
              <h3 className="font-display text-lg tracking-wide group-hover:italic transition-all">
                {product.name}
              </h3>
            </Link>
          </div>
          <div className="text-right">
            <p className="font-mono text-sm">₹{effectivePrice}</p>
            {product.discountPercent > 0 && (
              <p className="font-mono text-[10px] text-muted line-through">₹{product.price}</p>
            )}
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between border-t border-white-alpha/50">
          <div className="flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full ${product.stock > 10 ? 'bg-success' : product.stock > 0 ? 'bg-amber-accent' : 'bg-error'}`} />
            <span className="font-mono text-[9px] uppercase tracking-widest text-muted">
              {product.stock > 10 ? 'Available' : product.stock > 0 ? `Only ${product.stock} Left` : 'Sold Out'}
            </span>
          </div>
          
          <button 
            disabled={product.stock === 0 || isLoading}
            onClick={() => addItem(product._id, 1)}
            className="font-mono text-[10px] uppercase tracking-widest text-muted hover:text-amber-accent transition-colors disabled:opacity-30"
          >
            {isLoading ? 'Adding...' : '+ Archive'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
