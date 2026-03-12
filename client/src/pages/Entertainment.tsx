import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { getMusicTracks } from '../utils/api';
import { MusicTrack } from '../../../shared/index';
import { Play, Pause, SkipBack, SkipForward, Volume2, ListMusic, Disc, Music } from 'lucide-react';

const Entertainment: React.FC = () => {
  const [tracks, setTracks] = useState<MusicTrack[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentTrack, setCurrentTrack] = useState<MusicTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [volume, setVolume] = useState(0.75);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const fetchMusic = async () => {
      try {
        const data = await getMusicTracks();
        setTracks(data);
        if (data.length > 0) {
          setCurrentTrack(data[0]);
        }
      } catch (error) {
        console.error('Error fetching music:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMusic();
  }, []);

  useEffect(() => {
    if (currentTrack && isPlaying) {
      audioRef.current?.play().catch(e => console.error("Playback failed", e));
    } else {
      audioRef.current?.pause();
    }
  }, [currentTrack, isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTrackSelect = (track: MusicTrack) => {
    if (currentTrack?.id === track.id) {
      togglePlay();
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  const onTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration) {
        setProgress((current / duration) * 100);
      }

      const mins = Math.floor(current / 60);
      const secs = Math.floor(current % 60);
      setCurrentTime(`${mins}:${secs < 10 ? '0' : ''}${secs}`);
    }
  };

  const onEnded = () => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime('0:00');
  };

  return (
    <div className="bg-[#0e0e10] min-h-screen text-white">
      <Navbar />
      <div className="flex pt-12">
        <Sidebar />
        <main className="flex-1 ml-0 sm:ml-12 md:ml-60 p-6 flex flex-col h-[calc(100vh-3rem)]">
          <header className="mb-8">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Disc className="text-[#a970ff]" />
              Entertainment
            </h1>
            <p className="text-gray-400">Stream your favorite gaming music and soundtracks.</p>
          </header>

          <div className="flex-1 flex flex-col lg:flex-row gap-8 overflow-hidden">
            {/* Featured Section & List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-8 pr-2">
              <section>
                <div className="relative h-64 rounded-xl overflow-hidden group">
                  <img
                    src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&h=400&fit=crop"
                    alt="Featured"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                  <div className="absolute bottom-6 left-6">
                    <span className="bg-[#a970ff] text-white text-xs font-bold px-2 py-1 rounded uppercase mb-2 inline-block">Featured Playlist</span>
                    <h2 className="text-4xl font-black text-white">Cyberpunk Beats 2077</h2>
                    <p className="text-gray-300 max-w-md mt-2">The ultimate collection of synthwave and electronic tracks for your next gaming session.</p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <ListMusic size={20} className="text-[#a970ff]" />
                  Latest Releases
                </h3>
                {loading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-16 bg-[#18181b] animate-pulse rounded-lg"></div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-2">
                    {tracks.map((track) => (
                      <div
                        key={track.id}
                        onClick={() => handleTrackSelect(track)}
                        className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${currentTrack?.id === track.id ? 'bg-[#a970ff]/20 border border-[#a970ff]/50' : 'bg-[#18181b] hover:bg-[#26262c]'}`}
                      >
                        <div className="flex items-center gap-4">
                          <img src={track.thumbnail} alt={track.title} className="w-12 h-12 rounded object-cover shadow-lg" />
                          <div>
                            <p className="font-bold">{track.title}</p>
                            <p className="text-xs text-gray-400">{track.artist} • {track.album}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-xs text-gray-500">{track.duration}</span>
                          <button className="text-gray-400 hover:text-white">
                            {currentTrack?.id === track.id && isPlaying ? (
                              <Pause size={18} fill="white" />
                            ) : (
                              <Play size={18} fill={currentTrack?.id === track.id ? "white" : "none"} />
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </div>

            {/* Now Playing Sidebar */}
            <div className="w-full lg:w-80 bg-[#18181b] rounded-xl p-6 border border-[#2d2d30] flex flex-col items-center text-center shadow-2xl">
              <h3 className="text-xs font-bold uppercase text-gray-400 mb-6 w-full text-left">Now Playing</h3>
              {currentTrack ? (
                <>
                  <div className="relative mb-6">
                    <img
                      src={currentTrack.thumbnail}
                      alt={currentTrack.title}
                      className="w-48 h-48 rounded-xl shadow-[0_0_30px_rgba(169,112,255,0.3)] object-cover"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-[#a970ff] p-2 rounded-full shadow-lg">
                      <Music className="text-white" size={20} />
                    </div>
                  </div>
                  <h4 className="text-xl font-bold mb-1 truncate w-full">{currentTrack.title}</h4>
                  <p className="text-[#a970ff] font-medium mb-8">{currentTrack.artist}</p>

                  {/* Audio Element (Hidden) */}
                  <audio
                    ref={audioRef}
                    src={currentTrack.audioUrl}
                    onTimeUpdate={onTimeUpdate}
                    onEnded={onEnded}
                  />

                  {/* Progress Bar */}
                  <div className="w-full mb-8">
                    <div className="h-1 w-full bg-[#2d2d30] rounded-full overflow-hidden">
                      <div className="h-full bg-[#a970ff] transition-all duration-300" style={{ width: `${progress}%` }}></div>
                    </div>
                    <div className="flex justify-between mt-2 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                      <span>{currentTime}</span>
                      <span>{currentTrack.duration}</span>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center gap-6 mb-8">
                    <button className="text-gray-400 hover:text-white transition-colors"><SkipBack fill="currentColor" size={24} /></button>
                    <button
                      onClick={togglePlay}
                      className="bg-white text-black p-4 rounded-full hover:scale-105 transition-transform"
                    >
                      {isPlaying ? <Pause fill="black" size={24} /> : <Play fill="black" size={24} />}
                    </button>
                    <button className="text-gray-400 hover:text-white transition-colors"><SkipForward fill="currentColor" size={24} /></button>
                  </div>

                  <div className="w-full flex items-center gap-3 text-gray-400 px-2 group">
                    <Volume2 size={18} className="group-hover:text-white transition-colors" />
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      className="h-1 flex-1 bg-[#2d2d30] rounded-full appearance-none cursor-pointer accent-[#a970ff]"
                    />
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                  <Disc size={48} className="mb-4 opacity-20 animate-spin-slow" />
                  <p>Select a track to start listening</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Entertainment;
