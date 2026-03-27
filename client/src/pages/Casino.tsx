import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { getCasinoGames, placeBet } from '../utils/api';
import { CasinoGame, Bet } from '../../../shared/index';
import { Dices, Coins, Play, Info, AlertCircle, CheckCircle2, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Casino: React.FC = () => {
  const { t } = useTranslation();
  const [games, setGames] = useState<CasinoGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGame, setSelectedGame] = useState<CasinoGame | null>(null);
  const [betAmount, setBetAmount] = useState<number>(10);
  const [lastBet, setLastBet] = useState<Bet | null>(null);
  const [isPlacingBet, setIsPlacingBet] = useState(false);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data = await getCasinoGames();
        setGames(data);
      } catch (error) {
        console.error('Error fetching casino games:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, []);

  const handlePlaceBet = async () => {
    if (!selectedGame) return;
    setIsPlacingBet(true);
    try {
      const result = await placeBet({
        userId: 'u1', // Mock user ID
        gameId: selectedGame.id,
        amount: betAmount
      });
      setLastBet(result);
    } catch (error) {
      console.error('Error placing bet:', error);
    } finally {
      setIsPlacingBet(false);
    }
  };

  return (
    <div className="bg-[#0e0e10] min-h-screen text-white">
      <Navbar />
      <div className="flex pt-12">
        <Sidebar />
        <main className="flex-1 ml-0 sm:ml-12 md:ml-60 p-6 overflow-y-auto h-[calc(100vh-3rem)]">
          <header className="mb-8">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Dices className="text-[#a970ff]" />
              {t('casino')}
            </h1>
            <p className="text-gray-400">{t('casino_tagline')}</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Games Grid */}
            <div className="lg:col-span-2 space-y-6">
              {/* Game Player Section */}
              {selectedGame && (
                <section className="bg-[#18181b] rounded-xl overflow-hidden border border-[#2d2d30]">
                  <div className="p-4 border-b border-[#2d2d30] flex items-center justify-between">
                    <h2 className="font-bold flex items-center gap-2">
                      <Play size={18} className="text-[#a970ff]" />
                      {selectedGame.title} - {t('play_now')}
                    </h2>
                    <a href={selectedGame.gameUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-white flex items-center gap-1">
                      <ExternalLink size={12} />
                      {t('open_new_tab')}
                    </a>
                  </div>
                  <div className="aspect-video w-full bg-black relative">
                    <iframe
                      src={selectedGame.gameUrl}
                      className="w-full h-full border-none"
                      title={selectedGame.title}
                      allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    ></iframe>
                  </div>
                </section>
              )}

              {/* Games Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {loading ? (
                  [1, 2, 3, 4].map(i => (
                    <div key={i} className="aspect-video bg-[#18181b] animate-pulse rounded-lg"></div>
                  ))
                ) : (
                  games.map((game) => (
                    <div
                      key={game.id}
                      onClick={() => setSelectedGame(game)}
                      className={`group cursor-pointer bg-[#18181b] rounded-lg overflow-hidden border-2 transition-all ${selectedGame?.id === game.id ? 'border-[#a970ff]' : 'border-transparent hover:border-[#a970ff]/50'}`}
                    >
                      <div className="relative aspect-video">
                        <img src={game.thumbnail} alt={game.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play fill="white" size={32} />
                        </div>
                        <div className="absolute top-2 right-2 bg-black/80 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase text-[#a970ff]">
                          {game.category}
                        </div>
                      </div>
                      <div className="p-3">
                        <h3 className="font-bold">{game.title}</h3>
                        <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                          <Info size={12} />
                          {t('html5_integrated')}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Betting Panel */}
            <div className="space-y-6">
              <div className="bg-[#18181b] rounded-xl p-6 border border-[#2d2d30]">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Coins size={20} className="text-[#a970ff]" />
                  {t('place_bet')}
                </h2>

                {!selectedGame ? (
                  <div className="text-gray-500 text-center py-8">
                    <p>{t('select_game_to_bet')}</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Selected Game</p>
                      <p className="font-bold">{selectedGame.title}</p>
                    </div>

                    <div>
                      <label className="text-sm text-gray-400 mb-2 block">{t('bet_amount')} ($)</label>
                      <input
                        type="number"
                        value={betAmount}
                        onChange={(e) => setBetAmount(Number(e.target.value))}
                        className="w-full bg-[#0e0e10] border border-[#2d2d30] focus:border-[#a970ff] rounded-md py-2 px-3 outline-none"
                      />
                    </div>

                    <button
                      onClick={handlePlaceBet}
                      disabled={isPlacingBet}
                      className="w-full bg-[#a970ff] hover:bg-[#9147ff] disabled:bg-gray-600 text-white font-bold py-3 rounded-md transition-colors"
                    >
                      {isPlacingBet ? t('processing') : t('place_bet')}
                    </button>

                    {lastBet && (
                      <div className={`mt-4 p-4 rounded-lg flex items-center gap-3 ${lastBet.outcome === 'win' ? 'bg-green-500/10 border border-green-500/50 text-green-500' : 'bg-red-500/10 border border-red-500/50 text-red-500'}`}>
                        {lastBet.outcome === 'win' ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
                        <div>
                          <p className="font-bold uppercase text-xs">{lastBet.outcome === 'win' ? t('win') : t('loss')}!</p>
                          <p className="text-sm">
                            {lastBet.outcome === 'win'
                              ? `You won $${(lastBet.amount * (lastBet.multiplier || 1)).toFixed(2)}!`
                              : `You lost $${lastBet.amount.toFixed(2)}`}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="bg-[#18181b] rounded-xl p-6 border border-[#2d2d30]">
                <h3 className="font-bold mb-2">{t('responsible_gaming')}</h3>
                <p className="text-xs text-gray-400">
                  {t('responsible_gaming_desc')}
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Casino;
