import React from 'react';
import { Search, User, Bell, Gamepad2, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="bg-[#18181b] text-white h-12 flex items-center justify-between px-4 border-b border-[#2d2d30] fixed top-0 w-full z-50">
      <div className="flex items-center space-x-6">
        <Link to="/" className="flex items-center space-x-2">
          <Gamepad2 className="text-[#a970ff]" size={28} />
          <span className="font-bold text-xl hidden md:block">Gamesplay</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/browse" className="hover:text-[#a970ff] font-semibold">{t('browse')}</Link>
        </div>
      </div>

      <div className="flex-1 max-w-md mx-4">
        <div className="relative">
          <input
            type="text"
            placeholder={t('search_placeholder')}
            className="w-full bg-[#3a3a3c] border border-transparent focus:border-[#a970ff] focus:bg-black rounded-md py-1.5 px-3 pl-10 outline-none transition-all"
          />
          <Search className="absolute left-3 top-2 text-gray-400" size={18} />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative group">
          <button className="hover:bg-[#2d2d30] p-1 rounded cursor-pointer flex items-center">
            <Globe size={20} className="mr-1" />
            <span className="text-xs font-bold uppercase">{i18n.language.split('-')[0]}</span>
          </button>
          <div className="absolute right-0 mt-2 w-32 bg-[#18181b] border border-[#2d2d30] rounded-md shadow-lg hidden group-hover:block overflow-hidden z-50">
            <button onClick={() => changeLanguage('en')} className="w-full text-left px-4 py-2 text-sm hover:bg-[#2d2d30]">English</button>
            <button onClick={() => changeLanguage('es')} className="w-full text-left px-4 py-2 text-sm hover:bg-[#2d2d30]">Español</button>
            <button onClick={() => changeLanguage('fr')} className="w-full text-left px-4 py-2 text-sm hover:bg-[#2d2d30]">Français</button>
            <button onClick={() => changeLanguage('jp')} className="w-full text-left px-4 py-2 text-sm hover:bg-[#2d2d30]">日本語</button>
          </div>
        </div>
        <Bell className="hover:bg-[#2d2d30] p-1 rounded cursor-pointer" size={24} />
        <User className="hover:bg-[#2d2d30] p-1 rounded cursor-pointer" size={24} />
        <button className="bg-[#a970ff] hover:bg-[#9147ff] text-white px-3 py-1 rounded font-semibold text-sm">
          {t('login')}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
