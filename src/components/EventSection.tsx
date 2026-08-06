import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, ExternalLink, Navigation, CheckCircle2 } from 'lucide-react';
import { EventDetail } from '../types';

interface EventSectionProps {
  akad: EventDetail;
  resepsi: EventDetail;
}

export const EventSection: React.FC<EventSectionProps> = ({ akad, resepsi }) => {
  const [activeTab, setActiveTab] = useState<'akad' | 'resepsi'>('akad');

  const currentEvent = activeTab === 'akad' ? akad : resepsi;

  return (
    <section id="event" className="py-20 px-4 relative bg-stone-900 border-t border-b border-amber-500/20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-amber-400 font-medium">
            Rangkaian Acara
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-stone-100 font-bold my-2">
            Waktu &amp; Lokasi
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mt-4" />
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-full bg-stone-950 border border-amber-500/30">
            <button
              onClick={() => setActiveTab('akad')}
              className={`px-6 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                activeTab === 'akad'
                  ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Akad Nikah
            </button>
            <button
              onClick={() => setActiveTab('resepsi')}
              className={`px-6 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                activeTab === 'resepsi'
                  ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Resepsi Pernikahan
            </button>
          </div>
        </div>

        {/* Event Details Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Details Card */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 p-8 rounded-2xl bg-stone-950/80 border border-amber-500/30 backdrop-blur-md shadow-2xl flex flex-col justify-between"
          >
            <div>
              <div className="inline-block px-3 py-1 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-semibold uppercase tracking-wider mb-4">
                {currentEvent.title}
              </div>

              <h3 className="font-serif text-3xl text-amber-100 font-bold mb-6">
                {currentEvent.venueName}
              </h3>

              <div className="space-y-4 text-stone-300 text-sm mb-8">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-stone-400 uppercase">Tanggal</span>
                    <strong className="text-amber-100 font-medium text-base">{currentEvent.dateFormatted}</strong>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-stone-400 uppercase">Waktu</span>
                    <strong className="text-amber-100 font-medium text-base">{currentEvent.time}</strong>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-stone-400 uppercase">Alamat Lengkap</span>
                    <p className="text-stone-300 text-xs leading-relaxed mt-0.5">
                      {currentEvent.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-3 pt-4 border-t border-amber-500/10">
              <a
                href={currentEvent.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20"
              >
                <Navigation className="w-4 h-4 fill-stone-950" />
                <span>Petunjuk Lokasi (Google Maps)</span>
              </a>

              <a
                href={currentEvent.calendarLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-5 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-200 border border-amber-500/30 text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-all"
              >
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>Tambahkan ke Kalender</span>
              </a>
            </div>
          </motion.div>

          {/* Right Map Preview Embed */}
          <motion.div
            key={`map-${activeTab}`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 h-[420px] rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl relative bg-stone-950"
          >
            <iframe
              src={currentEvent.embedMapUrl}
              title={`Lokasi ${currentEvent.title}`}
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(0.3) contrast(1.1) invert(0.9) hue-rotate(180deg)' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
            
            {/* Overlay badge */}
            <div className="absolute top-4 left-4 p-3 rounded-xl bg-stone-950/90 border border-amber-500/30 backdrop-blur-md text-xs text-stone-200 flex items-center gap-2 shadow-lg">
              <MapPin className="w-4 h-4 text-amber-400 animate-bounce" />
              <span>{currentEvent.venueName}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
