import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ChatRoom from '../components/ChatRoom';
import { Trophy, Target, Award, Users, BarChart2, Star, Timer, Zap } from 'lucide-react';

const Challenges: React.FC = () => {
  const [selectedChallenge, setSelectedChallenge] = useState('daily');

  const challenges = [
    { id: 'daily', name: 'Daily Duel Master', description: 'Win 5 MMA matches in 24 hours.', progress: 3, total: 5, reward: '500 XP', difficulty: 'Medium', timeLeft: '14h 22m', icon: <Target size={18} /> },
    { id: 'weekly', name: '3D Architect', description: 'Build and publish a new arena in the Game Creator.', progress: 0, total: 1, reward: 'Epic Badge', difficulty: 'Hard', timeLeft: '5d 10h', icon: <Zap size={18} /> },
    { id: 'community', name: 'Stream Supporter', description: 'Donate to 3 different streamers.', progress: 1, total: 3, reward: 'Supporter Tag', difficulty: 'Easy', timeLeft: '2d 08h', icon: <Award size={18} /> },
  ];

  return (
    <div className="bg-[#0e0e10] min-h-screen text-white">
      <Navbar />
      <div className="flex pt-12">
        <Sidebar />
        <main className="flex-1 ml-0 sm:ml-12 md:ml-60 p-6 flex flex-col h-[calc(100vh-3rem)]">
          <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Trophy className="text-[#a970ff]" />
                Challenges & Quests
              </h1>
              <p className="text-gray-400">Complete challenges to earn XP, badges, and exclusive rewards.</p>
            </div>
            <div className="flex items-center gap-6 bg-[#18181b] p-3 rounded-xl border border-[#2d2d30]">
                <div className="text-center">
                    <p className="text-xs font-bold uppercase text-gray-500 mb-1">Your Rank</p>
                    <div className="flex items-center gap-1">
                        <Star size={14} className="text-[#a970ff]" fill="#a970ff" />
                        <span className="text-xl font-black">Level 12</span>
                    </div>
                </div>
                <div className="w-px h-10 bg-[#2d2d30]"></div>
                <div className="text-center">
                    <p className="text-xs font-bold uppercase text-gray-500 mb-1">Active Challenges</p>
                    <span className="text-xl font-black">3</span>
                </div>
            </div>
          </header>

          <div className="flex-1 flex flex-col lg:flex-row gap-8 overflow-hidden">
            {/* Active Challenges */}
            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-6 pr-2">
              <section>
                <h3 className="text-xs font-black uppercase text-gray-500 mb-4 tracking-[0.2em] flex items-center gap-2">
                    <BarChart2 size={14} className="text-[#a970ff]" />
                    In Progress
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {challenges.map((challenge) => (
                    <div
                      key={challenge.id}
                      onClick={() => setSelectedChallenge(challenge.id)}
                      className={`group p-6 rounded-2xl border-2 transition-all cursor-pointer ${selectedChallenge === challenge.id ? 'bg-[#a970ff]/10 border-[#a970ff]' : 'bg-[#18181b] border-[#2d2d30] hover:border-gray-600 shadow-xl'}`}
                    >
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex gap-5">
                          <div className={`p-4 rounded-xl shadow-lg ${selectedChallenge === challenge.id ? 'bg-[#a970ff] text-white' : 'bg-[#2d2d30] text-gray-400'}`}>
                            {challenge.icon}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-xl font-black">{challenge.name}</h3>
                                <span className={`text-[10px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider ${challenge.difficulty === 'Hard' ? 'bg-red-500/20 text-red-500' : challenge.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-green-500/20 text-green-500'}`}>
                                    {challenge.difficulty}
                                </span>
                            </div>
                            <p className="text-gray-400 text-sm">{challenge.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 bg-[#2d2d30] px-2 py-1 rounded-md">
                            <Timer size={14} />
                            {challenge.timeLeft}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-end">
                          <span className="text-sm font-bold text-gray-300">Reward: <span className="text-[#a970ff]">{challenge.reward}</span></span>
                          <span className="text-xs font-black text-gray-500">{challenge.progress}/{challenge.total}</span>
                        </div>
                        <div className="h-3 w-full bg-black rounded-full overflow-hidden border border-[#2d2d30] p-0.5">
                          <div
                            className="h-full bg-gradient-to-r from-[#a970ff] to-[#9147ff] rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(169,112,255,0.4)]"
                            style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-[#18181b] p-6 rounded-2xl border border-[#2d2d30] shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-black flex items-center gap-2">
                        <Users className="text-[#a970ff]" />
                        Community Stats
                    </h3>
                    <button className="text-xs font-bold text-[#a970ff] hover:underline uppercase tracking-wider">View Leaderboard</button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                        { label: 'Global Wins', value: '1.2M' },
                        { label: 'Arenas Built', value: '45.8K' },
                        { label: 'Total XP Earned', value: '890M' },
                        { label: 'Active Questers', value: '256K' }
                    ].map((stat, i) => (
                        <div key={i} className="bg-black/40 p-4 rounded-xl border border-[#2d2d30] text-center">
                            <p className="text-[10px] font-black uppercase text-gray-500 mb-1">{stat.label}</p>
                            <p className="text-2xl font-black text-white">{stat.value}</p>
                        </div>
                    ))}
                </div>
              </section>
            </div>

            {/* Challenges Chat Sidebar */}
            <div className="w-full lg:w-96 flex-shrink-0">
               <ChatRoom roomId={`challenges-${selectedChallenge}`} roomName={challenges.find(c => c.id === selectedChallenge)?.name || 'Challenges'} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Challenges;
