
import { Event, BlogPost, Ticket, User } from '../types';
import { initialEvents, initialPosts } from '../mockData';

/**
 * DataService abstracts the source of data.
 * Currently it uses mockData, but you can update the fetch calls
 * to point to your Cloudflare Worker URL (e.g., api.oklahomabashi.com).
 */
export const DataService = {
  // Replace with your Cloudflare Worker URL when ready
  baseUrl: 'https://api.oklahomabashi.com',

  async getEvents(): Promise<Event[]> {
    // For now, return mock data. 
    // Later: const res = await fetch(`${this.baseUrl}/events`); return res.json();
    return Promise.resolve(initialEvents);
  },

  async getPosts(): Promise<BlogPost[]> {
    return Promise.resolve(initialPosts);
  },

  async verifyTicket(ticketId: string): Promise<Ticket | null> {
    // This will be a database query in D1
    return null;
  }
};
