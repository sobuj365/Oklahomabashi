
import React from 'react';
import { ChevronRight, Calendar, Users, Heart } from 'lucide-react';

interface HeroProps {
  navigateTo: (page: any) => void;
}

const Hero: React.FC<HeroProps> = ({ navigateTo }) => {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20 px-4">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full" />
      
      <div className="container mx-auto max-w-6xl relative z-10 text-center">
        <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full mb-8">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Empowering the Oklahoma-Bangladeshi Community</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight leading-[1.1]">
          Building a <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Brighter</span> Future Together.
        </h1>
        
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
          The home of Bangladeshi culture and sports in Oklahoma. We connect, celebrate, and support our community through vibrant events and initiatives.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigateTo('events')}
            className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-all shadow-xl shadow-emerald-600/30 flex items-center justify-center group"
          >
            Explore Events
            <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => navigateTo('about')}
            className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-all border border-white/5"
          >
            Our Mission
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-24">
          {[
            { label: 'Community Members', value: '2,500+', icon: Users, color: 'text-emerald-400' },
            { label: 'Events Hosted', value: '150+', icon: Calendar, color: 'text-blue-400' },
            { label: 'Volunteers', value: '450+', icon: Heart, color: 'text-rose-400' },
            { label: 'Donations Raised', value: '$120k', icon: Heart, color: 'text-amber-400' },
          ].map((stat, i) => (
            <div key={i} className="glass-effect p-6 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
              <stat.icon size={24} className={`${stat.color} mb-4 mx-auto`} />
              <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
