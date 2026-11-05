import React, { useState } from 'react';
import { X, Maximize2, ShieldCheck, Sparkles } from 'lucide-react';
import { DentalSphere } from './DentalSphere';
import { Language, ClinicImage } from '../types';
import { UI_TRANSLATIONS } from '../i18n/translations';
import { CLINIC_GALLERY } from '../data/clinicData';

interface ClinicGalleryProps {
  lang: Language;
  showHeader?: boolean;
  showSphere?: boolean;
}

export const ClinicGallery: React.FC<ClinicGalleryProps> = ({
  lang,
  showHeader = true,
  showSphere = false,
}) => {
  const t = UI_TRANSLATIONS[lang];
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeImage, setActiveImage] = useState<ClinicImage | null>(null);

  const categories = [
    { id: 'all', label: t.allFacilities },
    { id: 'Instalaciones', label: t.facilitiesTag },
    { id: 'Tecnología', label: t.technologyTag },
    { id: 'Espacio', label: t.atmosphereTag },
  ];

  const filteredImages = selectedCategory === 'all'
    ? CLINIC_GALLERY
    : CLINIC_GALLERY.filter((img) => img.category.es === selectedCategory);

  return (
    <section
      id="instalaciones"
      className={`${showHeader ? 'py-16 md:py-24' : 'py-12 md:py-16'} bg-white dark:bg-[#08120c] transition-colors duration-200`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showHeader ? (
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div className="flex-1 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-[#83C408] uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#83C408]" />
                <span>Instalaciones en Poblenou</span>
              </div>
              <h2
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white"
                style={{ textWrap: 'balance' }}
              >
                {t.galleryHeading}
              </h2>
              <p className="mt-3 text-sm text-stone-600 dark:text-stone-400">
                {t.gallerySubtitle}
              </p>
            </div>

            <div className="flex items-center gap-4 self-start md:self-center">
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100 dark:bg-[#0d1a11] rounded-xl border border-stone-200 dark:border-emerald-950">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-white dark:bg-[#15291b] text-emerald-800 dark:text-[#83C408] shadow-xs'
                        : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {showSphere && (
                <div className="shrink-0">
                  <DentalSphere mode="page" />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100 dark:bg-[#0d1a11] rounded-xl border border-stone-200 dark:border-emerald-950">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-white dark:bg-[#15291b] text-emerald-800 dark:text-[#83C408] shadow-xs'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Subtle Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredImages.map((img) => (
            <div
              key={img.id}
              onClick={() => setActiveImage(img)}
              className="group relative rounded-xl overflow-hidden border border-stone-200/90 dark:border-emerald-950/80 bg-stone-100 dark:bg-stone-900 aspect-[4/3] cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              <img
                src={img.src}
                alt={img.title[lang]}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                referrerPolicy="no-referrer"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent opacity-90 transition-opacity" />

              {/* Content info */}
              <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                <span className="text-[10px] uppercase tracking-wider text-[#83C408] font-bold">
                  {img.category[lang]}
                </span>
                <h3 className="text-xs sm:text-sm font-semibold tracking-tight leading-snug mt-0.5 group-hover:text-[#83C408] transition-colors">
                  {img.title[lang]}
                </h3>
              </div>

              {/* Expand icon on hover */}
              <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>

        {/* Facility Trust Points */}
        <div className="mt-12 p-6 rounded-2xl bg-stone-50 dark:bg-[#0d1a11] border border-stone-200/70 dark:border-emerald-950 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-stone-600 dark:text-stone-300">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#83C408] shrink-0" />
            <div>
              <span className="font-bold block text-stone-900 dark:text-white">
                Protocolo Hospitalario de Bioseguridad Clase B
              </span>
              <span className="text-[11px] text-stone-500">
                Esterilización individualizada y trazabilidad para cada paciente
              </span>
            </div>
          </div>

          <div className="text-stone-500 text-[11px] text-center sm:text-right">
            <span>Ubicación céntrica · Carrer del Doctor Trueta 213, Bajos</span>
          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-white dark:bg-[#0d1a11] rounded-2xl overflow-hidden shadow-2xl border border-stone-200 dark:border-emerald-950 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] w-full bg-black">
              <img
                src={activeImage.src}
                alt={activeImage.title[lang]}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setActiveImage(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Cerrar vista ampliada"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2 text-xs font-bold text-[#83C408] uppercase tracking-wide">
                <span>{activeImage.category[lang]}</span>
                <span>·</span>
                <span>Clínica Dental SET Poblenou</span>
              </div>
              <h3 className="text-lg font-bold text-stone-900 dark:text-white mt-1">
                {activeImage.title[lang]}
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-2 leading-relaxed">
                {activeImage.description[lang]}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
