import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';

const Navbar: React.FC = () => {
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);
  const toggleDrawer = useCartStore(state => state.toggleDrawer);
  const itemCount = useCartStore(state => state.cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass h-20 flex items-center px-8 md:px-16 justify-between">
      {/* LOGO */}
      <Link to="/" className="flex items-center gap-2 group">
        <div className="w-2 h-2 bg-amber-accent rounded-full group-hover:scale-150 transition-transform duration-300" />
        <span className="font-mono text-xl tracking-tighter font-bold uppercase">SHOPSPHERE</span>
      </Link>

      {/* NAVIGATION */}
      <div className="hidden md:flex items-center gap-12 font-mono text-xs tracking-widest uppercase">
        <Link to="/shop" className="amber-sweep py-1">Collection</Link>
        <Link to="/about" className="amber-sweep py-1">About</Link>
        {user?.role === 'admin' && (
          <Link to="/admin" className="amber-sweep py-1 text-amber-accent">Admin</Link>
        )}
      </div>

      {/* ACTIONS */}
      <div className="flex items-center gap-6">
        {user ? (
          <div className="flex items-center gap-6">
            <Link to="/orders" className="amber-sweep font-mono text-xs uppercase tracking-widest hidden sm:block">
              Orders
            </Link>
            <button 
              onClick={logout}
              className="amber-sweep font-mono text-xs uppercase tracking-widest text-muted hover:text-ice transition-colors"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="amber-sweep font-mono text-xs uppercase tracking-widest">
            Login
          </Link>
        )}

        {/* CART TRIGGER */}
        <button 
          onClick={toggleDrawer}
          className="relative p-2 group"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-amber-accent text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
