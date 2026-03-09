import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <aside className="bg-[#1f1f23] w-12 md:w-60 h-[calc(100vh-3rem)] fixed left-0 top-12 overflow-y-auto hidden sm:block border-r border-[#2d2d30]">
      <div className="p-4">
        <h2 className="text-xs font-bold uppercase text-gray-400 mb-4 hidden md:block">Recommended Channels</h2>
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
    </aside>
  );
};

export default Sidebar;
