import React from 'react';
import { motion } from 'motion/react';
import { Heart, MessageCircle, Share2, BadgeCheck } from 'lucide-react';

export default function SocialHub() {
  const posts = [
    {
      id: 1,
      user: 'Sarah Jenkins',
      handle: '@sarahj_drives',
      avatar: 'https://picsum.photos/seed/sarah/100/100',
      verified: true,
      content: 'Just completed a 500km road trip along the coast with the new Model S rental. The autopilot features are incredible! ðâ¨',
      image: 'https://picsum.photos/seed/roadtrip/800/400',
      likes: 342,
      comments: 28,
      time: '2h ago'
    },
    {
      id: 2,
      user: 'Mike Chen',
      handle: '@mike_c',
      avatar: 'https://picsum.photos/seed/mike/100/100',
      verified: false,
      content: 'Looking for recommendations for a rugged SUV for a weekend camping trip. Any suggestions from the community?',
      likes: 15,
      comments: 42,
      time: '5h ago'
    },
    {
      id: 3,
      user: 'PearlHub Official',
      handle: '@pearlhub',
      avatar: 'https://picsum.photos/seed/admin/100/100',
      verified: true,
      content: 'ð¨ New Fleet Alert! We just added 50 new hybrid vehicles to our downtown locations. Book now and get 15% off your first eco-friendly ride.',
      image: 'https://picsum.photos/seed/fleet/800/400',
      likes: 1205,
      comments: 89,
      time: '1d ago'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto space-y-6 pb-12"
    >
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">Social Hub</h1>
        <p className="text-slate-400 mt-1">Connect with other drivers and share your journeys.</p>
      </header>

      {/* Create Post Input */}
      <div className="glass-panel p-4 rounded-2xl flex gap-4">
        <img src="https://picsum.photos/seed/admin/100/100" alt="You" className="w-10 h-10 rounded-full border border-white/20" />
        <div className="flex-1">
          <input 
            type="text" 
            placeholder="Share your latest trip or ask for recommendations..." 
            className="w-full bg-transparent border-none text-white focus:outline-none placeholder:text-slate-500 mt-2"
          />
          <div className="flex justify-end mt-4 pt-4 border-t border-white/10">
            <button className="px-4 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-full transition-colors">
              Post
            </button>
          </div>
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-6">
        {posts.map((post, i) => (
          <motion.div 
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel rounded-2xl overflow-hidden"
          >
            <div className="p-4 flex items-start gap-3">
              <img src={post.avatar} alt={post.user} className="w-10 h-10 rounded-full border border-white/20" />
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-white">{post.user}</span>
                  {post.verified && (
                    <BadgeCheck className="w-4 h-4 text-blue-400 fill-blue-400/20" />
                  )}
                  <span className="text-slate-500 text-sm ml-1">{post.handle}</span>
                  <span className="text-slate-600 text-sm ml-auto">{post.time}</span>
                </div>
                <p className="text-slate-300 mt-2 leading-relaxed">{post.content}</p>
              </div>
            </div>
            
            {post.image && (
              <div className="w-full h-64 border-y border-white/5">
                <img src={post.image} alt="Post attachment" className="w-full h-full object-cover" />
              </div>
            )}

            <div className="p-3 px-4 flex items-center justify-between bg-black/20">
              <div className="flex items-center gap-6">
                <button className="flex items-center gap-2 text-slate-400 hover:text-rose-400 transition-colors group">
                  <Heart className="w-5 h-5 group-hover:fill-rose-400/20" />
                  <span className="text-sm font-medium">{post.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-slate-400 hover:text-indigo-400 transition-colors group">
                  <MessageCircle className="w-5 h-5 group-hover:fill-indigo-400/20" />
                  <span className="text-sm font-medium">{post.comments}</span>
                </button>
              </div>
              <button className="text-slate-400 hover:text-white transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
