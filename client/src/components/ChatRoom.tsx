import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { Send, Settings, Flag, MessageSquare } from 'lucide-react';

const SOCKET_URL = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL.replace('/api', '')
  : 'http://localhost:3001';

interface Message {
  id: string;
  userId: string;
  username: string;
  message: string;
  timestamp: string;
  isSystem?: boolean;
}

interface ChatRoomProps {
  roomId: string;
  roomName: string;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ roomId, roomName }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const socketRef = useRef<Socket | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socketRef.current = io(SOCKET_URL);

    socketRef.current.on('connect', () => {
      socketRef.current?.emit('join-stream', roomId); // Using 'join-stream' as a general room joiner for now
    });

    socketRef.current.on('new-message', (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [roomId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim() && socketRef.current) {
      socketRef.current.emit('send-message', {
        streamId: roomId, // Using 'streamId' for room identification
        message: inputMessage,
        username: 'User_' + Math.floor(Math.random() * 1000)
      });
      setInputMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#1f1f23] rounded-xl border border-[#2d2d30] overflow-hidden shadow-2xl">
      <div className="p-4 border-b border-[#2d2d30] flex items-center justify-between bg-[#18181b]">
        <div className="flex items-center gap-2">
          <MessageSquare size={18} className="text-[#a970ff]" />
          <h3 className="font-bold text-sm uppercase tracking-wider text-gray-200">{roomName} Chat</h3>
        </div>
        <div className="flex gap-2">
          <button className="p-1.5 hover:bg-[#2d2d30] text-gray-400 hover:text-white rounded transition-colors"><Settings size={16} /></button>
          <button className="p-1.5 hover:bg-[#2d2d30] text-gray-400 hover:text-white rounded transition-colors"><Flag size={16} /></button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-500 opacity-50 space-y-2">
            <MessageSquare size={48} />
            <p className="text-sm font-medium">Welcome to the {roomName} chat!</p>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div key={msg.id || i} className="group animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-baseline gap-2 mb-0.5">
                <span
                  className="font-bold text-xs"
                  style={{ color: `hsl(${msg.username.length * 50}, 70%, 70%)` }}
                >
                  {msg.username}
                </span>
                <span className="text-[10px] text-gray-600 font-bold group-hover:text-gray-400 transition-colors">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="text-sm text-gray-300 break-words leading-relaxed">{msg.message}</p>
            </div>
          ))
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="p-4 bg-[#18181b] border-t border-[#2d2d30]">
        <div className="relative">
          <input
            type="text"
            placeholder={`Message ${roomName}...`}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            className="w-full bg-[#3a3a3c] border-2 border-transparent focus:border-[#a970ff] focus:bg-black rounded-lg py-2.5 pl-4 pr-12 outline-none transition-all text-sm shadow-inner"
          />
          <button
            onClick={handleSendMessage}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-[#a970ff] hover:bg-[#a970ff] hover:text-white rounded-md transition-all active:scale-90"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-[10px] text-gray-500 mt-2 text-center">
          Be respectful and follow the community guidelines.
        </p>
      </div>
    </div>
  );
};

export default ChatRoom;
