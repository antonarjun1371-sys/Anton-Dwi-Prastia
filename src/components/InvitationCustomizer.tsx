import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, X, Upload, Check, Type, Image as ImageIcon, User, Calendar, MapPin, Save, Sparkles, RefreshCw } from 'lucide-react';
import { WeddingData } from '../types';

interface InvitationCustomizerProps {
  weddingData: WeddingData;
  onUpdateWeddingData: (newData: WeddingData) => void;
}

export const InvitationCustomizer: React.FC<InvitationCustomizerProps> = ({
  weddingData,
  onUpdateWeddingData,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'photos' | 'fonts' | 'couple' | 'event'>('photos');
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Local state for editing
  const [scriptFont, setScriptFont] = useState(weddingData.themeSettings?.scriptFont || 'Great Vibes');
  const [serifFont, setSerifFont] = useState(weddingData.themeSettings?.serifFont || 'Cormorant Garamond');

  // Groom & Bride
  const [groomName, setGroomName] = useState(weddingData.groom.name);
  const [groomFullName, setGroomFullName] = useState(weddingData.groom.fullName);
  const [groomFather, setGroomFather] = useState(weddingData.groom.fatherName);
  const [groomMother, setGroomMother] = useState(weddingData.groom.motherName);
  const [groomPhoto, setGroomPhoto] = useState(weddingData.groom.photoUrl);

  const [brideName, setBrideName] = useState(weddingData.bride.name);
  const [brideFullName, setBrideFullName] = useState(weddingData.bride.fullName);
  const [brideFather, setBrideFather] = useState(weddingData.bride.fatherName);
  const [brideMother, setBrideMother] = useState(weddingData.bride.motherName);
  const [bridePhoto, setBridePhoto] = useState(weddingData.bride.photoUrl);

  const [heroPhoto, setHeroPhoto] = useState(weddingData.themeSettings?.heroPhotoUrl || weddingData.stories[3]?.image || '/src/assets/images/wedding_hero_red_background_1786025860596.jpg');

  // Handle local file upload converting to Data URL
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'hero' | 'groom' | 'bride') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      if (target === 'hero') setHeroPhoto(result);
      if (target === 'groom') setGroomPhoto(result);
      if (target === 'bride') setBridePhoto(result);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setSaving(true);
    const updatedData: WeddingData = {
      ...weddingData,
      groom: {
        ...weddingData.groom,
        name: groomName,
        fullName: groomFullName,
        fatherName: groomFather,
        motherName: groomMother,
        photoUrl: groomPhoto,
      },
      bride: {
        ...weddingData.bride,
        name: brideName,
        fullName: brideFullName,
        fatherName: brideFather,
        motherName: brideMother,
        photoUrl: bridePhoto,
      },
      themeSettings: {
        scriptFont,
        serifFont,
        heroPhotoUrl: heroPhoto,
      },
    };

    // Apply font family changes directly to body style
    const styleId = 'custom-wedding-fonts';
    let styleEl = document.getElementById(styleId);
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }
    styleEl.innerHTML = `
      .font-script { font-family: '${scriptFont}', cursive !important; }
      .font-serif { font-family: '${serifFont}', Georgia, serif !important; }
    `;

    try {
      const res = await fetch('/api/wedding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      const data = await res.json();
      if (data.success) {
        onUpdateWeddingData(updatedData);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (err) {
      console.error(err);
      onUpdateWeddingData(updatedData);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {/* Floating Settings Button */}
      <div className="fixed top-20 right-4 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="p-3.5 rounded-full bg-stone-900/90 text-amber-400 border border-amber-500/40 shadow-2xl backdrop-blur-md flex items-center gap-2 cursor-pointer hover:bg-stone-800 transition-all text-xs font-semibold uppercase tracking-wider"
          title="Pengaturan Foto & Font Manual"
        >
          <Settings className="w-5 h-5 text-amber-400 animate-spin-slow" />
          <span className="hidden sm:inline">Edit Foto &amp; Font</span>
        </motion.button>
      </div>

      {/* Customizer Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          >
            <div className="max-w-2xl w-full my-8 p-6 sm:p-8 rounded-2xl bg-stone-900 border border-amber-500/40 shadow-2xl relative text-stone-100 max-h-[90vh] flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-amber-500/20">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-amber-400" />
                  <div>
                    <h3 className="font-serif text-xl font-bold text-amber-100">
                      Panel Edit Undangan Manual
                    </h3>
                    <p className="text-xs text-stone-400">
                      Ubah foto, font tulisan, dan informasi pernikahan Anda secara langsung
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Tabs */}
              <div className="flex gap-2 my-4 border-b border-stone-800 pb-2 overflow-x-auto shrink-0">
                <button
                  onClick={() => setActiveTab('photos')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all ${
                    activeTab === 'photos'
                      ? 'bg-amber-500 text-stone-950 shadow-md'
                      : 'bg-stone-950 text-stone-400 border border-stone-800 hover:text-stone-200'
                  }`}
                >
                  <ImageIcon className="w-4 h-4" />
                  <span>Foto &amp; Gambar</span>
                </button>

                <button
                  onClick={() => setActiveTab('fonts')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all ${
                    activeTab === 'fonts'
                      ? 'bg-amber-500 text-stone-950 shadow-md'
                      : 'bg-stone-950 text-stone-400 border border-stone-800 hover:text-stone-200'
                  }`}
                >
                  <Type className="w-4 h-4" />
                  <span>Font &amp; Gaya Teks</span>
                </button>

                <button
                  onClick={() => setActiveTab('couple')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all ${
                    activeTab === 'couple'
                      ? 'bg-amber-500 text-stone-950 shadow-md'
                      : 'bg-stone-950 text-stone-400 border border-stone-800 hover:text-stone-200'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>Data Mempelai</span>
                </button>
              </div>

              {/* Tab Content */}
              <div className="flex-1 overflow-y-auto pr-2 space-y-6 py-2">
                {/* 1. PHOTOS TAB */}
                {activeTab === 'photos' && (
                  <div className="space-y-6">
                    {/* Hero Photo */}
                    <div className="p-4 rounded-xl bg-stone-950 border border-stone-800">
                      <label className="block text-xs uppercase tracking-wider text-amber-300 font-bold mb-2">
                        Foto Utama (Background Merah / Cover)
                      </label>
                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        <img
                          src={heroPhoto}
                          alt="Hero Preview"
                          className="w-24 h-32 object-cover rounded-lg border border-amber-500/30"
                        />
                        <div className="flex-1 w-full space-y-2">
                          <input
                            type="text"
                            placeholder="URL foto utama..."
                            value={heroPhoto}
                            onChange={(e) => setHeroPhoto(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-stone-700 text-stone-200 text-xs"
                          />
                          <div className="flex items-center gap-2">
                            <label className="px-3 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-semibold cursor-pointer flex items-center gap-1.5 border border-amber-500/20">
                              <Upload className="w-3.5 h-3.5" />
                              <span>Upload File Gambar</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileUpload(e, 'hero')}
                                className="hidden"
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Groom Photo */}
                    <div className="p-4 rounded-xl bg-stone-950 border border-stone-800">
                      <label className="block text-xs uppercase tracking-wider text-amber-300 font-bold mb-2">
                        Foto Pengantin Pria (Anton)
                      </label>
                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        <img
                          src={groomPhoto}
                          alt="Groom Preview"
                          className="w-24 h-24 object-cover rounded-full border border-amber-500/30"
                        />
                        <div className="flex-1 w-full space-y-2">
                          <input
                            type="text"
                            placeholder="URL foto pengantin pria..."
                            value={groomPhoto}
                            onChange={(e) => setGroomPhoto(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-stone-700 text-stone-200 text-xs"
                          />
                          <label className="inline-flex px-3 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-semibold cursor-pointer items-center gap-1.5 border border-amber-500/20">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload Foto Anton</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFileUpload(e, 'groom')}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Bride Photo */}
                    <div className="p-4 rounded-xl bg-stone-950 border border-stone-800">
                      <label className="block text-xs uppercase tracking-wider text-amber-300 font-bold mb-2">
                        Foto Pengantin Wanita (Sri)
                      </label>
                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        <img
                          src={bridePhoto}
                          alt="Bride Preview"
                          className="w-24 h-24 object-cover rounded-full border border-amber-500/30"
                        />
                        <div className="flex-1 w-full space-y-2">
                          <input
                            type="text"
                            placeholder="URL foto pengantin wanita..."
                            value={bridePhoto}
                            onChange={(e) => setBridePhoto(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-stone-700 text-stone-200 text-xs"
                          />
                          <label className="inline-flex px-3 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-semibold cursor-pointer items-center gap-1.5 border border-amber-500/20">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload Foto Sri</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFileUpload(e, 'bride')}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. FONTS TAB */}
                {activeTab === 'fonts' && (
                  <div className="space-y-6">
                    {/* Script Font Selection */}
                    <div className="p-4 rounded-xl bg-stone-950 border border-stone-800">
                      <label className="block text-xs uppercase tracking-wider text-amber-300 font-bold mb-2">
                        Pilih Font Kaligrafi / Nama Pasangan (.font-script)
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          { name: 'Great Vibes', sample: 'Anton & Sri' },
                          { name: 'Alex Brush', sample: 'Anton & Sri' },
                          { name: 'Dancing Script', sample: 'Anton & Sri' },
                          { name: 'Sacramento', sample: 'Anton & Sri' },
                        ].map((f) => (
                          <button
                            key={f.name}
                            onClick={() => setScriptFont(f.name)}
                            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                              scriptFont === f.name
                                ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                                : 'bg-stone-900 border-stone-800 text-stone-300'
                            }`}
                          >
                            <span className="block text-xs text-stone-400 mb-1">{f.name}</span>
                            <span
                              style={{ fontFamily: `'${f.name}', cursive` }}
                              className="text-2xl text-amber-300 block"
                            >
                              {f.sample}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Serif Heading Font Selection */}
                    <div className="p-4 rounded-xl bg-stone-950 border border-stone-800">
                      <label className="block text-xs uppercase tracking-wider text-amber-300 font-bold mb-2">
                        Pilih Font Judul &amp; Heading (.font-serif)
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          { name: 'Cormorant Garamond', sample: 'Undangan Pernikahan' },
                          { name: 'Playfair Display', sample: 'Undangan Pernikahan' },
                          { name: 'Cinzel', sample: 'Undangan Pernikahan' },
                        ].map((f) => (
                          <button
                            key={f.name}
                            onClick={() => setSerifFont(f.name)}
                            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                              serifFont === f.name
                                ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                                : 'bg-stone-900 border-stone-800 text-stone-300'
                            }`}
                          >
                            <span className="block text-xs text-stone-400 mb-1">{f.name}</span>
                            <span
                              style={{ fontFamily: `'${f.name}', serif` }}
                              className="text-lg font-bold text-stone-100 block"
                            >
                              {f.sample}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. COUPLE TAB */}
                {activeTab === 'couple' && (
                  <div className="space-y-4">
                    {/* Groom Details */}
                    <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-3">
                      <h4 className="text-xs uppercase tracking-wider text-amber-400 font-bold">
                        Mempelai Pria
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] text-stone-400 mb-1">Nama Panggilan</label>
                          <input
                            type="text"
                            value={groomName}
                            onChange={(e) => setGroomName(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-stone-700 text-xs text-stone-100"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-stone-400 mb-1">Nama Lengkap</label>
                          <input
                            type="text"
                            value={groomFullName}
                            onChange={(e) => setGroomFullName(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-stone-700 text-xs text-stone-100"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-stone-400 mb-1">Nama Ayah</label>
                          <input
                            type="text"
                            value={groomFather}
                            onChange={(e) => setGroomFather(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-stone-700 text-xs text-stone-100"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-stone-400 mb-1">Nama Ibu</label>
                          <input
                            type="text"
                            value={groomMother}
                            onChange={(e) => setGroomMother(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-stone-700 text-xs text-stone-100"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Bride Details */}
                    <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-3">
                      <h4 className="text-xs uppercase tracking-wider text-amber-400 font-bold">
                        Mempelai Wanita
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] text-stone-400 mb-1">Nama Panggilan</label>
                          <input
                            type="text"
                            value={brideName}
                            onChange={(e) => setBrideName(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-stone-700 text-xs text-stone-100"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-stone-400 mb-1">Nama Lengkap</label>
                          <input
                            type="text"
                            value={brideFullName}
                            onChange={(e) => setBrideFullName(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-stone-700 text-xs text-stone-100"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-stone-400 mb-1">Nama Ayah</label>
                          <input
                            type="text"
                            value={brideFather}
                            onChange={(e) => setBrideFather(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-stone-700 text-xs text-stone-100"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-stone-400 mb-1">Nama Ibu</label>
                          <input
                            type="text"
                            value={brideMother}
                            onChange={(e) => setBrideMother(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-stone-700 text-xs text-stone-100"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Save Actions */}
              <div className="pt-4 border-t border-amber-500/20 flex items-center justify-between shrink-0">
                {saveSuccess ? (
                  <div className="text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Perubahan Berhasil Disimpan!</span>
                  </div>
                ) : (
                  <div className="text-stone-400 text-[11px]">
                    Atau beri tahu AI di chat jika ingin dipasangkan foto/font spesifik.
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 rounded-xl bg-stone-800 text-stone-300 text-xs font-semibold cursor-pointer"
                  >
                    Tutup
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg cursor-pointer transition-all disabled:opacity-50"
                  >
                    {saving ? (
                      <RefreshCw className="w-4 h-4 animate-spin text-stone-950" />
                    ) : (
                      <Save className="w-4 h-4 text-stone-950" />
                    )}
                    <span>Simpan Perubahan</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
