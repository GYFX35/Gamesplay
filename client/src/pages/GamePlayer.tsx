import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { getGameById } from '../utils/api';
import { Game } from '../../../shared';
import { ChevronLeft, Maximize2, RefreshCw, Share2, Info } from 'lucide-react';

const GamePlayer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGame = async () => {
      if (!id) return;
      try {
        const data = await getGameById(id);
        setGame(data);
      } catch (error) {
        console.error('Error fetching game details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGame();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-[#0e0e10] min-h-screen text-white flex items-center justify-center">
        <RefreshCw className="animate-spin text-[#a970ff]" size={48} />
      </div>
    );
  }

  if (!game) {
    return (
      <div className="bg-[#0e0e10] min-h-screen text-white flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Game not found</h2>
        <button
          onClick={() => navigate('/games')}
          className="bg-[#a970ff] hover:bg-[#9147ff] px-6 py-2 rounded font-bold"
        >
          Back to Games
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#0e0e10] min-h-screen text-white">
      <Navbar />
      <div className="flex pt-12">
        <Sidebar />
        <main className="flex-1 ml-0 sm:ml-12 md:ml-60 p-6">
          <button
            onClick={() => navigate('/games')}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ChevronLeft size={20} />
            Back to Games
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <div className="bg-black rounded-xl overflow-hidden shadow-2xl border border-[#2d2d30]">
                <div className="aspect-video relative">
                  {game.playUrl ? (
                    <iframe
                      src={game.playUrl}
                      className="w-full h-full border-none"
                      title={game.title}
                      allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    ></iframe>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-[#18181b]">
                        <img src={game.thumbnail} alt={game.title} className="w-64 h-36 object-cover rounded-lg mb-6 opacity-50 blur-sm" />
                        <h2 className="text-2xl font-bold mb-2">Ready to Play?</h2>
                        <p className="text-gray-400 mb-6 text-center max-w-md px-4">
                            This game is currently being integrated into the Gamesplay platform. Click the button below to view it on the developer's site.
                        </p>
                        <a
                            href="#"
                            className="bg-[#a970ff] hover:bg-[#9147ff] text-white px-8 py-3 rounded-md font-bold transition-all"
                            onClick={(e) => {
                                e.preventDefault();
                                alert('In a real environment, this would redirect to the verified play URL.');
                            }}
                        >
                            Launch Externally
                        </a>
                    </div>
                  )}
                </div>

                <div className="p-4 bg-[#18181b] border-t border-[#2d2d30] flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button className="text-gray-400 hover:text-white transition-colors" title="Reload">
                      <RefreshCw size={20} />
                    </button>
                    <button className="text-gray-400 hover:text-white transition-colors" title="Fullscreen">
                      <Maximize2 size={20} />
                    </button>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 bg-[#2d2d30] hover:bg-[#3d3d40] px-4 py-2 rounded font-semibold text-sm transition-colors">
                      <Share2 size={16} />
                      Share
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h1 className="text-3xl font-bold mb-2">{game.title}</h1>
                <div className="flex items-center gap-4 text-sm mb-6">
                  <span className="bg-[#a970ff]/20 text-[#a970ff] px-3 py-1 rounded-full font-bold">{game.genre}</span>
                  <span className="text-gray-400">Developer: <span className="text-white font-semibold">{game.developer}</span></span>
                </div>
                <div className="bg-[#18181b] p-6 rounded-xl border border-[#2d2d30]">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Info size={20} className="text-[#a970ff]" />
                    About this game
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {game.description || "No description available for this title."}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
                <div className="bg-[#18181b] rounded-xl p-6 border border-[#2d2d30]">
                    <h3 className="font-bold mb-4 uppercase text-xs text-gray-400 tracking-widest">Recommended</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="flex gap-3 group cursor-pointer">
                                <div className="w-24 h-14 bg-gray-800 rounded overflow-hidden flex-shrink-0">
                                    <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900"></div>
                                </div>
                                <div className="overflow-hidden">
                                    <h4 className="font-bold text-sm truncate group-hover:text-[#a970ff] transition-colors">Similar Game {i}</h4>
                                    <p className="text-xs text-gray-500 uppercase">Action</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-gradient-to-br from-[#a970ff]/10 to-transparent rounded-xl p-6 border border-[#a970ff]/20">
                    <h3 className="font-bold mb-2 text-[#a970ff]">Gamesplay Premium</h3>
                    <p className="text-xs text-gray-400 mb-4">Unlock exclusive skins and early access to new Epic & Tencent titles.</p>
                    <button className="w-full bg-[#a970ff] hover:bg-[#9147ff] text-white py-2 rounded text-sm font-bold transition-colors">
                        Upgrade Now
                    </button>
                </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default GamePlayer;
