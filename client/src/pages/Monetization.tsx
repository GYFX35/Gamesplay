import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { getStreamerAnalytics } from '../utils/api';
import { StreamerAnalytics } from '../../../shared';
import { useTranslation } from 'react-i18next';
import { DollarSign, Users, TrendingUp, Calendar, ArrowUpRight } from 'lucide-react';

const Monetization: React.FC = () => {
  const { t } = useTranslation();
  const [analytics, setAnalytics] = useState<StreamerAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await getStreamerAnalytics('u1');
        setAnalytics(data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#0e0e10] min-h-screen text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#a970ff]"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#0e0e10] min-h-screen text-white">
      <Navbar />
      <div className="flex pt-12">
        <Sidebar />
        <main className="flex-1 ml-0 sm:ml-12 md:ml-60 p-6">
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <TrendingUp className="text-[#a970ff]" />
              {t('monetization')}
            </h1>
            <p className="text-gray-400">Manage your earnings and see how your channel is performing.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#1f1f23] p-6 rounded-xl border border-[#2d2d30] shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-[#a970ff]/10 p-3 rounded-lg">
                  <DollarSign className="text-[#a970ff]" size={24} />
                </div>
                <span className="text-green-500 text-sm font-bold flex items-center">
                  <ArrowUpRight size={16} /> +12.5%
                </span>
              </div>
              <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">{t('total_revenue')}</p>
              <h2 className="text-3xl font-black">${analytics?.totalRevenue.toFixed(2) ?? '0.00'}</h2>
            </div>

            <div className="bg-[#1f1f23] p-6 rounded-xl border border-[#2d2d30] shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-[#a970ff]/10 p-3 rounded-lg">
                  <Users className="text-[#a970ff]" size={24} />
                </div>
                <span className="text-green-500 text-sm font-bold flex items-center">
                  <ArrowUpRight size={16} /> +5.2%
                </span>
              </div>
              <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">{t('subscribers')}</p>
              <h2 className="text-3xl font-black">{analytics?.subscriberCount ?? 0}</h2>
            </div>

            <div className="bg-[#1f1f23] p-6 rounded-xl border border-[#2d2d30] shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-[#a970ff]/10 p-3 rounded-lg">
                  <Calendar className="text-[#a970ff]" size={24} />
                </div>
              </div>
              <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">Avg. Monthly</p>
              <h2 className="text-3xl font-black">${analytics ? (analytics.totalRevenue / 4).toFixed(2) : '0.00'}</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <section className="bg-[#1f1f23] rounded-xl border border-[#2d2d30] overflow-hidden">
              <div className="p-6 border-b border-[#2d2d30]">
                <h3 className="font-bold text-lg">{t('revenue_overview')}</h3>
              </div>
              <div className="p-6 h-64 flex items-end justify-between gap-2">
                {analytics?.revenueByMonth.map((data, i) => {
                  const maxRevenue = analytics.totalRevenue * 0.6 || 1;
                  const height = (data.amount / maxRevenue) * 100;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <div
                        className="w-full bg-[#a970ff] rounded-t-md transition-all hover:bg-[#9147ff]"
                        style={{ height: `${height}%` }}
                      ></div>
                      <span className="text-xs font-bold text-gray-500 uppercase">{data.month}</span>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="bg-[#1f1f23] rounded-xl border border-[#2d2d30] overflow-hidden">
              <div className="p-6 border-b border-[#2d2d30]">
                <h3 className="font-bold text-lg">{t('recent_donations')}</h3>
              </div>
              <div className="divide-y divide-[#2d2d30]">
                {analytics?.recentDonations.map((donation) => (
                  <div key={donation.id} className="p-4 flex items-center justify-between hover:bg-[#26262c] transition-colors">
                    <div>
                      <p className="font-bold">{donation.userId}</p>
                      <p className="text-sm text-gray-400 italic">"{donation.message}"</p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-[#a970ff]">${donation.amount.toFixed(2)}</p>
                      <p className="text-[10px] text-gray-500 uppercase font-bold">{new Date(donation.timestamp).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Monetization;
