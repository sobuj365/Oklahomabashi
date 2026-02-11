
import React from 'react';
import { BlogPost } from '../types';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';

interface NewsProps {
  posts: BlogPost[];
}

const News: React.FC<NewsProps> = ({ posts }) => {
  return (
    <div className="container mx-auto px-4 md:px-8 py-12">
      <div className="max-w-4xl mx-auto text-center mb-20">
        <span className="text-emerald-500 font-black text-xs uppercase tracking-[0.3em] mb-4 block">The Community Hub</span>
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6">News & Updates</h1>
        <p className="text-slate-400 text-lg md:text-xl leading-relaxed">Stay informed about community progress, societal updates, and stories from the Oklahoma-Bangladeshi community.</p>
      </div>

      {/* Featured News Post */}
      {posts.length > 0 && (
        <div className="mb-20 relative group cursor-pointer overflow-hidden rounded-[3rem] border border-white/5 h-[500px]">
          <img src={posts[0].image} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt={posts[0].title} />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
          <div className="absolute bottom-0 left-0 p-10 md:p-16 max-w-4xl">
             <div className="flex items-center space-x-4 mb-6">
                <span className="bg-emerald-600 px-3 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-widest">{posts[0].category}</span>
                <div className="flex items-center text-slate-300 text-xs font-bold uppercase tracking-widest">
                   <Calendar size={14} className="mr-2" />
                   <span>{new Date(posts[0].date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
             </div>
             <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight group-hover:text-emerald-400 transition-colors">{posts[0].title}</h2>
             <p className="text-slate-300 text-lg mb-8 line-clamp-2">{posts[0].excerpt}</p>
             <button className="flex items-center space-x-3 text-white font-bold bg-white/10 backdrop-blur-md px-6 py-3 rounded-xl border border-white/20 hover:bg-emerald-600 transition-all">
                <span>Read Full Story</span>
                <ArrowRight size={20} />
             </button>
          </div>
        </div>
      )}

      {/* News Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {posts.slice(1).map((post) => (
          <article key={post.id} className="group cursor-pointer">
            <div className="h-64 overflow-hidden rounded-3xl mb-6 relative">
              <img src={post.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={post.title} />
              <div className="absolute top-4 left-4">
                <span className="bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-emerald-400 border border-white/10 uppercase tracking-widest">{post.category}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 mb-3">
              <div className="flex items-center text-slate-500 text-[10px] font-black uppercase tracking-widest">
                <Calendar size={14} className="mr-1.5" />
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center text-slate-500 text-[10px] font-black uppercase tracking-widest">
                <User size={14} className="mr-1.5" />
                <span>{post.author}</span>
              </div>
            </div>

            <h3 className="text-2xl font-black text-white mb-4 group-hover:text-emerald-400 transition-colors leading-tight">{post.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 mb-6">{post.excerpt}</p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map(tag => (
                <div key={tag} className="flex items-center space-x-1 text-[10px] font-bold text-slate-500 bg-white/5 px-2 py-0.5 rounded-md">
                   <Tag size={10} />
                   <span>{tag}</span>
                </div>
              ))}
            </div>

            <button className="flex items-center space-x-2 text-emerald-500 font-black text-xs uppercase tracking-widest group-hover:translate-x-2 transition-transform">
               <span>Learn More</span>
               <ArrowRight size={16} />
            </button>
          </article>
        ))}
      </div>

      {/* Newsletter Section */}
      <section className="mt-32 bg-emerald-600 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 p-20 opacity-20">
           <div className="w-64 h-64 border-[40px] border-white rounded-full" />
        </div>
        
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Never miss a beat.</h2>
          <p className="text-emerald-50 text-lg mb-10 font-medium">Get the latest Oklahomabashi news, event updates, and community stories delivered to your inbox.</p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-grow bg-white/20 border border-white/30 rounded-2xl px-6 py-4 text-white placeholder:text-emerald-100 focus:outline-none focus:bg-white/30 transition-all"
            />
            <button className="bg-white text-emerald-600 px-10 py-4 rounded-2xl font-black shadow-xl shadow-slate-900/10 hover:bg-slate-100 transition-all">
              Subscribe
            </button>
          </div>
          <p className="mt-6 text-emerald-100/60 text-xs font-bold uppercase tracking-widest">No spam, just community. Unsubscribe anytime.</p>
        </div>
      </section>
    </div>
  );
};

export default News;
