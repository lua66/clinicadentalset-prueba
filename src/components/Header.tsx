import React, { useState } from 'react';
import { Phone, MessageCircle, Moon, Sun, Menu, X } from 'lucide-react';
import { Language } from '../types';
import { UI_TRANSLATIONS } from '../i18n/translations';
import { CLINIC_CONTACT } from '../data/clinicData';
import { OwnerAlertButton } from './OwnerAlertButton';
import { trackCrmLead } from '../utils/crmTracker';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  lang,
  onLanguageChange,
  isDark,
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = UI_TRANSLATIONS[lang];

  const handleNav = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FAF7F2]/95 dark:bg-[#08120c]/95 backdrop-blur-md border-b border-stone-200/80 dark:border-emerald-950/60 transition-colors duration-200">
      {/* Top Bar Contract: 3 Zones separated by gap-8 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        
        {/* ZONE 1: Authentic Brand Logo Image */}
        <button
          onClick={() => handleNav('/')}
          className="flex items-center gap-3 text-left group whitespace-nowrap shrink-0 cursor-pointer"
          aria-label="Ir a Inicio de Clínica Dental SET"
        >
          <div className="py-1">
            <img
              src="/assets/logo-blanc.png"
              alt="Clínica Dental SET"
              className="h-9 sm:h-11 w-auto object-contain dark:brightness-100 brightness-0 transition-all group-hover:scale-105"
            />
          </div>
        </button>

        {/* ZONE 2: 4-5 Clean single-line text nav links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-stone-600 dark:text-stone-300">
          <button
            onClick={() => handleNav('/')}
            className={`whitespace-nowrap shrink-0 hover:text-stone-900 dark:hover:text-white transition-colors relative py-1 cursor-pointer ${
              currentPath === '/' ? 'text-emerald-700 dark:text-[#83C408] font-bold' : ''
            }`}
          >
            {t.navHome}
            {currentPath === '/' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 dark:bg-[#83C408] rounded-full" />
            )}
          </button>

          <button
            onClick={() => handleNav('/especialidades')}
            className={`whitespace-nowrap shrink-0 hover:text-stone-900 dark:hover:text-white transition-colors relative py-1 cursor-pointer ${
              currentPath.startsWith('/especialidades') ? 'text-emerald-700 dark:text-[#83C408] font-bold' : ''
            }`}
          >
            {t.navSpecialties}
            {currentPath.startsWith('/especialidades') && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 dark:bg-[#83C408] rounded-full" />
            )}
          </button>

          <button
            onClick={() => handleNav('/equipo')}
            className={`whitespace-nowrap shrink-0 hover:text-stone-900 dark:hover:text-white transition-colors relative py-1 cursor-pointer ${
              currentPath === '/equipo' ? 'text-emerald-700 dark:text-[#83C408] font-bold' : ''
            }`}
          >
            {t.navTeam}
            {currentPath === '/equipo' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 dark:bg-[#83C408] rounded-full" />
            )}
          </button>

          <button
            onClick={() => handleNav('/clinica')}
            className={`whitespace-nowrap shrink-0 hover:text-stone-900 dark:hover:text-white transition-colors relative py-1 cursor-pointer ${
              currentPath === '/clinica' ? 'text-emerald-700 dark:text-[#83C408] font-bold' : ''
            }`}
          >
            {t.navGallery}
            {currentPath === '/clinica' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 dark:bg-[#83C408] rounded-full" />
            )}
          </button>

          <button
            onClick={() => handleNav('/contacto')}
            className={`whitespace-nowrap shrink-0 hover:text-stone-900 dark:hover:text-white transition-colors relative py-1 cursor-pointer ${
              currentPath === '/contacto' ? 'text-emerald-700 dark:text-[#83C408] font-bold' : ''
            }`}
          >
            {t.navContact}
            {currentPath === '/contacto' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 dark:bg-[#83C408] rounded-full" />
            )}
          </button>
        </nav>

        {/* ZONE 3: 1 Primary Action + Utility Controls */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Language Selector: ES / CA / EN */}
          <div className="flex items-center bg-stone-200/70 dark:bg-stone-900/90 p-0.5 rounded-lg text-xs font-medium border border-stone-300/40 dark:border-emerald-950">
            {(['es', 'ca', 'en'] as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => onLanguageChange(l)}
                className={`px-2 py-1 rounded-md uppercase transition-colors cursor-pointer ${
                  lang === l
                    ? 'bg-white dark:bg-emerald-950 text-emerald-800 dark:text-[#83C408] shadow-xs font-bold'
                    : 'text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white'
                }`}
                aria-label={`Cambiar a idioma ${l}`}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-emerald-950/60 transition-colors cursor-pointer"
            title={isDark ? 'Cambiar a modo crema suave' : 'Cambiar a modo oscuro'}
            aria-label="Cambiar tema de color"
          >
            {isDark ? <Sun className="w-4 h-4 text-[#83C408]" /> : <Moon className="w-4 h-4 text-emerald-800" />}
          </button>

          {/* Owner CRM Warning Button in Header */}
          <OwnerAlertButton
            variant="header"
            onOpenCrm={() => handleNav('/crm')}
          />

          {/* Primary Action Button: WhatsApp in Clinic Brand Green */}
          <a
            href={`https://wa.me/${CLINIC_CONTACT.whatsappClean}?text=Hola,%20me%20gustar%C3%ADa%20pedir%20cita%20en%20Cl%C3%ADnica%20Dental%20SET.`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackCrmLead({
                type: 'whatsapp',
                treatment: 'Consulta General (Botón Cabecera)',
                sourcePage: 'Cabecera Principal Web',
              });
            }}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-[#23A455] hover:bg-[#1e8d49] rounded-lg shadow-sm hover:shadow-md transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{t.whatsappCta}</span>
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-stone-600 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-stone-800 rounded-lg cursor-pointer"
            aria-label="Abrir menú de navegación"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-stone-200 dark:border-emerald-950 bg-[#FAF7F2] dark:bg-[#08120c] px-4 pt-3 pb-6 space-y-2 animate-in fade-in duration-200">
          <button
            onClick={() => handleNav('/')}
            className="w-full text-left px-3 py-2 text-sm font-medium rounded-lg text-stone-800 dark:text-stone-200 hover:bg-stone-200/50 dark:hover:bg-emerald-950/50"
          >
            {t.navHome}
          </button>
          <button
            onClick={() => handleNav('/especialidades')}
            className="w-full text-left px-3 py-2 text-sm font-medium rounded-lg text-stone-800 dark:text-stone-200 hover:bg-stone-200/50 dark:hover:bg-emerald-950/50"
          >
            {t.navSpecialties}
          </button>
          <button
            onClick={() => handleNav('/equipo')}
            className="w-full text-left px-3 py-2 text-sm font-medium rounded-lg text-stone-800 dark:text-stone-200 hover:bg-stone-200/50 dark:hover:bg-emerald-950/50"
          >
            {t.navTeam}
          </button>
          <button
            onClick={() => handleNav('/clinica')}
            className="w-full text-left px-3 py-2 text-sm font-medium rounded-lg text-stone-800 dark:text-stone-200 hover:bg-stone-200/50 dark:hover:bg-emerald-950/50"
          >
            {t.navGallery}
          </button>
          <button
            onClick={() => handleNav('/contacto')}
            className="w-full text-left px-3 py-2 text-sm font-medium rounded-lg text-stone-800 dark:text-stone-200 hover:bg-stone-200/50 dark:hover:bg-emerald-950/50"
          >
            {t.navContact}
          </button>

          {/* CRM Link inside mobile drawer */}
          <button
            onClick={() => handleNav('/crm')}
            className="w-full text-left px-3 py-2 text-xs font-bold rounded-lg text-rose-500 hover:bg-rose-950/30 flex items-center justify-between"
          >
            <span>Acceso Privado Dirección (CRM)</span>
            <span className="text-[10px] bg-rose-500/20 px-2 py-0.5 rounded text-rose-400">Dueña</span>
          </button>

          <div className="pt-3 border-t border-stone-200 dark:border-emerald-950 flex flex-col sm:flex-row gap-2">
            <a
              href={`https://wa.me/${CLINIC_CONTACT.whatsappClean}?text=Hola,%20quisiera%20pedir%20cita%20en%20Cl%C3%ADnica%20Dental%20SET.`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackCrmLead({
                  type: 'whatsapp',
                  treatment: 'Consulta General (Menú Móvil)',
                  sourcePage: 'Menú Móvil Desplegable',
                });
              }}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-bold text-white bg-[#23A455] rounded-lg"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
            <a
              href={`tel:${CLINIC_CONTACT.phoneClean}`}
              onClick={() => {
                trackCrmLead({
                  type: 'call',
                  treatment: 'Consulta General (Menú Móvil)',
                  sourcePage: 'Menú Móvil Desplegable',
                });
              }}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-medium text-stone-800 dark:text-stone-200 bg-stone-200 dark:bg-stone-800 rounded-lg"
              aria-label="Llamar a la clínica"
            >
              <Phone className="w-4 h-4 text-[#83C408]" />
              <span>{CLINIC_CONTACT.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
