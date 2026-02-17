
import React, { useState, useEffect } from 'react';
import { User, UserRole, PageType, Event, BlogPost, Ticket } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Events from './pages/Events';
import News from './pages/News';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import BuyTicket from './pages/BuyTicket';
import TicketVerification from './pages/TicketVerification';
import UserDashboard from './pages/UserDashboard';
import AIChatAssistant from './components/AIChatAssistant';
import { DataService } from './services/api';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize Data from Service (Database-ready)
  useEffect(() => {
    const loadData = async () => {
      try {
        const [fetchedEvents, fetchedPosts] = await Promise.all([
          DataService.getEvents(),
          DataService.getPosts()
        ]);
        setEvents(fetchedEvents);
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Failed to load initial data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Simple Hash Routing Logic
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageType;
      if (hash) {
        if (hash.startsWith('event-details/')) {
          const id = hash.split('/')[1];
          setSelectedEventId(id);
          setCurrentPage('event-details');
        } else {
          setCurrentPage(hash);
        }
      } else {
        setCurrentPage('home');
      }
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: PageType, id?: string) => {
    if (id) {
      window.location.hash = `${page}/${id}`;
    } else {
      window.location.hash = page;
    }
  };

  const handleLogin = (u: User) => {
    setUser(u);
    navigateTo('home');
  };

  const handleLogout = () => {
    setUser(null);
    navigateTo('home');
  };

  const handleBuyTicket = (eventId: string) => {
    if (!user) {
      navigateTo('login');
      return;
    }
    const event = events.find(e => e.id === eventId);
    if (!event) return;

    const newTicket: Ticket = {
      id: `TKT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      eventId,
      userId: user.id,
      purchaseDate: new Date().toISOString(),
      status: 'VALID',
      qrCode: `OKL-${eventId}-${user.id}-${Date.now()}`
    };

    setTickets([...tickets, newTicket]);
    setEvents(events.map(e => e.id === eventId ? { ...e, sold: e.sold + 1 } : e));
    alert('Ticket purchased successfully! Redirecting to your dashboard.');
    navigateTo('dashboard');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home navigateTo={navigateTo} events={events} posts={posts} />;
      case 'events':
        return <Events navigateTo={navigateTo} events={events} />;
      case 'news':
        return <News posts={posts} />;
      case 'admin':
        return user?.role === UserRole.ADMIN ? <AdminDashboard events={events} tickets={tickets} users={[]} /> : <Home navigateTo={navigateTo} events={events} posts={posts} />;
      case 'login':
        return <Login onLogin={handleLogin} navigateTo={navigateTo} />;
      case 'register':
        return <Register onRegister={handleLogin} navigateTo={navigateTo} />;
      case 'buy-ticket':
        return <BuyTicket eventId={selectedEventId} events={events} user={user} onBuy={handleBuyTicket} />;
      case 'verify':
        return <TicketVerification tickets={tickets} events={events} />;
      case 'dashboard':
        return <UserDashboard user={user} tickets={tickets} events={events} navigateTo={navigateTo} onLogout={handleLogout} />;
      default:
        return <Home navigateTo={navigateTo} events={events} posts={posts} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <Navbar 
        user={user} 
        currentPage={currentPage} 
        navigateTo={navigateTo} 
        onLogout={handleLogout} 
      />
      <main className="flex-grow pt-16">
        {renderPage()}
      </main>
      <AIChatAssistant />
      <Footer navigateTo={navigateTo} />
    </div>
  );
};

export default App;
