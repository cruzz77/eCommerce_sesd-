import React from 'react';
import { Link } from 'react-router-dom';
import Spline from '@splinetool/react-spline';

const Home: React.FC = () => {
  const categories = [
    { name: 'Apparel', img: 'https://images.unsplash.com/photo-1539109136881-3be0610cac62?auto=format&fit=crop&q=80&w=800' },
    { name: 'Footwear', img: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800' },
    { name: 'Accessories', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800' },
    { name: 'Timepieces', img: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=800' },
    { name: 'Lifestyle', img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800' }
  ];

  return (
    <div className="flex flex-col">
      {/* HERO SECTION */}
      <section className="h-screen flex flex-col md:flex-row relative">
        {/* LEFT PANEL */}
        <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-8 md:px-20 pt-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-amber-accent mb-6 animate-fade-up">
            New Collection 2025
          </p>
          <h1 className="font-display text-7xl md:text-[96px] leading-[0.9] uppercase italic animate-fade-up" style={{ animationDelay: '0.1s' }}>
            The Future <br /> of Shopping
          </h1>
          <p className="font-baskerville text-muted text-lg md:text-xl mt-8 max-w-md animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Redefining luxury through architectural silhouettes and digital-first craftsmanship.
          </p>
          
          <div className="flex gap-6 mt-12 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <Link to="/shop" className="btn-amber">Shop Now</Link>
            <Link to="/lookbook" className="btn-ghost">View Lookbook</Link>
          </div>

          <div className="flex gap-12 mt-20 font-mono text-[10px] uppercase tracking-widest text-muted animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <div>
              <p className="text-ice text-lg">500+</p>
              <p>Products</p>
            </div>
            <div>
              <p className="text-ice text-lg">50k+</p>
              <p>Customers</p>
            </div>
            <div>
              <p className="text-ice text-lg">99%</p>
              <p>Satisfaction</p>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL - SPLINE */}
        <div className="w-full md:w-1/2 h-full relative overflow-hidden bg-black flex items-center justify-center">
          <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-background via-transparent to-transparent" />
          <div className="w-[115%] h-[115%] absolute -bottom-[7%] -right-[7%] pointer-events-none">
            <Spline 
              scene="https://prod.spline.design/GkYBkzJLu6TPcj7p/scene.splinecode" 
              className="w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* CATEGORY CAROUSEL */}
      <section className="bg-background border-y border-white-alpha py-20 overflow-hidden group">
        <div className="px-8 md:px-20 mb-10 flex justify-between items-end">
          <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-muted italic font-bold">The Archive / Categories</h2>
          <p className="font-mono text-[9px] uppercase tracking-widest text-muted">Auto-scrolling Gallery</p>
        </div>
        
        <div className="flex w-fit animate-marquee hover:[animation-play-state:paused] gap-6 px-4">
          {[...categories, ...categories].map((cat, i) => (
            <Link 
              to="/shop" 
              key={cat.name + i} 
              className="group/card relative flex-shrink-0 w-[240px] md:w-[320px] aspect-[3/4] bg-surface overflow-hidden border border-white-alpha hover:border-amber-accent/40 transition-all duration-700"
            >
              <img 
                src={cat.img} 
                alt={cat.name} 
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-50 group-hover/card:scale-110 group-hover/card:grayscale-0 group-hover/card:opacity-100 transition-all duration-[2s]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-70" />
              <div className="absolute bottom-6 left-6 space-y-1">
                <p className="font-mono text-[8px] uppercase tracking-[0.4em] text-amber-accent opacity-0 group-hover/card:opacity-100 transition-all duration-500 transform translate-y-3 group-hover/card:translate-y-0 italic">Explore</p>
                <h3 className="font-display text-2xl uppercase italic tracking-wider text-ice">{cat.name}</h3>
              </div>
            </Link>
          ))}
        </div>

        <style>
          {`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee {
              animation: marquee 40s linear infinite;
            }
          `}
        </style>
      </section>

      {/* WHY SHOPSPHERE */}
      <section className="py-32 px-8 md:px-20 grid grid-cols-1 md:grid-cols-3 gap-16 border-b border-white-alpha">
        <div className="space-y-6">
          <div className="w-12 h-12 border border-amber-accent/30 flex items-center justify-center font-mono">01</div>
          <h3 className="font-display text-2xl uppercase italic">Free Delivery</h3>
          <p className="font-baskerville text-muted leading-relaxed">
            World-class logistics ensuring your pieces arrive in pristine condition, anywhere on the globe.
          </p>
        </div>
        <div className="space-y-6">
          <div className="w-12 h-12 border border-amber-accent/30 flex items-center justify-center font-mono">02</div>
          <h3 className="font-display text-2xl uppercase italic">Secure Payments</h3>
          <p className="font-baskerville text-muted leading-relaxed">
            State-of-the-art encryption across multiple channels including UPI, Wallet, and Primary Credit.
          </p>
        </div>
        <div className="space-y-6">
          <div className="w-12 h-12 border border-amber-accent/30 flex items-center justify-center font-mono">03</div>
          <h3 className="font-display text-2xl uppercase italic">Easy Returns</h3>
          <p className="font-baskerville text-muted leading-relaxed">
            A seamless 30-day return policy because we believe high-end retail should be risk-free.
          </p>
        </div>
      </section>

      {/* FOOTER MINI */}
      <footer className="py-20 px-8 md:px-20 flex flex-col md:flex-row justify-between items-center opacity-40 hover:opacity-100 transition-opacity">
        <div className="font-mono text-[10px] uppercase tracking-widest">
          © 2025 SHOPSPHERE LTD. ALL RIGHTS RESERVED.
        </div>
        <div className="flex gap-8 mt-6 md:mt-0 font-mono text-[10px] uppercase tracking-widest">
          <a href="#" className="hover:text-amber-accent">Privacy</a>
          <a href="#" className="hover:text-amber-accent">Terms</a>
          <a href="#" className="hover:text-amber-accent">Contact</a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
