import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { getSportsNews, getSportsStreams } from '../utils/api';
import { SportsNews, SportsStream } from '../../../shared/index';
import { Trophy, Newspaper, Play, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Sports: React.FC = () => {
  const { t } = useTranslation();
  const [news, setNews] = useState<SportsNews[]>([]);
  const [streams, setStreams] = useState<SportsStream[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [newsData, streamsData] = await Promise.all([
          getSportsNews(),
          getSportsStreams()
        ]);
        setNews(newsData);
        setStreams(streamsData);
      } catch (error) {
        console.error('Error fetching sports data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-[#0e0e10] min-h-screen text-white">
      <Navbar />
      <div className="flex pt-12">
        <Sidebar />
        <main className="flex-1 ml-0 sm:ml-12 md:ml-60 p-6 overflow-y-auto h-[calc(100vh-3rem)]">
          <header className="mb-8">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Trophy className="text-[#a970ff]" />
              {t('sports')}
            </h1>
            <p className="text-gray-400">{t('sports_tagline')}</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Live Streams Section */}
            <div className="lg:col-span-2 space-y-6">
              <section>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Play size={20} className="text-[#a970ff]" />
                  {t('live_sports_streams')}
                </h2>
                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2].map(i => (
                      <div key={i} className="aspect-video bg-[#18181b] animate-pulse rounded-lg"></div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {streams.map((stream) => (
                      <div key={stream.id} className="group cursor-pointer">
                        <div className="relative aspect-video rounded-lg overflow-hidden mb-2">
                          <img src={stream.thumbnail} alt={stream.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          {stream.isLive && (
                            <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">
                              {t('live')}
                            </div>
                          )}
                          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded flex items-center gap-1">
                            <Users size={12} />
                            {stream.viewerCount.toLocaleString()}
                          </div>
                        </div>
                        <h3 className="font-bold truncate">{stream.title}</h3>
                        <p className="text-sm text-gray-400">{stream.homeTeam} vs {stream.awayTeam}</p>
                        <p className="text-xs text-[#a970ff] font-medium">{stream.league}</p>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </div>

            {/* News Section */}
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Newspaper size={20} className="text-[#a970ff]" />
                  {t('latest_sports_news')}
                </h2>
                {loading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-24 bg-[#18181b] animate-pulse rounded-lg"></div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {news.map((item) => (
                      <div key={item.id} className="bg-[#18181b] p-3 rounded-lg hover:bg-[#26262c] transition-colors cursor-pointer border border-transparent hover:border-[#a970ff]/30">
                        <div className="flex gap-3">
                          <img src={item.thumbnail} alt={item.title} className="w-20 h-20 rounded object-cover flex-shrink-0" />
                          <div className="overflow-hidden">
                            <span className="text-[10px] font-bold text-[#a970ff] uppercase">{item.category}</span>
                            <h3 className="font-bold text-sm leading-tight mb-1 line-clamp-2">{item.title}</h3>
                            <p className="text-[10px] text-gray-500">{new Date(item.publishedAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Sports;
