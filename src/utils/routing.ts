import { Language } from '../types';

export const SUPPORTED_LANGUAGES: Language[] = ['es', 'ca', 'en'];

export const BASE_STATIC_PATHS = [
  '/',
  '/especialidades',
  '/equipo',
  '/clinica',
  '/contacto',
] as const;

/**
 * Extracts language prefix (/ca or /en) and normalized base route path from any pathname.
 */
export function parseUrlPath(pathname: string): {
  lang: Language;
  basePath: string;
  localizedPath: string;
} {
  let clean = (pathname || '/').trim();
  if (!clean.startsWith('/')) {
    clean = '/' + clean;
  }
  if (clean.length > 1 && clean.endsWith('/')) {
    clean = clean.slice(0, -1);
  }

  if (clean === '/ca' || clean.startsWith('/ca/')) {
    const remainder = clean.slice(3) || '/';
    return {
      lang: 'ca',
      basePath: remainder,
      localizedPath: clean,
    };
  }

  if (clean === '/en' || clean.startsWith('/en/')) {
    const remainder = clean.slice(3) || '/';
    return {
      lang: 'en',
      basePath: remainder,
      localizedPath: clean,
    };
  }

  return {
    lang: 'es',
    basePath: clean,
    localizedPath: clean,
  };
}

/**
 * Builds the localized URL path for a given base route and target language.
 * Default language 'es' lives at root (/...), while 'ca' lives at /ca/... and 'en' at /en/...
 */
export function buildLocalizedPath(pathOrBase: string, lang: Language): string {
  const { basePath } = parseUrlPath(pathOrBase);
  if (basePath === '/crm') {
    return '/crm';
  }
  if (lang === 'es') {
    return basePath;
  }
  return basePath === '/' ? `/${lang}` : `/${lang}${basePath}`;
}
