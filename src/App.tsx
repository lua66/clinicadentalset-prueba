import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { DentalSphere } from './components/DentalSphere';
import { PageHeader } from './components/PageHeader';
import { TreatmentsSummary } from './components/TreatmentsSummary';
import { SpecialtiesGrid } from './components/SpecialtiesGrid';
import { TeamSection } from './components/TeamSection';
import { ClinicGallery } from './components/ClinicGallery';
import { DoctorPresentationVideo } from './components/DoctorPresentationVideo';
import { DirectContactAndMap } from './components/DirectContactAndMap';
import { CookieBanner } from './components/CookieBanner';
import { SpecialtyDetailPage } from './pages/SpecialtyDetailPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { trackCrmLead } from './utils/crmTracker';
import { buildWhatsAppUrl } from './utils/whatsapp';
import { Language, Specialty } from './types';
import { UI_TRANSLATIONS } from './i18n/translations';
import { SPECIALTIES, CLINIC_CONTACT, TESTIMONIALS } from './data/clinicData';
import { getSeoMetadata, applySeoMetadata } from './utils/seoManager';
import { parseUrlPath, buildLocalizedPath, getLegacyRedirectPath } from './utils/routing';

const LazyOwnerCrmPage = React.lazy(() => import('./pages/OwnerCrmPage'));
import {
  MessageCircle,
  Phone,
  MapPin,
  ArrowRight,
  Star,
  ShieldCheck,
  HeartPulse,
  Building2,
  Sparkles,
  GraduationCap,
} from 'lucide-react';

export interface AppProps {
  initialPath?: string;
}

