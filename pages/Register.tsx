
import React, { useState } from 'react';
import { User, UserRole, PageType } from '../types';

interface RegisterProps {
  onRegister: (user: User) => void;
  navigateTo: (page: PageType) => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister, navigateTo }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister({ id: `user-${Date.now()}`, name, email, role: UserRole.USER });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-900 border border-white/5 rounded-[2.5rem] p-10 shadow-2xl">
        <div className="text-center mb-10">
           <h1 className="text-4xl font-black text-white mb-4">Join Us</h1>
           <p className="text-slate-400 font-medium">Create your Oklahomabashi account today.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Full Name</label>
            <input 
              type="text" 
              required 
              className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-emerald-500 transition-colors"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Password</label>
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
            Create Account
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-white/5 text-center">
          <p className="text-slate-400 text-sm">
            Already have an account? 
            <button onClick={() => navigateTo('login')} className="ml-2 font-black text-emerald-400 hover:text-emerald-300">Sign In</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
