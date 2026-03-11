import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Globe, Server, ShieldCheck, CheckCircle2 } from 'lucide-react';

const DNSSetup: React.FC = () => {
  const [domain, setDomain] = useState('');
  const [step, setStep] = useState(1);

  const handleNext = () => setStep(step + 1);

  const getDnsRecord = (input: string) => {
    if (!input) return { host: '@', value: 'domains.gamesplay.tv' };
    const parts = input.split('.');
    if (parts.length > 2) {
      // It's a subdomain like watch.mybrand.com
      return { host: parts[0], value: 'domains.gamesplay.tv' };
    }
    // It's a root domain like mybrand.com
    return { host: '@', value: 'domains.gamesplay.tv' };
  };

  const dnsRecord = getDnsRecord(domain);

  return (
    <div className="bg-[#0e0e10] min-h-screen text-white">
      <Navbar />
      <div className="flex pt-12">
        <Sidebar />
        <main className="flex-1 ml-0 sm:ml-12 md:ml-60 p-6">
          <div className="max-w-4xl mx-auto">
            <header className="mb-10">
              <h1 className="text-3xl font-black mb-2 flex items-center gap-3">
                <Globe className="text-[#a970ff]" size={32} />
                Custom URL & DNS Setup
              </h1>
              <p className="text-gray-400">
                Connect your own domain to your Gamesplay profile or software deployment.
              </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-[#18181b] rounded-xl border border-[#2d2d30] overflow-hidden">
                  <div className="p-6 border-b border-[#2d2d30] flex items-center justify-between">
                    <h2 className="font-bold text-lg">Configuration Steps</h2>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#a970ff] bg-[#a970ff]/10 px-2 py-1 rounded">Step {step} of 3</span>
                  </div>

                  <div className="p-6">
                    {step === 1 && (
                      <div className="space-y-4">
                        <label className="block">
                          <span className="text-sm font-semibold text-gray-400 mb-2 block">Enter your custom domain</span>
                          <input
                            type="text"
                            placeholder="e.g. watch.mybrand.com"
                            className="w-full bg-[#0e0e10] border border-[#3a3a3c] focus:border-[#a970ff] rounded-md p-3 outline-none transition-all"
                            value={domain}
                            onChange={(e) => setDomain(e.target.value)}
                          />
                        </label>
                        <p className="text-xs text-gray-500 italic">Example: watch.yourname.com or play.studio.io</p>
                        <button
                          onClick={handleNext}
                          disabled={!domain}
                          className="w-full bg-[#a970ff] hover:bg-[#9147ff] disabled:opacity-50 disabled:hover:bg-[#a970ff] text-white font-bold py-3 rounded-md transition-all mt-4"
                        >
                          Verify Domain Ownership
                        </button>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-6">
                        <div className="bg-[#0e0e10] p-4 rounded-lg border border-[#2d2d30] font-mono text-sm">
                          <p className="text-gray-500 mb-2"># Add the following CNAME record in your DNS provider:</p>
                          <div className="grid grid-cols-3 gap-4">
                            <span className="text-gray-400">Type</span>
                            <span className="text-gray-400">Host</span>
                            <span className="text-gray-400">Value</span>
                            <span className="text-white">CNAME</span>
                            <span className="text-white">{dnsRecord.host}</span>
                            <span className="text-[#a970ff]">{dnsRecord.value}</span>
                          </div>
                        </div>
                        <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg">
                          <p className="text-yellow-500 text-sm">
                            <strong>Note:</strong> DNS changes can take up to 24-48 hours to propagate globally, but usually happen within minutes.
                          </p>
                        </div>
                        <button
                          onClick={handleNext}
                          className="w-full bg-[#a970ff] hover:bg-[#9147ff] text-white font-bold py-3 rounded-md transition-all"
                        >
                          I've Added the Records
                        </button>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="text-center py-8 space-y-4">
                        <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <CheckCircle2 size={48} />
                        </div>
                        <h3 className="text-2xl font-bold">Verification in Progress</h3>
                        <p className="text-gray-400 max-w-sm mx-auto">
                          We are checking your DNS settings for <strong>{domain}</strong>. You'll receive a notification once the domain is active.
                        </p>
                        <button
                          onClick={() => {
                            setStep(1);
                            setDomain('');
                          }}
                          className="text-[#a970ff] hover:underline font-semibold mt-4"
                        >
                          Back to Dashboard
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-[#18181b] p-6 rounded-xl border border-[#2d2d30]">
                  <Server className="text-[#a970ff] mb-4" size={24} />
                  <h3 className="font-bold mb-2">Why use a custom URL?</h3>
                  <ul className="text-sm text-gray-400 space-y-3">
                    <li className="flex gap-2">
                        <ShieldCheck size={16} className="text-[#a970ff] flex-shrink-0" />
                        Professional branding for your stream or game.
                    </li>
                    <li className="flex gap-2">
                        <ShieldCheck size={16} className="text-[#a970ff] flex-shrink-0" />
                        Easier for your audience to remember.
                    </li>
                    <li className="flex gap-2">
                        <ShieldCheck size={16} className="text-[#a970ff] flex-shrink-0" />
                        Better SEO for your gaming brand.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DNSSetup;
