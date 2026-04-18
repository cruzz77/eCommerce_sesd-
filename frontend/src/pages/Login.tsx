import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  const { login, isLoading, token } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (token) navigate('/');
  }, [token, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err: any) {
      console.error('Login Catch:', err);
      const errorMsg = err.response?.data?.message || err.message || 'Authentication failed. Please check your credentials.';
      setError(errorMsg);
    }
  };

  return (
    <div className="h-screen flex">
      {/* LEFT: DECORATIVE */}
      <div className="hidden lg:flex w-1/2 bg-surface items-center justify-center p-20 relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-5 select-none pointer-events-none flex flex-col justify-around">
          {[1,2,3,4,5].map(i => (
            <span key={i} className="text-[12rem] font-display font-black uppercase whitespace-nowrap">SHOPSPHERE</span>
          ))}
        </div>
        <div className="z-10 text-center space-y-8 animate-fade-up">
          <h1 className="font-display text-7xl uppercase italic tracking-tighter">The Private <br /> Collection</h1>
          <p className="font-mono text-xs uppercase tracking-[0.5em] text-amber-accent">Access Required</p>
        </div>
        <div className="absolute bottom-10 left-10 w-40 h-[1px] bg-amber-accent/20" />
      </div>

      {/* RIGHT: FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 border-l border-white-alpha">
        <div className="w-full max-w-md space-y-12 animate-fade-up">
          <div>
            <h2 className="font-display text-4xl uppercase italic mb-2 tracking-tighter">Login</h2>
            <p className="font-mono text-[10px] uppercase text-muted tracking-widest">Sign in to your editorial account</p>
          </div>

          {/* PREMIUM ERROR UI */}
          {error && (
            <div className="p-4 bg-red-500/5 border border-red-500/20 text-red-400 font-mono text-[10px] uppercase tracking-widest animate-fade-up">
              ● Error: {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
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
              {isLoading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

          <p className="font-mono text-[10px] uppercase tracking-widest text-center text-muted">
            New to the sphere? <Link to="/register" className="text-ice hover:text-amber-accent transition-colors">Create Archive</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
