import React from 'react';
import { motion } from 'motion/react';
import { Instagram, Heart } from 'lucide-react';
import { BrideGroomInfo } from '../types';

interface CoupleSectionProps {
  groom: BrideGroomInfo;
  bride: BrideGroomInfo;
}

export const CoupleSection: React.FC<CoupleSectionProps> = ({ groom, bride }) => {
  return (
    <section id="couple" className="py-20 px-4 relative overflow-hidden bg-stone-950">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-amber-400 font-medium">
            Pasangan Mempelai
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-stone-100 font-bold my-2">
            Mempelai Pria &amp; Wanita
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mt-4" />
          <p className="text-stone-400 max-w-lg mx-auto text-sm my-4">
            Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan pernikahan putra-putri kami:
          </p>
        </div>

        {/* Couple Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-stretch">
          {/* Groom Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center p-8 rounded-2xl bg-stone-900/80 border border-amber-500/20 backdrop-blur-md shadow-xl hover:border-amber-500/40 transition-all duration-300 group"
          >
            {/* Image Frame with Inner Radius Rule */}
            <div className="relative w-48 h-64 sm:w-56 sm:h-72 rounded-2xl p-1.5 bg-gradient-to-b from-amber-400/60 via-amber-500/20 to-stone-800 shadow-2xl mb-6 overflow-hidden">
              <img
                src={groom.photoUrl}
                alt={groom.fullName}
                className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>

            <h3 className="font-script text-4xl text-amber-200 my-1">
              {groom.fullName}
            </h3>

            <p className="text-xs text-amber-400/90 tracking-wider uppercase font-medium mt-1 mb-3">
              — {groom.name} —
            </p>

            <div className="text-stone-300 text-sm my-2">
              <span className="block text-stone-400 text-xs">{groom.childNumber}</span>
              <strong className="text-amber-100 font-serif text-base">{groom.fatherName}</strong>
              <span className="block text-stone-400 text-xs my-0.5">&amp;</span>
              <strong className="text-amber-100 font-serif text-base">{groom.motherName}</strong>
            </div>

            {groom.quote && (
              <p className="text-stone-400 italic text-xs max-w-xs my-4 border-t border-amber-500/10 pt-4">
                "{groom.quote}"
              </p>
            )}

            {groom.instagram && (
              <a
                href={`https://instagram.com/${groom.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 px-4 py-2 rounded-full border border-amber-500/30 transition-all mt-auto"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>{groom.instagram}</span>
              </a>
            )}
          </motion.div>

          {/* Heart Divider on Mobile/Desktop */}
          <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/50 items-center justify-center text-amber-300 shadow-lg backdrop-blur-md">
            <Heart className="w-6 h-6 fill-amber-400 text-amber-400" />
          </div>

          {/* Bride Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center p-8 rounded-2xl bg-stone-900/80 border border-amber-500/20 backdrop-blur-md shadow-xl hover:border-amber-500/40 transition-all duration-300 group"
          >
            {/* Image Frame */}
            <div className="relative w-48 h-64 sm:w-56 sm:h-72 rounded-2xl p-1.5 bg-gradient-to-b from-amber-400/60 via-amber-500/20 to-stone-800 shadow-2xl mb-6 overflow-hidden">
              <img
                src={bride.photoUrl}
                alt={bride.fullName}
                className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>

            <h3 className="font-script text-4xl text-amber-200 my-1">
              {bride.fullName}
            </h3>

            <p className="text-xs text-amber-400/90 tracking-wider uppercase font-medium mt-1 mb-3">
              — {bride.name} —
            </p>

            <div className="text-stone-300 text-sm my-2">
              <span className="block text-stone-400 text-xs">{bride.childNumber}</span>
              <strong className="text-amber-100 font-serif text-base">{bride.fatherName}</strong>
              <span className="block text-stone-400 text-xs my-0.5">&amp;</span>
              <strong className="text-amber-100 font-serif text-base">{bride.motherName}</strong>
            </div>

            {bride.quote && (
              <p className="text-stone-400 italic text-xs max-w-xs my-4 border-t border-amber-500/10 pt-4">
                "{bride.quote}"
              </p>
            )}

            {bride.instagram && (
              <a
                href={`https://instagram.com/${bride.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 px-4 py-2 rounded-full border border-amber-500/30 transition-all mt-auto"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>{bride.instagram}</span>
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
