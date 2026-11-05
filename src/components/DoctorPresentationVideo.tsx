import React, { useRef, useState } from 'react';
import { Play, CheckCircle2, MessageCircle, Phone, MapPin, Video } from 'lucide-react';
import { Language } from '../types';
import { CLINIC_CONTACT } from '../data/clinicData';
import { trackCrmLead } from '../utils/crmTracker';

export const CLINIC_PRESENTATION_VIDEO_SRC =
  '/assets/aistudio/grok-video-e1e617ff-5ea9-4be6-9254-fcd60ca32667_06854a3a.mp4';

interface DoctorPresentationVideoProps {
  lang: Language;
  sourcePage?: string;
}

export const DoctorPresentationVideo: React.FC<DoctorPresentationVideoProps> = ({
  lang,
  sourcePage = 'Página de Inicio (Vídeo Presentación Doctora)',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = false;
    vid.play().catch(() => {
      // Fallback if browser requires user interaction with native controls
    });
  };

  const copy = {
    es: {
      eyebrow: 'Presentación en Vídeo · Clínica Dental SET',
      heading: 'Conoce nuestra clínica de la mano de la Dra. Izbette Luis Torres',
      quote:
        '«Hola, soy Izbette Luis Torres, doctora y directora de la Clínica Dental SET, en el barrio de Poblenou en Barcelona. Encantada de conocerte.»',
      description:
        'Asómate a nuestra entrada en Carrer del Doctor Trueta 213 y pasa directamente a nuestros gabinetes clínicos. Te ofrecemos una odontología honesta, cercana y sin franquicias, atendida siempre por tu doctora de referencia.',
      points: [
        'Atención directa y continuada con la Dra. Izbette Luis Torres y la Dra. Ruby Herrera',
        'Diagnóstico digital 3D y planificación conservadora en cada especialidad',
        'Trato cercano de clínica familiar en el corazón de Poblenou, Barcelona',
      ],
      playLabel: 'Reproducir presentación con sonido',
      doctorCaption: 'Dra. Izbette Luis Torres · Directora Clínica · Poblenou',
    },
    ca: {
      eyebrow: 'Presentació en Vídeo · Clínica Dental SET',
      heading: 'Coneix la nostra clínica de la mà de la Dra. Izbette Luis Torres',
      quote:
        '«Hola, sóc Izbette Luis Torres, doctora i directora de la Clínica Dental SET, al barri del Poblenou a Barcelona. Encantada de conèixer-te.»',
      description:
        'Descobreix la nostra entrada al Carrer del Doctor Trueta 213 i passa directament als nostres gabinets clínics. T’oferim una odontologia honesta, propera i sense franquícies, atesa sempre per la teva doctora de referència.',
      points: [
        'Atenció directa i continuada amb la Dra. Izbette Luis Torres i la Dra. Ruby Herrera',
        'Diagnòstic digital 3D i planificació conservadora en cada especialitat',
        'Tracte proper de clínica familiar al cor del Poblenou, Barcelona',
      ],
      playLabel: 'Reproduir presentació amb so',
      doctorCaption: 'Dra. Izbette Luis Torres · Directora Clínica · Poblenou',
    },
    en: {
      eyebrow: 'Video Introduction · Clínica Dental SET',
      heading: 'Tour our Poblenou practice with Dr. Izbette Luis Torres',
      quote:
        '“Hello, I am Izbette Luis Torres, doctor and clinical director of Clínica Dental SET in the Poblenou neighborhood of Barcelona. Pleased to meet you.”',
      description:
        'Step through our entrance on Carrer del Doctor Trueta 213 and into our clinical treatment rooms. We deliver transparent, patient-first dentistry with zero corporate rotation.',
      points: [
        'Continuity of care directly with Dr. Izbette Luis Torres and Dr. Ruby Herrera',
        '3D digital diagnostics and conservative treatment planning',
        'Warm neighborhood care in the heart of Poblenou, Barcelona',
      ],
      playLabel: 'Play introduction with audio',
      doctorCaption: 'Dr. Izbette Luis Torres · Clinical Director · Poblenou',
    },
  }[lang];

  return (
    <section
      aria-labelledby="doctor-video-heading"
      className="py-16 md:py-24 bg-[#FAF7F2] dark:bg-[#0a160f] border-b border-stone-200/80 dark:border-emerald-950/70 transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column (5 cols): Vertical 9:16 Video Showcase Frame (never cropped) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-[300px] sm:max-w-[325px] aspect-[9/16] rounded-3xl overflow-hidden bg-[#06100a] border border-stone-200 dark:border-emerald-900/70 shadow-xl">
              <video
                ref={videoRef}
                src={CLINIC_PRESENTATION_VIDEO_SRC}
                controls
                playsInline
                preload="auto"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                className="w-full h-full object-cover"
                aria-label={copy.heading}
              >
                <source src={CLINIC_PRESENTATION_VIDEO_SRC} type="video/mp4" />
              </video>

              {/* Clean Play Overlay Trigger when paused/initial so visitors can start with audio in 1 click */}
              {!isPlaying && (
                <button
                  type="button"
                  onClick={handlePlayClick}
                  aria-label={copy.playLabel}
                  className="group absolute inset-x-0 top-0 bottom-12 flex flex-col items-center justify-center bg-gradient-to-t from-black/75 via-black/25 to-black/15 hover:bg-black/35 transition-colors cursor-pointer p-6 text-center"
                >
                  <span className="w-16 h-16 rounded-full bg-[#83C408] text-[#07180c] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-150">
                    <Play className="w-7 h-7 fill-current ml-0.5" />
                  </span>
                  <span className="mt-4 text-xs font-extrabold text-white tracking-wide drop-shadow-sm">
                    {copy.playLabel}
                  </span>
                </button>
              )}
            </div>

            <p className="mt-3 text-xs text-stone-500 dark:text-stone-400 text-center">
              {copy.doctorCaption}
            </p>
          </div>

          {/* Right Column (7 cols): Personal Message, Highlights & Direct Conversion CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-[#83C408] uppercase tracking-wider mb-2">
                <Video className="w-3.5 h-3.5 text-[#83C408] shrink-0" />
                <span>{copy.eyebrow}</span>
              </div>

              <h2
                id="doctor-video-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white leading-[1.15]"
                style={{ textWrap: 'balance' }}
              >
                {copy.heading}
              </h2>
            </div>

            <blockquote className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0d1a11] border border-stone-200/80 dark:border-emerald-950 shadow-xs text-sm sm:text-base font-medium text-stone-800 dark:text-stone-100 leading-relaxed italic">
              {copy.quote}
            </blockquote>

            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed max-w-2xl">
              {copy.description}
            </p>

            {/* Key Clinical Assurances */}
            <ul className="space-y-2.5 pt-1">
              {copy.points.map((point, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700 dark:text-stone-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#83C408] shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            {/* Direct Contact Actions */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <a
                href={`https://wa.me/${CLINIC_CONTACT.whatsappClean}?text=Hola%20Dra.%20Izbette,%20he%20visto%20el%20v%C3%ADdeo%20de%20la%20cl%C3%ADnica%20y%20me%20gustar%C3%ADa%20pedir%20cita%20en%20Poblenou.`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackCrmLead({
                    type: 'whatsapp',
                    treatment: 'Consulta General (Vídeo Presentación Doctora)',
                    sourcePage,
                  });
                }}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-xs sm:text-sm font-bold text-white bg-[#23A455] hover:bg-[#1e8d49] rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>

              <a
                href={`tel:${CLINIC_CONTACT.phoneClean}`}
                onClick={() => {
                  trackCrmLead({
                    type: 'call',
                    treatment: 'Consulta General (Vídeo Presentación Doctora)',
                    sourcePage,
                  });
                }}
                className="inline-flex items-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-bold text-stone-800 dark:text-stone-200 bg-white dark:bg-[#0d1a11] hover:bg-stone-100 dark:hover:bg-emerald-950/70 border border-stone-200 dark:border-emerald-900/60 rounded-xl shadow-xs tabular-nums transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4 text-[#83C408]" />
                <span>Llamar {CLINIC_CONTACT.phone}</span>
              </a>

              <div className="inline-flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 pl-1">
                <MapPin className="w-3.5 h-3.5 text-[#83C408] shrink-0" />
                <span>{CLINIC_CONTACT.address}, Poblenou</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
