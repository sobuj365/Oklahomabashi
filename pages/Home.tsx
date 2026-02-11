
import React from 'react';
import Hero from '../components/Hero';
import { Event, BlogPost, PageType } from '../types';
import { ArrowRight, MapPin, Calendar, Clock } from 'lucide-react';

interface HomeProps {
  navigateTo: (page: PageType, id?: string) => void;
  events: Event[];
  posts: BlogPost[];
}

const Home: React.FC<HomeProps> = ({ navigateTo, events, posts }) => {
  const featuredEvents = events.slice(0, 3);
  const featuredPosts = posts.slice(0, 3);

  return (
    <div className="space-y-24 pb-20">
      <Hero navigateTo={navigateTo} />

      {/* Departments Section */}
      <section className="container mx-auto px-4 md:px-8">
        <div className="mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Our Societies</h2>
          <div className="h-1.5 w-24 bg-emerald-500 rounded-full" />
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative group overflow-hidden rounded-3xl h-[400px]">
            <img src="https://picsum.photos/seed/culture/800/600" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="OBCS" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <span className="text-emerald-400 font-bold text-xs uppercase tracking-[0.2em] mb-4 block">OBCS</span>
              <h3 className="text-3xl font-black text-white mb-2">Oklahoma-Bangladeshi Cultural Society</h3>
              <p className="text-slate-300 mb-6 max-w-md">Promoting and preserving the rich heritage, language, and cultural traditions of Bangladesh.</p>
              <button onClick={() => navigateTo('events')} className="flex items-center space-x-2 text-white font-bold group">
                <span>View Cultural Events</span>
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-2" />
              </button>
            </div>
          </div>

          <div className="relative group overflow-hidden rounded-3xl h-[400px]">
            <img src="https://picsum.photos/seed/sports/800/600" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="OBSS" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <span className="text-teal-400 font-bold text-xs uppercase tracking-[0.2em] mb-4 block">OBSS</span>
              <h3 className="text-3xl font-black text-white mb-2">Oklahoma-Bangladeshi Sports Society</h3>
              <p className="text-slate-300 mb-6 max-w-md">Fostering unity and physical well-being through sports, tournaments, and youth engagement.</p>
              <button onClick={() => navigateTo('events')} className="flex items-center space-x-2 text-white font-bold group">
                <span>View Sports Events</span>
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-2" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="container mx-auto px-4 md:px-8 bg-white/5 py-24 rounded-[3rem]">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Upcoming Events</h2>
            <p className="text-slate-400 font-medium">Don't miss out on these community gatherings.</p>
          </div>
          <button onClick={() => navigateTo('events')} className="hidden md:flex items-center space-x-2 text-emerald-400 font-bold hover:text-emerald-300 transition-colors">
            <span>View All</span>
            <ArrowRight size={20} />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {featuredEvents.map((event) => (
            <div key={event.id} className="bg-slate-900 rounded-3xl border border-white/5 overflow-hidden group hover:border-emerald-500/30 transition-all shadow-xl">
              <div className="h-56 relative">
                <img src={event.image} className="w-full h-full object-cover transition-transform group-hover:scale-105" alt={event.title} />
                <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                  <span className="text-[10px] font-black text-emerald-400 tracking-widest uppercase">{event.category}</span>
                </div>
                <div className="absolute bottom-4 right-4 bg-emerald-600 px-4 py-2 rounded-xl text-white font-bold text-lg shadow-lg">
                  ${event.price}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 line-clamp-1">{event.title}</h3>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-slate-400 text-sm">
                    <Calendar size={14} className="mr-2 text-emerald-500" />
                    <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center text-slate-400 text-sm">
                    <Clock size={14} className="mr-2 text-emerald-500" />
                    <span>{new Date(event.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <div className="flex items-center text-slate-400 text-sm">
                    <MapPin size={14} className="mr-2 text-emerald-500" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                </div>
                <button
                  onClick={() => navigateTo('buy-ticket', event.id)}
                  className="w-full py-3 bg-emerald-600 group-hover:bg-emerald-500 text-white rounded-xl font-bold transition-all flex items-center justify-center"
                >
                  Book Ticket
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest News */}
      <section className="container mx-auto px-4 md:px-8">
        <div className="mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Latest Updates</h2>
          <div className="h-1.5 w-24 bg-emerald-500 rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.map((post) => (
            <div key={post.id} className="group cursor-pointer" onClick={() => navigateTo('news')}>
              <div className="h-48 overflow-hidden rounded-2xl mb-4">
                <img src={post.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt={post.title} />
              </div>
              <span className="text-emerald-500 text-xs font-bold uppercase tracking-widest">{post.category}</span>
              <h3 className="text-xl font-bold text-white mt-2 group-hover:text-emerald-400 transition-colors">{post.title}</h3>
              <p className="text-slate-400 text-sm mt-3 line-clamp-2">{post.excerpt}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-slate-500 font-bold uppercase">
                <span>By {post.author}</span>
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
