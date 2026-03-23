import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { getStreams } from '../utils/api';
import { Link } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const [streams, setStreams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStreams = async () => {
      try {
        const data = await getStreams();
        setStreams(data);
      } catch (error) {
        console.error('Error fetching streams:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStreams();
  }, []);

  return (
    <div className="bg-[#0e0e10] min-h-screen text-white">
      <Navbar />
      <div className="flex pt-12">
        <Sidebar />
        <main className="flex-1 ml-0 sm:ml-12 md:ml-60 p-6">
          <section className="mb-8">
            <div className="relative aspect-video bg-[#18181b] rounded-lg overflow-hidden flex items-center justify-center border border-[#2d2d30] shadow-xl">
                <div className="text-center z-10 px-4">
                    <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter">
                        <Trans i18nKey="welcome">
                            Welcome to <span className="text-[#a970ff]">Gamesplay</span>
                        </Trans>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl mb-8 max-w-2xl mx-auto">{t('tagline')}</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button className="bg-[#a970ff] hover:bg-[#9147ff] text-white px-8 py-3 rounded font-bold transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(169,112,255,0.4)] w-full sm:w-auto">
                            {t('browse_live')}
                        </button>
                        <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded font-bold transition-all backdrop-blur-sm w-full sm:w-auto">
                            {t('start_streaming')}
                        </button>
                    </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e10] via-transparent to-transparent opacity-60"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#a970ff] rounded-full blur-[120px] opacity-20 -mr-32 -mt-32"></div>
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">{t('live_channels_like')}</h2>
                <Link to="/browse" className="text-[#a970ff] hover:underline text-sm font-semibold">{t('see_all')}</Link>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="animate-pulse">
                            <div className="aspect-video bg-[#18181b] rounded-lg mb-4"></div>
                            <div className="flex space-x-3">
                                <div className="w-10 h-10 bg-[#18181b] rounded-full"></div>
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 bg-[#18181b] rounded w-3/4"></div>
                                    <div className="h-3 bg-[#18181b] rounded w-1/2"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {streams.map((stream) => (
                    <Link to={`/stream/${stream.id}`} key={stream.id} className="group flex flex-col">
                    <div className="relative aspect-video bg-[#18181b] rounded-lg mb-3 overflow-hidden border-2 border-transparent group-hover:border-[#a970ff] transition-all shadow-lg group-hover:shadow-[#a970ff33]">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-sm uppercase tracking-wider">Live</div>
                        <div className="absolute bottom-3 left-3 text-white text-xs font-bold drop-shadow-md bg-black/40 px-2 py-1 rounded backdrop-blur-sm">
                            {t('viewers_count', { count: stream.viewerCount })}
                        </div>
                    </div>
                    <div className="flex space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex-shrink-0 mt-1 border border-white/10 group-hover:border-[#a970ff]/50 transition-colors"></div>
                        <div className="overflow-hidden">
                        <h3 className="font-bold truncate group-hover:text-[#a970ff] transition-colors leading-tight">{stream.title}</h3>
                        <p className="text-sm text-gray-400 mt-0.5">Streamer_{stream.userId}</p>
                        <p className="text-xs text-gray-500 font-medium">{t('interaction_3d')}</p>
                        </div>
                    </div>
                    </Link>
                ))}
                </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default Home;
