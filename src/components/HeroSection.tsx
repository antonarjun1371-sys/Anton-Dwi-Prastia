import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, Heart, ChevronDown } from 'lucide-react';
import { WeddingData } from '../types';

interface HeroSectionProps {
  weddingData: WeddingData;
  onScrollToRsvp: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ weddingData, onScrollToRsvp }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date(weddingData.weddingDateIso).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setDays(Math.floor(difference / (1000 * 60 * 60 * 24)));
        setHours(Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        setMinutes(Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)));
        setSeconds(Math.floor((difference % (1000 * 60)) / 1000));
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    function setDays(d: number) {
      setTimeLeft((prev) => ({ ...prev, days: d }));
    }
    function setHours(h: number) {
      setTimeLeft((prev) => ({ ...prev, hours: h }));
    }
    function setMinutes(m: number) {
      setTimeLeft((prev) => ({ ...prev, minutes: m }));
    }
    function setSeconds(s: number) {
      setTimeLeft((prev) => ({ ...prev, seconds: s }));
    }

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [weddingData.weddingDateIso]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 pb-16 px-4 overflow-hidden">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <img
          src={weddingData.themeSettings?.heroPhotoUrl || weddingData.stories[3]?.image || weddingData.groom.photoUrl}
          alt="Hero Couple"
          className="w-full h-full object-cover object-center filter brightness-50 contrast-105 scale-100"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/80 via-stone-950/60 to-stone-950" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 backdrop-blur-md text-amber-300 text-xs tracking-widest uppercase mb-6"
        >
          <Heart className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>Walimatul 'Ursy</span>
        </motion.div>

        {/* Main Names */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="font-script text-6xl sm:text-8xl md:text-9xl text-amber-200 drop-shadow-lg leading-tight my-2"
        >
          {weddingData.groom.name} &amp; {weddingData.bride.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-stone-300 font-serif text-lg sm:text-xl italic max-w-xl mx-auto my-4"
        >
          "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya."
        </motion.p>
        <span className="block text-xs text-amber-400/80 uppercase tracking-widest mb-8">
          — QS. Ar-Rum: 21
        </span>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="my-8"
        >
          <div className="text-xs uppercase tracking-widest text-amber-300/80 mb-4 flex items-center justify-center gap-2">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>Hitung Mundur Hari Bahagia</span>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto">
            <div className="p-3 sm:p-4 rounded-xl bg-stone-900/80 border border-amber-500/30 backdrop-blur-md shadow-xl">
              <span className="block text-2xl sm:text-4xl font-bold font-serif text-amber-200">
                {timeLeft.days}
              </span>
              <span className="text-[10px] sm:text-xs text-stone-400 uppercase tracking-wider">
                Hari
              </span>
            </div>
            <div className="p-3 sm:p-4 rounded-xl bg-stone-900/80 border border-amber-500/30 backdrop-blur-md shadow-xl">
              <span className="block text-2xl sm:text-4xl font-bold font-serif text-amber-200">
                {timeLeft.hours}
              </span>
              <span className="text-[10px] sm:text-xs text-stone-400 uppercase tracking-wider">
                Jam
              </span>
            </div>
            <div className="p-3 sm:p-4 rounded-xl bg-stone-900/80 border border-amber-500/30 backdrop-blur-md shadow-xl">
              <span className="block text-2xl sm:text-4xl font-bold font-serif text-amber-200">
                {timeLeft.minutes}
              </span>
              <span className="text-[10px] sm:text-xs text-stone-400 uppercase tracking-wider">
                Menit
              </span>
            </div>
            <div className="p-3 sm:p-4 rounded-xl bg-stone-900/80 border border-amber-500/30 backdrop-blur-md shadow-xl">
              <span className="block text-2xl sm:text-4xl font-bold font-serif text-amber-200">
                {timeLeft.seconds}
              </span>
              <span className="text-[10px] sm:text-xs text-stone-400 uppercase tracking-wider">
                Detik
              </span>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
        >
          <a
            href={weddingData.akad.calendarLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-stone-800/90 hover:bg-stone-800 text-amber-200 border border-amber-500/40 text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all hover:border-amber-400 shadow-md"
          >
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>Simpan Kalender</span>
          </a>

          <button
            onClick={onScrollToRsvp}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
          >
            <Heart className="w-4 h-4 fill-stone-950" />
            <span>Konfirmasi Kehadiran (RSVP)</span>
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <div className="mt-12 text-stone-400 text-xs flex flex-col items-center gap-1 animate-bounce">
          <span>Gulir Ke Bawah</span>
          <ChevronDown className="w-4 h-4 text-amber-400" />
        </div>
      </div>
    </section>
  );
};
