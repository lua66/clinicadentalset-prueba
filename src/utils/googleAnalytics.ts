/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Privacy-First Google Analytics 4 (GA4) & Google Consent Mode v2 Engine
 * Strict compliance: zero third-party scripts or cookies are loaded until
 * explicit user consent ('accepted') is recorded via the cookie banner.
 */

import { CookieConsentState, hasThirdPartyCookieConsent } from './cookieConsent';
import { getGa4Config, GA4_PRIVACY_SETTINGS } from '../config/analytics';
import { Language } from '../types';

export type Ga4EventName =
  | 'page_view'
  | 'generate_lead'
  | 'contact_click'
  | 'select_content'
  | 'video_start'
  | 'video_complete'
  | 'faq_expand'
  | 'map_load'
  | 'language_change';

export interface Ga4EventParams {
  page_path?: string;
  page_title?: string;
  page_location?: string;
  language?: Language | string;
  contact_channel?: 'whatsapp' | 'phone';
  treatment_name?: string;
  ui_location?: string;
  content_type?: string;
  item_id?: string;
  item_name?: string;
  video_title?: string;
  faq_question?: string;
  from_language?: Language;
  to_language?: Language;
  value?: number;
  currency?: string;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

let consentDefaultsInitialized = false;
let ga4PropertyConfiguredId: string | null = null;

function ensureGtagQueue(): (...args: unknown[]) => void {
  if (typeof window === 'undefined') {
    return () => {};
  }

  if (!Array.isArray(window.dataLayer)) {
    window.dataLayer = [];
  }

  if (typeof window.gtag !== 'function') {
    window.gtag = function gtag() {
      // Standard Google tag specification: push native Arguments object
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer?.push(arguments);
    };
  }

  return window.gtag;
}

function expireGoogleAnalyticsCookies(): void {
  if (typeof document === 'undefined' || !document.cookie) return;

  const cookies = document.cookie.split(';');
  const host = typeof window !== 'undefined' ? window.location.hostname : '';
  const domainVariants = [''];
  if (host) {
    domainVariants.push(host, `.${host}`);
  }

  for (const rawCookie of cookies) {
    const eqIndex = rawCookie.indexOf('=');
    const cookieName = (eqIndex > -1 ? rawCookie.slice(0, eqIndex) : rawCookie).trim();
    if (!cookieName) continue;

    if (
      cookieName === '_ga' ||
      cookieName.startsWith('_ga_') ||
      cookieName === '_gid' ||
      cookieName.startsWith('_gat')
    ) {
      for (const domain of domainVariants) {
        const domainAttr = domain ? `; domain=${domain}` : '';
        document.cookie = `${cookieName}=; path=/${domainAttr}; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0; SameSite=Lax`;
      }
    }
  }
}

function injectGa4ScriptTag(measurementId: string, scriptBaseUrl: string): void {
  if (typeof document === 'undefined') return;

  const existing = document.querySelector<HTMLScriptElement>(
    `script[data-ga4-id="${measurementId}"], script[src*="${scriptBaseUrl}"]`
  );
  if (existing) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `${scriptBaseUrl}?id=${encodeURIComponent(measurementId)}`;
  script.setAttribute('data-ga4-id', measurementId);
  document.head.appendChild(script);
}

/**
 * Initializes Google Consent Mode v2 default denied state locally without
 * contacting Google servers or creating cookies prior to user decision.
 */
export function initializeGa4ConsentDefaults(): void {
  if (typeof window === 'undefined' || consentDefaultsInitialized) return;

  const gtag = ensureGtagQueue();
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'denied',
    personalization_storage: 'denied',
    security_storage: 'granted',
    wait_for_update: 500,
  });
  gtag('set', 'ads_data_redaction', true);
  gtag('set', 'url_passthrough', false);

  consentDefaultsInitialized = true;
}

/**
 * Synchronizes GA4 script loading,Consent Mode state, and cookie lifecycle
 * with the visitor's stored cookie banner preference.
 */
