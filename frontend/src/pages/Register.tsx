import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<{ text: string; type: 'error' | 'success' } | null>(null);
  
  const { register, isLoading, token } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) navigate('/');
  }, [token, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    try {
      await register(name, email, password);
      setMessage({ text: 'Access Granted. Welcome to the archive.', type: 'success' });
      setTimeout(() => navigate('/'), 1500);
    } catch (err: any) {
      console.error('Registration Catch:', err);
      let errorMsg = 'The archive is currently unreachable. Please verify your connection.';
      
      if (err.response?.data?.message) {
        errorMsg = err.response.data.message;
      } else if (err.message) {
        errorMsg = err.message;
      }
      
      setMessage({ text: errorMsg, type: 'error' });
    }
  };

  return (
    <div className="h-screen flex">
      {/* LEFT: FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 border-r border-white-alpha">
        <div className="w-full max-w-md space-y-12 animate-fade-up">
          <div>
            <h2 className="font-display text-4xl uppercase italic mb-2 tracking-tighter">Register</h2>
            <p className="font-mono text-[10px] uppercase text-muted tracking-widest">Join the global luxury archive</p>
          </div>

          {/* PREMIUM NOTIFICATION UI */}
          {message && (
            <div className={`p-4 border font-mono text-[10px] uppercase tracking-widest animate-fade-up ${
              message.type === 'error' 
                ? 'bg-red-500/5 border-red-500/20 text-red-400' 
                : 'bg-amber-accent/5 border-amber-accent/20 text-amber-accent'
            }`}>
              {message.type === 'error' ? '● Error: ' : '● Success: '}
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="font-mono text-[10px] uppercase tracking-widest text-muted">Full Name</label>
              <input 
                required
                type="text"
                className="w-full bg-surface border border-white-alpha p-4 font-mono text-sm focus:border-amber-accent outline-none transition-colors"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="font-mono text-[10px] uppercase tracking-widest text-muted">Email Address</label>
              <input 
                required
                type="email"
                className="w-full bg-surface border border-white-alpha p-4 font-mono text-sm focus:border-amber-accent outline-none transition-colors"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="font-mono text-[10px] uppercase tracking-widest text-muted">Password</label>
              <input 
                required
                type="password"
                className="w-full bg-surface border border-white-alpha p-4 font-mono text-sm focus:border-amber-accent outline-none transition-colors"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <button 
              disabled={isLoading}
              type="submit"
              className="w-full btn-amber py-4 disabled:opacity-50"
            >
              {isLoading ? 'Processing Archive...' : 'Join Now'}
            </button>
          </form>

          <p className="font-mono text-[10px] uppercase tracking-widest text-center text-muted">
            Already a member? <Link to="/login" className="text-ice hover:text-amber-accent transition-colors">Sign In</Link>
          </p>
        </div>
      </div>

      {/* RIGHT: DECORATIVE */}
      <div className="hidden lg:flex w-1/2 bg-surface items-center justify-center p-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 select-none pointer-events-none flex flex-col justify-around rotate-12 scale-150">
          {[1,2,3,4,5].map(i => (
            <span key={i} className="text-[12rem] font-display font-black uppercase whitespace-nowrap">SHOPSPHERE</span>
          ))}
        </div>
        <div className="z-10 text-center space-y-8 animate-fade-up">
          <h1 className="font-display text-7xl uppercase italic tracking-tighter">Artisanal <br /> Standards</h1>
          <p className="font-mono text-xs uppercase tracking-[0.5em] text-amber-accent">Global Presence</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
