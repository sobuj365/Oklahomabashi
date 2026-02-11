
import React from 'react';
import { User, Ticket, Event, PageType } from '../types';
import { Settings, LogOut, Ticket as TicketIcon, Calendar, Clock, MapPin, ExternalLink } from 'lucide-react';

interface UserDashboardProps {
  user: User | null;
  tickets: Ticket[];
  events: Event[];
  navigateTo: (page: PageType) => void;
  onLogout: () => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ user, tickets, events, navigateTo, onLogout }) => {
  if (!user) {
    navigateTo('login');
    return null;
  }

  const userTickets = tickets.filter(t => t.userId === user.id);

  const getEvent = (id: string) => events.find(e => e.id === id);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Sidebar */}
        <aside className="w-full md:w-80 bg-slate-900 border border-white/5 rounded-3xl p-8">
          <div className="text-center mb-10">
            <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl font-black text-white shadow-xl shadow-emerald-500/20">
              {user.name[0]}
            </div>
            <h2 className="text-2xl font-black text-white">{user.name}</h2>
            <p className="text-slate-500 font-medium text-sm">{user.email}</p>
          </div>

          <nav className="space-y-2">
             <button className="w-full flex items-center space-x-3 px-4 py-3 bg-emerald-600 text-white rounded-xl font-bold transition-all">
                <TicketIcon size={18} />
                <span>My Tickets</span>
             </button>
             <button className="w-full flex items-center space-x-3 px-4 py-3 text-slate-400 hover:bg-white/5 rounded-xl font-bold transition-all">
                <Settings size={18} />
                <span>Profile Settings</span>
             </button>
             <button 
                onClick={onLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl font-bold transition-all mt-8"
             >
                <LogOut size={18} />
                <span>Sign Out</span>
             </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-grow">
          <div className="mb-8">
             <h1 className="text-3xl font-black text-white mb-2">My Purchased Tickets</h1>
             <p className="text-slate-400">View and download your digital tickets for upcoming events.</p>
          </div>

          {userTickets.length > 0 ? (
            <div className="grid lg:grid-cols-2 gap-6">
              {userTickets.map(ticket => {
                const event = getEvent(ticket.eventId);
                if (!event) return null;
                return (
                  <div key={ticket.id} className="bg-slate-900 border border-white/5 rounded-3xl overflow-hidden shadow-xl">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-6">
                        <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                          <span className="text-[10px] font-black text-emerald-400 tracking-widest uppercase">{ticket.status}</span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500">{ticket.id}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-4">{event.title}</h3>
                      
                      <div className="space-y-2 mb-6">
                        <div className="flex items-center text-slate-400 text-xs font-bold uppercase">
                          <Calendar size={14} className="mr-2 text-emerald-500" />
                          <span>{new Date(event.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center text-slate-400 text-xs font-bold uppercase">
                          <Clock size={14} className="mr-2 text-emerald-500" />
                          <span>{new Date(event.date).toLocaleTimeString()}</span>
                        </div>
                        <div className="flex items-center text-slate-400 text-xs font-bold uppercase">
                          <MapPin size={14} className="mr-2 text-emerald-500" />
                          <span>{event.location}</span>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <button className="flex-grow py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-sm transition-all flex items-center justify-center space-x-2">
                           <ExternalLink size={16} />
                           <span>View QR</span>
                        </button>
                        <button className="flex-grow py-3 border border-white/10 text-white rounded-xl font-bold text-sm hover:bg-white/5 transition-all">
                           Download PDF
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-slate-900/50 border border-dashed border-white/10 rounded-[2rem] py-20 text-center">
              <TicketIcon size={48} className="text-slate-700 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No tickets yet</h3>
              <p className="text-slate-500 mb-8">You haven't purchased any tickets for upcoming events.</p>
              <button 
                onClick={() => navigateTo('events')}
                className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-all"
              >
                Browse Events
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