export function syncGa4WithConsentState(
  consent: CookieConsentState,
  disabled = false
): { active: boolean; measurementId: string } {
  const { measurementId, scriptBaseUrl } = getGa4Config();
  if (typeof window === 'undefined') {
    return { active: false, measurementId };
  }

  initializeGa4ConsentDefaults();
  const gtag = ensureGtagQueue();

  if (disabled || consent !== 'accepted') {
    window[`ga-disable-${measurementId}`] = true;
    gtag('consent', 'update', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
      functionality_storage: 'denied',
      personalization_storage: 'denied',
    });
    expireGoogleAnalyticsCookies();
    return { active: false, measurementId };
  }

  window[`ga-disable-${measurementId}`] = false;
  gtag('consent', 'update', {
    analytics_storage: 'granted',
    functionality_storage: 'granted',
    security_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });

  injectGa4ScriptTag(measurementId, scriptBaseUrl);

  if (ga4PropertyConfiguredId !== measurementId) {
    gtag('js', new Date());
    gtag('config', measurementId, {
      send_page_view: GA4_PRIVACY_SETTINGS.sendPageViewOnConfig,
      anonymize_ip: GA4_PRIVACY_SETTINGS.anonymizeIp,
      allow_google_signals: GA4_PRIVACY_SETTINGS.allowGoogleSignals,
      allow_ad_personalization_signals: GA4_PRIVACY_SETTINGS.allowAdPersonalizationSignals,
      cookie_expires: GA4_PRIVACY_SETTINGS.cookieExpiresSeconds,
      cookie_flags: GA4_PRIVACY_SETTINGS.cookieFlags,
    });
    ga4PropertyConfiguredId = measurementId;
  }

  return { active: true, measurementId };
}

/**
 * Sends a GA4 page_view hit strictly when third-party cookie consent is granted.
 */
export function sendGa4PageView(params: {
  path: string;
  title?: string;
  lang: Language;
  disabled?: boolean;
}): boolean {
  if (
    typeof window === 'undefined' ||
    params.disabled ||
    !hasThirdPartyCookieConsent()
  ) {
    return false;
  }

  const { measurementId } = syncGa4WithConsentState('accepted', false);
  const gtag = ensureGtagQueue();
  const resolvedTitle =
    params.title || (typeof document !== 'undefined' ? document.title : 'Clínica Dental SET');
  const resolvedLocation = `${window.location.origin}${params.path}`;

  gtag('event', 'page_view', {
    send_to: measurementId,
    page_path: params.path,
    page_title: resolvedTitle,
    page_location: resolvedLocation,
    language: params.lang,
  });

  return true;
}

/**
 * Sends a typed GA4 custom/recommended event strictly when consent is granted.
 */
export function sendGa4Event(
  eventName: Ga4EventName | string,
  params: Ga4EventParams = {}
): boolean {
  if (typeof window === 'undefined' || !hasThirdPartyCookieConsent()) {
    return false;
  }

  const { measurementId } = syncGa4WithConsentState('accepted', false);
  const gtag = ensureGtagQueue();

  gtag('event', eventName, {
    send_to: measurementId,
    page_path: params.page_path || window.location.pathname || '/',
    ...params,
  });

  return true;
}

/**
 * Sends a GA4 recommended lead conversion event for WhatsApp or telephone interactions.
 */
export function sendGa4ContactLead(params: {
  channel: 'whatsapp' | 'phone';
  treatment?: string;
  uiLocation: string;
  lang: Language;
  pagePath?: string;
}): boolean {
  return sendGa4Event('generate_lead', {
    contact_channel: params.channel,
    treatment_name: params.treatment || 'Consulta General',
    ui_location: params.uiLocation,
    language: params.lang,
    page_path:
      params.pagePath ||
      (typeof window !== 'undefined' ? window.location.pathname || '/' : '/'),
    currency: 'EUR',
    value: 1,
  });
}
