import type { Language } from '../types.ts';

export const SUPPORTED_LANGUAGES: Language[] = ['es', 'ca', 'en'];

export const BASE_STATIC_PATHS = [
  '/',
  '/especialidades',
  '/equipo',
  '/clinica',
  '/contacto',
] as const;

export const SECTION_SEGMENTS: Record<
  Language,
  {
    specialties: string;
    team: string;
    clinic: string;
    contact: string;
  }
> = {
  es: {
    specialties: 'especialidades',
    team: 'equipo',
    clinic: 'clinica',
    contact: 'contacto',
  },
  ca: {
    specialties: 'especialitats',
    team: 'equip',
    clinic: 'clinica',
    contact: 'contacte',
  },
  en: {
    specialties: 'specialties',
    team: 'team',
    clinic: 'clinic',
    contact: 'contact',
  },
};

/**
 * Canonical specialty ID (Spanish slug) mapped to localized URL slugs for ES, CA, and EN.
 */
export const SPECIALTY_SLUG_MAP: Record<string, Record<Language, string>> = {
  'implantes-dentales': {
    es: 'implantes-dentales',
    ca: 'implants-dentals',
    en: 'dental-implants',
  },
  'cirugia-oral': {
    es: 'cirugia-oral',
    ca: 'cirurgia-oral',
    en: 'oral-surgery',
  },
  'sedacion-consciente': {
    es: 'sedacion-consciente',
    ca: 'sedacio-conscient',
    en: 'conscious-sedation',
  },
  odontopediatria: {
    es: 'odontopediatria',
    ca: 'odontopediatria',
    en: 'pediatric-dentistry',
  },
  'medicina-oral': {
    es: 'medicina-oral',
    ca: 'medicina-oral',
    en: 'oral-medicine',
  },
  ortodoncia: {
    es: 'ortodoncia',
    ca: 'ortodoncia',
    en: 'orthodontics',
  },
  'estetica-dental': {
    es: 'estetica-dental',
    ca: 'estetica-dental',
    en: 'cosmetic-dentistry',
  },
  periodoncia: {
    es: 'periodoncia',
    ca: 'periodoncia',
    en: 'periodontics',
  },
  endodoncia: {
    es: 'endodoncia',
    ca: 'endodoncia',
    en: 'endodontics',
  },
  'odontologia-general': {
    es: 'odontologia-general',
    ca: 'odontologia-general',
    en: 'general-dentistry',
  },
  'bruxismo-atm': {
    es: 'bruxismo-atm',
    ca: 'bruxisme-atm',
    en: 'bruxism-tmj',
  },
  'protesis-dental': {
    es: 'protesis-dental',
    ca: 'protesi-dental',
    en: 'dental-prosthetics',
  },
};

export interface ParsedUrlResult {
  lang: Language;
  basePath: string;
  localizedPath: string;
  specialtySlug?: string;
  isNotFound: boolean;
}

function normalizeCleanPath(pathname: string): string {
  let clean = (pathname || '/').split('?')[0].split('#')[0].trim();
  if (!clean.startsWith('/')) {
    clean = '/' + clean;
  }
  if (clean.length > 1 && clean.endsWith('/')) {
    clean = clean.slice(0, -1);
  }
  return clean;
}

/**
 * Resolves any incoming URL pathname into language, canonical basePath, optional specialty canonical slug,
 * and strict 404 detection (eliminating Soft 404s on nonexistent routes).
 */
export function parseUrlPath(pathname: string): ParsedUrlResult {
  const clean = normalizeCleanPath(pathname);

  if (clean === '/crm') {
    return {
      lang: 'es',
      basePath: '/crm',
      localizedPath: '/crm',
      isNotFound: false,
    };
  }

  let lang: Language = 'es';
  let remainder = clean;

  if (clean === '/ca' || clean.startsWith('/ca/')) {
    lang = 'ca';
    remainder = clean.slice(3) || '/';
  } else if (clean === '/en' || clean.startsWith('/en/')) {
    lang = 'en';
    remainder = clean.slice(3) || '/';
  }

  if (remainder === '/404') {
    return {
      lang,
      basePath: '/404',
      localizedPath: clean,
      isNotFound: true,
    };
  }

  if (remainder === '/') {
    return {
      lang,
      basePath: '/',
      localizedPath: clean,
      isNotFound: false,
    };
  }

  const seg = SECTION_SEGMENTS[lang];

  if (remainder === `/${seg.specialties}`) {
    return {
      lang,
      basePath: '/especialidades',
      localizedPath: clean,
      isNotFound: false,
    };
  }

  if (remainder === `/${seg.team}`) {
    return {
      lang,
      basePath: '/equipo',
      localizedPath: clean,
      isNotFound: false,
    };
  }

  if (remainder === `/${seg.clinic}`) {
    return {
      lang,
      basePath: '/clinica',
      localizedPath: clean,
      isNotFound: false,
    };
  }

  if (remainder === `/${seg.contact}`) {
    return {
      lang,
      basePath: '/contacto',
      localizedPath: clean,
      isNotFound: false,
    };
  }

  const specPrefix = `/${seg.specialties}/`;
  if (remainder.startsWith(specPrefix)) {
    const candidateSlug = remainder.slice(specPrefix.length);
    if (candidateSlug && !candidateSlug.includes('/')) {
      for (const [canonicalSlug, slugMap] of Object.entries(SPECIALTY_SLUG_MAP)) {
        if (slugMap[lang] === candidateSlug) {
          return {
            lang,
            basePath: `/especialidades/${canonicalSlug}`,
            localizedPath: clean,
            specialtySlug: canonicalSlug,
            isNotFound: false,
          };
        }
      }
    }
  }

  // Unrecognized URL -> explicit 404 route (never fall back to homepage)
  return {
    lang,
    basePath: '/404',
    localizedPath: clean,
    isNotFound: true,
  };
}

