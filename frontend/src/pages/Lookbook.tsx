import React from 'react';
import { Link } from 'react-router-dom';

const Lookbook: React.FC = () => {
  const editorialItems = [
    {
      id: 1,
      title: "Obsidian Shadows",
      subtitle: "Series 01",
      image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1200",
      size: "large"
    },
    {
      id: 2,
      title: "Brutalist Form",
      subtitle: "Series 01",
      image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&q=80&w=800",
      size: "small"
    },
    {
      id: 3,
      title: "Metallic Echo",
      subtitle: "Series 02",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800",
      size: "small"
    },
    {
      id: 4,
      title: "Silence of Texture",
      subtitle: "Series 02",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1200",
      size: "medium"
    },
    {
      id: 5,
      title: "Architectural Drape",
      subtitle: "Series 03",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=1200",
      size: "large"
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-8 md:px-20">
      {/* HEADER */}
      <div className="mb-20 space-y-4 max-w-2xl">
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-amber-accent animate-fade-up">Editorial Archive</p>
        <h1 className="font-display text-6xl uppercase italic tracking-tighter animate-fade-up" style={{ animationDelay: '0.1s' }}>
          Vol. 01 <br /> The Visual Collective
        </h1>
        <p className="font-baskerville text-muted text-lg animate-fade-up" style={{ animationDelay: '0.2s' }}>
          A curated perspective on sculptural fashion and the intersection of architecture and apparel.
        </p>
      </div>

      {/* MASONRY GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 auto-rows-[200px]">
        {editorialItems.map((item, index) => (
          <div 
            key={item.id}
            className={`group relative overflow-hidden bg-surface animate-fade-up ${
              item.size === 'large' ? 'lg:col-span-2 lg:row-span-3' : 
              item.size === 'medium' ? 'lg:col-span-2 lg:row-span-2' : 
              'lg:row-span-2'
            }`}
            style={{ animationDelay: `${0.1 * (index + 3)}s` }}
          >
            <img 
              src={item.image} 
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-8 flex flex-col justify-end">
              <p className="font-mono text-[10px] uppercase tracking-widest text-amber-accent mb-2">{item.subtitle}</p>
              <h3 className="font-display text-2xl uppercase italic">{item.title}</h3>
              <Link to="/shop" className="mt-4 font-mono text-[10px] uppercase tracking-widest text-white border-b border-white w-fit opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100 italic">
                Shop the Look
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER CTA */}
      <div className="mt-40 border-t border-white-alpha pt-20 text-center space-y-8">
        <h2 className="font-display text-4xl uppercase italic">Ready to explore?</h2>
        <Link to="/shop" className="btn-amber px-12">View Full Collection</Link>
      </div>
    </div>
  );
};

export default Lookbook;
