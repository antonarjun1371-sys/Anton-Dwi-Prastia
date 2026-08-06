import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Mail, Calendar, MapPin, Volume2 } from 'lucide-react';
import { WeddingData } from '../types';

interface CoverModalProps {
  isOpen: boolean;
  guestName: string;
  weddingData: WeddingData;
  onOpenInvitation: () => void;
}

export const CoverModal: React.FC<CoverModalProps> = ({
  isOpen,
  guestName,
  weddingData,
  onOpenInvitation,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '-100%', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-stone-950 text-stone-100"
        >
          {/* Background image with overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src={weddingData.themeSettings?.heroPhotoUrl || weddingData.stories[3]?.image || weddingData.groom.photoUrl}
              alt="Background Cover"
              className="w-full h-full object-cover object-center filter brightness-40 scale-105 animate-pulse-slow"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-stone-950/80" />
            
            {/* Subtle floating gold particle lights */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15)_0,transparent_70%)] pointer-events-none" />
          </div>

          {/* Luxury Frame Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10 max-w-lg w-[90%] p-8 sm:p-10 mx-auto text-center rounded-2xl border border-amber-500/30 bg-stone-900/60 backdrop-blur-md shadow-2xl shadow-amber-950/40"
          >
            {/* Gold Corner Accents */}
            <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-amber-400/60" />
            <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-amber-400/60" />
            <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-amber-400/60" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-amber-400/60" />

            <div className="mb-4 text-amber-300/80 font-serif text-sm tracking-[0.3em] uppercase">
              The Wedding Invitation
            </div>

            <div className="my-3 font-script text-5xl sm:text-6xl text-amber-200 drop-shadow-md">
              {weddingData.groom.name} &amp; {weddingData.bride.name}
            </div>

            <div className="flex items-center justify-center gap-2 text-stone-300 text-xs tracking-widest uppercase my-4">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>{weddingData.akad.dateFormatted}</span>
            </div>

            {/* Recipient Guest Box */}
            <div className="my-6 p-4 rounded-xl bg-stone-950/60 border border-amber-500/20 backdrop-blur-sm">
              <div className="text-xs text-stone-400 uppercase tracking-wider mb-1">
                Kepada Yth. Bapak/Ibu/Saudara/i:
              </div>
              <div className="text-xl sm:text-2xl font-semibold text-amber-100 font-serif my-1">
                {guestName}
              </div>
              <p className="text-[11px] text-stone-400 italic">
                *Mohon maaf bila ada kesalahan penulisan nama/gelar
              </p>
            </div>

            {/* Open Invitation Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenInvitation}
              className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-stone-950 font-semibold text-sm tracking-wider uppercase shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer group"
            >
              <Mail className="w-4 h-4 text-stone-950 group-hover:scale-110 transition-transform" />
              <span>Buka Undangan</span>
              <Volume2 className="w-4 h-4 text-stone-900 opacity-80" />
            </motion.button>

            <div className="mt-4 text-[10px] text-amber-200/60 tracking-wider">
              Sentuh tombol untuk membuka &amp; memutar musik
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
