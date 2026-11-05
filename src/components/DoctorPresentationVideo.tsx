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
      // Fallback to native controls
    });
  };

  const copy = {
    es: {
      eyebrow: 'Presentación en Vídeo · Clínica Dental SET',
      heading: 'Conoce nuestra clínica de la mano de la Dra. Izbette Luis Torres',
      quote:
        '«Hola, soy Izbette Luis Torres, doctora y directora de la Clínica Dental SET, en el barrio de Poblenou en Barcelona. Encantada de conocerte.»',
      description:
        'Asómate a nuestra entrada en Carrer del Doctor Trueta, 213, y conoce nuestros gabinetes clínicos en Poblenou. Más de 25 años de experiencia ofreciendo odontología cercana, honesta y de confianza.',
      points: [
        'Atención directa con la Dra. Izbette Luis Torres (Col. 5664 COEC) y la Dra. Ruby Herrera (Col. 5929 COEC)',
        'Más de 25 años de trayectoria cuidando la salud bucodental en el barrio de Poblenou',
        '[Puntos destacados adicionales confirmados por la dirección de la clínica]',
      ],
      playLabel: 'Reproducir presentación con sonido',
      doctorCaption: 'Dra. Izbette Luis Torres · Col. 5664 COEC · Poblenou',
    },
    ca: {
      eyebrow: 'Presentació en Vídeo · Clínica Dental SET',
      heading: 'Coneix la nostra clínica de la mà de la Dra. Izbette Luis Torres',
      quote:
        '«Hola, sóc Izbette Luis Torres, doctora i directora de la Clínica Dental SET, al barri del Poblenou a Barcelona. Encantada de conèixer-te.»',
      description:
        'Descobreix la nostra entrada al Carrer del Doctor Trueta, 213, i coneix els nostres gabinets clínics al Poblenou. Més de 25 anys d’experiència oferint odontologia propera, honesta i de confiança.',
      points: [
        'Atenció directa amb la Dra. Izbette Luis Torres (Col. 5664 COEC) i la Dra. Ruby Herrera (Col. 5929 COEC)',
        'Més de 25 anys de trajectòria cuidant la salut bucodental al barri del Poblenou',
        '[Punts destacats addicionals confirmats per la direcció de la clínica]',
      ],
      playLabel: 'Reproduir presentació amb so',
      doctorCaption: 'Dra. Izbette Luis Torres · Col. 5664 COEC · Poblenou',
    },
    en: {
      eyebrow: 'Video Introduction · Clínica Dental SET',
      heading: 'Tour our Poblenou practice with Dr. Izbette Luis Torres',
      quote:
        '“Hello, I am Izbette Luis Torres, doctor and clinical director of Clínica Dental SET in the Poblenou neighborhood of Barcelona. Pleased to meet you.”',
      description:
        'Step through our entrance on Carrer del Doctor Trueta, 213, and see our clinical rooms in Poblenou. Over 25 years of experience delivering honest, personal dental care.',
      points: [
        'Direct care with Dr. Izbette Luis Torres (Col. 5664 COEC) and Dr. Ruby Herrera (Col. 5929 COEC)',
        'Over 25 years caring for oral health in the Poblenou neighborhood',
        '[Additional clinical highlights to be confirmed by the clinic]',
      ],
      playLabel: 'Play introduction with audio',
      doctorCaption: 'Dr. Izbette Luis Torres · Col. 5664 COEC · Poblenou',
    },
  }[lang];

  return (
    <section
      aria-labelledby="doctor-video-heading"
      className="py-16 md:py-24 bg-[#080C0A] border-b border-[#1D2D22] transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column (5 cols): Vertical 9:16 Video Showcase Frame with Persistent "Generado con IA" Watermark */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-[300px] sm:max-w-[325px] aspect-[9/16] rounded-3xl overflow-hidden bg-black border-2 border-[#83C408] shadow-2xl">
              <video
                ref={videoRef}
                src={CLINIC_PRESENTATION_VIDEO_SRC}
                controls
                playsInline
                preload="metadata"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                className="w-full h-full object-cover"
                aria-label={copy.heading}
              >
                <source src={CLINIC_PRESENTATION_VIDEO_SRC} type="video/mp4" />
              </video>

              {/* Permanent Watermark Overlay ("Generado con IA") */}
              <div
                aria-hidden="true"
                className="pointer-events-none select-none absolute top-3 right-3 z-20 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-xs border border-white/20 text-white/95 text-[11px] font-semibold tracking-wide shadow-sm"
              >
                Generado con IA
              </div>

              {!isPlaying && (
                <button
                  type="button"
                  onClick={handlePlayClick}
                  aria-label={copy.playLabel}
                  className="group absolute inset-x-0 top-0 bottom-12 z-10 flex flex-col items-center justify-center bg-gradient-to-t from-black/80 via-black/30 to-black/15 hover:bg-black/40 transition-colors cursor-pointer p-6 text-center"
                >
                  <span className="w-16 h-16 rounded-full bg-[#83C408] hover:bg-[#95DB0B] text-[#071408] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-150">
                    <Play className="w-7 h-7 fill-current ml-0.5" />
                  </span>
                  <span className="mt-4 text-xs font-extrabold text-white tracking-wide drop-shadow-sm">
                    {copy.playLabel}
                  </span>
                </button>
              )}
            </div>

            <p className="mt-3 text-xs font-medium text-[#A8BFA9] text-center tabular-nums">
              {copy.doctorCaption}
            </p>
          </div>

          {/* Right Column (7 cols): Personal Message, Highlights & Brand Green Conversion CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#83C408] uppercase tracking-wider mb-2">
                <Video className="w-3.5 h-3.5 text-[#83C408] shrink-0" />
                <span>{copy.eyebrow}</span>
              </div>

              <h2
                id="doctor-video-heading"
                className="text-2xl sm:text-3xl lg:text-4xl text-[#F5FAF3] leading-[1.15]"
                style={{ textWrap: 'balance' }}
              >
                {copy.heading}
              </h2>
            </div>

            <blockquote className="p-5 sm:p-6 rounded-2xl bg-[#101914] border border-[#1F3125] shadow-xs text-sm sm:text-base font-medium text-[#E5F0E3] leading-relaxed italic">
              {copy.quote}
            </blockquote>

            <p className="text-sm sm:text-base text-[#B9CEBE] leading-relaxed max-w-2xl">
              {copy.description}
            </p>

            <ul className="space-y-2.5 pt-1">
              {copy.points.map((point, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-[#B9CEBE]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#83C408] shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

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
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-xs sm:text-sm font-extrabold text-[#071408] bg-[#83C408] hover:bg-[#95DB0B] rounded-xl shadow-sm transition-all cursor-pointer"
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
                className="inline-flex items-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-bold text-[#83C408] bg-[#101914] hover:bg-[#16231B] border border-[#83C408]/60 hover:border-[#83C408] rounded-xl shadow-xs tabular-nums transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4 text-[#83C408]" />
                <span>Llamar {CLINIC_CONTACT.phone}</span>
              </a>

              <div className="inline-flex items-center gap-1.5 text-xs text-[#9AB39E] pl-1">
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
