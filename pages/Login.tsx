
import React, { useState } from 'react';
import { User, UserRole, PageType } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
  navigateTo: (page: PageType) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, navigateTo }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation logic
    if (email === 'admin@oklahomabashi.com') {
      onLogin({ id: 'admin1', name: 'Admin User', email, role: UserRole.ADMIN });
    } else {
      onLogin({ id: 'user1', name: 'Guest User', email, role: UserRole.USER });
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-900 border border-white/5 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8">
           <div className="w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl" />
        </div>

        <div className="text-center mb-10">
           <h1 className="text-4xl font-black text-white mb-4">Welcome Back</h1>
           <p className="text-slate-400 font-medium">Join the Oklahoma-Bangladeshi community platform.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Email Address</label>
            <input 
              type="email" 
              required 
              className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-emerald-500 transition-colors"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <div className="flex justify-between mb-3">
              <label className="block text-xs font-black text-slate-500 uppercase tracking-widest">Password</label>
              <button type="button" className="text-xs font-bold text-emerald-500">Forgot?</button>
            </div>
            <input 
              type="password" 
              required 
              className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-emerald-500 transition-colors"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl py-5 font-black text-lg transition-all shadow-xl shadow-emerald-600/20"
          >
            Sign In
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-white/5 text-center">
          <p className="text-slate-400 text-sm">
            Don't have an account? 
            <button onClick={() => navigateTo('register')} className="ml-2 font-black text-emerald-400 hover:text-emerald-300">Sign Up</button>
          </p>
        </div>

        <div className="mt-8 bg-slate-800/50 p-4 rounded-2xl">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 text-center">Demo Accounts</p>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <button onClick={() => setEmail('user@oklahomabashi.com')} className="text-slate-300 hover:text-emerald-400 text-left">User Demo</button>
            <button onClick={() => setEmail('admin@oklahomabashi.com')} className="text-slate-300 hover:text-emerald-400 text-right">Admin Demo</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
