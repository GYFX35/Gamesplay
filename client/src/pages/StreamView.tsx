import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import GamePlayer from '../components/GamePlayer';
import { Settings, Flag, Share2, Heart } from 'lucide-react';
import { getStreamById } from '../utils/api';
import { io, Socket } from 'socket.io-client';

const StreamView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [stream, setStream] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const socketRef = useRef<Socket | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchStream = async () => {
      if (id) {
        try {
          const data = await getStreamById(id);
          setStream(data);
        } catch (error) {
          console.error('Error fetching stream:', error);
        }
      }
    };
    fetchStream();

    // Socket.io connection
    socketRef.current = io('http://localhost:3001');

    socketRef.current.on('connect', () => {
      socketRef.current?.emit('join-stream', id);
    });

    socketRef.current.on('new-message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [id]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim() && socketRef.current) {
      socketRef.current.emit('send-message', {
        streamId: id,
        message: inputMessage,
        username: 'Viewer_' + Math.floor(Math.random() * 1000)
      });
      setInputMessage('');
    }
  };

  if (!stream) {
    return (
        <div className="bg-[#0e0e10] min-h-screen text-white flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#a970ff]"></div>
        </div>
    );
  }

  return (
    <div className="bg-[#0e0e10] min-h-screen text-white">
      <Navbar />
      <div className="flex pt-12">
        <Sidebar />
        <main className="flex-1 ml-0 sm:ml-12 md:ml-60 flex flex-col lg:flex-row h-[calc(100vh-3rem)] overflow-hidden">
          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col custom-scrollbar">
            <div className="aspect-video w-full bg-black rounded-lg relative flex-shrink-0 shadow-2xl">
               <GamePlayer />
            </div>

            <div className="mt-4 flex flex-col md:flex-row md:items-start justify-between">
              <div className="flex space-x-4">
                <div className="w-16 h-16 bg-gradient-to-tr from-[#a970ff] to-[#ff70a9] rounded-full border-2 border-[#a970ff] flex-shrink-0"></div>
                <div>
                  <h1 className="text-2xl font-bold">{stream.title}</h1>
                  <p className="text-[#a970ff] font-semibold hover:underline cursor-pointer">Streamer_{stream.userId}</p>
                  <p className="text-sm text-gray-400">Playing <span className="text-[#a970ff] hover:underline cursor-pointer">3D Engine World</span></p>
                </div>
              </div>

              <div className="flex items-center space-x-2 mt-4 md:mt-0">
                <button className="bg-[#a970ff] hover:bg-[#9147ff] flex items-center space-x-2 px-4 py-2 rounded font-bold transition-all transform active:scale-95">
                  <Heart size={18} />
                  <span>Follow</span>
                </button>
                <button className="bg-[#2d2d30] hover:bg-[#3a3a3c] p-2 rounded transition-colors">
                  <Share2 size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="w-full lg:w-[340px] bg-[#1f1f23] border-l border-[#2d2d30] flex flex-col flex-shrink-0">
            <div className="p-3 border-b border-[#2d2d30] text-center uppercase text-sm font-bold tracking-wider text-gray-300">
              Stream Chat
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
              {messages.map((msg, i) => (
                <div key={msg.id || i} className="text-sm leading-relaxed">
                  <span className="font-bold" style={{ color: `hsl(${msg.username.length * 50}, 70%, 70%)` }}>
                    {msg.username}:
                  </span>
                  <span className="text-gray-200 ml-2">{msg.message}</span>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            <div className="p-4 bg-[#1f1f23] border-t border-[#2d2d30]">
              <div className="relative mb-2">
                <input
                  type="text"
                  placeholder="Send a message"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="w-full bg-[#3a3a3c] border-2 border-transparent focus:border-[#a970ff] focus:bg-black rounded-md py-2 px-3 outline-none transition-all text-sm"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex space-x-2 text-gray-400">
                    <button className="p-1.5 hover:bg-[#2d2d30] hover:text-white rounded transition-colors"><Settings size={18} /></button>
                    <button className="p-1.5 hover:bg-[#2d2d30] hover:text-white rounded transition-colors"><Flag size={18} /></button>
                </div>
                <button
                  onClick={handleSendMessage}
                  className="bg-[#a970ff] hover:bg-[#9147ff] text-white px-4 py-1.5 rounded font-bold text-sm transition-all transform active:scale-95 shadow-lg"
                >
                  Chat
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StreamView;
