import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import productsApi from '../api/products';
import { Product } from '../types';
import { useCartStore } from '../store/cartStore';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { addItem, isLoading: isAdding } = useCartStore();

  const handleAddToCart = async () => {
    if (!product) return;
    try {
      await addItem(product._id, 1);
      setSuccessMessage('your item has been added to cart successfully');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (id) fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await productsApi.getById(id!);
      setProduct(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div className="h-screen flex items-center justify-center bg-background"><div className="w-8 h-8 border-2 border-amber-accent border-t-transparent rounded-full animate-spin" /></div>;
  if (!product) return <div className="h-screen flex items-center justify-center bg-background">Product Not Found</div>;

  return (
    <div className="pt-32 px-8 md:px-20 pb-20">
      <div className="flex flex-col lg:flex-row gap-20">
        {/* GALLERY */}
        <div className="w-full lg:w-1/2 space-y-4">
          <div className="aspect-[3/4] overflow-hidden border border-white-alpha">
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, i) => (
              <div key={i} className="aspect-square border border-white-alpha opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                <img src={img} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* INFO */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <div className="mb-12">
            <p className="font-mono text-xs uppercase tracking-[0.4em] text-amber-accent mb-4">
              {typeof product.categoryId === 'object' ? product.categoryId.name : 'Collection'}
            </p>
            <h1 className="font-display text-6xl uppercase italic leading-tight mb-4">
              {product.name}
            </h1>
            <div className="flex items-center gap-6 mt-6">
              <span className="font-display text-4xl">₹{product.price}</span>
              {product.discountPercent > 0 && (
                <span className="font-mono text-sm text-muted bg-white/5 px-3 py-1 border border-white-alpha">
                  Save {product.discountPercent}%
                </span>
              )}
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted">Availability</span>
                <span className="font-mono text-[10px] uppercase tracking-widest">{product.stock} Units Left</span>
              </div>
              <div className="w-full h-1 bg-surface">
                <div 
                  className="h-full bg-amber-accent transition-all duration-1000" 
                  style={{ width: `${Math.min(100, (product.stock / 50) * 100)}%` }}
                />
              </div>
            </div>

            <p className="font-baskerville text-muted leading-relaxed text-lg">
              {product.description}
            </p>

            <div className="pt-8 space-y-4">
              {successMessage && (
                <div className="bg-amber-accent/10 border border-amber-accent/20 py-3 px-4 animate-fade-up">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-amber-accent text-center">
                    {successMessage}
                  </p>
                </div>
              )}
              <button 
                disabled={product.stock === 0 || isAdding}
                onClick={handleAddToCart}
                className="w-full btn-amber py-4 text-sm font-bold"
              >
                {isAdding ? 'Adding to Archive...' : 'Add to Archive'}
              </button>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-center text-muted">
                Free shipping worldwide on all editorial pieces
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
