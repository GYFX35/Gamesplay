import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { getProducts, createOrder } from '../utils/api';
import { Product } from '../../../shared';
import { useTranslation } from 'react-i18next';
import { ShoppingCart, Package, Tag, AlertCircle } from 'lucide-react';

const Shop: React.FC = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [orderStatus, setOrderStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleCheckout = async (productId: string) => {
    try {
      await createOrder({
        userId: 'u1', // Mock user ID
        productId,
        quantity: 1
      });
      setOrderStatus({ type: 'success', message: t('order_success') });
    } catch (error) {
      setOrderStatus({ type: 'error', message: t('order_failed') });
    }
    setTimeout(() => setOrderStatus(null), 3000);
  };

  return (
    <div className="bg-[#0e0e10] min-h-screen text-white">
      <Navbar />
      <div className="flex pt-12">
        <Sidebar />
        <main className="flex-1 ml-0 sm:ml-12 md:ml-60 p-6">
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <ShoppingCart className="text-[#a970ff]" />
              {t('shop')}
            </h1>
            <p className="text-gray-400">{t('shop_tagline')}</p>
          </header>

          {orderStatus && (
            <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
              orderStatus.type === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'
            }`}>
              {orderStatus.type === 'success' ? <Package size={20} /> : <AlertCircle size={20} />}
              <p className="font-semibold">{orderStatus.message}</p>
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="animate-pulse bg-[#18181b] rounded-lg p-4">
                  <div className="aspect-square bg-[#2d2d30] rounded-lg mb-4"></div>
                  <div className="h-4 bg-[#2d2d30] rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-[#2d2d30] rounded w-1/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-[#18181b] rounded-lg overflow-hidden border border-[#2d2d30] hover:border-[#a970ff] transition-all group">
                  <div className="relative aspect-square">
                    <img src={product.thumbnail} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                      <Tag size={12} className="text-[#a970ff]" />
                      {product.category}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1 truncate">{product.name}</h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2 h-10">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-black">${product.price.toFixed(2)}</span>
                      <button
                        onClick={() => handleCheckout(product.id)}
                        className="bg-[#a970ff] hover:bg-[#9147ff] text-white px-4 py-2 rounded text-sm font-bold transition-colors"
                      >
                        {t('buy_now')}
                      </button>
                    </div>
                    <p className="text-[10px] text-gray-500 mt-3 uppercase tracking-wider font-bold">
                      {t('in_stock', { count: product.stock })} • {t('free_shipping')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <section className="mt-12 bg-[#1f1f23] p-8 rounded-xl border border-[#2d2d30]">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-xl">
                <h2 className="text-2xl font-bold mb-4">{t('launch_store')}</h2>
                <p className="text-gray-400 mb-6">
                  {t('creator_dropshipping')}
                </p>
                <button className="bg-white text-black hover:bg-gray-200 px-6 py-2 rounded font-bold transition-colors">
                  {t('start_selling')}
                </button>
              </div>
              <div className="flex-shrink-0 grid grid-cols-2 gap-4">
                <div className="w-32 h-32 bg-[#2d2d30] rounded-lg flex items-center justify-center border border-white/5">
                  <Package size={40} className="text-gray-500" />
                </div>
                <div className="w-32 h-32 bg-[#2d2d30] rounded-lg flex items-center justify-center border border-white/5">
                  <Tag size={40} className="text-gray-500" />
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Shop;
