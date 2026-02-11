
import React, { useState } from 'react';
import { User, PageType, UserRole } from '../types';
import { Menu, X, User as UserIcon, LogOut, LayoutDashboard, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  user: User | null;
  currentPage: PageType;
  navigateTo: (page: PageType) => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, currentPage, navigateTo, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navLinks: { label: string; page: PageType }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Events', page: 'events' },
    { label: 'News', page: 'news' },
    { label: 'About', page: 'about' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 dark-glass h-16 px-4 md:px-8 flex items-center justify-between border-b border-white/5">
      <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigateTo('home')}>
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <span className="text-white font-extrabold text-xl">O</span>
        </div>
        <div className="hidden sm:block">
          <h1 className="font-bold text-lg tracking-tight leading-none text-white">OKLAHOMABASHI</h1>
          <p className="text-[10px] text-slate-400 font-medium tracking-widest uppercase">Connecting Bangladesh in OK</p>
        </div>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center space-x-8">
        {navLinks.map((link) => (
          <button
            key={link.page}
            onClick={() => navigateTo(link.page)}
            className={`text-sm font-medium transition-colors hover:text-emerald-400 ${
              currentPage === link.page ? 'text-emerald-400' : 'text-slate-300'
            }`}
          >
            {link.label}
          </button>
        ))}
      </div>

      {/* User Actions */}
      <div className="flex items-center space-x-4">
        {user ? (
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 py-1.5 px-3 rounded-full transition-all border border-white/10"
            >
              <div className="w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center text-xs font-bold">
                {user.name[0]}
              </div>
              <span className="text-sm font-medium hidden lg:inline">{user.name}</span>
            </button>
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-white/10 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-2 border-b border-white/5 mb-2">
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Account</p>
                </div>
                <button
                  onClick={() => { navigateTo('dashboard'); setShowUserMenu(false); }}
                  className="w-full flex items-center space-x-3 px-4 py-2.5 hover:bg-white/5 text-slate-300 text-sm transition-colors"
                >
                  <UserIcon size={18} />
                  <span>My Dashboard</span>
                </button>
                {user.role === UserRole.ADMIN && (
                  <button
                    onClick={() => { navigateTo('admin'); setShowUserMenu(false); }}
                    className="w-full flex items-center space-x-3 px-4 py-2.5 hover:bg-white/5 text-slate-300 text-sm transition-colors"
                  >
                    <ShieldCheck size={18} className="text-amber-400" />
                    <span>Admin Panel</span>
                  </button>
                )}
                <button
                  onClick={() => { navigateTo('verify'); setShowUserMenu(false); }}
                  className="w-full flex items-center space-x-3 px-4 py-2.5 hover:bg-white/5 text-slate-300 text-sm transition-colors"
                >
                  <LayoutDashboard size={18} />
                  <span>Verify Tickets</span>
                </button>
                <div className="border-t border-white/5 mt-2 pt-2">
                  <button
                    onClick={() => { onLogout(); setShowUserMenu(false); }}
                    className="w-full flex items-center space-x-3 px-4 py-2.5 hover:bg-red-500/10 text-red-400 text-sm transition-colors"
                  >
                    <LogOut size={18} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigateTo('login')}
              className="text-sm font-semibold text-white px-4 py-2 hover:bg-white/5 rounded-lg transition-all"
            >
              Sign In
            </button>
            <button
              onClick={() => navigateTo('register')}
              className="text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg transition-all shadow-lg shadow-emerald-600/20"
            >
              Join Us
            </button>
          </div>
        )}

        <button
          className="md:hidden text-slate-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-slate-900 border-b border-white/5 p-4 space-y-4 md:hidden animate-in slide-in-from-top-5 duration-300">
          {navLinks.map((link) => (
            <button
              key={link.page}
              onClick={() => { navigateTo(link.page); setIsOpen(false); }}
              className="block w-full text-left py-2 px-4 text-slate-300 hover:bg-white/5 rounded-lg"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
