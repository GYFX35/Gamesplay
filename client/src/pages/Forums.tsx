import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ChatRoom from '../components/ChatRoom';
import { MessageSquare, Users, MessageCircle, ArrowRight, Star, TrendingUp } from 'lucide-react';

const Forums: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState('general');

  const forumCategories = [
    { id: 'general', name: 'General Discussion', description: 'Talk about anything gaming related.', posts: 1250, icon: <MessageSquare size={18} /> },
    { id: 'dev', name: 'Game Development', description: 'Share your 3D projects and get help.', posts: 840, icon: <Users size={18} /> },
    { id: 'mma', name: 'MMA Strategies', description: 'Discuss combat techniques and fighters.', posts: 420, icon: <TrendingUp size={18} /> },
    { id: 'tech', name: 'Platform Tech', description: 'Talk about AI, Blockchain, and AR features.', posts: 310, icon: <Star size={18} /> },
  ];

  return (
    <div className="bg-[#0e0e10] min-h-screen text-white">
      <Navbar />
      <div className="flex pt-12">
        <Sidebar />
        <main className="flex-1 ml-0 sm:ml-12 md:ml-60 p-6 flex flex-col h-[calc(100vh-3rem)]">
          <header className="mb-8">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <MessageCircle className="text-[#a970ff]" />
              Community Forums
            </h1>
            <p className="text-gray-400">Join the discussion and connect with other gamers and developers.</p>
          </header>

          <div className="flex-1 flex flex-col lg:flex-row gap-8 overflow-hidden">
            {/* Forum Categories */}
            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-2">
              {forumCategories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => setSelectedTopic(category.id)}
                  className={`group p-6 rounded-xl border-2 transition-all cursor-pointer shadow-lg hover:shadow-[#a970ff22] ${selectedTopic === category.id ? 'bg-[#a970ff]/10 border-[#a970ff]' : 'bg-[#18181b] border-transparent hover:border-[#2d2d30]'}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <div className={`p-3 rounded-lg ${selectedTopic === category.id ? 'bg-[#a970ff] text-white' : 'bg-[#2d2d30] text-[#a970ff]'}`}>
                        {category.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                        <p className="text-gray-400 text-sm">{category.description}</p>
                      </div>
                    </div>
                    <div className="text-right hidden sm:block">
                      <p className="text-xl font-black text-[#a970ff]">{category.posts}</p>
                      <p className="text-[10px] font-bold uppercase text-gray-500 tracking-widest">Active Posts</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between pt-4 border-t border-[#2d2d30]">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-[#18181b] bg-gray-700"></div>
                      ))}
                      <div className="w-8 h-8 rounded-full border-2 border-[#18181b] bg-[#2d2d30] flex items-center justify-center text-[10px] font-bold">
                        +12
                      </div>
                    </div>
                    <span className="flex items-center gap-1 text-[#a970ff] font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      Join Discussion <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* General Chat Sidebar */}
            <div className="w-full lg:w-96 flex-shrink-0">
               <ChatRoom roomId={`forum-${selectedTopic}`} roomName={forumCategories.find(c => c.id === selectedTopic)?.name || 'Forums'} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Forums;
