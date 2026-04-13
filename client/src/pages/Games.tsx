import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { getGames, submitGame } from '../utils/api';
import { Game } from '../../../shared';
import { Gamepad2, Plus, X, Loader2, Search, Filter } from 'lucide-react';
const Games: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('All');
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    genre: '',
    developer: '',
    category: 'Video Games',
    url: ''
  });

  const categories = ['All', 'Action', 'Casual', 'Children', 'Instant', 'E-sports', 'Video Games'];

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    setLoading(true);
    try {
      const data = await getGames();
      setGames(data);
    } catch (error) {
      console.error('Error fetching games:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submitGame(formData);
      setShowSubmitModal(false);
      setFormData({
        title: '',
        description: '',
        genre: '',
        developer: '',
        category: 'Video Games',
        url: ''
      });
      fetchGames();
    } catch (error) {
      console.error('Error submitting game:', error);
      alert('Failed to submit game.');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredGames = games.filter(game => {
    const matchesFilter = filter === 'All' || game.category === filter;
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.genre.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="bg-[#0e0e10] min-h-screen text-white">
      <Navbar />
      <div className="flex pt-12">
        <Sidebar />
        <main className="flex-1 ml-0 sm:ml-12 md:ml-60 p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-black flex items-center gap-3">
                <Gamepad2 className="text-[#a970ff]" size={32} />
                Games Session
              </h1>
              <p className="text-gray-400 mt-1">Discover, play, and share amazing games from all categories.</p>
            </div>
            <button
              onClick={() => setShowSubmitModal(true)}
              className="bg-[#a970ff] hover:bg-[#9147ff] text-white px-6 py-2.5 rounded-lg font-bold flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-lg shadow-[#a970ff33]"
            >
              <Plus size={20} />
              Submit Game
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
             <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                    type="text"
                    placeholder="Search games..."
                    className="w-full bg-[#18181b] border border-[#2d2d30] focus:border-[#a970ff] rounded-lg py-2 pl-10 pr-4 outline-none transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>
             <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                <Filter size={18} className="text-gray-400 flex-shrink-0" />
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                            filter === cat
                            ? 'bg-[#a970ff] text-white'
                            : 'bg-[#18181b] text-gray-400 hover:text-white border border-[#2d2d30]'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
             </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-video bg-[#18181b] rounded-lg mb-4"></div>
                  <div className="h-4 bg-[#18181b] rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-[#18181b] rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <>
                {filteredGames.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredGames.map((game) => (
                        <div key={game.id} className="group bg-[#18181b] rounded-lg overflow-hidden border border-transparent hover:border-[#a970ff] transition-all shadow-lg hover:shadow-[#a970ff1a]">
                        <div className="relative aspect-video overflow-hidden">
                            <img src={game.thumbnail} alt={game.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-[10px] font-bold px-2 py-1 rounded border border-white/10">
                                {game.category}
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-bold text-lg mb-1 group-hover:text-[#a970ff] transition-colors">{game.title}</h3>
                            <p className="text-xs text-gray-400 mb-3 line-clamp-2">{game.description}</p>
                            <div className="flex items-center justify-between mt-auto">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-[#0e0e10] px-2 py-0.5 rounded">{game.genre}</span>
                                <span className="text-[10px] text-gray-400">by {game.developer}</span>
                            </div>
                            <button className="w-full mt-4 bg-white/5 hover:bg-[#a970ff] text-white py-2 rounded font-bold text-sm transition-all">
                                Play Now
                            </button>
                        </div>
                        </div>
                    ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-[#18181b] rounded-xl border border-dashed border-[#2d2d30]">
                        <Gamepad2 size={48} className="mx-auto text-gray-600 mb-4" />
                        <h3 className="text-xl font-bold">No games found</h3>
                        <p className="text-gray-400">Try adjusting your filters or search term.</p>
                    </div>
                )}
            </>
          )}
        </main>
      </div>

      {/* Submit Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#18181b] w-full max-w-lg rounded-xl border border-[#2d2d30] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between p-6 border-b border-[#2d2d30]">
                <h2 className="text-xl font-bold">Submit Your Game</h2>
                <button onClick={() => setShowSubmitModal(false)} className="text-gray-400 hover:text-white transition-colors">
                    <X size={24} />
                </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase text-gray-400">Game Title</label>
                        <input
                            required
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="w-full bg-[#0e0e10] border border-[#2d2d30] focus:border-[#a970ff] rounded px-3 py-2 text-sm outline-none transition-all"
                            placeholder="My Epic Game"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase text-gray-400">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className="w-full bg-[#0e0e10] border border-[#2d2d30] focus:border-[#a970ff] rounded px-3 py-2 text-sm outline-none transition-all"
                        >
                            {categories.filter(c => c !== 'All').map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase text-gray-400">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full bg-[#0e0e10] border border-[#2d2d30] focus:border-[#a970ff] rounded px-3 py-2 text-sm outline-none transition-all resize-none"
                        placeholder="What's your game about?"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase text-gray-400">Genre</label>
                        <input
                            name="genre"
                            value={formData.genre}
                            onChange={handleInputChange}
                            className="w-full bg-[#0e0e10] border border-[#2d2d30] focus:border-[#a970ff] rounded px-3 py-2 text-sm outline-none transition-all"
                            placeholder="e.g. RPG, Action"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase text-gray-400">Developer</label>
                        <input
                            name="developer"
                            value={formData.developer}
                            onChange={handleInputChange}
                            className="w-full bg-[#0e0e10] border border-[#2d2d30] focus:border-[#a970ff] rounded px-3 py-2 text-sm outline-none transition-all"
                            placeholder="Your Name"
                        />
                    </div>
                </div>
                <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase text-gray-400">Game URL (Optional)</label>
                    <input
                        name="url"
                        value={formData.url}
                        onChange={handleInputChange}
                        className="w-full bg-[#0e0e10] border border-[#2d2d30] focus:border-[#a970ff] rounded px-3 py-2 text-sm outline-none transition-all"
                        placeholder="https://mygame.com"
                    />
                </div>
                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-[#a970ff] hover:bg-[#9147ff] disabled:bg-gray-600 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#a970ff33]"
                    >
                        {submitting ? (
                            <>
                                <Loader2 size={20} className="animate-spin" />
                                <span>Submitting...</span>
                            </>
                        ) : (
                            <span>Submit Game</span>
                        )}
                    </button>
                </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Games;
