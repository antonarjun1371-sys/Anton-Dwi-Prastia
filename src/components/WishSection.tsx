import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Heart, Send, Sparkles, Loader2, ThumbsUp, Users, CheckCircle2, UserCheck } from 'lucide-react';
import { WishMessage } from '../types';

interface WishSectionProps {
  groomName: string;
  brideName: string;
}

export const WishSection: React.FC<WishSectionProps> = ({ groomName, brideName }) => {
  const [wishes, setWishes] = useState<WishMessage[]>([]);
  const [senderName, setSenderName] = useState('');
  const [relationship, setRelationship] = useState('Sahabat');
  const [attendance, setAttendance] = useState<'hadir' | 'tidak_hadir' | 'ragu'>('hadir');
  const [guestCount, setGuestCount] = useState(1);
  const [message, setMessage] = useState('');
  
  // AI Generator states
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiTone, setAiTone] = useState('Islami & Penuh Doa Restu');
  const [loadingAi, setLoadingAi] = useState(false);
  
  // Submit state
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  // Fetch initial wishes
  useEffect(() => {
    fetchWishes();
  }, []);

  const fetchWishes = async () => {
    try {
      const res = await fetch('/api/wishes');
      const data = await res.json();
      if (data.success) {
        setWishes(data.wishes);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleGenerateAiWish = async () => {
    if (!senderName) {
      alert('Silakan isi nama Anda terlebih dahulu.');
      return;
    }
    setLoadingAi(true);
    try {
      const res = await fetch('/api/ai/wish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guestName: senderName,
          relationship,
          tone: aiTone,
          language: 'Indonesia',
        }),
      });
      const data = await res.json();
      if (data.success && data.wish) {
        setMessage(data.wish);
        setShowAiModal(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAi(false);
    }
  };

  const handleSubmitWish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !message) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderName,
          relationship,
          attendance,
          guestCount,
          message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage('');
        setSuccessMsg(true);
        fetchWishes();
        setTimeout(() => setSuccessMsg(false), 4000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLikeWish = async (id: string) => {
    try {
      const res = await fetch(`/api/wishes/${id}/like`, { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setWishes((prev) =>
          prev.map((w) => (w.id === id ? { ...w, likes: data.likes } : w))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section id="rsvp" className="py-20 px-4 relative bg-stone-950 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-amber-400 font-medium">
            Buku Tamu &amp; RSVP
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-stone-100 font-bold my-2">
            Ucapan Doa &amp; Kehadiran
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mt-4" />
          <p className="text-stone-400 max-w-lg mx-auto text-sm my-4">
            Kehadiran dan doa restu Anda adalah pelengkap kebahagiaan kami. Mohon isi konfirmasi kehadiran di bawah ini:
          </p>
        </div>

        {/* RSVP Form Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-stone-900/90 border border-amber-500/30 backdrop-blur-md shadow-2xl mb-12">
          <form onSubmit={handleSubmitWish} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-amber-300 font-semibold mb-1.5">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Budi Setiawan"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-amber-500/20 text-stone-100 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              {/* Relationship */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-amber-300 font-semibold mb-1.5">
                  Hubungan / Kerabat
                </label>
                <select
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-amber-500/20 text-stone-100 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                >
                  <option value="Sahabat">Sahabat</option>
                  <option value="Keluarga Besar">Keluarga Besar</option>
                  <option value="Rekan Kerja">Rekan Kerja</option>
                  <option value="Teman Sekolah/Kuliah">Teman Sekolah / Kuliah</option>
                  <option value="Tamu Istimewa">Tamu Istimewa</option>
                </select>
              </div>
            </div>

            {/* Attendance & Guest Count */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-amber-300 font-semibold mb-1.5">
                  Konfirmasi Kehadiran
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setAttendance('hadir')}
                    className={`py-2.5 px-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      attendance === 'hadir'
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-stone-950 text-stone-400 border border-stone-800'
                    }`}
                  >
                    Hadir
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttendance('ragu')}
                    className={`py-2.5 px-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      attendance === 'ragu'
                        ? 'bg-amber-600 text-white shadow-md'
                        : 'bg-stone-950 text-stone-400 border border-stone-800'
                    }`}
                  >
                    Ragu
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttendance('tidak_hadir')}
                    className={`py-2.5 px-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      attendance === 'tidak_hadir'
                        ? 'bg-rose-600 text-white shadow-md'
                        : 'bg-stone-950 text-stone-400 border border-stone-800'
                    }`}
                  >
                    Absen
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-amber-300 font-semibold mb-1.5">
                  Jumlah Tamu Hadir
                </label>
                <select
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  disabled={attendance === 'tidak_hadir'}
                  className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-amber-500/20 text-stone-100 text-sm focus:outline-none focus:border-amber-400 disabled:opacity-40 transition-colors"
                >
                  <option value={1}>1 Orang</option>
                  <option value={2}>2 Orang</option>
                  <option value={3}>3 Orang</option>
                  <option value={4}>4 Orang</option>
                </select>
              </div>
            </div>

            {/* Message Area & AI Assistant Button */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs uppercase tracking-wider text-amber-300 font-semibold">
                  Ucapan &amp; Doa Restu *
                </label>
                <button
                  type="button"
                  onClick={() => setShowAiModal(true)}
                  className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30 transition-all cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Bantu Tulis dengan AI</span>
                </button>
              </div>

              <textarea
                required
                rows={3}
                placeholder="Tuliskan ucapan dan doa hangat Anda untuk kedua mempelai..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-amber-500/20 text-stone-100 text-sm focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all hover:brightness-110 disabled:opacity-50"
            >
              {submitting ? (
                <Loader2 className="w-4 h-4 animate-spin text-stone-950" />
              ) : (
                <Send className="w-4 h-4 text-stone-950" />
              )}
              <span>Kirim Ucapan &amp; Konfirmasi RSVP</span>
            </button>

            <AnimatePresence>
              {successMsg && (
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs text-center flex flex-col sm:flex-row items-center justify-center gap-3 shadow-lg shadow-emerald-950/50 backdrop-blur-md"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 14, delay: 0.05 }}
                    className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center flex-shrink-0 shadow-inner"
                  >
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 stroke-[2.5]" />
                  </motion.div>
                  <div className="text-center sm:text-left">
                    <p className="font-semibold text-emerald-200 text-sm">
                      Konfirmasi Berhasil Terkirim!
                    </p>
                    <p className="text-emerald-300/80 text-[11px] mt-0.5">
                      Terima kasih! Ucapan &amp; Konfirmasi RSVP Anda berhasil tersimpan.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>

        {/* Wishes List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2 mb-4">
            <h3 className="font-serif text-2xl text-amber-100 font-bold flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-amber-400" />
              <span>Daftar Ucapan Tamu ({wishes.length})</span>
            </h3>
          </div>

          {wishes.map((w) => (
            <motion.div
              key={w.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 rounded-2xl bg-stone-900/70 border border-amber-500/20 backdrop-blur-sm"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <strong className="text-amber-200 font-serif text-base block">
                    {w.senderName}
                  </strong>
                  <div className="flex items-center gap-2 text-[11px] text-stone-400 mt-0.5">
                    <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 font-medium">
                      {w.relationship}
                    </span>
                    <span>•</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                        w.attendance === 'hadir'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : w.attendance === 'tidak_hadir'
                          ? 'bg-rose-500/20 text-rose-400'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {w.attendance === 'hadir'
                        ? `Hadir (${w.guestCount} Tamu)`
                        : w.attendance === 'tidak_hadir'
                        ? 'Tidak Hadir'
                        : 'Ragu'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleLikeWish(w.id)}
                  className="px-3 py-1.5 rounded-full bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs flex items-center gap-1.5 border border-amber-500/20 transition-all cursor-pointer"
                >
                  <ThumbsUp className="w-3.5 h-3.5 text-amber-400" />
                  <span>{w.likes}</span>
                </button>
              </div>

              <p className="text-stone-300 text-sm leading-relaxed my-3 font-sans">
                "{w.message}"
              </p>

              <div className="text-[10px] text-stone-500 text-right">
                {new Date(w.createdAt).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* AI Wish Generator Modal */}
      <AnimatePresence>
        {showAiModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div className="max-w-md w-full p-6 rounded-2xl bg-stone-900 border border-amber-500/40 shadow-2xl relative">
              <div className="flex items-center gap-2 text-amber-400 font-serif text-xl font-bold mb-4">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>Asisten Ucapan Gemini AI</span>
              </div>

              <p className="text-stone-300 text-xs mb-4">
                Pilih gaya ucapan untuk memunculkan pesan doa pernikahan yang indah secara instan:
              </p>

              <div className="space-y-3 mb-6">
                <label className="block text-xs text-stone-400 uppercase font-semibold">
                  Gaya Bahasa &amp; Nuansa
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    'Islami & Penuh Doa Restu',
                    'Puitis & Menyentuh Hati',
                    'Santai, Akrab & Hangat',
                    'Formal & Sopan',
                  ].map((tone) => (
                    <button
                      key={tone}
                      type="button"
                      onClick={() => setAiTone(tone)}
                      className={`p-3 rounded-xl text-left text-xs transition-all cursor-pointer ${
                        aiTone === tone
                          ? 'bg-amber-500 text-stone-950 font-bold'
                          : 'bg-stone-950 text-stone-300 border border-stone-800 hover:border-amber-500/30'
                      }`}
                    >
                      {tone}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAiModal(false)}
                  className="px-4 py-2 rounded-xl bg-stone-800 text-stone-300 text-xs font-semibold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleGenerateAiWish}
                  disabled={loadingAi}
                  className="px-5 py-2 rounded-xl bg-amber-500 text-stone-950 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg cursor-pointer disabled:opacity-50"
                >
                  {loadingAi ? (
                    <Loader2 className="w-4 h-4 animate-spin text-stone-950" />
                  ) : (
                    <Sparkles className="w-4 h-4 text-stone-950" />
                  )}
                  <span>Buatkan Ucapan</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
