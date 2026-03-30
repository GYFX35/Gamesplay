import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { generateAIContent } from '../utils/api';
import { useTranslation } from 'react-i18next';
import { Sparkles, Send, Copy, Check, Type, FileText, Share2, Loader2 } from 'lucide-react';

const AIContentCreator: React.FC = () => {
  const { t } = useTranslation();
  const [prompt, setPrompt] = useState('');
  const [contentType, setContentType] = useState('description');
  const [generatedContent, setGeneratedContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const data = await generateAIContent(prompt, contentType);
      setGeneratedContent(data.content);
    } catch (error) {
      console.error('Error generating content:', error);
      setGeneratedContent(t('ai_error'));
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (navigator?.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(generatedContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    } else {
      // Fallback for browsers that don't support navigator.clipboard
      const textArea = document.createElement("textarea");
      textArea.value = generatedContent;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="bg-[#0e0e10] min-h-screen text-white">
      <Navbar />
      <div className="flex pt-12">
        <Sidebar />
        <main className="flex-1 ml-0 sm:ml-12 md:ml-60 p-6">
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <Sparkles className="text-[#a970ff]" />
              {t('ai_content_creator')}
            </h1>
            <p className="text-gray-400">{t('ai_creator_subtitle')}</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <section className="bg-[#1f1f23] p-6 rounded-xl border border-[#2d2d30] shadow-lg">
              <form onSubmit={handleGenerate} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">
                    {t('content_type')}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'description', label: t('stream_description'), icon: <FileText size={16} /> },
                      { id: 'social-media', label: t('social_post'), icon: <Share2 size={16} /> },
                      { id: 'title', label: t('stream_title'), icon: <Type size={16} /> }
                    ].map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setContentType(type.id)}
                        className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
                          contentType === type.id
                            ? 'bg-[#a970ff]/10 border-[#a970ff] text-[#a970ff]'
                            : 'bg-[#18181b] border-[#2d2d30] text-gray-400 hover:border-gray-500'
                        }`}
                      >
                        {type.icon}
                        <span className="text-[10px] font-bold mt-2 text-center">{type.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="prompt" className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">
                    {t('content_prompt')}
                  </label>
                  <textarea
                    id="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder={t('ai_prompt_placeholder')}
                    className="w-full bg-[#0e0e10] border border-[#2d2d30] focus:border-[#a970ff] rounded-md p-4 outline-none transition-all h-32 resize-none text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !prompt.trim()}
                  className="w-full bg-[#a970ff] hover:bg-[#9147ff] disabled:bg-gray-600 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] shadow-lg shadow-[#a970ff]/20"
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                  {t('generate_content')}
                </button>
              </form>
            </section>

            {/* Output Section */}
            <section className="bg-[#1f1f23] rounded-xl border border-[#2d2d30] shadow-lg flex flex-col overflow-hidden">
              <div className="p-4 border-b border-[#2d2d30] bg-[#18181b] flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-gray-400 tracking-widest">{t('ai_result')}</span>
                {generatedContent && (
                  <button
                    onClick={copyToClipboard}
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-1 text-xs font-bold"
                  >
                    {copied ? (
                      <>
                        <Check size={14} className="text-green-500" />
                        <span className="text-green-500">{t('copied')}</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>{t('copy')}</span>
                      </>
                    )}
                  </button>
                )}
              </div>
              <div className="flex-1 p-6 relative">
                {loading ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
                    <Loader2 className="animate-spin mb-4" size={48} />
                    <p className="animate-pulse font-medium">{t('generating')}</p>
                  </div>
                ) : generatedContent ? (
                  <div className="bg-[#0e0e10] p-6 rounded-lg border border-[#2d2d30] h-full overflow-y-auto">
                    <p className="text-lg leading-relaxed whitespace-pre-wrap">{generatedContent}</p>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-gray-500 text-center px-8">
                    <Sparkles size={48} className="mb-4 opacity-10" />
                    <p>{t('ai_empty_state')}</p>
                  </div>
                )}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AIContentCreator;
