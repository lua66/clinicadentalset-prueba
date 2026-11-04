import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { DentalSphere } from './components/DentalSphere';
import { TreatmentsSummary } from './components/TreatmentsSummary';
import { SpecialtiesGrid } from './components/SpecialtiesGrid';
import { TeamSection } from './components/TeamSection';
import { ClinicGallery } from './components/ClinicGallery';
import { DirectContactAndMap } from './components/DirectContactAndMap';
import { SpecialtyDetailPage } from './pages/SpecialtyDetailPage';
import { OwnerCrmPage } from './pages/OwnerCrmPage';
import { OwnerAlertButton } from './components/OwnerAlertButton';
import { trackCrmLead } from './utils/crmTracker';
import { Language, Specialty } from './types';
import { UI_TRANSLATIONS } from './i18n/translations';
import { SPECIALTIES, CLINIC_CONTACT, TESTIMONIALS } from './data/clinicData';
import { getSeoMetadata, applySeoMetadata } from './utils/seoManager';
import { MessageCircle, Phone, MapPin, ArrowRight, Star, ShieldCheck, HeartPulse, Building2 } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<Language>('es');
  const [isDark, setIsDark] = useState<boolean>(true); // Dark mode by default
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  // Synchronize Dark class on <html>
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Dynamically update unique meta descriptions, canonical tags, and schema per page & specialty
  useEffect(() => {
    const seo = getSeoMetadata(currentPath, lang);
    applySeoMetadata(seo);
  }, [currentPath, lang]);

  // Handle URL change
  const navigateTo = (path: string) => {
    setCurrentPath(path);
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Listen to popstate (browser back/forward)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const t = UI_TRANSLATIONS[lang];

  // Match current specialty route if on /especialidades/:slug
  let selectedSpecialty: Specialty | undefined;
  if (currentPath.startsWith('/especialidades/')) {
    const slug = currentPath.replace('/especialidades/', '').split('/')[0];
    selectedSpecialty = SPECIALTIES.find((s) => s.slug === slug);
  }

  // HIDDEN OWNER CRM ROUTE (/crm)
  if (currentPath === '/crm') {
    return <OwnerCrmPage onBackToWeb={() => navigateTo('/')} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] dark:bg-[#08120c] text-stone-900 dark:text-stone-100 transition-colors duration-200 selection:bg-[#83C408] selection:text-stone-900 pb-20 lg:pb-0">
      
      {/* Top Bar Header with Official Logo */}
      <Header
        currentPath={currentPath}
        onNavigate={navigateTo}
        lang={lang}
        onLanguageChange={setLang}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* ROUTE 1: Individual Specialty Pillar Page */}
        {selectedSpecialty ? (
          <>
            <SpecialtyDetailPage
              specialty={selectedSpecialty}
              lang={lang}
              onNavigate={navigateTo}
            />
            {/* Direct Contact & Map (Without Form) */}
            <DirectContactAndMap lang={lang} showSphere={false} />
          </>
        ) : currentPath === '/especialidades' ? (
          /* ROUTE 2: All Specialties Index */
          <div className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
              <div className="text-xs text-stone-500 mb-4 flex items-center gap-2">
                <button onClick={() => navigateTo('/')} className="hover:underline cursor-pointer">Inicio</button>
                <span>/</span>
                <span className="text-emerald-800 dark:text-[#83C408] font-bold">Especialidades</span>
              </div>

              {/* Title with small 3D Sphere at the right */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-6">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white mb-2">
                    Especialidades Odontológicas en Poblenou
                  </h1>
                  <p className="text-sm text-stone-600 dark:text-stone-400 max-w-2xl">
                    Tratamientos multidisciplinares con dedicación exclusiva. Cada especialidad cuenta con su propia página y equipo de doctoras colegiadas.
                  </p>
                </div>

                {/* Small 3D Sphere to the right of title */}
                <div className="shrink-0 self-start sm:self-center">
                  <DentalSphere mode="small" />
                </div>
              </div>
            </div>

            <SpecialtiesGrid
              lang={lang}
              onSelectSpecialty={(slug) => navigateTo(`/especialidades/${slug}`)}
              showSphere={true}
            />
            <DirectContactAndMap lang={lang} showSphere={false} />
          </div>
        ) : currentPath === '/equipo' ? (
          /* ROUTE 3: Team Dedicated Page */
          <div className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
              <div className="text-xs text-stone-500 mb-4 flex items-center gap-2">
                <button onClick={() => navigateTo('/')} className="hover:underline cursor-pointer">Inicio</button>
                <span>/</span>
                <span className="text-emerald-800 dark:text-[#83C408] font-bold">Equipo Médico</span>
              </div>
            </div>
            <TeamSection lang={lang} showSphere={true} />
            <DirectContactAndMap lang={lang} showSphere={false} />
          </div>
        ) : currentPath === '/clinica' ? (
          /* ROUTE 4: Clinic Facilities Dedicated Page */
          <div className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
              <div className="text-xs text-stone-500 mb-4 flex items-center gap-2">
                <button onClick={() => navigateTo('/')} className="hover:underline cursor-pointer">Inicio</button>
                <span>/</span>
                <span className="text-emerald-800 dark:text-[#83C408] font-bold">La Clínica</span>
              </div>
            </div>
            <ClinicGallery lang={lang} showSphere={true} />
            <DirectContactAndMap lang={lang} showSphere={false} />
          </div>
        ) : currentPath === '/contacto' ? (
          /* ROUTE 5: Contact & Location Dedicated Page */
          <div className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
              <div className="text-xs text-stone-500 mb-4 flex items-center gap-2">
                <button onClick={() => navigateTo('/')} className="hover:underline cursor-pointer">Inicio</button>
                <span>/</span>
                <span className="text-emerald-800 dark:text-[#83C408] font-bold">Contacto y Cita</span>
              </div>
            </div>
            <DirectContactAndMap lang={lang} showSphere={true} />
          </div>
        ) : (
          /* ROUTE 6: Clean, Uncluttered Homepage */
          <>
            {/* HERO SECTION */}
            <section className="relative overflow-hidden py-14 sm:py-20 lg:py-24 border-b border-stone-200/80 dark:border-emerald-950/70">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                  
                  {/* Left Column: Authority Copy & High-Intent Conversion CTAs */}
                  <div className="lg:col-span-7 space-y-6">
                    {/* Heritage badge in Brand Green */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-[#83C408]/15 text-emerald-800 dark:text-[#83C408] border border-[#83C408]/30">
                      <HeartPulse className="w-3.5 h-3.5 text-[#83C408]" />
                      <span>{t.heroPill}</span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-900 dark:text-white leading-[1.12]" style={{ textWrap: 'balance' }}>
                      {t.heroTitlePart1}{' '}
                      <span className="text-[#23A455] dark:text-[#83C408]">
                        {t.heroTitleHighlight}
                      </span>
                    </h1>

                    <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 max-w-2xl leading-relaxed">
                      {t.heroSubtitle}
                    </p>

                    {/* Direct Contact Buttons (No forms, direct action) */}
                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      {/* Direct WhatsApp */}
                      <a
                        href={`https://wa.me/${CLINIC_CONTACT.whatsappClean}?text=Hola,%20quisiera%20pedir%20cita%20en%20Cl%C3%ADnica%20Dental%20SET.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                          trackCrmLead({
                            type: 'whatsapp',
                            treatment: 'Consulta General (Hero Principal)',
                            sourcePage: 'Página de Inicio (Hero)',
                            sourceUrl: '/',
                          });
                        }}
                        className="inline-flex items-center gap-2.5 px-6 py-3.5 text-xs sm:text-sm font-bold text-white bg-[#23A455] hover:bg-[#1e8d49] rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>WhatsApp</span>
                      </a>

                      {/* Direct Call (933 09 18 71) */}
                      <a
                        href={`tel:${CLINIC_CONTACT.phoneClean}`}
                        onClick={() => {
                          trackCrmLead({
                            type: 'call',
                            treatment: 'Consulta General (Hero Principal)',
                            sourcePage: 'Página de Inicio (Hero)',
                            sourceUrl: '/',
                          });
                        }}
                        className="inline-flex items-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-bold text-stone-800 dark:text-stone-200 bg-white dark:bg-[#0e1d13] hover:bg-stone-100 dark:hover:bg-emerald-950/70 border border-stone-200 dark:border-emerald-900/60 rounded-xl shadow-xs transition-all cursor-pointer"
                      >
                        <Phone className="w-4 h-4 text-[#83C408]" />
                        <span>Llamar {CLINIC_CONTACT.phone}</span>
                      </a>

                      {/* Explore Specialties */}
                      <button
                        onClick={() => navigateTo('/especialidades')}
                        className="inline-flex items-center gap-1.5 px-4 py-3.5 text-xs sm:text-sm font-bold text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-[#83C408] transition-colors cursor-pointer"
                      >
                        <span>Especialidades</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Trust Proof Badges */}
                    <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-stone-500 dark:text-stone-400">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#83C408]" />
                        <span>{CLINIC_CONTACT.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#23A455]" />
                        <span>Odontólogas Colegiadas COEC</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Central 3D Sphere (Logo and Name without collision) */}
                  <div className="lg:col-span-5 flex flex-col items-center justify-center">
                    <DentalSphere mode="hero" />
                  </div>

                </div>

                {/* 4-COLUMN TRUST METRICS STRIP */}
                <div className="mt-16 pt-10 border-t border-stone-200/70 dark:border-emerald-950/70 grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="p-4 rounded-xl bg-white/60 dark:bg-[#0d1a11]/60 border border-stone-200/50 dark:border-emerald-950">
                    <span className="text-xl sm:text-2xl font-extrabold text-[#23A455] dark:text-[#83C408] block">
                      {t.statExperience}
                    </span>
                    <span className="text-xs text-stone-600 dark:text-stone-400 mt-1 block">
                      {t.statExperienceDesc}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-white/60 dark:bg-[#0d1a11]/60 border border-stone-200/50 dark:border-emerald-950">
                    <span className="text-xl sm:text-2xl font-extrabold text-[#23A455] dark:text-[#83C408] block">
                      {t.statPatients}
                    </span>
                    <span className="text-xs text-stone-600 dark:text-stone-400 mt-1 block">
                      {t.statPatientsDesc}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-white/60 dark:bg-[#0d1a11]/60 border border-stone-200/50 dark:border-emerald-950">
                    <span className="text-xl sm:text-2xl font-extrabold text-[#23A455] dark:text-[#83C408] block">
                      {t.statTechnology}
                    </span>
                    <span className="text-xs text-stone-600 dark:text-stone-400 mt-1 block">
                      {t.statTechnologyDesc}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-white/60 dark:bg-[#0d1a11]/60 border border-stone-200/50 dark:border-emerald-950">
                    <span className="text-xl sm:text-2xl font-extrabold text-[#23A455] dark:text-[#83C408] block">
                      {t.statSatisfaction}
                    </span>
                    <span className="text-xs text-stone-600 dark:text-stone-400 mt-1 block">
                      {t.statSatisfactionDesc}
                    </span>
                  </div>
                </div>

              </div>
            </section>

            {/* LIGHTWEIGHT TREATMENTS MENTION */}
            <TreatmentsSummary
              lang={lang}
              onSelectSpecialty={(slug) => navigateTo(`/especialidades/${slug}`)}
              onViewAll={() => navigateTo('/especialidades')}
            />

            {/* TEAM SECTION (The Collective of Work) */}
            <TeamSection lang={lang} showSphere={false} />

            {/* LIGHTWEIGHT FACILITIES INVITATION BANNER */}
            <section className="py-12 bg-white dark:bg-[#08120c] border-b border-stone-200/80 dark:border-emerald-950/70 transition-colors">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="p-8 rounded-3xl bg-stone-50 dark:bg-[#0d1a11] border border-stone-200/80 dark:border-emerald-950 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 text-[#83C408] flex items-center justify-center shrink-0">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-stone-900 dark:text-white">
                        Conoce nuestras instalaciones en Poblenou
                      </h3>
                      <p className="text-xs text-stone-500 mt-0.5">
                        Gabinetes quirúrgicos, esterilización clase B y espacios confortables diseñados para tu bienestar.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => navigateTo('/clinica')}
                    className="px-5 py-2.5 text-xs font-bold text-emerald-800 dark:text-[#83C408] bg-white dark:bg-[#122418] hover:bg-emerald-50 dark:hover:bg-emerald-950/60 border border-stone-200 dark:border-emerald-900/60 rounded-xl transition-colors whitespace-nowrap cursor-pointer shrink-0 flex items-center gap-2"
                  >
                    <span>Ver galería de instalaciones</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>

            {/* SOCIAL PROOF: Authentic Local Patient Testimonials */}
            <section className="py-16 md:py-20 bg-stone-50 dark:bg-[#08120c] border-b border-stone-200/80 dark:border-emerald-950/70 transition-colors duration-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-xl mx-auto mb-12">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-500 uppercase tracking-wider mb-2">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>Opiniones Verificadas de Pacientes</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white">
                    La confianza de los vecinos del Poblenou
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {TESTIMONIALS.map((test) => (
                    <div
                      key={test.id}
                      className="p-6 rounded-2xl bg-white dark:bg-[#0d1a11] border border-stone-200/80 dark:border-emerald-950/80 shadow-xs flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-1 text-amber-400 mb-3">
                          {[...Array(test.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed italic">
                          "{test.comment[lang]}"
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-stone-100 dark:border-emerald-950/60 flex items-center justify-between text-xs">
                        <div>
                          <span className="font-bold text-stone-900 dark:text-white block">
                            {test.name}
                          </span>
                          <span className="text-[11px] text-stone-400">
                            {test.location} · {test.treatment[lang]}
                          </span>
                        </div>
                        <span className="text-[10px] text-stone-400">{test.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* DIRECT CONTACT & GOOGLE MAPS (NO FORM - ONLY DIRECT WHATSAPP & PHONES) */}
            <DirectContactAndMap lang={lang} showSphere={false} />
          </>
        )}
      </main>

      {/* MOBILE STICKY CONTACT BAR (Fixed to bottom, z-40, height ~56px) */}
      <aside
        aria-label="Contacto Rápido"
        className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-[#08120c]/95 backdrop-blur-md border-t border-stone-200 dark:border-emerald-950 px-3 py-2 flex items-center gap-2 shadow-[0_-4px_16px_rgba(0,0,0,0.12)] pointer-events-auto"
      >
        <a
          href={`https://wa.me/${CLINIC_CONTACT.whatsappClean}?text=Hola,%20quisiera%20pedir%20cita%20en%20Cl%C3%ADnica%20Dental%20SET.`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            trackCrmLead({
              type: 'whatsapp',
              treatment: 'Consulta General (Barra Inferior Móvil)',
              sourcePage: 'Barra Inferior Móvil Flotante',
              sourceUrl: currentPath,
            });
          }}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-bold text-white bg-[#23A455] active:bg-[#1e8d49] rounded-lg shadow-xs cursor-pointer"
        >
          <MessageCircle className="w-4 h-4" />
          <span>WhatsApp</span>
        </a>

        <a
          href={`tel:${CLINIC_CONTACT.phoneClean}`}
          onClick={() => {
            trackCrmLead({
              type: 'call',
              treatment: 'Consulta General (Barra Inferior Móvil)',
              sourcePage: 'Barra Inferior Móvil Flotante',
              sourceUrl: currentPath,
            });
          }}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-bold text-stone-800 dark:text-stone-200 bg-stone-100 dark:bg-emerald-950/60 rounded-lg border border-stone-200 dark:border-emerald-900/60 cursor-pointer"
        >
          <Phone className="w-3.5 h-3.5 text-[#83C408]" />
          <span>Llamar {CLINIC_CONTACT.phone}</span>
        </a>
      </aside>

      {/* FOOTER */}
      <Footer
        lang={lang}
        onNavigate={navigateTo}
      />

      {/* FLOATING CRM DASHBOARD ACCESS BUTTON (z-30, non-conflicting positioning logic) */}
      <OwnerAlertButton
        onOpenCrm={() => navigateTo('/crm')}
        variant="floating"
      />

    </div>
  );
}
