import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import GamePlayer from '../components/GamePlayer';
import { Settings, Flag, Share2, DollarSign, Star } from 'lucide-react';
import { getStreamById, subscribeToStreamer, donateToStreamer } from '../utils/api';
import { useTranslation } from 'react-i18next';
import { io, Socket } from 'socket.io-client';

const StreamView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const [stream, setStream] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [donationAmount, setDonationAmount] = useState('5');
  const [donationMsg, setDonationMsg] = useState('');
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

    socketRef.current.on('new-donation', (donation) => {
      setMessages((prev) => [...prev, {
        id: donation.id,
        username: 'SYSTEM',
        message: `🌟 ${donation.userId} donated $${donation.amount}! ${donation.message || ''}`,
        isSystem: true
      }]);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [id]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (stream && socketRef.current) {
      socketRef.current.emit('join-stream', stream.userId);
    }
  }, [stream]);

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

  const handleSubscribe = async () => {
    try {
      await subscribeToStreamer({
        userId: 'Viewer_' + Math.floor(Math.random() * 1000),
        streamerId: stream.userId,
        tier: 1
      });
      alert('Subscribed successfully!');
    } catch (error) {
      console.error('Error subscribing:', error);
    }
  };

  const handleDonate = async () => {
    try {
      await donateToStreamer({
        userId: 'Viewer_' + Math.floor(Math.random() * 1000),
        streamerId: stream.userId,
        amount: parseFloat(donationAmount),
        message: donationMsg
      });
      setShowDonationModal(false);
      setDonationMsg('');
    } catch (error) {
      console.error('Error donating:', error);
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
                <button
                  onClick={handleSubscribe}
                  className="bg-[#a970ff] hover:bg-[#9147ff] flex items-center space-x-2 px-4 py-2 rounded font-bold transition-all transform active:scale-95"
                >
                  <Star size={18} />
                  <span>{t('subscribe')}</span>
                </button>
                <button
                  onClick={() => setShowDonationModal(true)}
                  className="bg-[#2d2d30] hover:bg-[#3a3a3c] flex items-center space-x-2 px-4 py-2 rounded font-bold transition-colors"
                >
                  <DollarSign size={18} />
                  <span>{t('donate')}</span>
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
                <div key={msg.id || i} className={`text-sm leading-relaxed ${msg.isSystem ? 'bg-[#a970ff]/10 p-2 rounded border border-[#a970ff]/20' : ''}`}>
                  <span className="font-bold" style={{ color: msg.isSystem ? '#a970ff' : `hsl(${msg.username.length * 50}, 70%, 70%)` }}>
                    {msg.username}:
                  </span>
                  <span className={msg.isSystem ? 'text-[#a970ff] font-semibold ml-2' : 'text-gray-200 ml-2'}>{msg.message}</span>
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
      {showDonationModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-[#1f1f23] w-full max-w-md rounded-xl border border-[#2d2d30] shadow-2xl p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <DollarSign className="text-[#a970ff]" />
              {t('send_donation')}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">Amount</label>
                <div className="grid grid-cols-4 gap-2">
                  {['5', '10', '20', '50'].map(val => (
                    <button
                      key={val}
                      onClick={() => setDonationAmount(val)}
                      className={`py-2 rounded font-bold transition-all ${donationAmount === val ? 'bg-[#a970ff] text-white' : 'bg-[#2d2d30] hover:bg-[#3a3a3c] text-gray-300'}`}
                    >
                      ${val}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">{t('donation_message')}</label>
                <textarea
                  value={donationMsg}
                  onChange={(e) => setDonationMsg(e.target.value)}
                  className="w-full bg-[#0e0e10] border border-[#2d2d30] focus:border-[#a970ff] rounded-md p-3 outline-none transition-all h-24 resize-none"
                  placeholder="Tell the streamer something..."
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowDonationModal(false)}
                  className="flex-1 bg-[#2d2d30] hover:bg-[#3a3a3c] py-3 rounded-lg font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDonate}
                  className="flex-1 bg-[#a970ff] hover:bg-[#9147ff] py-3 rounded-lg font-bold transition-all shadow-lg shadow-[#a970ff]/20 active:scale-[0.98]"
                >
                  {t('donate_amount', { amount: donationAmount })}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StreamView;
