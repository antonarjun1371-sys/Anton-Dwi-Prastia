import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image, Play, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { GalleryItem } from '../types';

interface GallerySectionProps {
  gallery: GalleryItem[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ gallery }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);

  const handlePrev = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + gallery.length) % gallery.length);
    }
  };

  const handleNext = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % gallery.length);
    }
  };

  return (
    <section id="gallery" className="py-20 px-4 relative bg-stone-900 border-t border-amber-500/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-amber-400 font-medium">
            Memori Indah
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-stone-100 font-bold my-2">
            Galeri Prewedding
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mt-4" />
        </div>

        {/* Video Trailer Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative w-full h-64 sm:h-96 rounded-2xl overflow-hidden mb-12 border border-amber-500/30 shadow-2xl group cursor-pointer"
          onClick={() => setShowVideoModal(true)}
        >
          <img
            src={gallery[0]?.url}
            alt="Prewedding Trailer Background"
            className="w-full h-full object-cover filter brightness-60 group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-stone-950/40 group-hover:bg-stone-950/20 transition-colors flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-500/90 hover:bg-amber-400 text-stone-950 flex items-center justify-center shadow-2xl shadow-amber-500/50 group-hover:scale-110 transition-transform mb-4">
              <Play className="w-8 h-8 fill-stone-950 ml-1" />
            </div>
            <span className="text-xs uppercase tracking-widest text-amber-300 font-bold">
              Putar Cinema Prewedding Trailer
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-stone-100 font-bold mt-1">
              "An Eternal Promise of Love"
            </h3>
          </div>
        </motion.div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative h-72 sm:h-80 rounded-2xl overflow-hidden border border-amber-500/20 group cursor-pointer shadow-lg"
              onClick={() => setSelectedImageIndex(index)}
            >
              <img
                src={item.url}
                alt={item.caption || `Galeri Foto ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div className="w-full flex items-center justify-between">
                  <span className="text-sm font-serif text-amber-200 font-medium">
                    {item.caption || 'Prewedding Portrait'}
                  </span>
                  <div className="p-2 rounded-full bg-amber-500/80 text-stone-950">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <button
              onClick={() => setSelectedImageIndex(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-200 cursor-pointer z-50"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={handlePrev}
              className="absolute left-4 p-3 rounded-full bg-stone-800/80 hover:bg-stone-700 text-amber-300 cursor-pointer z-50"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="max-w-4xl max-h-[85vh] p-2">
              <img
                src={gallery[selectedImageIndex].url}
                alt={gallery[selectedImageIndex].caption || 'Foto Galeri'}
                className="max-w-full max-h-[80vh] object-contain rounded-xl border border-amber-500/30 mx-auto shadow-2xl"
                referrerPolicy="no-referrer"
              />
              {gallery[selectedImageIndex].caption && (
                <p className="text-center font-serif text-amber-200 text-lg mt-4">
                  {gallery[selectedImageIndex].caption}
                </p>
              )}
            </div>

            <button
              onClick={handleNext}
              className="absolute right-4 p-3 rounded-full bg-stone-800/80 hover:bg-stone-700 text-amber-300 cursor-pointer z-50"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute top-6 right-6 p-3 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-200 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="w-full max-w-4xl aspect-video rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl bg-black">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Cinema Prewedding Trailer"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
