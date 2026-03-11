import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { AIAgentMessage } from '../../../shared';
import { getAIAssistance } from '../utils/api';

const AIAgent: React.FC = () => {
  const [messages, setMessages] = useState<AIAgentMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your AI Game Development Assistant. I can help you create levels, design mechanics, or generate assets for your 3D games. What should we build today?",
      timestamp: new Date().toISOString(),
      suggestions: ['Create a forest level', 'Add physics to blocks', 'Design a player controller']
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;

    const userMsg: AIAgentMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const data = await getAIAssistance(text);
      const assistantMsg: AIAgentMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.suggestion,
        timestamp: new Date().toISOString(),
        suggestions: data.actions
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error('Error getting AI assistance:', error);
      const errorMsg: AIAgentMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Sorry, I'm having trouble connecting to the AI service right now. Please try again later.",
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#18181b] border-l border-[#2d2d30] w-80 lg:w-96">
      <div className="p-4 border-b border-[#2d2d30] flex items-center justify-between bg-[#1f1f23]">
        <div className="flex items-center space-x-2">
          <div className="bg-[#a970ff]/20 p-1.5 rounded-lg">
            <Bot size={20} className="text-[#a970ff]" />
          </div>
          <h2 className="font-bold">AI Developer</h2>
        </div>
        <Sparkles size={16} className="text-[#a970ff] animate-pulse" />
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-lg p-3 ${
              msg.role === 'user'
                ? 'bg-[#a970ff] text-white'
                : 'bg-[#26262c] border border-[#3a3a3c]'
            }`}>
              <div className="flex items-center space-x-2 mb-1 opacity-70">
                {msg.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  {msg.role === 'user' ? 'You' : 'AI Agent'}
                </span>
              </div>
              <p className="text-sm leading-relaxed">{msg.content}</p>

              {msg.suggestions && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {msg.suggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(s)}
                      className="text-[10px] bg-black/30 hover:bg-black/50 border border-white/10 px-2 py-1 rounded transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-[#26262c] border border-[#3a3a3c] rounded-lg p-3">
                <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-[#1f1f23] border-t border-[#2d2d30]">
        <form
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="relative"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your game idea..."
            className="w-full bg-[#0e0e10] border border-[#3a3a3c] focus:border-[#a970ff] rounded-md py-2 px-3 pr-10 outline-none text-sm transition-all"
          />
          <button
            type="submit"
            className="absolute right-2 top-1.5 text-gray-400 hover:text-[#a970ff] transition-colors"
          >
            <Send size={18} />
          </button>
        </form>
        <p className="text-[10px] text-gray-500 mt-2 text-center">
          AI can make mistakes. Verify important code and designs.
        </p>
      </div>
    </div>
  );
};

export default AIAgent;
