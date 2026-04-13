import React from 'react';
import { Chrome, Globe, Home, Compass, Link2, Cpu, Music, ShoppingCart, Trophy, TrendingUp, MessageCircle, Target, Dices, Sparkles, Gamepad2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
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
              title={t('home')}
            >
              <Home size={20} />
              <span className="text-sm font-semibold hidden md:block">{t('home')}</span>
            </Link>
            <Link
              to="/browse"
              className={`flex items-center space-x-3 p-2 rounded-md transition-colors ${isActive('/browse') ? 'bg-[#a970ff]/10 text-[#a970ff]' : 'hover:bg-[#26262c]'}`}
              title={t('browse')}
            >
              <Compass size={20} />
              <span className="text-sm font-semibold hidden md:block">{t('browse')}</span>
            </Link>
            <Link
              to="/games"
              className={`flex items-center space-x-3 p-2 rounded-md transition-colors ${isActive('/games') ? 'bg-[#a970ff]/10 text-[#a970ff]' : 'hover:bg-[#26262c]'}`}
              title="Games"
            >
              <Gamepad2 size={20} className="text-[#a970ff]" />
              <span className="text-sm font-semibold hidden md:block">Games</span>
            </Link>
            <Link
              to="/create"
              className={`flex items-center space-x-3 p-2 rounded-md transition-colors ${isActive('/create') ? 'bg-[#a970ff]/10 text-[#a970ff]' : 'hover:bg-[#26262c]'}`}
              title={t('create')}
            >
              <Cpu size={20} />
              <span className="text-sm font-semibold hidden md:block">{t('create')}</span>
            </Link>
            <Link
              to="/entertainment"
              className={`flex items-center space-x-3 p-2 rounded-md transition-colors ${isActive('/entertainment') ? 'bg-[#a970ff]/10 text-[#a970ff]' : 'hover:bg-[#26262c]'}`}
              title={t('entertainment')}
            >
              <Music size={20} />
              <span className="text-sm font-semibold hidden md:block">{t('entertainment')}</span>
            </Link>
            <Link
              to="/shop"
              className={`flex items-center space-x-3 p-2 rounded-md transition-colors ${isActive('/shop') ? 'bg-[#a970ff]/10 text-[#a970ff]' : 'hover:bg-[#26262c]'}`}
              title={t('shop')}
            >
              <ShoppingCart size={20} />
              <span className="text-sm font-semibold hidden md:block">{t('shop')}</span>
            </Link>
            <Link
              to="/sports"
              className={`flex items-center space-x-3 p-2 rounded-md transition-colors ${isActive('/sports') ? 'bg-[#a970ff]/10 text-[#a970ff]' : 'hover:bg-[#26262c]'}`}
              title={t('sports')}
            >
              <Trophy size={20} />
              <span className="text-sm font-semibold hidden md:block">{t('sports')}</span>
            </Link>
            <Link
              to="/forums"
              className={`flex items-center space-x-3 p-2 rounded-md transition-colors ${isActive('/forums') ? 'bg-[#a970ff]/10 text-[#a970ff]' : 'hover:bg-[#26262c]'}`}
              title="Forums"
            >
              <MessageCircle size={20} />
              <span className="text-sm font-semibold hidden md:block">Forums</span>
            </Link>
            <Link
              to="/challenges"
              className={`flex items-center space-x-3 p-2 rounded-md transition-colors ${isActive('/challenges') ? 'bg-[#a970ff]/10 text-[#a970ff]' : 'hover:bg-[#26262c]'}`}
              title="Challenges"
            >
              <Target size={20} className="text-[#a970ff]" />
              <span className="text-sm font-semibold hidden md:block">Challenges</span>
            </Link>
            <Link
              to="/predictions"
              className={`flex items-center space-x-3 p-2 rounded-md transition-colors ${isActive('/predictions') ? 'bg-[#a970ff]/10 text-[#a970ff]' : 'hover:bg-[#26262c]'}`}
              title="Predictions"
            >
              <TrendingUp size={20} className="text-[#a970ff]" />
              <span className="text-sm font-semibold hidden md:block">Predictions</span>
            </Link>
            <Link
              to="/monetization"
              className={`flex items-center space-x-3 p-2 rounded-md transition-colors ${isActive('/monetization') ? 'bg-[#a970ff]/10 text-[#a970ff]' : 'hover:bg-[#26262c]'}`}
              title={t('monetization')}
            >
              <TrendingUp size={20} />
              <span className="text-sm font-semibold hidden md:block">{t('monetization')}</span>
            </Link>
            <Link
              to="/ai-creator"
              className={`flex items-center space-x-3 p-2 rounded-md transition-colors ${isActive('/ai-creator') ? 'bg-[#a970ff]/10 text-[#a970ff]' : 'hover:bg-[#26262c]'}`}
              title={t('ai_content_creator')}
            >
              <Sparkles size={20} className="text-[#a970ff]" />
              <span className="text-sm font-semibold hidden md:block">{t('ai_content_creator')}</span>
            </Link>
            <Link
              to="/casino"
              className={`flex items-center space-x-3 p-2 rounded-md transition-colors ${isActive('/casino') ? 'bg-[#a970ff]/10 text-[#a970ff]' : 'hover:bg-[#26262c]'}`}
              title={t('casino')}
            >
              <Dices size={20} className="text-[#a970ff]" />
              <span className="text-sm font-semibold hidden md:block">{t('casino')}</span>
            </Link>
            <Link
              to="/extension"
              className={`flex items-center space-x-3 p-2 rounded-md transition-colors ${isActive('/extension') ? 'bg-[#a970ff]/10 text-[#a970ff]' : 'hover:bg-[#26262c]'}`}
              title={t('extension')}
            >
              <Chrome size={20} />
              <span className="text-sm font-semibold hidden md:block">{t('extension')}</span>
            </Link>
            <Link
              to="/setup-dns"
              className={`flex items-center space-x-3 p-2 rounded-md transition-colors ${isActive('/setup-dns') ? 'bg-[#a970ff]/10 text-[#a970ff]' : 'hover:bg-[#26262c]'}`}
              title={t('dns_setup')}
            >
              <Globe size={20} />
              <span className="text-sm font-semibold hidden md:block">{t('dns_setup')}</span>
            </Link>
            <Link
              to="/platform-url"
              className={`flex items-center space-x-3 p-2 rounded-md transition-colors ${isActive('/platform-url') ? 'bg-[#a970ff]/10 text-[#a970ff]' : 'hover:bg-[#26262c]'}`}
              title={t('platform_url')}
            >
              <Link2 size={20} />
              <span className="text-sm font-semibold hidden md:block">{t('platform_url')}</span>
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase text-gray-400 mb-2 px-2 hidden md:block">{t('recommended')}</h2>
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
