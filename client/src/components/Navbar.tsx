import React from 'react';
import { Search, User, Bell, Gamepad2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-[#18181b] text-white h-12 flex items-center justify-between px-4 border-b border-[#2d2d30] fixed top-0 w-full z-50">
      <div className="flex items-center space-x-6">
        <Link to="/" className="flex items-center space-x-2">
          <Gamepad2 className="text-[#a970ff]" size={28} />
          <span className="font-bold text-xl hidden md:block">Gamesplay</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/browse" className="hover:text-[#a970ff] font-semibold">Browse</Link>
        </div>
      </div>

      <div className="flex-1 max-w-md mx-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-[#3a3a3c] border border-transparent focus:border-[#a970ff] focus:bg-black rounded-md py-1.5 px-3 pl-10 outline-none transition-all"
          />
          <Search className="absolute left-3 top-2 text-gray-400" size={18} />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Bell className="hover:bg-[#2d2d30] p-1 rounded cursor-pointer" size={24} />
        <User className="hover:bg-[#2d2d30] p-1 rounded cursor-pointer" size={24} />
        <button className="bg-[#a970ff] hover:bg-[#9147ff] text-white px-3 py-1 rounded font-semibold text-sm">
          Log In
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