export function App({ initialPath }: AppProps = {}) {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    const raw =
      initialPath ||
      (typeof window !== 'undefined' ? window.location.pathname || '/' : '/');
    return getLegacyRedirectPath(raw) || raw;
  });

  const { lang, basePath, specialtySlug, isNotFound } = parseUrlPath(currentPath);

  // Sync URL bar if a legacy untranslated path was normalized on client mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const legacy = getLegacyRedirectPath(window.location.pathname);
      if (legacy) {
        window.history.replaceState({}, '', legacy);
        setCurrentPath(legacy);
      }
    }
  }, []);

  // Dynamically update unique meta descriptions, canonical tags, hreflang, and schema per route & language
  useEffect(() => {
    const seo = getSeoMetadata(currentPath, lang);
    applySeoMetadata(seo, lang);
  }, [currentPath, lang]);

  // Handle URL change
  const navigateTo = (path: string) => {
    const target = getLegacyRedirectPath(path) || path;
    setCurrentPath(target);
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', target);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle language switch via localized translated URLs (/, /ca/..., /en/...)
  const handleLanguageChange = (newLang: Language) => {
    const localized = buildLocalizedPath(
      isNotFound ? `/404` : basePath,
      newLang
    );
    navigateTo(localized);
  };

  // Listen to popstate (browser back/forward)
  useEffect(() => {
    const handlePopState = () => {
      const raw = window.location.pathname || '/';
      setCurrentPath(getLegacyRedirectPath(raw) || raw);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const t = UI_TRANSLATIONS[lang];

  // Match current specialty route if on /especialidades/:slug (or localized CA/EN equivalents)
  const selectedSpecialty: Specialty | undefined = specialtySlug
    ? SPECIALTIES.find((s) => s.slug === specialtySlug)
    : undefined;

  // PRIVATE PASSWORD-PROTECTED OWNER CRM ROUTE (/crm) — Loaded in dedicated JS chunk
  if (basePath === '/crm') {
    return (
      <React.Suspense
        fallback={
          <div className="min-h-screen bg-[#080C0A] text-[#F2F7F0] flex items-center justify-center p-6 text-sm">
            Cargando panel privado de dirección...
          </div>
        }
      >
        <LazyOwnerCrmPage onBackToWeb={() => navigateTo('/')} />
      </React.Suspense>
    );
  }

  const specialtiesIndexUrl = buildLocalizedPath('/especialidades', lang);
  const clinicGalleryUrl = buildLocalizedPath('/clinica', lang);

  return (
    <div className="min-h-screen flex flex-col bg-[#080C0A] text-[#F2F7F0] transition-colors duration-200 selection:bg-[#83C408] selection:text-[#071408] pb-20 lg:pb-0">
      {/* Top Bar Header with Corporate Brand Green #83C408 & Crawlable Multilingual Links */}
      <Header
        currentPath={currentPath}
        onNavigate={navigateTo}
        lang={lang}
        onLanguageChange={handleLanguageChange}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* ROUTE 404: Dedicated Not Found Page (No Soft 404 fallback to homepage) */}
        {isNotFound || basePath === '/404' ? (
          <NotFoundPage
            lang={lang}
            requestedPath={currentPath}
            onNavigate={navigateTo}
          />
        ) : selectedSpecialty ? (
          /* ROUTE 1: Individual Specialty Pillar Page (12 specialties across ES/CA/EN) */
          <>
            <SpecialtyDetailPage
              specialty={selectedSpecialty}
              lang={lang}
              onNavigate={navigateTo}
            />
            <DirectContactAndMap lang={lang} showHeader={true} showSphere={false} />
          </>
        ) : basePath === '/especialidades' ? (
          /* ROUTE 2: All Specialties Index */
          <>
            <PageHeader
              breadcrumbs={[
                { label: t.navHome, path: '/' },
                { label: t.navSpecialties },
              ]}
              eyebrowIcon={<Sparkles className="w-3.5 h-3.5 text-[#83C408]" />}
              eyebrowText="Tratamientos Odontológicos Integrales"
              title={t.pageSpecialtiesTitle}
              subtitle={t.pageSpecialtiesSubtitle}
              lang={lang}
              onNavigate={navigateTo}
            />
            <SpecialtiesGrid
              lang={lang}
              onSelectSpecialty={(slug) =>
                navigateTo(buildLocalizedPath(`/especialidades/${slug}`, lang))
              }
              showHeader={false}
              showSphere={false}
            />
            <DirectContactAndMap lang={lang} showHeader={true} showSphere={false} />
          </>
        ) : basePath === '/equipo' ? (
          /* ROUTE 3: Team Dedicated Page */
          <>
            <PageHeader
              breadcrumbs={[
                { label: t.navHome, path: '/' },
                { label: t.navTeam },
              ]}
              eyebrowIcon={<GraduationCap className="w-4 h-4 text-[#83C408]" />}
              eyebrowText="Equipo Médico Colegiado COEC"
              title={t.teamHeading}
              subtitle={t.teamSubtitle}
              lang={lang}
              onNavigate={navigateTo}
            />
            <TeamSection lang={lang} showHeader={false} showSphere={false} />
            <DirectContactAndMap lang={lang} showHeader={true} showSphere={false} />
          </>
        ) : basePath === '/clinica' ? (
          /* ROUTE 4: Clinic Facilities Dedicated Page */
          <>
            <PageHeader
              breadcrumbs={[
                { label: t.navHome, path: '/' },
                { label: t.navGallery },
              ]}
              eyebrowIcon={<Sparkles className="w-3.5 h-3.5 text-[#83C408]" />}
              eyebrowText="Instalaciones en Poblenou · Barcelona"
              title={t.galleryHeading}
              subtitle={t.gallerySubtitle}
              lang={lang}
              onNavigate={navigateTo}
            />
            <ClinicGallery lang={lang} showHeader={false} showSphere={false} />
            <DoctorPresentationVideo
              lang={lang}
              sourcePage="Página La Clínica (Vídeo Presentación Doctora)"
            />
            <DirectContactAndMap lang={lang} showHeader={true} showSphere={false} />
          </>
        ) : basePath === '/contacto' ? (
          /* ROUTE 5: Contact & Location Dedicated Page */
          <>
            <PageHeader
              breadcrumbs={[
                { label: t.navHome, path: '/' },
                { label: t.navContact },
              ]}
              eyebrowIcon={<MapPin className="w-3.5 h-3.5 text-[#83C408]" />}
              eyebrowText="Poblenou · Sant Martí · Barcelona"
              title={t.contactHeading}
              subtitle={t.contactSubtitle}
              lang={lang}
              onNavigate={navigateTo}
            />
            <DirectContactAndMap lang={lang} showHeader={false} showSphere={false} />
          </>
        ) : (
          /* ROUTE 6: Homepage */
          <>
            {/* HERO SECTION */}
            <section className="relative overflow-hidden py-14 sm:py-20 lg:py-24 bg-[#080C0A] border-b border-[#1D2D22]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                  {/* Left Column: Authority Copy & Direct Conversion CTAs */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#83C408]">
                      <HeartPulse className="w-4 h-4 text-[#83C408] shrink-0" />
                      <span>{t.heroPill}</span>
                    </div>

                    <h1
                      className="text-3xl sm:text-4xl lg:text-5xl text-[#F5FAF3] leading-[1.12]"
                      style={{ textWrap: 'balance' }}
                    >
                      {t.heroTitlePart1}{' '}
                      <span className="text-[#83C408]">
                        {t.heroTitleHighlight}
                      </span>
                    </h1>

                    <p className="text-base sm:text-lg text-[#B9CEBE] max-w-2xl leading-relaxed">
                      {t.heroSubtitle}
                    </p>

                    {/* Direct Contact Buttons in Corporate Brand Green #83C408 */}
                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <a
                        href={buildWhatsAppUrl(lang)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                          trackCrmLead({
                            type: 'whatsapp',
                            treatment: 'Consulta General (Hero Principal)',
                            sourcePage: 'Página de Inicio (Hero)',
                            sourceUrl: currentPath,
                          });
                        }}
                        className="inline-flex items-center justify-center min-h-[44px] gap-2.5 px-6 py-3 text-xs sm:text-sm font-extrabold text-[#071408] bg-[#83C408] hover:bg-[#95DB0B] rounded-xl shadow-sm hover:shadow-md transition-all whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4 shrink-0" />
                        <span>{t.heroCtaWhatsApp}</span>
                      </a>

                      <a
                        href={`tel:${CLINIC_CONTACT.phoneClean}`}
                        onClick={() => {
                          trackCrmLead({
                            type: 'call',
                            treatment: 'Consulta General (Hero Principal)',
                            sourcePage: 'Página de Inicio (Hero)',
                            sourceUrl: currentPath,
                          });
                        }}
                        className="inline-flex items-center justify-center min-h-[44px] gap-2 px-5 py-3 text-xs sm:text-sm font-bold text-[#83C408] bg-[#101914] hover:bg-[#16231B] border border-[#83C408]/60 hover:border-[#83C408] rounded-xl shadow-xs tabular-nums transition-all whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <Phone className="w-4 h-4 text-[#83C408] shrink-0" />
                        <span>{t.heroCtaPhone}</span>
                      </a>

                      <a
                        href={specialtiesIndexUrl}
                        onClick={(e) => {
                          e.preventDefault();
                          navigateTo(specialtiesIndexUrl);
                        }}
                        className="inline-flex items-center justify-center min-h-[44px] gap-1.5 px-4 py-3 text-xs sm:text-sm font-bold text-[#83C408] bg-[#101914]/80 hover:bg-[#16231B] border border-[#83C408]/40 hover:border-[#83C408] rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <span>{t.heroCtaSpecialties}</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>

                    {/* Verified Trust Proof Line */}
                    <div className="pt-4 flex flex-wrap items-center gap-4 text-xs text-[#9AB39E]">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#83C408] shrink-0" />
                        <span>{CLINIC_CONTACT.address}, {CLINIC_CONTACT.city}</span>
                      </div>
                      <span aria-hidden="true" className="text-[#83C408]">·</span>
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#83C408] shrink-0" />
                        <span>Odontólogas Colegiadas COEC (Col. 5664 y Col. 5929)</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Original Central 3D Sphere */}
                  <div className="lg:col-span-5 flex flex-col items-center justify-center">
                    <DentalSphere mode="hero" />
                  </div>
                </div>

                {/* 4-COLUMN TRUST METRICS STRIP (Verified + Bracketed Placeholders) */}
                <div className="mt-16 pt-10 border-t border-[#1D2D22] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                  <div className="p-5 rounded-xl bg-[#101914] border border-[#1F3125] shadow-xs">
                    <span className="font-display text-xl sm:text-2xl text-[#83C408] tabular-nums block">
                      {t.statExperience}
                    </span>
                    <span className="text-xs text-[#B9CEBE] mt-1.5 block leading-relaxed">
                      {t.statExperienceDesc}
                    </span>
                  </div>

                  <div className="p-5 rounded-xl bg-[#101914] border border-[#1F3125] shadow-xs">
                    <span className="font-display text-xl sm:text-2xl text-[#83C408] block">
                      {t.statPatients}
                    </span>
                    <span className="text-xs text-[#B9CEBE] mt-1.5 block leading-relaxed">
                      {t.statPatientsDesc}
                    </span>
                  </div>

                  <div className="p-5 rounded-xl bg-[#101914] border border-[#1F3125] shadow-xs">
                    <span className="font-display text-xl sm:text-2xl text-[#83C408] block">
                      {t.statTechnology}
                    </span>
                    <span className="text-xs text-[#B9CEBE] mt-1.5 block leading-relaxed">
                      {t.statTechnologyDesc}
                    </span>
                  </div>

                  <div className="p-5 rounded-xl bg-[#101914] border border-[#1F3125] shadow-xs">
                    <span className="font-display text-lg sm:text-xl text-[#83C408] block">
                      {t.statSatisfaction}
                    </span>
                    <span className="text-xs text-[#9AB39E] mt-1.5 block leading-relaxed">
                      {t.statSatisfactionDesc}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* CRAWLABLE 12 SPECIALTIES SUMMARY */}
            <TreatmentsSummary
              lang={lang}
              onSelectSpecialty={(slug) =>
                navigateTo(buildLocalizedPath(`/especialidades/${slug}`, lang))
              }
              onViewAll={() => navigateTo(specialtiesIndexUrl)}
            />

            {/* DOCTOR CLINIC PRESENTATION VIDEO (With "Vídeo de muestra generado con IA" watermark) */}
            <DoctorPresentationVideo
              lang={lang}
              sourcePage="Página de Inicio (Vídeo Presentación Doctora)"
            />

            {/* TEAM SECTION */}
            <TeamSection lang={lang} showSphere={false} />

            {/* FACILITIES INVITATION BANNER */}
            <section className="py-12 bg-[#080C0A] border-b border-[#1D2D22]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="p-8 rounded-3xl bg-[#101914] border border-[#1F3125] shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#16241B] border border-[#83C408]/40 text-[#83C408] flex items-center justify-center shrink-0">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg text-[#F5FAF3]">
                        {t.galleryHeading}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#B9CEBE] mt-0.5">
                        {t.gallerySubtitle}
                      </p>
                    </div>
                  </div>

                  <a
                    href={clinicGalleryUrl}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo(clinicGalleryUrl);
                    }}
                    className="inline-flex items-center justify-center min-h-[44px] px-5 py-3 text-xs font-extrabold text-[#071408] bg-[#83C408] hover:bg-[#95DB0B] rounded-xl transition-colors whitespace-nowrap cursor-pointer shrink-0 gap-2"
                  >
                    <span>{t.viewGalleryBtn}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </section>

            {/* PATIENT REVIEWS PLACEHOLDER SECTION (Zero Fake Reviews — Reserved Slots for Real Google Business Reviews) */}
            <section className="py-16 md:py-20 bg-[#0B110E] border-b border-[#1D2D22]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#83C408] uppercase tracking-wider mb-2">
                    <Star className="w-3.5 h-3.5" />
                    <span>[Google Business Profile · Reseñas Reales]</span>
                  </div>
                  <h2
                    className="text-2xl sm:text-3xl text-[#F5FAF3]"
                    style={{ textWrap: 'balance' }}
                  >
                    Reseñas de pacientes en Google Business
                  </h2>
                  <p className="mt-2.5 text-xs sm:text-sm text-[#B9CEBE] leading-relaxed">
                    [Espacio preparado para mostrar reseñas reales y autorizadas de pacientes publicadas en el perfil oficial de Google de Clínica Dental SET.]
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {TESTIMONIALS.map((test) => (
                    <article
                      key={test.id}
                      className="p-6 rounded-2xl bg-[#101914] border border-dashed border-[#83C408]/45 flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#83C408] block mb-2">
                          [Reseña verificada de Google]
                        </span>
                        <p className="text-xs sm:text-sm text-[#B9CEBE] leading-relaxed">
                          {test.comment[lang]}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-[#1D2D22] flex items-center justify-between text-xs">
                        <div>
                          <span className="font-bold text-[#F5FAF3] block">
                            {test.name}
                          </span>
                          <span className="text-[11px] text-[#9AB39E]">
                            {test.location} · {test.treatment[lang]}
                          </span>
                        </div>
                        <span className="text-[11px] text-[#9AB39E] tabular-nums">{test.date}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            {/* DIRECT CONTACT & GDPR-PROTECTED GOOGLE MAPS */}
            <DirectContactAndMap lang={lang} showSphere={false} />
          </>
        )}
      </main>

      {/* MOBILE STICKY CONTACT BAR (Fixed bottom, <= 56px height) */}
      <aside
        aria-label="Contacto Rápido"
        className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#080C0A]/95 backdrop-blur-md border-t border-[#83C408] px-3 py-2 flex items-center gap-2 shadow-[0_-4px_16px_rgba(0,0,0,0.45)] pointer-events-auto"
      >
        <a
          href={buildWhatsAppUrl(lang)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            trackCrmLead({
              type: 'whatsapp',
              treatment: 'Consulta General (Barra Inferior Móvil)',
              sourcePage: 'Barra Inferior Móvil',
              sourceUrl: currentPath,
            });
          }}
          className="flex-1 min-h-[44px] flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-extrabold text-[#071408] bg-[#83C408] hover:bg-[#95DB0B] rounded-lg shadow-xs cursor-pointer"
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
              sourcePage: 'Barra Inferior Móvil',
              sourceUrl: currentPath,
            });
          }}
          className="flex-1 min-h-[44px] flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-bold text-[#83C408] bg-[#101914] hover:bg-[#16231B] rounded-lg border border-[#83C408]/70 tabular-nums cursor-pointer"
        >
          <Phone className="w-3.5 h-3.5 text-[#83C408]" />
          <span>{t.callNow}</span>
        </a>
      </aside>

      {/* FOOTER */}
      <Footer
        lang={lang}
        onNavigate={navigateTo}
      />

      {/* GDPR COOKIE CONSENT BANNER */}
      <CookieBanner lang={lang} />
    </div>
  );
}

export default App;
