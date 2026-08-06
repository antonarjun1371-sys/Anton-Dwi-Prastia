import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link2, Copy, Check, MessageSquare, Share2, Sparkles, X, UserPlus } from 'lucide-react';
import { WeddingData } from '../types';

interface GuestLinkGeneratorProps {
  weddingData: WeddingData;
}

export const GuestLinkGenerator: React.FC<GuestLinkGeneratorProps> = ({ weddingData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [guestNameInput, setGuestNameInput] = useState('');
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [waMessage, setWaMessage] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedWa, setCopiedWa] = useState(false);

  const handleGenerateLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestNameInput) return;

    const baseUrl = window.location.origin + window.location.pathname;
    const encodedName = encodeURIComponent(guestNameInput.trim());
    const fullUrl = `${baseUrl}?to=${encodedName}`;

    const groomName = weddingData.groom.name;
    const brideName = weddingData.bride.name;
    const dateStr = weddingData.akad.dateFormatted;

    const messageText = `*Undangan Digital Pernikahan ${groomName} & ${brideName}*\n\nKepada Yth. Bapak/Ibu/Saudara/i *${guestNameInput.trim()}*,\n\nTanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami:\n\n*${groomName} & ${brideName}*\n🗓️ ${dateStr}\n\nUntuk informasi acara lengkap &amp; konfirmasi RSVP, silakan klik tautan berikut:\n${fullUrl}\n\nMerupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.\n\nTerima kasih,\n*${groomName} & ${brideName}*`;

    setGeneratedUrl(fullUrl);
    setWaMessage(messageText);
  };

  const copyToClipboard = (text: string, type: 'link' | 'wa') => {
    navigator.clipboard.writeText(text);
    if (type === 'link') {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } else {
      setCopiedWa(true);
      setTimeout(() => setCopiedWa(false), 2500);
    }
  };

  return (
    <>
      {/* Floating Creator Button */}
      <div className="fixed bottom-24 right-4 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="p-3.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 shadow-xl shadow-amber-500/30 flex items-center gap-2 font-semibold text-xs uppercase tracking-wider cursor-pointer group transition-all"
        >
          <UserPlus className="w-5 h-5 text-stone-950 group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline">Buat Link Nama Tamu</span>
        </button>
      </div>

      {/* Generator Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div className="max-w-lg w-full p-6 sm:p-8 rounded-2xl bg-stone-900 border border-amber-500/40 shadow-2xl relative">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-stone-800 text-stone-300 hover:text-stone-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-amber-400 font-serif text-2xl font-bold mb-2">
                <Share2 className="w-6 h-6 text-amber-400" />
                <span>Pembuat Link Undangan Tamu</span>
              </div>

              <p className="text-stone-300 text-xs mb-6">
                Masukkan nama tamu yang ingin Anda undang. Sistem akan membuatkan link personal &amp; draf pesan WhatsApp secara otomatis.
              </p>

              <form onSubmit={handleGenerateLink} className="space-y-4 mb-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-amber-300 font-semibold mb-1.5">
                    Nama Tamu Undangan
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Bpk. Bambang & Ibu Restu"
                    value={guestNameInput}
                    onChange={(e) => setGuestNameInput(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-amber-500/30 text-stone-100 text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-all"
                >
                  <Sparkles className="w-4 h-4 text-stone-950" />
                  <span>Generate Link &amp; Pesan WhatsApp</span>
                </button>
              </form>

              {generatedUrl && (
                <div className="space-y-4 border-t border-amber-500/20 pt-4">
                  {/* Link Result */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-stone-400 mb-1">
                      Link Personal Undangan:
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        readOnly
                        value={generatedUrl}
                        className="flex-1 px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-amber-200 text-xs font-mono select-all"
                      />
                      <button
                        onClick={() => copyToClipboard(generatedUrl, 'link')}
                        className="p-2.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 cursor-pointer shrink-0"
                      >
                        {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* WhatsApp Message Preview */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-stone-400 mb-1">
                      Teks Pesan WhatsApp:
                    </label>
                    <textarea
                      readOnly
                      rows={4}
                      value={waMessage}
                      className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-stone-300 text-xs leading-relaxed font-sans"
                    />
                    <button
                      onClick={() => copyToClipboard(waMessage, 'wa')}
                      className="mt-2 w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all"
                    >
                      {copiedWa ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Pesan WhatsApp Berhasil Disalin!</span>
                        </>
                      ) : (
                        <>
                          <MessageSquare className="w-4 h-4" />
                          <span>Salin Teks Pesan WhatsApp</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
