import React, { useState, useEffect } from 'react';
import { initialWeddingData } from './data/weddingData';
import { WeddingData } from './types';
import { CoverModal } from './components/CoverModal';
import { HeroSection } from './components/HeroSection';
import { CoupleSection } from './components/CoupleSection';
import { EventSection } from './components/EventSection';
import { LoveStorySection } from './components/LoveStorySection';
import { GallerySection } from './components/GallerySection';
import { DresscodeSection } from './components/DresscodeSection';
import { GiftSection } from './components/GiftSection';
import { WishSection } from './components/WishSection';
import { AudioPlayer } from './components/AudioPlayer';
import { Navbar } from './components/Navbar';
import { GuestLinkGenerator } from './components/GuestLinkGenerator';
import { Heart } from 'lucide-react';

export default function App() {
  const [weddingData, setWeddingData] = useState<WeddingData>(initialWeddingData);
  const [isCoverOpen, setIsCoverOpen] = useState(true);
  const [autoPlayMusic, setAutoPlayMusic] = useState(false);
  const [guestName, setGuestName] = useState('Tamu Kehormatan');

  useEffect(() => {
    // Parse ?to= URL query param for recipient guest name
    const params = new URLSearchParams(window.location.search);
    const toParam = params.get('to');
    if (toParam) {
      setGuestName(decodeURIComponent(toParam));
    }

    // Fetch latest wedding data from server API
    fetch('/api/wedding')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setWeddingData(data.data);
        }
      })
      .catch((err) => console.log('Using default local wedding data:', err));
  }, []);

  const handleOpenInvitation = () => {
    setIsCoverOpen(false);
    setAutoPlayMusic(true);
  };

  const handleScrollToRsvp = () => {
    const el = document.getElementById('rsvp');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans relative overflow-x-hidden">
      {/* Cover Modal */}
      <CoverModal
        isOpen={isCoverOpen}
        guestName={guestName}
        weddingData={weddingData}
        onOpenInvitation={handleOpenInvitation}
      />

      {/* Main Invitation Layout */}
      {!isCoverOpen && (
        <main className="relative z-10 pb-20">
          {/* Floating Audio Player */}
          <AudioPlayer
            tracks={weddingData.audioTracks}
            autoPlayTriggered={autoPlayMusic}
          />

          {/* Hero Section */}
          <HeroSection
            weddingData={weddingData}
            onScrollToRsvp={handleScrollToRsvp}
          />

          {/* Couple Section */}
          <CoupleSection
            groom={weddingData.groom}
            bride={weddingData.bride}
          />

          {/* Event Section */}
          <EventSection
            akad={weddingData.akad}
            resepsi={weddingData.resepsi}
          />

          {/* Love Story Section */}
          <LoveStorySection
            stories={weddingData.stories}
            groomName={weddingData.groom.name}
            brideName={weddingData.bride.name}
          />

          {/* Gallery Section */}
          <GallerySection
            gallery={weddingData.gallery}
          />

          {/* Dresscode Section */}
          <DresscodeSection
            dressCode={weddingData.dressCode}
          />

          {/* Gift Section */}
          <GiftSection
            bankAccounts={weddingData.bankAccounts}
            physicalAddress={weddingData.physicalAddress}
          />

          {/* Wish & RSVP Section */}
          <WishSection
            groomName={weddingData.groom.name}
            brideName={weddingData.bride.name}
          />

          {/* Bottom Floating Navigation Dock */}
          <Navbar />

          {/* Couple / Admin Guest Link Creator */}
          <GuestLinkGenerator
            weddingData={weddingData}
          />

          {/* Luxury Footer */}
          <footer className="py-12 px-4 text-center bg-stone-950 border-t border-amber-500/20 text-stone-400 text-xs">
            <div className="max-w-md mx-auto space-y-3">
              <div className="font-script text-3xl text-amber-200">
                {weddingData.groom.name} &amp; {weddingData.bride.name}
              </div>
              <p className="text-stone-400 font-serif italic">
                Terima kasih atas doa restu dan kehadiran Bapak/Ibu/Saudara/i sekalian.
              </p>
              <div className="flex items-center justify-center gap-1 text-[11px] text-amber-400/80 pt-4">
                <span>Dibuat dengan</span>
                <Heart className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>Undangan Digital Pernikahan Premium</span>
              </div>
            </div>
          </footer>
        </main>
      )}
    </div>
  );
}
