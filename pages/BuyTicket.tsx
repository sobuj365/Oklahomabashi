
import React, { useState } from 'react';
import { Event, User } from '../types';
import { Ticket, CreditCard, ShieldCheck, ArrowLeft, Info } from 'lucide-react';

interface BuyTicketProps {
  eventId: string | null;
  events: Event[];
  user: User | null;
  onBuy: (eventId: string) => void;
}

const BuyTicket: React.FC<BuyTicketProps> = ({ eventId, events, user, onBuy }) => {
  const [loading, setLoading] = useState(false);
  const event = events.find(e => e.id === eventId);

  if (!event) {
    return (
      <div className="container mx-auto p-20 text-center">
        <h2 className="text-2xl text-white">Event not found</h2>
        <button className="mt-4 text-emerald-400" onClick={() => window.location.hash = 'events'}>Back to Events</button>
      </div>
    );
  }

  const handleCheckout = () => {
    setLoading(true);
    // Simulate payment process
    setTimeout(() => {
      onBuy(event.id);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Side: Summary */}
        <div className="flex-grow lg:w-2/3">
          <button 
            onClick={() => window.location.hash = 'events'}
            className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={18} />
            <span className="font-bold">Back to events</span>
          </button>

          <h1 className="text-4xl font-black text-white mb-8">Secure Checkout</h1>

          <div className="bg-slate-900 border border-white/5 rounded-3xl p-8 mb-8">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
              <CreditCard className="mr-3 text-emerald-500" size={24} />
              Payment Method
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border-2 border-emerald-500 bg-emerald-500/5 p-4 rounded-2xl flex items-center justify-between cursor-pointer">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-8 bg-slate-800 rounded flex items-center justify-center font-bold text-xs text-slate-400">VISA</div>
                  <div>
                    <p className="text-sm text-white font-bold">Stripe Secure</p>
                    <p className="text-xs text-slate-500">Fast & Encrypted</p>
                  </div>
                </div>
                <div className="w-5 h-5 rounded-full border-4 border-emerald-500" />
              </div>
              <div className="border border-white/10 bg-slate-950 p-4 rounded-2xl flex items-center justify-between opacity-50 cursor-not-allowed">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-8 bg-slate-800 rounded flex items-center justify-center font-bold text-xs text-slate-400">P</div>
                  <div>
                    <p className="text-sm text-white font-bold">PayPal</p>
                    <p className="text-xs text-slate-500">Coming soon</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-4">
               <div>
                 <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Cardholder Name</label>
                 <input type="text" className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none" placeholder="John Doe" defaultValue={user?.name} />
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Card Number</label>
                    <input type="text" className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none" placeholder="**** **** **** 4242" />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Expiry</label>
                      <input type="text" className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none" placeholder="MM/YY" />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">CVC</label>
                      <input type="text" className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none" placeholder="***" />
                    </div>
                 </div>
               </div>
            </div>
          </div>

          <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl flex items-start space-x-3">
            <Info className="text-emerald-500 mt-1" size={20} />
            <p className="text-sm text-emerald-100/80 leading-relaxed">
              By clicking "Pay Now", you agree to Oklahomabashi's terms of service and acknowledge that tickets are non-refundable within 48 hours of the event.
            </p>
          </div>
        </div>

        {/* Right Side: Order Summary */}
        <div className="lg:w-1/3">
          <div className="sticky top-24 bg-slate-900 border border-white/5 rounded-3xl p-8">
            <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
            
            <div className="flex space-x-4 mb-8">
              <img src={event.image} className="w-20 h-20 object-cover rounded-xl" alt={event.title} />
              <div>
                <h3 className="text-white font-bold leading-tight mb-1">{event.title}</h3>
                <p className="text-slate-400 text-xs uppercase font-bold">{event.category} • {event.department}</p>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-white/5">
              <div className="flex justify-between text-slate-400">
                <span>Ticket Price (x1)</span>
                <span>${event.price}.00</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Processing Fee</span>
                <span>$2.50</span>
              </div>
              <div className="flex justify-between text-white font-black text-xl pt-4 border-t border-white/5">
                <span>Total</span>
                <span>${event.price + 2.50}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={loading}
              className={`w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black mt-10 transition-all flex items-center justify-center space-x-3 ${loading ? 'opacity-70 cursor-wait' : ''}`}
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <ShieldCheck size={20} />
                  <span>Pay Now</span>
                </>
              )}
            </button>

            <div className="mt-6 flex items-center justify-center space-x-2 text-slate-500 text-xs font-bold uppercase tracking-widest">
              <ShieldCheck size={14} />
              <span>SSL Secured Payment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyTicket;
