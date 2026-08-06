import React from 'react';
import { motion } from 'motion/react';
import { Home, Heart, Calendar, BookOpen, Image, Gift, MessageSquare } from 'lucide-react';

export const Navbar: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'hero', label: 'Utama', icon: Home },
    { id: 'couple', label: 'Mempelai', icon: Heart },
    { id: 'event', label: 'Acara', icon: Calendar },
    { id: 'story', label: 'Kisah', icon: BookOpen },
    { id: 'gallery', label: 'Galeri', icon: Image },
    { id: 'gift', label: 'Hadiah', icon: Gift },
    { id: 'rsvp', label: 'RSVP', icon: MessageSquare },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-lg w-[92%]">
      <motion.nav
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="px-3 py-2.5 rounded-full bg-stone-900/90 border border-amber-500/30 backdrop-blur-xl shadow-2xl flex items-center justify-around text-stone-300"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="flex flex-col items-center justify-center p-1.5 rounded-xl text-stone-400 hover:text-amber-300 transition-colors cursor-pointer group"
              title={item.label}
            >
              <Icon className="w-4 h-4 text-stone-400 group-hover:text-amber-400 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] uppercase tracking-wider font-medium mt-0.5 group-hover:text-amber-200">
                {item.label}
              </span>
            </button>
          );
        })}
      </motion.nav>
    </div>
  );
};
