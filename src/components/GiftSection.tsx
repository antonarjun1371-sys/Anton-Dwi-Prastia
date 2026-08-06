import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Gift, Copy, Check, CreditCard, MapPin, Send } from 'lucide-react';
import { BankAccount, PhysicalGiftAddress } from '../types';

interface GiftSectionProps {
  bankAccounts: BankAccount[];
  physicalAddress: PhysicalGiftAddress;
}

export const GiftSection: React.FC<GiftSectionProps> = ({ bankAccounts, physicalAddress }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [giftConfirmed, setGiftConfirmed] = useState(false);
  const [senderName, setSenderName] = useState('');

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleCopyAddress = () => {
    const fullText = `${physicalAddress.recipientName}\n${physicalAddress.phoneNumber}\n${physicalAddress.fullAddress}\n${physicalAddress.cityProvince}`;
    navigator.clipboard.writeText(fullText);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  const handleConfirmGift = (e: React.FormEvent) => {
    e.preventDefault();
    if (senderName) {
      setGiftConfirmed(true);
      setTimeout(() => setGiftConfirmed(false), 4000);
      setSenderName('');
    }
  };

  return (
    <section id="gift" className="py-20 px-4 relative bg-stone-950 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-amber-400 font-medium">
            Tanda Kasih
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-stone-100 font-bold my-2">
            Hadiah Digital &amp; Angpao
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mt-4" />
          <p className="text-stone-400 max-w-lg mx-auto text-sm my-4">
            Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika Anda ingin memberikan hadiah, Anda dapat menggunakan fitur di bawah ini:
          </p>
        </div>

        {/* Bank Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {bankAccounts.map((acc) => (
            <motion.div
              key={acc.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-stone-900/90 border border-amber-500/30 backdrop-blur-md shadow-xl flex flex-col justify-between relative overflow-hidden"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                  <CreditCard className="w-6 h-6" />
                </div>
                <span className="font-serif text-xl font-bold tracking-wider text-amber-300 uppercase">
                  {acc.bankName}
                </span>
              </div>

              {/* Card Body */}
              <div className="my-2">
                <span className="text-xs text-stone-400 uppercase tracking-wider block mb-1">
                  Nomor Rekening
                </span>
                <span className="font-mono text-2xl font-bold text-amber-100 tracking-widest block">
                  {acc.accountNumber}
                </span>
                <span className="text-xs text-stone-300 block mt-2">
                  a.n. <strong className="text-amber-200">{acc.accountHolder}</strong>
                </span>
              </div>

              {/* Copy Button */}
              <button
                onClick={() => handleCopy(acc.accountNumber, acc.id)}
                className="mt-6 w-full py-2.5 px-4 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {copiedId === acc.id ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Nomor Rekening Berhasil Disalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-amber-400" />
                    <span>Salin Nomor Rekening</span>
                  </>
                )}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Physical Gift Address Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 rounded-2xl bg-stone-900/90 border border-amber-500/30 backdrop-blur-md shadow-xl text-center mb-12"
        >
          <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto mb-4">
            <Gift className="w-6 h-6" />
          </div>

          <h3 className="font-serif text-2xl text-amber-100 font-bold mb-2">
            Kirim Hadiah Fisik
          </h3>
          <p className="text-stone-400 text-xs max-w-md mx-auto mb-6">
            Bagi yang ingin mengirimkan kado/hadiah fisik secara langsung, Anda dapat mengirimkannya ke alamat berikut:
          </p>

          <div className="p-4 rounded-xl bg-stone-950/80 border border-amber-500/20 max-w-md mx-auto text-stone-300 text-xs leading-relaxed mb-6">
            <strong className="text-amber-200 text-sm block mb-1">
              Penerima: {physicalAddress.recipientName} ({physicalAddress.phoneNumber})
            </strong>
            <p>{physicalAddress.fullAddress}</p>
            <p className="text-stone-400">{physicalAddress.cityProvince}</p>
          </div>

          <button
            onClick={handleCopyAddress}
            className="py-2.5 px-6 rounded-full bg-stone-800 hover:bg-stone-700 text-amber-300 border border-amber-500/40 text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2 transition-all cursor-pointer"
          >
            {copiedAddress ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Alamat Berhasil Disalin!</span>
              </>
            ) : (
              <>
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Salin Alamat Kirim</span>
              </>
            )}
          </button>
        </motion.div>

        {/* Gift Confirmation Note */}
        <div className="p-6 rounded-2xl bg-stone-900/50 border border-amber-500/20 max-w-lg mx-auto text-center">
          <h4 className="font-serif text-lg text-amber-200 font-semibold mb-2">
            Konfirmasi Hadiah
          </h4>
          <p className="text-xs text-stone-400 mb-4">
            Jika telah mengirimkan hadiah, Anda dapat memberikan konfirmasi agar kami dapat menyampaikan ucapan terima kasih:
          </p>

          <form onSubmit={handleConfirmGift} className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="Nama Anda"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-xs focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Konfirmasi</span>
            </button>
          </form>

          {giftConfirmed && (
            <div className="mt-3 text-xs text-emerald-400 flex items-center justify-center gap-1">
              <Check className="w-4 h-4" />
              <span>Konfirmasi diterima! Terima kasih atas kebaikan Anda.</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
