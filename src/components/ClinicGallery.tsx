import React, { useState } from 'react';
import { X, Maximize2, ShieldCheck, Sparkles } from 'lucide-react';
import { DentalSphere } from './DentalSphere';
import { Language, ClinicImage } from '../types';
import { UI_TRANSLATIONS } from '../i18n/translations';
import { CLINIC_GALLERY, CLINIC_CONTACT } from '../data/clinicData';

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
    { id: 'Bioseguridad', label: t.technologyTag },
    { id: 'Espacio', label: t.atmosphereTag },
  ];

  const filteredImages =
    selectedCategory === 'all'
      ? CLINIC_GALLERY
      : CLINIC_GALLERY.filter((img) => img.category.es === selectedCategory);

  return (
    <section
      id="instalaciones"
      className={`${showHeader ? 'py-16 md:py-24' : 'py-12 md:py-16'} bg-[#080C0A] border-b border-[#1D2D22] transition-colors duration-200`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showHeader ? (
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div className="flex-1 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#83C408] uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#83C408]" />
                <span>Poblenou · Barcelona</span>
              </div>
              <h2
                className="text-2xl sm:text-3xl lg:text-4xl text-[#F5FAF3]"
                style={{ textWrap: 'balance' }}
              >
                {t.galleryHeading}
              </h2>
              <p className="mt-3 text-sm text-[#B9CEBE]">
                {t.gallerySubtitle}
              </p>
            </div>

            <div className="flex items-center gap-4 self-start md:self-center">
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#101914] rounded-xl border border-[#1F3125]">
                {categories.map((cat) => (
                  <button
                    type="button"
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`inline-flex items-center min-h-[44px] px-3.5 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-[#83C408] text-[#071408] shadow-xs font-extrabold'
                        : 'text-[#83C408] hover:bg-[#16231B]'
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
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#101914] rounded-xl border border-[#1F3125]">
              {categories.map((cat) => (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center min-h-[44px] px-3.5 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-[#83C408] text-[#071408] shadow-xs font-extrabold'
                      : 'text-[#83C408] hover:bg-[#16231B]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredImages.map((img) => (
            <div
              key={img.id}
              onClick={() => setActiveImage(img)}
              className="group relative rounded-xl overflow-hidden border border-[#1F3125] hover:border-[#83C408] bg-[#101914] aspect-[4/3] cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
            >
              <img
                src={img.src}
                alt={img.title[lang]}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="eager"
                decoding="async"
                referrerPolicy="no-referrer"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                <span className="text-[10px] uppercase tracking-wider text-[#83C408] font-bold">
                  {img.category[lang]}
                </span>
                <h3 className="text-sm font-normal tracking-tight leading-snug mt-0.5 group-hover:text-[#83C408] transition-colors">
                  {img.title[lang]}
                </h3>
              </div>

              <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/75 border border-[#83C408]/40 text-[#83C408] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>

        {/* Facility Info Strip (verified address & experience) */}
        <div className="mt-12 p-6 rounded-2xl bg-[#101914] border border-[#1F3125] flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#B9CEBE]">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#83C408] shrink-0" />
            <div>
              <span className="font-bold block text-[#F5FAF3]">
                Clínica Dental SET · Más de 25 años de experiencia en Poblenou
              </span>
              <span className="text-xs text-[#9AB39E]">
                [Detalles adicionales sobre equipamiento y protocolos sanitarios confirmados por la clínica]
              </span>
            </div>
          </div>

          <div className="text-[#B9CEBE] text-xs font-medium text-center sm:text-right">
            <span>{CLINIC_CONTACT.address}, {CLINIC_CONTACT.city}</span>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-[#101914] rounded-2xl overflow-hidden shadow-2xl border border-[#83C408]/60"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] w-full bg-black">
              <img
                src={activeImage.src}
                alt={activeImage.title[lang]}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setActiveImage(null)}
                className="absolute top-4 right-4 w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-[#83C408] hover:bg-[#95DB0B] text-[#071408] flex items-center justify-center transition-colors cursor-pointer"
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
              <h3 className="text-xl text-[#F5FAF3] mt-1">
                {activeImage.title[lang]}
              </h3>
              <p className="text-xs sm:text-sm text-[#B9CEBE] mt-2 leading-relaxed">
                {activeImage.description[lang]}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
