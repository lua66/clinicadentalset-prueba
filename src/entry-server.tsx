import React from 'react';
import { renderToString } from 'react-dom/server';
import { App } from './App';
import { getSeoMetadata, PageSeoMetadata, BASE_URL } from './utils/seoManager';
import {
  parseUrlPath,
  buildLocalizedPath,
  SUPPORTED_LANGUAGES,
  BASE_STATIC_PATHS,
} from './utils/routing';
import { SPECIALTIES } from './data/clinicData';
import { Language } from './types';

export interface RenderedRoutePayload {
  html: string;
  seo: PageSeoMetadata;
  lang: Language;
}

export function renderRoute(urlPath: string): RenderedRoutePayload {
  const { lang } = parseUrlPath(urlPath);
  const seo = getSeoMetadata(urlPath, lang);
  const html = renderToString(<App initialPath={urlPath} />);
  return { html, seo, lang };
}

export function getAllPublicBasePaths(): string[] {
  const specialtyPaths = SPECIALTIES.map((s) => `/especialidades/${s.slug}`);
  return [...BASE_STATIC_PATHS, ...specialtyPaths];
}

export function getAllPrerenderPaths(): string[] {
  const basePaths = getAllPublicBasePaths();
  const localizedPublicPaths: string[] = [];

  for (const basePath of basePaths) {
    for (const lang of SUPPORTED_LANGUAGES) {
      localizedPublicPaths.push(buildLocalizedPath(basePath, lang));
    }
  }

  return [...localizedPublicPaths, '/crm'];
}

export { BASE_URL, buildLocalizedPath, SUPPORTED_LANGUAGES };
