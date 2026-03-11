import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Chrome, Zap, Bell, Monitor } from 'lucide-react';

const Extension: React.FC = () => {
  return (
    <div className="bg-[#0e0e10] min-h-screen text-white">
      <Navbar />
      <div className="flex pt-12">
        <Sidebar />
        <main className="flex-1 ml-0 sm:ml-12 md:ml-60 p-6">
          <div className="max-w-4xl mx-auto">
            <header className="text-center mb-12">
              <div className="inline-block p-4 bg-[#a970ff]/20 rounded-2xl mb-6">
                <Chrome size={64} className="text-[#a970ff]" />
              </div>
              <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Gamesplay Chrome Extension</h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Stay connected with your favorite streamers and never miss a live moment with the Gamesplay companion extension.
              </p>
              <div className="mt-8">
                <button className="bg-[#a970ff] hover:bg-[#9147ff] text-white px-8 py-3 rounded-md font-bold transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(169,112,255,0.4)] flex items-center mx-auto space-x-2">
                  <Chrome size={20} />
                  <span>Add to Chrome</span>
                </button>
                <p className="text-gray-500 mt-4 text-sm font-medium">Available now on the Chrome Web Store</p>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-[#18181b] p-6 rounded-xl border border-[#2d2d30] hover:border-[#a970ff]/50 transition-all">
                <div className="w-12 h-12 bg-[#a970ff]/10 rounded-lg flex items-center justify-center mb-4">
                  <Bell className="text-[#a970ff]" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Instant Notifications</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Get desktop alerts the moment your favorite channels go live, so you're always part of the action.
                </p>
              </div>

              <div className="bg-[#18181b] p-6 rounded-xl border border-[#2d2d30] hover:border-[#a970ff]/50 transition-all">
                <div className="w-12 h-12 bg-[#a970ff]/10 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="text-[#a970ff]" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Quick Access</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  View your followed channels and jump directly into a stream with just two clicks from any tab.
                </p>
              </div>

              <div className="bg-[#18181b] p-6 rounded-xl border border-[#2d2d30] hover:border-[#a970ff]/50 transition-all">
                <div className="w-12 h-12 bg-[#a970ff]/10 rounded-lg flex items-center justify-center mb-4">
                  <Monitor className="text-[#a970ff]" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Mini Player</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Watch streams in a picture-in-picture mini player while you browse other websites.
                </p>
              </div>
            </div>

            <section className="bg-gradient-to-br from-[#18181b] to-[#0e0e10] p-8 md:p-12 rounded-2xl border border-[#2d2d30] relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-3xl font-bold mb-6">How to set up</h2>
                    <div className="space-y-6">
                        <div className="flex items-start space-x-4">
                            <div className="bg-[#a970ff] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                            <div>
                                <h4 className="font-bold text-lg">Download from Web Store</h4>
                                <p className="text-gray-400">Click the 'Add to Chrome' button above to go to the official Chrome Web Store.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="bg-[#a970ff] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                            <div>
                                <h4 className="font-bold text-lg">Pin to Toolbar</h4>
                                <p className="text-gray-400">Click the puzzle icon in your browser and pin Gamesplay for quick access.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="bg-[#a970ff] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                            <div>
                                <h4 className="font-bold text-lg">Log in and Sync</h4>
                                <p className="text-gray-400">Sign in with your Gamesplay account to sync your followed channels and settings.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#a970ff] rounded-full blur-[150px] opacity-10 -mr-48 -mt-48"></div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Extension;
