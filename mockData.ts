
import { Event, BlogPost } from './types';

export const initialEvents: Event[] = [
  {
    id: 'e1',
    title: 'Bangla Noboborsho 1431',
    description: 'Celebrate the Bengali New Year with traditional food, music, and dance performances.',
    date: '2024-04-14T10:00:00Z',
    location: 'Oklahoma City Convention Center',
    price: 25,
    capacity: 500,
    sold: 342,
    image: 'https://picsum.photos/seed/noboborsho/800/400',
    category: 'CULTURAL',
    department: 'OBCS'
  },
  {
    id: 'e2',
    title: 'OBSS Annual Cricket Cup',
    description: 'Join us for the most exciting cricket tournament in the heart of Oklahoma City.',
    date: '2024-06-20T08:00:00Z',
    location: 'Wheeler Park Sports Grounds',
    price: 15,
    capacity: 200,
    sold: 45,
    image: 'https://picsum.photos/seed/cricket/800/400',
    category: 'SPORTS',
    department: 'OBSS'
  },
  {
    id: 'e3',
    title: 'Eid-ul-Adha Get Together',
    description: 'A community gathering to celebrate Eid with the Oklahomabashi family.',
    date: '2024-06-16T18:00:00Z',
    location: 'Moore Community Center',
    price: 10,
    capacity: 300,
    sold: 120,
    image: 'https://picsum.photos/seed/eid/800/400',
    category: 'CULTURAL',
    department: 'CENTRAL'
  }
];

export const initialPosts: BlogPost[] = [
  {
    id: 'p1',
    title: 'OBCS Expands Cultural Library',
    excerpt: 'The Oklahoma-Bangladeshi Cultural Society has added 200 new titles to its library collection.',
    content: 'Full content here about the library expansion and how members can access it...',
    author: 'Sultana Ahmed',
    date: '2024-03-01T12:00:00Z',
    image: 'https://picsum.photos/seed/library/600/400',
    category: 'Society News',
    tags: ['OBCS', 'Library', 'Culture']
  },
  {
    id: 'p2',
    title: 'Bangladeshi Youth Football Clinic',
    excerpt: 'OBSS announces its first summer football clinic for kids aged 8-15.',
    content: 'Full content about the football clinic schedule and registration details...',
    author: 'Zayed Khan',
    date: '2024-02-25T09:00:00Z',
    image: 'https://picsum.photos/seed/football/600/400',
    category: 'Sports',
    tags: ['OBSS', 'Youth', 'Sports']
  }
];
