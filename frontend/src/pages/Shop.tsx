import React, { useEffect, useState } from 'react';
import productsApi from '../api/products';
import { Product, Category } from '../types';
import ProductCard from '../components/ProductCard';

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [selectedCategory, search]);

  const fetchCategories = async () => {
    try {
      const res = await productsApi.listCategories();
      setCategories(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await productsApi.list({ 
        category: selectedCategory || undefined,
        search: search || undefined
      });
      setProducts(res.data.data.items);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="pt-32 px-8 md:px-20 pb-20 flex flex-col md:flex-row gap-16">
      {/* SIDEBAR */}
      <aside className="w-full md:w-64 space-y-12">

        <div>
          <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-muted mb-8 italic">Categories</h2>
          <div className="space-y-4">
            <button 
              onClick={() => setSelectedCategory('')}
              className={`block font-display text-lg hover:italic transition-all ${selectedCategory === '' ? 'text-amber-accent italic' : 'text-ice'}`}
            >
              All Pieces
            </button>
            {categories.map(cat => (
              <button 
                key={cat._id}
                onClick={() => setSelectedCategory(cat._id)}
                className={`block font-display text-lg hover:italic transition-all text-left ${selectedCategory === cat._id ? 'text-amber-accent italic' : 'text-ice'}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 space-y-12">
        {/* TOP SEARCH BAR */}
        <div className="relative group">
           <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-accent/20 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity blur" />
           <div className="relative flex items-center border-b border-white-alpha bg-background/50 backdrop-blur-sm group-focus-within:border-amber-accent transition-colors">
              <span className="pl-4 font-mono text-[10px] uppercase text-ice tracking-[0.3em] font-bold italic">Search /</span>
              <input 
                 type="text" 
                 placeholder="Enter keywords..."
                 value={search}
                 onChange={e => setSearch(e.target.value)}
                 className="flex-1 bg-transparent px-6 py-6 font-display text-2xl italic tracking-tight text-ice focus:outline-none placeholder:text-muted/30"
              />
              {search && (
                 <button 
                    onClick={() => setSearch('')}
                    className="pr-6 font-mono text-[10px] uppercase text-ice hover:text-amber-accent transition-colors"
                 >
                    Clear
                 </button>
              )}
           </div>
        </div>

        <div className="flex justify-between items-end border-b border-white-alpha pb-8">
          <h1 className="font-display text-5xl italic uppercase">
             Collection
          </h1>
          <p className="font-mono text-[10px] uppercase text-muted tracking-widest">
            Showing {products.length} Results
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="animate-pulse space-y-4">
                <div className="aspect-[3/4] bg-surface" />
                <div className="h-4 bg-surface w-2/3" />
                <div className="h-4 bg-surface w-1/3" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="h-96 flex flex-col items-center justify-center space-y-4 opacity-40">
             <p className="font-mono text-xs uppercase tracking-widest text-center">No pieces match your aesthetic.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Shop;
