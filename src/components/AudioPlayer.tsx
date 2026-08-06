import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music, Volume2, VolumeX, ListMusic, Play, Pause, X } from 'lucide-react';

interface AudioTrack {
  title: string;
  artist: string;
  url: string;
}

interface AudioPlayerProps {
  tracks: AudioTrack[];
  autoPlayTriggered: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ tracks, autoPlayTriggered }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = tracks[currentTrackIndex] || tracks[0];

  useEffect(() => {
    if (autoPlayTriggered && audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log('Autoplay prevented:', err));
    }
  }, [autoPlayTriggered]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error(err));
    }
  };

  const handleSelectTrack = (index: number) => {
    setCurrentTrackIndex(index);
    setShowPlaylist(false);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) => console.error(err));
      }
    }, 100);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={currentTrack.url}
        loop
        preload="auto"
      />

      {/* Floating Control Button */}
      <div className="fixed top-4 right-4 z-40 flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={togglePlay}
          className={`p-3 rounded-full border shadow-xl backdrop-blur-md flex items-center justify-center cursor-pointer transition-all ${
            isPlaying
              ? 'bg-amber-500/90 text-stone-950 border-amber-400 shadow-amber-500/30 animate-pulse-slow'
              : 'bg-stone-900/90 text-amber-400 border-amber-500/30'
          }`}
          title={isPlaying ? 'Hentikan Musik' : 'Putar Musik'}
        >
          {isPlaying ? (
            <Volume2 className="w-5 h-5 text-stone-950" />
          ) : (
            <VolumeX className="w-5 h-5 text-amber-400" />
          )}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowPlaylist(!showPlaylist)}
          className="p-3 rounded-full bg-stone-900/90 text-amber-300 border border-amber-500/30 shadow-xl backdrop-blur-md cursor-pointer"
          title="Daftar Musik"
        >
          <ListMusic className="w-5 h-5 text-amber-400" />
        </motion.button>
      </div>

      {/* Track Selector Modal */}
      <AnimatePresence>
        {showPlaylist && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-16 right-4 z-50 w-80 p-5 rounded-2xl bg-stone-900/95 border border-amber-500/40 backdrop-blur-xl shadow-2xl text-stone-100"
          >
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-amber-500/20">
              <div className="flex items-center gap-2 text-amber-300 font-serif font-bold text-sm">
                <Music className="w-4 h-4 text-amber-400" />
                <span>Pilihan Musik Latar</span>
              </div>
              <button
                onClick={() => setShowPlaylist(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              {tracks.map((track, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectTrack(i)}
                  className={`w-full p-3 rounded-xl text-left transition-all cursor-pointer flex items-center justify-between ${
                    currentTrackIndex === i
                      ? 'bg-amber-500/20 border border-amber-500/50 text-amber-200'
                      : 'bg-stone-950/60 hover:bg-stone-950 text-stone-300 border border-stone-800'
                  }`}
                >
                  <div className="pr-2">
                    <span className="block text-xs font-semibold text-amber-100 line-clamp-1">
                      {track.title}
                    </span>
                    <span className="text-[10px] text-stone-400 block mt-0.5">
                      {track.artist}
                    </span>
                  </div>
                  {currentTrackIndex === i && isPlaying ? (
                    <Pause className="w-4 h-4 text-amber-400 shrink-0" />
                  ) : (
                    <Play className="w-4 h-4 text-stone-400 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
