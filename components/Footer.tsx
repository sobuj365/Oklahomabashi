
import React from 'react';
import { PageType } from '../types';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

interface FooterProps {
  navigateTo: (page: PageType) => void;
}

const Footer: React.FC<FooterProps> = ({ navigateTo }) => {
  return (
    <footer className="bg-slate-900 pt-20 pb-10 border-t border-white/5">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center font-bold text-white text-xl">O</div>
              <h2 className="font-bold text-white tracking-tight">OKLAHOMABASHI</h2>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Oklahomabashi is a non-profit organization dedicated to serving the Oklahoma-Bangladeshi community through cultural enrichment and athletic excellence.
            </p>
            <div className="flex space-x-4">
              <button className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:bg-emerald-600 hover:text-white transition-all"><Facebook size={20} /></button>
              <button className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:bg-emerald-600 hover:text-white transition-all"><Twitter size={20} /></button>
              <button className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:bg-emerald-600 hover:text-white transition-all"><Instagram size={20} /></button>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Quick Links</h3>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><button onClick={() => navigateTo('home')} className="hover:text-emerald-400 transition-colors">Home</button></li>
              <li><button onClick={() => navigateTo('events')} className="hover:text-emerald-400 transition-colors">Upcoming Events</button></li>
              <li><button onClick={() => navigateTo('news')} className="hover:text-emerald-400 transition-colors">Latest News</button></li>
              <li><button onClick={() => navigateTo('about')} className="hover:text-emerald-400 transition-colors">About Us</button></li>
              <li><button onClick={() => navigateTo('contact')} className="hover:text-emerald-400 transition-colors">Contact</button></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Our Societies</h3>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">OK Cultural Society (OBCS)</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">OK Sports Society (OBSS)</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Volunteer Programs</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Youth Engagement</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Contact Info</h3>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-emerald-500 shrink-0" />
                <span>Oklahoma City, Oklahoma, USA</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-emerald-500 shrink-0" />
                <span>info@oklahomabashi.org</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-emerald-500 shrink-0" />
                <span>+1 (405) 555-0123</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs text-slate-500 font-bold uppercase tracking-widest">
          <p>© 2024 Oklahomabashi Nonprofit. All Rights Reserved.</p>
          <div className="flex space-x-8">
            <a href="#" className="hover:text-emerald-400">Privacy Policy</a>
            <a href="#" className="hover:text-emerald-400">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
