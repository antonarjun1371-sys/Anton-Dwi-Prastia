import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Loader2, BookOpen } from 'lucide-react';
import { LoveStoryItem } from '../types';

interface LoveStorySectionProps {
  stories: LoveStoryItem[];
  groomName: string;
  brideName: string;
}

export const LoveStorySection: React.FC<LoveStorySectionProps> = ({ stories, groomName, brideName }) => {
  const [aiPoem, setAiPoem] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState('Puitis Romantis');

  const generatePoemWithAi = async () => {
    setLoadingAi(true);
    try {
      const res = await fetch('/api/ai/story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ style: selectedStyle }),
      });
      const data = await res.json();
      if (data.success && data.result) {
        setAiPoem(data.result);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <section id="story" className="py-20 px-4 relative bg-stone-950 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-amber-400 font-medium">
            Kisah Cinta
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-stone-100 font-bold my-2">
            Perjalanan Kasih {groomName} &amp; {brideName}
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mt-4" />
        </div>

        {/* Story Timeline */}
        <div className="relative border-l-2 border-amber-500/30 ml-4 sm:ml-32 space-y-12 my-12">
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative pl-8 sm:pl-10 group"
            >
              {/* Year Marker on Left */}
              <div className="hidden sm:flex absolute -left-32 top-0 w-24 text-right flex-col items-end">
                <span className="font-serif text-2xl font-bold text-amber-300">
                  {story.year}
                </span>
              </div>

              {/* Dot Icon */}
              <div className="absolute -left-3 top-1.5 w-6 h-6 rounded-full bg-stone-950 border-2 border-amber-400 flex items-center justify-center text-amber-400 shadow-md group-hover:scale-125 transition-transform">
                <Heart className="w-3 h-3 fill-amber-400" />
              </div>

              {/* Mobile Year Badge */}
              <span className="sm:hidden inline-block px-3 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-bold mb-2">
                {story.year}
              </span>

              {/* Card Container */}
              <div className="p-6 rounded-2xl bg-stone-900/80 border border-amber-500/20 backdrop-blur-md shadow-xl hover:border-amber-500/40 transition-all">
                {story.image && (
                  <div className="w-full h-48 sm:h-64 rounded-xl overflow-hidden mb-4 border border-amber-500/10">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}
                <h3 className="font-serif text-2xl text-amber-100 font-bold mb-2">
                  {story.title}
                </h3>
                <p className="text-stone-300 text-sm leading-relaxed font-sans">
                  {story.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* AI Poem / Love Story Generator Feature */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-amber-950/40 via-stone-900 to-stone-950 border border-amber-500/40 backdrop-blur-md shadow-2xl text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>AI Romantic Story Assistant</span>
          </div>

          <h3 className="font-serif text-2xl text-amber-100 font-bold mb-2">
            Puitisasi Doa Cinta Pernikahan
          </h3>
          <p className="text-stone-400 text-xs max-w-lg mx-auto mb-6">
            Klik tombol di bawah untuk membuat bait puisi &amp; pantun cinta khusus untuk pasangan {groomName} &amp; {brideName} yang dibuat secara otomatis oleh Google Gemini AI.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            {['Puitis Romantis', 'Pantun Melayu Pernikahan', 'Doa Keabadian Cinta', 'Sastra Klasik'].map((style) => (
              <button
                key={style}
                onClick={() => setSelectedStyle(style)}
                className={`px-4 py-1.5 rounded-full text-xs transition-all cursor-pointer ${
                  selectedStyle === style
                    ? 'bg-amber-500 text-stone-950 font-semibold'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                }`}
              >
                {style}
              </button>
            ))}
          </div>

          <button
            onClick={generatePoemWithAi}
            disabled={loadingAi}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 mx-auto cursor-pointer disabled:opacity-50 transition-all"
          >
            {loadingAi ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-stone-950" />
                <span>Merangkai Indahnya Kata...</span>
              </>
            ) : (
              <>
                <BookOpen className="w-4 h-4 text-stone-950" />
                <span>Buatkan Puisi Cinta AI</span>
              </>
            )}
          </button>

          {aiPoem && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 p-6 rounded-xl bg-stone-950/80 border border-amber-500/30 text-amber-100 font-serif italic text-base sm:text-lg leading-relaxed whitespace-pre-line shadow-inner max-w-2xl mx-auto"
            >
              "{aiPoem}"
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
