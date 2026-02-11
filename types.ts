
export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  price: number;
  capacity: number;
  sold: number;
  image: string;
  category: 'CULTURAL' | 'SPORTS' | 'GENERAL';
  department: 'OBCS' | 'OBSS' | 'CENTRAL';
}

export interface Ticket {
  id: string;
  eventId: string;
  userId: string;
  purchaseDate: string;
  status: 'VALID' | 'USED' | 'CANCELLED';
  qrCode: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  category: string;
  tags: string[];
}

export type PageType = 'home' | 'events' | 'news' | 'about' | 'contact' | 'login' | 'register' | 'admin' | 'dashboard' | 'buy-ticket' | 'verify' | 'event-details';
