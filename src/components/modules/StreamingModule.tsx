"use client";

import React, { useState } from 'react';
import {
  Users,
  MessageSquare,
  Heart,
  Share2,
  Settings,
  MoreVertical,
  Play,
  Volume2,
  Maximize
} from 'lucide-react';
import { cn } from '@/lib/utils';

const StreamingModule = () => {
  const [messages, setMessages] = useState([
    { id: '1', user: 'GamerX', text: 'How did you build that shader?', color: 'text-blue-400' },
    { id: '2', user: 'DevFlow', text: 'The AI integration is looking slick!', color: 'text-green-400' },
    { id: '3', user: 'VoxelArtist', text: 'Try moving the light source to the left.', color: 'text-purple-400' },
    { id: '4', user: 'PixelPunch', text: 'Can we see the health system code again?', color: 'text-orange-400' },
  ]);
  const [chatInput, setChatInput] = useState('');

  const sendChatMessage = () => {
    if (!chatInput.trim()) return;
    setMessages(prev => [...prev, { id: Date.now().toString(), user: 'Me', text: chatInput, color: 'text-zinc-100' }]);
    setChatInput('');
  };

  return (
    <div className="flex h-full bg-[#0c0c0e]">
      {/* Main Stream Area */}
      <div className="flex-1 flex flex-col p-6 min-w-0">
        {/* Video Player */}
        <div className="relative aspect-video bg-[#09090b] rounded-2xl border border-zinc-800 overflow-hidden shadow-2xl group">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg shadow-purple-600/40">
              <Play className="text-white ml-1 fill-white" size={32} />
            </div>
            {/* Visual representation of streaming */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 via-transparent to-transparent" />
              <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #27272a 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            </div>
          </div>

          {/* Player Controls Overly */}
          <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-6">
              <Play size={20} className="text-white cursor-pointer" />
              <Volume2 size={20} className="text-white cursor-pointer" />
              <span className="text-xs text-zinc-300 font-mono">00:42:15 / LIVE</span>
            </div>
            <div className="flex items-center gap-6">
              <Settings size={20} className="text-white cursor-pointer" />
              <Maximize size={20} className="text-white cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Stream Info */}
        <div className="mt-6 flex items-start justify-between">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center p-0.5">
              <div className="w-full h-full bg-[#0c0c0e] rounded-[10px] flex items-center justify-center overflow-hidden">
                <img src="https://ui-avatars.com/api/?name=GP&background=6d28d9&color=fff" alt="Avatar" className="w-full h-full object-cover" />
              </div>
            </div>
            <div>
              <h1 className="text-lg font-bold text-zinc-100">Developing a Procedural World Generator with AI</h1>
              <div className="flex items-center gap-4 mt-1">
                <span className="text-sm font-medium text-purple-400">Gamesplay Studio</span>
                <span className="text-xs text-zinc-500 flex items-center gap-1.5 font-medium">
                   <Users size={14} className="text-zinc-400" />
                   12,402 viewers
                </span>
                <span className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded-sm font-black uppercase tracking-widest">Live</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-purple-600/20">
               <Heart size={16} />
               Follow
             </button>
             <button className="p-2 bg-zinc-800 text-zinc-400 hover:text-zinc-200 rounded-xl transition-colors">
               <Share2 size={20} />
             </button>
          </div>
        </div>
      </div>

      {/* Chat Sidebar */}
      <div className="w-80 border-l border-[#27272a] bg-[#0f0f12] flex flex-col shrink-0">
        <div className="p-4 border-b border-[#27272a] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare size={16} className="text-zinc-500" />
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Stream Chat</span>
          </div>
          <button className="p-1 hover:bg-zinc-800 rounded">
            <MoreVertical size={16} className="text-zinc-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="text-sm leading-snug">
              <span className={cn("font-bold mr-2", msg.color)}>{msg.user}:</span>
              <span className="text-zinc-400">{msg.text}</span>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-[#27272a] bg-[#0c0c0e]">
          <div className="relative">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendChatMessage()}
              placeholder="Send a message"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:border-purple-500/50 outline-none pr-10"
            />
            <div className="absolute right-2 top-2 text-zinc-500 cursor-pointer">
               <Heart size={16} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamingModule;
