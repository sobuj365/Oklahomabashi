
import React, { useState } from 'react';
import { Ticket as TicketType, Event } from '../types';
import { QrCode, Search, CheckCircle, XCircle, Camera, ShieldCheck } from 'lucide-react';

interface TicketVerificationProps {
  tickets: TicketType[];
  events: Event[];
}

const TicketVerification: React.FC<TicketVerificationProps> = ({ tickets, events }) => {
  const [ticketId, setTicketId] = useState('');
  const [result, setResult] = useState<{ success: boolean; message: string; ticket?: TicketType } | null>(null);

  const handleVerify = () => {
    const foundTicket = tickets.find(t => t.id === ticketId);
    if (foundTicket) {
      if (foundTicket.status === 'USED') {
        setResult({ success: false, message: 'Ticket has already been used!', ticket: foundTicket });
      } else if (foundTicket.status === 'CANCELLED') {
        setResult({ success: false, message: 'Ticket is cancelled!', ticket: foundTicket });
      } else {
        setResult({ success: true, message: 'Ticket is valid! Verification successful.', ticket: foundTicket });
      }
    } else {
      setResult({ success: false, message: 'Invalid Ticket ID. Please check and try again.' });
    }
  };

  const getEventName = (id: string) => events.find(e => e.id === id)?.title || 'Unknown Event';

  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <ShieldCheck size={32} className="text-emerald-500" />
        </div>
        <h1 className="text-4xl font-black text-white mb-4">Ticket Verification</h1>
        <p className="text-slate-400 max-w-lg mx-auto">Admin tool to verify event attendees via unique Ticket ID or QR Code scanning.</p>
      </div>

      <div className="bg-slate-900 border border-white/5 rounded-3xl p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-grow">
            <label className="block text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-3">Manual Entry</label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              <input 
                type="text" 
                placeholder="Enter Ticket ID (e.g. TKT-X1Y2Z3)" 
                className="w-full bg-slate-950 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500 transition-colors font-mono"
                value={ticketId}
                onChange={(e) => setTicketId(e.target.value)}
              />
            </div>
          </div>
          <div className="md:w-48">
             <label className="block text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-3">Quick Scan</label>
             <button className="w-full bg-slate-800 hover:bg-slate-700 text-white rounded-2xl py-4 flex items-center justify-center font-bold space-x-2 transition-all">
                <Camera size={20} />
                <span>Open Scanner</span>
             </button>
          </div>
        </div>

        <button
          onClick={handleVerify}
          className="w-full mt-8 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl py-5 font-black text-lg transition-all shadow-xl shadow-emerald-600/20"
        >
          Verify Entry
        </button>

        {result && (
          <div className={`mt-10 p-8 rounded-3xl border-2 animate-in fade-in zoom-in duration-300 ${result.success ? 'bg-emerald-500/5 border-emerald-500/30' : 'bg-red-500/5 border-red-500/30'}`}>
            <div className="flex items-start space-x-4">
              {result.success ? (
                <CheckCircle size={32} className="text-emerald-500 shrink-0" />
              ) : (
                <XCircle size={32} className="text-red-500 shrink-0" />
              )}
              <div>
                <h3 className={`text-xl font-bold mb-2 ${result.success ? 'text-emerald-400' : 'text-red-400'}`}>
                  {result.message}
                </h3>
                {result.ticket && (
                  <div className="mt-4 grid grid-cols-2 gap-y-4 gap-x-8">
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Ticket ID</p>
                      <p className="text-white font-mono">{result.ticket.id}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Event</p>
                      <p className="text-white">{getEventName(result.ticket.eventId)}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Purchased On</p>
                      <p className="text-white">{new Date(result.ticket.purchaseDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Status</p>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded ${result.ticket.status === 'VALID' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                        {result.ticket.status}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {result.success && (
              <button className="w-full mt-8 bg-emerald-600 text-white rounded-xl py-3 font-bold hover:bg-emerald-500 transition-colors">
                Mark as Used
              </button>
            )}
          </div>
        )}
      </div>

      <div className="mt-12 grid grid-cols-3 gap-6">
        {[
          { label: 'Verified Today', value: '42' },
          { label: 'Pending Arrival', value: '128' },
          { label: 'Flagged Tickets', value: '2' },
        ].map((item, i) => (
          <div key={i} className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 text-center">
            <div className="text-3xl font-black text-white mb-1">{item.value}</div>
            <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketVerification;
