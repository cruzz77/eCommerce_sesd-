import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* HERO SECTION */}
      <div className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2000" 
          alt="Brand Aesthetic" 
          className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 scale-110 animate-fade-up"
          style={{ animationDuration: '2s' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background" />
        
        <div className="relative z-10 text-center space-y-8 max-w-4xl px-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-amber-accent animate-fade-up">Est. 2026</p>
          <h1 className="font-display text-7xl md:text-9xl uppercase italic tracking-tighter animate-fade-up" style={{ animationDelay: '0.2s' }}>
            ShopSphere
          </h1>
          <p className="font-baskerville text-xl md:text-2xl text-muted leading-relaxed animate-fade-up" style={{ animationDelay: '0.4s' }}>
            A visual archive of contemporary form. <br />
            Redefining technical luxury through a sculptural lens.
          </p>
        </div>
      </div>

      {/* CONTENT SECTIONS */}
      <div className="max-w-7xl mx-auto px-8 md:px-20 py-40 space-y-60">
        {/* PHILOSOPHY */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-amber-accent border-b border-amber-accent/20 pb-4 w-fit italic">The Philosophy</p>
            <h2 className="font-display text-5xl uppercase italic tracking-wide">Silence as a <br /> Statement</h2>
            <p className="font-baskerville text-lg text-muted leading-loose">
              We believe in the power of restraint. ShopSphere was founded on the principle that true luxury doesn't scream—it whispers. Our collections are a curation of archival pieces that prioritize silhouette, texture, and structural integrity over transient trends.
            </p>
          </div>
          <div className="aspect-[4/5] bg-surface border border-white-alpha overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1200" 
              alt="Sculptural Fashion" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            />
          </div>
        </section>

        {/* CRAFTSMANSHIP */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="lg:order-2 space-y-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-amber-accent border-b border-amber-accent/20 pb-4 w-fit italic">The Craft</p>
            <h2 className="font-display text-5xl uppercase italic tracking-wide">Precision in <br /> Every Stitch</h2>
            <p className="font-baskerville text-lg text-muted leading-loose">
              Every item in our archive is selected for its exceptional craftsmanship. We partner with artisans who share our obsession with detail, from the weight of the fabric to the durability of the hardware. This is fashion built for the long term—modern heirlooms for the discerning collector.
            </p>
          </div>
          <div className="lg:order-1 aspect-[4/5] bg-surface border border-white-alpha overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=1200" 
              alt="Detail Shot" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            />
          </div>
        </section>

        {/* VISION */}
        <section className="text-center space-y-12 max-w-3xl mx-auto">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-amber-accent italic">The Vision</p>
          <h2 className="font-display text-6xl uppercase italic tracking-tighter">Archiving the Future</h2>
          <p className="font-baskerville text-xl text-muted leading-relaxed italic">
            "ShopSphere is not just an e-commerce platform; it is a digital archival space. We are building a community of collectors who value form and function in equal measure."
          </p>
          <div className="pt-12">
            <Link to="/shop" className="btn-amber px-12 py-4">Explore the Collection</Link>
          </div>
        </section>
      </div>

      {/* FOOTER ACCENT */}
      <div className="h-[40vh] bg-surface flex items-center justify-center border-t border-white-alpha">
        <span className="font-display text-[15vw] uppercase italic text-white/5 select-none tracking-tighter">SHOPSPHERE</span>
      </div>
    </div>
  );
};

export default About;
