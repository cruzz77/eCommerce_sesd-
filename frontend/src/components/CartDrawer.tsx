import React from 'react';
import { useCartStore } from '../store/cartStore';
import { Link } from 'react-router-dom';

const CartDrawer: React.FC = () => {
  const { cart, isOpen, toggleDrawer, updateItem, removeItem } = useCartStore();

  if (!isOpen) return null;

  const subtotal = cart?.items.reduce((sum, item) => sum + item.priceSnapshot * item.quantity, 0) || 0;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* BACKDROP */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={toggleDrawer}
      />

      {/* DRAWER */}
      <div className="relative w-full max-w-md bg-surface border-l border-white-alpha h-full shadow-2xl flex flex-col animate-fade-up">
        <div className="p-8 border-b border-white-alpha flex items-center justify-between">
          <h2 className="text-2xl font-display uppercase italic">Your Archive</h2>
          <button onClick={toggleDrawer} className="text-muted hover:text-ice transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {!cart?.items || cart.items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-40">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              <p className="font-mono text-xs uppercase tracking-widest">Archive is empty</p>
            </div>
          ) : (
            cart.items.map((item) => {
              const product = item.productId;
              if (!product || typeof product === 'string') return null;

              return (
                <div key={product._id} className="flex gap-4">
                  <div className="w-20 h-24 bg-surface border border-white-alpha overflow-hidden">
                    {product.images?.[0] ? (
                      <img 
                        src={product.images[0]} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-mono text-[8px] text-muted">No Image</div>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display text-sm tracking-wide">{product.name}</h3>
                      <p className="font-mono text-[10px] text-muted uppercase mt-1">₹{item.priceSnapshot}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-white-alpha">
                        <button 
                          onClick={() => {
                            if (item.quantity === 1) {
                              removeItem(product._id);
                            } else {
                              updateItem(product._id, item.quantity - 1);
                            }
                          }}
                          className="px-2 py-1 hover:bg-white/5 transition-colors"
                        >
                          -
                        </button>
                        <span className="px-3 font-mono text-xs">{item.quantity}</span>
                        <button 
                          onClick={() => updateItem(product._id, item.quantity + 1)}
                          className="px-2 py-1 hover:bg-white/5 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <button 
                        onClick={() => removeItem(product._id)}
                        className="text-[10px] font-mono uppercase text-error/60 hover:text-error transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="p-8 border-t border-white-alpha bg-black/20">
          <div className="flex justify-between items-end mb-6">
            <span className="font-mono text-xs uppercase text-muted tracking-widest">Subtotal</span>
            <span className="font-display text-3xl">₹{subtotal.toLocaleString()}</span>
          </div>
          <Link 
            to="/checkout" 
            onClick={toggleDrawer}
            className="w-full btn-amber flex items-center justify-center gap-2"
          >
            Checkout
          </Link>
          <p className="text-[9px] font-mono text-muted uppercase tracking-widest text-center mt-4">
            Shipping & Taxes calculated at checkout
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
