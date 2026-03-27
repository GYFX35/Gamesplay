import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { getPredictions, getCoupons } from '../utils/api';
import { Prediction, Coupon } from '../../../shared/index';
import { TrendingUp, Ticket, Target, Clock, CheckCircle2, Percent, DollarSign } from 'lucide-react';

const Predictions: React.FC = () => {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [predsData, couponsData] = await Promise.all([
          getPredictions(),
          getCoupons()
        ]);
        setPredictions(predsData);
        setCoupons(couponsData);
      } catch (error) {
        console.error('Error fetching data:', error);
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
              <TrendingUp className="text-[#a970ff]" />
              Predictions & Coupons
            </h1>
            <p className="text-gray-400">Expert sports predictions and exclusive discount coupons for your gaming needs.</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Predictions Section */}
            <div className="lg:col-span-2 space-y-6">
              <section>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Target size={20} className="text-[#a970ff]" />
                  Latest Predictions (Pronostics)
                </h2>
                {loading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-32 bg-[#18181b] animate-pulse rounded-lg"></div>
                    ))}
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {predictions.map((pred) => (
                      <div key={pred.id} className="bg-[#18181b] p-4 rounded-lg border border-[#2d2d30] hover:border-[#a970ff]/50 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className="text-[10px] font-bold text-[#a970ff] uppercase bg-[#a970ff]/10 px-2 py-0.5 rounded">{pred.league}</span>
                            <h3 className="text-lg font-bold mt-1">{pred.matchTitle}</h3>
                          </div>
                          <div className="text-right">
                            <span className="text-2xl font-bold text-[#a970ff]">x{pred.odds.toFixed(2)}</span>
                            <p className="text-xs text-gray-400">Odds</p>
                          </div>
                        </div>
                        <div className="bg-[#0e0e10] p-3 rounded mb-3 border-l-2 border-[#a970ff]">
                          <p className="font-semibold text-sm">{pred.prediction}</p>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Clock size={14} />
                              {new Date(pred.startTime).toLocaleTimeString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <CheckCircle2 size={14} className="text-green-500" />
                              {pred.confidence}% Confidence
                            </span>
                          </div>
                          <button className="bg-[#a970ff] hover:bg-[#9147ff] text-white px-4 py-1.5 rounded font-bold transition-colors">
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </div>

            {/* Coupons Section */}
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Ticket size={20} className="text-[#a970ff]" />
                  Active Coupons
                </h2>
                {loading ? (
                  <div className="space-y-4">
                    {[1, 2].map(i => (
                      <div key={i} className="h-40 bg-[#18181b] animate-pulse rounded-lg"></div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {coupons.map((coupon) => (
                      <div key={coupon.id} className="relative bg-[#18181b] p-5 rounded-lg border-2 border-dashed border-[#2d2d30] overflow-hidden group">
                        <div className="absolute -right-8 -top-8 w-24 h-24 bg-[#a970ff]/10 rounded-full group-hover:scale-110 transition-transform"></div>
                        <div className="relative z-10">
                          <div className="flex items-center gap-2 mb-2">
                            {coupon.discountType === 'percentage' ? (
                              <Percent size={20} className="text-[#a970ff]" />
                            ) : (
                              <DollarSign size={20} className="text-[#a970ff]" />
                            )}
                            <span className="text-2xl font-bold">{coupon.discountValue}{coupon.discountType === 'percentage' ? '%' : '$'} OFF</span>
                          </div>
                          <p className="text-sm text-gray-400 mb-4">{coupon.description}</p>
                          <div className="bg-[#0e0e10] p-2 rounded flex items-center justify-between border border-[#2d2d30]">
                            <code className="text-[#a970ff] font-mono font-bold">{coupon.code}</code>
                            <button className="text-[10px] font-bold uppercase bg-[#2d2d30] hover:bg-[#3d3d40] px-2 py-1 rounded transition-colors">
                              Copy
                            </button>
                          </div>
                          <p className="text-[10px] text-gray-500 mt-4">Expires: {new Date(coupon.expiryDate).toLocaleDateString()}</p>
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

export default Predictions;