/**
 * Resolves a canonical route key (like '/especialidades/ortodoncia', '/equipo', '/')
 * OR an existing localized path into the native translated URL for targetLang.
 */
export function buildLocalizedPath(pathOrCanonical: string, targetLang: Language): string {
  const clean = normalizeCleanPath(pathOrCanonical);

  if (clean === '/crm') {
    return '/crm';
  }

  if (clean === '/404' || clean === '/ca/404' || clean === '/en/404') {
    return targetLang === 'es' ? '/404' : `/${targetLang}/404`;
  }

  // Direct canonical Spanish input (e.g. '/especialidades/ortodoncia', '/equipo')
  if (
    clean === '/' ||
    clean === '/especialidades' ||
    clean === '/equipo' ||
    clean === '/clinica' ||
    clean === '/contacto' ||
    clean.startsWith('/especialidades/')
  ) {
    return translateCanonicalBasePath(clean, targetLang);
  }

  // Otherwise parse as an existing localized URL
  const parsed = parseUrlPath(clean);
  if (parsed.isNotFound) {
    return targetLang === 'es' ? '/' : `/${targetLang}`;
  }
  return translateCanonicalBasePath(parsed.basePath, targetLang);
}

function translateCanonicalBasePath(canonicalBase: string, targetLang: Language): string {
  const seg = SECTION_SEGMENTS[targetLang];
  const prefix = targetLang === 'es' ? '' : `/${targetLang}`;

  if (canonicalBase === '/') {
    return prefix || '/';
  }
  if (canonicalBase === '/especialidades') {
    return `${prefix}/${seg.specialties}`;
  }
  if (canonicalBase === '/equipo') {
    return `${prefix}/${seg.team}`;
  }
  if (canonicalBase === '/clinica') {
    return `${prefix}/${seg.clinic}`;
  }
  if (canonicalBase === '/contacto') {
    return `${prefix}/${seg.contact}`;
  }
  if (canonicalBase.startsWith('/especialidades/')) {
    const canonicalSlug = canonicalBase.slice('/especialidades/'.length);
    const slugMap = SPECIALTY_SLUG_MAP[canonicalSlug];
    if (slugMap) {
      return `${prefix}/${seg.specialties}/${slugMap[targetLang]}`;
    }
  }
  return prefix || '/';
}

/**
 * Checks if a request path is a legacy untranslated CA/EN path (e.g. /en/especialidades/ortodoncia)
 * and returns its new translated 301 redirect destination, or null if not applicable.
 */
export function getLegacyRedirectPath(pathname: string): string | null {
  const clean = normalizeCleanPath(pathname);
  if (!clean.startsWith('/ca/') && !clean.startsWith('/en/')) {
    return null;
  }

  const lang: Language = clean.startsWith('/ca/') ? 'ca' : 'en';
  const remainder = clean.slice(3);

  // Check if remainder used old Spanish section names under /ca or /en
  if (
    remainder === '/especialidades' ||
    remainder === '/equipo' ||
    remainder === '/clinica' ||
    remainder === '/contacto'
  ) {
    const target = translateCanonicalBasePath(remainder, lang);
    return target !== clean ? target : null;
  }

  if (remainder.startsWith('/especialidades/')) {
    const oldSlug = remainder.slice('/especialidades/'.length);
    if (SPECIALTY_SLUG_MAP[oldSlug]) {
      const target = translateCanonicalBasePath(`/especialidades/${oldSlug}`, lang);
      return target !== clean ? target : null;
    }
  }

  return null;
}
