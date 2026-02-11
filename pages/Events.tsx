
import React, { useState } from 'react';
import { Event, PageType } from '../types';
import { Search, Filter, Calendar, MapPin, Users } from 'lucide-react';

interface EventsProps {
  events: Event[];
  navigateTo: (page: PageType, id?: string) => void;
}

const Events: React.FC<EventsProps> = ({ events, navigateTo }) => {
  const [filter, setFilter] = useState<'ALL' | 'CULTURAL' | 'SPORTS'>('ALL');
  const [search, setSearch] = useState('');

  const filteredEvents = events.filter(e => {
    const matchesFilter = filter === 'ALL' || e.category === filter;
    const matchesSearch = e.title.toLowerCase().includes(search.toLowerCase()) || 
                          e.description.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 md:px-8 py-12">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-black text-white mb-6">Upcoming Events</h1>
        <p className="text-slate-400 text-lg">Discover cultural celebrations, sporting events, and community gatherings across Oklahoma City.</p>
      </div>

      <div className="bg-slate-900 border border-white/5 rounded-3xl p-6 mb-12 flex flex-col md:flex-row items-center gap-6 shadow-2xl">
        <div className="relative flex-grow w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
          <input 
            type="text" 
            placeholder="Search events..." 
            className="w-full bg-slate-950 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500 transition-colors"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="flex items-center space-x-2 w-full md:w-auto">
          {(['ALL', 'CULTURAL', 'SPORTS'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`flex-grow md:flex-grow-0 px-6 py-3 rounded-2xl text-sm font-bold transition-all ${
                filter === cat ? 'bg-emerald-600 text-white' : 'bg-slate-950 text-slate-400 border border-white/10 hover:border-emerald-500/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEvents.length > 0 ? filteredEvents.map((event) => (
          <div key={event.id} className="bg-slate-900 rounded-3xl border border-white/5 overflow-hidden group hover:border-emerald-500 transition-all flex flex-col">
            <div className="relative h-64">
              <img src={event.image} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt={event.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-60" />
              <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                <span className="bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-emerald-400 border border-white/10 uppercase tracking-widest">{event.category}</span>
                <span className="bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-teal-400 border border-white/10 uppercase tracking-widest">{event.department}</span>
              </div>
            </div>
            <div className="p-8 flex-grow flex flex-col">
              <h3 className="text-2xl font-bold text-white mb-4">{event.title}</h3>
              <p className="text-slate-400 text-sm mb-6 line-clamp-3 leading-relaxed">{event.description}</p>
              
              <div className="space-y-3 mb-8 mt-auto">
                <div className="flex items-center text-slate-300 text-sm font-medium">
                  <Calendar size={18} className="mr-3 text-emerald-500" />
                  <span>{new Date(event.date).toLocaleString()}</span>
                </div>
                <div className="flex items-center text-slate-300 text-sm font-medium">
                  <MapPin size={18} className="mr-3 text-emerald-500" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center text-slate-300 text-sm font-medium">
                  <Users size={18} className="mr-3 text-emerald-500" />
                  <span>{event.capacity - event.sold} tickets remaining</span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 pt-6 border-t border-white/5">
                <div className="text-2xl font-black text-white">${event.price}</div>
                <button
                  onClick={() => navigateTo('buy-ticket', event.id)}
                  className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-emerald-600/20"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        )) : (
          <div className="col-span-full py-20 text-center">
            <div className="bg-slate-900 border border-dashed border-white/10 rounded-3xl p-12 max-w-lg mx-auto">
              <Search size={48} className="text-slate-700 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No events found</h3>
              <p className="text-slate-500">Try adjusting your filters or search keywords.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
