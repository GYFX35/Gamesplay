import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Link2, Shield, Zap, Globe, ExternalLink } from 'lucide-react';

const PlatformURL: React.FC = () => {
  const platformUrl = import.meta.env.VITE_APP_URL || 'https://gamesplay.tv';

  return (
    <div className="bg-[#0e0e10] min-h-screen text-white">
      <Navbar />
      <div className="flex pt-12">
        <Sidebar />
        <main className="flex-1 ml-0 sm:ml-12 md:ml-60 p-6">
          <div className="max-w-4xl mx-auto">
            <header className="mb-10">
              <h1 className="text-3xl font-black mb-2 flex items-center gap-3">
                <Link2 className="text-[#a970ff]" size={32} />
                Official Platform URL
              </h1>
              <p className="text-gray-400">
                Access the Gamesplay platform securely through our official HTTPS URL.
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-[#18181b] p-8 rounded-xl border border-[#2d2d30] shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#a970ff] rounded-full blur-[80px] opacity-10 -mr-16 -mt-16 group-hover:opacity-20 transition-opacity"></div>

                  <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">Official Domain</h2>
                  <div className="flex items-center justify-between bg-[#0e0e10] p-4 rounded-lg border border-[#3a3a3c] mb-6">
                    <span className="text-xl font-mono font-bold text-[#a970ff]">{platformUrl}</span>
                    <a
                      href={platformUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <ExternalLink size={20} />
                    </a>
                  </div>

                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                    Always ensure you are connecting to our official domain to protect your account and assets. Our platform is fully secured with SSL/TLS encryption.
                  </p>

                  <a
                    href={platformUrl}
                    className="inline-flex items-center gap-2 bg-[#a970ff] hover:bg-[#9147ff] text-white font-bold py-3 px-6 rounded-md transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(169,112,255,0.3)]"
                  >
                    Launch Platform
                    <ExternalLink size={18} />
                  </a>
                </div>

                <div className="bg-[#18181b] p-6 rounded-xl border border-[#2d2d30]">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <Shield className="text-[#a970ff]" size={20} />
                    Security Features
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex gap-3 text-sm text-gray-400">
                      <div className="w-1.5 h-1.5 bg-[#a970ff] rounded-full mt-1.5 flex-shrink-0"></div>
                      End-to-end HTTPS encryption for all traffic.
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                      <div className="w-1.5 h-1.5 bg-[#a970ff] rounded-full mt-1.5 flex-shrink-0"></div>
                      DDoS protection via our global CDN.
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                      <div className="w-1.5 h-1.5 bg-[#a970ff] rounded-full mt-1.5 flex-shrink-0"></div>
                      Secure authentication and data handling.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-[#18181b] p-6 rounded-xl border border-[#2d2d30]">
                  <Zap className="text-[#a970ff] mb-4" size={24} />
                  <h3 className="font-bold mb-2">High Performance</h3>
                  <p className="text-sm text-gray-400 leading-relaxed mb-4">
                    Our infrastructure is optimized for 3D content delivery, ensuring low-latency streaming and smooth interactive experiences directly in your browser.
                  </p>
                  <div className="flex items-center gap-4 text-xs font-bold text-gray-500 uppercase tracking-widest">
                    <div className="flex items-center gap-1">
                      <Globe size={14} />
                      Global Edge
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap size={14} />
                      Low Latency
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#a970ff]/20 to-transparent p-6 rounded-xl border border-[#a970ff]/30">
                  <h3 className="font-bold mb-2 text-white">MMA AR & AI Ready</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    The platform URL is the gateway to our next-gen features, including AR combat and adaptive AI agents. Bookmark it to stay updated on Phase 2 of our roadmap.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PlatformURL;
