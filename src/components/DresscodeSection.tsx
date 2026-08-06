import React from 'react';
import { motion } from 'motion/react';
import { Shirt, Sparkles, CheckCircle2 } from 'lucide-react';

interface DresscodeSectionProps {
  dressCode: {
    primaryColor: string;
    secondaryColor: string;
    description: string;
    paletteHexes: string[];
  };
}

export const DresscodeSection: React.FC<DresscodeSectionProps> = ({ dressCode }) => {
  return (
    <section className="py-16 px-4 bg-stone-900 border-t border-amber-500/20">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-semibold uppercase tracking-wider mb-4">
          <Shirt className="w-4 h-4 text-amber-400" />
          <span>Panduan Pakaian &amp; Etika Tamu</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl text-stone-100 font-bold mb-3">
          Dress Code Pakaian Tamu
        </h2>

        <p className="text-stone-300 text-sm max-w-xl mx-auto leading-relaxed mb-6">
          {dressCode.description}
        </p>

        {/* Color Palette Display */}
        <div className="flex items-center justify-center gap-3 my-6">
          {dressCode.paletteHexes.map((hex, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <div
                className="w-10 h-10 rounded-full border-2 border-stone-800 shadow-md transform hover:scale-110 transition-transform"
                style={{ backgroundColor: hex }}
              />
            </div>
          ))}
        </div>

        {/* Guest Etiquette / Protocol Checklist */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 text-left max-w-3xl mx-auto">
          <div className="p-4 rounded-xl bg-stone-950/80 border border-amber-500/20 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-200 text-xs uppercase tracking-wider block mb-1">
                Datang Tepat Waktu
              </strong>
              <p className="text-stone-400 text-xs leading-relaxed">
                Hadir 15 menit sebelum acara dimulai demi kelancaran prosesi.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-stone-950/80 border border-amber-500/20 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-200 text-xs uppercase tracking-wider block mb-1">
                Buku Tamu Digital
              </strong>
              <p className="text-stone-400 text-xs leading-relaxed">
                Isi ucapan &amp; konfirmasi RSVP pada form di bagian bawah undangan.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-stone-950/80 border border-amber-500/20 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-200 text-xs uppercase tracking-wider block mb-1">
                Senyum &amp; Doa Restu
              </strong>
              <p className="text-stone-400 text-xs leading-relaxed">
                Kehadiran dan kebahagiaan Anda adalah hadiah terbaik bagi kami.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
