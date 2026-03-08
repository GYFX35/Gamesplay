"use client";

import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Sparkles,
  Bot,
  User,
  Zap,
  BrainCircuit,
  Code2,
  Box as BoxIcon,
  Play
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  type?: 'text' | 'suggestion' | 'code';
}

const AIModule = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your Gamesplay AI assistant. I can help you with game logic, 3D design, or optimize your streaming setup. What are we building today?",
      type: 'text'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Mock AI response
    setTimeout(() => {
      let assistantMsg: Message;
      if (input.toLowerCase().includes('code') || input.toLowerCase().includes('logic')) {
        assistantMsg = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          type: 'code',
          content: "I've generated a health system component for you:\n\n```typescript\nexport class HealthSystem extends Component {\n  maxHealth: number = 100;\n  currentHealth: number = 100;\n\n  takeDamage(amount: number) {\n    this.currentHealth -= amount;\n    if (this.currentHealth <= 0) this.entity.destroy();\n  }\n}\n```"
        };
      } else if (input.toLowerCase().includes('design') || input.toLowerCase().includes('3d')) {
        assistantMsg = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          type: 'suggestion',
          content: "I suggest adding a point light with a soft blue tint (#bbf7ff) near your hero cube to give it a more cinematic feel. Should I apply this?"
        };
      } else {
        assistantMsg = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: "That sounds like a great idea. I'm ready to help you implement it in the Dev IDE or Designer modules. Just let me know which part you want to start with."
        };
      }
      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex h-full flex-col bg-[#0c0c0e]">
      {/* Header */}
      <div className="h-14 border-b border-[#27272a] bg-[#0f0f12] flex items-center px-6 justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-600/20 rounded-lg">
            <BrainCircuit size={20} className="text-purple-400" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-zinc-100 uppercase tracking-tight">AI Workspace</h2>
            <p className="text-[10px] text-zinc-500 font-medium">POWERED BY GAMESPLAY AGENT V2.4</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <span className="text-[10px] text-green-500 font-mono flex items-center gap-1.5">
             <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
             LATENCY: 42ms
           </span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6" ref={scrollRef}>
        {messages.map((msg) => (
          <div key={msg.id} className={cn(
            "flex gap-4 max-w-3xl",
            msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
          )}>
            <div className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-1",
              msg.role === 'assistant' ? "bg-purple-600/20 text-purple-400" : "bg-zinc-800 text-zinc-400"
            )}>
              {msg.role === 'assistant' ? <Bot size={18} /> : <User size={18} />}
            </div>
            <div className={cn(
              "flex flex-col gap-2 p-4 rounded-2xl text-sm leading-relaxed",
              msg.role === 'assistant' ? "bg-zinc-900 border border-zinc-800 text-zinc-300" : "bg-purple-600 text-white"
            )}>
              <div className="whitespace-pre-wrap font-sans">
                {msg.content}
              </div>
              {msg.type === 'code' && (
                <button className="mt-2 self-start flex items-center gap-2 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg border border-zinc-700 text-xs transition-colors">
                  <Code2 size={14} />
                  Inject to IDE
                </button>
              )}
              {msg.type === 'suggestion' && (
                <button className="mt-2 self-start flex items-center gap-2 px-3 py-1.5 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 rounded-lg border border-purple-500/20 text-xs transition-colors">
                  <BoxIcon size={14} />
                  Apply to 3D Scene
                </button>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-4 mr-auto animate-pulse">
            <div className="w-8 h-8 rounded-lg bg-purple-600/20 text-purple-400 flex items-center justify-center shrink-0">
              <Bot size={18} />
            </div>
            <div className="bg-zinc-900 border border-zinc-800 text-zinc-500 p-4 rounded-2xl text-sm italic">
              AI is thinking...
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 pt-0">
        <div className="relative group">
          <textarea
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Ask AI for help with your game..."
            className="w-full bg-zinc-900/50 border border-zinc-800 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/10 rounded-2xl px-5 py-4 pr-14 text-sm text-zinc-200 outline-none transition-all placeholder:text-zinc-600 resize-none"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="absolute right-3 top-3 p-2 bg-purple-600 text-white rounded-xl disabled:opacity-50 disabled:bg-zinc-800 hover:bg-purple-500 transition-all shadow-lg shadow-purple-600/20"
          >
            <Send size={18} />
          </button>
        </div>
        <div className="mt-3 flex gap-4">
          <button className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 hover:text-purple-400 transition-colors uppercase tracking-widest">
            <Sparkles size={12} />
            Optimize Code
          </button>
          <button className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 hover:text-purple-400 transition-colors uppercase tracking-widest">
            <Zap size={12} />
            Debug Scene
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIModule;
