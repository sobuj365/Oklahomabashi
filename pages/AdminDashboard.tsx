
import React from 'react';
import { Event, Ticket, User } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Plus, Users, Calendar, DollarSign, ArrowUpRight, CheckCircle, Package, Sparkles } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface AdminDashboardProps {
  events: Event[];
  tickets: Ticket[];
  users: User[];
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ events, tickets }) => {
  const totalRevenue = events.reduce((acc, e) => acc + (e.sold * e.price), 0);
  const totalTickets = tickets.length;
  const activeEvents = events.length;

  const eventData = events.map(e => ({
    name: e.title.substring(0, 10) + '...',
    sold: e.sold,
    revenue: e.sold * e.price
  }));

  const generateAIEvent = async () => {
    alert("AI generation started... (See implementation for potential automation)");
    // This is a placeholder for where an admin could call Gemini to draft event descriptions
    // const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    // ... logic to call gemini-3-pro-preview to draft descriptions ...
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-end mb-12">
        <div>
           <h1 className="text-4xl font-black text-white mb-2">Admin Command Center</h1>
           <p className="text-slate-400">Manage Oklahomabashi's events, finances, and community records.</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={generateAIEvent}
            className="bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/30 px-6 py-3 rounded-xl font-bold flex items-center space-x-2 transition-all shadow-xl shadow-emerald-500/10"
          >
            <Sparkles size={20} />
            <span>AI Draft Event</span>
          </button>
          <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold flex items-center space-x-2 shadow-lg shadow-emerald-600/20 transition-all">
            <Plus size={20} />
            <span>Create Event</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Tickets Issued', value: totalTickets.toString(), icon: Package, color: 'text-blue-400', bg: 'bg-blue-500/10' },
          { label: 'Active Events', value: activeEvents.toString(), icon: Calendar, color: 'text-amber-400', bg: 'bg-amber-500/10' },
          { label: 'Growth Rate', value: '+12.5%', icon: ArrowUpRight, color: 'text-rose-400', bg: 'bg-rose-500/10' },
        ].map((stat, i) => (
          <div key={i} className="bg-slate-900 border border-white/5 p-6 rounded-3xl">
             <div className={`${stat.bg} w-12 h-12 rounded-2xl flex items-center justify-center mb-4`}>
                <stat.icon size={24} className={stat.color} />
             </div>
             <div className="text-sm text-slate-500 font-bold uppercase tracking-widest mb-1">{stat.label}</div>
             <div className="text-3xl font-black text-white">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 bg-slate-900 border border-white/5 p-8 rounded-[2.5rem]">
           <h2 className="text-xl font-bold text-white mb-8 flex items-center">
             <BarChart className="mr-2 text-emerald-500" size={20} />
             Ticket Sales Overview
           </h2>
           <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={eventData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                    <YAxis stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                      itemStyle={{ color: '#10b981' }}
                    />
                    <Bar dataKey="sold" fill="#10b981" radius={[8, 8, 0, 0]} />
                 </BarChart>
              </ResponsiveContainer>
           </div>
        </div>

        <div className="bg-slate-900 border border-white/5 p-8 rounded-[2.5rem]">
           <h2 className="text-xl font-bold text-white mb-8 flex items-center">
             <CheckCircle className="mr-2 text-emerald-500" size={20} />
             Live Feed
           </h2>
           <div className="space-y-6">
              {tickets.length > 0 ? tickets.map(ticket => (
                <div key={ticket.id} className="flex items-start space-x-4 pb-6 border-b border-white/5 last:border-0">
                   <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 shrink-0">
                      <Users size={18} />
                   </div>
                   <div>
                      <p className="text-sm text-white font-bold">New Ticket Sold</p>
                      <p className="text-xs text-slate-500 mb-2">{ticket.id} • {new Date(ticket.purchaseDate).toLocaleTimeString()}</p>
                      <span className="text-[10px] font-black bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded">COMPLETED</span>
                   </div>
                </div>
              )) : (
                <div className="text-center py-10">
                   <Package size={40} className="text-slate-800 mx-auto mb-4" />
                   <p className="text-slate-500 text-sm">Waiting for new activity...</p>
                </div>
              )}
           </div>
        </div>
      </div>

      <div className="bg-slate-900 border border-white/5 rounded-[2.5rem] overflow-hidden">
        <div className="p-8 border-b border-white/5">
           <h2 className="text-xl font-bold text-white">Event Inventory</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-slate-500 uppercase tracking-widest bg-slate-950/50">
                <th className="px-8 py-4">Event</th>
                <th className="px-8 py-4">Date</th>
                <th className="px-8 py-4">Progress</th>
                <th className="px-8 py-4 text-right">Revenue</th>
                <th className="px-8 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {events.map((event) => (
                <tr key={event.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-8 py-6">
                     <div className="flex items-center space-x-4">
                        <img src={event.image} className="w-12 h-12 rounded-xl object-cover" alt="" />
                        <div>
                           <div className="text-sm font-bold text-white">{event.title}</div>
                           <div className="text-xs text-slate-500">{event.category}</div>
                        </div>
                     </div>
                  </td>
                  <td className="px-8 py-6 text-sm text-slate-300">
                     {new Date(event.date).toLocaleDateString()}
                  </td>
                  <td className="px-8 py-6">
                     <div className="w-full max-w-xs">
                        <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-1 uppercase">
                           <span>{event.sold} / {event.capacity} Sold</span>
                           <span>{Math.round((event.sold/event.capacity)*100)}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                           <div 
                              className="h-full bg-emerald-500 rounded-full" 
                              style={{ width: `${(event.sold/event.capacity)*100}%` }}
                           />
                        </div>
                     </div>
                  </td>
                  <td className="px-8 py-6 text-right font-black text-white">
                     ${(event.sold * event.price).toLocaleString()}
                  </td>
                  <td className="px-8 py-6 text-center">
                     <button className="text-xs font-bold text-emerald-500 hover:text-emerald-400">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
