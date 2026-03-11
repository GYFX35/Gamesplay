import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import GamePlayer from '../components/GamePlayer';
import AIAgent from '../components/AIAgent';
import { Save, Play, Code, Box, Layers, Settings, Plus, Loader2 } from 'lucide-react';
import { saveProject } from '../utils/api';

const GameCreator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'scene' | 'code' | 'assets'>('scene');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
      setIsSaving(true);
      try {
          await saveProject({
              name: 'My New MMA Game',
              description: 'Created with AI Developer',
              userId: 'u1',
              assets: ['fighter.glb']
          });
          alert('Project saved successfully!');
      } catch (error) {
          console.error('Error saving project:', error);
          alert('Failed to save project.');
      } finally {
          setIsSaving(false);
      }
  };

  return (
    <div className="bg-[#0e0e10] min-h-screen text-white flex flex-col">
      <Navbar />

      <div className="flex pt-12 flex-1 h-[calc(100vh-3rem)]">
        <Sidebar />

        <main className="flex-1 ml-0 sm:ml-12 md:ml-60 flex flex-col">
          {/* Toolbar */}
          <div className="bg-[#1f1f23] border-b border-[#2d2d30] p-2 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex bg-[#0e0e10] rounded p-1">
                <button
                  onClick={() => setActiveTab('scene')}
                  className={`px-3 py-1 rounded text-xs font-bold transition-all ${activeTab === 'scene' ? 'bg-[#3a3a3c] text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
                >
                  <div className="flex items-center space-x-2">
                    <Box size={14} />
                    <span>Scene</span>
                  </div>
                </button>
                <button
                   onClick={() => setActiveTab('code')}
                  className={`px-3 py-1 rounded text-xs font-bold transition-all ${activeTab === 'code' ? 'bg-[#3a3a3c] text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
                >
                  <div className="flex items-center space-x-2">
                    <Code size={14} />
                    <span>Scripts</span>
                  </div>
                </button>
                <button
                   onClick={() => setActiveTab('assets')}
                  className={`px-3 py-1 rounded text-xs font-bold transition-all ${activeTab === 'assets' ? 'bg-[#3a3a3c] text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
                >
                  <div className="flex items-center space-x-2">
                    <Layers size={14} />
                    <span>Assets</span>
                  </div>
                </button>
              </div>

              <div className="h-6 w-px bg-[#2d2d30]"></div>

              <div className="flex items-center space-x-2">
                 <button className="p-1.5 hover:bg-[#2d2d30] rounded text-gray-400 hover:text-white transition-colors" title="Add Object">
                    <Plus size={18} />
                 </button>
                 <button className="p-1.5 hover:bg-[#2d2d30] rounded text-gray-400 hover:text-white transition-colors" title="Settings">
                    <Settings size={18} />
                 </button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded flex items-center space-x-2 transition-all font-bold text-xs">
                <Play size={14} />
                <span>Play Test</span>
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-[#a970ff] hover:bg-[#9147ff] disabled:bg-gray-600 text-white px-3 py-1.5 rounded flex items-center space-x-2 transition-all font-bold text-xs"
              >
                {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                <span>{isSaving ? 'Saving...' : 'Save Project'}</span>
              </button>
            </div>
          </div>

          {/* Editor Area */}
          <div className="flex-1 flex overflow-hidden">
            <div className="flex-1 relative">
                {activeTab === 'scene' && (
                    <div className="w-full h-full relative">
                        <GamePlayer />
                        {/* 3D Overlays */}
                        <div className="absolute top-4 left-4 flex flex-col space-y-2 pointer-events-none">
                            <div className="bg-black/60 backdrop-blur-md border border-white/10 p-3 rounded-lg pointer-events-auto">
                                <h3 className="text-[10px] font-bold uppercase text-gray-400 mb-2">Hierarchy</h3>
                                <div className="space-y-1 text-xs">
                                    <div className="text-[#a970ff] flex items-center space-x-2 bg-white/5 px-2 py-1 rounded">
                                        <Box size={12} />
                                        <span>PlayerController</span>
                                    </div>
                                    <div className="hover:bg-white/5 px-2 py-1 rounded flex items-center space-x-2 cursor-pointer transition-colors">
                                        <Box size={12} />
                                        <span>Main Arena</span>
                                    </div>
                                    <div className="hover:bg-white/5 px-2 py-1 rounded flex items-center space-x-2 cursor-pointer transition-colors">
                                        <Box size={12} />
                                        <span>Light System</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'code' && (
                    <div className="w-full h-full bg-[#1e1e1e] font-mono text-sm p-4 overflow-auto">
                        <div className="flex items-center space-x-2 mb-4 text-gray-500">
                            <Code size={14} />
                            <span className="text-xs uppercase font-bold">PlayerController.ts</span>
                        </div>
                        <pre className="text-emerald-400">
{`import { GameComponent } from '@gamesplay/core';

export default class PlayerController extends GameComponent {
  update() {
    if (this.input.isKeyDown('Space')) {
      this.actor.jump();
      this.logger.info('Player jumped!');
    }
  }
}`}
                        </pre>
                    </div>
                )}

                {activeTab === 'assets' && (
                     <div className="w-full h-full p-6 bg-[#0e0e10]">
                        <h2 className="text-xl font-bold mb-6">Project Assets</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                                <div key={i} className="bg-[#18181b] border border-[#2d2d30] rounded-lg p-3 hover:border-[#a970ff] cursor-pointer transition-all group">
                                    <div className="aspect-square bg-[#0e0e10] rounded mb-2 flex items-center justify-center">
                                        <Box size={32} className="text-gray-600 group-hover:text-[#a970ff] transition-colors" />
                                    </div>
                                    <p className="text-[10px] font-bold truncate">Asset_{i}.glb</p>
                                    <p className="text-[8px] text-gray-500">3D Model</p>
                                </div>
                            ))}
                            <div className="border-2 border-dashed border-[#2d2d30] rounded-lg p-3 hover:border-[#a970ff] cursor-pointer transition-all flex flex-col items-center justify-center text-gray-500 hover:text-white">
                                <Plus size={24} />
                                <span className="text-[10px] font-bold mt-1">Upload Asset</span>
                            </div>
                        </div>
                     </div>
                )}
            </div>

            <AIAgent />
          </div>
        </main>
      </div>
    </div>
  );
};

export default GameCreator;
