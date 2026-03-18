import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { ShoppingBag, Filter, Search, ChevronDown, Star, Zap, Shield, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ShopItem {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
  rating: number;
  isNew?: boolean;
  isRare?: boolean;
}

const Shop: React.FC = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('All');

  const shopItems: ShopItem[] = [
    {
      id: '1',
      name: 'Shadow Strike Gloves',
      category: 'Equipment',
      price: '45.00',
      image: 'https://images.unsplash.com/photo-1552072092-7f9b8d63efcb?w=400&h=400&fit=crop',
      rating: 4.8,
      isRare: true
    },
    {
      id: '2',
      name: 'Cyber Ninja Skin',
      category: 'Skins',
      price: '120.00',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=400&fit=crop',
      rating: 4.9,
      isNew: true
    },
    {
      id: '3',
      name: 'Titanium Shin Guards',
      category: 'Equipment',
      price: '65.00',
      image: 'https://images.unsplash.com/photo-1517438322307-e67111335449?w=400&h=400&fit=crop',
      rating: 4.5
    },
    {
      id: '4',
      name: 'Neon Aura Effect',
      category: 'VFX',
      price: '25.00',
      image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=400&h=400&fit=crop',
      rating: 4.7,
      isNew: true
    },
    {
      id: '5',
      name: 'Dragon Spirit Wrap',
      category: 'Equipment',
      price: '15.00',
      image: 'https://images.unsplash.com/photo-1599474924187-334a4ae593c1?w=400&h=400&fit=crop',
      rating: 4.3
    },
    {
      id: '6',
      name: 'Void Walker Boots',
      category: 'Skins',
      price: '85.00',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
      rating: 4.6,
      isRare: true
    }
  ];

  const categories = ['All', 'Skins', 'Equipment', 'VFX', 'Bundles'];

  const filteredItems = activeCategory === 'All'
    ? shopItems
    : shopItems.filter(item => item.category === activeCategory);

  return (
    <div className="bg-[#0e0e10] min-h-screen text-white font-sans">
      <Navbar />
      <div className="flex pt-12">
        <Sidebar />
        <main className="flex-1 ml-0 sm:ml-12 md:ml-60 p-6 lg:p-10">
          {/* Hero Section */}
          <section className="mb-12 relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1f1f23] to-[#0e0e10] border border-[#2d2d30] p-8 lg:p-12 shadow-2xl">
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="max-w-xl text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-[#a970ff]/20 text-[#a970ff] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-[#a970ff]/30">
                  <Sparkles size={14} />
                  Season 1: Neon Vanguard
                </div>
                <h1 className="text-4xl lg:text-6xl font-black mb-6 tracking-tight leading-none">
                  {t('shop_hero_title')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a970ff] to-[#ff70a9]">{t('shop_hero_highlight')}</span>
                </h1>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                  {t('shop_hero_desc')}
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  <button className="bg-[#a970ff] hover:bg-[#9147ff] text-white px-8 py-3 rounded-xl font-bold transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(169,112,255,0.4)] flex items-center gap-2">
                    <ShoppingBag size={20} />
                    {t('shop_browse_drops')}
                  </button>
                  <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-3 rounded-xl font-bold transition-all backdrop-blur-sm">
                    {t('shop_view_inventory')}
                  </button>
                </div>
              </div>
              <div className="relative w-full max-w-sm aspect-square hidden lg:block">
                <div className="absolute inset-0 bg-[#a970ff] rounded-full blur-[100px] opacity-20 animate-pulse"></div>
                <img
                  src="https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=600&h=600&fit=crop"
                  alt="Legendary Item"
                  className="relative z-10 rounded-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 shadow-2xl border-4 border-[#a970ff]/20"
                />
              </div>
            </div>

            {/* Background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#a970ff]/10 rounded-full blur-[150px] -mr-48 -mt-48"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#ff70a9]/5 rounded-full blur-[150px] -ml-48 -mb-48"></div>
          </section>

          {/* Search & Filter Bar */}
          <section className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap border ${
                    activeCategory === cat
                      ? 'bg-[#a970ff] border-[#a970ff] text-white shadow-[0_0_15px_rgba(169,112,255,0.4)]'
                      : 'bg-[#18181b] border-[#2d2d30] text-gray-400 hover:border-gray-500'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type="text"
                  placeholder={t('shop_search_placeholder')}
                  className="w-full bg-[#18181b] border border-[#2d2d30] rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:border-[#a970ff] transition-colors"
                />
              </div>
              <button className="bg-[#18181b] border border-[#2d2d30] p-2.5 rounded-xl hover:border-gray-500 transition-colors">
                <Filter size={20} className="text-gray-400" />
              </button>
              <div className="relative group hidden sm:block">
                <button className="bg-[#18181b] border border-[#2d2d30] px-4 py-2 rounded-xl flex items-center gap-2 hover:border-gray-500 transition-colors">
                  <span className="text-sm font-bold">{t('shop_sort_by')}</span>
                  <ChevronDown size={16} className="text-gray-500" />
                </button>
              </div>
            </div>
          </section>

          {/* Grid */}
          <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map(item => (
                <div key={item.id} className="group bg-[#18181b] rounded-2xl overflow-hidden border border-[#2d2d30] hover:border-[#a970ff]/50 transition-all hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col">
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {item.isNew && (
                        <span className="bg-[#00f5d4] text-black text-[10px] font-black px-2 py-0.5 rounded-sm uppercase tracking-wider shadow-lg">New</span>
                      )}
                      {item.isRare && (
                        <span className="bg-[#a970ff] text-white text-[10px] font-black px-2 py-0.5 rounded-sm uppercase tracking-wider shadow-lg">Rare</span>
                      )}
                    </div>

                    <button className="absolute bottom-4 right-4 bg-white text-black p-3 rounded-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:scale-110 shadow-xl">
                      <ShoppingBag size={20} />
                    </button>
                  </div>

                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-bold text-[#a970ff] uppercase tracking-widest">{item.category}</span>
                      <div className="flex items-center gap-1">
                        <Star size={12} className="text-yellow-500 fill-yellow-500" />
                        <span className="text-xs font-bold">{item.rating}</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-lg mb-4 group-hover:text-[#a970ff] transition-colors line-clamp-1">{item.name}</h3>

                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-baseline gap-1">
                        <span className="text-xs text-gray-500 font-bold">$</span>
                        <span className="text-xl font-black">{item.price}</span>
                      </div>
                      <div className="flex items-center gap-2">
                         <div className="w-8 h-8 rounded-full border border-[#2d2d30] flex items-center justify-center text-gray-500 hover:text-white hover:border-white transition-colors cursor-pointer">
                            <Shield size={14} />
                         </div>
                         <div className="w-8 h-8 rounded-full border border-[#2d2d30] flex items-center justify-center text-gray-500 hover:text-white hover:border-white transition-colors cursor-pointer">
                            <Zap size={14} />
                         </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View More */}
            <div className="mt-12 text-center">
              <button className="bg-transparent hover:bg-white/5 border border-[#2d2d30] px-8 py-3 rounded-xl font-bold transition-all text-gray-400 hover:text-white">
                {t('shop_load_more')}
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Shop;
