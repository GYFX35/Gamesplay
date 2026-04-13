import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { getGames } from '../utils/api';
import { Game } from '../../../shared';
import { useTranslation } from 'react-i18next';
import { Gamepad2, Play, ExternalLink, Search } from 'lucide-react';

const Games: React.FC = () => {
  const { t } = useTranslation();
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data = await getGames();
        setGames(data);
      } catch (error) {
        console.error('Error fetching games:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, []);

  const filteredGames = games.filter(game =>
    game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    game.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    game.developer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#0e0e10] min-h-screen text-white">
      <Navbar />
      <div className="flex pt-12">
        <Sidebar />
        <main className="flex-1 ml-0 sm:ml-12 md:ml-60 p-6">
          <header className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                  <Gamepad2 className="text-[#a970ff]" />
                  {t('games', { defaultValue: 'Games' })}
                </h1>
                <p className="text-gray-400">Explore and play the best games from Epic Games, Tencent, and more.</p>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search games..."
                  className="bg-[#18181b] border border-[#2d2d30] rounded-md py-2 pl-10 pr-4 w-full md:w-64 focus:outline-none focus:border-[#a970ff] transition-colors"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </header>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                <div key={i} className="animate-pulse bg-[#18181b] rounded-lg p-4">
                  <div className="aspect-video bg-[#2d2d30] rounded-lg mb-4"></div>
                  <div className="h-4 bg-[#2d2d30] rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-[#2d2d30] rounded w-1/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredGames.map((game) => (
                <div key={game.id} className="bg-[#18181b] rounded-lg overflow-hidden border border-[#2d2d30] hover:border-[#a970ff] transition-all group">
                  <div className="relative aspect-video">
                    <img src={game.thumbnail} alt={game.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Link
                        to={`/games/${game.id}`}
                        className="bg-[#a970ff] hover:bg-[#9147ff] text-white px-6 py-2 rounded-full font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                      >
                        <Play size={18} fill="currentColor" />
                        {t('play_now', { defaultValue: 'Play Now' })}
                      </Link>
                    </div>
                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                      {game.genre}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1 truncate">{game.title}</h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2 h-10">{game.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="font-semibold">{game.developer}</span>
                      {game.playUrl && (
                        <a
                          href={game.playUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#a970ff] hover:text-[#9147ff] flex items-center gap-1"
                        >
                          <ExternalLink size={12} />
                          Details
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && filteredGames.length === 0 && (
            <div className="text-center py-20 bg-[#18181b] rounded-xl border border-[#2d2d30]">
              <Gamepad2 size={48} className="mx-auto text-gray-600 mb-4" />
              <h3 className="text-xl font-bold">No games found</h3>
              <p className="text-gray-400">Try adjusting your search terms.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Games;
