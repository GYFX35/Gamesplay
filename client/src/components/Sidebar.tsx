import React from 'react';
import { Chrome, Globe, Home, Compass } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="bg-[#1f1f23] w-12 md:w-60 h-[calc(100vh-3rem)] fixed left-0 top-12 overflow-y-auto hidden sm:block border-r border-[#2d2d30]">
      <div className="p-2 md:p-4 space-y-6">
        <div>
          <h2 className="text-xs font-bold uppercase text-gray-400 mb-2 px-2 hidden md:block">Menu</h2>
          <div className="space-y-1">
            <Link
              to="/"
              className={`flex items-center space-x-3 p-2 rounded-md transition-colors ${isActive('/') ? 'bg-[#a970ff]/10 text-[#a970ff]' : 'hover:bg-[#26262c]'}`}
              title="Home"
            >
              <Home size={20} />
              <span className="text-sm font-semibold hidden md:block">Home</span>
            </Link>
            <Link
              to="/browse"
              className={`flex items-center space-x-3 p-2 rounded-md transition-colors ${isActive('/browse') ? 'bg-[#a970ff]/10 text-[#a970ff]' : 'hover:bg-[#26262c]'}`}
              title="Browse"
            >
              <Compass size={20} />
              <span className="text-sm font-semibold hidden md:block">Browse</span>
            </Link>
            <Link
              to="/extension"
              className={`flex items-center space-x-3 p-2 rounded-md transition-colors ${isActive('/extension') ? 'bg-[#a970ff]/10 text-[#a970ff]' : 'hover:bg-[#26262c]'}`}
              title="Chrome Extension"
            >
              <Chrome size={20} />
              <span className="text-sm font-semibold hidden md:block">Extension</span>
            </Link>
            <Link
              to="/setup-dns"
              className={`flex items-center space-x-3 p-2 rounded-md transition-colors ${isActive('/setup-dns') ? 'bg-[#a970ff]/10 text-[#a970ff]' : 'hover:bg-[#26262c]'}`}
              title="DNS Setup"
            >
              <Globe size={20} />
              <span className="text-sm font-semibold hidden md:block">DNS Setup</span>
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase text-gray-400 mb-2 px-2 hidden md:block">Recommended Channels</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between hover:bg-[#26262c] p-1 rounded cursor-pointer transition-colors group">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-600 rounded-full flex-shrink-0"></div>
                  <div className="hidden md:block overflow-hidden">
                    <p className="text-sm font-semibold truncate">Streamer_{i}</p>
                    <p className="text-xs text-gray-400 truncate">Minecraft</p>
                  </div>
                </div>
                <div className="hidden md:flex items-center space-x-1">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  <span className="text-xs">{Math.floor(Math.random() * 1000)}k</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
